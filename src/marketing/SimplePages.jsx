import { useParams, Link, Navigate } from "react-router-dom";
import { T, DISPLAY } from "./theme";
import { AUDIENCES, BLOG_POSTS } from "./data";
import { PageMeta, NewsletterSignup } from "./Layout";

const Container = ({ children, max = 880 }) => (
  <div style={{ maxWidth: max, margin: "0 auto", padding: "48px 24px 24px" }}>{children}</div>
);
const PageHero = ({ kicker, title, lead }) => (
  <section style={{ background: `linear-gradient(180deg, ${T.parchment}, ${T.cream})`, padding: "56px 24px 32px" }}>
    <div style={{ maxWidth: 880, margin: "0 auto", textAlign: "center" }}>
      {kicker && <div style={{ fontSize: 12, fontWeight: 700, color: T.gold, letterSpacing: "0.08em", textTransform: "uppercase" }}>{kicker}</div>}
      <h1 style={{ fontFamily: DISPLAY, fontSize: "clamp(30px,5vw,46px)", fontWeight: 700, color: T.navy, marginTop: 10, lineHeight: 1.15 }}>{title}</h1>
      {lead && <p style={{ fontSize: 17, color: T.slate, lineHeight: 1.6, marginTop: 14 }}>{lead}</p>}
    </div>
  </section>
);

