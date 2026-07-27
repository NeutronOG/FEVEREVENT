import { createAppleWalletPass } from "@/lib/server/apple-wallet";
import { getSupabaseAdmin } from "@/lib/server/supabase";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ guestId: string }>;
};

export async function GET(_: Request, { params }: RouteContext) {
  try {
    const { guestId } = await params;
    const supabase = getSupabaseAdmin();
    const { data: guest, error } = await supabase
      .from("honored_guests")
      .select("id, first_name, last_name, email, qr_token")
      .eq("id", guestId)
      .maybeSingle();

    if (error) throw error;
    if (!guest) return Response.json({ error: "Invitation not found." }, { status: 404 });

    const walletPass = await createAppleWalletPass(guest);
    const update = await supabase
      .from("honored_guests")
      .update({
        wallet_pass_serial: walletPass.serialNumber,
        wallet_pass_status: "issued",
        wallet_pass_updated_at: new Date().toISOString(),
      })
      .eq("id", guest.id);

    if (update.error) throw update.error;

    const body = Uint8Array.from(walletPass.buffer);

    return new Response(body, {
      headers: {
        "cache-control": "no-store",
        "content-disposition": `attachment; filename="FEVER-${guest.id}.pkpass"`,
        "content-type": "application/vnd.apple.pkpass",
      },
    });
  } catch (error) {
    console.error("Apple Wallet pass generation failed", error);
    return Response.json(
      { error: "We could not prepare your Apple Wallet pass." },
      { status: 503 },
    );
  }
}
