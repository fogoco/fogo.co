"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { CheckCircle2 } from "lucide-react";

const schema = z.object({
  full_name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(6, "Phone required"),
  event_date: z.string().min(1, "Event date required"),
  event_type: z.enum(["wedding", "corporate", "private", "other"]),
  guests: z.coerce.number().min(1, "Minimum 1 guest"),
  location: z.string().min(2, "Location required"),
  budget_range: z.string().optional(),
  service_style: z.string().optional(),
  setting: z.enum(["indoor", "outdoor", "mixed"]).optional(),
  dietary: z.string().optional(),
  needs_staff: z.boolean().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function BookingForm({ siteSlug = "fogo-co" }: { siteSlug?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { event_type: "wedding", setting: "outdoor", needs_staff: true },
  });

  async function onSubmit(values: FormValues) {
    setError(null);
    const supabase = createClient();
    const { data: site } = await supabase
      .from("sites")
      .select("id")
      .eq("slug", siteSlug)
      .single();

    if (!site) {
      setError("Site not found. Please try again later.");
      return;
    }

    const { error: insertError } = await supabase
      .from("booking_enquiries")
      .insert({ ...values, site_id: site.id, status: "new" });

    if (insertError) {
      setError(insertError.message);
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-ember-500/40 bg-ember-500/5 p-10 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-ember-500" />
        <h3 className="mt-6 font-display text-3xl">Thank you.</h3>
        <p className="mt-3 text-muted-foreground">
          Your enquiry is in our hands. We&apos;ll be in touch within 1 business day
          to craft your event.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-5 rounded-2xl border border-border bg-card p-8 md:grid-cols-2 md:p-12"
    >
      <Field label="Full name" error={errors.full_name?.message}>
        <input {...register("full_name")} className={inputCls} />
      </Field>
      <Field label="Email" error={errors.email?.message}>
        <input type="email" {...register("email")} className={inputCls} />
      </Field>
      <Field label="Phone" error={errors.phone?.message}>
        <input {...register("phone")} className={inputCls} />
      </Field>
      <Field label="Event date" error={errors.event_date?.message}>
        <input type="date" {...register("event_date")} className={inputCls} />
      </Field>
      <Field label="Event type" error={errors.event_type?.message}>
        <select {...register("event_type")} className={inputCls}>
          <option value="wedding">Wedding</option>
          <option value="corporate">Corporate</option>
          <option value="private">Private celebration</option>
          <option value="other">Other</option>
        </select>
      </Field>
      <Field label="Number of guests" error={errors.guests?.message}>
        <input type="number" {...register("guests")} className={inputCls} />
      </Field>
      <Field label="Location / suburb" error={errors.location?.message}>
        <input {...register("location")} className={inputCls} />
      </Field>
      <Field label="Budget range (optional)">
        <input {...register("budget_range")} className={inputCls} />
      </Field>
      <Field label="Indoor or outdoor">
        <select {...register("setting")} className={inputCls}>
          <option value="outdoor">Outdoor</option>
          <option value="indoor">Indoor</option>
          <option value="mixed">Mixed</option>
        </select>
      </Field>
      <Field label="Dietary requirements (optional)">
        <input {...register("dietary")} className={inputCls} />
      </Field>
      <div className="md:col-span-2">
        <Field label="Message / event notes">
          <textarea
            rows={5}
            {...register("message")}
            className={inputCls + " min-h-[140px]"}
          />
        </Field>
      </div>
      <label className="flex items-center gap-2 md:col-span-2">
        <input type="checkbox" {...register("needs_staff")} /> Need full on-site service team
      </label>

      {error && (
        <p className="md:col-span-2 text-sm text-red-400">{error}</p>
      )}

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center rounded-full bg-ember-500 px-8 py-3.5 text-sm font-medium text-white transition hover:bg-ember-600 disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Send enquiry"}
        </button>
      </div>
    </form>
  );
}

const inputCls =
  "w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-ember-500";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {children}
      {error && <span className="text-xs text-red-400">{error}</span>}
    </label>
  );
}
