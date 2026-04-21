"use client";

import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Upload } from "lucide-react";

export function MediaUploader() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Not signed in");
      setLoading(false);
      return;
    }

    const path = `${user.id}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const { error: upErr } = await supabase.storage
      .from("media")
      .upload(path, file);

    if (upErr) {
      toast.error(upErr.message);
      setLoading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("media").getPublicUrl(path);

    const { data: site } = await supabase
      .from("sites")
      .select("id")
      .limit(1)
      .single();

    await supabase.from("media_assets").insert({
      site_id: site?.id,
      name: file.name,
      url: publicUrl,
      kind: file.type.startsWith("video") ? "video" : "image",
      storage_path: path,
    });

    toast.success("Uploaded");
    setLoading(false);
    router.refresh();
  }

  return (
    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-card px-6 py-8 text-sm text-muted-foreground transition hover:border-ember-500/60 hover:text-foreground">
      <Upload className="h-4 w-4" />
      {loading ? "Uploading..." : "Click to upload an image or video"}
      <input
        type="file"
        accept="image/*,video/*"
        onChange={onUpload}
        className="hidden"
      />
    </label>
  );
}
