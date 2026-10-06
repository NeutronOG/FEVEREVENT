"use client";

import { motion } from "motion/react";

const paragraphs = [
  "To our special guest.",
  "Thank you for being part of this journey. Your presence, energy and loyalty made our first year unforgettable.",
  "We are beyond grateful to celebrate this first anniversary with you — a year defined by delight, uniqueness and distinction.",
  "On October 17, let the music take over for one night created for the people who made every moment count.",
];

export function InvitationLetter() {
  return (
    <section className="invitation-letter">
      <div className="letter-heading">
        <span>FEVER · PRIVATE CORRESPONDENCE</span>
        <h2>ONE YEAR.</h2>
      </div>
      <div className="letter-body">
        {paragraphs.map((paragraph, index) => (
          <motion.p
            initial={{ opacity: 0, y: 35, clipPath: "inset(0 0 100% 0)" }}
            key={paragraph}
            transition={{
              duration: 1,
              delay: index * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            viewport={{ amount: 0.65, once: true }}
            whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
          >
            {paragraph}
          </motion.p>
        ))}
      </div>
      <span className="letter-signature">FEVER / MMXXVI</span>
    </section>
  );
}
