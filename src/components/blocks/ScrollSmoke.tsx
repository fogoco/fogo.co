"use client";

import { useEffect, useState } from "react";

export function ScrollSmoke() {
  const [y, setY] = useState(0);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    let raf = 0;
    let decayTimer: ReturnType<typeof setInterval> | null = null;

    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setY(window.scrollY || 0);
        setPulse(0.22);
      });
    };

    decayTimer = setInterval(() => {
      setPulse((v) => Math.max(0, v - 0.02));
    }, 70);

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      if (decayTimer) clearInterval(decayTimer);
    };
  }, []);

  const scrollOpacity = Math.min(0.18, y / 2600);
  const opacity = Math.min(0.24, scrollOpacity + pulse);
  const drift = Math.min(48, y * 0.06);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
      style={{ opacity }}
    >
      <div
        className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-white/10 blur-3xl"
        style={{ transform: `translateY(${-drift}px)` }}
      />
      <div
        className="absolute right-0 top-1/2 h-80 w-80 rounded-full bg-white/8 blur-3xl"
        style={{ transform: `translateY(${-drift * 1.2}px)` }}
      />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-white/10 to-transparent blur-2xl" />
    </div>
  );
}
