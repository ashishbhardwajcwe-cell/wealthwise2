import { Link, NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { T, DISPLAY, BODY } from "./theme";
import { PRODUCTS, AUDIENCES, SOCIALS } from "./data";

const navLinkStyle = ({ isActive }) => ({
  padding: "8px 12px", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 600,
  color: isActive ? T.gold : T.navy, transition: "color 0.2s",
});

export const Disclaimer = ({ extra }) => (
  <div style={{ fontSize: 11, color: `${T.white}50`, lineHeight: 1.7, marginTop: 16 }}>
    <p>Auris Wealth is a brand of Auris Pvt Ltd (CIN: U70200HR2026PTC141922).</p>
    <p>The content on this site is for educational purposes only and does not constitute investment, legal, or tax advice. Investments in mutual funds, PMS, AIF, equities, cryptocurrencies, and other instruments are subject to market risks. Past performance is not indicative of future returns. Please consult a SEBI-registered investment adviser, a chartered accountant, and a tax professional in your jurisdiction before making investment decisions.</p>
    {extra && <p style={{ marginTop: 6 }}>{extra}</p>}
    <p>Auris Wealth, its directors, employees and contractors do not guarantee any returns and are not liable for any losses arising from decisions based on the content of this site.</p>
  </div>
);

export const PageMeta = ({ title, description, path }) => (
  <Helmet>
    <title>{title} | Auris Wealth</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={`${title} | Auris Wealth`} />
    <meta property="og:description" content={description} />
    <meta name="twitter:card" content="summary_large_image" />
    {path && <link rel="canonical" href={`https://auriswealth.co${path}`} />}
  </Helmet>
);

const Dropdown = ({ label, items }) => {
  const [open, setOpen] = useState(false);
  return (
    <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} style={{ position: "relative" }}>
      <button style={{ ...navLinkStyle({}), background: "transparent", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 }}>
        {label} <span style={{ fontSize: 10 }}>▾</span>
      </button>
      {open && (
        <div style={{ position: "absolute", top: "100%", left: 0, minWidth: 260, background: T.white, borderRadius: 12, boxShadow: "0 12px 32px rgba(10,22,40,0.12)", border: `1px solid ${T.gold}15`, padding: 8, zIndex: 50 }}>
          {items.map(it => (
            <Link key={it.to} to={it.to} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, fontSize: 14, color: T.navy, textDecoration: "none", transition: "background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = `${T.gold}10`}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              {it.icon && <span style={{ fontSize: 18 }}>{it.icon}</span>}
              <span style={{ fontWeight: 600 }}>{it.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const MarketingHeader = () => {
  const [mobile, setMobile] = useState(false);
  return (
    <header className="no-print" style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,253,245,0.92)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${T.gold}15` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <img src="/auris-logo.png" alt="Auris" style={{ height: 40 }} />
          <span style={{ fontFamily: DISPLAY, fontSize: 20, fontWeight: 700, color: T.navy }}>Auris<span style={{ color: T.gold }}>Wealth</span></span>
        </Link>
        <nav className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Dropdown label="Investment Products" items={PRODUCTS.map(p => ({ to: `/investment-products/${p.slug}`, label: p.name, icon: p.icon }))} />
          <Dropdown label="For" items={AUDIENCES.map(a => ({ to: `/for/${a.slug}`, label: a.name, icon: a.icon }))} />
          <NavLink to="/ai-wealth-planner" style={navLinkStyle}>AI Planner</NavLink>
          <NavLink to="/wealthwise" style={navLinkStyle}>WealthWise</NavLink>
          <NavLink to="/blog" style={navLinkStyle}>Blog</NavLink>
          <NavLink to="/pricing" style={navLinkStyle}>Pricing</NavLink>
          <NavLink to="/about" style={navLinkStyle}>About</NavLink>
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link to="/app" style={{ padding: "8px 14px", borderRadius: 10, fontSize: 13, fontWeight: 700, background: T.white, color: T.navy, border: `1.5px solid ${T.gold}40`, textDecoration: "none" }}>Open the App</Link>
          <Link to="/ai-wealth-planner" style={{ padding: "10px 20px", borderRadius: 10, fontSize: 13, fontWeight: 700, background: `linear-gradient(135deg, ${T.gold}, ${T.goldLight})`, color: T.navy, textDecoration: "none", boxShadow: `0 4px 16px ${T.gold}30` }}>Try the AI Planner</Link>
          <button onClick={() => setMobile(!mobile)} className="show-mobile" style={{ background: "transparent", border: `1px solid ${T.silver}50`, borderRadius: 8, padding: "6px 10px", cursor: "pointer", color: T.navy }}>☰</button>
        </div>
      </div>
      {mobile && (
        <div className="show-mobile" style={{ borderTop: `1px solid ${T.silver}30`, padding: "12px 24px", display: "flex", flexDirection: "column", gap: 6, background: T.cream }}>
          {[{ to: "/", l: "Home" }, { to: "/wealthwise", l: "WealthWise" }, { to: "/ai-wealth-planner", l: "AI Planner" },
            { to: "/blog", l: "Blog" }, { to: "/pricing", l: "Pricing" }, { to: "/about", l: "About" }, { to: "/contact", l: "Contact" },
            { to: "/resources", l: "Resources" }, { to: "/app", l: "Open the App" }].map(x =>
            <Link key={x.to} to={x.to} onClick={() => setMobile(false)} style={{ padding: "10px 12px", color: T.navy, fontWeight: 600, textDecoration: "none", borderRadius: 8 }}>{x.l}</Link>)}
        </div>
      )}
    </header>
  );
};

const MarketingFooter = () => (
  <footer className="no-print" style={{ background: T.navy, color: T.white, marginTop: 64 }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px 24px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <img src="/auris-logo.png" alt="Auris" style={{ height: 36 }} />
            <span style={{ fontFamily: DISPLAY, fontSize: 18, fontWeight: 700, color: T.white }}>Auris<span style={{ color: T.gold }}>Wealth</span></span>
          </div>
          <p style={{ fontSize: 13, color: `${T.white}80`, lineHeight: 1.7 }}>AI-powered wealth planning for professionals, families and officers who want clarity.</p>
        </div>
        {[
          { h: "Products", links: PRODUCTS.slice(0, 6).map(p => ({ to: `/investment-products/${p.slug}`, l: p.name })) },
          { h: "For", links: AUDIENCES.map(a => ({ to: `/for/${a.slug}`, l: a.name })) },
          { h: "Resources", links: [{ to: "/resources/calculators", l: "Calculators" }, { to: "/resources/glossary", l: "Glossary" }, { to: "/resources/downloads", l: "Free Downloads" }, { to: "/blog", l: "Blog" }] },
          { h: "Company", links: [{ to: "/about", l: "About" }, { to: "/contact", l: "Contact" }, { to: "/pricing", l: "Pricing" }, { to: "/wealthwise", l: "WealthWise" }] },
          { h: "Legal", links: [{ to: "/legal/privacy", l: "Privacy" }, { to: "/legal/terms", l: "Terms" }, { to: "/legal/disclaimers", l: "Disclaimers" }, { to: "/legal/sebi-compliance", l: "SEBI Compliance" }, { to: "/legal/grievance-redressal", l: "Grievance Redressal" }] },
        ].map(col => (
          <div key={col.h}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.gold, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>{col.h}</div>
            {col.links.map(l => <Link key={l.to} to={l.to} style={{ display: "block", padding: "4px 0", fontSize: 13, color: `${T.white}80`, textDecoration: "none" }}>{l.l}</Link>)}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14, marginTop: 36, paddingTop: 20, borderTop: `1px solid ${T.white}10` }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {SOCIALS.map(s => <a key={s.name} href={s.href} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: `${T.white}60`, textDecoration: "none" }}>{s.name}</a>)}
        </div>
        <div style={{ fontSize: 12, color: `${T.white}50` }}>© 2026 Auris Pvt Ltd · CIN U70200HR2026PTC141922 · Not SEBI registered (RIA pending)</div>
      </div>
      <Disclaimer />
    </div>
  </footer>
);

export const NewsletterSignup = ({ compact }) => {
  const [email, setEmail] = useState(""); const [done, setDone] = useState(false);
  const submit = (e) => { e.preventDefault(); if (email.includes("@")) setDone(true); };
  if (done) return <div style={{ padding: 16, borderRadius: 12, background: `${T.emerald}10`, color: T.emerald, fontWeight: 600, fontSize: 14 }}>✓ Subscribed — check your inbox for a confirmation.</div>;
  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 8, flexWrap: compact ? "nowrap" : "wrap" }}>
      <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
        style={{ flex: 1, minWidth: 200, padding: "10px 14px", borderRadius: 10, border: `1.5px solid ${T.silver}40`, fontSize: 14, color: T.navy, fontFamily: BODY }} />
      <button type="submit" style={{ padding: "10px 20px", borderRadius: 10, background: `linear-gradient(135deg, ${T.gold}, ${T.goldLight})`, color: T.navy, fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" }}>Subscribe</button>
    </form>
  );
};

const ResponsiveCSS = () => (
  <style>{`
    @media (max-width: 880px) {
      .hide-mobile { display: none !important; }
      .show-mobile { display: inline-block !important; }
    }
    @media (min-width: 881px) {
      .show-mobile { display: none !important; }
    }
  `}</style>
);

export default function MarketingLayout() {
  return (
    <div style={{ minHeight: "100vh", background: T.cream, fontFamily: BODY, color: T.navy }}>
      <ResponsiveCSS />
      <MarketingHeader />
      <main><Outlet /></main>
      <MarketingFooter />
    </div>
  );
}
