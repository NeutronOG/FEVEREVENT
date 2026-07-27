"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode, useEffect, useState } from "react";
import { motion } from "motion/react";
import { GuestCardFallback } from "./GuestCardFallback";
import type { Invitation } from "@/data/invitations";

const GuestCardScene = dynamic(() => import("./GuestCardScene"), {
  ssr: false,
  loading: () => <div className="card-loading" />,
});

class CanvasBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")),
    );
  } catch {
    return false;
  }
}

export function GuestCardReveal({
  invitation,
  lowPower,
}: {
  invitation: Invitation;
  lowPower: boolean;
}) {
  const [webgl, setWebgl] = useState<boolean | null>(null);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setWebgl(supportsWebGL()));
    return () => cancelAnimationFrame(frame);
  }, []);

  const fallback = (
    <div className="fallback-card-wrap">
      <GuestCardFallback invitation={invitation} />
    </div>
  );

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
        {webgl === null && <div className="card-loading" />}
        {webgl === false && fallback}
        {webgl && (
          <CanvasBoundary fallback={fallback}>
            <GuestCardScene invitation={invitation} lowPower={lowPower} />
          </CanvasBoundary>
        )}
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
      <p className="card-instruction">TAP TO TURN · DRAG TO MOVE</p>
    </section>
  );
}
