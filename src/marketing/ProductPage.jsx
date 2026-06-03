import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { T, DISPLAY } from "./theme";
import { PRODUCTS, BLOG_POSTS } from "./data";
import { Disclaimer, PageMeta } from "./Layout";

const INDIA_LICENSED = ["mutual-funds", "pms", "aif", "unlisted-shares", "direct-equity"];
const CRYPTO = ["cryptocurrency"];

export default function ProductPage() {
  const { product } = useParams();
  const p = PRODUCTS.find(x => x.slug === product);
  if (!p) return <Navigate to="/investment-products/mutual-funds" replace />;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": p.faqs.map(([q, a]) => ({ "@type": "Question", "name": q, "acceptedAnswer": { "@type": "Answer", "text": a } })),
  };
  const related = BLOG_POSTS.slice(0, 3);

  return (
    <>
      <PageMeta title={p.name} description={p.summary} path={`/investment-products/${p.slug}`} />
      <Helmet><script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script></Helmet>

      {/* HERO */}
      <section style={{ background: `linear-gradient(180deg, ${T.parchment}, ${T.cream})`, padding: "60px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 48 }}>{p.icon}</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: T.gold, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 10 }}>Investment Product</div>
          <h1 style={{ fontFamily: DISPLAY, fontSize: "clamp(32px,5vw,48px)", fontWeight: 700, color: T.navy, marginTop: 10, lineHeight: 1.15 }}>{p.name}</h1>
          <p style={{ fontSize: 18, color: T.slate, lineHeight: 1.6, marginTop: 14 }}>{p.tagline}</p>
          <a href="#who" style={{ display: "inline-block", marginTop: 22, padding: "12px 28px", borderRadius: 12, background: `linear-gradient(135deg, ${T.gold}, ${T.goldLight})`, color: T.navy, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>Is this right for you? ↓</a>
        </div>
      </section>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
        {/* WHAT IT IS */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 30, fontWeight: 700, color: T.navy, marginBottom: 14 }}>What it is</h2>
          {p.whatItIs.map((para, i) => <p key={i} style={{ fontSize: 16, color: T.slate, lineHeight: 1.75, marginBottom: 12 }}>{para}</p>)}
        </section>

        {/* KEY FACTS */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 30, fontWeight: 700, color: T.navy, marginBottom: 14 }}>Key facts</h2>
          <div style={{ background: T.white, borderRadius: 14, overflow: "hidden", border: `1px solid ${T.silver}30` }}>
            {p.keyFacts.map(([k, v], i) => (
              <div key={k} style={{ display: "grid", gridTemplateColumns: "200px 1fr", borderBottom: i < p.keyFacts.length - 1 ? `1px solid ${T.silver}25` : "none" }}>
                <div style={{ padding: "14px 18px", background: T.offwhite, fontWeight: 700, color: T.slate, fontSize: 13 }}>{k}</div>
                <div style={{ padding: "14px 18px", color: T.navy, fontSize: 14 }}>{v}</div>
              </div>
            ))}
          </div>
        </section>

        {/* PROS & CONS */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 30, fontWeight: 700, color: T.navy, marginBottom: 14 }}>Pros & cons</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ background: T.white, borderLeft: `4px solid ${T.emerald}`, borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, color: T.emerald, marginBottom: 10, fontSize: 14 }}>✓ Pros</div>
              {p.pros.map((x, i) => <div key={i} style={{ fontSize: 14, color: T.navy, padding: "4px 0", lineHeight: 1.55 }}>• {x}</div>)}
            </div>
            <div style={{ background: T.white, borderLeft: `4px solid ${T.ruby}`, borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, color: T.ruby, marginBottom: 10, fontSize: 14 }}>✗ Cons</div>
              {p.cons.map((x, i) => <div key={i} style={{ fontSize: 14, color: T.navy, padding: "4px 0", lineHeight: 1.55 }}>• {x}</div>)}
            </div>
          </div>
        </section>

        {/* WHO FOR */}
        <section id="who" style={{ marginBottom: 48, scrollMarginTop: 80 }}>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 30, fontWeight: 700, color: T.navy, marginBottom: 14 }}>Who should consider this</h2>
          <div style={{ background: `${T.gold}10`, borderLeft: `4px solid ${T.gold}`, padding: 24, borderRadius: 12, fontSize: 16, color: T.navy, lineHeight: 1.75 }}>{p.whoFor}</div>
        </section>

        {/* MISTAKES */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 30, fontWeight: 700, color: T.navy, marginBottom: 14 }}>Common mistakes</h2>
          <ol style={{ paddingLeft: 24, color: T.slate, fontSize: 15.5, lineHeight: 1.7 }}>
            {p.mistakes.map((m, i) => <li key={i} style={{ marginBottom: 10 }}>{m}</li>)}
          </ol>
        </section>

        {/* HOW AURIS HELPS */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 30, fontWeight: 700, color: T.navy, marginBottom: 14 }}>How Auris helps</h2>
          <p style={{ fontSize: 16, color: T.slate, lineHeight: 1.75 }}>
            Inside the WealthWise app, {p.name} is mapped into your portfolio aggregator, included in the goal traffic-light, factored into your Freedom Number, and (where applicable) covered by the tax harvesting engine. The Guided Plan walks you through whether this product fits your situation, with a personalised explanation tied to your inputs.
          </p>
          <Link to="/app/guided" style={{ display: "inline-block", marginTop: 16, padding: "12px 24px", borderRadius: 10, background: T.navy, color: T.white, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>Use the Guided Plan →</Link>
        </section>

        {/* FAQs */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 30, fontWeight: 700, color: T.navy, marginBottom: 14 }}>Frequently asked questions</h2>
          {p.faqs.map(([q, a], i) => (
            <details key={i} style={{ background: T.white, borderRadius: 12, padding: 18, marginBottom: 10, border: `1px solid ${T.silver}30` }}>
              <summary style={{ cursor: "pointer", fontWeight: 700, color: T.navy, fontSize: 15 }}>{q}</summary>
              <p style={{ marginTop: 10, fontSize: 14.5, color: T.slate, lineHeight: 1.7 }}>{a}</p>
            </details>
          ))}
        </section>

        {/* RELATED */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 24, fontWeight: 700, color: T.navy, marginBottom: 14 }}>Related reading</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 14 }}>
            {related.map(b => (
              <Link key={b.slug} to={`/blog/${b.slug}`} style={{ textDecoration: "none", background: T.white, borderRadius: 12, padding: 16, border: `1px solid ${T.silver}30`, display: "block" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.gold, textTransform: "uppercase" }}>{b.category}</div>
                <div style={{ fontFamily: DISPLAY, fontSize: 16, fontWeight: 700, color: T.navy, marginTop: 6 }}>{b.title}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: `linear-gradient(135deg, ${T.navy}, ${T.ocean})`, borderRadius: 18, padding: 32, textAlign: "center", marginBottom: 24 }}>
          <h3 style={{ fontFamily: DISPLAY, fontSize: 26, fontWeight: 700, color: T.white }}>Get a personalised plan for {p.name}</h3>
          <p style={{ color: `${T.white}80`, marginTop: 8 }}>The AI Wealth Planner factors this asset class into your full picture.</p>
          <Link to="/ai-wealth-planner" style={{ display: "inline-block", marginTop: 18, padding: "14px 30px", borderRadius: 12, background: `linear-gradient(135deg, ${T.gold}, ${T.goldLight})`, color: T.navy, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>Try the AI Planner →</Link>
        </section>

        {/* Compliance addendum */}
        {INDIA_LICENSED.includes(p.slug) && (
          <p style={{ fontSize: 12, color: T.steel, padding: 14, borderRadius: 10, background: `${T.amber}08`, border: `1px solid ${T.amber}25` }}>
            AMFI Registration Number: pending. SEBI RIA Registration: pending. We do not guarantee returns on any product. Read all scheme-related documents carefully before investing.
          </p>
        )}
        {CRYPTO.includes(p.slug) && (
          <p style={{ fontSize: 12, color: T.steel, padding: 14, borderRadius: 10, background: `${T.ruby}08`, border: `1px solid ${T.ruby}25` }}>
            Cryptocurrency is taxed at 30% flat in India with 1% TDS on transactions over ₹50,000 per year. Losses cannot be set off against gains in other asset classes. Crypto is highly volatile and may result in loss of all invested capital.
          </p>
        )}
      </div>
    </>
  );
}
