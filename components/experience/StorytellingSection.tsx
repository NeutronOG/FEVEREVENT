"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const phrases = [
  "THE MUSIC.",
  "THE PEOPLE.",
  "THE ENERGY.",
  "ONE YEAR OF NIGHTS WE WILL NEVER FORGET.",
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
          { opacity: 0.65, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            scrollTrigger: {
              trigger: panel,
              start: "top 90%",
              toggleActions: "play none none none",
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