// ────────── WealthWise (product page selling the app) ──────────
export function WealthWise() {
  return (
    <>
      <PageMeta title="WealthWise — the wealth platform that thinks alongside you" description="See everything you own. Know what to do next. Plan for any future. The WealthWise app — AI-powered wealth management for Indian investors and global Indians." path="/wealthwise" />
      <PageHero kicker="The product" title="The wealth platform that thinks alongside you" lead="See everything you own. Know what you should do next. Plan for any future." />
      <Container max={1080}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 20, marginBottom: 48 }}>
          {[
            { icon: "🗂️", title: "See everything you own", desc: "MFs, stocks, PMS, AIF, unlisted, crypto, real estate, gold — one portfolio aggregator with drill-down to fund, sector and geography." },
            { icon: "🧠", title: "Know what to do next", desc: "AI Wealth Planner + tax-loss/gain harvesting engine + on-track/off-track goal traffic-lights + your Freedom Number." },
            { icon: "🎯", title: "Plan for any future", desc: "Multi-scenario retirement, sectioned guided plan, debt payoff calculator, customisable PDF you can share with your CA." },
          ].map(b => (
            <div key={b.title} style={{ background: T.white, borderRadius: 16, padding: 28, border: `1px solid ${T.silver}30` }}>
              <div style={{ fontSize: 32 }}>{b.icon}</div>
              <h3 style={{ fontFamily: DISPLAY, fontSize: 20, fontWeight: 700, color: T.navy, marginTop: 10 }}>{b.title}</h3>
              <p style={{ fontSize: 14, color: T.slate, lineHeight: 1.65, marginTop: 8 }}>{b.desc}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontFamily: DISPLAY, fontSize: 30, fontWeight: 700, color: T.navy, marginBottom: 16 }}>How it compares</h2>
        <div style={{ overflowX: "auto", marginBottom: 48 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", background: T.white, borderRadius: 12, overflow: "hidden", fontSize: 14 }}>
            <thead><tr style={{ background: T.navy, color: T.white }}>
              <th style={{ padding: 14, textAlign: "left" }}>Feature</th><th style={{ padding: 14 }}>Excel</th><th style={{ padding: 14 }}>Traditional adviser</th><th style={{ padding: 14 }}>Generic apps</th><th style={{ padding: 14, color: T.goldLight }}>WealthWise</th>
            </tr></thead>
            <tbody>
              {[
                ["Plan in minutes", "✗", "Weeks", "Partial", "✓"],
                ["Tax-loss harvesting", "✗", "Sometimes", "✗", "✓"],
                ["Defence-officer modules", "✗", "Rare", "✗", "✓"],
                ["Customisable PDF", "✗", "✓", "Limited", "✓"],
                ["Continuous updates", "✗", "Annual", "Limited", "✓"],
                ["Cost", "Time", "₹50K–₹2L/yr", "Cheap or free", "₹0–₹9,999/yr"],
              ].map((r, i) => (
                <tr key={i} style={{ borderTop: `1px solid ${T.silver}25` }}>
                  {r.map((c, j) => <td key={j} style={{ padding: 12, color: j === 4 ? T.navy : T.slate, fontWeight: j === 4 ? 700 : 400 }}>{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: T.parchment, borderRadius: 18, padding: 32 }}>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 26, fontWeight: 700, color: T.navy }}>A note from Ashish</h2>
          <p style={{ color: T.slate, lineHeight: 1.75, fontSize: 15, marginTop: 10 }}>I built WealthWise because the planning tools I needed for myself didn't exist. The big names sell products; the small advisers don't scale. AI changes the math — a Claude-powered planner can give individualised analysis that used to take a senior planner two weeks. That's the product.</p>
          <p style={{ color: T.slate, lineHeight: 1.75, fontSize: 15, marginTop: 12 }}>It's not magic. It's structured calculation, transparent assumptions, and a refusal to recommend any specific security until we hold an RIA licence. You'll always know what you're looking at and why.</p>
          <Link to="/app" style={{ display: "inline-block", marginTop: 18, padding: "14px 28px", borderRadius: 12, background: T.navy, color: T.white, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>Start your 14-day free trial →</Link>
        </div>
      </Container>
    </>
  );
}

// ────────── Audience landing pages (4) ──────────
export function Audience() {
  const { audience } = useParams();
  const a = AUDIENCES.find(x => x.slug === audience);
  if (!a) return <Navigate to="/" replace />;
  return (
    <>
      <PageMeta title={a.name} description={a.headline} path={`/for/${a.slug}`} />
      <PageHero kicker={a.name} title={a.headline} lead={a.intro} />
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: 16, marginBottom: 36 }}>
          {a.points.map(([h, d]) => (
            <div key={h} style={{ background: T.white, borderRadius: 14, padding: 20, border: `1px solid ${T.silver}30` }}>
              <div style={{ fontFamily: DISPLAY, fontSize: 17, fontWeight: 700, color: T.navy }}>{h}</div>
              <p style={{ fontSize: 14, color: T.slate, lineHeight: 1.6, marginTop: 6 }}>{d}</p>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link to="/ai-wealth-planner" style={btnGold}>{a.cta} →</Link>
          <a href="https://topmate.io/auris8/" target="_blank" rel="noreferrer" style={btnGhost}>Talk to Ashish</a>
        </div>
      </Container>
    </>
  );
}

// ────────── About ──────────
export function About() {
  return (
    <>
      <PageMeta title="About — Auris Cashflow" description="Founded by Col (Retd.) Ashish Bhardwaj. Built for professionals, families and military officers who want clarity in their financial planning." path="/about" />
      <PageHero kicker="About us" title="Mission planning, applied to your money." lead="Auris Cashflow is a wealth advisory practice built on military precision and modern AI. We help Indian HNIs, defence officers, NRIs and salaried professionals build wealth plans that actually hold up under pressure." />
      <Container>
        <h2 style={H2}>Founder</h2>
        <p style={P}>Col (Retd.) Ashish Bhardwaj spent over two decades in the Indian Army. He started Auris Cashflow so the same precision that went into mission planning could go into civilian financial planning — especially for fellow officers transitioning out, for HNIs who deserve better than commission-led advice, and for professionals who don't have time to figure it all out.</p>
        <h2 style={H2}>Team</h2>
        <p style={P}>Co-founder Diganta Das leads product and engineering. The advisory bench includes a NISM-certified planner and a chartered accountant in consulting capacity. We're hiring carefully — the team will grow as the practice does.</p>
        <h2 style={H2}>Mission</h2>
        <p style={P}>To make rigorous, individualised financial planning accessible to every serious Indian investor — at the depth of an Equentis-style plan, delivered by AI-augmented software at a fraction of the cost, continuously updated rather than reviewed once a year.</p>
        <h2 style={H2}>Company facts</h2>
        <ul style={UL}>
          <li><strong>Legal entity:</strong> Auris Pvt Ltd</li>
          <li><strong>CIN:</strong> U70200HR2026PTC141922</li>
          <li><strong>Registered office:</strong> Gurugram, Haryana, India</li>
          <li><strong>Contact:</strong> hello@auriscashflow.com</li>
          <li><strong>Regulatory:</strong> NISM-certified; AMFI ARN and SEBI RIA registrations pending.</li>
        </ul>
      </Container>
    </>
  );
}

// ────────── Contact ──────────
export function Contact() {
  return (
    <>
      <PageMeta title="Contact Auris Cashflow" description="Book a call with Col Ashish on Topmate, or send a message via the contact form. Email hello@auriscashflow.com." path="/contact" />
      <PageHero kicker="Contact" title="Talk to us" lead="Book a 30-minute call with Col Ashish on Topmate, or send a message and we'll respond within one business day." />
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 24 }}>
          <div style={{ background: T.white, borderRadius: 16, padding: 24, border: `1px solid ${T.silver}30` }}>
            <h2 style={{ fontFamily: DISPLAY, fontSize: 22, fontWeight: 700, color: T.navy }}>Book on Topmate</h2>
            <p style={{ fontSize: 14, color: T.slate, marginTop: 8, lineHeight: 1.65 }}>30-minute paid consultation — the highest-quality way to get tailored input.</p>
            <a href="https://topmate.io/auris8/" target="_blank" rel="noreferrer" style={{ ...btnGold, display: "inline-block", marginTop: 12, textDecoration: "none" }}>Book a session →</a>
          </div>
          <div style={{ background: T.white, borderRadius: 16, padding: 24, border: `1px solid ${T.silver}30` }}>
            <h2 style={{ fontFamily: DISPLAY, fontSize: 22, fontWeight: 700, color: T.navy }}>Or message us</h2>
            <form name="contact" method="POST" data-netlify="true" style={{ marginTop: 12 }}>
              <input type="hidden" name="form-name" value="contact" />
              {["Name", "Email", "Phone (optional)"].map(l => (
                <input key={l} name={l.toLowerCase()} placeholder={l} required={l !== "Phone (optional)"} style={inp} />
              ))}
              <select name="topic" style={inp}>
                <option>What are you looking for?</option>
                <option>Personal financial plan</option><option>HNI advisory</option><option>Defence-officer planning</option><option>NRI advisory</option><option>Press / partnership</option><option>Other</option>
              </select>
              <textarea name="message" placeholder="Your message" rows={4} required style={{ ...inp, fontFamily: "inherit", resize: "vertical" }} />
              <button type="submit" style={{ ...btnGold, width: "100%", marginTop: 4 }}>Send message</button>
            </form>
          </div>
        </div>
        <div style={{ marginTop: 32, padding: 24, borderRadius: 14, background: T.parchment, fontSize: 14, color: T.slate, lineHeight: 1.75 }}>
          📧 hello@auriscashflow.com · 🏢 Gurugram, Haryana, India · 💼 WhatsApp / LinkedIn via links in the footer.
        </div>
      </Container>
    </>
  );
}

// ────────── Pricing ──────────
const TIERS = [
  { name: "Free", price: "₹0", per: "forever", desc: "Get started — basic planning + dashboard.", features: ["Portfolio dashboard", "Basic SWOT", "1 wealth plan per year", "Guided Plan tab"], cta: "Use the app", to: "/app" },
  { name: "Premium", price: "₹999", per: "per month", yearly: "₹9,999/year", desc: "Unlimited plans + harvesting + alerts.", features: ["Unlimited wealth plans", "Tax-harvesting alerts", "All asset modules", "Drill-down allocation", "Customisable PDF"], cta: "Start 14-day trial", to: "/app", featured: true },
  { name: "HNI", price: "₹49,999", per: "per year", desc: "Premium + quarterly review call + custom PMS/AIF.", features: ["Everything in Premium", "Quarterly advisory call with Ashish", "Custom PMS / AIF allocation", "Priority support"], cta: "Book a call", to: "/contact" },
  { name: "Enterprise", price: "Custom", per: "talk to us", desc: "Defence units, corporates, family offices.", features: ["Premium for groups", "White-labelled reports", "Bulk onboarding", "Dedicated success"], cta: "Get a quote", to: "/contact" },
];
export function Pricing() {
  return (
    <>
      <PageMeta title="Pricing — WealthWise" description="Free, Premium (₹999/mo or ₹9,999/yr), HNI (₹49,999/yr), Enterprise. Transparent pricing with a 14-day premium trial." path="/pricing" />
      <PageHero kicker="Pricing" title="Plain, fair pricing" lead="Start free. Upgrade when you need it. Cancel any time." />
      <Container max={1100}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 16 }}>
          {TIERS.map(t => (
            <div key={t.name} style={{ position: "relative", background: t.featured ? `linear-gradient(180deg, ${T.navy}, ${T.ocean})` : T.white, color: t.featured ? T.white : T.navy, borderRadius: 18, padding: 28, border: `1px solid ${t.featured ? T.gold : T.silver + "30"}`, boxShadow: t.featured ? `0 16px 40px ${T.navy}30` : "0 2px 12px rgba(0,0,0,0.04)" }}>
              {t.featured && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", padding: "4px 14px", borderRadius: 20, background: `linear-gradient(135deg, ${T.gold}, ${T.goldLight})`, color: T.navy, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Most popular</div>}
              <div style={{ fontFamily: DISPLAY, fontSize: 22, fontWeight: 700 }}>{t.name}</div>
              <div style={{ marginTop: 8 }}>
                <span style={{ fontFamily: DISPLAY, fontSize: 32, fontWeight: 700 }}>{t.price}</span>
                <span style={{ fontSize: 13, opacity: 0.7, marginLeft: 6 }}>{t.per}</span>
              </div>
              {t.yearly && <div style={{ fontSize: 12, color: t.featured ? T.goldLight : T.gold, marginTop: 2 }}>or {t.yearly}</div>}
              <p style={{ fontSize: 13.5, marginTop: 10, opacity: 0.85, lineHeight: 1.55 }}>{t.desc}</p>
              <ul style={{ listStyle: "none", padding: 0, marginTop: 16 }}>
                {t.features.map(f => <li key={f} style={{ fontSize: 14, padding: "5px 0", display: "flex", gap: 8 }}><span style={{ color: t.featured ? T.goldLight : T.emerald }}>✓</span>{f}</li>)}
              </ul>
              <Link to={t.to} style={{ display: "block", textAlign: "center", marginTop: 20, padding: "12px", borderRadius: 10, background: t.featured ? `linear-gradient(135deg, ${T.gold}, ${T.goldLight})` : T.navy, color: t.featured ? T.navy : T.white, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>{t.cta}</Link>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: T.steel, textAlign: "center", marginTop: 24, lineHeight: 1.7 }}>All prices in INR. Free tier limits enforced server-side. Premium charges via Razorpay; HNI/Enterprise invoiced directly. 14-day Premium trial included on signup — no card required.</p>
      </Container>
    </>
  );
}

// ────────── Legal (5 pages, content-driven) ──────────
const LEGAL_PAGES = {
  privacy: {
    title: "Privacy Policy", lead: "How we collect, use and protect your information — under India's DPDP Act 2023.",
    body: [
      ["What we collect", "Information you provide directly: name, email, phone, financial inputs used to generate your plan. Information collected automatically: pages visited, device and IP for analytics. Cookies for session continuity and analytics (with your consent under DPDP)."],
      ["Why we collect it", "To deliver the requested service (the AI Wealth Planner, the WealthWise app), to communicate with you, and to improve our offering. We do not sell personal data to third parties."],
      ["AI processing", "When you use the AI Wealth Planner, inputs are processed via Anthropic's Claude API. Personally identifying information is stripped before any API call. Anonymised inputs may be retained for service quality."],
      ["Your rights under DPDP", "You can access, correct, withdraw consent, or request erasure of your personal data at any time by emailing hello@auriscashflow.com."],
      ["Retention", "We retain data only as long as needed for the stated purpose and applicable law."],
      ["Contact", "Data Protection Officer: hello@auriscashflow.com."],
    ],
  },
  terms: {
    title: "Terms of Service", lead: "The rules of the road for using auriscashflow.com and the WealthWise app.",
    body: [
      ["Acceptance", "By using this site you agree to these terms. If you don't agree, please don't use the service."],
      ["Educational use only", "Content on this site and in the WealthWise app is for educational and planning purposes. It is not personalised investment advice. Consult a SEBI-registered adviser before acting."],
      ["No guarantees", "All projections rely on assumptions. Past performance does not guarantee future returns. Investments are subject to market risks."],
      ["Account & subscription", "You're responsible for accurate inputs and account security. Subscriptions auto-renew unless cancelled."],
      ["Limitation of liability", "Auris Pvt Ltd and its team are not liable for losses arising from decisions taken based on this service."],
      ["Governing law", "These terms are governed by the laws of India; disputes are subject to Gurugram jurisdiction."],
    ],
  },
  disclaimers: {
    title: "Investment Disclaimers", lead: "The detailed legal and regulatory disclaimers that apply to every page on this site.",
    body: [
      ["Not investment advice", "Auris Cashflow is not a SEBI-registered investment adviser at the time of writing. Content is educational only."],
      ["Market risk", "All investments — equity, debt, real estate, crypto, AIF, PMS, unlisted — are subject to market risk. You may lose part or all of your invested capital."],
      ["Tax disclaimer", "Tax laws change. The tax treatment described on this site reflects our understanding as of the date of writing; consult a chartered accountant for your specific case."],
      ["Third-party platforms", "We may reference third-party platforms (UnlistedArena, CoinDCX, Razorpay, etc.). We do not endorse, and bear no responsibility for, the services of these platforms."],
      ["Forward-looking statements", "Any forward-looking projections (corpus at retirement, Freedom Number, etc.) depend on assumptions about returns, inflation and contributions. They will differ from actual outcomes."],
    ],
  },
  "sebi-compliance": {
    title: "SEBI Compliance", lead: "Our regulatory posture and the disclosures we will provide when our SEBI RIA registration is active.",
    body: [
      ["Current status", "We have applied for SEBI Registered Investment Adviser registration. Until granted, we provide only educational content and planning tools — no personalised investment advice and no specific security recommendations."],
      ["Conflicts of interest", "We do not earn commissions from any product distributor. The WealthWise app is the only paid service we offer."],
      ["Suitability", "Once RIA-registered, every recommendation will be preceded by a risk-profiling questionnaire and assessment of suitability."],
      ["Disclosure", "We will publish RIA registration number, fees structure, grievance redressal mechanism and complaints data on grant of registration."],
      ["Updates", "This page will be updated promptly upon any change in regulatory status."],
    ],
  },
  "grievance-redressal": {
    title: "Grievance Redressal", lead: "How to raise a concern with Auris Cashflow — and what happens next.",
    body: [
      ["Step 1 — Direct to us", "Email grievance@auriscashflow.com or hello@auriscashflow.com with a description of the issue. We acknowledge within 24 hours and aim to resolve within 7 working days."],
      ["Step 2 — Senior escalation", "If unresolved, escalate to the Compliance Officer at the same email with subject line 'Compliance Escalation'."],
      ["Step 3 — SEBI SCORES", "If still unresolved, once we are SEBI RIA-registered, file a complaint via the SEBI SCORES platform at scores.sebi.gov.in."],
      ["Records", "We maintain a register of grievances and resolutions, available for regulatory inspection."],
    ],
  },
};
export function Legal() {
  const { page } = useParams();
  const data = LEGAL_PAGES[page];
  if (!data) return <Navigate to="/legal/privacy" replace />;
  return (
    <>
      <PageMeta title={data.title} description={data.lead} path={`/legal/${page}`} />
      <PageHero kicker="Legal" title={data.title} lead={data.lead} />
      <Container>
        {data.body.map(([h, p]) => (
          <div key={h} style={{ marginBottom: 28 }}>
            <h2 style={H2}>{h}</h2>
            <p style={P}>{p}</p>
          </div>
        ))}
        <p style={{ fontSize: 12, color: T.steel, fontStyle: "italic", marginTop: 24 }}>This page is a template drafted in plain language. Final legal text is subject to review by a qualified lawyer / CA before reliance.</p>
      </Container>
    </>
  );
}

// shared
const H2 = { fontFamily: DISPLAY, fontSize: 24, fontWeight: 700, color: T.navy, marginBottom: 10 };
const P = { color: T.slate, fontSize: 15.5, lineHeight: 1.75 };
const UL = { color: T.slate, fontSize: 15, lineHeight: 1.9, paddingLeft: 20 };
const inp = { width: "100%", padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${T.silver}40`, fontSize: 14, color: T.navy, marginBottom: 10, fontFamily: "inherit" };
const btnGold = { padding: "12px 24px", borderRadius: 10, background: `linear-gradient(135deg, ${T.gold}, ${T.goldLight})`, color: T.navy, fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer", textDecoration: "none", display: "inline-block" };
const btnGhost = { padding: "12px 22px", borderRadius: 10, background: T.white, color: T.slate, fontWeight: 600, fontSize: 14, border: `1.5px solid ${T.silver}40`, cursor: "pointer", textDecoration: "none", display: "inline-block" };

// Unused stub — keeps imports lean
export const _newsletterRef = NewsletterSignup;
