import { createClient } from "@/lib/supabase/server";
import { MediaUploader } from "@/components/admin/MediaUploader";

export default async function MediaPage() {
  const supabase = createClient();
  const { data: assets } = await supabase
    .from("media_assets")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-8 md:p-12">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">
        Media
      </p>
      <h1 className="mt-2 font-display text-4xl">Media library</h1>

      <div className="mt-8">
        <MediaUploader />
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
        {(assets ?? []).map((a) => (
          <div
            key={a.id}
            className="overflow-hidden rounded-lg border border-border bg-card"
          >
            {a.kind === "video" ? (
              <video
                src={a.url}
                className="aspect-square w-full object-cover"
                muted
                playsInline
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={a.url}
                alt={a.alt ?? ""}
                className="aspect-square w-full object-cover"
              />
            )}
            <div className="p-3 text-xs">
              <p className="truncate">{a.name}</p>
              <p className="text-muted-foreground">{a.kind}</p>
            </div>
          </div>
        ))}
        {(!assets || assets.length === 0) && (
          <p className="col-span-full text-sm text-muted-foreground">
            No media yet. Upload your first image or video.
          </p>
        )}
      </div>
    </div>
  );
}
