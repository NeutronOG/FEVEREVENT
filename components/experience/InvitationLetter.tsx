"use client";

import { motion } from "motion/react";

const paragraphs = [
  "Some invitations are earned.",
  "Your presence, your loyalty, and the energy you bring to every night have made you someone we’d like to recognize.",
  "This invitation is more than access to an event, it’s your place among the guests who make every night worth remembering.",
  "Let the music take over, lose yourself in every beat, and enjoy an experience created for those who appreciate unforgettable nights.",
];

export function InvitationLetter() {
  return (
    <section className="invitation-letter">
      <div className="letter-heading">
        <span>FEVER · PRIVATE CORRESPONDENCE</span>
        <h2>GUEST</h2>
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
