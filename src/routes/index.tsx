import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowDownRight, ArrowRight, Building2, Check, ChevronDown, Compass,
  Download, GraduationCap, Hotel, Landmark, Menu, Network, Package,
  ShieldCheck, Target, TrendingUp, Users, X,
} from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import towerAsset from "@/assets/nirvana-tower.jpg.asset.json";
import poolAsset from "@/assets/nirvana-pool.jpg.asset.json";
import gymAsset from "@/assets/nirvana-gym.jpg.asset.json";
import lobbyAsset from "@/assets/nirvana-lobby.jpg.asset.json";
import brochureAsset from "@/assets/nirvana-residences-brochure.pdf.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Four Pillars Business Services | Dubai" },
      { name: "description", content: "Cross-border consulting, market entry and business development across the GCC, South Asia, Africa and Australia." },
      { property: "og:title", content: "Four Pillars Business Services" },
      { property: "og:description", content: "Connecting markets. Creating opportunities. Scaling businesses." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const navItems = [
  ["About", "about"], ["The Four Pillars", "pillars"], ["Services", "services"],
  ["Sectors", "sectors"], ["Featured Opportunities", "opportunity"],
  ["Global Footprint", "global"], ["Contact", "contact"],
];

const pillars = [
  { n: "01", title: "Strategy", text: "Understanding direction and architecting the roadmap.", icon: Compass },
  { n: "02", title: "Market Access", text: "Identifying high-potential markets and entry pathways.", icon: Target },
  { n: "03", title: "Network", text: "Connecting with key decision-makers, operators, and capital.", icon: Network },
  { n: "04", title: "Execution", text: "Turning strategic opportunities into commercial outcomes.", icon: TrendingUp },
];

const services = [
  ["Strategic Consulting", "Market intelligence and decision frameworks that turn ambition into a clear, executable path."],
  ["Cross-Border Market Entry", "Practical pathways into new jurisdictions, built around local realities and long-term value."],
  ["Business Development", "End-to-end opportunity development, from prospecting and positioning to commercial progression."],
  ["Strategic Partnerships", "Aligned relationships with institutions, operators, investors, and influential market participants."],
  ["Business Expansion & Scaling", "Structured growth strategies for companies ready to establish and accelerate internationally."],
  ["Opportunity & Investment Advisory", "Commercial diligence and informed access to select cross-border opportunities."],
];

const regions = {
  GCC: { label: "GCC", title: "Gateway to high-growth Gulf markets", text: "Headquartered in Dubai, we navigate the region’s commercial landscape with local insight, institutional access, and an execution-first approach.", markets: "UAE · Saudi Arabia · Qatar · Oman" },
  "South Asia": { label: "South Asia", title: "Scale through dynamic growth economies", text: "We connect businesses to fast-moving markets, established operator networks, and opportunities shaped by population-scale demand.", markets: "India · Bangladesh · Sri Lanka" },
  Africa: { label: "Africa", title: "Build long-term market positions", text: "We identify credible partnerships and entry pathways across emerging economies, grounded in local context and disciplined assessment.", markets: "East Africa · Southern Africa · West Africa" },
  Australia: { label: "Australia", title: "Connect capital, capability, and opportunity", text: "Our Australian roots enable trusted bridges between ANZ businesses, investors, and opportunities across Dubai and growth markets.", markets: "Australia · New Zealand" },
};

const formSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  company: z.string().trim().min(2, "Please enter your company").max(120),
  sector: z.string().min(1, "Choose a sector"),
  region: z.string().min(1, "Choose a target region"),
  message: z.string().trim().min(10, "Tell us a little more about your objective").max(1000),
});

