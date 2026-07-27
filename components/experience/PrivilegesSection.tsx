"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function PrivilegesSection() {
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
      <p className="privileges-title">
        YOUR CARD INCLUDES EXCLUSIVE PRIVILEGES:
      </p>
      <div className="privilege-stage">
        <div className="privilege privilege-lifetime" ref={symbolRef}>
          <strong>∞</strong>
          <p>Lifetime VIP Access to FEVER.</p>
        </div>
        <div className="privilege privilege-shots" ref={shotsRef}>
          <strong>2</strong>
          <p>Two Free Shots every time you visit.</p>
        </div>
      </div>
      <span className="privilege-footnote">PERSONAL · NON-TRANSFERABLE</span>
    </section>
  );
}
