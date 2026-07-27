export const dynamic = "force-dynamic";

const corsHeaders = {
  "access-control-allow-headers": "content-type",
  "access-control-allow-methods": "GET, POST, OPTIONS",
  "access-control-allow-origin": "*",
  "cache-control": "no-store",
  "content-type": "application/json; charset=utf-8",
};

const deviceIdPattern = /^[a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;

async function database() {
  const { env } = await import("cloudflare:workers");
  const bindings = env as unknown as { DB?: D1Database };
  if (!bindings.DB) throw new Error("D1 binding DB is unavailable");
  return bindings.DB;
}

async function initialize(db: D1Database) {
  await db
    .prepare(
      "CREATE TABLE IF NOT EXISTS visitor_devices (device_id TEXT PRIMARY KEY, first_seen_at TEXT NOT NULL)",
    )
    .run();
}

async function readCount(db: D1Database) {
  const result = await db
    .prepare("SELECT COUNT(*) AS count FROM visitor_devices")
    .first<{ count: number }>();
  return result?.count ?? 0;
}

export function OPTIONS() {
  return new Response(null, { headers: corsHeaders, status: 204 });
}

export async function GET() {
  try {
    const db = await database();
    await initialize(db);
    return Response.json({ count: await readCount(db) }, { headers: corsHeaders });
  } catch {
    return Response.json({ error: "Counter unavailable" }, { headers: corsHeaders, status: 503 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { deviceId?: unknown };
    if (typeof body.deviceId !== "string" || !deviceIdPattern.test(body.deviceId)) {
      return Response.json({ error: "Invalid device identifier" }, { headers: corsHeaders, status: 400 });
    }

    const db = await database();
    await initialize(db);
    await db
      .prepare(
        "INSERT OR IGNORE INTO visitor_devices (device_id, first_seen_at) VALUES (?, ?)",
      )
      .bind(body.deviceId, new Date().toISOString())
      .run();

    return Response.json({ count: await readCount(db) }, { headers: corsHeaders });
  } catch {
    return Response.json({ error: "Counter unavailable" }, { headers: corsHeaders, status: 503 });
  }
}