function Brand({ light = false }: { light?: boolean }) {
  return <a href="#top" className="group inline-flex items-center gap-3" aria-label="Four Pillars home">
    <span className={`grid size-10 place-items-center border ${light ? "border-gold/50" : "border-gold"}`}><span className="font-display text-xl text-gold">IV</span></span>
    <span className="leading-none"><strong className={`block text-sm font-semibold uppercase ${light ? "text-primary-foreground" : "text-forest"}`}>Four Pillars</strong><span className={`mt-1 block text-[9px] uppercase tracking-[0.22em] ${light ? "text-gold-soft" : "text-muted-foreground"}`}>Business Services</span></span>
  </a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-primary-foreground/10 bg-forest/95 text-primary-foreground backdrop-blur-md">
    <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 lg:px-10">
      <Brand light />
      <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary navigation">
        {navItems.map(([label, id]) => <a key={id} href={`#${id}`} className="text-[11px] font-medium uppercase text-primary-foreground/75 transition-colors hover:text-gold-soft">{label}</a>)}
      </nav>
      <Button asChild className="hidden h-10 rounded-none bg-gold px-5 text-forest hover:bg-gold-soft lg:inline-flex"><a href="#contact">Let’s talk <ArrowRight /></a></Button>
      <Button variant="ghost" size="icon" aria-label={open ? "Close menu" : "Open menu"} className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-gold lg:hidden" onClick={() => setOpen(v => !v)}>{open ? <X /> : <Menu />}</Button>
    </div>
    {open && <nav className="border-t border-primary-foreground/10 bg-forest px-5 py-5 lg:hidden" aria-label="Mobile navigation">{navItems.map(([label,id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="block border-b border-primary-foreground/10 py-3 text-sm text-primary-foreground/80">{label}</a>)}</nav>}
  </header>;
}

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <div className={`mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase ${dark ? "text-gold-soft" : "text-gold"}`}><span className="h-px w-9 bg-current" />{children}</div>;
}

function Index() {
  const [region, setRegion] = useState<keyof typeof regions>("GCC");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = formSchema.safeParse(Object.fromEntries(form));
    if (!result.success) {
      const next: Record<string, string> = {};
      result.error.issues.forEach(issue => { const key = String(issue.path[0]); if (!next[key]) next[key] = issue.message; });
      setErrors(next); return;
    }
    setErrors({}); setSent(true); event.currentTarget.reset();
  }

  return <div id="top" className="min-h-screen overflow-x-hidden bg-background">
    <Header />
    <main>
      <section className="relative min-h-[760px] bg-forest pt-20 text-primary-foreground lg:min-h-[820px]">
        <div className="absolute inset-0 opacity-[0.06]" style={{backgroundImage: "linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)", backgroundSize: "80px 80px"}} />
        <div className="relative mx-auto grid min-h-[740px] max-w-[1440px] items-center gap-12 px-5 py-24 lg:grid-cols-[1.1fr_.9fr] lg:px-10">
          <div className="max-w-4xl">
            <Eyebrow dark>Dubai · Australia · Global Markets</Eyebrow>
            <h1 className="max-w-4xl text-5xl leading-[1.02] sm:text-6xl lg:text-7xl xl:text-[5.6rem]">Connecting Markets.<br/><span className="text-gold">Creating Opportunities.</span><br/>Scaling Businesses.</h1>
            <p className="mt-8 max-w-2xl text-base leading-7 text-primary-foreground/70 lg:text-lg">Dubai-based cross-border consulting and business development helping companies, investors, and institutions unlock international growth across South Asia, Africa, the GCC, and Australia.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 rounded-none bg-gold px-7 text-forest hover:bg-gold-soft"><a href="#opportunity">Explore Opportunities <ArrowDownRight /></a></Button>
              <Button asChild variant="outline" size="lg" className="h-12 rounded-none border-primary-foreground/35 bg-transparent px-7 text-primary-foreground hover:bg-primary-foreground hover:text-forest"><a href="#contact">Schedule a Consultation</a></Button>
            </div>
          </div>
          <div className="relative hidden h-[520px] lg:block">
            <div className="absolute right-0 top-0 h-full w-[76%] border border-gold/25" />
            <div className="absolute bottom-12 left-0 w-[88%] border-l-2 border-gold bg-primary-foreground/[0.04] p-9 backdrop-blur-sm">
              <span className="text-7xl font-medium text-gold">4</span>
              <p className="mt-2 max-w-sm font-display text-2xl leading-snug">Fundamental pillars. One clear objective: sustainable international growth.</p>
            </div>
            <div className="absolute right-9 top-10 font-display text-[11rem] leading-none text-primary-foreground/[0.035]">IV</div>
          </div>
        </div>
        <a href="#about" aria-label="Scroll to about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/50"><ChevronDown className="animate-bounce" /></a>
      </section>

      <section id="about" className="scroll-mt-20 py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1280px] gap-14 px-5 lg:grid-cols-[.75fr_1.25fr] lg:px-10">
          <div><Eyebrow>Who We Are</Eyebrow><h2 className="text-4xl leading-tight text-forest lg:text-5xl">Building bridges<br/>across borders.</h2></div>
          <div className="border-l border-gold/50 pl-7 lg:pl-12">
            <p className="font-display text-2xl leading-relaxed text-ink lg:text-3xl">Four Pillars Business Services creates valuable pathways for organisations to access new markets, specialist expertise, investment, and enduring partnerships.</p>
            <div className="mt-10 grid gap-8 border-t border-border pt-8 sm:grid-cols-3"><div><strong className="block text-3xl text-gold">Dubai</strong><span className="text-sm text-muted-foreground">Global headquarters</span></div><div><strong className="block text-3xl text-gold">ANZ</strong><span className="text-sm text-muted-foreground">Australian-founded</span></div><div><strong className="block text-3xl text-gold">4</strong><span className="text-sm text-muted-foreground">Priority regions</span></div></div>
          </div>
        </div>
      </section>

      <section id="pillars" className="scroll-mt-20 bg-forest py-24 text-primary-foreground lg:py-32">
        <div className="mx-auto max-w-[1280px] px-5 lg:px-10"><Eyebrow dark>Our Operating Philosophy</Eyebrow><div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><h2 className="max-w-xl text-4xl leading-tight lg:text-5xl">The Four Fundamental Pillars</h2><p className="max-w-md text-sm leading-6 text-primary-foreground/60">A practical framework that carries every mandate from intelligent direction to measurable commercial outcomes.</p></div>
          <div className="mt-16 grid border-l border-t border-primary-foreground/15 sm:grid-cols-2 lg:grid-cols-4">{pillars.map(({n,title,text,icon:Icon}) => <article key={title} className="group min-h-80 border-b border-r border-primary-foreground/15 p-7 transition-colors hover:bg-primary-foreground/[0.04]"><div className="flex items-start justify-between"><span className="text-xs text-gold">{n}</span><Icon className="size-5 text-gold/70" /></div><h3 className="mt-24 text-2xl text-primary-foreground">{title}</h3><p className="mt-4 text-sm leading-6 text-primary-foreground/60">{text}</p></article>)}</div>
        </div>
      </section>

      <section id="services" className="scroll-mt-20 py-24 lg:py-32"><div className="mx-auto max-w-[1280px] px-5 lg:px-10"><Eyebrow>What We Do</Eyebrow><h2 className="max-w-2xl text-4xl leading-tight text-forest lg:text-5xl">Integrated advisory for international growth.</h2><div className="mt-14 grid border-t border-border md:grid-cols-2">{services.map(([title,text],i) => <article key={title} className="group grid min-h-52 grid-cols-[48px_1fr] gap-4 border-b border-border py-8 md:pr-10 md:odd:border-r md:even:pl-10"><span className="text-xs text-gold">0{i+1}</span><div><h3 className="text-xl text-forest">{title}</h3><p className="mt-4 text-sm leading-6 text-muted-foreground">{text}</p><ArrowRight className="mt-6 size-4 text-gold transition-transform group-hover:translate-x-1" /></div></article>)}</div></div></section>

      <section id="sectors" className="scroll-mt-20 bg-muted py-24 lg:py-28"><div className="mx-auto max-w-[1280px] px-5 lg:px-10"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><Eyebrow>Sector Experience</Eyebrow><h2 className="text-4xl text-forest lg:text-5xl">Where insight meets opportunity.</h2></div><p className="max-w-sm text-sm leading-6 text-muted-foreground">Focused expertise across sectors where relationships, local intelligence, and execution create disproportionate value.</p></div><div className="mt-12 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">{[["Education",GraduationCap],["Real Estate",Building2],["Hospitality",Hotel],["Food & Consumer Products",Package]].map(([name,Icon]) => { const SectorIcon = Icon as typeof Building2; return <div key={name as string} className="bg-background p-8"><SectorIcon className="size-7 text-gold"/><h3 className="mt-14 text-xl text-forest">{name as string}</h3><p className="mt-3 text-sm text-muted-foreground">Cross-border access · Strategic partnerships · Commercial growth</p></div>})}</div></div></section>

      <section id="opportunity" className="scroll-mt-20 bg-forest py-24 text-primary-foreground lg:py-32"><div className="mx-auto max-w-[1440px] px-5 lg:px-10"><div className="grid gap-12 lg:grid-cols-[.92fr_1.08fr] lg:items-end"><div><Eyebrow dark>Strategic Partner Showcase</Eyebrow><div className="mb-5 flex items-center gap-3 text-xs uppercase text-primary-foreground/55"><Landmark className="size-4 text-gold"/> Meraki Developers × Four Pillars</div><h2 className="text-5xl leading-none lg:text-7xl">Nirvana<br/><span className="text-gold">Residences I</span></h2><p className="mt-7 max-w-lg text-base leading-7 text-primary-foreground/65">A 22-storey residential address in Me’aisem, Dubai, built around harmony, thoughtful design, and complete everyday living.</p><div className="mt-9 flex flex-wrap gap-3"><Button asChild className="h-12 rounded-none bg-gold px-6 text-forest hover:bg-gold-soft"><a href="#contact">Project inquiry <ArrowRight/></a></Button><Button asChild variant="outline" className="h-12 rounded-none border-primary-foreground/30 bg-transparent px-6 text-primary-foreground hover:bg-primary-foreground hover:text-forest"><a href={brochureAsset.url} download>Download brochure <Download/></a></Button></div></div><img src={towerAsset.url} alt="Architectural rendering of Nirvana Residences I in Me'aisem, Dubai" className="aspect-[4/3] w-full object-cover" /></div>
          <div className="mt-12 grid border-l border-t border-primary-foreground/15 sm:grid-cols-2 lg:grid-cols-4">{[["Location","Me’aisem, Dubai"],["Building","2B + G + 2P + 19F + Rooftop"],["Residences","392 homes"],["From","AED 781K · A$297K"]].map(([a,b]) => <div key={a} className="border-b border-r border-primary-foreground/15 p-6"><span className="text-[10px] uppercase text-gold">{a}</span><strong className="mt-3 block font-display text-xl font-medium">{b}</strong></div>)}</div>
        </div></section>

      <section className="bg-ivory py-20 lg:py-28"><div className="mx-auto max-w-[1280px] px-5 lg:px-10"><div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]"><div><Eyebrow>Designed Around Life</Eyebrow><h2 className="text-4xl text-forest lg:text-5xl">Complete residential harmony.</h2><div className="mt-10 grid grid-cols-3 gap-px bg-border">{[["127","Studios"],["178","1 Bedroom"],["84","2 Bedroom"]].map(([n,l]) => <div className="bg-ivory py-6 text-center" key={l}><strong className="block font-display text-3xl text-gold">{n}</strong><span className="mt-1 block text-xs text-muted-foreground">{l}</span></div>)}</div><h3 className="mt-10 text-xl text-forest">Minutes from everything</h3><div className="mt-5 grid grid-cols-2 gap-y-4 text-sm"><span><b className="text-gold">11</b> Dubai Hills Mall</span><span><b className="text-gold">14</b> Palm Jumeirah</span><span><b className="text-gold">25</b> DXB Airport</span><span><b className="text-gold">25</b> Dubai World Central</span></div></div><div className="grid grid-cols-2 gap-3"><img src={lobbyAsset.url} alt="Refined reception lobby at Nirvana Residences I" className="col-span-2 aspect-[2/1] w-full object-cover"/><img src={poolAsset.url} alt="Family pool amenity" className="aspect-[4/3] w-full object-cover"/><img src={gymAsset.url} alt="Indoor fitness centre" className="aspect-[4/3] w-full object-cover"/></div></div><div className="mt-12 flex flex-wrap gap-2">{["Rooftop clubhouse","Infinity pool","Padel court","100m running track","Co-working space","Indoor & outdoor yoga","Outdoor cinema","Family play spaces"].map(x => <span key={x} className="border border-border bg-background px-4 py-2 text-xs text-muted-foreground">{x}</span>)}</div></div></section>

      <section id="global" className="scroll-mt-20 py-24 lg:py-32"><div className="mx-auto max-w-[1280px] px-5 lg:px-10"><Eyebrow>Global Footprint</Eyebrow><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><h2 className="text-4xl leading-tight text-forest lg:text-5xl">Local context.<br/>International reach.</h2><p className="mt-6 max-w-md text-sm leading-6 text-muted-foreground">Select a region to explore how Four Pillars connects market intelligence, trusted networks, and practical execution.</p></div><div><div className="grid grid-cols-2 border border-border sm:grid-cols-4">{Object.keys(regions).map(r => <Button key={r} variant="ghost" onClick={() => setRegion(r as keyof typeof regions)} className={`h-12 rounded-none border-r border-border text-xs ${region === r ? "bg-forest text-primary-foreground hover:bg-forest hover:text-primary-foreground" : "hover:bg-muted"}`}>{r}</Button>)}</div><div className="min-h-64 border-x border-b border-border p-8 lg:p-10"><span className="text-xs font-semibold uppercase text-gold">{regions[region].label}</span><h3 className="mt-5 text-3xl text-forest">{regions[region].title}</h3><p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">{regions[region].text}</p><p className="mt-8 text-xs font-semibold uppercase text-forest">{regions[region].markets}</p></div></div></div></div></section>

      <section id="contact" className="scroll-mt-20 bg-forest py-24 text-primary-foreground lg:py-32"><div className="mx-auto grid max-w-[1280px] gap-14 px-5 lg:grid-cols-[.8fr_1.2fr] lg:px-10"><div><Eyebrow dark>Start a Conversation</Eyebrow><h2 className="text-4xl leading-tight lg:text-5xl">Your next market deserves the right entry.</h2><p className="mt-6 max-w-md text-sm leading-7 text-primary-foreground/60">Tell us where you want to go and what you want to achieve. We’ll begin with a focused conversation about the opportunity.</p><div className="mt-10 flex items-center gap-3 text-sm text-gold-soft"><ShieldCheck className="size-5"/> Confidential, considered, and commercially focused.</div></div>
        {sent ? <div className="grid min-h-[440px] place-items-center border border-primary-foreground/15 p-10 text-center"><div><span className="mx-auto grid size-14 place-items-center rounded-full border border-gold text-gold"><Check/></span><h3 className="mt-6 text-3xl">Thank you.</h3><p className="mt-3 text-sm text-primary-foreground/60">Your inquiry has been prepared. We look forward to the conversation.</p><Button variant="outline" className="mt-7 rounded-none border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-forest" onClick={() => setSent(false)}>Send another inquiry</Button></div></div> : <form noValidate onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" name="name" placeholder="Your full name" error={errors["name"]}/><Field label="Work email" name="email" type="email" placeholder="name@company.com" error={errors["email"]}/><Field label="Company" name="company" placeholder="Company or institution" error={errors["company"]}/><SelectField label="Sector" name="sector" error={errors["sector"]} options={["Education","Real Estate","Hospitality","Food & Consumer Products","Other"]}/><SelectField label="Target region" name="region" error={errors["region"]} options={Object.keys(regions)}/><div className="sm:col-span-2"><label className="mb-2 block text-xs text-primary-foreground/65" htmlFor="message">Your objective</label><textarea id="message" name="message" rows={5} maxLength={1000} placeholder="Tell us about your goals, timeline, and target market." className="w-full resize-none rounded-none border border-primary-foreground/20 bg-primary-foreground/[0.04] px-4 py-3 text-sm text-primary-foreground outline-none placeholder:text-primary-foreground/30 focus:border-gold"/><ErrorText>{errors["message"]}</ErrorText></div><Button type="submit" className="h-12 rounded-none bg-gold text-forest hover:bg-gold-soft sm:col-span-2">Submit inquiry <ArrowRight/></Button>
        </form>}</div></section>
    </main>
    <footer className="bg-ink py-14 text-primary-foreground"><div className="mx-auto max-w-[1280px] px-5 lg:px-10"><div className="flex flex-col justify-between gap-10 border-b border-primary-foreground/10 pb-12 lg:flex-row"><Brand light/><p className="max-w-sm font-display text-2xl text-primary-foreground/80">Building Bridges Across Borders</p></div><div className="flex flex-col justify-between gap-5 pt-8 text-[11px] uppercase text-primary-foreground/45 sm:flex-row"><span>© 2026 Four Pillars Business Services</span><div className="flex flex-wrap gap-5">{navItems.slice(0,6).map(([l,id]) => <a key={id} href={`#${id}`} className="hover:text-gold">{l}</a>)}</div></div></div></footer>
  </div>;
}

