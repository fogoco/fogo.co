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
      mediaType: "video",
      mediaUrl:
        "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/videos/fogo%201.mp4",
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
      videoUrl:
        "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/videos/fogo%202.mp4",
    },
  },
  {
    type: "event_types",
    label: "Event Types",
    description: "Weddings, corporate, private.",
    category: "story",
    defaultData: {
      title: "Savor the moment",
      subtitle: "Feast your eyes on our fire-kissed cuisine and unforgettable events.",
      items: [
        {
          title: "Weddings",
          description:
            "Celebrations where fire, flavour and service come together with elegance, crafted to make your day feel warm, seamless and unforgettable for every guest.",
          videoUrl:
            "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/videos/1.mp4",
        },
        {
          title: "Corporate Events",
          description:
            "Premium menus and polished execution for launches, teams and key clients, delivered with precision timing and service standards that reflect your brand.",
          videoUrl:
            "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/videos/corporate.mp4",
        },
        {
          title: "Private Celebrations",
          description:
            "Tailored experiences for birthdays, anniversaries and long-table moments, with premium cuts and attentive staff creating an elevated celebration from start to finish.",
          videoUrl:
            "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/videos/private.mp4",
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
      body: "Led by João Packer, Fogo & Co was built around one promise: every event delivered with excellence. From premium meat selection and precise fire control to a polished, attentive team, every detail is curated to feel first-class from the first greeting to the final service.",
      bullets: [
        "João Packer's live-fire signature at the centre of your event",
        "Only premium cuts, selected for consistency and flavour",
        "High-standard staff and warm, professional service",
        "First-class execution from setup to final plate",
      ],
      imageUrl:
        "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/media/joao%202.png",
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
          name: "Rump cap",
          cut: "Brazil's national cut",
          description:
            "Rump cap, crowned with its fat, sliced table-side from the skewer.",
          imageUrl:
            "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/media/Rump%20cap.jpg",
        },
        {
          name: "Flank steak",
          cut: "Flank, prime",
          description:
            "Tender, deep-flavoured and grilled to a warm pink centre.",
          imageUrl:
            "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/media/Flank%20steak.jpg",
        },
        {
          name: "Beef ribs",
          cut: "Short rib, low & slow",
          description:
            "Hours over hardwood until the bone lifts clean. Smoke, salt, fire.",
          imageUrl:
            "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=1400",
        },
        {
          name: "Lamb",
          cut: "Lamb, whole roast",
          description:
            "Slow-roasted lamb shoulder, Brazilian spice crust, fire-kissed.",
          imageUrl:
            "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/media/lamb.jpg",
        },
        {
          name: "Chicken",
          cut: "Free-range chicken",
          description:
            "Butterflied, marinated in garlic and lime, finished on the open flame.",
          imageUrl:
            "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/media/chicken.png",
        },
        {
          name: "Salad",
          cut: "Seasonal, charred",
          description:
            "Market vegetables kissed by fire — the plate-mate of every cut.",
          imageUrl:
            "https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/media/salad.jpg",
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
