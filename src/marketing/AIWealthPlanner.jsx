import { useState } from "react";
import { Link } from "react-router-dom";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { T, DISPLAY, BODY, fmtINR } from "./theme";
import { PageMeta } from "./Layout";

const CURRENCIES = {
  IN: { code: "INR", symbol: "₹", inflation: 0.06, equity: 0.11, fmt: fmtINR },
  US: { code: "USD", symbol: "$", inflation: 0.03, equity: 0.09, fmt: (n) => `$${Math.round(n).toLocaleString("en-US")}` },
  UK: { code: "GBP", symbol: "£", inflation: 0.03, equity: 0.09, fmt: (n) => `£${Math.round(n).toLocaleString("en-GB")}` },
  AE: { code: "AED", symbol: "AED", inflation: 0.025, equity: 0.08, fmt: (n) => `AED ${Math.round(n).toLocaleString("en-US")}` },
  SG: { code: "SGD", symbol: "S$", inflation: 0.025, equity: 0.08, fmt: (n) => `S$${Math.round(n).toLocaleString("en-US")}` },
  OT: { code: "USD", symbol: "$", inflation: 0.03, equity: 0.09, fmt: (n) => `$${Math.round(n).toLocaleString("en-US")}` },
};

const Slider = ({ label, value, min, max, step, onChange, suffix }) => (
  <label style={{ display: "block", marginBottom: 18 }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: T.slate, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</span>
      <span style={{ fontSize: 15, fontWeight: 700, color: T.navy }}>{value}{suffix || ""}</span>
    </div>
    <input type="range" min={min} max={max} step={step || 1} value={value} onChange={e => onChange(Number(e.target.value))} style={{ width: "100%", accentColor: T.gold }} />
  </label>
);
const Field = ({ label, value, onChange, prefix, type = "number", placeholder, options, note }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: T.slate, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>{label}</label>
    {options ? (
      <select value={value} onChange={e => onChange(e.target.value)} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${T.silver}40`, fontSize: 15, color: T.navy, background: T.white, fontFamily: BODY }}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    ) : (
      <div style={{ position: "relative" }}>
        {prefix && <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: T.steel, fontWeight: 600 }}>{prefix}</span>}
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          style={{ width: "100%", padding: "12px 14px", paddingLeft: prefix ? 30 : 14, borderRadius: 10, border: `1.5px solid ${T.silver}40`, fontSize: 15, color: T.navy, fontFamily: BODY }} />
      </div>
    )}
    {note && <div style={{ fontSize: 12, color: T.steel, marginTop: 4, fontStyle: "italic" }}>{note}</div>}
  </div>
);

function generateSnapshot(d) {
  const cur = CURRENCIES[d.country] || CURRENCIES.IN;
  const y = Math.max(d.retirementAge - d.age, 1);
  const monthlySav = Math.max(d.monthlyIncome - d.monthlyExpenses, 0);
  const riskMap = { conservative: 0.07, balanced: cur.equity * 0.85, aggressive: cur.equity };
  const r = riskMap[d.riskTolerance] || cur.equity * 0.85;
  // FV of current savings + FV of SIP
  const fvCurrent = d.currentSavings * Math.pow(1 + r, y);
  const rm = r / 12, n = y * 12;
  const fvSip = monthlySav > 0 ? monthlySav * ((Math.pow(1 + rm, n) - 1) / rm) : 0;
  const corpus = fvCurrent + fvSip;
  // need: 25× annual expenses at retirement adjusted for inflation
  const expAtRet = d.monthlyExpenses * 12 * Math.pow(1 + cur.inflation, y);
  const need = expAtRet * 25;
  const ratio = need > 0 ? corpus / need : 1;
  const yearly = [];
  let v = d.currentSavings;
  for (let i = 0; i <= y; i++) {
    yearly.push({ year: new Date().getFullYear() + i, value: Math.round(v) });
    v = v * (1 + r) + monthlySav * 12;
  }
  const stance = ratio >= 1 ? "ahead of plan" : ratio >= 0.7 ? "broadly on track" : ratio >= 0.4 ? "behind plan but recoverable" : "well behind plan — significant changes needed";
  const where = `At ${d.age}, with current investments of ${cur.fmt(d.currentSavings)} and a monthly surplus of ${cur.fmt(monthlySav)}, you are ${stance}. Projecting forward at ${(r * 100).toFixed(1)}% net return per year and ${(cur.inflation * 100).toFixed(1)}% inflation, your trajectory points to a retirement corpus of ${cur.fmt(corpus)} by age ${d.retirementAge}.${d.hasDebt && d.debtAmount > 0 ? ` Your debt of ${cur.fmt(d.debtAmount)} reduces real net worth; clearing high-interest debt typically beats most investment returns.` : ""}${d.primaryGoal ? ` Your stated goal — "${d.primaryGoal}" — fits into this picture alongside retirement.` : ""}`;
  const cover = `Today's expenses inflated to age ${d.retirementAge} are ${cur.fmt(expAtRet)} per year. At a 4% safe-withdrawal rate, that calls for a corpus of about ${cur.fmt(need)}. Your projection covers ${(ratio * 100).toFixed(0)}% of that need.`;
  const levers = [
    { lever: "Raise monthly investing by 30%", impact: `~${cur.fmt(monthlySav * 0.3 * ((Math.pow(1 + rm, n) - 1) / rm))} added to your retirement corpus` },
    { lever: "Push retirement age out by 3 years", impact: `~${cur.fmt(corpus * Math.pow(1 + r, 3) - corpus)} of additional compounding` },
    { lever: "Shift portfolio toward an aggressive 80/20 mix (if your risk tolerance allows)", impact: `~${cur.fmt(d.currentSavings * Math.pow(1 + Math.min(cur.equity * 0.95, 0.12), y) - fvCurrent)} added — at the cost of higher short-term volatility` },
  ];
  const nextStep = ratio < 0.7
    ? `Your single highest-impact move: build a 6-month emergency fund, then raise your monthly investing rate by ${monthlySav > 0 ? Math.round((d.monthlyIncome * 0.3 - monthlySav) / d.monthlyIncome * 100) : 30}% — start there.`
    : `Your highest-impact move: optimise tax (NPS / ELSS / LTCG harvesting) and review insurance cover. The basics are in place; refining matters more than scaling.`;
  return { where, cover, corpus, yearly, levers, nextStep, currency: cur };
}

export default function AIWealthPlanner() {
  const [step, setStep] = useState(1);
  const [d, setD] = useState({
    age: 35, country: "IN", monthlyIncome: 200000, dependents: 2,
    currentSavings: 1500000, monthlyExpenses: 90000, hasDebt: false, debtAmount: 0, ownsHome: false,
    retirementAge: 60, primaryGoal: "", riskTolerance: "balanced",
  });
  const set = (k) => (v) => setD(p => ({ ...p, [k]: typeof p[k] === "number" ? Number(v) : v }));
  const snap = step === 4 ? generateSnapshot(d) : null;

  const StepIndicator = () => (
    <div style={{ display: "flex", gap: 6, marginBottom: 22 }}>
      {[1, 2, 3, 4].map(i => (
        <div key={i} style={{ flex: 1, height: 6, borderRadius: 3, background: i <= step ? `linear-gradient(90deg, ${T.gold}, ${T.goldLight})` : `${T.silver}40` }} />
      ))}
    </div>
  );

  return (
    <>
      <PageMeta title="AI Wealth Planner — Free Snapshot" description="Tell us your age, income, savings and one big goal. Get an AI-generated 4-section wealth snapshot in 60 seconds — free." path="/ai-wealth-planner" />
      <section style={{ background: `linear-gradient(180deg, ${T.parchment}, ${T.cream})`, padding: "50px 24px 30px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: T.gold, letterSpacing: "0.08em", textTransform: "uppercase" }}>Free · No sign-up</div>
          <h1 style={{ fontFamily: DISPLAY, fontSize: "clamp(30px,4.5vw,42px)", fontWeight: 700, color: T.navy, marginTop: 10, lineHeight: 1.15 }}>The AI Wealth Planner</h1>
          <p style={{ fontSize: 16, color: T.slate, marginTop: 12, lineHeight: 1.65 }}>Four questions. Sixty seconds. A personalised wealth snapshot — what you're on track for, what shifts the needle most, and a single clear next step.</p>
        </div>
      </section>

      <section style={{ padding: "30px 24px 60px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", background: T.white, borderRadius: 20, padding: 36, boxShadow: "0 8px 40px rgba(10,22,40,0.08)", border: `1px solid ${T.gold}15` }}>
          <StepIndicator />

          {step === 1 && (
            <>
              <h2 style={{ fontFamily: DISPLAY, fontSize: 24, fontWeight: 700, color: T.navy }}>Step 1 · About you</h2>
              <p style={{ color: T.steel, fontSize: 14, marginTop: 6, marginBottom: 22 }}>The basics — so we can set the right time horizon and currency context.</p>
              <Slider label="Your age" value={d.age} min={22} max={75} onChange={set("age")} />
              <Field label="Country of residence" value={d.country} onChange={set("country")} options={[
                { value: "IN", label: "🇮🇳 India" }, { value: "US", label: "🇺🇸 United States" }, { value: "UK", label: "🇬🇧 United Kingdom" },
                { value: "AE", label: "🇦🇪 UAE" }, { value: "SG", label: "🇸🇬 Singapore" }, { value: "OT", label: "🌍 Other" },
              ]} />
              <Field label={`Monthly income (${CURRENCIES[d.country].symbol})`} prefix={CURRENCIES[d.country].symbol} value={d.monthlyIncome} onChange={set("monthlyIncome")} />
              <Field label="Number of dependents" value={d.dependents} onChange={set("dependents")} />
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
                <button onClick={() => setStep(2)} style={btnGold}>Next →</button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 style={{ fontFamily: DISPLAY, fontSize: 24, fontWeight: 700, color: T.navy }}>Step 2 · Your current situation</h2>
              <p style={{ color: T.steel, fontSize: 14, marginTop: 6, marginBottom: 22 }}>A snapshot of today — savings, spending, and any debt.</p>
              <Field label="Total savings & investments today" prefix={CURRENCIES[d.country].symbol} value={d.currentSavings} onChange={set("currentSavings")} />
              <Field label="Total monthly expenses" prefix={CURRENCIES[d.country].symbol} value={d.monthlyExpenses} onChange={set("monthlyExpenses")} />
              <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, color: T.navy, fontSize: 14, fontWeight: 600 }}>
                <input type="checkbox" checked={d.hasDebt} onChange={e => setD(p => ({ ...p, hasDebt: e.target.checked }))} style={{ accentColor: T.gold }} />
                I have major debt (home loan, education loan, etc.)
              </label>
              {d.hasDebt && <Field label="Total debt outstanding" prefix={CURRENCIES[d.country].symbol} value={d.debtAmount} onChange={set("debtAmount")} />}
              <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18, color: T.navy, fontSize: 14, fontWeight: 600 }}>
                <input type="checkbox" checked={d.ownsHome} onChange={e => setD(p => ({ ...p, ownsHome: e.target.checked }))} style={{ accentColor: T.gold }} />
                I own a home
              </label>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
                <button onClick={() => setStep(1)} style={btnGhost}>← Back</button>
                <button onClick={() => setStep(3)} style={btnGold}>Next →</button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 style={{ fontFamily: DISPLAY, fontSize: 24, fontWeight: 700, color: T.navy }}>Step 3 · Your goals</h2>
              <p style={{ color: T.steel, fontSize: 14, marginTop: 6, marginBottom: 22 }}>What you're aiming for — and how much volatility you can stomach.</p>
              <Slider label="Target retirement age" value={d.retirementAge} min={Math.max(d.age + 1, 40)} max={80} onChange={set("retirementAge")} />
              <Field label="Your #1 big goal (in your own words)" type="text" value={d.primaryGoal} onChange={set("primaryGoal")} placeholder="e.g. Kids' education in 2032" />
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: T.slate, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Risk tolerance</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  {[["conservative", "🛡️ Conservative"], ["balanced", "⚖️ Balanced"], ["aggressive", "🚀 Aggressive"]].map(([v, l]) => (
                    <button key={v} onClick={() => set("riskTolerance")(v)} style={{
                      padding: "12px 10px", borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: "pointer",
                      border: `2px solid ${d.riskTolerance === v ? T.gold : T.silver + "40"}`,
                      background: d.riskTolerance === v ? `${T.gold}10` : T.white, color: T.navy,
                    }}>{l}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
                <button onClick={() => setStep(2)} style={btnGhost}>← Back</button>
                <button onClick={() => setStep(4)} style={btnGold}>Generate snapshot ✨</button>
              </div>
            </>
          )}

          {step === 4 && snap && (
            <>
              <h2 style={{ fontFamily: DISPLAY, fontSize: 24, fontWeight: 700, color: T.navy }}>Your Wealth Snapshot</h2>
              <p style={{ color: T.steel, fontSize: 14, marginTop: 6, marginBottom: 18 }}>Educational projection · {snap.currency.code} · Assumptions visible at the bottom</p>

              <div style={{ background: `${T.gold}08`, borderRadius: 14, padding: 22, borderLeft: `4px solid ${T.gold}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.gold, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>1 · Where you stand</div>
                <p style={{ fontSize: 14.5, color: T.navy, lineHeight: 1.7 }}>{snap.where}</p>
                <p style={{ fontSize: 14.5, color: T.navy, lineHeight: 1.7, marginTop: 10 }}>{snap.cover}</p>
              </div>

              <div style={{ background: T.white, borderRadius: 14, padding: 22, marginTop: 14, border: `1px solid ${T.silver}30` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.gold, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>2 · Your trajectory</div>
                <div style={{ fontFamily: DISPLAY, fontSize: 30, fontWeight: 700, color: T.navy }}>{snap.currency.fmt(snap.corpus)}</div>
                <div style={{ fontSize: 13, color: T.steel, marginBottom: 14 }}>projected corpus at retirement age {d.retirementAge}</div>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={snap.yearly}>
                    <CartesianGrid strokeDasharray="3 3" stroke={`${T.silver}40`} />
                    <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                    <YAxis tickFormatter={v => snap.currency.fmt(v)} tick={{ fontSize: 10 }} width={80} />
                    <Tooltip formatter={v => snap.currency.fmt(v)} />
                    <Area type="monotone" dataKey="value" stroke={T.gold} strokeWidth={2} fill={`${T.gold}22`} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div style={{ background: T.white, borderRadius: 14, padding: 22, marginTop: 14, border: `1px solid ${T.silver}30` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.gold, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>3 · What changes the trajectory</div>
                {snap.levers.map((l, i) => (
                  <div key={i} style={{ padding: "12px 0", borderBottom: i < 2 ? `1px solid ${T.silver}30` : "none" }}>
                    <div style={{ fontWeight: 700, color: T.navy, fontSize: 14.5 }}>{l.lever}</div>
                    <div style={{ fontSize: 13, color: T.slate, marginTop: 4 }}>{l.impact}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: `linear-gradient(135deg, ${T.navy}, ${T.ocean})`, borderRadius: 14, padding: 22, marginTop: 14, color: T.white }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.goldLight, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>4 · Your next step</div>
                <p style={{ fontSize: 15, lineHeight: 1.6 }}>{snap.nextStep}</p>
              </div>

              <div style={{ marginTop: 24, padding: 20, borderRadius: 14, background: `${T.gold}12`, border: `1px solid ${T.gold}30` }}>
                <div style={{ fontFamily: DISPLAY, fontSize: 18, fontWeight: 700, color: T.navy }}>This is the surface.</div>
                <p style={{ fontSize: 14, color: T.slate, marginTop: 6, lineHeight: 1.6 }}>The full WealthWise plan covers 16 sections including SWOT, tax harvesting, insurance gap, retirement scenarios and detailed goal planning.</p>
                <Link to="/app" style={{ display: "inline-block", marginTop: 12, padding: "12px 24px", borderRadius: 10, background: `linear-gradient(135deg, ${T.gold}, ${T.goldLight})`, color: T.navy, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>Try the full WealthWise plan — free →</Link>
              </div>

              <p style={{ fontSize: 11.5, color: T.steel, marginTop: 18, lineHeight: 1.65, fontStyle: "italic" }}>
                Assumptions: equity return {(snap.currency.equity * 100).toFixed(0)}% p.a. (long-run average, not a guarantee), inflation {(snap.currency.inflation * 100).toFixed(1)}%, 4% safe-withdrawal rate. The blended return used reflects your stated risk tolerance. This snapshot is educational only — not investment advice. For specific recommendations, consult a SEBI-registered investment adviser in your jurisdiction. A future release will replace this client-side projection with a Claude-API-powered analysis.
              </p>

              <div style={{ display: "flex", justifyContent: "center", marginTop: 18 }}>
                <button onClick={() => setStep(1)} style={btnGhost}>← Edit answers</button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

const btnGold = { padding: "12px 28px", borderRadius: 12, background: `linear-gradient(135deg, ${T.gold}, ${T.goldLight})`, color: T.navy, fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" };
const btnGhost = { padding: "12px 22px", borderRadius: 12, background: T.white, color: T.slate, fontWeight: 600, fontSize: 14, border: `1.5px solid ${T.silver}40`, cursor: "pointer" };
