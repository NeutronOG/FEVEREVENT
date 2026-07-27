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

    const frame = requestAnimationFrame(() =>
      setLowPower(
        (nav.hardwareConcurrency ?? 8) <= 4 ||
          (nav.deviceMemory ?? 8) <= 4 ||
          Boolean(connection?.saveData) ||
          connection?.effectiveType === "2g",
      ),
    );
    return () => cancelAnimationFrame(frame);
  }, []);

  return lowPower;
}
