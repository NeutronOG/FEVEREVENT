export type Invitation = {
  token: string;
  firstName: string;
  fullName: string;
  memberNumber: string;
  eventDate: string;
  eventTime: string;
  venueName: string;
  venueAddress: string;
  status: "pending" | "accepted";
  vipAccess: "lifetime";
  complimentaryShots: number;
  eventTitle: string;
  headliner: string;
  supportAct: string;
};

export const invitations: Record<string, Invitation> = {
  AGUS0017: {
    token: "AGUS0017",
    firstName: "Agustín",
    fullName: "Agustín Pinaya",
    memberNumber: "0017",
    eventDate: "Saturday, October 17, 2026",
    eventTime: "10:00 PM",
    venueName: "FEVER",
    venueAddress: "Private location · Details reserved for invited guests",
    status: "pending",
    vipAccess: "lifetime",
    complimentaryShots: 2,
    eventTitle: "First Anniversary",
    headliner: "Alan Dixon",
    supportAct: "Gallardo + The Äche",
  },
};

export function getInvitation(token: string) {
  return invitations[token.toUpperCase()] ?? null;
}
