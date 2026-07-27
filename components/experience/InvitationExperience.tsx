"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { LoadingExperience } from "./LoadingExperience";
import { InvitationGate } from "./InvitationGate";
import { RecognitionSequence } from "./RecognitionSequence";
import { GuestCardReveal } from "./GuestCardReveal";
import { StorytellingSection } from "./StorytellingSection";
import { InvitationLetter } from "./InvitationLetter";
import { PrivilegesSection } from "./PrivilegesSection";
import { AnniversarySequence } from "./AnniversarySequence";
import { InvitationClosing } from "./InvitationClosing";
import { AcceptedInvitation } from "./AcceptedInvitation";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { SoundToggle } from "@/components/ui/SoundToggle";
import type { Invitation } from "@/data/invitations";
import { useAmbientAudio } from "@/hooks/useAmbientAudio";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";
import { useInvitationState } from "@/hooks/useInvitationState";

export function InvitationExperience({
  invitation,
}: {
  invitation: Invitation;
}) {
  const [phase, setPhase] = useState<"loading" | "gate" | "experience">(
    "loading",
  );
  const { accepted, accept } = useInvitationState(invitation.token);
  const audio = useAmbientAudio();
  const lowPower = useDevicePerformance();

  useEffect(() => {
    const timer = window.setTimeout(() => setPhase("gate"), 1650);
    return () => window.clearTimeout(timer);
  }, []);

  const enter = () => {
    audio.start();
    setPhase("experience");
    window.setTimeout(() => window.scrollTo({ top: 0 }), 50);
  };

  const handleAccept = () => {
    accept();
    window.setTimeout(() => {
      document
        .querySelector("#accepted")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  };

  return (
    <main className={`fever-experience ${lowPower ? "low-performance" : ""}`}>
      <GrainOverlay />
      <AnimatePresence mode="wait">
        {phase === "loading" && <LoadingExperience key="loading" />}
        {phase === "gate" && (
          <InvitationGate invitation={invitation} key="gate" onEnter={enter} />
        )}
      </AnimatePresence>

      {phase === "experience" && (
        <motion.div
          animate={{ opacity: 1 }}
          className="experience-content"
          initial={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          <header className="experience-header">
            <a aria-label="FEVER invitation top" href="#top">
              FEVER
            </a>
            <span>HONORED GUEST · {invitation.memberNumber}</span>
          </header>
          <div id="top" />
          <RecognitionSequence />
          <GuestCardReveal invitation={invitation} lowPower={lowPower} />
          <StorytellingSection invitation={invitation} />
          <InvitationLetter />
          <PrivilegesSection invitation={invitation} />
          <AnniversarySequence invitation={invitation} />
          <InvitationClosing
            accepted={accepted}
            invitation={invitation}
            onAccept={handleAccept}
          />
          <AnimatePresence>
            {accepted && (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 50 }}
              >
                <AcceptedInvitation invitation={invitation} />
              </motion.div>
            )}
          </AnimatePresence>
          <footer className="site-footer">
            <span>FEVER</span>
            <p>PRIVATE INVITATION · NOT FOR PUBLIC DISTRIBUTION</p>
            <span>MMXXVI</span>
          </footer>
        </motion.div>
      )}

      <SoundToggle
        enabled={audio.enabled}
        onToggle={audio.toggle}
        visible={audio.started}
      />
    </main>
  );
}
