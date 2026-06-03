import { useParams, Link, Navigate } from "react-router-dom";
import { T, DISPLAY } from "./theme";
import { BLOG_POSTS } from "./data";
import { PageMeta, NewsletterSignup } from "./Layout";

const renderBody = (md) => md.split("\n\n").map((blk, i) => {
  if (blk.startsWith("## ")) return <h2 key={i} style={{ fontFamily: DISPLAY, fontSize: 24, fontWeight: 700, color: T.navy, marginTop: 26, marginBottom: 10 }}>{blk.slice(3)}</h2>;
  if (blk.startsWith("# ")) return <h1 key={i} style={{ fontFamily: DISPLAY, fontSize: 30, fontWeight: 700, color: T.navy, marginTop: 28, marginBottom: 12 }}>{blk.slice(2)}</h1>;
  return <p key={i} style={{ color: T.slate, fontSize: 16, lineHeight: 1.8, marginBottom: 14 }}>{blk}</p>;
});

export function BlogIndex() {
  const cats = Array.from(new Set(BLOG_POSTS.map(p => p.category)));
  return (
    <>
      <PageMeta title="Blog — Auris Wealth" description="Sharp writing on Indian wealth: investing, planning, tax, NRI, defence, markets and the tools that matter." path="/blog" />
      <section style={{ background: `linear-gradient(180deg, ${T.parchment}, ${T.cream})`, padding: "56px 24px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: T.gold, letterSpacing: "0.08em", textTransform: "uppercase" }}>Blog</div>
          <h1 style={{ fontFamily: DISPLAY, fontSize: "clamp(30px,5vw,46px)", fontWeight: 700, color: T.navy, marginTop: 10 }}>Sharp writing on Indian wealth</h1>
          <p style={{ fontSize: 16, color: T.slate, marginTop: 12 }}>Investing, planning, tax, NRI, defence, markets and the tools that matter.</p>
        </div>
      </section>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
          <Link to="/blog" style={catChip(true)}>All</Link>
          {cats.map(c => <Link key={c} to={`/blog/category/${encodeURIComponent(c)}`} style={catChip(false)}>{c}</Link>)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 18 }}>
          {BLOG_POSTS.map(p => <BlogCard key={p.slug} p={p} />)}
        </div>
        <div style={{ marginTop: 40, padding: 24, borderRadius: 14, background: T.parchment }}>
          <div style={{ fontFamily: DISPLAY, fontSize: 20, fontWeight: 700, color: T.navy }}>Get the next post in your inbox</div>
          <p style={{ fontSize: 13.5, color: T.slate, margin: "8px 0 14px" }}>One email a fortnight. No spam, just one careful piece on Indian wealth.</p>
          <NewsletterSignup />
        </div>
      </div>
    </>
  );
}

export function BlogCategory() {
  const { category } = useParams();
  const c = decodeURIComponent(category);
  const posts = BLOG_POSTS.filter(p => p.category === c);
  return (
    <>
      <PageMeta title={`${c} posts — Auris Wealth Blog`} description={`All Auris Wealth blog posts in the ${c} category.`} path={`/blog/category/${category}`} />
      <section style={{ background: `linear-gradient(180deg, ${T.parchment}, ${T.cream})`, padding: "56px 24px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <Link to="/blog" style={{ fontSize: 13, color: T.gold, fontWeight: 700, textDecoration: "none" }}>← All posts</Link>
          <h1 style={{ fontFamily: DISPLAY, fontSize: "clamp(30px,5vw,42px)", fontWeight: 700, color: T.navy, marginTop: 12 }}>{c}</h1>
          <p style={{ fontSize: 15, color: T.steel, marginTop: 8 }}>{posts.length} {posts.length === 1 ? "post" : "posts"}</p>
        </div>
      </section>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px" }}>
        {posts.length === 0
          ? <p style={{ color: T.slate, textAlign: "center" }}>No posts in this category yet.</p>
          : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 18 }}>{posts.map(p => <BlogCard key={p.slug} p={p} />)}</div>}
      </div>
    </>
  );
}

export function BlogPost() {
  const { slug } = useParams();
  const p = BLOG_POSTS.find(x => x.slug === slug);
  if (!p) return <Navigate to="/blog" replace />;
  const related = BLOG_POSTS.filter(x => x.slug !== slug).slice(0, 3);
  return (
    <>
      <PageMeta title={p.title} description={p.excerpt} path={`/blog/${p.slug}`} />
      <section style={{ background: `linear-gradient(180deg, ${T.parchment}, ${T.cream})`, padding: "56px 24px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Link to={`/blog/category/${encodeURIComponent(p.category)}`} style={{ fontSize: 12, fontWeight: 700, color: T.gold, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>{p.category}</Link>
          <h1 style={{ fontFamily: DISPLAY, fontSize: "clamp(30px,4.5vw,44px)", fontWeight: 700, color: T.navy, marginTop: 10, lineHeight: 1.15 }}>{p.title}</h1>
          <div style={{ fontSize: 13, color: T.steel, marginTop: 12 }}>By Col Ashish Bhardwaj · {p.date} · {p.readTime}</div>
        </div>
      </section>
      <article style={{ maxWidth: 760, margin: "0 auto", padding: "32px 24px" }}>
        {renderBody(p.body)}
        <div style={{ marginTop: 36, padding: 20, borderRadius: 14, background: `${T.gold}10`, border: `1px solid ${T.gold}25` }}>
          <div style={{ fontFamily: DISPLAY, fontSize: 18, fontWeight: 700, color: T.navy }}>Run your own snapshot</div>
          <p style={{ fontSize: 14, color: T.slate, marginTop: 6 }}>Take 60 seconds to see your wealth trajectory, levers and next step.</p>
          <Link to="/ai-wealth-planner" style={{ display: "inline-block", marginTop: 12, padding: "10px 22px", borderRadius: 10, background: `linear-gradient(135deg, ${T.gold}, ${T.goldLight})`, color: T.navy, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>Try the AI Planner →</Link>
        </div>
        <div style={{ marginTop: 36 }}>
          <h3 style={{ fontFamily: DISPLAY, fontSize: 22, fontWeight: 700, color: T.navy, marginBottom: 14 }}>Related reading</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 14 }}>
            {related.map(r => <BlogCard key={r.slug} p={r} compact />)}
          </div>
        </div>
        <p style={{ fontSize: 11, color: T.steel, marginTop: 24, fontStyle: "italic", lineHeight: 1.6 }}>This post is educational only. Investments are subject to market risks. Past performance is not indicative of future returns. Please consult a SEBI-registered investment adviser before acting.</p>
      </article>
    </>
  );
}

const BlogCard = ({ p, compact }) => (
  <Link to={`/blog/${p.slug}`} style={{ textDecoration: "none", background: T.white, borderRadius: 14, padding: compact ? 16 : 22, border: `1px solid ${T.silver}30`, display: "block" }}>
    <div style={{ fontSize: 11, fontWeight: 700, color: T.gold, letterSpacing: "0.06em", textTransform: "uppercase" }}>{p.category}</div>
    <h3 style={{ fontFamily: DISPLAY, fontSize: compact ? 16 : 19, fontWeight: 700, color: T.navy, marginTop: 6, lineHeight: 1.3 }}>{p.title}</h3>
    {!compact && <p style={{ fontSize: 13.5, color: T.slate, marginTop: 8, lineHeight: 1.55 }}>{p.excerpt}</p>}
    <div style={{ marginTop: 10, fontSize: 12, color: T.steel }}>{p.date} · {p.readTime}</div>
  </Link>
);

const catChip = (active) => ({
  padding: "6px 14px", borderRadius: 18, fontSize: 13, fontWeight: 600,
  background: active ? T.navy : T.white, color: active ? T.gold : T.navy,
  border: `1px solid ${active ? T.navy : T.silver + "40"}`, textDecoration: "none",
});
