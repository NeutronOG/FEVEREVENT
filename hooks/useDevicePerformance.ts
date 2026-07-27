"use client";

import { useEffect, useState } from "react";

export function useDevicePerformance() {
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number };
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const compactViewport = window.matchMedia(
      "(max-width: 699px), (pointer: coarse)",
    ).matches;

    const frame = requestAnimationFrame(() =>
      setLowPower(
        (nav.hardwareConcurrency ?? 8) <= 4 ||
          (nav.deviceMemory ?? 8) <= 4 ||
          Boolean(connection?.saveData) ||
          connection?.effectiveType === "2g" ||
          compactViewport,
      ),
    );
    return () => cancelAnimationFrame(frame);
  }, []);

  return lowPower;
}
