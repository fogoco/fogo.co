"use client";

import { useEffect, useRef, useState } from "react";

export function ParallaxVideo({
  src,
  poster,
  className,
  frameClassName,
  allowSoundToggle,
  startMuted,
}: {
  src: string;
  poster?: string;
  className?: string;
  frameClassName?: string;
  allowSoundToggle?: boolean;
  startMuted?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [offset, setOffset] = useState(0);
  const [isMuted, setIsMuted] = useState(startMuted ?? true);

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

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = isMuted;

    async function ensurePlayback() {
      const currentVideo = videoRef.current;
      if (!currentVideo) return;

      try {
        await currentVideo.play();
      } catch {
        if (!currentVideo.muted) {
          currentVideo.muted = true;
          setIsMuted(true);
          try {
            await currentVideo.play();
          } catch {
            return;
          }
        }
      }
    }

    void ensurePlayback();
  }, [isMuted, src]);

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    video.muted = nextMuted;
    void video.play().catch(() => undefined);
  }

  return (
    <div ref={wrapRef} className={className}>
      <div
        className={`relative h-full w-full overflow-hidden ${
          frameClassName ?? "rounded-2xl"
        }`}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          className="h-[115%] w-full object-cover transition-transform duration-200"
          style={{ transform: `translateY(${offset}px) scale(1.05)` }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />
        {allowSoundToggle ? (
          <button
            type="button"
            onClick={toggleMute}
            className="absolute bottom-4 right-4 z-[2] rounded-full border border-white/25 bg-black/55 px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] text-white backdrop-blur hover:bg-black/70"
          >
            {isMuted ? "Unmute" : "Mute"}
          </button>
        ) : null}
      </div>
    </div>
  );
}
