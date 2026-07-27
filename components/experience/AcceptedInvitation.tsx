"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import { toPng } from "html-to-image";
import { Check, Download, WalletCards } from "lucide-react";
import { GuestCardFallback } from "./GuestCardFallback";
import { MagneticButton } from "@/components/ui/MagneticButton";
import type { Invitation } from "@/data/invitations";
import type { RegisteredGuest } from "@/lib/guest-registration";

export function AcceptedInvitation({
  invitation,
  guest,
}: {
  invitation: Invitation;
  guest: RegisteredGuest | null;
}) {
  const [qr, setQr] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const qrPayload = guest
      ? `${window.location.origin}/verify/${guest.qrToken}`
      : `FEVER-${invitation.memberNumber}`;
    void QRCode.toDataURL(qrPayload, {
      width: 256,
      margin: 1,
      color: { dark: "#f2efe8", light: "#050505" },
      errorCorrectionLevel: "H",
    }).then(setQr);
  }, [guest, invitation.memberNumber]);

  const saveCard = async () => {
    if (!cardRef.current) return;
    const dataUrl = await toPng(cardRef.current, {
      cacheBust: true,
      pixelRatio: 3,
      backgroundColor: "#050505",
    });
    const link = document.createElement("a");
    link.download = `FEVER-${guest?.memberNumber ?? invitation.memberNumber}.png`;
    link.href = dataUrl;
    link.click();
  };

  const addToAppleWallet = () => {
    if (!guest) return;
    window.location.assign(`/api/wallet/apple/${guest.id}`);
  };

  return (
    <section className="accepted-state" id="accepted">
      <div className="accepted-check">
        <Check size={18} />
      </div>
      <p>INVITATION ACCEPTED</p>
      <h2>
        YOUR PLACE
        <br />
        IS RESERVED.
      </h2>
      <span>WELCOME TO FEVER.</span>

      <div className="accepted-pass">
        <div ref={cardRef}>
          <GuestCardFallback id="downloadable-card" invitation={invitation} />
        </div>
        <div className="qr-frame">
          {qr ? (
            <Image
              alt={`Invitation QR code for ${invitation.fullName}`}
              height={132}
              unoptimized
              width={132}
              src={qr}
            />
          ) : null}
          <span>FEVER · {guest?.memberNumber ?? invitation.memberNumber}</span>
        </div>
      </div>

      <div className="accepted-actions">
        <MagneticButton onClick={saveCard} variant="primary">
          <Download size={15} /> SAVE YOUR CARD
        </MagneticButton>
        <MagneticButton
          aria-label="Apple Wallet pass"
          disabled={!guest}
          onClick={addToAppleWallet}
        >
          <WalletCards size={15} /> ADD TO APPLE WALLET
        </MagneticButton>
      </div>

      <div className="event-details" id="event-details">
        <span>ANNIVERSARY NIGHT</span>
        <dl>
          <div>
            <dt>DATE</dt>
            <dd>{invitation.eventDate}</dd>
          </div>
          <div>
            <dt>ARRIVAL</dt>
            <dd>{invitation.eventTime}</dd>
          </div>
          <div>
            <dt>VENUE</dt>
            <dd>{invitation.venueName}</dd>
          </div>
          <div>
            <dt>LOCATION</dt>
            <dd>{invitation.venueAddress}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
