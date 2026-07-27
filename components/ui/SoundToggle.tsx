"use client";

import { Volume2, VolumeX } from "lucide-react";

type SoundToggleProps = {
  enabled: boolean;
  visible: boolean;
  onToggle: () => void;
};

export function SoundToggle({ enabled, visible, onToggle }: SoundToggleProps) {
  if (!visible) return null;

  return (
    <button
      aria-label={enabled ? "Mute ambient sound" : "Enable ambient sound"}
      className="sound-toggle"
      onClick={onToggle}
      type="button"
    >
      {enabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
      <span>{enabled ? "SOUND ON" : "SOUND OFF"}</span>
    </button>
  );
}
