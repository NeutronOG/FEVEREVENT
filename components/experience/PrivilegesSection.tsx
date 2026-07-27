"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Invitation } from "@/data/invitations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function PrivilegesSection({ invitation }: { invitation: Invitation }) {
  const sectionRef = useRef<HTMLElement>(null);
  const symbolRef = useRef<HTMLDivElement>(null);
  const shotsRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=190%",
          pin: true,
          scrub: 0.8,
        },
      });
      timeline
        .fromTo(
          ".privileges-title",
          { opacity: 0, letterSpacing: "0.25em", y: 30 },
          { opacity: 1, letterSpacing: "0.12em", y: 0 },
        )
        .fromTo(
          symbolRef.current,
          { opacity: 0, scale: 0.5, filter: "blur(18px)" },
          { opacity: 1, scale: 1, filter: "blur(0px)" },
        )
        .to(symbolRef.current, {
          opacity: 0,
          scale: 1.35,
          filter: "blur(18px)",
        })
        .fromTo(
          shotsRef.current,
          { opacity: 0, scale: 0.65, clipPath: "inset(50% 0 50% 0)" },
          { opacity: 1, scale: 1, clipPath: "inset(0% 0 0% 0)" },
          "<",
        );
    }, sectionRef);
    return () => context.revert();
  }, [reduced]);

  return (
    <section className="privileges-section" ref={sectionRef}>
      <p className="privileges-title">YOUR HONORED GUEST PRIVILEGES</p>
      <div className="privilege-stage">
        <div className="privilege privilege-lifetime" ref={symbolRef}>
          <strong>∞</strong>
          <p>LIFETIME VIP ACCESS TO FEVER</p>
        </div>
        <div className="privilege privilege-shots" ref={shotsRef}>
          <strong>
            {String(invitation.complimentaryShots).padStart(2, "0")}
          </strong>
          <p>COMPLIMENTARY SHOTS</p>
          <span>EVERY TIME YOU VISIT</span>
        </div>
      </div>
      <span className="privilege-footnote">
        PERSONAL · NON-TRANSFERABLE · LIFETIME
      </span>
    </section>
  );
}
