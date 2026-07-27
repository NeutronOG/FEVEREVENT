import Image from "next/image";
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
        <Image
          alt="FEVER"
          className="card-brand-logo"
          height={150}
          priority
          src="/brand/fever-logo-mark.png"
          width={567}
        />
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
      <Image
        alt="FEVER"
        className="card-brand-logo"
        height={150}
        priority
        src="/brand/fever-logo-mark.png"
        width={567}
      />
      <div className="card-title">
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
