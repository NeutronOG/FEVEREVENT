"use client";

import { motion } from "motion/react";
import { HoldButton } from "@/components/ui/HoldButton";
import type { Invitation } from "@/data/invitations";

type InvitationGateProps = {
  invitation: Invitation;
  onEnter: () => void;
};

export function InvitationGate({ invitation, onEnter }: InvitationGateProps) {
  return (
    <motion.section
      animate={{ opacity: 1 }}
      className="invitation-gate"
      exit={{ opacity: 0, scale: 1.025, filter: "blur(14px)" }}
      initial={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div aria-hidden="true" className="gate-light" />
      <header className="gate-header">
        <span>FEVER ANNIVERSARY</span>
        <span>PRIVATE INVITATION · {invitation.anniversaryYears} YEARS</span>
      </header>

      <div className="gate-recipient">
        <p>THIS INVITATION BELONGS TO</p>
        <h1>{invitation.firstName.toLocaleUpperCase("es-MX")}</h1>
        <span className="recipient-line" />
      </div>

      <div className="gate-action">
        <HoldButton onComplete={onEnter} />
        <p>PRESS AND HOLD</p>
      </div>

      <footer className="gate-footer">
        <span>{invitation.memberNumber.padStart(4, "0")}</span>
        <span>MX · MMXXVI</span>
      </footer>
    </motion.section>
  );
}
