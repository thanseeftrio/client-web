import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { business, services, whatsappLink } from "@/lib/business";
import { enquirySchema } from "@/lib/enquiry-schema";
import { submitEnquiry } from "@/lib/enquiries.functions";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): { service?: string } => services.some(s => s.id === search["service"]) ? { service: String(search["service"]) } : {},
  head: () => ({
    meta: [
      { title: "Contact — Zenmark" },
      { name: "description", content: "Enquire about design services with Zenmark, or contact the studio on WhatsApp." },
      { property: "og:title", content: "Contact — Zenmark" },
      { property: "og:description", content: "Tell Zenmark about your brand, wedding, promotional or motion design project." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const [submissionId, setSubmissionId] = useState("");
  const { service } = Route.useSearch();
  const send = useServerFn(submitEnquiry);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    const form = new FormData(e.currentTarget);
    const id = submissionId || crypto.randomUUID();
    setSubmissionId(id);
    const parsed = enquirySchema.safeParse({ ...Object.fromEntries(form), submissionId: id });
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Please check your details."); return; }
    setLoading(true);
    try {
      const result = await send({ data: parsed.data });
      if (!result.saved) { setError(result.error ?? "Please try again."); return; }
      setReference(result.reference ?? "");
      setSent(true);
    } catch { setError("Your enquiry could not be saved. Please try again or use WhatsApp."); }
    finally { setLoading(false); }
  };
  const field = "w-full border-b border-border bg-transparent py-4 text-lg outline-none transition-colors focus:border-foreground";
  return (
    <main id="main-content" className="mx-auto grid max-w-[1800px] gap-16 px-6 pt-40 pb-24 md:px-8 lg:grid-cols-2">
      <div>
        <h1 className="font-display text-[18vw] uppercase leading-[0.85] lg:text-[9vw]">
          <span className="block overflow-hidden"><span className="animate-rise block">Let's build</span></span>
          <span className="block overflow-hidden"><span className="animate-rise block" style={{ animationDelay: "120ms" }}>something</span></span>
        </h1>
        <p className="animate-fade-up mt-6 max-w-md text-lg text-muted-foreground" style={{ animationDelay: "300ms" }}>
          Tell us about your project, or get in touch directly on WhatsApp.
        </p>
        <a href={whatsappLink()} target="_blank" rel="noreferrer" className="animate-fade-up group mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground" style={{ animationDelay: "450ms" }}>
          WhatsApp <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
        </a>
        <div className="mt-8 space-y-3 text-sm"><p><a href={`tel:+${business.whatsappDigits}`}>{business.phone}</a></p><p><a className="break-all underline underline-offset-4" href={`mailto:${business.email}`}>{business.email}</a></p></div>
      </div>
      <div className="animate-fade-up rounded-3xl bg-card p-8 md:p-12" style={{ animationDelay: "300ms" }}>
        {sent ? (
          <div className="flex h-full min-h-80 flex-col items-center justify-center text-center">
            <span className="sticker-sun grid h-24 w-24 place-items-center rounded-full text-5xl">☺</span>
            <h2 className="font-display mt-6 text-5xl uppercase">Enquiry saved</h2>
            <p role="status" className="mt-2 text-muted-foreground">Your enquiry is saved for Zenmark. Reference: {reference}.</p>
            <p className="mt-3 text-sm text-muted-foreground">Email notifications are not active yet. For a direct reply, contact us on WhatsApp.</p>
            <Button asChild className="mt-6 rounded-full"><a href={whatsappLink()} target="_blank" rel="noreferrer">Contact on WhatsApp <ArrowUpRight /></a></Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-6" aria-busy={loading}>
            <label className="block text-sm">Your name<input name="name" autoComplete="name" required maxLength={100} placeholder="Your name" className={field} /></label>
            <label className="block text-sm">Email<input name="email" autoComplete="email" required type="email" maxLength={255} placeholder="Email" className={field} /></label>
            <label className="block text-sm">Phone (optional)<input name="phone" autoComplete="tel" type="tel" maxLength={30} placeholder="Phone" className={field} /></label>
            <label className="block text-sm">Company / website (optional)<input name="company" maxLength={200} placeholder="Company / website" className={field} /></label>
            <label className="block text-sm">Service required<select name="service" required defaultValue={service ?? ""} className={`${field} text-base`}><option value="" disabled>Select a service</option>{services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></label>
            <label className="block text-sm">Budget (optional)<input name="budget" maxLength={100} placeholder="Your budget and currency" className={field} /></label>
            <label className="block text-sm">Project description<textarea name="message" required maxLength={3000} rows={4} placeholder="Tell us about your project" className={field} /></label>
            <div hidden aria-hidden="true"><label>Leave empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            <p className="text-xs text-muted-foreground">Your details are stored privately for Zenmark to handle your enquiry. Email notifications are not yet active.</p>
            <Button type="submit" disabled={loading} className="h-auto w-full rounded-full py-4 font-medium">{loading ? "Sending…" : "Send enquiry"}<ArrowUpRight /></Button>
          </form>
        )}
      </div>
    </main>
  );
}
