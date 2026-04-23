import Link from "next/link";
import { ParallaxVideo } from "@/components/blocks/ParallaxVideo";
import { InstagramTimeline } from "@/components/blocks/InstagramTimeline";
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
const eventTypeImageByTitle = {
  weddings:
    "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/media/wedding.png",
  "corporate events":
    "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/media/corporate.png",
  "private celebrations":
    "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/media/private.png",
} as const;

const testimonialOverrides: TestimonialsData["items"] = [
  {
    quote:
      "We couldn't be happier with the experience we had with Fogo & Co. They catered our event for 125 people and absolutely exceeded expectations in every way. The food was incredible, beautifully presented, and the team handled everything with calm confidence and professionalism.",
    author: "SJJA Wynnum",
    role: "Google Review",
  },
  {
    quote:
      "Absolutely stunning food at the Brazilian BBQ these guys catered for us. Tasty, juicy meats and gorgeous potato salad and sides. Couldn't fault it at all, and all with a smile on their face.",
    author: "Mollie Challender",
    role: "Google Review",
  },
  {
    quote:
      "Fogo & Co catered an event I went to and the BBQ was incredible. The meat had so much flavour, I could've gone back for thirds. I'll definitely be booking for my own events in future.",
    author: "Suzie Claxton",
    role: "Google Review",
  },
  {
    quote:
      "Fogo & Co catered our annual Christmas party. Everything was next level, couldn't fault a thing. The meat melted in your mouth and the service was exceptional.",
    author: "Anthony Collins",
    role: "Google Review",
  },
  {
    quote:
      "Fogo & Co catered our event and absolutely nailed it. The team were super friendly and kept everything flowing smoothly. The meat was unreal, real Brazilian flavour, cooked just right.",
    author: "Rhuan Silva de Souza",
    role: "Google Review",
  },
  {
    quote:
      "We had a fantastic experience with Fogo & Co at our company event. The food was delicious and beautifully presented, and the staff were professional, friendly, and attentive. Highly recommended.",
    author: "Marion Lemetayer",
    role: "Google Review",
  },
];
const googleReviewsUrl =
  "https://www.google.com/search?q=fogo%26co+review#lrd=0x6b937524947678b9:0x6562a777da16423f,1,,,,";
const instagramProfileUrl = "https://www.instagram.com/fogoco.au";
const linkedInProfileUrl = "https://www.linkedin.com/company/fogoco/posts/?feedView=all";

const sectionClass =
  "container py-24 md:py-32";

