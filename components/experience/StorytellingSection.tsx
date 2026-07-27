"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const phrases = [
  "YOUR PRESENCE.",
  "YOUR LOYALTY.",
  "YOUR ENERGY.",
  "YOU HELPED CREATE THE NIGHTS WE REMEMBER.",
];

export function StorytellingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".story-panel");
      panels.forEach((panel) => {
        const text = panel.querySelector(".story-phrase");
        gsap.fromTo(
          text,
          { opacity: 0.08, y: 50, filter: "blur(12px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scrollTrigger: {
              trigger: panel,
              start: "top 62%",
              end: "bottom 45%",
              scrub: 0.8,
            },
          },
        );
      });
    }, sectionRef);

    return () => context.revert();
  }, [reduced]);

  return (
    <section className="storytelling-section" ref={sectionRef}>
      <div className="story-panels">
        {phrases.map((phrase, index) => (
          <div className="story-panel" key={phrase}>
            <span>0{index + 1}</span>
            <h3 className="story-phrase">{phrase}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
