import type { HeroData } from "@/lib/blocks/types";
import Link from "next/link";

export function Hero({ data }: { data: HeroData }) {
  const overlay = data.overlayOpacity ?? 0.55;
  return (
    <section className="relative isolate overflow-hidden">
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
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlay }}
        />
        <div className="absolute inset-0 fire-gradient" />
      </div>

      <div className="container flex min-h-[88vh] flex-col justify-end pb-24 pt-40">
        {data.eyebrow && (
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-gold-400">
            {data.eyebrow}
          </p>
        )}
        <h1 className="font-display max-w-3xl text-5xl leading-[1.05] text-white sm:text-6xl md:text-7xl">
          {data.headline}
        </h1>
        {data.subheadline && (
          <p className="mt-6 max-w-xl text-base text-white/80 md:text-lg">
            {data.subheadline}
          </p>
        )}
        <div className="mt-10 flex flex-wrap gap-3">
          {data.ctaPrimary && (
            <Link
              href={data.ctaPrimary.href}
              className="inline-flex items-center rounded-full bg-ember-500 px-7 py-3.5 text-sm font-medium text-white transition hover:bg-ember-600"
            >
              {data.ctaPrimary.label}
            </Link>
          )}
          {data.ctaSecondary && (
            <Link
              href={data.ctaSecondary.href}
              className="inline-flex items-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-medium text-white/90 transition hover:border-white/60"
            >
              {data.ctaSecondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
