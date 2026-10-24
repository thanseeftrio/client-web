import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { enquirySchema } from "./enquiry-schema";

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => enquirySchema.parse(input))
  .handler(async ({ data }) => {
    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) return { saved: false, error: "Enquiries are temporarily unavailable. Please contact us on WhatsApp." };
    const client = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      } },
    });
    const { error } = await client.from("business_enquiries").insert({
      submission_id: data.submissionId, name: data.name, email: data.email,
      phone: data.phone, company: data.company, service: data.service,
      budget: data.budget, message: data.message,
    });
    if (error && error.code !== "23505") return { saved: false, error: "Your enquiry could not be saved. Please try again or contact us on WhatsApp." };
    return { saved: true, reference: data.submissionId.slice(0, 8).toUpperCase() };
  });