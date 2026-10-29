"use client";
/* eslint-disable @next/next/no-img-element */

import { motion } from "motion/react";
import type { Invitation } from "@/data/invitations";

const ease = [0.16, 1, 0.3, 1] as const;

export function ExclusiveEventSequence({
  invitation,
}: {
  invitation: Invitation;
}) {
  return (
    <section className="exclusive-event-sequence">
      <div className="media-frame">
        <img
          alt="Amber light through FEVER's geometric ceiling"
          loading="lazy"
          src="/media/fever-grand-opening-texture.webp"
        />
        <div aria-hidden="true" className="media-grade" />
        <div className="media-words">
          <motion.span
            className="lineup-label"
            initial={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.9, ease }}
            viewport={{ amount: 0.8, once: false }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            [ LINE UP ]
          </motion.span>
          <motion.h3
            className="lineup-headliner"
            initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
            transition={{ duration: 1.1, ease }}
            viewport={{ amount: 0.8, once: false }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          >
            {invitation.headliner}
          </motion.h3>
          <ul className="lineup-support">
            {invitation.supportActs.map((act, index) => (
              <motion.li
                initial={{ opacity: 0, y: 18 }}
                key={act}
                transition={{ duration: 0.9, delay: 0.15 + index * 0.12, ease }}
                viewport={{ amount: 0.8, once: false }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                {act}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
      <div className="exclusive-event-title">
        <span>
          FRIDAY, NOVEMBER 6TH
          <br />
          SATURDAY, NOVEMBER 7TH
        </span>
        <motion.img
          alt="FEVER"
          className="exclusive-event-brand"
          initial={{ opacity: 0, y: 80, filter: "blur(14px)" }}
          loading="lazy"
          src="/brand/fever-logo.png"
          transition={{ duration: 1.2 }}
          viewport={{ amount: 0.6, once: true }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        />
        <h2>
          GRAND
          <br />
          OPENING
        </h2>
        <p className="exclusive-event-partner">
          PRESENTED WITH {invitation.presentedWith.toUpperCase()}
        </p>
      </div>
    </section>
  );
}
