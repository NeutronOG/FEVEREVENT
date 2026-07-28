"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { LoadingExperience } from "./LoadingExperience";
import { InvitationGate } from "./InvitationGate";
import { RecognitionSequence } from "./RecognitionSequence";
import { GuestCardReveal } from "./GuestCardReveal";
import { StorytellingSection } from "./StorytellingSection";
import { InvitationLetter } from "./InvitationLetter";
import { PrivilegesSection } from "./PrivilegesSection";
import { ExclusiveEventSequence } from "./ExclusiveEventSequence";
import { InvitationClosing } from "./InvitationClosing";
import { AcceptedInvitation } from "./AcceptedInvitation";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import type { Invitation } from "@/data/invitations";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";
import { useInvitationState } from "@/hooks/useInvitationState";
import { useGlobalVisitorCount } from "@/hooks/useGlobalVisitorCount";
import { registerGuest, type RegisteredGuest } from "@/lib/guest-registration";
import { GuestDetailsForm, type GuestDetails } from "./GuestDetailsForm";

export function InvitationExperience({
  invitation,
}: {
  invitation: Invitation;
}) {
  const [phase, setPhase] = useState<
    "loading" | "gate" | "details" | "recognition" | "experience"
  >("loading");
  const [guestDetails, setGuestDetails] = useState<GuestDetails | null>(null);
  const [registeredGuest, setRegisteredGuest] =
    useState<RegisteredGuest | null>(null);
  const { accepted, accept } = useInvitationState(invitation.token);
  const lowPower = useDevicePerformance();
  const visitorCount = useGlobalVisitorCount();

  useEffect(() => {
    const timer = window.setTimeout(() => setPhase("gate"), 1650);
    return () => window.clearTimeout(timer);
  }, []);

  const openDetails = () => {
    setPhase("details");
  };

  const enter = async (details: GuestDetails) => {
    const guest = await registerGuest(invitation.token, details);
    setGuestDetails(details);
    setRegisteredGuest(guest);
    setPhase("recognition");
  };

  const startExperience = useCallback(() => {
    setPhase("experience");
    window.setTimeout(() => window.scrollTo({ top: 0 }), 50);
  }, []);

  const personalizedInvitation = guestDetails
    ? {
        ...invitation,
        firstName: guestDetails.firstName,
        fullName: `${guestDetails.firstName} ${guestDetails.lastName}`,
        memberNumber: registeredGuest?.memberNumber ?? invitation.memberNumber,
      }
    : invitation;

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
          <InvitationGate
            invitation={invitation}
            key="gate"
            onEnter={openDetails}
          />
        )}
        {phase === "details" && (
          <GuestDetailsForm key="details" onComplete={enter} />
        )}
        {phase === "recognition" && (
          <RecognitionSequence key="recognition" onComplete={startExperience} />
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
              <Image
                alt="FEVER"
                className="experience-logo"
                height={150}
                priority
                src="/brand/fever-logo-mark.png"
                width={567}
              />
            </a>
            <span>FEVER · {String(visitorCount).padStart(4, "0")}</span>
          </header>
          <div id="top" />
          <GuestCardReveal invitation={personalizedInvitation} />
          <StorytellingSection />
          <InvitationLetter />
          <PrivilegesSection />
          <ExclusiveEventSequence />
          <InvitationClosing
            accepted={accepted}
            invitation={personalizedInvitation}
            onAccept={handleAccept}
          />
          <AnimatePresence>
            {accepted && (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 50 }}
              >
                <AcceptedInvitation
                  guest={registeredGuest}
                  invitation={personalizedInvitation}
                />
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
    </main>
  );
}
