import Link from "next/link";
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
        {data.imageUrl && (
          <div className="md:col-span-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.imageUrl}
              alt=""
              className="aspect-[4/5] w-full rounded-lg object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}

export function EventTypes({ data }: { data: EventTypesData }) {
  return (
    <section className={sectionClass}>
      <div className="mb-14 max-w-2xl">
        <h2 className="font-display text-4xl md:text-5xl">{data.title}</h2>
        {data.subtitle && (
          <p className="mt-4 text-muted-foreground">{data.subtitle}</p>
        )}
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {data.items.map((item, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-lg border border-border bg-card p-8 transition hover:border-ember-500/50"
          >
            {item.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.imageUrl}
                alt=""
                className="mb-6 aspect-[4/3] w-full rounded-md object-cover"
              />
            )}
            <h3 className="font-display text-2xl">{item.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
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
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {data.images.map((img, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={img.url}
            alt={img.alt ?? ""}
            className="aspect-square w-full rounded-md object-cover"
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
    <section className={sectionClass}>
      <h2 className="mb-12 font-display text-4xl md:text-5xl">{data.title}</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {data.steps.map((s, i) => (
          <div key={i} className="rounded-lg border border-border bg-card p-8">
            <div className="font-display text-5xl text-ember-500">
              0{i + 1}
            </div>
            <h3 className="mt-4 font-display text-2xl">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {s.description}
            </p>
          </div>
        ))}
      </div>
    </section>
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
        <div className="relative max-w-2xl">
          <h2 className="font-display text-3xl md:text-5xl">{data.title}</h2>
          {data.body && (
            <p className="mt-4 text-muted-foreground">{data.body}</p>
          )}
          <Link
            href={data.ctaHref}
            className="mt-8 inline-flex items-center rounded-full bg-ember-500 px-7 py-3.5 text-sm font-medium text-white transition hover:bg-ember-600"
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
            <p className="font-display text-2xl">Fogo & Co</p>
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
