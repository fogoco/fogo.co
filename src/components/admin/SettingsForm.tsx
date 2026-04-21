"use client";

import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useState } from "react";

export function SettingsForm({ site }: { site: any }) {
  const seo = site?.seo_settings?.[0] ?? site?.seo_settings ?? {};
  const [name, setName] = useState(site?.name ?? "Fogo & Co");
  const [title, setTitle] = useState(seo.title ?? "");
  const [description, setDescription] = useState(seo.description ?? "");
  const [loading, setLoading] = useState(false);

  async function onSave() {
    if (!site?.id) return;
    setLoading(true);
    const supabase = createClient();
    await supabase.from("sites").update({ name }).eq("id", site.id);
    await supabase
      .from("seo_settings")
      .upsert({ site_id: site.id, title, description });
    setLoading(false);
    toast.success("Settings saved");
  }

  return (
    <div className="space-y-5 rounded-2xl border border-border bg-card p-8">
      <Field label="Site name">
        <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
      </Field>
      <Field label="SEO title">
        <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} />
      </Field>
      <Field label="SEO description">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={inputCls + " min-h-[100px]"}
        />
      </Field>
      <button
        onClick={onSave}
        disabled={loading}
        className="rounded-full bg-ember-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-ember-600 disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save changes"}
      </button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-ember-500";
