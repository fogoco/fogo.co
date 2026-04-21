import { createClient } from "@/lib/supabase/server";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function SettingsPage() {
  const supabase = createClient();
  const siteSlug = process.env.NEXT_PUBLIC_SITE_SLUG || "fogo-co";
  const { data: site } = await supabase
    .from("sites")
    .select("*, theme_settings(*), seo_settings(*)")
    .eq("slug", siteSlug)
    .maybeSingle();

  return (
    <div className="p-8 md:p-12">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">
        Settings
      </p>
      <h1 className="mt-2 font-display text-4xl">Brand &amp; SEO</h1>
      <div className="mt-10 max-w-2xl">
        <SettingsForm site={site} />
      </div>
    </div>
  );
}
