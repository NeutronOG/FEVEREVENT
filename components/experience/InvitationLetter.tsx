"use client";

import { motion } from "motion/react";

const paragraphs = [
  "To someone we remember.",
  "You have never been just another name on the list. You showed up, came back and brought the kind of energy that changes a room.",
  "FEVER Membership is our way of recognizing that. Not as a promotion, but as a thank you reserved for the people who have become part of our story.",
  "Your place is no longer something you need to ask for. It is yours — starting with our Grand Opening, and every night after.",
];

export function InvitationLetter() {
  return (
    <section className="invitation-letter">
      <div className="letter-heading">
        <span>FEVER · PRIVATE CORRESPONDENCE</span>
        <h2>WE NOTICED.</h2>
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
