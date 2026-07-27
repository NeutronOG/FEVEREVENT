"use client";

import { motion } from "motion/react";

export function LoadingExperience() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="loading-experience"
      exit={{ opacity: 0, filter: "blur(10px)" }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div>
        <span className="brand-mark">FEVER</span>
        <p>PRIVATE INVITATION</p>
      </div>
      <div className="loading-line">
        <motion.span
          animate={{ scaleX: 1 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 1.45, ease: [0.25, 1, 0.5, 1] }}
        />
      </div>
    </motion.div>
  );
}
