export type Invitation = {
  token: string;
  firstName: string;
  fullName: string;
  memberNumber: string;
  anniversaryYear: number;
  eventDate: string;
  eventTime: string;
  venueName: string;
  venueAddress: string;
  status: "pending" | "accepted";
  vipAccess: "lifetime";
  complimentaryShots: number;
};

export const invitations: Record<string, Invitation> = {
  AGUS0017: {
    token: "AGUS0017",
    firstName: "Agustín",
    fullName: "Agustín Pinaya",
    memberNumber: "0017",
    anniversaryYear: 1,
    eventDate: "Saturday, August 22, 2026",
    eventTime: "10:30 PM",
    venueName: "FEVER",
    venueAddress: "Private location · Details reserved for honored guests",
    status: "pending",
    vipAccess: "lifetime",
    complimentaryShots: 2,
  },
};

export function getInvitation(token: string) {
  return invitations[token.toUpperCase()] ?? null;
}
