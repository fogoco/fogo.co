"use client";

import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useState } from "react";

const statuses = ["new", "contacted", "quoted", "booked", "archived"] as const;

export function EnquiryStatusSelect({
  id,
  value,
}: {
  id: string;
  value: string;
}) {
  const [current, setCurrent] = useState(value);
  async function onChange(next: string) {
    setCurrent(next);
    const supabase = createClient();
    const { error } = await supabase
      .from("booking_enquiries")
      .update({ status: next })
      .eq("id", id);
    if (error) toast.error(error.message);
    else toast.success("Status updated");
  }
  return (
    <select
      value={current}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-md border border-input bg-background px-2 py-1.5 text-xs capitalize outline-none focus:border-ember-500"
    >
      {statuses.map((s) => (
        <option key={s} value={s} className="capitalize">
          {s}
        </option>
      ))}
    </select>
  );
}
