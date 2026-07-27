"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useAmbientAudio() {
  const contextRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const [enabled, setEnabled] = useState(true);
  const [started, setStarted] = useState(false);

  const start = useCallback(() => {
    if (contextRef.current) return;

    const AudioContextClass =
      window.AudioContext ??
      (
        window as typeof window & {
          webkitAudioContext?: typeof AudioContext;
        }
      ).webkitAudioContext;
    if (!AudioContextClass) return;

    const context = new AudioContextClass();
    const gain = context.createGain();
    gain.gain.setValueAtTime(0, context.currentTime);
    gain.gain.linearRampToValueAtTime(0.018, context.currentTime + 2.2);
    gain.connect(context.destination);

    const oscillators = [47, 71].map((frequency, index) => {
      const oscillator = context.createOscillator();
      const oscillatorGain = context.createGain();
      oscillator.type = index === 0 ? "sine" : "triangle";
      oscillator.frequency.value = frequency;
      oscillatorGain.gain.value = index === 0 ? 0.7 : 0.14;
      oscillator.connect(oscillatorGain).connect(gain);
      oscillator.start();
      return oscillator;
    });

    contextRef.current = context;
    gainRef.current = gain;
    oscillatorsRef.current = oscillators;
    setStarted(true);
  }, []);

  const toggle = useCallback(() => {
    const next = !enabled;
    setEnabled(next);
    const context = contextRef.current;
    const gain = gainRef.current;
    if (context && gain) {
      gain.gain.cancelScheduledValues(context.currentTime);
      gain.gain.linearRampToValueAtTime(
        next ? 0.018 : 0,
        context.currentTime + 0.5,
      );
    }
  }, [enabled]);

  useEffect(
    () => () => {
      oscillatorsRef.current.forEach((oscillator) => oscillator.stop());
      void contextRef.current?.close();
    },
    [],
  );

  return { enabled, started, start, toggle };
}
