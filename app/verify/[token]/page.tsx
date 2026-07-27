import { notFound } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/server/supabase";

export const dynamic = "force-dynamic";

type VerificationPageProps = {
  params: Promise<{ token: string }>;
};

export default async function VerificationPage({
  params,
}: VerificationPageProps) {
  const { token } = await params;
  const { data: guest, error } = await getSupabaseAdmin()
    .from("honored_guests")
    .select("first_name, last_name, member_number, wallet_pass_status")
    .eq("qr_token", token)
    .maybeSingle();

  if (error || !guest || guest.wallet_pass_status === "revoked") notFound();

  return (
    <main className="verification-page">
      <section className="verification-card">
        <span>FEVER · PRIVATE MEMBER</span>
        <p>CARD VERIFIED</p>
        <h1>
          {guest.first_name} {guest.last_name}
        </h1>
        <strong>MEMBER {String(guest.member_number).padStart(4, "0")}</strong>
        <small>LIFETIME VIP ACCESS · 2 SHOTS EVERY VISIT</small>
      </section>
    </main>
  );
}
