"use client";

import { motion } from "motion/react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import type { Invitation } from "@/data/invitations";

type InvitationClosingProps = {
  invitation: Invitation;
  accepted: boolean;
  onAccept: () => void;
};

export function InvitationClosing({
  invitation,
  accepted,
  onAccept,
}: InvitationClosingProps) {
  return (
    <section className="invitation-closing" id="closing">
      <div aria-hidden="true" className="closing-light" />
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 1 }}
        viewport={{ amount: 0.7, once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        Thank you for making our first year unforgettable.
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, filter: "blur(16px)" }}
        transition={{ duration: 1.2, delay: 0.1 }}
        viewport={{ amount: 0.6, once: true }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
      >
        CELEBRATE.
      </motion.h2>
      <span>THE FIRST OF MANY NIGHTS TO COME.</span>

      <div className="closing-actions">
        {!accepted && (
          <MagneticButton onClick={onAccept} variant="primary">
            ACCEPT INVITATION
          </MagneticButton>
        )}
        <MagneticButton
          onClick={() =>
            document
              .querySelector(accepted ? "#accepted" : ".card-reveal-section")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          SAVE YOUR CARD
        </MagneticButton>
      </div>

      {!accepted && (
        <div className="preaccept-details" id="closing-details">
          <span>{invitation.eventDate}</span>
          <span>{invitation.eventTime}</span>
          <span>PRIVATE LOCATION · RELEASED UPON ACCEPTANCE</span>
        </div>
      )}
    </section>
  );
}
