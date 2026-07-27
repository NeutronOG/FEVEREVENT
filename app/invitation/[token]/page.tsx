import type { Metadata } from "next";
import { InvitationExperience } from "@/components/experience/InvitationExperience";
import { getInvitation } from "@/data/invitations";

type InvitationPageProps = {
  params: Promise<{ token: string }>;
};

export const metadata: Metadata = {
  title: "FEVER — Honored Guest",
  description:
    "A private invitation for the guests who make every night worth remembering.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function InvitationPage({ params }: InvitationPageProps) {
  const { token } = await params;
  const invitation = getInvitation(token);

  if (!invitation) {
    return (
      <main className="invalid-invitation">
        <div aria-hidden="true" className="invalid-light" />
        <span className="brand-mark">FEVER</span>
        <div>
          <p>PRIVATE INVITATION</p>
          <h1>This invitation could not be verified.</h1>
          <span>CHECK THE PRIVATE LINK PROVIDED BY YOUR HOST.</span>
        </div>
      </main>
    );
  }

  return <InvitationExperience invitation={invitation} />;
}
