export type BlockType =
  | "hero"
  | "hero_split"
  | "brand_intro"
  | "event_types"
  | "signature_experience"
  | "menu_highlights"
  | "gallery"
  | "video_gallery"
  | "testimonials"
  | "stats"
  | "process"
  | "why_choose_us"
  | "packages"
  | "faq"
  | "booking_cta"
  | "contact"
  | "footer"
  // Premium specialized blocks
  | "fire_experience"
  | "weddings"
  | "corporate_events"
  | "private_events"
  | "signature_meats";

export interface BaseBlock<T extends BlockType = BlockType, D = unknown> {
  id: string;
  type: T;
  visible: boolean;
  position: number;
  data: D;
}

export interface HeroData {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  mediaType: "image" | "video";
  mediaUrl: string;
  posterUrl?: string;
  overlayOpacity?: number;
}

export interface BrandIntroData {
  eyebrow?: string;
  title: string;
  body: string;
  imageUrl?: string;
  videoUrl?: string;
}

export interface EventTypesData {
  title: string;
  subtitle?: string;
  items: { title: string; description: string; imageUrl?: string; videoUrl?: string }[];
}

export interface SignatureExperienceData {
  title: string;
  body: string;
  bullets: string[];
  imageUrl?: string;
  videoUrl?: string;
}

export interface GalleryData {
  title?: string;
  subtitle?: string;
  images: { url: string; alt?: string }[];
}

export interface VideoGalleryData {
  title?: string;
  videos: { url: string; posterUrl?: string; caption?: string }[];
}

export interface TestimonialsData {
  title?: string;
  items: { quote: string; author: string; role?: string }[];
}

export interface StatsData {
  items: { value: string; label: string }[];
}

export interface ProcessData {
  title: string;
  steps: { title: string; description: string }[];
}

export interface WhyChooseUsData {
  title: string;
  items: { title: string; description: string; icon?: string }[];
}

export interface PackagesData {
  title: string;
  tiers: {
    name: string;
    priceFrom?: string;
    features: string[];
    highlighted?: boolean;
  }[];
}

export interface FaqData {
  title?: string;
  items: { question: string; answer: string }[];
}

export interface BookingCtaData {
  title: string;
  body?: string;
  ctaLabel: string;
  ctaHref: string;
  backgroundUrl?: string;
}

export interface ContactData {
  title: string;
  email?: string;
  phone?: string;
  address?: string;
  socials?: { label: string; href: string }[];
}

export interface FooterData {
  tagline?: string;
  columns?: { title: string; links: { label: string; href: string }[] }[];
  copyright?: string;
}

export interface MenuHighlightsData {
  title: string;
  items: { name: string; description?: string; imageUrl?: string }[];
}

export interface PremiumSplitData {
  eyebrow?: string;
  title: string;
  body: string;
  bullets: string[];
  imageUrl?: string;
  videoUrl?: string;
  ctaLabel?: string;
  ctaHref?: string;
  reverse?: boolean;
}

export interface SignatureMeatsData {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: { name: string; cut?: string; description?: string; imageUrl?: string }[];
}

export type AnyBlock =
  | BaseBlock<"hero", HeroData>
  | BaseBlock<"hero_split", HeroData>
  | BaseBlock<"brand_intro", BrandIntroData>
  | BaseBlock<"event_types", EventTypesData>
  | BaseBlock<"signature_experience", SignatureExperienceData>
  | BaseBlock<"menu_highlights", MenuHighlightsData>
  | BaseBlock<"gallery", GalleryData>
  | BaseBlock<"video_gallery", VideoGalleryData>
  | BaseBlock<"testimonials", TestimonialsData>
  | BaseBlock<"stats", StatsData>
  | BaseBlock<"process", ProcessData>
  | BaseBlock<"why_choose_us", WhyChooseUsData>
  | BaseBlock<"packages", PackagesData>
  | BaseBlock<"faq", FaqData>
  | BaseBlock<"booking_cta", BookingCtaData>
  | BaseBlock<"contact", ContactData>
  | BaseBlock<"footer", FooterData>
  | BaseBlock<"fire_experience", PremiumSplitData>
  | BaseBlock<"weddings", PremiumSplitData>
  | BaseBlock<"corporate_events", PremiumSplitData>
  | BaseBlock<"private_events", PremiumSplitData>
  | BaseBlock<"signature_meats", SignatureMeatsData>;
