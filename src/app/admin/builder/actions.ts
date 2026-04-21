"use server";

import { createClient } from "@/lib/supabase/server";
import type { AnyBlock } from "@/lib/blocks/types";
import { revalidatePath } from "next/cache";

export async function saveDraftAction(pageId: string, blocks: AnyBlock[]) {
  const supabase = createClient();
  const { error } = await supabase
    .from("pages")
    .update({ draft_blocks: blocks, updated_at: new Date().toISOString() })
    .eq("id", pageId);
  if (error) throw new Error(error.message);
}

export async function publishAction(pageId: string, blocks: AnyBlock[]) {
  const supabase = createClient();
  const { data: version, error: vErr } = await supabase
    .from("page_versions")
    .insert({ page_id: pageId, blocks })
    .select("id")
    .single();
  if (vErr) throw new Error(vErr.message);

  const { error } = await supabase
    .from("pages")
    .update({
      published_version_id: version!.id,
      draft_blocks: blocks,
      published_at: new Date().toISOString(),
    })
    .eq("id", pageId);
  if (error) throw new Error(error.message);

  revalidatePath("/");
}
