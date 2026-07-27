"use client";

import { useEffect, useState } from "react";

const DEVICE_ID_KEY = "fever-visitor-device-id";
const VISIT_COUNTER_URL =
  process.env.NEXT_PUBLIC_VISIT_COUNTER_URL ?? "/api/visits";

function getDeviceId() {
  try {
    const existing = window.localStorage.getItem(DEVICE_ID_KEY);
    if (existing) return existing;

    const deviceId = crypto.randomUUID();
    window.localStorage.setItem(DEVICE_ID_KEY, deviceId);
    return deviceId;
  } catch {
    return null;
  }
}

export function useGlobalVisitorCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (["localhost", "127.0.0.1"].includes(window.location.hostname)) {
      return;
    }

    const controller = new AbortController();
    const deviceId = getDeviceId();
    const request = deviceId
      ? fetch(VISIT_COUNTER_URL, {
          body: JSON.stringify({ deviceId }),
          headers: { "content-type": "application/json" },
          method: "POST",
          signal: controller.signal,
        })
      : fetch(VISIT_COUNTER_URL, { signal: controller.signal });

    request
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load visitor count");
        return response.json() as Promise<{ count: number }>;
      })
      .then(({ count: nextCount }) => setCount(nextCount))
      .catch(() => {
        // The invitation remains usable when the counter service is unavailable.
      });

    return () => controller.abort();
  }, []);

  return count;
}
