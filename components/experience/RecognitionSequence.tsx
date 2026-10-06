"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const stages = [
  {
    id: "sound",
    label: "THE SOUND",
    lines: ["FEEL THE", "FREQUENCY."],
    detail: "Let the music pull you in.",
    duration: 2400,
  },
  {
    id: "connection",
    label: "THE CONNECTION",
    lines: ["FIND YOUR", "PEOPLE."],
    detail: "A connection beyond the dance floor.",
    duration: 2400,
  },
  {
    id: "welcome",
    label: "YOUR MOMENT",
    lines: ["WELCOME TO", "FEVER."],
    detail: "Your invitation. Your moment.",
    duration: 3000,
  },
];

export function RecognitionSequence({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [index, setIndex] = useState(0);
  const completedRef = useRef(false);
  const reduced = useReducedMotion();
  const stageIndex = reduced ? stages.length - 1 : index;
  const stage = stages[stageIndex];

  const complete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const timer = window.setTimeout(
      () => {
        if (completedRef.current) return;
        if (reduced || index === stages.length - 1) complete();
        else setIndex((value) => value + 1);
      },
      reduced ? 1400 : stages[index].duration,
    );
    return () => window.clearTimeout(timer);
  }, [complete, index, reduced]);

  const wordVariants: Variants = {
    hidden: { y: reduced ? 0 : "110%" },
    visible: {
      y: 0,
      transition: {
        duration: reduced ? 0 : 0.75,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      y: reduced ? 0 : "-110%",
      transition: { duration: reduced ? 0 : 0.35, ease: [0.7, 0, 0.84, 0] },
    },
  };
  const captionVariants: Variants = {
    hidden: { opacity: reduced ? 1 : 0 },
    visible: { opacity: 1, transition: { duration: reduced ? 0 : 0.5 } },
    exit: { opacity: 0, transition: { duration: reduced ? 0 : 0.2 } },
  };

  return (
    <motion.section
      animate={{ opacity: 1 }}
      aria-label="Welcome to FEVER"
      className="recognition-auto"
      exit={{ opacity: 0 }}
      initial={{ opacity: reduced ? 1 : 0 }}
      transition={{ duration: reduced ? 0 : 0.35 }}
    >
      <div aria-hidden="true" className="recognition-glow" />
      <motion.div
        animate={{
          opacity: 0.65,
          rotate: reduced ? 0 : stageIndex * 36,
          scale: reduced ? 1 : 0.96 + stageIndex * 0.05,
        }}
        aria-hidden="true"
        className="recognition-orbit"
        initial={reduced ? false : { opacity: 0, scale: 0.9 }}
        transition={{
          duration: reduced ? 0 : stage.duration / 1000,
          ease: "easeInOut",
        }}
      >
        <span />
        <span />
        <span />
      </motion.div>

      <header className="recognition-header">
        <span className="brand-mark">FEVER</span>
        <span>FIRST ANNIVERSARY</span>
      </header>

      <div aria-atomic="true" aria-live="polite" className="recognition-stage">
        <AnimatePresence initial={!reduced} mode="wait">
          <motion.div
            animate="visible"
            className="recognition-frame"
            exit="exit"
            initial="hidden"
            key={stage.id}
            variants={{
              visible: { transition: { staggerChildren: reduced ? 0 : 0.09 } },
              exit: { transition: { staggerChildren: reduced ? 0 : 0.04 } },
            }}
          >
            <motion.p
              className="recognition-eyebrow"
              variants={captionVariants}
            >
              {stage.label}
            </motion.p>
            <h2 className="recognition-heading">
              {stage.lines.map((line, lineIndex) => (
                <span className="recognition-word-mask" key={line}>
                  <motion.span
                    className={`recognition-word ${lineIndex === 1 ? "recognition-word-accent" : ""}`}
                    variants={wordVariants}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h2>
            <motion.p className="recognition-detail" variants={captionVariants}>
              {stage.detail}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      <footer className="recognition-footer">
        <div aria-hidden="true" className="recognition-progress">
          <span className="recognition-counter">
            {String(stageIndex + 1).padStart(2, "0")}
            <span> / 03</span>
          </span>
          <div className="recognition-progress-tracks">
            {stages.map((item, trackIndex) => (
              <div className="recognition-progress-track" key={item.id}>
                <motion.span
                  animate={{ scaleX: trackIndex <= stageIndex ? 1 : 0 }}
                  initial={{
                    scaleX: trackIndex < stageIndex || reduced ? 1 : 0,
                  }}
                  key={`${item.id}-${stage.id}`}
                  transition={{
                    duration:
                      !reduced && trackIndex === stageIndex
                        ? stage.duration / 1000
                        : 0,
                    ease: "linear",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <button
          aria-label="Skip introduction"
          className="recognition-skip"
          onClick={complete}
          type="button"
        >
          SKIP INTRO
          <ArrowRight aria-hidden="true" size={14} />
        </button>
      </footer>
    </motion.section>
  );
}
