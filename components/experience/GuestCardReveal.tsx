"use client";

import { motion } from "motion/react";
import { GuestCardFallback } from "./GuestCardFallback";
import type { Invitation } from "@/data/invitations";

export function GuestCardReveal({
  invitation,
}: {
  invitation: Invitation;
}) {
  return (
    <section className="card-reveal-section">
      <div className="section-eyebrow">
        <span>PERMANENT STATUS</span>
        <span>ISSUED {new Date().getFullYear()}</span>
      </div>
      <motion.div
        className="card-scene-shell"
        initial={{ opacity: 0, scale: 0.85, y: 80, filter: "blur(18px)" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ amount: 0.45, once: true }}
        whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      >
        <div className="fallback-card-wrap">
          <GuestCardFallback invitation={invitation} />
        </div>
      </motion.div>
      <div className="card-reveal-copy">
        <h2>
          HONORED
          <br />
          GUEST
        </h2>
        <p>
          A permanent recognition, reserved for the people who changed the
          atmosphere simply by being there.
        </p>
      </div>
      <p className="card-instruction">YOUR PERSONAL HONORED GUEST CARD</p>
    </section>
  );
}
