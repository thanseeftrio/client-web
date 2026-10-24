import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/business";
import { Reveal } from "./site";

export function ServiceList() {
  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => (
        <Reveal key={service.id} delay={index * 80}>
          <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-8">
            <span aria-hidden="true" className={`${service.accent} mb-8 grid h-16 w-16 place-items-center rounded-full text-3xl font-bold text-sticker-ink`}>{service.symbol}</span>
            <h2 className="text-2xl font-bold">{service.name}</h2>
            <p className="mt-3 flex-1 text-muted-foreground">{service.description}</p>
            <Button asChild variant="link" className="mt-6 h-auto justify-start p-0">
              <Link to="/contact" search={{ service: service.id }}>Enquire <ArrowUpRight /></Link>
            </Button>
          </article>
        </Reveal>
      ))}
    </div>
  );
}