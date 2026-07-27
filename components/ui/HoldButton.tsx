"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const HOLD_DURATION = 1800;

export function HoldButton({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const startRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const completeRef = useRef(false);

  const stop = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    startRef.current = null;
    if (!completeRef.current) setProgress(0);
  }, []);

  const begin = useCallback(() => {
    if (startRef.current || completeRef.current) return;
    startRef.current = performance.now();

    const tick = (now: number) => {
      const next = Math.min(
        (now - (startRef.current ?? now)) / HOLD_DURATION,
        1,
      );
      setProgress(next);
      if (next >= 1) {
        completeRef.current = true;
        navigator.vibrate?.(28);
        onComplete();
        return;
      }
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
  }, [onComplete]);

  useEffect(() => stop, [stop]);

  return (
    <button
      aria-label="Hold for 1.8 seconds to enter the invitation"
      className="hold-button"
      onKeyDown={(event) => {
        if (event.key === " " || event.key === "Enter") {
          event.preventDefault();
          begin();
        }
      }}
      onKeyUp={stop}
      onPointerCancel={stop}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        begin();
      }}
      onPointerLeave={stop}
      onPointerUp={stop}
      style={{ "--hold-progress": progress } as React.CSSProperties}
      type="button"
    >
      <svg aria-hidden="true" className="hold-ring" viewBox="0 0 120 120">
        <circle className="hold-ring-track" cx="60" cy="60" r="56" />
        <circle className="hold-ring-progress" cx="60" cy="60" r="56" />
      </svg>
      <span>HOLD</span>
      <small>TO ENTER</small>
    </button>
  );
}
