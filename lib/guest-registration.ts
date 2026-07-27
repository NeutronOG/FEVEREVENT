export type GuestDetails = {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
};

export type RegisteredGuest = {
  id: string;
  invitationToken: string;
  memberNumber: string;
  qrToken: string;
  walletPassStatus: "pending" | "issued";
};

type RegistrationFailure = {
  error?: string;
};

export async function registerGuest(
  invitationToken: string,
  details: GuestDetails,
): Promise<RegisteredGuest> {
  const response = await fetch("/api/guests", {
    body: JSON.stringify({ invitationToken, ...details }),
    headers: { "content-type": "application/json" },
    method: "POST",
  });

  if (!response.ok) {
    const payload = (await response
      .json()
      .catch(() => ({}))) as RegistrationFailure;
    throw new Error(payload.error ?? "We could not save your invitation.");
  }

  return (await response.json()) as RegisteredGuest;
}
