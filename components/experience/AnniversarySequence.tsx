"use client";
/* eslint-disable @next/next/no-img-element */

import { motion } from "motion/react";
import type { Invitation } from "@/data/invitations";

const words = ["THE NIGHTS", "THE MUSIC", "THE PEOPLE"];

export function AnniversarySequence({
  invitation,
}: {
  invitation: Invitation;
}) {
  return (
    <section className="anniversary-sequence">
      <div className="media-frame">
        <img
          alt="Abstract atmospheric artwork in motion"
          loading="lazy"
          src="/media/sistek-fever-background.webp"
        />
        <div aria-hidden="true" className="media-grade" />
        <div className="media-words">
          {words.map((word, index) => (
            <motion.h3
              initial={{ opacity: 0, x: index % 2 === 0 ? -45 : 45 }}
              key={word}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ amount: 0.8, once: false }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              {word}
            </motion.h3>
          ))}
        </div>
      </div>
      <div className="anniversary-count">
        <span>EST. · MMXXV</span>
        <motion.strong
          className="anniversary-number"
          initial={{ opacity: 0, y: 80, filter: "blur(14px)" }}
          transition={{ duration: 1.2 }}
          viewport={{ amount: 0.6, once: true }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        >
          {invitation.anniversaryYear}
        </motion.strong>
        <h2>
          YEAR
          <br />
          OF FEVER
        </h2>
      </div>
    </section>
  );
}
