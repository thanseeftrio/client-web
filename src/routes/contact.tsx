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
      { title: "Contact — Zenflix" },
      { name: "description", content: "Enquire about design services with Zenflix, or contact the studio on WhatsApp." },
      { property: "og:title", content: "Contact — Zenflix" },
      { property: "og:description", content: "Tell Zenflix about your brand, wedding, promotional or motion design project." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [lastWhatsappUrl, setLastWhatsappUrl] = useState("");
  const { service } = Route.useSearch();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const serviceVal = String(form.get("service") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const budget = String(form.get("budget") || "").trim();
    const message = String(form.get("message") || "").trim();

    const serviceObj = services.find((s) => s.id === serviceVal);
    const serviceName = serviceObj ? serviceObj.name : serviceVal;

    const parts: string[] = ["Hi Zenflix, I’d like to enquire about a design project."];
    if (name) parts.push(`*Name:* ${name}`);
    if (serviceName) parts.push(`*Service:* ${serviceName}`);
    if (phone) parts.push(`*Phone:* ${phone}`);
    if (budget) parts.push(`*Budget:* ${budget}`);
    if (message) parts.push(`*Project Details:* ${message}`);

    const text = parts.join("\n\n");
    const url = `https://wa.me/${business.whatsappDigits}?text=${encodeURIComponent(text)}`;

    setLastWhatsappUrl(url);
    setSent(true);

    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
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
          Tell us about your project, or connect with us directly on WhatsApp.
        </p>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noreferrer"
          className="animate-fade-up group mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground"
          style={{ animationDelay: "450ms" }}
        >
          WhatsApp <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
        </a>
        <div className="mt-8 space-y-3 text-sm">
          <p><a href={`tel:+${business.whatsappDigits}`}>{business.phone}</a></p>
          <p><a className="break-all underline underline-offset-4" href={whatsappLink()} target="_blank" rel="noreferrer">Chat on WhatsApp</a></p>
        </div>
      </div>
      <div className="animate-fade-up rounded-3xl bg-card p-8 md:p-12" style={{ animationDelay: "300ms" }}>
        {sent ? (
          <div className="flex h-full min-h-80 flex-col items-center justify-center text-center">
            <span className="sticker-sun grid h-24 w-24 place-items-center rounded-full text-5xl">☺</span>
            <h2 className="font-display mt-6 text-5xl uppercase">Opening WhatsApp</h2>
            <p role="status" className="mt-2 text-muted-foreground">Your enquiry message has been prepared for Zenflix on WhatsApp.</p>
            <p className="mt-3 text-sm text-muted-foreground">If WhatsApp didn't open automatically, click the button below:</p>
            <Button asChild className="mt-6 rounded-full">
              <a href={lastWhatsappUrl || whatsappLink()} target="_blank" rel="noreferrer">
                Chat on WhatsApp <ArrowUpRight />
              </a>
            </Button>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-6 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              Edit enquiry details
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-6">
            <label className="block text-sm">Your name (optional)<input name="name" autoComplete="name" maxLength={100} placeholder="Your name" className={field} /></label>
            <label className="block text-sm">Phone (optional)<input name="phone" autoComplete="tel" type="tel" maxLength={30} placeholder="Phone number" className={field} /></label>
            <label className="block text-sm">Service required<select name="service" defaultValue={service ?? ""} className={`${field} text-base`}><option value="">Select a service (optional)</option>{services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></label>
            <label className="block text-sm">Budget (optional)<input name="budget" maxLength={100} placeholder="Your budget and currency" className={field} /></label>
            <label className="block text-sm">Project description<textarea name="message" maxLength={3000} rows={4} placeholder="Tell us about your project..." className={field} /></label>
            <div hidden aria-hidden="true"><label>Leave empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
            <p className="text-xs text-muted-foreground">Directly connects to Zenflix on WhatsApp. No email required.</p>
            <Button type="submit" className="h-auto w-full rounded-full py-4 font-medium">Send enquiry on WhatsApp <ArrowUpRight /></Button>
          </form>
        )}
      </div>
    </main>
  );
}
