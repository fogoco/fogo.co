import Link from "next/link";
import { ParallaxVideo } from "@/components/blocks/ParallaxVideo";
import type {
  BrandIntroData,
  EventTypesData,
  SignatureExperienceData,
  GalleryData,
  TestimonialsData,
  ProcessData,
  FaqData,
  BookingCtaData,
  ContactData,
  FooterData,
  MenuHighlightsData,
  VideoGalleryData,
  StatsData,
  WhyChooseUsData,
  PackagesData,
} from "@/lib/blocks/types";

const fogoLogoUrl =
  "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/media/logo%20fogo%20wh.png";
const joaoEspetoUrl =
  "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/media/jp.png";
const processIconUrls = [
  "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/media/icon%201.png",
  "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/media/icon%202.png",
  "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/media/icon%203.png",
] as const;
const processFireVideoUrl =
  "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/videos/fire.mp4";
const brandIntroVideoUrl =
  "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/videos/fogo%202.mp4";
const eventTypeVideoByTitle = {
  weddings:
    "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/videos/1.mp4",
  "corporate events":
    "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/videos/corporate.mp4",
  "private celebrations":
    "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/videos/private.mp4",
} as const;

const sectionClass =
  "container py-24 md:py-32";

export function BrandIntro({ data }: { data: BrandIntroData }) {
  return (
    <section className={sectionClass}>
      <div className="grid gap-14 md:grid-cols-12 md:gap-20">
        <div className="md:col-span-7">
          {data.eyebrow && (
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-gold-400">
              {data.eyebrow}
            </p>
          )}
          <h2 className="font-display text-4xl leading-tight md:text-5xl">
            {data.title}
          </h2>
          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            {data.body}
          </p>
        </div>
        <div className="md:col-span-5">
          {(data.videoUrl ?? brandIntroVideoUrl) ? (
            <video
              src={data.videoUrl ?? brandIntroVideoUrl}
              className="aspect-[4/5] w-full rounded-lg object-cover"
              muted
              loop
              autoPlay
              playsInline
            />
          ) : data.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.imageUrl}
              alt=""
              className="aspect-[4/5] w-full rounded-lg object-cover"
            />
          ) : (
            <div className="aspect-[4/5] w-full rounded-lg bg-muted" />
          )}
        </div>
      </div>
    </section>
  );
}

export function EventTypes({ data }: { data: EventTypesData }) {
  return (
    <section className={sectionClass}>
      <div className="mb-14 text-center">
        <h2 className="font-display text-4xl md:text-5xl">{data.title}</h2>
        {data.subtitle && (
          <p className="mt-4 text-muted-foreground">{data.subtitle}</p>
        )}
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {data.items.map((item, i) => {
          const titleKey = item.title.trim().toLowerCase() as keyof typeof eventTypeVideoByTitle;
          const videoUrl = item.videoUrl ?? eventTypeVideoByTitle[titleKey];
          return (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f0b09] transition hover:-translate-y-0.5 hover:border-ember-500/40"
            >
              {videoUrl ? (
                <video
                  src={videoUrl}
                  className="aspect-[4/3] w-full object-cover"
                  muted
                  loop
                  autoPlay
                  playsInline
                />
              ) : item.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.imageUrl}
                  alt=""
                  className="aspect-[4/3] w-full object-cover"
                />
              ) : null}
              <div className="p-6">
                <h3 className="font-display text-3xl text-white">{item.title}</h3>
                <p className="mt-3 min-h-[4.5rem] text-sm leading-relaxed text-white/65">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function SignatureExperience({
  data,
}: {
  data: SignatureExperienceData;
}) {
  return (
    <section id="experience" className={sectionClass}>
      <div className="grid gap-14 md:grid-cols-2 md:gap-20">
        <div>
          <h2 className="font-display text-4xl md:text-5xl">{data.title}</h2>
          <p className="mt-6 text-muted-foreground">{data.body}</p>
          <ul className="mt-8 space-y-3">
            {data.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-ember-500" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          {data.videoUrl ? (
            <video
              src={data.videoUrl}
              poster={data.imageUrl}
              className="aspect-[4/5] w-full rounded-lg object-cover"
              muted
              loop
              autoPlay
              playsInline
            />
          ) : data.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.imageUrl}
              alt=""
              className="aspect-[4/5] w-full rounded-lg object-cover"
            />
          ) : (
            <div className="aspect-[4/5] w-full rounded-lg bg-muted" />
          )}
        </div>
      </div>
    </section>
  );
}

