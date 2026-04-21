import { PageRenderer } from "@/components/blocks/Renderer";
import { getPublishedHomepage } from "@/lib/data/pages";
import { blockLibrary } from "@/lib/blocks/registry";
import type { AnyBlock } from "@/lib/blocks/types";

export const dynamic = "force-dynamic";

function demoBlocks(): AnyBlock[] {
  // Fallback rendering for first boot without database data.
  const order = [
    "hero",
    "brand_intro",
    "event_types",
    "signature_experience",
    "gallery",
    "process",
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

  return (
    <main className="bg-grain">
      <PageRenderer blocks={blocks} />
    </main>
  );
}
