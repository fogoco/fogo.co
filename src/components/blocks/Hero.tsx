"use client";

import type { HeroData } from "@/lib/blocks/types";
import Link from "next/link";
import { useEffect, useState } from "react";

const fogoLogoUrl =
  "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/media/logo%20fogo%20wh.png";

export function Hero({ data }: { data: HeroData }) {
  const overlay = data.overlayOpacity ?? 0.48;
  const [showStickyNav, setShowStickyNav] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowStickyNav(window.scrollY > 120);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobileMenu = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const details = event.currentTarget.closest("details");
    details?.removeAttribute("open");
  };

  return (
    <section className="relative isolate overflow-hidden border-b border-white/10">
      <div
        className={`fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-md transition-all duration-300 ${
          showStickyNav
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <div className="container flex h-24 items-center justify-between gap-4">
          <a href="#top" className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={fogoLogoUrl}
              alt="Fogo & Co"
              className="h-[3.2rem] w-auto opacity-95 md:h-[4rem]"
            />
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            <a href="#signature-menu" className="text-xs uppercase tracking-[0.16em] text-white/80 hover:text-white">
              Signature Menu
            </a>
            <a href="#gallery" className="text-xs uppercase tracking-[0.16em] text-white/80 hover:text-white">
              Moments
            </a>
            <a href="#booking" className="text-xs uppercase tracking-[0.16em] text-white/80 hover:text-white">
              Enquiry
            </a>
          </nav>

          <details className="relative md:hidden">
            <summary className="cursor-pointer list-none rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.16em] text-white/90">
              Menu
            </summary>
            <div className="absolute right-0 mt-3 w-52 rounded-xl border border-white/15 bg-black/90 p-3 shadow-xl backdrop-blur-md">
              <a
                href="#signature-menu"
                onClick={closeMobileMenu}
                className="block rounded-md px-3 py-2 text-sm text-white/85 hover:bg-white/10"
              >
                Signature Menu
              </a>
              <a
                href="#gallery"
                onClick={closeMobileMenu}
                className="mt-1 block rounded-md px-3 py-2 text-sm text-white/85 hover:bg-white/10"
              >
                Moments
              </a>
              <a
                href="#booking"
                onClick={closeMobileMenu}
                className="mt-1 block rounded-md px-3 py-2 text-sm text-white/85 hover:bg-white/10"
              >
                Enquiry
              </a>
            </div>
          </details>
        </div>
      </div>

      <div className="absolute inset-0 -z-10">
        {data.mediaType === "video" ? (
          <video
            className="h-full w-full object-cover"
            src={data.mediaUrl}
            poster={data.posterUrl}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="h-full w-full object-cover"
            src={data.mediaUrl}
            alt=""
          />
        )}
        <div className="absolute inset-0 bg-black" style={{ opacity: overlay }} />
        <div className="absolute inset-0 bg-[radial-gradient(1100px_520px_at_50%_0%,rgba(217,65,34,0.28),transparent_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-black/65 to-transparent" />
      </div>

      <div id="top" className="container relative flex min-h-[92vh] flex-col items-center justify-center py-24 text-center">
        <div
          className={`pointer-events-none absolute inset-x-0 top-10 flex justify-center transition-all duration-300 md:top-12 ${
            showStickyNav ? "-translate-y-2 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={fogoLogoUrl}
            alt="Fogo & Co"
            className="h-[5.1rem] w-auto opacity-95 md:h-[6.1rem]"
          />
        </div>
        {data.eyebrow && (
          <p className="mb-7 mt-14 inline-flex rounded-full border border-white/20 bg-black/30 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-gold-400 backdrop-blur-sm md:mt-16">
            {data.eyebrow}
          </p>
        )}
        <h1 className="font-display max-w-4xl text-5xl leading-[1.02] text-white sm:text-6xl md:text-8xl">
          {data.headline}
        </h1>
        {data.subheadline && (
          <p className="mt-7 max-w-2xl text-base text-white/78 md:text-lg">
            {data.subheadline}
          </p>
        )}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {data.ctaPrimary && (
            <Link
              href={data.ctaPrimary.href}
              className="btn-bronze inline-flex items-center rounded-full px-8 py-3.5 text-sm font-medium"
            >
              {data.ctaPrimary.label}
            </Link>
          )}
          {data.ctaSecondary && (
            <Link
              href={data.ctaSecondary.href}
              className="btn-bronze-soft inline-flex items-center rounded-full px-8 py-3.5 text-sm font-medium backdrop-blur-sm"
            >
              {data.ctaSecondary.label}
            </Link>
          )}
        </div>
        <div className="mt-14 h-10 w-px bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  );
}
