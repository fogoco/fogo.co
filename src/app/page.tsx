import { PageRenderer } from "@/components/blocks/Renderer";
import { ScrollSmoke } from "@/components/blocks/ScrollSmoke";
import { getPublishedHomepage } from "@/lib/data/pages";
import { blockLibrary } from "@/lib/blocks/registry";
import type { AnyBlock } from "@/lib/blocks/types";

export const dynamic = "force-dynamic";

function demoBlocks(): AnyBlock[] {
  // Fallback rendering for first boot without database data.
  const order = [
    "hero",
    "fire_experience",
    "event_types",
    "process",
    "signature_meats",
    "weddings",
    "corporate_events",
    "private_events",
    "brand_intro",
    "gallery",
    "packages",
    "testimonials",
    "booking_cta",
    "faq",
    "contact",
    "footer",
  ] as const;
  return order.map((type, i) => {
    const def = blockLibrary.find((b) => b.type === type)!;
    return {
      id: `demo-${type}`,
      type,
      visible: true,
      position: i,
      data: def.defaultData,
    } as AnyBlock;
  });
}

export default async function HomePage() {
  const siteSlug = process.env.NEXT_PUBLIC_SITE_SLUG || "fogo-co";
  const data = await getPublishedHomepage(siteSlug).catch(() => null);
  const blocks = data?.blocks?.length ? data.blocks : demoBlocks();
  const hasHero = blocks.some((b) => b.type === "hero" || b.type === "hero_split");
  const homeBlocks = hasHero
    ? blocks
    : [
        {
          id: "fallback-hero",
          type: "hero",
          visible: true,
          position: -1,
          data: blockLibrary.find((b) => b.type === "hero")!.defaultData,
        } as AnyBlock,
        ...blocks,
      ];

  return (
    <main className="bg-grain">
      <ScrollSmoke />
      <PageRenderer blocks={homeBlocks} />
    </main>
  );
}
