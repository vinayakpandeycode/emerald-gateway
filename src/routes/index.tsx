import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Check,
  Compass,
  GraduationCap,
  Hotel,
  Menu,
  Network,
  PackageOpen,
  ShieldCheck,
  Target,
  X,
} from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/meraki-four-pillars-logo.jpeg.asset.json";
import videoAsset from "@/assets/meraki-walkthrough.mp4.asset.json";
import towerAsset from "@/assets/nirvana-tower.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Four Pillars Business Services | Connecting Markets. Creating Opportunities." },
      {
        name: "description",
        content:
          "Four Pillars Business Services is a Dubai-based cross-border consulting and business development firm connecting businesses, investors and opportunities across the GCC, South Asia, Africa and Australia.",
      },
      { property: "og:title", content: "Four Pillars Business Services | Connecting Markets. Creating Opportunities." },
      {
        property: "og:description",
        content:
          "Dubai-based cross-border consulting connecting businesses, investors and opportunities across the GCC, South Asia, Africa and Australia.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const navigation = [
  ["The Business", "business"],
  ["Approach", "approach"],
  ["Services", "services"],
  ["Sectors", "sectors"],
  ["Markets", "markets"],
  ["Contact", "contact"],
] as const;

const services = [
  ["Strategic Consulting", "We provide commercially focused advice to help businesses identify growth opportunities, refine their strategy and develop a clear pathway for expansion.", Compass],
  ["Cross-Border Market Entry", "We help businesses assess and enter new markets across the GCC, South Asia, Africa and Australia, providing local market insight, connections and strategic direction.", Target],
  ["Strategic Partnerships", "We connect businesses with carefully selected partners, operators, developers, institutions, investors and decision-makers to create mutually beneficial opportunities.", Network],
  ["Business Expansion & Scaling", "Whether entering a new country, launching a new division or scaling an existing business, we help develop the relationships, structure and strategy required for sustainable growth.", Building2],
  ["Opportunity & Investment Advisory", "We identify and facilitate commercially viable opportunities across our sectors and markets, connecting the right capital, businesses and projects.", BriefcaseBusiness],
  ["Network & Market Access", "Our strength lies in our network. We open doors to relationships and opportunities that can help businesses establish credibility, accelerate market entry and build a meaningful international presence.", Network],
] as const;

const sectors = [
  ["Education", "Connecting education providers, institutions, investors and strategic partners across international markets.", GraduationCap],
  ["Real Estate", "Supporting developers, investors, agencies and businesses with market expansion, strategic partnerships and cross-border opportunities.", Building2],
  ["Hospitality", "Helping hospitality brands and operators identify new markets, strategic partners and opportunities for international growth.", Hotel],
  ["Food & Consumer Products", "Supporting brands seeking distribution, market entry, strategic partnerships and expansion across high-growth international markets.", PackageOpen],
] as const;

const pillars = [
  ["Strategy", "Understanding where you want to go and creating the right roadmap."],
  ["Market Access", "Identifying the right markets and pathways to enter them."],
  ["Network", "Connecting you with the right people, partners and decision-makers."],
  ["Execution", "Turning strategy and opportunities into tangible commercial outcomes."],
] as const;

const formSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid work email").max(255),
  company: z.string().trim().max(120),
  objective: z.string().trim().min(10, "Please tell us a little about your plans").max(1000),
});

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a href="#top" className={`brand-lockup ${footer ? "brand-lockup-footer" : ""}`} aria-label="Meraki and Four Pillars home">
      <img src={logoAsset.url} alt="Meraki × Four Pillars official logo" />
    </a>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/35 bg-deep-green/95 text-pearl backdrop-blur-md">
      <div className="mx-auto grid h-[88px] max-w-[1500px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-6 lg:flex lg:justify-between lg:px-10">
        <Brand />
        <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary navigation">
          {navigation.map(([label, id]) => (
            <a key={id} href={`#${id}`} className="text-[10px] font-semibold uppercase tracking-wide text-pearl/75 transition-colors hover:text-gold-soft">
              {label}
            </a>
          ))}
        </nav>
        <Button asChild className="hidden h-11 rounded-none bg-gold px-5 text-[11px] font-bold uppercase tracking-wide text-deep-green shadow-none hover:-translate-y-0.5 hover:bg-gold-soft lg:inline-flex">
          <a href="#contact">Let&apos;s connect <ArrowUpRight /></a>
        </Button>
        <Button variant="ghost" size="icon" aria-label={open ? "Close navigation" : "Open navigation"} className="size-11 shrink-0 rounded-none text-pearl hover:bg-pearl/10 hover:text-gold-soft lg:hidden" onClick={() => setOpen((value) => !value)}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open ? (
        <nav className="border-t border-gold/20 bg-deep-green px-5 py-3 lg:hidden" aria-label="Mobile navigation">
          {navigation.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="block border-b border-pearl/10 py-3 text-xs font-semibold uppercase tracking-wide text-pearl/80 last:border-0">
              {label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="mt-3 flex items-center justify-between bg-gold px-4 py-3 text-xs font-bold uppercase tracking-wide text-deep-green">
            Let&apos;s connect <ArrowUpRight className="size-4" />
          </a>
        </nav>
      ) : null}
    </header>
  );
}

function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className={`mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-wide ${light ? "text-gold-soft" : "text-gold"}`}>
      <span className="h-px w-10 bg-current" />
      {children}
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-[760px] overflow-hidden bg-deep-green pt-[88px] text-pearl lg:min-h-screen">
      <video className="absolute inset-0 size-full object-cover" autoPlay muted loop playsInline preload="metadata" poster={towerAsset.url} aria-label="Meraki architectural walkthrough">
        <source src={videoAsset.url} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="hero-grid absolute inset-0 opacity-30" />
      <div className="relative z-10 mx-auto flex min-h-[672px] max-w-[1500px] flex-col justify-between px-5 py-12 sm:px-8 lg:min-h-[calc(100vh-88px)] lg:px-12 lg:py-16">
        <div className="hero-reveal max-w-5xl pt-7 lg:pt-10">
          <SectionLabel light>Dubai · Global Reach</SectionLabel>
          <h1 className="max-w-5xl text-[clamp(2.8rem,6.5vw,6.7rem)] leading-[0.98]">
            Connecting Markets.<br />
            <em className="font-normal text-gold-soft">Creating Opportunities.</em><br />
            Scaling Businesses.
          </h1>
          <p className="mt-7 max-w-2xl text-sm leading-7 text-pearl/75 sm:text-base">
            Four Pillars Business Services is a Dubai-based cross-border consulting and business development firm helping companies, investors, institutions and entrepreneurs identify opportunities, enter new markets and build sustainable international growth.
          </p>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="h-13 rounded-none bg-gold px-6 text-[11px] font-bold uppercase tracking-wide text-deep-green shadow-none transition-transform hover:-translate-y-0.5 hover:bg-gold-soft">
              <a href="#services">Explore what is possible <ArrowUpRight /></a>
            </Button>
            <a href="#approach" className="inline-flex items-center gap-3 border-b border-pearl/30 pb-2 text-[11px] font-bold uppercase tracking-wide text-pearl transition-colors hover:border-gold hover:text-gold-soft">
              Our approach <ArrowDown className="size-4" />
            </a>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 border-t border-pearl/20 pt-5 text-[9px] font-semibold uppercase tracking-wide text-pearl/60 sm:text-[10px]">
          <span className="min-w-0">GCC · South Asia · Africa · Australia</span>
          <a href="#business" className="shrink-0 transition-colors hover:text-gold-soft">Scroll to explore ↓</a>
        </div>
      </div>
    </section>
  );
}

