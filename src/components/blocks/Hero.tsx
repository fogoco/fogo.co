import type { HeroData } from "@/lib/blocks/types";
import Link from "next/link";

const fogoLogoUrl =
  "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/media/logo%20fogo%20wh.png";

export function Hero({ data }: { data: HeroData }) {
  const overlay = data.overlayOpacity ?? 0.48;
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10">
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

      <div className="container relative flex min-h-[92vh] flex-col items-center justify-center py-24 text-center">
        <div className="absolute inset-x-0 top-10 flex justify-center md:top-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={fogoLogoUrl}
            alt="Fogo & Co"
            className="h-[3.75rem] w-auto opacity-95 md:h-[4.5rem]"
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
