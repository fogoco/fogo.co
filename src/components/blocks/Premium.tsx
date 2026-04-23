import Link from "next/link";
import type { PremiumSplitData, SignatureMeatsData } from "@/lib/blocks/types";
import { ParallaxVideo } from "./ParallaxVideo";

const sectionClass = "container py-24 md:py-32";

const signatureItemOverrides = [
  {
    name: "Rump cap",
    imageUrl:
      "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/media/Rump%20cap.jpg",
  },
  {
    name: "Flank steak",
    imageUrl:
      "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/media/Flank%20steak.jpg",
  },
  {
    name: "Beef ribs",
    imageUrl: null,
  },
  {
    name: "Lamb",
    imageUrl:
      "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/media/lamb.jpg",
  },
  {
    name: "Chicken",
    imageUrl:
      "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/media/chicken.png",
  },
  {
    name: "Salad",
    imageUrl:
      "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/media/salad.jpg",
  },
] as const;

function resolveSignatureItem(
  item: SignatureMeatsData["items"][number],
  index: number
) {
  const override = signatureItemOverrides[index];

  if (!override) {
    return { name: item.name, imageUrl: item.imageUrl };
  }

  return {
    name: override.name,
    imageUrl: override.imageUrl ?? item.imageUrl,
  };
}

export function PremiumSplit({
  data,
  accentLabel,
}: {
  data: PremiumSplitData;
  accentLabel?: string;
}) {
  const reverse = data.reverse;
  const isFireExperience = (data.eyebrow ?? accentLabel ?? "")
    .toLowerCase()
    .includes("fire experience");
  return (
    <section className={sectionClass}>
      <div
        className={`grid items-center gap-10 md:gap-16 md:grid-cols-2 ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className={`relative ${isFireExperience ? "mx-auto w-full max-w-[30rem]" : ""}`}>
          {data.videoUrl ? (
            <ParallaxVideo
              src={data.videoUrl}
              poster={data.imageUrl}
              className={`${isFireExperience ? "aspect-[5/6]" : "aspect-[4/5]"} w-full`}
            />
          ) : data.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.imageUrl}
              alt=""
              className={`${isFireExperience ? "aspect-[5/6]" : "aspect-[4/5]"} w-full rounded-2xl object-cover`}
            />
          ) : (
            <div
              className={`${isFireExperience ? "aspect-[5/6]" : "aspect-[4/5]"} w-full rounded-2xl bg-muted`}
            />
          )}
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
        </div>
        <div>
          {(data.eyebrow || accentLabel) && (
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-gold-400">
              {data.eyebrow ?? accentLabel}
            </p>
          )}
          <h2 className="font-display text-4xl leading-tight md:text-5xl">
            {data.title}
          </h2>
          <p className="mt-5 text-muted-foreground">{data.body}</p>
          {data.bullets.length > 0 && (
            <ul className="mt-8 space-y-3">
              {data.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-sm md:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember-500" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
          {data.ctaLabel && data.ctaHref && (
            <Link
              href={data.ctaHref}
              className="btn-bronze-soft mt-10 inline-flex items-center rounded-full px-6 py-3 text-sm font-medium"
            >
              {data.ctaLabel} →
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export function SignatureMeats({ data }: { data: SignatureMeatsData }) {
  return (
    <section className={sectionClass}>
      <div className="mb-12 max-w-2xl">
        {data.eyebrow && (
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold-400">
            {data.eyebrow}
          </p>
        )}
        <h2 className="font-display text-4xl leading-tight md:text-5xl">
          {data.title}
        </h2>
        {data.subtitle && (
          <p className="mt-4 text-muted-foreground">{data.subtitle}</p>
        )}
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {data.items.map((it, i) => {
          const resolved = resolveSignatureItem(it, i);
          return (
            <article
              key={i}
              className="group relative overflow-hidden rounded-xl border border-border bg-card"
            >
              {resolved.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={resolved.imageUrl}
                  alt={resolved.name}
                  className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
                {it.cut && (
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold-400">
                    {it.cut}
                  </p>
                )}
                <h3 className="mt-1 font-display text-2xl text-white">{resolved.name}</h3>
                {it.description && (
                  <p className="mt-2 text-sm text-white/70">{it.description}</p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
