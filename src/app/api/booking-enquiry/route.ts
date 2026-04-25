import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    const body = await req.json();

    // Validate required fields
    const required = ["full_name", "email", "phone", "event_date", "event_type", "guests", "location"];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 });
      }
    }

    const supabase = createClient();
    const { data: site } = await supabase
      .from("sites")
      .select("id")
      .eq("slug", "fogo-co")
      .single();

    if (!site) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }

    // Save to Supabase
    const { error: insertError } = await supabase
      .from("booking_enquiries")
      .insert({
        ...body,
        site_id: site.id,
        status: "new",
      });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    // Send email to owner
    const ownerEmails = (process.env.BOOKING_OWNER_EMAIL ?? "")
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean);
    const fromEmail = process.env.RESEND_FROM_EMAIL?.trim();

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="color-scheme" content="light" />
          <meta name="supported-color-schemes" content="light" />
        </head>
        <body style="margin:0;padding:24px 12px;background:#f3f4f6;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#f3f4f6;">
            <tr>
              <td align="center">
                <table role="presentation" width="640" cellspacing="0" cellpadding="0" style="width:100%;max-width:640px;border-collapse:separate;background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">
                  <tr>
                    <td style="padding:24px 28px 18px;border-bottom:1px solid #e5e7eb;background:#ffffff;">
                      <img src="https://qpqppnulhlsanreiwigk.supabase.co/storage/v1/object/public/media/logo%20fogo%20bk.png" alt="Fogo & Co" width="130" style="display:block;width:130px;height:auto;margin:0 0 12px;" />
                      <h1 style="margin:0;font-size:22px;line-height:1.25;color:#111827;font-weight:700;">New Booking Enquiry</h1>
                      <p style="margin:8px 0 0;font-size:14px;line-height:1.5;color:#4b5563;">A new enquiry was submitted on the website.</p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:24px 28px;background:#ffffff;">
                      <p style="margin:0 0 8px;font-size:11px;line-height:1.4;letter-spacing:0.08em;text-transform:uppercase;color:#92400e;font-weight:700;">Client</p>
                      <p style="margin:0 0 20px;font-size:15px;line-height:1.65;color:#111827;"><strong>${body.full_name}</strong><br/>${body.email}<br/>${body.phone}</p>

                      <p style="margin:0 0 8px;font-size:11px;line-height:1.4;letter-spacing:0.08em;text-transform:uppercase;color:#92400e;font-weight:700;">Event</p>
                      <p style="margin:0 0 20px;font-size:15px;line-height:1.65;color:#111827;"><strong>${body.event_type.charAt(0).toUpperCase() + body.event_type.slice(1)}</strong><br/>Date: ${body.event_date}<br/>Guests: ${body.guests}<br/>Location: ${body.location}</p>

                      ${body.budget_range ? `<p style="margin:0 0 8px;font-size:11px;line-height:1.4;letter-spacing:0.08em;text-transform:uppercase;color:#92400e;font-weight:700;">Budget</p><p style="margin:0 0 20px;font-size:15px;line-height:1.65;color:#111827;">${body.budget_range}</p>` : ""}

                      ${body.setting ? `<p style="margin:0 0 8px;font-size:11px;line-height:1.4;letter-spacing:0.08em;text-transform:uppercase;color:#92400e;font-weight:700;">Setting</p><p style="margin:0 0 20px;font-size:15px;line-height:1.65;color:#111827;">${body.setting.charAt(0).toUpperCase() + body.setting.slice(1)}</p>` : ""}

                      ${body.dietary ? `<p style="margin:0 0 8px;font-size:11px;line-height:1.4;letter-spacing:0.08em;text-transform:uppercase;color:#92400e;font-weight:700;">Dietary Requirements</p><p style="margin:0 0 20px;font-size:15px;line-height:1.65;color:#111827;">${body.dietary}</p>` : ""}

                      ${body.needs_staff ? `<p style="margin:0 0 8px;font-size:11px;line-height:1.4;letter-spacing:0.08em;text-transform:uppercase;color:#92400e;font-weight:700;">Service</p><p style="margin:0 0 20px;font-size:15px;line-height:1.65;color:#111827;">Full on-site service team requested.</p>` : ""}

                      ${body.message ? `<p style="margin:0 0 8px;font-size:11px;line-height:1.4;letter-spacing:0.08em;text-transform:uppercase;color:#92400e;font-weight:700;">Message / Notes</p><div style="margin:0 0 20px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:12px 14px;"><p style="margin:0;font-size:15px;line-height:1.65;color:#111827;">${body.message}</p></div>` : ""}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:0 28px 24px;background:#ffffff;">
                      <div style="border-top:1px solid #e5e7eb;padding-top:14px;font-size:12px;line-height:1.5;color:#6b7280;">Enquiry submitted at ${new Date().toLocaleString("en-AU", { timeZone: "Australia/Brisbane" })}</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    if (!resendApiKey || !fromEmail || ownerEmails.length === 0) {
      console.warn("Skipping Resend email due to missing configuration", {
        hasApiKey: Boolean(resendApiKey),
        hasFromEmail: Boolean(fromEmail),
        ownerRecipients: ownerEmails.length,
      });
      return NextResponse.json({ success: true, emailSent: false });
    }

    try {
      const resend = new Resend(resendApiKey);
      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: ownerEmails,
        subject: `New Booking Enquiry: ${body.full_name} (${body.event_type})`,
        html: emailHtml,
      });

      if (error) {
        console.error("Resend email API error:", error);
        return NextResponse.json({
          success: true,
          emailSent: false,
          emailError: typeof error === "object" && error && "message" in error ? (error as { message?: string }).message : "Resend send failed",
        });
      }

      if (!data?.id) {
        console.error("Resend email missing message id", { data });
        return NextResponse.json({ success: true, emailSent: false, emailError: "Resend did not return message id" });
      }

      console.info("Resend email sent", { messageId: data.id, to: ownerEmails });
      return NextResponse.json({ success: true, emailSent: true });
    } catch (emailError) {
      console.error("Resend email error:", emailError);
      return NextResponse.json({
        success: true,
        emailSent: false,
        emailError: emailError instanceof Error ? emailError.message : "Unexpected email error",
      });
    }
  } catch (error) {
    console.error("Booking enquiry error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
