// AurisWealth — HNI / Wealth-Planner-focused landing page extras
// Drop these between the existing Features section and CTA in App.jsx.
import React from 'react';

export const TrustBar = ({ T, DISPLAY }) => (
  <section style={{ padding: '0 24px', marginTop: -28, position: 'relative', zIndex: 3 }}>
    <div style={{ maxWidth: 860, margin: '0 auto', background: T.white, borderRadius: 16, boxShadow: '0 8px 40px rgba(10,22,40,0.09)', padding: '28px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
      {[['500+', 'Clients Guided'], ['₹12Cr+', 'Tax Savings Found'], ['4.9★', 'Client Rating'], ['15min', 'Avg. Response Time']].map(([num, lbl]) => (
        <div key={lbl} style={{ textAlign: 'center', flex: '1 1 120px' }}>
          <div style={{ fontFamily: DISPLAY, fontSize: 26, fontWeight: 700, color: T.navy }}>{num}</div>
          <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4, fontWeight: 500, letterSpacing: '0.3px' }}>{lbl}</div>
        </div>
      ))}
    </div>
  </section>
);

export const YourJourney = ({ T, DISPLAY }) => (
  <section style={{ padding: '88px 24px 72px', maxWidth: 1000, margin: '0 auto' }}>
    <div style={{ textAlign: 'center', marginBottom: 52 }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <span style={{ width: 28, height: 1, background: T.gold, display: 'block' }} />
        <span style={{ fontSize: 11, fontWeight: 700, color: T.gold, letterSpacing: '2px', textTransform: 'uppercase' }}>Your Journey</span>
      </div>
      <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(28px,3.8vw,42px)', fontWeight: 700, color: T.navy, lineHeight: 1.12, letterSpacing: '-1px' }}>Wherever You Are,<br/>We Meet You There</h2>
      <p style={{ fontSize: 15, color: T.slate, maxWidth: 500, margin: '14px auto 0', lineHeight: 1.75 }}>Whether you're an HNI building a legacy or a professional starting out — expert guidance matched to your exact stage of life.</p>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: 20 }}>
      {[
        { icon: '🌱', title: 'Just Starting Out', desc: 'First income, building emergency funds, understanding tax regimes, starting your first SIP — get the foundation right from day one.' },
        { icon: '🏗️', title: 'Building Wealth', desc: 'Tax optimisation across 80C/80D/HRA, insurance planning, home-buying decisions, portfolio diversification — grow your wealth strategically.' },
        { icon: '👑', title: 'HNI & Legacy Planning', desc: "Retirement corpus, family office strategy, estate planning, alternate investments, passive income streams — protect and grow everything you've built.", highlight: true },
      ].map(f => (
        <div key={f.title} className="hover-lift" style={{ background: f.highlight ? `linear-gradient(135deg, ${T.navy}, ${T.ocean})` : T.white, borderRadius: 18, padding: '36px 28px', boxShadow: f.highlight ? '0 12px 36px rgba(10,22,40,0.18)' : '0 2px 16px rgba(10,22,40,0.05)', border: `1.5px solid ${f.highlight ? T.gold + '40' : T.silver + '30'}`, position: 'relative', overflow: 'hidden' }}>
          {f.highlight && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${T.gold}, ${T.goldLight})` }} />}
          <div style={{ fontSize: 32, marginBottom: 18 }}>{f.icon}</div>
          <h3 style={{ fontFamily: DISPLAY, fontSize: 22, fontWeight: 700, color: f.highlight ? T.white : T.navy, marginBottom: 10, letterSpacing: '-0.3px' }}>{f.title}</h3>
          <p style={{ fontSize: 14, color: f.highlight ? 'rgba(255,255,255,0.6)' : T.slate, lineHeight: 1.7 }}>{f.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export const Testimonials = ({ T, DISPLAY }) => (
  <section style={{ padding: '72px 24px', background: `linear-gradient(180deg, ${T.cream} 0%, ${T.parchment} 100%)` }}>
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 52 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={{ width: 28, height: 1, background: T.gold, display: 'block' }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: T.gold, letterSpacing: '2px', textTransform: 'uppercase' }}>Client Stories</span>
        </div>
        <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(28px,3.8vw,42px)', fontWeight: 700, color: T.navy, lineHeight: 1.12, letterSpacing: '-1px' }}>What Our Clients Say</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 20 }}>
        {[
          { stars: '★★★★★', quote: 'The comprehensive plan was a game-changer. I was paying ₹80,000 extra in taxes every year. The recommendations alone saved me more than the plan cost.', name: 'Priya Mehta', role: 'IT Professional, Bangalore' },
          { stars: '★★★★★', quote: 'First time someone explained insurance vs investment in a way that actually made sense. No jargon, no sales pitch — just honest, actionable advice.', name: 'Amit Verma', role: 'Business Owner, Delhi' },
          { stars: '★★★★★', quote: 'As an HNI client, I needed nuanced estate and portfolio guidance. The annual advisory package gave me exactly that — quarterly reviews and always-on support.', name: 'Sneha Reddy', role: 'Senior Executive, Hyderabad' },
        ].map(t => (
          <div key={t.name} className="hover-lift" style={{ background: T.white, border: `1px solid ${T.silver}30`, borderRadius: 16, padding: '32px 28px' }}>
            <div style={{ color: T.gold, fontSize: 15, letterSpacing: '2px', marginBottom: 14 }}>{t.stars}</div>
            <p style={{ fontFamily: DISPLAY, fontSize: 17, fontStyle: 'italic', color: T.slate, lineHeight: 1.7, marginBottom: 20 }}>“{t.quote}”</p>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.navy }}>{t.name}</div>
            <div style={{ fontSize: 12, color: '#9CA3AF' }}>{t.role}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
