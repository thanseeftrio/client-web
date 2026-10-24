import { createFileRoute } from "@tanstack/react-router";
import { PillButton, ProjectCard, projects } from "@/components/site";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { filterProjects, services, type ServiceId } from "@/lib/business";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Portfolio — Zenmark" },
      { name: "description", content: "Explore Zenmark design categories and clearly labelled concept previews." },
      { property: "og:title", content: "Portfolio — Zenmark" },
      { property: "og:description", content: "Brand identity, wedding designs, promotional graphics, social creatives and motion design." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Work,
});

function Work() {
  const [category, setCategory] = useState<ServiceId | "all">("all");
  const filtered = filterProjects(projects, category);
  return (
    <main id="main-content" className="mx-auto max-w-[1800px] px-6 pt-40 pb-24 md:px-8">
      <h1 className="font-display overflow-hidden text-[18vw] uppercase leading-[0.85] md:text-[12vw]">
        <span className="animate-rise block">Our work</span>
      </h1>
      <p className="animate-fade-up mt-6 max-w-md text-lg text-muted-foreground" style={{ animationDelay: "300ms" }}>
        Design across five disciplines. These existing previews are generated concepts, not client projects.
      </p>
      <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Portfolio categories">
        <Button className="rounded-full" variant={category === "all" ? "default" : "outline"} aria-pressed={category === "all"} onClick={() => setCategory("all")}>All concepts</Button>
        {services.map(s => <Button key={s.id} className="h-auto whitespace-normal rounded-full" variant={category === s.id ? "default" : "outline"} aria-pressed={category === s.id} onClick={() => setCategory(s.id)}>{s.name}</Button>)}
      </div>
      <p className="mt-6 text-sm text-muted-foreground" role="status">{filtered.length} previews</p>
      <div className="mt-8 grid gap-x-8 gap-y-14 md:grid-cols-2">
        {filtered.map((p, i) => <ProjectCard key={p.name} p={p} i={i} />)}
      </div>
      {filtered.length === 0 && <div className="border-y border-border py-16"><h2 className="font-display text-4xl uppercase">Projects coming soon</h2><p className="mt-3 text-muted-foreground">Approved client artwork for this category has not been supplied yet.</p></div>}
      <div className="mt-20 flex justify-center"><PillButton to="/contact">Start a project</PillButton></div>
    </main>
  );
}
