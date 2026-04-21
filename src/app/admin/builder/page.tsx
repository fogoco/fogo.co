import { createClient } from "@/lib/supabase/server";
import { Builder } from "@/components/admin/Builder";
import type { AnyBlock } from "@/lib/blocks/types";
import { blockLibrary } from "@/lib/blocks/registry";

export default async function BuilderPage() {
  const supabase = createClient();
  const siteSlug = process.env.NEXT_PUBLIC_SITE_SLUG || "fogo-co";

  const { data: page } = await supabase
    .from("pages")
    .select("id, title, slug, draft_blocks, published_version_id, sites!inner(slug)")
    .eq("sites.slug", siteSlug)
    .eq("slug", "home")
    .maybeSingle();

  const initialBlocks: AnyBlock[] =
    (page?.draft_blocks as AnyBlock[] | null) ??
    (
      ["hero", "brand_intro", "fire_experience", "signature_meats", "event_types", "weddings", "corporate_events", "private_events", "gallery", "packages", "testimonials", "booking_cta", "faq", "contact", "footer"] as const
    ).map((type, i) => {
      const def = blockLibrary.find((b) => b.type === type)!;
      return {
        id: `block-${type}-${i}`,
        type,
        visible: true,
        position: i,
        data: def.defaultData,
      } as AnyBlock;
    });

  return (
    <Builder
      pageId={page?.id ?? null}
      pageTitle={page?.title ?? "Home"}
      initialBlocks={initialBlocks}
    />
  );
}
