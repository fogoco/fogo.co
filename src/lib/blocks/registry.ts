import type { AnyBlock, BlockType } from "./types";

export interface BlockDefinition {
  type: BlockType;
  label: string;
  description: string;
  category: "hero" | "story" | "social" | "conversion" | "structure";
  defaultData: AnyBlock["data"];
}

export const blockLibrary: BlockDefinition[] = [
  {
    type: "hero",
    label: "Hero (video/image)",
    description: "Cinematic full-width hero with CTA.",
    category: "hero",
    defaultData: {
      eyebrow: "Brazilian BBQ • Australia",
      headline: "Brazilian Fire. Premium Events.",
      subheadline:
        "A premium Brazilian BBQ catering experience crafted for weddings, corporate events and private celebrations.",
      ctaPrimary: { label: "Enquire Now", href: "#booking" },
      ctaSecondary: { label: "View Experience", href: "#experience" },
      mediaType: "image",
      mediaUrl:
        "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=2400",
      overlayOpacity: 0.55,
    },
  },
  {
    type: "brand_intro",
    label: "Brand Intro",
    description: "Short institutional introduction.",
    category: "story",
    defaultData: {
      eyebrow: "About Fogo & Co",
      title: "Brazilian fire, crafted for Australia.",
      body: "We bring the heart of Brazilian churrasco to your most important moments — refined service, premium cuts, and a live-fire experience that turns every event into a celebration.",
    },
  },
  {
    type: "event_types",
    label: "Event Types",
    description: "Weddings, corporate, private.",
    category: "story",
    defaultData: {
      title: "Events we craft",
      subtitle: "From intimate gatherings to signature celebrations.",
      items: [
        {
          title: "Weddings",
          description:
            "A warm, unforgettable fire experience for your most important day.",
        },
        {
          title: "Corporate",
          description:
            "Premium catering that elevates company milestones and client events.",
        },
        {
          title: "Private Celebrations",
          description:
            "Milestone birthdays, anniversaries, and exclusive gatherings.",
        },
      ],
    },
  },
  {
    type: "signature_experience",
    label: "Signature Experience",
    description: "Live fire, premium meats, full service.",
    category: "story",
    defaultData: {
      title: "The Fogo & Co experience",
      body: "Live fire at the centre. Premium cuts, hand-selected. A team that delivers hospitality with precision and warmth.",
      bullets: [
        "Live-fire grill presence",
        "Premium hand-selected meats",
        "Seasonal Brazilian sides",
        "Full-service on-site team",
      ],
    },
  },
  {
    type: "gallery",
    label: "Gallery",
    description: "Image grid with cinematic styling.",
    category: "social",
    defaultData: {
      title: "Moments",
      subtitle: "Fire, flavour, and celebration.",
      images: [
        { url: "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=1600" },
        { url: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600" },
        { url: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?q=80&w=1600" },
        { url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1600" },
        { url: "https://images.unsplash.com/photo-1514516870926-20598683e3e1?q=80&w=1600" },
        { url: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1600" },
      ],
    },
  },
  {
    type: "process",
    label: "Process",
    description: "From enquiry to event.",
    category: "story",
    defaultData: {
      title: "From enquiry to event",
      steps: [
        { title: "Enquire", description: "Share your event, date and vision." },
        {
          title: "We tailor",
          description: "We craft the menu, service and fire experience.",
        },
        {
          title: "We deliver",
          description:
            "Our team runs your event on-site with precision and warmth.",
        },
      ],
    },
  },
  {
    type: "testimonials",
    label: "Testimonials",
    description: "Social proof slider.",
    category: "social",
    defaultData: {
      title: "What clients say",
      items: [
        {
          quote:
            "Fogo & Co turned our wedding into the most memorable celebration. The fire, the food, the team — flawless.",
          author: "Isabella & Tom",
          role: "Wedding, Byron Bay",
        },
        {
          quote:
            "The most premium catering experience we've had for a corporate event. Guests are still talking about it.",
          author: "Marcus Lee",
          role: "Head of Events, Harbour Co.",
        },
      ],
    },
  },
  {
    type: "booking_cta",
    label: "Booking CTA",
    description: "Banner inviting to enquire.",
    category: "conversion",
    defaultData: {
      title: "Let's craft your event",
      body: "Tell us about your celebration. We'll design the experience around you.",
      ctaLabel: "Start your enquiry",
      ctaHref: "#booking",
    },
  },
  {
    type: "faq",
    label: "FAQ",
    description: "Accordion of common questions.",
    category: "story",
    defaultData: {
      title: "Frequently asked",
      items: [
        {
          question: "Do you travel outside the main cities?",
          answer:
            "Yes. We service most of Australia — additional travel fees may apply for remote locations.",
        },
        {
          question: "What's your minimum guest count?",
          answer: "Our premium experiences typically start from 30 guests.",
        },
        {
          question: "Can you accommodate dietary requirements?",
          answer:
            "Absolutely. We build menus around your guests, including vegetarian and gluten-free options.",
        },
      ],
    },
  },
  {
    type: "contact",
    label: "Contact",
    description: "Address, email, phone, socials.",
    category: "structure",
    defaultData: {
      title: "Get in touch",
      email: "hello@fogo.co",
      phone: "+61 400 000 000",
      address: "Sydney · Melbourne · Byron Bay",
      socials: [
        { label: "Instagram", href: "https://instagram.com" },
        { label: "LinkedIn", href: "https://linkedin.com" },
      ],
    },
  },
  {
    type: "footer",
    label: "Footer",
    description: "Closing brand footer.",
    category: "structure",
    defaultData: {
      tagline: "Brazilian fire, crafted for Australia.",
      copyright: `© ${new Date().getFullYear()} Fogo & Co. All rights reserved.`,
    },
  },
];

export function getBlockDefinition(type: BlockType) {
  return blockLibrary.find((b) => b.type === type);
}
