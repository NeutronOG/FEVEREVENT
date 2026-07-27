"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const statements = [
  ["SOME INVITATIONS", "ARE GIVEN."],
  ["OTHERS", "ARE EARNED."],
  ["THIS ONE", "IS YOURS."],
];

export function RecognitionSequence({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const isLast = index === statements.length - 1;
    const timer = window.setTimeout(
      () => (isLast ? onComplete() : setIndex((value) => value + 1)),
      isLast ? 4200 : 3400,
    );
    return () => window.clearTimeout(timer);
  }, [index, onComplete]);

  const [lineOne, lineTwo] = statements[index];

  return (
    <section aria-label="Your recognition" className="recognition-auto">
      <div aria-hidden="true" className="recognition-sweep" />
      <AnimatePresence mode="wait">
        <motion.p
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          exit={{ opacity: 0, filter: "blur(12px)", y: -28 }}
          initial={{ opacity: 0, filter: "blur(12px)", y: 38 }}
          key={lineOne}
          transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <span>{lineOne}</span>
          <strong>{lineTwo}</strong>
        </motion.p>
      </AnimatePresence>
      <span className="scene-index">0{index + 1}</span>
    </section>
  );
}
