"use client";

import type { ButtonHTMLAttributes, PointerEvent } from "react";
import { useRef } from "react";

type MagneticButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function MagneticButton({
  children,
  className = "",
  variant = "secondary",
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const move = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.1;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.1;
    event.currentTarget.style.setProperty("--magnet-x", `${x}px`);
    event.currentTarget.style.setProperty("--magnet-y", `${y}px`);
  };

  const reset = () => {
    ref.current?.style.setProperty("--magnet-x", "0px");
    ref.current?.style.setProperty("--magnet-y", "0px");
  };

  return (
    <button
      ref={ref}
      className={`magnetic-button ${variant} ${className}`}
      onPointerMove={move}
      onPointerLeave={reset}
      {...props}
    >
      <span>{children}</span>
    </button>
  );
}
