"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const HOLD_DURATION_MS = 1000;
const RING_CIRCUMFERENCE = 352;

export function HoldButton({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const startRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const completeRef = useRef(false);

  const complete = useCallback(() => {
    if (completeRef.current) return;
    completeRef.current = true;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = null;
    setProgress(1);
    navigator.vibrate?.(28);
    onComplete();
  }, [onComplete]);

  const stop = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = null;
    startRef.current = null;
    if (!completeRef.current) setProgress(0);
  }, []);

  const begin = useCallback(() => {
    if (startRef.current || completeRef.current) return;
    startRef.current = performance.now();

    const tick = (now: number) => {
      const next = Math.min(
        (now - (startRef.current ?? now)) / HOLD_DURATION_MS,
        1,
      );
      setProgress(next);
      if (next < 1) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    timerRef.current = window.setTimeout(complete, HOLD_DURATION_MS);
  }, [complete]);

  useEffect(() => stop, [stop]);

  return (
    <button
      aria-label="Hold for 1 second to enter the invitation"
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
        event.currentTarget.setPointerCapture?.(event.pointerId);
        begin();
      }}
      onPointerUp={stop}
      style={{ "--hold-progress": progress } as React.CSSProperties}
      type="button"
    >
      <svg aria-hidden="true" className="hold-ring" viewBox="0 0 120 120">
        <circle className="hold-ring-track" cx="60" cy="60" r="56" />
        <circle
          className="hold-ring-progress"
          cx="60"
          cy="60"
          r="56"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={RING_CIRCUMFERENCE * (1 - progress)}
        />
      </svg>
      <span>BEGIN</span>
      <small>HOLD 1 SECOND</small>
    </button>
  );
}