function Business() {
  return (
    <section id="business" className="scroll-mt-[88px] bg-pearl py-24 text-brown lg:py-36">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <div>
            <SectionLabel>Four Pillars Business Services</SectionLabel>
            <h2 className="text-4xl leading-tight text-bottle sm:text-5xl lg:text-6xl">Connecting Markets.<br />Creating Opportunities.<br />Scaling Businesses.</h2>
          </div>
          <div className="border-l border-gold/45 pl-6 text-base leading-8 text-brown/80 sm:pl-10 lg:pt-16">
            <p>Four Pillars Business Services is a Dubai-based cross-border consulting and business development firm helping companies, investors, institutions and entrepreneurs identify opportunities, enter new markets and build sustainable international growth.</p>
            <p className="mt-6">We operate at the intersection of strategy, market access, trusted relationships and execution, connecting businesses with the right people, partners, investors and opportunities across South Asia, Africa, the GCC and Australia.</p>
            <p className="mt-6">Our focus extends across key growth sectors including Education, Real Estate, Hospitality and Food &amp; Consumer Products, where we help businesses unlock new markets, develop strategic partnerships and expand their international footprint.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section id="approach" className="scroll-mt-[88px] bg-warm-ivory py-24 lg:py-36">
      <div className="mx-auto grid max-w-[1320px] gap-14 px-5 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-24 lg:px-12">
        <div>
          <SectionLabel>Our Approach</SectionLabel>
          <h2 className="text-5xl leading-[1.05] text-bottle sm:text-6xl lg:text-7xl">More than a product.<br /><em className="font-normal text-gold">A global perspective.</em></h2>
        </div>
        <div className="space-y-7 border-t border-gold/50 pt-8 text-base leading-8 text-brown/80 lg:mt-28">
          <p>Expanding internationally requires more than a good product or service. It requires the right strategy, the right market and, most importantly, the right network.</p>
          <p>At Four Pillars, we work closely with our clients to understand their ambitions, assess opportunities and develop practical strategies designed around their specific goals.</p>
          <p>From market entry and business structuring to partnerships, distribution, investment opportunities and strategic introductions, we help businesses move from opportunity to execution.</p>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="scroll-mt-[88px] bg-pearl py-24 lg:py-36">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <SectionLabel>What We Do</SectionLabel>
        <h2 className="text-5xl leading-none text-bottle sm:text-6xl lg:text-7xl">From insight<br /><em className="font-normal text-gold">to impact.</em></h2>
        <div className="mt-16 grid border-t border-bottle/20 md:grid-cols-2">
          {services.map(([title, text, Icon], index) => (
            <article key={title} className="group grid min-h-72 grid-cols-[42px_1fr] gap-4 border-b border-bottle/20 py-9 md:px-8 md:odd:border-r md:odd:pl-0 md:even:pr-0">
              <span className="font-display text-sm text-gold">0{index + 1}</span>
              <div>
                <Icon className="size-6 stroke-1 text-gold transition-transform duration-500 group-hover:-translate-y-1" />
                <h3 className="mt-9 text-2xl text-bottle">{title}</h3>
                <p className="mt-4 max-w-lg text-sm leading-7 text-brown/65">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Collaboration() {
  return (
    <section className="bg-bottle py-24 text-pearl lg:py-36">
      <div className="mx-auto grid max-w-[1500px] gap-12 px-5 sm:px-8 lg:grid-cols-[1.12fr_.88fr] lg:items-center lg:px-12">
        <div className="relative min-h-[420px] overflow-hidden border border-gold/25 sm:min-h-[560px]">
          <img src={towerAsset.url} alt="Nirvana Residences architectural exterior" className="absolute inset-0 size-full object-cover transition-transform duration-1000 hover:scale-[1.02]" loading="lazy" />
          <div className="absolute inset-0 bg-collaboration-overlay" />
          <div className="absolute bottom-0 left-0 border-t border-r border-gold/25 bg-deep-green/90 px-6 py-5 text-[10px] font-semibold uppercase tracking-wide text-pearl/70">Dubai · Property · International Markets</div>
        </div>
        <div className="lg:pl-8">
          <SectionLabel light>Strategic Collaboration</SectionLabel>
          <h2 className="text-5xl leading-none sm:text-6xl lg:text-7xl">Meraki <span className="text-gold-soft">×</span><br />Four Pillars</h2>
          <p className="mt-7 font-display text-2xl italic leading-relaxed text-gold-soft">Building bridges between property, opportunity and international markets.</p>
          <p className="mt-7 text-sm leading-7 text-pearl/65">The Meraki × Four Pillars collaboration reflects the role of trusted relationships in connecting distinctive property opportunities with relevant international markets and networks.</p>
          <div className="mt-10 border-y border-gold/25 py-3">
            <Brand footer />
          </div>
        </div>
      </div>
    </section>
  );
}

function Sectors() {
  return (
    <section id="sectors" className="scroll-mt-[88px] bg-beige py-24 lg:py-36">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <SectionLabel>Our Sectors</SectionLabel>
        <h2 className="text-5xl leading-none text-bottle sm:text-6xl lg:text-7xl">Key sectors.<br /><em className="font-normal text-gold">Global opportunities.</em></h2>
        <div className="mt-16 grid border-l border-t border-bottle/20 md:grid-cols-2 lg:grid-cols-4">
          {sectors.map(([title, text, Icon], index) => (
            <article key={title} className="group min-h-[380px] border-b border-r border-bottle/20 p-7">
              <div className="flex items-start justify-between">
                <span className="text-xs text-gold">0{index + 1}</span>
                <Icon className="size-6 stroke-1 text-bottle/60" />
              </div>
              <h3 className="mt-32 text-2xl text-bottle">{title}</h3>
              <p className="mt-5 text-sm leading-7 text-brown/70">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function GlobalFootprint() {
  return (
    <section id="markets" className="scroll-mt-[88px] bg-pearl py-24 lg:py-36">
      <div className="mx-auto grid max-w-[1320px] gap-16 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:px-12">
        <div>
          <SectionLabel>Our Global Footprint</SectionLabel>
          <h2 className="text-5xl leading-none text-bottle sm:text-6xl lg:text-7xl">One base.<br /><em className="font-normal text-gold">Four horizons.</em></h2>
          <p className="mt-8 max-w-md text-base leading-8 text-brown/70">From our base in Dubai, we work across strategically important markets including:</p>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-[11px] font-bold uppercase tracking-wide text-bottle">
            <span>GCC</span><span className="text-gold">|</span><span>South Asia</span><span className="text-gold">|</span><span>Africa</span><span className="text-gold">|</span><span>Australia</span>
          </div>
          <p className="mt-8 max-w-lg border-l border-gold pl-5 text-sm leading-7 text-brown/65">Our role is to bridge markets and bring together the right combination of strategy, relationships, capital and opportunity.</p>
        </div>
        <div className="world-map relative min-h-[430px] overflow-hidden border border-bottle/15 bg-warm-ivory" aria-label="Four Pillars markets: GCC, South Asia, Africa and Australia">
          <div className="map-grid absolute inset-0" />
          <div className="absolute left-[50%] top-[30%] size-3 rounded-full bg-gold ring-8 ring-gold/15" />
          <div className="absolute left-[60%] top-[38%] size-3 rounded-full bg-gold ring-8 ring-gold/15" />
          <div className="absolute left-[46%] top-[54%] size-3 rounded-full bg-gold ring-8 ring-gold/15" />
          <div className="absolute left-[78%] top-[73%] size-3 rounded-full bg-gold ring-8 ring-gold/15" />
          <svg viewBox="0 0 800 460" className="absolute inset-0 size-full text-bottle/45" aria-hidden="true">
            <path d="M102 96l49-25 68 10 43 31 50 13 21 40-21 27-65 8-32 57-37 76-32-4-19-65-35-45 24-43-28-36zM344 91l68-25 107 14 71 45 49 0 39 30-31 31-47 1-25 42-61 9-30 42-13 91-47-23-17-93-43-59-31-33zM631 300l48-19 53 23 26 62-37 31-78-18-31-39z" fill="currentColor" />
            <path d="M400 145C465 114 505 115 560 145M390 161C370 215 364 245 373 286M483 212C568 250 631 293 681 331" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 7" />
          </svg>
          <span className="absolute left-[44%] top-[19%] bg-warm-ivory px-2 text-[10px] font-bold uppercase text-bottle">GCC</span>
          <span className="absolute left-[60%] top-[27%] bg-warm-ivory px-2 text-[10px] font-bold uppercase text-bottle">South Asia</span>
          <span className="absolute left-[40%] top-[62%] bg-warm-ivory px-2 text-[10px] font-bold uppercase text-bottle">Africa</span>
          <span className="absolute left-[72%] top-[82%] bg-warm-ivory px-2 text-[10px] font-bold uppercase text-bottle">Australia</span>
        </div>
      </div>
    </section>
  );
}

function WhyFourPillars() {
  return (
    <section className="bg-warm-ivory py-24 lg:py-36">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <SectionLabel>Why Four Pillars</SectionLabel>
        <h2 className="text-5xl leading-none text-bottle sm:text-6xl lg:text-7xl">Four pillars.<br /><em className="font-normal text-gold">Lasting momentum.</em></h2>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4">
          {pillars.map(([title, text], index) => (
            <article key={title} className="pillar-column relative min-h-[390px] border-l border-bottle/20 px-6 pb-8 pt-9 last:border-r">
              <span className="text-xs font-bold text-gold">0{index + 1}</span>
              <div className="absolute bottom-0 left-6 right-6 h-28 border-x border-t border-gold/45" />
              <div className="relative z-10 mt-44 bg-warm-ivory pb-4">
                <h3 className="text-2xl text-bottle">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-brown/65">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BridgeSection() {
  return (
    <section className="relative overflow-hidden bg-bottle py-24 text-pearl lg:py-36">
      <div className="hero-grid absolute inset-0 opacity-20" />
      <div className="relative mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-24 lg:px-12">
        <div>
          <SectionLabel light>Building Bridges Across Borders</SectionLabel>
          <h2 className="text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">Your ambition may be global.<br /><em className="font-normal text-gold-soft">Our role is to help you get there.</em></h2>
        </div>
        <div className="border-t border-gold/35 pt-8 text-sm leading-7 text-pearl/70 lg:mt-28">
          <p>At Four Pillars Business Services, we don&apos;t simply advise businesses on where opportunities exist—we help create the connections that can make those opportunities possible.</p>
          <p className="mt-6">Whether you are looking to expand into the GCC, access South Asian markets, explore Africa, enter Australia or build an international partnership, we bring together the strategic thinking and relationships required to take the next step.</p>
          <Button asChild className="mt-9 h-12 rounded-none bg-gold px-6 text-[11px] font-bold uppercase tracking-wide text-deep-green shadow-none hover:-translate-y-0.5 hover:bg-gold-soft">
            <a href="#contact">Start a conversation <ArrowUpRight /></a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = formSchema.safeParse(Object.fromEntries(new FormData(event.currentTarget)));
    if (!result.success) {
      const next: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      });
      setErrors(next);
      return;
    }
    setErrors({});
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <section id="contact" className="scroll-mt-[88px] bg-pearl py-24 lg:py-36">
      <div className="mx-auto grid max-w-[1320px] gap-16 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-24 lg:px-12">
        <div>
          <SectionLabel>Let&apos;s Connect</SectionLabel>
          <h2 className="text-5xl leading-none text-bottle sm:text-6xl lg:text-7xl">Start a<br />conversation.</h2>
          <p className="mt-7 font-display text-2xl italic leading-relaxed text-gold">Tell us where you want to go.<br />We&apos;ll help explore what comes next.</p>
          <div className="mt-12 border-t border-bottle/20 pt-7 text-sm leading-7 text-brown/70">
            <strong className="block text-xs uppercase tracking-wide text-bottle">Four Pillars Business Services</strong>
            <p className="mt-3">Dubai · Global Reach</p>
            <a href="mailto:hello@fourpillars.ae" className="mt-1 inline-block text-bottle underline decoration-gold underline-offset-4">hello@fourpillars.ae</a>
            <p className="mt-7 text-[10px] font-bold uppercase tracking-wide text-bottle">Markets</p>
            <p>GCC · South Asia · Africa · Australia</p>
            <p className="mt-7 flex items-center gap-2 text-xs text-brown/60"><ShieldCheck className="size-4 text-gold" /> Confidential enquiries · International market focus</p>
          </div>
        </div>
        {sent ? (
          <div className="grid min-h-[520px] place-items-center border border-bottle/20 p-8 text-center">
            <div>
              <span className="mx-auto grid size-14 place-items-center rounded-full border border-gold text-gold"><Check /></span>
              <h3 className="mt-7 text-4xl text-bottle">Thank you.</h3>
              <p className="mt-3 text-sm text-brown/65">Your enquiry has been prepared.</p>
              <Button variant="outline" onClick={() => setSent(false)} className="mt-7 rounded-none border-bottle text-bottle shadow-none hover:bg-bottle hover:text-pearl">Send another enquiry</Button>
            </div>
          </div>
        ) : (
          <form noValidate onSubmit={submit} className="border-t border-bottle/30 pt-8">
            <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
              <Field label="Full Name *" name="name" error={errors["name"]} />
              <Field label="Work Email *" name="email" type="email" error={errors["email"]} />
              <Field label="Company" name="company" error={errors["company"]} />
              <div className="sm:col-span-2">
                <label htmlFor="objective" className="mb-3 block text-[10px] font-bold uppercase tracking-wide text-bottle">What are you looking to achieve? *</label>
                <textarea id="objective" name="objective" rows={7} maxLength={1000} placeholder="Tell us about your market, opportunity or expansion plans…" className="w-full resize-none rounded-none border border-bottle/25 bg-transparent px-4 py-4 text-sm text-brown outline-none placeholder:text-brown/35 focus:border-gold" />
                <ErrorText>{errors["objective"]}</ErrorText>
              </div>
            </div>
            <Button type="submit" className="mt-7 h-13 w-full rounded-none bg-bottle text-[11px] font-bold uppercase tracking-wide text-pearl shadow-none hover:-translate-y-0.5 hover:bg-deep-green sm:w-auto sm:px-8">Submit enquiry <ArrowUpRight /></Button>
          </form>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-deep-green py-14 text-pearl">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 border-b border-pearl/12 pb-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Brand footer />
            <p className="mt-7 text-xs font-bold uppercase tracking-wide text-pearl/70">Four Pillars Business Services</p>
            <p className="mt-2 font-display text-2xl italic text-gold-soft">Strategy. Networks. Opportunities. Growth.</p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-bold uppercase tracking-wide text-pearl/60" aria-label="Footer navigation">
            {navigation.slice(1).map(([label, id]) => <a key={id} href={`#${id}`} className="transition-colors hover:text-gold-soft">{label}</a>)}
          </nav>
        </div>
        <p className="pt-7 text-[10px] text-pearl/45">© {new Date().getFullYear()} Four Pillars Business Services. All rights reserved.</p>
      </div>
    </footer>
  );
}

function Field({ label, name, type = "text", error }: { label: string; name: string; type?: string; error?: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-3 block text-[10px] font-bold uppercase tracking-wide text-bottle">{label}</label>
      <input id={name} name={name} type={type} maxLength={255} className="h-13 w-full rounded-none border border-bottle/25 bg-transparent px-4 text-sm text-brown outline-none focus:border-gold" />
      <ErrorText>{error}</ErrorText>
    </div>
  );
}

function ErrorText({ children }: { children?: string }) {
  return children ? <p className="mt-2 text-xs text-destructive">{children}</p> : null;
}

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-pearl">
      <Navbar />
      <main>
        <Hero />
        <Business />
        <Approach />
        <Services />
        <Collaboration />
        <Sectors />
        <GlobalFootprint />
        <WhyFourPillars />
        <BridgeSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}