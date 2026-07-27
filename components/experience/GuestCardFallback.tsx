import type { Invitation } from "@/data/invitations";

type CardFaceProps = {
  invitation: Invitation;
  back?: boolean;
  id?: string;
};

export function GuestCardFallback({
  invitation,
  back = false,
  id,
}: CardFaceProps) {
  if (back) {
    return (
      <div className="vip-card vip-card-back" id={id}>
        <div className="card-noise" />
        <span className="card-brand">FEVER</span>
        <div className="card-back-copy">
          <p>LIFETIME VIP ACCESS</p>
          <strong>
            {String(invitation.complimentaryShots).padStart(2, "0")}
          </strong>
          <p>COMPLIMENTARY SHOTS</p>
          <small>EVERY VISIT</small>
        </div>
        <span className="card-member">MEMBER {invitation.memberNumber}</span>
      </div>
    );
  }

  return (
    <div className="vip-card vip-card-front" id={id}>
      <div className="card-noise" />
      <div className="card-hologram" />
      <span className="card-brand">FEVER</span>
      <div className="card-title">
        <small>HONORED</small>
        <strong>GUEST</strong>
      </div>
      <div className="card-person">
        <span>{invitation.fullName.toLocaleUpperCase("es-MX")}</span>
        <small>MEMBER {invitation.memberNumber}</small>
      </div>
      <span className="card-infinity">∞</span>
    </div>
  );
}
