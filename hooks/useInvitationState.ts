"use client";

import { useCallback, useEffect, useState } from "react";

export function useInvitationState(token: string) {
  const storageKey = `fever-invitation:${token}`;
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() =>
      setAccepted(window.localStorage.getItem(storageKey) === "accepted"),
    );
    return () => cancelAnimationFrame(frame);
  }, [storageKey]);

  const accept = useCallback(() => {
    window.localStorage.setItem(storageKey, "accepted");
    setAccepted(true);
  }, [storageKey]);

  return { accepted, accept };
}