export function BrandIntro({ data }: { data: BrandIntroData }) {
  const fallbackVideoUrl =
    (data.eyebrow ?? "").toLowerCase().includes("about fogo") ||
    data.title.toLowerCase().includes("brazilian fire")
      ? brandIntroVideoUrl
      : undefined;
  const mediaVideoUrl = data.videoUrl ?? fallbackVideoUrl;

  return (
    <section className={sectionClass}>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 text-center md:gap-14">
        <div className="max-w-3xl">
          {data.eyebrow && (
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-gold-400">
              {data.eyebrow}
            </p>
          )}
          <h2 className="font-display text-4xl leading-tight md:text-5xl">
            {data.title}
          </h2>
          <p className="mt-6 text-base text-muted-foreground md:text-lg">
            {data.body}
          </p>
        </div>
        <div className="w-full max-w-[26rem] md:max-w-[28rem]">
          {mediaVideoUrl ? (
            <ParallaxVideo
              src={mediaVideoUrl}
              poster={data.imageUrl}
              className="aspect-[4/5] w-full"
              allowSoundToggle
              startMuted={false}
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
          const titleKey = item.title.trim().toLowerCase() as keyof typeof eventTypeImageByTitle;
          const imageByIndex =
            i === 0
              ? eventTypeImageByTitle.weddings
              : i === 1
                ? eventTypeImageByTitle["corporate events"]
                : i === 2
                  ? eventTypeImageByTitle["private celebrations"]
                  : undefined;
          const imageUrl = imageByIndex ?? eventTypeImageByTitle[titleKey] ?? item.imageUrl;
          return (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f0b09] transition hover:-translate-y-0.5 hover:border-ember-500/40"
            >
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
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
    <section id="gallery" className={sectionClass}>
      {(data.title || data.subtitle) && (
        <div className="mb-10 text-center md:mb-12">
          {data.title && <h2 className="font-display text-4xl md:text-5xl">{data.title}</h2>}
          {data.subtitle && <p className="mt-4 text-muted-foreground">{data.subtitle}</p>}
        </div>
      )}
      <InstagramTimeline />
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
  const items = testimonialOverrides;
  const sliderItems = [...items, ...items];

  return (
    <section className={sectionClass}>
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        {data.title && (
          <h2 className="font-display text-4xl md:text-5xl">
            {data.title}
          </h2>
        )}
        <a
          href={googleReviewsUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-bronze-soft inline-flex items-center rounded-full px-5 py-2.5 text-xs font-medium uppercase tracking-[0.14em]"
        >
          View more on Google
        </a>
      </div>
      <div className="relative overflow-hidden">
        <div className="flex w-max gap-5 pb-4 animate-[review-marquee_48s_linear_infinite]">
          {sliderItems.map((t, i) => (
          <figure
            key={`${t.author}-${i}`}
            className="w-[22rem] shrink-0 snap-start rounded-2xl border border-ember-500/55 bg-[linear-gradient(145deg,rgba(20,16,15,0.72),rgba(12,10,9,0.54))] p-7 shadow-[0_14px_34px_rgba(0,0,0,0.28)] backdrop-blur-md md:w-[24rem]"
          >
            <div className="mb-4 text-sm tracking-[0.18em] text-gold-400">★★★★★</div>
            <blockquote className="text-sm leading-relaxed text-white/88 md:text-base">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-6 border-t border-ember-500/35 pt-5 text-sm text-muted-foreground">
              <span className="font-medium text-white">{t.author}</span>
              {t.role && <> — {t.role}</>}
            </figcaption>
          </figure>
          ))}
        </div>
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
            <Link
              href="#booking"
              className="btn-bronze-soft mt-8 inline-flex items-center rounded-full px-5 py-2.5 text-xs font-medium uppercase tracking-[0.14em]"
            >
              Start enquiry
            </Link>
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
          className="pointer-events-none absolute -bottom-2 right-0 hidden h-[108%] w-auto drop-shadow-[0_18px_30px_rgba(0,0,0,0.42)] md:block lg:right-2"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.75) 20%, rgba(0,0,0,1) 38%, rgba(0,0,0,1) 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.75) 20%, rgba(0,0,0,1) 38%, rgba(0,0,0,1) 100%)",
          }}
        />
        <div className="relative max-w-2xl md:pr-52 lg:pr-64">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={joaoEspetoUrl}
            alt="Premium fire-grilled meat"
            className="mb-6 h-40 w-auto drop-shadow-[0_16px_26px_rgba(0,0,0,0.38)] md:hidden"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.75) 20%, rgba(0,0,0,1) 38%, rgba(0,0,0,1) 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.75) 20%, rgba(0,0,0,1) 38%, rgba(0,0,0,1) 100%)",
            }}
          />
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
  const email = "contact@fogoco.com.au";
  const phone = "0404244881";
  const regions = "Sunshine Coast - Brisbane - Gold Coast";

  return (
    <section id="contact" className={sectionClass}>
      <h2 className="mb-10 font-display text-4xl md:text-5xl">{data.title}</h2>
      <div className="grid gap-10 md:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Email
          </p>
          <p className="mt-2">{email}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Phone
          </p>
          <p className="mt-2">{phone}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Regions
          </p>
          <p className="mt-2">{regions}</p>
        </div>
      </div>
      <div className="mt-10 flex gap-4 text-sm text-muted-foreground">
        <a href={instagramProfileUrl} target="_blank" rel="noreferrer" className="hover:text-foreground">
          Instagram
        </a>
        <a href={linkedInProfileUrl} target="_blank" rel="noreferrer" className="hover:text-foreground">
          LinkedIn
        </a>
      </div>
    </section>
  );
}

export function Footer({ data }: { data: FooterData }) {
  return (
    <footer className="border-t border-border">
      <div className="container py-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="text-center md:text-left">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={fogoLogoUrl} alt="Fogo & Co" className="mx-auto h-14 w-auto md:mx-0" />
            {data.tagline && (
              <p className="mt-2 text-sm text-muted-foreground">
                {data.tagline}
              </p>
            )}
          </div>
          <div className="text-center text-xs text-muted-foreground md:text-right">
            <p>{data.copyright}</p>
            <div className="mt-3 flex justify-center gap-4 md:justify-end">
              <a href={instagramProfileUrl} target="_blank" rel="noreferrer" className="hover:text-foreground">
                Instagram
              </a>
              <a href={linkedInProfileUrl} target="_blank" rel="noreferrer" className="hover:text-foreground">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
