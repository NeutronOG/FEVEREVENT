import { getSupabaseAdmin } from "@/lib/server/supabase";

export const runtime = "nodejs";

const deviceIdPattern =
  /^[a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;

async function readCount() {
  const { count, error } = await getSupabaseAdmin()
    .from("visitor_devices")
    .select("*", { count: "exact", head: true });

  if (error) throw error;
  return count ?? 0;
}

export async function GET() {
  try {
    return Response.json(
      { count: await readCount() },
      { headers: { "cache-control": "no-store" } },
    );
  } catch {
    return Response.json({ error: "Counter unavailable" }, { status: 503 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { deviceId?: unknown };
    if (
      typeof body.deviceId !== "string" ||
      !deviceIdPattern.test(body.deviceId)
    ) {
      return Response.json(
        { error: "Invalid device identifier" },
        { status: 400 },
      );
    }

    const { error } = await getSupabaseAdmin().from("visitor_devices").upsert(
      {
        device_id: body.deviceId,
        first_seen_at: new Date().toISOString(),
      },
      { ignoreDuplicates: true, onConflict: "device_id" },
    );

    if (error) throw error;
    return Response.json(
      { count: await readCount() },
      { headers: { "cache-control": "no-store" } },
    );
  } catch {
    return Response.json({ error: "Counter unavailable" }, { status: 503 });
  }
}
