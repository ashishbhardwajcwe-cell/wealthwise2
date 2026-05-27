# AurisWealth Rebrand — Integration Notes

This branch (`claude/update-favicon-logo-rY3C8`) contains the rebrand from **WealthWise** to **AurisWealth**, plus updated social media links and HNI-focused content sections.

## ✅ Already pushed to this branch

| File | Change |
|------|--------|
| `index.html` | Favicon → `/auris-logo.png`, title → `AurisWealth — Financial Independence Planner`, OG meta tags |
| `src/SiteFooter.jsx` | **NEW** — modular site footer with all corrected social links + Twitter/X |
| `src/LandingExtras.jsx` | **NEW** — `TrustBar`, `YourJourney` (HNI), `Testimonials` components |

## 🔧 App.jsx changes still required (push timed out due to file size)

The full updated `src/App.jsx` exists locally as the Auris-branded version. Apply these targeted edits:

### 1. Add imports near the top of App.jsx
```jsx
import SiteFooter from './SiteFooter';
import { TrustBar, YourJourney, Testimonials } from './LandingExtras';
```

### 2. Rebrand text replacements (4 places)
- AuthModal brand span:  `Wealth<span style={{ color:T.gold }}>Wise</span>` → `Auris<span style={{ color:T.gold }}>Wealth</span>`
- AuthModal subtitle:  `"Sign in to continue to WealthWise"` → `"Sign in to continue to AurisWealth"`
- Inline footer brand span: same rename as #1 (other occurrence)
- Footer copyright: `· WealthWise ·` → `· AurisWealth ·`

### 3. Replace inline `const SOCIALS = [...]` and `const SiteFooter = () => (...)` blocks
Delete those two blocks entirely (now provided by `./SiteFooter`).

### 4. Inject HNI sections in the `Landing` component
After the **Features** section and before the **CTA** section, insert:
```jsx
<TrustBar T={T} DISPLAY={DISPLAY} />
<YourJourney T={T} DISPLAY={DISPLAY} />
<Testimonials T={T} DISPLAY={DISPLAY} />
```

### 5. Hero badge & subtitle
- `<Badge color={T.goldLight}>AI-Powered Financial Planning</Badge>` → `<Badge color={T.goldLight}>Auris — Expert Wealth Advisory</Badge>`
- Hero subtitle text → `Built for discerning HNI clients & wealth planners. Input your income, assets and goals — get a comprehensive financial roadmap with retirement projections, estate planning insights, and AI-powered advisory.`
- Hero stat tuples → `[["500+","Clients Guided"],["₹12Cr+","Tax Savings Found"],["4.9★","Client Rating"]]`

### 6. Update `<SiteFooter />` JSX
In the `App` component's return, change `<SiteFooter />` to `<SiteFooter T={T} DISPLAY={DISPLAY} />`.

## Companion repo: `auris8v1.3`

Same branch (`claude/update-favicon-logo-rY3C8`) on `ashishbhardwajcwe-cell/auris8v1.3` already has:
- New `favicon.svg` (Auris brand mark for browser tab)
- YouTube → `@AurisWealth`, Instagram → `@auriswealth`, **new** Twitter/X (`x.com/auriswealth`), Facebook unchanged
- Free Resources grid expanded from 4 → 5 cards (added X/Twitter)
- Footer Connect column lists all 4 social platforms with correct handles