function ErrorText({ children }: { children: string | undefined }) { return children ? <p className="mt-1 text-xs text-gold-soft">{children}</p> : null; }
function Field({ label, name, type="text", placeholder, error }: { label:string; name:string; type?:string; placeholder:string; error: string | undefined }) { return <div><label className="mb-2 block text-xs text-primary-foreground/65" htmlFor={name}>{label}</label><input id={name} name={name} type={type} maxLength={255} placeholder={placeholder} className="h-12 w-full rounded-none border border-primary-foreground/20 bg-primary-foreground/[0.04] px-4 text-sm text-primary-foreground outline-none placeholder:text-primary-foreground/30 focus:border-gold"/><ErrorText>{error}</ErrorText></div>; }
function SelectField({ label, name, options, error }: { label:string; name:string; options:string[]; error: string | undefined }) { return <div><label className="mb-2 block text-xs text-primary-foreground/65" htmlFor={name}>{label}</label><select id={name} name={name} defaultValue="" className="h-12 w-full rounded-none border border-primary-foreground/20 bg-forest px-4 text-sm text-primary-foreground outline-none focus:border-gold"><option value="" disabled>Select one</option>{options.map(o => <option key={o} value={o}>{o}</option>)}</select><ErrorText>{error}</ErrorText></div>; }