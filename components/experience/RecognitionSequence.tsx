"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const statements = [
  ["SOME INVITATIONS", "ARE GIVEN."],
  ["OTHERS", "ARE EARNED."],
  ["THIS ONE", "IS YOURS."],
];

export function RecognitionSequence() {
  const reduced = useReducedMotion();

  return (
    <section aria-label="Your recognition" className="recognition-sequence">
      {statements.map(([lineOne, lineTwo], index) => (
        <div className={`recognition-scene scene-${index + 1}`} key={lineOne}>
          <div aria-hidden="true" className="recognition-sweep" />
          <motion.p
            initial={
              reduced
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    y: 40,
                    filter: "blur(12px)",
                    letterSpacing: "0.18em",
                  }
            }
            transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ amount: 0.7, once: false }}
            whileInView={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              letterSpacing: "0.04em",
            }}
          >
            <span>{lineOne}</span>
            <strong>{lineTwo}</strong>
          </motion.p>
          <span className="scene-index">0{index + 1}</span>
        </div>
      ))}
    </section>
  );
}
