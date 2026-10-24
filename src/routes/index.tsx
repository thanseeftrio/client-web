import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Star, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { BOOK_URL, PillButton, ProjectCard, Reveal, projects } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zenmark — Graphic design & motion" },
      { name: "description", content: "Zenmark creates brand identities, wedding invitations, posters, social media creatives and animated graphics." },
      { property: "og:title", content: "Zenmark — Graphic design & motion" },
      { property: "og:description", content: "Creative design for brands, celebrations and campaigns. Contact Zenmark about your project." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const logos = ["Motum", "ENDER", "ARQC Estudio", "SENSE", "Del Viento", "Silvina Paz", "Coderhouse"];

const testimonials = [
  { q: "The logo captured our shop's personality perfectly. The process was friendly, and we had a design we were proud to put on our sign.", n: "Aarav S.", r: "Sample client · India" },
  { q: "Our wedding invitation looked beautiful and felt personal to us. The details were handled with care, and the final design was easy to share with family.", n: "Ananya R.", r: "Sample client · India" },
  { q: "The promotional poster was clear, colorful, and ready on time. It helped us present our event professionally.", n: "Kiran M.", r: "Sample client · India" },
  { q: "The social media creatives gave our campaign a consistent look. Communication was smooth, and revisions were straightforward.", n: "Meera P.", r: "Sample client · India" },
  { q: "The animated graphic brought our idea to life. The final motion design was polished and worked well across our channels.", n: "Rohan N.", r: "Sample client · India" },
];

const steps = [
  { t: "Discovery", d: "A short call about your goals. You get scope, timeline and price before anything starts.", tag: "Free 15 min call" },
  { t: "Design", d: "Structure and visuals in Figma, shaped with your feedback at every step." },
  { t: "Framer build", d: "Responsive and animated, with CMS and SEO set up so you can edit it yourself." },
  { t: "Launch", d: "Live on your domain, everything handed over, and support after.", tag: "It's live!" },
];

const plans = [
  { name: "Logo & quick designs", price: "₹100–₹1,000", unit: "estimated project range", d: "A starting range for logo creation, invitations, or a single promotional design.", f: ["Logo and brand identity", "Wedding invitation design", "Poster or banner", "Final files for sharing"] },
  { name: "Brand & campaign design", price: "₹1,000–₹3,000", unit: "estimated project range", d: "A broader design package for building a consistent visual presence.", f: ["Brand identity assets", "Wedding card suite", "Social media graphics", "Revisions shaped around your brief"], featured: true },
  { name: "Creative campaigns", price: "₹4,000–₹6,000", unit: "estimated project range", d: "A larger bundle for campaign graphics, promotional materials, and motion.", f: ["Promotional posters and banners", "Advertising creatives", "Animated graphics", "Motion design"] },
];

function Line({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="block overflow-hidden">
      <span className="animate-rise block" style={{ animationDelay: `${delay}ms` }}>{text}</span>
    </span>
  );
}

function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [enteredCards, setEnteredCards] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className={`process-section ${inView ? "process-visible" : ""} ${enteredCards === steps.length ? "process-entered" : ""}`}
      aria-labelledby="process-title"
    >
      <div className="process-inner">
        <div className="process-heading">
          <h2 id="process-title" className="font-display text-6xl uppercase md:text-8xl">How it works</h2>
          <p>Original website-design process retained for reference; Zenmark’s process and timings require confirmation.</p>
        </div>
        <div className="process-stage">
          <svg className="process-path" viewBox="0 0 1200 450" preserveAspectRatio="none" aria-hidden="true">
            <path pathLength="1" d="M-20 70 C100 70 110 155 270 155 S440 225 600 135 S780 65 900 145 S1080 220 1220 120" />
          </svg>
          <span className="process-star" aria-hidden="true" />
          <ol className="process-grid">
            {steps.map((step, index) => {
              const colors = [
                { background: "#c6f432", foreground: "#1d2a00" },
                { background: "#ff7ac6", foreground: "#3d0a26" },
                { background: "#2e90fa", foreground: "#ffffff" },
                { background: "#ed4a1c", foreground: "#ffffff" },
              ];
              const color = colors[index];
              return (
                <li
                  key={step.t}
                  className="process-card"
                  onAnimationEnd={(event) => {
                    if (event.animationName === "process-card-enter") {
                      setEnteredCards((count) => Math.min(steps.length, count + 1));
                    }
                  }}
                  style={{
                    "--card-background": color.background,
                    "--card-foreground": color.foreground,
                    "--card-index": index,
                  } as CSSProperties}
                >
                  <span className="process-number">0{index + 1}</span>
                  {step.tag && <span className={`process-badge process-badge-${index}`}>{step.tag}</span>}
                  <div className="process-copy">
                    <h3>{step.t}</h3>
                    <p>{step.d}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <main id="main-content">
      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-16 text-center">
        <a href={BOOK_URL} target="_blank" rel="noreferrer" className="animate-fade-up mb-8 inline-flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2 text-sm shadow-sm">
          <span className="animate-pulse-dot h-2 w-2 rounded-full bg-live" />
          <span className="font-medium">Available for new projects</span>
          <span className="h-4 w-px bg-border" />
           <span className="text-muted-foreground">WhatsApp</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
        <h1 className="font-display text-[15vw] uppercase leading-[0.88] md:text-[8.5vw]">
          <span className="sr-only">Zenmark — Graphic design and motion</span>
          <span aria-hidden>
            <Line text="Zenmark" delay={100} />
            <Line text="Design in motion" delay={250} />
          </span>
        </h1>

        {/* stickers */}
        <span className="animate-float sticker-orange shadow-sticker absolute left-[8%] top-[22%] hidden rounded-full border-4 border-card px-8 py-3 text-2xl font-bold text-primary-foreground md:block" style={{ ["--r" as string]: "-12deg", animationDelay: "600ms" }}>
          Design & motion
        </span>
        <span className="animate-float sticker-sun shadow-sticker absolute right-[9%] top-[19%] hidden h-28 w-28 place-items-center rounded-full border-4 border-card text-5xl md:grid" style={{ ["--r" as string]: "8deg", animationDelay: "750ms" }}>
          ☺
        </span>
        <span className="animate-float sticker-lime shadow-sticker absolute bottom-[26%] left-[7%] hidden h-36 w-36 flex-col items-center justify-center border-4 border-card md:flex" style={{ ["--r" as string]: "-8deg", clipPath: "polygon(50% 0,61% 12%,78% 6%,80% 23%,96% 28%,88% 43%,100% 55%,85% 64%,90% 82%,72% 82%,64% 98%,50% 88%,36% 98%,28% 82%,10% 82%,15% 64%,0 55%,12% 43%,4% 28%,20% 23%,22% 6%,39% 12%)", animationDelay: "900ms" }}>
          <span className="text-4xl font-bold">5</span>
          <span className="text-xs font-bold">Creative services</span>
        </span>
        <span className="animate-float sticker-pink shadow-sticker absolute bottom-[24%] right-[8%] hidden rounded-full border-4 border-card px-10 py-4 text-2xl font-bold md:block" style={{ ["--r" as string]: "6deg", animationDelay: "1050ms" }}>
          Ideas into art
        </span>

        <p className="animate-fade-up mx-auto mt-10 max-w-lg text-lg text-muted-foreground" style={{ animationDelay: "500ms" }}>
          Logo and brand identity, wedding invitations, posters and banners, social media creatives, and animated graphics.
        </p>
        <div className="animate-fade-up mt-8 flex flex-wrap justify-center gap-3" style={{ animationDelay: "650ms" }}>
          <PillButton to="/contact">Start a project</PillButton>
          <PillButton to="/work" variant="outline">See our work</PillButton>
          <PillButton to="/services" variant="outline">Our services</PillButton>
        </div>

        <div className="animate-fade-up mt-20 w-full max-w-5xl" style={{ animationDelay: "800ms" }}>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="h-px flex-1 bg-border" />Original DOVV reference clients — not verified for Zenmark<span className="h-px flex-1 bg-border" />
          </div>
          <div className="mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
            <div className="animate-marquee flex w-max gap-16">
              {[...logos, ...logos].map((l, i) => (
                <span key={i} className="font-display whitespace-nowrap text-3xl uppercase text-muted-foreground/60">{l}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="mx-auto max-w-[1800px] px-6 py-24 md:px-8">
        <Reveal className="mb-12 flex items-end justify-between">
          <h2 className="font-display text-6xl uppercase md:text-8xl">DOVV project previews</h2>
          <Link to="/work" className="hidden text-sm font-medium underline underline-offset-4 md:block">View all</Link>
        </Reveal>
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
          {projects.map((p, i) => <ProjectCard key={p.name} p={p} i={i} />)}
        </div>
        <div className="mt-14 flex justify-center"><PillButton to="/work" variant="outline">View all</PillButton></div>
      </section>

      {/* Testimonials */}
      <section className="overflow-hidden py-24">
        <Reveal className="px-6 text-center">
          <h2 className="font-display text-6xl uppercase md:text-8xl">Kind words</h2>
          <p className="mt-3 text-sm text-muted-foreground">Sample Indian reviews · Replace with verified customer feedback</p>
        </Reveal>
        <div className="mt-14 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <div className="animate-marquee flex w-max gap-6 hover:[animation-play-state:paused]" style={{ animationDuration: "60s" }}>
            {[...testimonials, ...testimonials].map((t, i) => (
              <figure key={i} className="w-[380px] shrink-0 rounded-2xl border border-border bg-card p-8">
                <div className="flex gap-0.5">{[0, 1, 2, 3, 4].map((s) => <Star key={s} className="h-4 w-4 fill-current" />)}</div>
                <blockquote className="mt-4 text-lg leading-snug">“{t.q}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-primary font-bold text-primary-foreground">{t.n[0]}</span>
                  <span><span className="block font-medium">{t.n}</span><span className="text-sm text-muted-foreground">{t.r}</span></span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-8">
        <Reveal>
          <p className="text-sm text-muted-foreground">About Zen Mark</p>
          <p className="mt-6 max-w-5xl text-3xl font-medium leading-tight md:text-5xl">
            Zen Mark is a cyber cafe and service provider that creates thoughtful visual designs for businesses, celebrations, and campaigns.
          </p>
        </Reveal>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Logo creation and brand identity",
            "Wedding invitation and wedding card design",
            "Posters and promotional banners",
            "Social media graphics and advertising creatives",
            "Animated graphics and motion design",
          ].map((x, i) => (
            <Reveal key={x} delay={i * 80}>
              <li className="flex h-full items-center gap-3 rounded-xl border border-border bg-card p-5"><Check className="h-5 w-5 shrink-0" />{x}</li>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={160}>
          <div className="mt-16 border-t border-border pt-8">
            <h3 className="font-display text-4xl uppercase md:text-6xl">Portfolio</h3>
            <p className="mt-4 max-w-5xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
              Real project images and design from the first sketch to the last line of code. By keeping strategy, design, and Framer development in the same hands, nothing gets lost along the way.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Process */}
      <ProcessSection />

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-[1800px] px-6 py-24 md:px-8">
        <Reveal className="text-center">
          <p className="text-sm text-muted-foreground">Estimated ranges in Indian rupees; final quotes depend on project scope.</p>
          <h2 className="font-display mt-2 text-6xl uppercase md:text-8xl">Pricing ranges</h2>
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 120}>
              <div className={`flex h-full flex-col rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-2 ${p.featured ? "bg-primary text-primary-foreground" : "border border-border bg-card"}`}>
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl md:text-5xl">{p.price}</span>
                  <span className="text-sm opacity-60">{p.unit}</span>
                </div>
                <p className="mt-4 opacity-80">{p.d}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {p.f.map((f) => <li key={f} className="flex items-center gap-2"><Check className="h-4 w-4" />{f}</li>)}
                </ul>
                <a href={BOOK_URL} target="_blank" rel="noreferrer" className={`mt-8 rounded-full py-3.5 text-center text-sm font-medium transition-transform hover:scale-[1.03] ${p.featured ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground"}`}>
                  Request a quote
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
