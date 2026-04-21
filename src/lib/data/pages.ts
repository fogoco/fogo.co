import { createClient } from "@/lib/supabase/server";
import type { AnyBlock } from "@/lib/blocks/types";

export async function getPublishedHomepage(siteSlug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("pages")
    .select("id, title, slug, published_version_id, sites!inner(slug)")
    .eq("sites.slug", siteSlug)
    .eq("slug", "home")
    .maybeSingle();

  if (error || !data?.published_version_id) return null;

  const { data: version } = await supabase
    .from("page_versions")
    .select("id, blocks")
    .eq("id", data.published_version_id)
    .single();

  return {
    page: data,
    blocks: (version?.blocks ?? []) as AnyBlock[],
  };
}
