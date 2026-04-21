import type { AnyBlock } from "@/lib/blocks/types";
import { Hero } from "./Hero";
import {
  BrandIntro,
  EventTypes,
  SignatureExperience,
  Gallery,
  VideoGallery,
  Testimonials,
  Stats,
  Process,
  WhyChooseUs,
  Packages,
  MenuHighlights,
  Faq,
  BookingCta,
  Contact,
  Footer,
} from "./Sections";
import { PremiumSplit, SignatureMeats } from "./Premium";
import { BookingForm } from "@/components/booking/BookingForm";

export function BlockRenderer({ block }: { block: AnyBlock }) {
  if (!block.visible) return null;
  switch (block.type) {
    case "hero":
    case "hero_split":
      return <Hero data={block.data} />;
    case "brand_intro":
      return <BrandIntro data={block.data} />;
    case "event_types":
      return <EventTypes data={block.data} />;
    case "signature_experience":
      return <SignatureExperience data={block.data} />;
    case "gallery":
      return <Gallery data={block.data} />;
    case "video_gallery":
      return <VideoGallery data={block.data} />;
    case "testimonials":
      return <Testimonials data={block.data} />;
    case "stats":
      return <Stats data={block.data} />;
    case "process":
      return <Process data={block.data} />;
    case "why_choose_us":
      return <WhyChooseUs data={block.data} />;
    case "packages":
      return <Packages data={block.data} />;
    case "menu_highlights":
      return <MenuHighlights data={block.data} />;
    case "faq":
      return <Faq data={block.data} />;
    case "booking_cta":
      return (
        <>
          <BookingCta data={block.data} />
          <section id="booking" className="container pb-24 md:pb-32">
            <BookingForm />
          </section>
        </>
      );
    case "contact":
      return <Contact data={block.data} />;
    case "footer":
      return <Footer data={block.data} />;
    case "fire_experience":
      return <PremiumSplit data={block.data} accentLabel="The Fire Experience" />;
    case "weddings":
      return <PremiumSplit data={block.data} accentLabel="Weddings" />;
    case "corporate_events":
      return <PremiumSplit data={block.data} accentLabel="Corporate" />;
    case "private_events":
      return <PremiumSplit data={block.data} accentLabel="Private Events" />;
    case "signature_meats":
      return <SignatureMeats data={block.data} />;
    default:
      return null;
  }
}

export function PageRenderer({ blocks }: { blocks: AnyBlock[] }) {
  const sorted = [...blocks].sort((a, b) => a.position - b.position);
  return (
    <>
      {sorted.map((b) => (
        <BlockRenderer key={b.id} block={b} />
      ))}
    </>
  );
}
