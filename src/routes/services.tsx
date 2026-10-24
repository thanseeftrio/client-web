import { createFileRoute } from "@tanstack/react-router";
import { ServiceList } from "@/components/services";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [
    { title: "Design services — Zenmark" },
    { name: "description", content: "Logo and brand identity, wedding invitations, posters, social creatives and motion graphics by Zenmark." },
    { property: "og:title", content: "Design services — Zenmark" },
    { property: "og:description", content: "Explore five creative design services and discuss your project with Zenmark." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Services,
});

function Services() {
  return <main id="main-content" className="mx-auto max-w-[1800px] px-6 pt-40 pb-24 md:px-8">
    <h1 className="font-display animate-rise text-7xl uppercase leading-none md:text-9xl">Our services</h1>
    <p className="mt-6 max-w-lg text-lg text-muted-foreground">From a new identity to an invitation worth keeping — design for your next chapter.</p>
    <ServiceList />
  </main>;
}