import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminOverview() {
  const supabase = createClient();

  const [{ count: totalEnquiries }, { count: newEnquiries }, { count: mediaCount }] =
    await Promise.all([
      supabase.from("booking_enquiries").select("*", { count: "exact", head: true }),
      supabase
        .from("booking_enquiries")
        .select("*", { count: "exact", head: true })
        .eq("status", "new"),
      supabase.from("media_assets").select("*", { count: "exact", head: true }),
    ]);

  const stats = [
    { label: "Total enquiries", value: totalEnquiries ?? 0 },
    { label: "New enquiries", value: newEnquiries ?? 0 },
    { label: "Media assets", value: mediaCount ?? 0 },
    { label: "Published pages", value: 1 },
  ];

  return (
    <div className="p-8 md:p-12">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Dashboard
          </p>
          <h1 className="mt-2 font-display text-4xl">Welcome back</h1>
        </div>
        <Link
          href="/admin/builder"
          className="rounded-full bg-ember-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-ember-600"
        >
          Open builder
        </Link>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              {s.label}
            </p>
            <p className="mt-3 font-display text-4xl">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Link
          href="/admin/enquiries"
          className="rounded-xl border border-border bg-card p-6 transition hover:border-ember-500/50"
        >
          <p className="font-display text-2xl">Review latest enquiries</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Respond to fresh leads and move them through your pipeline.
          </p>
        </Link>
        <Link
          href="/admin/media"
          className="rounded-xl border border-border bg-card p-6 transition hover:border-ember-500/50"
        >
          <p className="font-display text-2xl">Manage media</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Upload premium photography and cinematic video to reuse across blocks.
          </p>
        </Link>
      </div>
    </div>
  );
}
