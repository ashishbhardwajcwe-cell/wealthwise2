// AurisWealth — Site Footer with social links
// Drop-in replacement for the inline SiteFooter in App.jsx.
// To use:  import SiteFooter from './SiteFooter';
//          <SiteFooter T={T} DISPLAY={DISPLAY} />
import React from 'react';

export const SOCIALS = [
  {
    name: 'Website',
    label: 'auris8.com',
    href: 'https://auris8.com',
    color: '#C9A84C',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 17.93V18a1 1 0 00-2 0v1.93A8.001 8.001 0 014.07 13H6a1 1 0 000-2H4.07A8.001 8.001 0 0111 4.07V6a1 1 0 002 0V4.07A8.001 8.001 0 0119.93 11H18a1 1 0 000 2h1.93A8.001 8.001 0 0113 19.93z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    label: 'YouTube @AurisWealth',
    href: 'https://www.youtube.com/@AurisWealth',
    color: '#FF0000',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/>
      </svg>
    ),
  },
  {
    name: 'Twitter / X',
    label: '@auriswealth on X',
    href: 'https://x.com/auriswealth',
    color: '#1DA1F2',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.727-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    label: 'Instagram @auriswealth',
    href: 'https://www.instagram.com/auriswealth/',
    color: '#E1306C',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61576522393432',
    color: '#1877F2',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.791-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: 'Topmate',
    label: 'Topmate — Book a Session',
    href: 'https://topmate.io/auris8/',
    color: '#7C3AED',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a5 5 0 110 10A5 5 0 0112 2zm0 12c5.523 0 10 2.239 10 5v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-1c0-2.761 4.477-5 10-5z"/>
      </svg>
    ),
  },
];

const SiteFooter = ({ T, DISPLAY }) => (
  <footer style={{ background: T.navy, padding: '32px 24px 24px', borderTop: `1px solid ${T.gold}15` }}>
    <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src="/auris-logo.png" alt="Auris" style={{ height: 32, objectFit: 'contain' }} />
        <span style={{ fontFamily: DISPLAY, fontSize: 18, color: T.white }}>
          Auris<span style={{ color: T.gold }}>Wealth</span>
        </span>
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        {SOCIALS.map(s => (
          <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
            style={{
              width: 42, height: 42, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.65)',
              border: '1px solid rgba(255,255,255,0.08)', transition: 'all 0.25s', textDecoration: 'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = s.color + '25'; e.currentTarget.style.color = s.color; e.currentTarget.style.borderColor = s.color + '60'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
          >
            {s.icon}
          </a>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        {SOCIALS.map(s => (
          <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 12, color: `${T.white}40`, textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = s.color}
            onMouseLeave={e => e.currentTarget.style.color = `${T.white}40`}
          >
            {s.label}
          </a>
        ))}
      </div>

      <p style={{ color: `${T.white}25`, fontSize: 11, textAlign: 'center', marginTop: 4 }}>
        © 2026 Auris Pvt Ltd · AurisWealth · Not SEBI registered · For informational purposes only
      </p>
    </div>
  </footer>
);

export default SiteFooter;
