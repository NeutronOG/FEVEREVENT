import { InvitationExperience } from "@/components/experience/InvitationExperience";
import { getInvitation } from "@/data/invitations";

export default function Home() {
  const invitation = getInvitation("AGUS0017");

  if (!invitation) {
    return null;
  }

  return <InvitationExperience invitation={invitation} />;
}
