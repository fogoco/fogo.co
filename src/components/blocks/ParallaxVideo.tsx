"use client";

import { useEffect, useRef, useState } from "react";

export function ParallaxVideo({
  src,
  poster,
  className,
  frameClassName,
}: {
  src: string;
  poster?: string;
  className?: string;
  frameClassName?: string;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    function onScroll() {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (vh - rect.top) / (vh + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      const translate = (clamped - 0.5) * 70;
      setOffset(translate);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={wrapRef} className={className}>
      <div
        className={`relative h-full w-full overflow-hidden ${
          frameClassName ?? "rounded-2xl"
        }`}
      >
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          className="h-[115%] w-full object-cover transition-transform duration-200"
          style={{ transform: `translateY(${offset}px) scale(1.05)` }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />
      </div>
    </div>
  );
}
