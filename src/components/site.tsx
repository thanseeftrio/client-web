import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, ArrowRight, CircleDollarSign, Grid2X2, House, MessageCircle, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { business, whatsappLink, type ServiceId } from "@/lib/business";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";

export const BOOK_URL = whatsappLink();

export const projects = [
  {
    name: "Logo",
    img: work1,
    tags: ["Logo Design", "Brand Identity"],
    category: null as ServiceId | null,
    provenance: "Logo creation and brand identity preview",
    video: "/project-previews/logo-tv.mp4",
    sourceUrl: undefined as string | undefined,
  },
  {
    name: "Zenflix",
    img: work2,
    tags: ["Wedding Invitations Card", "Card Design"],
    category: "wedding-design" as ServiceId | null,
    provenance: "Zenflix wedding invitations card design preview",
    video: "/project-previews/zenflix.mp4",
    sourceUrl: undefined as string | undefined,
  },
  {
    name: "Ambience",
    img: work3,
    tags: ["Website Development", "Web Creation"],
    category: "web-software-creation" as ServiceId | null,
    provenance: "",
    video: "/project-previews/ambience.mp4",
    sourceUrl: undefined as string | undefined,
  },
  {
    name: "ARQC",
    img: work4,
    tags: ["Custom Software Creation"],
    category: "web-software-creation" as ServiceId | null,
    provenance: "",
    video: "/project-previews/arqc.mp4",
    sourceUrl: undefined as string | undefined,
  },
];

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${inView ? "is-in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function Logo() {
  return <span className="font-display text-3xl uppercase leading-none">{business.name}</span>;
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/80 py-3 backdrop-blur-md" : "py-6"}`}
    >
      <div className="mx-auto flex max-w-[1800px] items-center justify-between px-6 md:px-8">
        <Link to="/" aria-label="Home"><Logo /></Link>
        <nav className="flex items-center gap-2 md:gap-6">
          <Link to="/services" className="text-sm font-medium hover:opacity-60">Services</Link>
          <Link to="/work" className="text-sm font-medium hover:opacity-60" activeProps={{ className: "underline underline-offset-4" }}>
            Work
          </Link>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-3 py-3 md:px-5 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
          >
            Contact <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function BottomNav() {
  const [processVisible, setProcessVisible] = useState(false);

  useEffect(() => {
    const section = document.querySelector("#how-it-works");
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setProcessVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0.05 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const items = [
    { label: "Home", href: "/#main-content", icon: House },
    { label: "Work", href: "/#work", icon: Grid2X2 },
    { label: "Process", href: "/#how-it-works", icon: Workflow },
    { label: "Pricing", href: "/#pricing", icon: CircleDollarSign },
    { label: "Contact", href: "/#contact", icon: MessageCircle },
  ];

  return (
    <nav
      className={`bottom-nav ${processVisible ? "bottom-nav-hidden" : ""}`}
      aria-label="Quick navigation"
      aria-hidden={processVisible}
      inert={processVisible}
    >
      {items.map(({ label, href, icon: Icon }) => (
        <a key={label} className="bottom-nav-item" href={href} aria-label={label} title={label}>
          <Icon aria-hidden="true" />
          <span>{label}</span>
        </a>
      ))}
    </nav>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="overflow-hidden bg-primary text-primary-foreground">
      <div className="mx-auto max-w-[1800px] px-6 pt-20 md:px-8">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <p className="text-sm opacity-60">Have a project in mind?</p>
            <a href={BOOK_URL} target="_blank" rel="noreferrer" className="group mt-3 inline-flex items-center gap-4 font-display text-5xl uppercase md:text-7xl">
              Let's talk <ArrowUpRight className="h-12 w-12 transition-transform group-hover:rotate-45" />
            </a>
          </div>
          <div className="space-y-2 text-sm">
            <p className="opacity-60">Pages</p>
            <Link to="/" className="block hover:opacity-60">Home</Link>
            <Link to="/work" className="block hover:opacity-60">Work</Link>
            <Link to="/services" className="block hover:opacity-60">Services</Link>
            <Link to="/contact" className="block hover:opacity-60">Contact</Link>
          </div>
          <div className="space-y-2 text-sm">
            <p className="opacity-60">Elsewhere</p>
            
            <a href={business.instagram} target="_blank" rel="noreferrer" className="block hover:opacity-60">Instagram</a>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="block hover:opacity-60">WhatsApp</a>
            <a href={`mailto:${business.email}`} className="block break-all hover:opacity-60">{business.email}</a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="block hover:opacity-60">LinkedIn</a>
          </div>
        </div>
        <p className="footer-wordmark mt-16 select-none text-center font-display uppercase leading-[0.8]">{business.name}</p>
        <div className="flex justify-between border-t border-primary-foreground/20 py-6 text-xs opacity-60">
          <span>© {new Date().getFullYear()} {business.name}</span>
          <span>Design & motion</span>
        </div>
      </div>
    </footer>
  );
}

export function PillButton({ to, href, children, variant = "solid" }: { to?: "/" | "/work" | "/contact" | "/services"; href?: string; children: ReactNode; variant?: "solid" | "outline" }) {
  const cls =
    variant === "solid"
      ? "bg-primary text-primary-foreground hover:scale-105"
      : "border border-border bg-card text-foreground hover:bg-primary hover:text-primary-foreground";
  const full = `group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-all duration-300 ${cls}`;
  if (href) return <a href={href} target="_blank" rel="noreferrer" className={full}>{children}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a>;
  return <Link to={to ?? "/"} className={full}>{children}</Link>;
}

export function ProjectCard({ p, i }: { p: (typeof projects)[number]; i: number }) {
  return (
    <Reveal delay={(i % 2) * 120}>
      <Dialog>
      <DialogTrigger asChild>
      <Button
        variant="ghost"
        className="group block h-auto w-full whitespace-normal p-0 text-left hover:bg-transparent"
        aria-label={`View ${p.name} project preview`}
      >
        <div className="overflow-hidden rounded-2xl bg-muted">
          {p.video ? (
            <video
              src={p.video}
              poster={p.img}
              aria-hidden="true"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="aspect-[10/7] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <img src={p.img} alt={`${p.name} project preview`} decoding="async" width={1280} height={896} loading="lazy" className="aspect-[10/7] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          )}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-display text-3xl uppercase">{p.name}</h3>
          <div className="flex gap-2">
            {p.tags.map((t) => (
              <span key={t} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{t}</span>
            ))}
          </div>
        </div>
        {p.provenance ? <p className="mt-2 text-sm text-muted-foreground">{p.provenance}</p> : null}
      </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-4xl overflow-y-auto">
        <DialogTitle className="font-display text-4xl uppercase">{p.name}</DialogTitle>
        {p.provenance ? <DialogDescription>{p.provenance}.</DialogDescription> : null}
        {p.video ? <video src={p.video} controls playsInline preload="metadata" className="aspect-[10/7] w-full object-contain" /> : <img src={p.img} alt={`${p.name} generated concept in full`} width={1280} height={896} className="aspect-[10/7] w-full object-contain" />}
        {p.sourceUrl && (
          <a
            href={p.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4"
          >
            View original project <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
        <PillButton to="/contact">Discuss your project</PillButton>
      </DialogContent>
      </Dialog>
    </Reveal>
  );
}
