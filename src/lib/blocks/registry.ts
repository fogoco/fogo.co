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
    type: "fire_experience",
    label: "Fire Experience",
    description: "Cinematic live-fire showcase block.",
    category: "story",
    defaultData: {
      eyebrow: "The Fire Experience",
      title: "Live fire. Unforgettable presence.",
      body: "At Fogo & Co, fire is the centrepiece. Our parrilla and open grills bring spectacle and aroma into your venue — a live show your guests taste, hear, and remember.",
      bullets: [
        "On-site live-fire grill station",
        "Brazilian churrasqueiros serving table to table",
        "Hardwood smoke and open flame",
        "Guests watch the craft, then taste it",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=1800",
      ctaLabel: "Enquire about the experience",
      ctaHref: "#booking",
    },
  },
  {
    type: "weddings",
    label: "Weddings",
    description: "Premium wedding catering block.",
    category: "story",
    defaultData: {
      eyebrow: "Weddings",
      title: "A celebration worthy of your day.",
      body: "From intimate ceremonies on the coast to grand homesteads in the country — we craft a wedding menu and service that feels warm, personal and unforgettable.",
      bullets: [
        "Tailored menu design with your stylist",
        "Signature meats carved at the grill",
        "Full front-of-house service team",
        "Dietary-friendly Brazilian sides & salads",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1800",
      ctaLabel: "Plan your wedding",
      ctaHref: "#booking",
      reverse: true,
    },
  },
  {
    type: "corporate_events",
    label: "Corporate Events",
    description: "Corporate catering block.",
    category: "story",
    defaultData: {
      eyebrow: "Corporate",
      title: "Elevate your next company milestone.",
      body: "Product launches, EOFY parties, client experiences and leadership offsites — we deliver premium Brazilian BBQ with the professionalism your brand expects.",
      bullets: [
        "End-to-end event planning",
        "ABN, insurance, food-safety certified",
        "Scalable from 30 to 500+ guests",
        "Branded touches available on request",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1800",
      ctaLabel: "Enquire for your company",
      ctaHref: "#booking",
    },
  },
  {
    type: "private_events",
    label: "Private Events",
    description: "Private celebrations block.",
    category: "story",
    defaultData: {
      eyebrow: "Private Events",
      title: "Milestones worth gathering around the fire.",
      body: "Birthdays, anniversaries, long-table dinners and reunions — invite your people and let us bring the fire, the food and the warmth of a Brazilian churrasco to your home or venue.",
      bullets: [
        "Backyard, venue or destination",
        "Chef-led menu tasting available",
        "Flexible formats: seated or free-flow",
        "Relaxed, warm, high-end service",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1800",
      ctaLabel: "Book your celebration",
      ctaHref: "#booking",
      reverse: true,
    },
  },
  {
    type: "signature_meats",
    label: "Signature Meats",
    description: "Premium hand-selected cuts showcase.",
    category: "story",
    defaultData: {
      eyebrow: "Signature Menu",
      title: "The cuts that built our name.",
      subtitle:
        "Hand-selected by our churrasqueiros, seasoned simply, cooked over open fire.",
      items: [
        {
          name: "Picanha",
          cut: "Brazil's national cut",
          description:
            "Rump cap, crowned with its fat, sliced table-side from the skewer.",
          imageUrl:
            "https://images.unsplash.com/photo-1546964124-0cce460f38ef?q=80&w=1400",
        },
        {
          name: "Fraldinha",
          cut: "Flank, prime",
          description:
            "Tender, deep-flavoured and grilled to a warm pink centre.",
          imageUrl:
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1400",
        },
        {
          name: "Costela",
          cut: "Short rib, low & slow",
          description:
            "Hours over hardwood until the bone lifts clean. Smoke, salt, fire.",
          imageUrl:
            "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=1400",
        },
        {
          name: "Cordeiro",
          cut: "Lamb, whole roast",
          description:
            "Slow-roasted lamb shoulder, Brazilian spice crust, fire-kissed.",
          imageUrl:
            "https://images.unsplash.com/photo-1514516870926-20598683e3e1?q=80&w=1400",
        },
        {
          name: "Frango",
          cut: "Free-range chicken",
          description:
            "Butterflied, marinated in garlic and lime, finished on the open flame.",
          imageUrl:
            "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?q=80&w=1400",
        },
        {
          name: "Legumes",
          cut: "Seasonal, charred",
          description:
            "Market vegetables kissed by fire — the plate-mate of every cut.",
          imageUrl:
            "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1400",
        },
      ],
    },
  },
  {
    type: "packages",
    label: "Packages",
    description: "Service tiers.",
    category: "conversion",
    defaultData: {
      title: "Tailored service tiers",
      tiers: [
        {
          name: "Signature",
          priceFrom: "$145 pp",
          features: [
            "Three premium cuts",
            "Four Brazilian sides",
            "Churrasqueiro on-site",
            "2-hour service window",
          ],
        },
        {
          name: "Experience",
          priceFrom: "$195 pp",
          highlighted: true,
          features: [
            "Five premium cuts incl. picanha",
            "Six sides & Brazilian salads",
            "Live-fire parrilla set-up",
            "Full service team (chef + 2 staff)",
          ],
        },
        {
          name: "Bespoke",
          priceFrom: "On request",
          features: [
            "Custom menu tasting",
            "Whole-lamb & rodízio service",
            "Full front-of-house team",
            "Drinks, styling, equipment hire",
          ],
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
