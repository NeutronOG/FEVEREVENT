import { getInvitation } from "@/data/invitations";
import { getSupabaseAdmin } from "@/lib/server/supabase";

export const runtime = "nodejs";

type GuestPayload = {
  invitationToken?: unknown;
  firstName?: unknown;
  lastName?: unknown;
  birthDate?: unknown;
  email?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GuestPayload;
    const invitationToken = text(body.invitationToken, 64).toUpperCase();
    const firstName = text(body.firstName, 80);
    const lastName = text(body.lastName, 80);
    const birthDate = text(body.birthDate, 10);
    const email = text(body.email, 254).toLowerCase();

    if (!getInvitation(invitationToken)) {
      return Response.json(
        { error: "This invitation could not be verified." },
        { status: 404 },
      );
    }

    if (
      !firstName ||
      !lastName ||
      !datePattern.test(birthDate) ||
      !emailPattern.test(email)
    ) {
      return Response.json(
        { error: "Please review the information provided." },
        { status: 400 },
      );
    }

    const supabase = getSupabaseAdmin();
    const { data: existing, error: lookupError } = await supabase
      .from("honored_guests")
      .select("id, qr_token, wallet_pass_status")
      .eq("invitation_token", invitationToken)
      .maybeSingle();

    if (lookupError) throw lookupError;

    const record = {
      birth_date: birthDate,
      email,
      first_name: firstName,
      invitation_token: invitationToken,
      last_name: lastName,
      updated_at: new Date().toISOString(),
    };

    const result = existing
      ? await supabase
          .from("honored_guests")
          .update(record)
          .eq("id", existing.id)
          .select("id, invitation_token, qr_token, wallet_pass_status")
          .single()
      : await supabase
          .from("honored_guests")
          .insert(record)
          .select("id, invitation_token, qr_token, wallet_pass_status")
          .single();

    if (result.error || !result.data)
      throw result.error ?? new Error("Guest was not saved.");

    return Response.json({
      id: result.data.id,
      invitationToken: result.data.invitation_token,
      qrToken: result.data.qr_token,
      walletPassStatus: result.data.wallet_pass_status,
    });
  } catch (error) {
    console.error("Guest registration failed", error);
    return Response.json(
      { error: "We could not save your invitation. Please try again." },
      { status: 503 },
    );
  }
}