export function Gallery({ data }: { data: GalleryData }) {
  return (
    <section className={sectionClass}>
      <div className="mb-14 max-w-2xl">
        {data.title && (
          <h2 className="font-display text-4xl md:text-5xl">{data.title}</h2>
        )}
        {data.subtitle && (
          <p className="mt-4 text-muted-foreground">{data.subtitle}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:auto-rows-[220px]">
        {data.images.map((img, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={img.url}
            alt={img.alt ?? ""}
            className={`h-full w-full rounded-xl object-cover ${
              i % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export function VideoGallery({ data }: { data: VideoGalleryData }) {
  return (
    <section className={sectionClass}>
      {data.title && (
        <h2 className="mb-10 font-display text-4xl md:text-5xl">{data.title}</h2>
      )}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {data.videos.map((v, i) => (
          <video
            key={i}
            src={v.url}
            poster={v.posterUrl}
            className="aspect-[9/16] w-full rounded-md object-cover"
            muted
            autoPlay
            loop
            playsInline
          />
        ))}
      </div>
    </section>
  );
}

export function Testimonials({ data }: { data: TestimonialsData }) {
  return (
    <section className={sectionClass}>
      {data.title && (
        <h2 className="mb-12 font-display text-4xl md:text-5xl">
          {data.title}
        </h2>
      )}
      <div className="grid gap-6 md:grid-cols-2">
        {data.items.map((t, i) => (
          <figure
            key={i}
            className="rounded-lg border border-border bg-card p-8"
          >
            <blockquote className="font-display text-xl leading-snug md:text-2xl">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-6 text-sm text-muted-foreground">
              <span className="text-foreground">{t.author}</span>
              {t.role && <> — {t.role}</>}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function Stats({ data }: { data: StatsData }) {
  return (
    <section className={sectionClass}>
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {data.items.map((s, i) => (
          <div key={i}>
            <div className="font-display text-4xl md:text-5xl">{s.value}</div>
            <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Process({ data }: { data: ProcessData }) {
  return (
    <>
      <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden">
        <ParallaxVideo
          src={processFireVideoUrl}
          className="h-[96vh] w-full"
          frameClassName="rounded-none"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/55" />
        <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center px-6 text-center">
          <h3 className="font-display animate-in fade-in slide-in-from-bottom-4 duration-1000 text-3xl leading-tight text-white drop-shadow-[0_8px_26px_rgba(0,0,0,0.6)] md:text-5xl">
            Every flame tells a story.
            <br />
            Let us craft yours.
          </h3>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="mb-12 font-display text-4xl md:text-5xl">{data.title}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {data.steps.map((s, i) => {
            const iconUrl = processIconUrls[i] ?? processIconUrls[2];
            return (
              <div
                key={i}
                className="rounded-2xl border border-white/12 bg-[#080808] p-8"
              >
                <div className="mb-8 text-white/95">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={iconUrl}
                    alt=""
                    className="h-14 w-14 object-contain"
                  />
                </div>
                <div className="font-display text-5xl text-ember-500">
                  0{i + 1}
                </div>
                <h3 className="mt-4 font-display text-2xl">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {s.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export function WhyChooseUs({ data }: { data: WhyChooseUsData }) {
  return (
    <section className={sectionClass}>
      <h2 className="mb-12 font-display text-4xl md:text-5xl">{data.title}</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {data.items.map((i, idx) => (
          <div key={idx} className="rounded-lg border border-border bg-card p-8">
            <h3 className="font-display text-xl">{i.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{i.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Packages({ data }: { data: PackagesData }) {
  return (
    <section className={sectionClass}>
      <h2 className="mb-12 font-display text-4xl md:text-5xl">{data.title}</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {data.tiers.map((t, i) => (
          <div
            key={i}
            className={`rounded-lg border p-8 ${
              t.highlighted
                ? "border-ember-500 bg-ember-500/5"
                : "border-border bg-card"
            }`}
          >
            <h3 className="font-display text-2xl">{t.name}</h3>
            {t.priceFrom && (
              <p className="mt-2 text-sm text-muted-foreground">
                From {t.priceFrom}
              </p>
            )}
            <ul className="mt-6 space-y-2 text-sm">
              {t.features.map((f, j) => (
                <li key={j}>• {f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function MenuHighlights({ data }: { data: MenuHighlightsData }) {
  return (
    <section className={sectionClass}>
      <h2 className="mb-12 font-display text-4xl md:text-5xl">{data.title}</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {data.items.map((it, i) => (
          <div key={i} className="overflow-hidden rounded-lg border border-border bg-card">
            {it.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={it.imageUrl} alt="" className="aspect-[4/3] w-full object-cover" />
            )}
            <div className="p-6">
              <h3 className="font-display text-xl">{it.name}</h3>
              {it.description && (
                <p className="mt-2 text-sm text-muted-foreground">{it.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Faq({ data }: { data: FaqData }) {
  return (
    <section className={sectionClass}>
      {data.title && (
        <h2 className="mb-10 font-display text-4xl md:text-5xl">{data.title}</h2>
      )}
      <div className="divide-y divide-border rounded-lg border border-border bg-card">
        {data.items.map((it, i) => (
          <details key={i} className="group p-6">
            <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
              {it.question}
              <span className="text-muted-foreground transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm text-muted-foreground">{it.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function BookingCta({ data }: { data: BookingCtaData }) {
  return (
    <section className={sectionClass}>
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-10 md:p-16">
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          {data.backgroundUrl && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.backgroundUrl}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/50 to-transparent" />
            </>
          )}
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={joaoEspetoUrl}
          alt="Premium fire-grilled meat"
          className="pointer-events-none absolute bottom-0 right-3 hidden h-[96%] w-auto drop-shadow-[0_18px_30px_rgba(0,0,0,0.42)] md:block lg:right-8"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.75) 20%, rgba(0,0,0,1) 38%, rgba(0,0,0,1) 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.75) 20%, rgba(0,0,0,1) 38%, rgba(0,0,0,1) 100%)",
          }}
        />
        <div className="relative max-w-2xl md:pr-52 lg:pr-64">
          <h2 className="font-display text-3xl md:text-5xl">{data.title}</h2>
          {data.body && (
            <p className="mt-4 text-muted-foreground">{data.body}</p>
          )}
          <Link
            href={data.ctaHref}
            className="btn-bronze mt-8 inline-flex items-center rounded-full px-7 py-3.5 text-sm font-medium"
          >
            {data.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Contact({ data }: { data: ContactData }) {
  return (
    <section id="contact" className={sectionClass}>
      <h2 className="mb-10 font-display text-4xl md:text-5xl">{data.title}</h2>
      <div className="grid gap-10 md:grid-cols-3">
        {data.email && (
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Email
            </p>
            <p className="mt-2">{data.email}</p>
          </div>
        )}
        {data.phone && (
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Phone
            </p>
            <p className="mt-2">{data.phone}</p>
          </div>
        )}
        {data.address && (
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Based in
            </p>
            <p className="mt-2">{data.address}</p>
          </div>
        )}
      </div>
      {data.socials && data.socials.length > 0 && (
        <div className="mt-10 flex gap-4 text-sm text-muted-foreground">
          {data.socials.map((s, i) => (
            <a key={i} href={s.href} className="hover:text-foreground">
              {s.label}
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

export function Footer({ data }: { data: FooterData }) {
  return (
    <footer className="border-t border-border">
      <div className="container py-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={fogoLogoUrl} alt="Fogo & Co" className="h-14 w-auto" />
            {data.tagline && (
              <p className="mt-2 text-sm text-muted-foreground">
                {data.tagline}
              </p>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{data.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
