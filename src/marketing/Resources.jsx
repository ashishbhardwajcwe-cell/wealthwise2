import { useParams, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { T, DISPLAY, BODY, fmtINR } from "./theme";
import { CALCULATORS, GLOSSARY, DOWNLOADS } from "./data";
import { PageMeta, NewsletterSignup } from "./Layout";

const Hero = ({ kicker, title, lead }) => (
  <section style={{ background: `linear-gradient(180deg, ${T.parchment}, ${T.cream})`, padding: "56px 24px 32px" }}>
    <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: T.gold, letterSpacing: "0.08em", textTransform: "uppercase" }}>{kicker}</div>
      <h1 style={{ fontFamily: DISPLAY, fontSize: "clamp(30px,5vw,44px)", fontWeight: 700, color: T.navy, marginTop: 10, lineHeight: 1.15 }}>{title}</h1>
      {lead && <p style={{ fontSize: 16, color: T.slate, marginTop: 14, lineHeight: 1.6 }}>{lead}</p>}
    </div>
  </section>
);

export function ResourcesHub() {
  return (
    <>
      <PageMeta title="Resources — Auris Wealth" description="Free calculators, a finance glossary, and downloadable PDFs to help you think clearly about wealth." path="/resources" />
      <Hero kicker="Resources" title="Free tools to think clearly" lead="Calculators, a finance glossary and downloadable PDFs — built so you make better decisions today." />
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: 18 }}>
          {[
            { to: "/resources/calculators", icon: "🧮", title: "Calculators", desc: "SIP, lumpsum, retirement, FIRE, tax harvest, NRI tax, EMI." },
            { to: "/resources/glossary", icon: "📖", title: "Finance Glossary", desc: "Plain-English definitions of 35+ Indian finance terms." },
            { to: "/resources/downloads", icon: "📥", title: "Free Downloads", desc: "PDF cheat-sheets for professionals, defence officers, NRIs and HNIs." },
          ].map(c => (
            <Link key={c.to} to={c.to} style={{ textDecoration: "none", background: T.white, borderRadius: 16, padding: 28, border: `1px solid ${T.silver}30`, display: "block" }}>
              <div style={{ fontSize: 32 }}>{c.icon}</div>
              <h3 style={{ fontFamily: DISPLAY, fontSize: 20, fontWeight: 700, color: T.navy, marginTop: 10 }}>{c.title}</h3>
              <p style={{ fontSize: 14, color: T.slate, marginTop: 8, lineHeight: 1.55 }}>{c.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export function CalculatorsIndex() {
  return (
    <>
      <PageMeta title="Calculators — Free wealth-planning tools" description="Free SIP, lumpsum, retirement corpus, FIRE, tax-harvest, NRI tax and EMI calculators — built for Indian investors." path="/resources/calculators" />
      <Hero kicker="Calculators" title="Free wealth-planning calculators" lead="Quick, transparent maths — with the formulas exposed so you trust the answer." />
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 14 }}>
          {CALCULATORS.map(c => (
            <Link key={c.slug} to={`/resources/calculators/${c.slug}`} style={{ textDecoration: "none", background: T.white, borderRadius: 14, padding: 22, border: `1px solid ${T.silver}30`, display: "block" }}>
              <div style={{ fontSize: 28 }}>{c.icon}</div>
              <div style={{ fontFamily: DISPLAY, fontSize: 17, fontWeight: 700, color: T.navy, marginTop: 8 }}>{c.name}</div>
              <p style={{ fontSize: 13, color: T.slate, marginTop: 6, lineHeight: 1.55 }}>{c.desc}</p>
              <div style={{ marginTop: 12, fontSize: 12, color: T.gold, fontWeight: 700 }}>Open →</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

// SIP calculator (working). Others share the same shell with a "coming soon" body.
function SIPCalculator() {
  const [m, setM] = useState(20000);
  const [y, setY] = useState(20);
  const [r, setR] = useState(12);
  const rm = r / 100 / 12; const n = y * 12;
  const fv = rm === 0 ? m * n : m * ((Math.pow(1 + rm, n) - 1) / rm) * (1 + rm);
  const invested = m * n; const gain = fv - invested;
  const data = []; let bal = 0;
  for (let i = 1; i <= n; i++) { bal = (bal + m) * (1 + rm); if (i % 12 === 0) data.push({ year: i / 12, value: Math.round(bal), invested: Math.round(m * i) }); }
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 24 }}>
      <div>
        <SliderLabel label="Monthly SIP" value={fmtINR(m)} />
        <input type="range" min="500" max="200000" step="500" value={m} onChange={e => setM(Number(e.target.value))} style={{ width: "100%", accentColor: T.gold }} />
        <SliderLabel label="Years invested" value={`${y} years`} />
        <input type="range" min="1" max="40" value={y} onChange={e => setY(Number(e.target.value))} style={{ width: "100%", accentColor: T.gold }} />
        <SliderLabel label="Expected return (assumption)" value={`${r}% p.a.`} />
        <input type="range" min="4" max="18" step="0.5" value={r} onChange={e => setR(Number(e.target.value))} style={{ width: "100%", accentColor: T.gold }} />
        <div style={{ marginTop: 24, padding: 18, borderRadius: 12, background: `linear-gradient(135deg, ${T.navy}, ${T.ocean})`, color: T.white }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.goldLight, letterSpacing: "0.08em", textTransform: "uppercase" }}>Maturity value</div>
          <div style={{ fontFamily: DISPLAY, fontSize: 36, fontWeight: 700, marginTop: 4 }}>{fmtINR(fv)}</div>
          <div style={{ fontSize: 13, color: `${T.white}80`, marginTop: 4 }}>Invested: {fmtINR(invested)} · Gains: {fmtINR(gain)}</div>
        </div>
      </div>
      <div style={{ background: T.white, borderRadius: 14, padding: 18, border: `1px solid ${T.silver}30` }}>
        <div style={{ fontWeight: 700, color: T.navy, marginBottom: 10 }}>Year-by-year growth</div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={`${T.silver}40`} />
            <XAxis dataKey="year" tick={{ fontSize: 11 }} />
            <YAxis tickFormatter={v => fmtINR(v)} tick={{ fontSize: 10 }} width={70} />
            <Tooltip formatter={v => fmtINR(v)} />
            <Area type="monotone" dataKey="invested" stroke={T.steel} fill={`${T.steel}22`} name="Invested" />
            <Area type="monotone" dataKey="value" stroke={T.gold} strokeWidth={2} fill={`${T.gold}33`} name="Portfolio value" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
const SliderLabel = ({ label, value }) => (
  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 18, marginBottom: 6 }}>
    <span style={{ fontSize: 13, fontWeight: 600, color: T.slate, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</span>
    <span style={{ fontSize: 15, fontWeight: 700, color: T.navy, fontFamily: DISPLAY }}>{value}</span>
  </div>
);

export function CalculatorPage() {
  const { calc } = useParams();
  const meta = CALCULATORS.find(c => c.slug === calc);
  if (!meta) return <Navigate to="/resources/calculators" replace />;
  return (
    <>
      <PageMeta title={meta.name} description={meta.desc} path={`/resources/calculators/${calc}`} />
      <Hero kicker="Calculator" title={meta.name} lead={meta.desc} />
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px" }}>
        {calc === "sip"
          ? <SIPCalculator />
          : <div style={{ background: T.white, borderRadius: 14, padding: 32, border: `1px solid ${T.silver}30`, textAlign: "center" }}>
              <div style={{ fontSize: 36 }}>{meta.icon}</div>
              <h2 style={{ fontFamily: DISPLAY, fontSize: 22, fontWeight: 700, color: T.navy, marginTop: 10 }}>Coming soon</h2>
              <p style={{ fontSize: 14, color: T.slate, marginTop: 8, maxWidth: 480, margin: "8px auto 16px" }}>The {meta.name} ships in the next release. For now, the AI Wealth Planner covers this calculation as part of a full snapshot.</p>
              <Link to="/ai-wealth-planner" style={{ display: "inline-block", padding: "12px 24px", borderRadius: 10, background: `linear-gradient(135deg, ${T.gold}, ${T.goldLight})`, color: T.navy, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>Use the AI Planner →</Link>
            </div>}
        <p style={{ fontSize: 11, color: T.steel, marginTop: 18, fontStyle: "italic", lineHeight: 1.6 }}>Educational tool. Assumed returns are long-run averages, not guarantees. Tax and inflation are not modelled in this simplified calculator — use the AI Wealth Planner for an integrated view.</p>
      </div>
    </>
  );
}

export function Glossary() {
  const [q, setQ] = useState("");
  const filtered = GLOSSARY.filter(([k, v]) => !q || k.toLowerCase().includes(q.toLowerCase()) || v.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <PageMeta title="Finance Glossary — Auris Wealth" description="Plain-English definitions of 35+ Indian and global finance terms — AIF, PMS, ELSS, LTCG, DTAA, OROP and more." path="/resources/glossary" />
      <Hero kicker="Glossary" title="Finance, in plain English" lead="35+ Indian and global finance terms — written so a smart friend, not a textbook, would explain them." />
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "32px 24px" }}>
        <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Search (e.g. PMS, LTCG, NPS)…"
          style={{ width: "100%", padding: "14px 18px", borderRadius: 12, border: `1.5px solid ${T.silver}40`, fontSize: 15, marginBottom: 24, fontFamily: BODY, color: T.navy }} />
        <div style={{ display: "grid", gap: 10 }}>
          {filtered.map(([k, v]) => (
            <div key={k} style={{ background: T.white, borderRadius: 12, padding: 18, border: `1px solid ${T.silver}30`, borderLeft: `4px solid ${T.gold}` }}>
              <div style={{ fontFamily: DISPLAY, fontSize: 18, fontWeight: 700, color: T.navy }}>{k}</div>
              <p style={{ fontSize: 14, color: T.slate, marginTop: 6, lineHeight: 1.65 }}>{v}</p>
            </div>
          ))}
          {filtered.length === 0 && <p style={{ color: T.steel, textAlign: "center", padding: 20 }}>No matches.</p>}
        </div>
      </div>
    </>
  );
}

export function Downloads() {
  return (
    <>
      <PageMeta title="Free Downloads — Auris Wealth" description="Free PDF cheat-sheets for professionals, defence officers, NRIs and HNIs. Sign up to receive any of them." path="/resources/downloads" />
      <Hero kicker="Free downloads" title="Cheat-sheets that earn their keep" lead="Short, useful PDFs you can read in 15 minutes and apply this week." />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 16 }}>
          {DOWNLOADS.map(d => (
            <div key={d.slug} style={{ background: T.white, borderRadius: 14, padding: 22, border: `1px solid ${T.silver}30` }}>
              <div style={{ fontSize: 28 }}>📥</div>
              <h3 style={{ fontFamily: DISPLAY, fontSize: 18, fontWeight: 700, color: T.navy, marginTop: 8 }}>{d.name}</h3>
              <p style={{ fontSize: 13.5, color: T.slate, marginTop: 8, lineHeight: 1.6 }}>{d.desc}</p>
              <p style={{ marginTop: 10, fontSize: 11, color: T.steel, fontStyle: "italic" }}>Email to unlock — coming soon.</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 28, padding: 20, borderRadius: 14, background: T.parchment }}>
          <div style={{ fontFamily: DISPLAY, fontSize: 18, fontWeight: 700, color: T.navy, marginBottom: 8 }}>Get notified when these go live</div>
          <NewsletterSignup />
        </div>
      </div>
    </>
  );
}
