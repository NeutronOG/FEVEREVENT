"use client";

import { motion } from "motion/react";
import { ShieldCheck, Sparkles, Wine } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function PrivilegesSection() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-labelledby="privileges-heading"
      className="privileges-section"
    >
      <div className="privileges-heading">
        <div>
          <p className="privileges-title">
            <Sparkles aria-hidden="true" size={14} />
            MEMBERSHIP BENEFITS
          </p>
          <h2 id="privileges-heading">
            Your card.
            <br />
            <em>Your privileges.</em>
          </h2>
        </div>
        <p className="privileges-intro">
          A permanent thank you, made for every night you spend with us.
        </p>
      </div>

      <div className="privilege-stage">
        <motion.article
          className="privilege privilege-lifetime"
          initial={{ y: reduced ? 0 : 20 }}
          transition={{ duration: reduced ? 0 : 0.65 }}
          viewport={{ amount: 0.2, once: true }}
          whileInView={{ y: 0 }}
        >
          <div className="privilege-card-top">
            <span>01 / ACCESS</span>
            <span className="privilege-badge">LIFETIME</span>
          </div>
          <div aria-hidden="true" className="privilege-art privilege-orbit">
            <strong>∞</strong>
          </div>
          <div className="privilege-copy">
            <h3>Always on the list.</h3>
            <p>Lifetime VIP Access to FEVER.</p>
          </div>
          <div className="privilege-card-bottom">
            <ShieldCheck aria-hidden="true" size={15} />
            <span>YOUR PLACE. EVERY NIGHT.</span>
          </div>
        </motion.article>

        <motion.article
          className="privilege privilege-shots"
          initial={{ y: reduced ? 0 : 20 }}
          transition={{
            duration: reduced ? 0 : 0.65,
            delay: reduced ? 0 : 0.1,
          }}
          viewport={{ amount: 0.2, once: true }}
          whileInView={{ y: 0 }}
        >
          <div className="privilege-card-top">
            <span>02 / ON THE HOUSE</span>
            <span className="privilege-badge">EVERY VISIT</span>
          </div>
          <div aria-hidden="true" className="privilege-art">
            <strong>2</strong>
            <div className="privilege-glasses">
              <Wine size={38} strokeWidth={1} />
              <Wine size={38} strokeWidth={1} />
            </div>
          </div>
          <div className="privilege-copy">
            <h3>A toast to you.</h3>
            <p>Two Free Shots every time you visit.</p>
          </div>
          <div className="privilege-card-bottom">
            <Sparkles aria-hidden="true" size={15} />
            <span>GOOD NIGHTS START HERE.</span>
          </div>
        </motion.article>
      </div>

      <div className="privileges-footer">
        <span className="privilege-footnote">
          <ShieldCheck aria-hidden="true" size={13} />
          PERSONAL · NON-TRANSFERABLE
        </span>
        <span>ONE CARD. EVERY NIGHT.</span>
      </div>
    </section>
  );
}
