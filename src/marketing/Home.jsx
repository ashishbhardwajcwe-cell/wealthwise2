import { Link } from "react-router-dom";
import { T, DISPLAY } from "./theme";
import { PRODUCTS, AUDIENCES, BLOG_POSTS } from "./data";
import { PageMeta, NewsletterSignup } from "./Layout";

const Section = ({ children, bg, pad = "72px 24px" }) => (
  <section style={{ background: bg || "transparent", padding: pad }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>{children}</div>
  </section>
);
const H2 = ({ children, center }) => (
  <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(28px,4.5vw,42px)", fontWeight: 700, color: T.navy, lineHeight: 1.15, textAlign: center ? "center" : "left", marginBottom: 14 }}>{children}</h2>
);
const Eyebrow = ({ children, center }) => (
  <div style={{ display: center ? "flex" : "inline-flex", justifyContent: center ? "center" : "flex-start", alignItems: "center", gap: 10, marginBottom: 14 }}>
    <span style={{ width: 24, height: 1, background: T.gold }} />
    <span style={{ fontSize: 11, fontWeight: 700, color: T.gold, letterSpacing: "2px", textTransform: "uppercase" }}>{children}</span>
  </div>
);

export default function Home() {
  return (
    <>
      <PageMeta title="Wealth that compounds. Plans that hold under fire." description="AI-powered financial planning and global wealth management — built for professionals, families, and military officers who want clarity." path="/" />

      {/* HERO */}
      <Section bg={`linear-gradient(180deg, ${T.cream} 0%, ${T.parchment} 70%, ${T.cream} 100%)`} pad="84px 24px 56px">
        <div style={{ textAlign: "center", maxWidth: 820, margin: "0 auto" }}>
          <Eyebrow center>Auris — Expert Wealth Advisory</Eyebrow>
          <h1 style={{ fontFamily: DISPLAY, fontSize: "clamp(38px,6vw,64px)", fontWeight: 700, color: T.navy, lineHeight: 1.08, letterSpacing: "-1px" }}>
            Wealth that compounds.<br /><span style={{ color: T.gold }}>Plans that hold under fire.</span>
          </h1>
          <p style={{ marginTop: 22, fontSize: 19, color: T.slate, lineHeight: 1.6, maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
            AI-powered financial planning and global wealth management — built for professionals, families, and military officers who want clarity.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 34, flexWrap: "wrap" }}>
            <Link to="/ai-wealth-planner" style={{ padding: "16px 36px", borderRadius: 14, background: `linear-gradient(135deg, ${T.gold}, ${T.goldLight})`, color: T.navy, fontWeight: 700, fontSize: 16, textDecoration: "none", boxShadow: `0 10px 32px ${T.gold}40` }}>Try the AI Wealth Planner</Link>
            <a href="https://topmate.io/auris8/" target="_blank" rel="noreferrer" style={{ padding: "16px 30px", borderRadius: 14, background: T.white, color: T.navy, fontWeight: 600, fontSize: 16, textDecoration: "none", border: `1.5px solid ${T.navy}25` }}>Talk to Ashish →</a>
          </div>
          <p style={{ marginTop: 28, fontSize: 12, color: T.steel }}>Run by Auris Pvt Ltd (CIN: U70200HR2026PTC141922) · NISM-certified · DPDP compliant</p>
        </div>
      </Section>

      {/* WHAT WE COVER */}
      <Section>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Eyebrow center>What we cover</Eyebrow>
          <H2 center>Every major investment vehicle, explained</H2>
          <p style={{ color: T.slate, fontSize: 16, maxWidth: 600, margin: "12px auto 0" }}>Educational deep-dives on the nine asset classes that matter for Indian investors and global Indians.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: 18 }}>
          {PRODUCTS.map(p => (
            <Link key={p.slug} to={`/investment-products/${p.slug}`} style={{ textDecoration: "none", background: T.white, borderRadius: 16, padding: "24px 22px", border: `1px solid ${T.silver}30`, transition: "all 0.25s", display: "block" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.gold; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 12px 32px ${T.navy}10`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = `${T.silver}30`; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ fontSize: 30, marginBottom: 10 }}>{p.icon}</div>
              <div style={{ fontFamily: DISPLAY, fontSize: 19, fontWeight: 700, color: T.navy, marginBottom: 4 }}>{p.name}</div>
              <div style={{ fontSize: 13.5, color: T.slate, lineHeight: 1.55 }}>{p.tagline}</div>
            </Link>
          ))}
        </div>
      </Section>

      {/* AI WEALTH PLANNER FEATURE */}
      <Section bg={T.navy} pad="80px 24px">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))", gap: 48, alignItems: "center" }}>
          <div>
            <Eyebrow>The AI Wealth Planner</Eyebrow>
            <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(28px,4vw,40px)", fontWeight: 700, color: T.white, lineHeight: 1.15 }}>A full financial plan in 60 seconds — yours, free.</h2>
            <div style={{ color: `${T.white}80`, fontSize: 15, lineHeight: 1.75, marginTop: 16 }}>
              <p>Tell us your age, income, savings and one big goal. Our AI returns a 4-section snapshot: where you stand today, your projected trajectory, the three levers that move the needle most, and a single clear next step.</p>
              <p style={{ marginTop: 12 }}>It runs in your browser. Your numbers never leave your session in identifiable form, and the projection uses transparent assumptions you can change.</p>
            </div>
            <Link to="/ai-wealth-planner" style={{ display: "inline-block", marginTop: 24, padding: "14px 30px", borderRadius: 12, background: `linear-gradient(135deg, ${T.gold}, ${T.goldLight})`, color: T.navy, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>Try it now — free →</Link>
          </div>
          <div style={{ background: T.white, borderRadius: 18, padding: 28, boxShadow: "0 24px 64px rgba(0,0,0,0.25)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.gold, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Sample snapshot</div>
            <div style={{ fontFamily: DISPLAY, fontSize: 20, fontWeight: 700, color: T.navy }}>Where you stand</div>
            <p style={{ fontSize: 13.5, color: T.slate, lineHeight: 1.6, marginTop: 6 }}>At 35, with ₹40 L invested and a ₹35 K/mo SIP, you're on track for a ₹6.8 Cr corpus by 60 — roughly 70% of what you'd need for a comfortable retirement.</p>
            <div style={{ marginTop: 14, padding: 12, borderRadius: 10, background: `${T.gold}10`, fontSize: 13, color: T.navy, fontWeight: 600 }}>👉 The single biggest lever: raise your SIP from ₹35 K to ₹55 K → adds ~₹2.1 Cr to your retirement corpus.</div>
          </div>
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section>
        <Eyebrow center>How it works</Eyebrow>
        <H2 center>From scattered to unified</H2>
        <p style={{ textAlign: "center", color: T.slate, fontSize: 16, maxWidth: 600, margin: "12px auto 36px" }}>
          Most investors have money in five places, a plan in none. WealthWise brings everything into one view, then tells you what to do next.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 1fr 60px 1fr", gap: 16, alignItems: "center", maxWidth: 1000, margin: "0 auto" }}>
          {[
            { icon: "🌀", title: "Scattered", lines: ["MF in 3 AMCs", "Stocks in 2 brokers", "FDs in 4 banks", "PMS, AIF, gold, crypto"] },
            { icon: "⚙️", title: "Unified by WealthWise", lines: ["One portfolio view", "AI-generated plan", "Tax harvesting", "Goal tracking"] },
            { icon: "🎯", title: "A coherent plan", lines: ["Retirement on track", "Tax optimised", "Risk right-sized", "Reviewed quarterly"] },
          ].map((b, i, arr) => (
            <>
              <div key={b.title} style={{ background: T.white, borderRadius: 16, padding: 24, border: `1px solid ${T.silver}30`, textAlign: "center", minWidth: 0 }}>
                <div style={{ fontSize: 36 }}>{b.icon}</div>
                <div style={{ fontFamily: DISPLAY, fontSize: 18, fontWeight: 700, color: T.navy, marginTop: 8 }}>{b.title}</div>
                <ul style={{ listStyle: "none", padding: 0, marginTop: 10 }}>{b.lines.map(l => <li key={l} style={{ fontSize: 13, color: T.slate, padding: "2px 0" }}>{l}</li>)}</ul>
              </div>
              {i < arr.length - 1 && <div key={`a${i}`} style={{ textAlign: "center", color: T.gold, fontSize: 28, fontWeight: 700 }}>→</div>}
            </>
          ))}
        </div>
      </Section>

      {/* WHO WE SERVE */}
      <Section bg={T.parchment}>
        <Eyebrow center>Who we serve</Eyebrow>
        <H2 center>Built for four kinds of clients</H2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 18, marginTop: 32 }}>
          {AUDIENCES.map(a => (
            <Link key={a.slug} to={`/for/${a.slug}`} style={{ textDecoration: "none", background: T.white, borderRadius: 18, padding: 28, border: `1px solid ${T.gold}20`, display: "block", transition: "all 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.gold; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = `${T.gold}20`; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ fontSize: 32 }}>{a.icon}</div>
              <h3 style={{ fontFamily: DISPLAY, fontSize: 20, fontWeight: 700, color: T.navy, marginTop: 10 }}>{a.name}</h3>
              <p style={{ fontSize: 13.5, color: T.slate, marginTop: 8, lineHeight: 1.55 }}>{a.intro.slice(0, 120)}…</p>
              <div style={{ marginTop: 14, color: T.gold, fontSize: 13, fontWeight: 700 }}>Learn more →</div>
            </Link>
          ))}
        </div>
      </Section>

      {/* FEATURED BLOG */}
      <Section>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
          <div><Eyebrow>From the blog</Eyebrow><H2>Sharp writing on Indian wealth</H2></div>
          <Link to="/blog" style={{ color: T.gold, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>All posts →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 18 }}>
          {BLOG_POSTS.slice(0, 3).map(p => (
            <Link key={p.slug} to={`/blog/${p.slug}`} style={{ textDecoration: "none", background: T.white, borderRadius: 16, padding: 24, border: `1px solid ${T.silver}30` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.gold, letterSpacing: "0.06em", textTransform: "uppercase" }}>{p.category}</div>
              <h3 style={{ fontFamily: DISPLAY, fontSize: 19, fontWeight: 700, color: T.navy, marginTop: 6, lineHeight: 1.3 }}>{p.title}</h3>
              <p style={{ fontSize: 13.5, color: T.slate, marginTop: 8, lineHeight: 1.55 }}>{p.excerpt}</p>
              <div style={{ marginTop: 12, fontSize: 12, color: T.steel }}>{p.date} · {p.readTime}</div>
            </Link>
          ))}
        </div>
      </Section>

      {/* FOUNDER */}
      <Section bg={T.parchment}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 36, alignItems: "center", maxWidth: 1000, margin: "0 auto" }}>
          <div>
            <Eyebrow>Our founder</Eyebrow>
            <H2>Col (Retd.) Ashish Bhardwaj</H2>
            <p style={{ color: T.slate, fontSize: 15.5, lineHeight: 1.75, marginTop: 12 }}>
              Twenty-plus years in uniform taught Ashish that mission planning is the difference between getting through the night and getting hit. He started Auris Cashflow so the same precision could go into civilian financial planning — for fellow officers transitioning out, for HNIs who deserve better than commission-led advice, and for professionals who don't have time to figure it all out.
            </p>
            <Link to="/about" style={{ display: "inline-block", marginTop: 18, color: T.gold, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>Read the full story →</Link>
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <div style={{ width: 180, height: 220, borderRadius: 14, background: `linear-gradient(135deg, ${T.navy}, ${T.ocean})`, display: "flex", alignItems: "center", justifyContent: "center", color: T.gold, fontFamily: DISPLAY, fontSize: 14, padding: 14, textAlign: "center" }}>🎖️ In uniform<br /><span style={{ fontSize: 11, color: `${T.white}60` }}>(photo)</span></div>
            <div style={{ width: 180, height: 220, borderRadius: 14, background: `linear-gradient(135deg, ${T.gold}, ${T.goldLight})`, display: "flex", alignItems: "center", justifyContent: "center", color: T.navy, fontFamily: DISPLAY, fontSize: 14, padding: 14, textAlign: "center" }}>💼 Today<br /><span style={{ fontSize: 11 }}>(photo)</span></div>
          </div>
        </div>
      </Section>

      {/* TRUST */}
      <Section>
        <H2 center>Built on trust</H2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", gap: 18, marginTop: 30, maxWidth: 1000, margin: "30px auto 0" }}>
          {[["500+", "Clients guided"], ["₹12 Cr+", "Tax savings identified"], ["4.9★", "Client rating"], ["20+ yrs", "Combined experience"]].map(([n, l]) => (
            <div key={l} style={{ background: T.white, borderRadius: 14, padding: 24, textAlign: "center", border: `1px solid ${T.silver}30` }}>
              <div style={{ fontFamily: DISPLAY, fontSize: 30, fontWeight: 700, color: T.navy }}>{n}</div>
              <div style={{ fontSize: 12, color: T.steel, marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", fontSize: 11, color: T.steel, marginTop: 14, fontStyle: "italic" }}>Some figures are illustrative as we build out the practice. NISM-certified · AMFI ARN (pending) · SEBI RIA (pending).</p>
      </Section>

      {/* FINAL CTA */}
      <Section bg={`linear-gradient(135deg, ${T.navy}, ${T.ocean})`} pad="80px 24px">
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(28px,4vw,40px)", fontWeight: 700, color: T.white }}>Ready to build your wealth plan?</h2>
          <p style={{ color: `${T.white}80`, fontSize: 16, marginTop: 14 }}>Five minutes of inputs. A full snapshot of where you stand and what to do next.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
            <Link to="/ai-wealth-planner" style={{ padding: "16px 36px", borderRadius: 14, background: `linear-gradient(135deg, ${T.gold}, ${T.goldLight})`, color: T.navy, fontWeight: 700, fontSize: 16, textDecoration: "none" }}>Try the AI Planner</Link>
            <a href="https://topmate.io/auris8/" target="_blank" rel="noreferrer" style={{ padding: "16px 30px", borderRadius: 14, background: `${T.white}10`, color: T.white, fontWeight: 600, fontSize: 16, textDecoration: "none", border: `1.5px solid ${T.white}25` }}>Talk to Ashish</a>
          </div>
          <div style={{ marginTop: 36, padding: 20, borderRadius: 14, background: `${T.white}08`, textAlign: "left" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.goldLight, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Subscribe to the newsletter</div>
            <NewsletterSignup />
          </div>
        </div>
      </Section>
    </>
  );
}
