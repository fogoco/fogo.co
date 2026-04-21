import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { EnquiryStatusSelect } from "@/components/admin/EnquiryStatusSelect";

export default async function EnquiriesPage() {
  const supabase = createClient();
  const { data: enquiries } = await supabase
    .from("booking_enquiries")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-8 md:p-12">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">
        Enquiries
      </p>
      <h1 className="mt-2 font-display text-4xl">Booking pipeline</h1>

      <div className="mt-10 overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Client</th>
              <th className="px-5 py-3">Event</th>
              <th className="px-5 py-3">Guests</th>
              <th className="px-5 py-3">Location</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {(enquiries ?? []).map((e) => (
              <tr key={e.id} className="border-t border-border align-top">
                <td className="px-5 py-4 text-muted-foreground">
                  {formatDate(e.created_at)}
                </td>
                <td className="px-5 py-4">
                  <p className="font-medium">{e.full_name}</p>
                  <p className="text-xs text-muted-foreground">{e.email}</p>
                  <p className="text-xs text-muted-foreground">{e.phone}</p>
                </td>
                <td className="px-5 py-4">
                  <p className="capitalize">{e.event_type}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(e.event_date)}
                  </p>
                </td>
                <td className="px-5 py-4">{e.guests}</td>
                <td className="px-5 py-4">{e.location}</td>
                <td className="px-5 py-4">
                  <EnquiryStatusSelect id={e.id} value={e.status} />
                </td>
              </tr>
            ))}
            {(!enquiries || enquiries.length === 0) && (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-10 text-center text-muted-foreground"
                >
                  No enquiries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
