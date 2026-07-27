"use client";

import Image from "next/image";
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
        <Image
          alt="Abstract atmospheric artwork in motion"
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 900px"
          src="/media/sistek-fever-background.png"
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
        <span>EST. · MMXVIII</span>
        <motion.strong
          initial={{ opacity: 0, y: 80, filter: "blur(14px)" }}
          transition={{ duration: 1.2 }}
          viewport={{ amount: 0.6, once: true }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        >
          {invitation.anniversaryYears}
        </motion.strong>
        <h2>
          YEARS
          <br />
          OF FEVER
        </h2>
      </div>
    </section>
  );
}
