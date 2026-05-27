# WealthWise v2 — Claude Code Build Prompt

> **How to use this file:** Save this as `CLAUDE.md` in the root of your WealthWise repo. Claude Code reads this file automatically on every session and treats it as the source of truth for the project. Open Claude Code in your repo, then type prompts like *"Build Phase 1.1 from CLAUDE.md"* or *"Implement the tax-lot ledger from the spec"*. Build the application one module at a time — do not ask Claude Code to build everything in one shot, it will lose context and produce poor code.

---

## 0. Project context (read this first, every session)

**Product name:** WealthWise (consumer-facing). Run by Auris Pvt Ltd.

**Current live deployment:**
- Frontend: React 18 + Vite, hosted on Netlify
- Domain: wealth.auris8.com (production) and auriswealth.co (marketing site)
- Backend: Supabase (project ref: `hbddsvwghboftjsgtate`)
- Auth: Google OAuth via Supabase
- AI: Claude API (model `claude-sonnet-4-20250514`) called via Supabase Edge Functions, never directly from the browser
- Analytics: Google Analytics G-BNT8QF03F6
- Payments: Razorpay (Edge Functions architected, not yet activated). Add Stripe for international users in Phase 4.
- Repo: GitHub user `ashishbhardwajcwe-cell`

**Existing features that must not break:**
1. SWOT analysis of personal finances (modelled on Equentis financial plan format)
2. Cashflow projection
3. Net worth tracker
4. SIP/lumpsum goal planner
5. Retirement scenario modeller
6. Claude-powered "AI insights" panel

**Audience:** Indian HNIs and salaried professionals, with a secondary focus on defence officers planning financial independence. Eventually global (NRIs, Dubai expats) — but Phase 1 builds for India.

**Founder:** Col (Retd.) Ashish Bhardwaj — non-expert developer, used GitHub + Netlify to launch the current site. Code must be readable and maintainable by him.

---

## 1. Mission

Transform WealthWise from a financial planning calculator into a **comprehensive AI-powered wealth management platform** covering every major investment vehicle available to Indian investors — Mutual Funds, PMS, AIF, unlisted shares, cryptocurrency, direct equity advisory — with a unified AI wealth planner at the centre.

The aspirational benchmark: the depth and rigour of an Equentis-style financial plan, delivered as software at a fraction of the cost, with continuous (not annual) updating.

---

## 2. Hard constraints (regulatory and ethical — never violate)

Every feature must be built within these guardrails. Hard-code these as system-level constraints in the AI prompts and as runtime checks in the application logic.

### 2.1 SEBI compliance
- **No guaranteed returns language.** Never display phrases like "you will earn X%" or "this fund will return Y". Always use "may", "could", "historically", "projected based on assumptions".
- **No specific buy/sell recommendations** until SEBI RIA licence is active. Until then, all output must be framed as **educational alerts**: "you may wish to discuss with your CA", "consider whether this fits your situation".
- **Mandatory disclaimers** on every AI-generated recommendation, every report, and every page that discusses specific securities or returns. The disclaimer text is in Section 13 of this document.
- **Risk profiling required** before any advice-shaped output. Use the risk profile questionnaire structure from the Equentis template (Section 11 of this document).
- **No reproduction of copyrighted material** from AMC factsheets, broker reports, or news sources. Summarise in our own words and cite the source.

### 2.2 Data privacy
- **PII at rest must be encrypted** in Supabase using row-level security (RLS) policies that restrict access to the user themselves and authenticated admin roles.
- **PAN, Aadhaar, bank account numbers never logged** in plaintext. Mask in all logs and AI prompts (e.g. `XXXXX1234`).
- **Client data never sent to Claude API in identifiable form** — strip name, PAN, email, phone before any API call. Use opaque client IDs only.
- **DPDP Act 2023 compliance**: explicit consent screens for data collection, right-to-erasure endpoint, data export endpoint.

### 2.3 AI safety
- All AI-generated financial recommendations must be reviewed by a licensed advisor (Ashish or RIA-licensed staff) before being delivered to client. Build an **admin review queue** for AI outputs above defined risk thresholds.
- AI prompts must explicitly instruct Claude to **refuse to give specific stock recommendations** in Phase 1 (pre-RIA). Only educational analysis allowed.

---

## 3. Architecture (target end-state)

```
┌─────────────────────────────────────────────────────────────┐
│                    React 18 + Vite (Netlify)                │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐    │
│  │ Marketing   │  │ App (auth'd) │  │ Admin dashboard  │    │
│  │ auriswealth │  │ wealth.auris │  │ (Ashish/staff)   │    │
│  │ .co         │  │ 8.com        │  │                  │    │
│  └─────────────┘  └──────────────┘  └──────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Supabase (hbddsvwghboftjsgtate)                │
│  • Postgres (with RLS on every table)                       │
│  • Auth (Google OAuth + email/OTP fallback)                 │
│  • Storage (client documents, generated PDFs)               │
│  • Edge Functions (Deno-based, TypeScript)                  │
│  • Realtime (for live portfolio updates)                    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  External integrations                       │
│  • Claude API (Sonnet 4) — all AI generation                │
│  • Razorpay — domestic payments                             │
│  • Stripe — international payments (Phase 4)                │
│  • CAMS / KFintech CAS APIs — MF data import                │
│  • NSE/BSE market data — via Alpha Vantage or Marketstack   │
│  • CoinGecko API — crypto prices                            │
│  • WhatsApp Business API — client alerts                    │
│  • SendGrid / Resend — transactional email                  │
│  • DigiLocker — PAN/Aadhaar verification (Phase 2)          │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Module-by-module build specification

Build modules in the order listed. Each module ships as a self-contained, testable unit before moving to the next. Each module has a definition of done — do not mark complete until every criterion is met.

---

### Module 1 — Foundation upgrade

**Goal:** Bring the existing WealthWise codebase to a state that can support the new modules without refactoring later.

**Tasks:**
1. **Audit current schema.** Use the Supabase MCP server or SQL CLI to dump the current schema. Document every existing table in a `SCHEMA.md` file in the repo root.
2. **Add normalised tables for new entities** (see Section 5 for the full schema). Do not modify existing tables — add new ones alongside.
3. **Enable RLS on every table** using the policy template: `auth.uid() = user_id`. Test that user A cannot read user B's rows.
4. **Add structured logging** via Supabase's built-in logging. Every Edge Function logs request ID, user ID (or `anonymous`), function name, latency, success/error.
5. **Set up environment variables** for: Claude API key, Razorpay keys, market data API keys, WhatsApp Business token, SendGrid key. Use Supabase Vault for secrets, never commit to repo.
6. **Add an admin role.** Create an `admin_users` table; gate admin dashboard routes behind a check on `auth.jwt() ->> 'role' = 'admin'`.
7. **Set up unit testing** with Vitest for React components, Deno test for Edge Functions. CI runs tests on every PR via GitHub Actions.

**Definition of done:**
- Existing features (SWOT, cashflow, net worth, goals, retirement, AI insights) work unchanged
- All new tables created with RLS policies and a sample row inserted/read/updated/deleted via the policies
- One end-to-end test passes (sign in, view dashboard, sign out)
- README updated with setup instructions for a fresh developer

---

### Module 2 — Unified portfolio aggregator

**Goal:** Single source of truth for everything a client owns across every asset class. This is the data foundation for every other feature.

**Asset classes supported:**
- Mutual funds (equity, debt, hybrid, ELSS, gold, international)
- Direct equity (NSE/BSE listed)
- PMS holdings (read-only, manually entered or PDF-imported)
- AIF holdings (read-only, manually entered)
- Unlisted shares (manually entered with last-known valuation)
- Cryptocurrency (manually entered with live price from CoinGecko)
- Fixed deposits, bonds, NCDs
- Real estate (manually entered, periodic revaluation)
- Gold (physical + digital + SGB + gold ETF)
- NPS, EPF, PPF, gratuity entitlements
- Insurance policies (term, ULIP, endowment, health)
- Loans and liabilities (home loan, personal loan, credit card)

**Input methods (in priority order):**
1. **CAMS / KFintech CAS PDF import** — user uploads their Consolidated Account Statement, parser extracts every MF transaction with cost basis, units, date. Use the Python library `casparser` (port to TypeScript or call via a Python Edge Function).
2. **Manual entry forms** — for everything not covered by CAS (PMS, AIF, unlisted, crypto, real estate, etc.)
3. **CSV upload** — for power users with existing tracking spreadsheets
4. **API integration** (Phase 3) — direct broker integration via SmallcaseHQ Gateway or similar

**Build:**
- React components: `PortfolioDashboard`, `AssetTypeView`, `AddAssetForm`, `CASUploader`
- Edge Function: `parse-cas-pdf` (takes uploaded PDF, returns structured JSON of MF holdings)
- Edge Function: `fetch-live-prices` (cron job, runs at 4:30 PM IST daily, updates current NAV for all MF and stock holdings)
- Edge Function: `fetch-crypto-prices` (every 4 hours, via CoinGecko)
- Visual dashboard showing total net worth, asset allocation pie chart, top holdings, change vs last month

**Definition of done:**
- User can upload a CAS PDF and see all their MF holdings populated correctly with cost basis and current value
- User can manually add a PMS holding (provider name, scheme, NAV/valuation date, amount invested, current value, IRR)
- User can add a crypto holding (coin, exchange, units, purchase price, purchase date) and current value auto-updates from CoinGecko
- Net worth calculation includes every asset class
- Asset allocation chart correctly categorises everything into equity / debt / alternative / real estate / cash

---

### Module 3 — AI wealth planner (the hero feature)

**Goal:** Replicate the depth of the Equentis financial plan, delivered as software. This is the differentiator that justifies the entire product.

**Sections to generate** (mirror the Equentis template structure):
1. **Personal details summary** — pulled from user profile
2. **SWOT analysis** — AI-generated based on the user's full financial picture (already exists, upgrade to use full portfolio data from Module 2)
3. **Risk profile** — questionnaire (10 questions, scoring 1-50), output: Conservative / Moderate / Aggressive
4. **Key assumptions** — inflation, equity returns, debt returns, gold, real estate, life expectancy, income growth (user-adjustable defaults from Equentis template, Section 11)
5. **Financial goals** — multi-goal planner: retirement, children's education, children's wedding, home purchase, car, vacation, emergency fund. For each: target year, future value, lumpsum required, SIP required
6. **Current cashflow** — income vs expense, savings rate
7. **Cashflow analysis** — projected over next 30 years with inflation
8. **Net worth analysis** — current breakdown + projected growth
9. **Asset analysis** — deep dive into each asset class with returns, risk, allocation
10. **Asset allocation** — current vs recommended (based on risk profile)
11. **Goal planning** — year-wise breakdown of how each goal is funded
12. **Retirement planning** — multi-scenario modelling (retire at 50, 55, 60, 65)
13. **Retirement corpus** — calculation with inflation-adjusted withdrawal
14. **Projected cashflow 5 years** — detailed table
15. **Insurance planning** — life cover gap, health cover gap, disability cover
16. **Recommendations** — action items prioritised by impact

**Build:**
- React component: `WealthPlanWizard` (multi-step form, saves progress as user navigates)
- React component: `WealthPlanReport` (the final report view — clean, professional, downloadable as PDF)
- Edge Function: `generate-wealth-plan` (takes the user's full data, calls Claude API with structured prompts for each section, returns the plan as JSON)
- Edge Function: `export-wealth-plan-pdf` (renders the plan as a branded Auris PDF using `puppeteer` or `react-pdf`)
- Store generated plans in `wealth_plans` table with versioning — every regeneration creates a new version, old versions kept for audit

**The AI prompts (critical):**

Each section gets its own Claude API call with a tightly scoped system prompt. Do **not** ask Claude to generate the entire 30-page plan in one call — it will lose coherence, run out of tokens, and hallucinate. Break it into 16 focused calls (one per section), each with the relevant subset of user data.

Example system prompt for SWOT (template — apply same pattern to every section):

```
You are a SEBI-compliant financial planning assistant generating a SWOT analysis
for an Indian investor. Use the data provided to identify genuine Strengths,
Weaknesses, Opportunities, and Threats. Do NOT recommend specific securities.
Use educational framing — say "you may wish to consider" not "you should buy".
Output as JSON: {"strengths": [...], "weaknesses": [...], "opportunities": [...], "threats": [...]}.
Each bullet must be specific to the user's data, not generic advice.
Maximum 5 bullets per quadrant.
Mandatory: Do not state any guaranteed returns. Do not name specific funds, stocks, or securities.
```

User data passed to Claude must be anonymised — pass `client_id: "user_abc123"`, never the name.

**Definition of done:**
- A user with complete portfolio data can generate a wealth plan in under 60 seconds
- The plan covers all 16 sections with content specific to that user
- Plan exports as a clean PDF with Auris branding (navy + gold, icon-only logo)
- Every page of the plan carries the mandatory disclaimer
- Admin can view all generated plans in the admin dashboard for quality review

---

### Module 4 — Tax-loss + gain harvesting engine

**Goal:** Build the India-adapted version of Wealthfront's tax-loss harvesting that I designed in the previous Claude conversation. Re-read that conversation's notes before starting.

**Two engines in one:**
1. **Loss harvest engine** — flags unrealised losses that can be booked to offset gains
2. **Gain harvest engine** — flags LTCG room (₹1.25L exemption per FY) that should be realised tax-free to reset cost basis

**Build:**
- Database: `tax_lots` table with `lot_id, client_id, isin, units, purchase_nav, purchase_date, fund_house, fund_category, current_nav, unrealised_gain_loss`
- Edge Function: `daily-harvest-scanner` (cron: every weekday at 4:30 PM IST). For every tax lot, evaluates loss and gain harvest opportunities against thresholds (configurable per user)
- Database: `harvest_alerts` table with `alert_id, client_id, lot_id, alert_type ('loss'|'gain'), unrealised_amount, recommended_action, replacement_isin, status ('pending'|'sent'|'acted'|'ignored'), created_at`
- Database: `fund_correlations` table — manual map of "similar but not identical" fund pairs for swap recommendations
- Edge Function: `march-31-sprint` — kicks in Jan 1 each year, generates a personalised "₹1.25L LTCG harvest plan" for every active client
- React component: `HarvestDashboard` showing current opportunities, year-to-date realised gains/losses, projected tax savings
- React component: `HarvestAlertCard` (per-alert detail with sell instruction, replacement ISIN, and a "Mark as acted" button)
- WhatsApp Business + email integration for alert delivery (user choice in settings)

**Hard rule:** All alerts framed as educational. Until RIA licence is live, every alert ends with: *"This is an educational alert, not investment advice. Please discuss with your CA before acting."*

**Definition of done:**
- Scanner runs daily and creates alerts where appropriate
- User can view alerts in the dashboard with clear sell-and-rebuy instructions
- March 31 sprint runs in Jan-March each year and delivers personalised plans
- All alerts include the mandatory disclaimer
- Year-end report generates a capital gains schedule the user can hand to their CA

---

### Module 5 — Product distribution layer (MF, PMS, AIF)

**Goal:** The revenue engine. Allow clients to browse, compare, and (Phase 2) execute investments in distributed products.

**Phase 1 — Catalog and education:**
- Database: `products` table covering MFs, PMS schemes, AIF schemes. Fields: `product_id, type, name, fund_house, category, AUM, expense_ratio, returns_1y/3y/5y, min_investment, NAV, factsheet_url, our_rating`
- React component: `ProductCatalog` with filters (type, category, risk, returns, min investment)
- React component: `ProductDetail` page with factsheet summary, AI-generated "fit for your goals" analysis
- Edge Function: `analyse-product-fit` — given a product and a client's profile, generates a structured analysis of whether this fits their goals (uses Claude API)

**Phase 2 — Execution:**
- For MFs: BSE StAR MF or NSE NMF II integration for transaction execution
- For PMS/AIF: digital onboarding flow that generates the required docs (Application Form, RAA, KYC) and routes them to the fund house
- Tracking of all transactions in `distribution_transactions` table for commission reconciliation
- Razorpay integration for one-time advisory fees

**Definition of done (Phase 1):**
- Catalog populated with at least top 50 MFs across categories, top 20 PMS schemes, top 10 AIF schemes
- User can search, filter, and view details
- Each product has an AI-generated fit analysis for the logged-in user
- Compliance disclaimers on every product page

---

### Module 6 — Unlisted shares + pre-IPO module

**Goal:** Tracking, valuation, and (Phase 2) trading of unlisted shares — a key HNI feature missing from every competing Indian platform.

**Phase 1:**
- Database: `unlisted_holdings` table with `holding_id, client_id, company_name, shares_held, purchase_price, purchase_date, last_known_valuation, valuation_date, source`
- Form for manual entry including upload of share certificate / DP statement
- AI summary of each company's news, financials, and IPO likelihood (Claude API + web search tool)
- Liquidity indicator — shows which unlisted shares have active platforms (UnlistedArena, Stockify, Precize) currently quoting bid/ask

**Phase 2:**
- Direct partnership with one unlisted platform for inline trading
- Revenue: 1-3% transaction commission

**Definition of done (Phase 1):**
- Users can add unlisted holdings with full details
- Holdings appear in portfolio dashboard
- AI generates a quarterly "news + valuation" update per company
- Disclaimer that unlisted shares are illiquid and high-risk on every screen

---

### Module 7 — Crypto module

**Goal:** Treat crypto as a regular asset class within the portfolio, with India-specific tax handling.

**Build:**
- Database: `crypto_holdings` table with `holding_id, client_id, coin_id, exchange, units, purchase_price_inr, purchase_date, current_price_inr`
- Live price refresh from CoinGecko every 4 hours via Edge Function
- Tax calculation engine for India's 30% flat tax + 1% TDS rule on crypto
- AI summary of major crypto news per holding (BTC, ETH, top 50 by market cap)
- Read-only integration with CoinDCX / CoinSwitch (Phase 2) for auto-import

**Hard rule:** No execution of crypto trades from WealthWise (regulatory grey zone). Educational and tracking only.

**Definition of done:**
- Users can add crypto holdings
- Prices auto-update
- Tax liability calculator shows current FY's crypto tax obligation
- Disclaimer: "Cryptocurrency in India is subject to 30% flat tax with no loss set-off, plus 1% TDS on transactions over ₹50,000/year."

---

### Module 8 — Stock advisory + research module

**Goal:** SEBI-Research-Analyst-compliant equity research delivery (post-licence) or educational stock analysis (pre-licence).

**Phase 1 (pre-licence — educational only):**
- Curated stock watchlists by theme (defensive, growth, value, dividend, smallcap)
- AI-generated company summary on demand (Claude + web search of latest filings)
- Fundamental data via Marketstack or Alpha Vantage API
- Technical chart embedded from TradingView widget

**Phase 2 (post-Research-Analyst licence):**
- Actual buy/sell/hold recommendations with target prices and rationale
- Daily/weekly research notes
- Subscription tier: ₹5,000-25,000/year

**Definition of done (Phase 1):**
- Users can search any NSE/BSE-listed stock
- Each stock page shows fundamentals, news, chart, AI summary
- Watchlists let users track stocks without recommendation language
- "Educational only" disclaimer on every stock page

---

### Module 9 — Topmate consultation booking integration

**Goal:** Convert WealthWise users into paying consultation clients. (User said "music points" — I'm reading as "Topmate" which is the existing consultation booking tool.)

**Build:**
- Embed Topmate widget (`topmate.io/auris8`) on the dashboard with contextual hooks
- Trigger Topmate booking prompt when a user generates a wealth plan ("Want to discuss this with Col Ashish? Book a 30-min call")
- Trigger booking prompt after high-value harvest alerts ("This is a complex situation — book a call to discuss")
- Track conversion in analytics

**Definition of done:**
- Topmate widget present on dashboard, plan review, and high-value alert pages
- Bookings tracked in `consultation_bookings` table for analytics
- Post-booking, Ashish gets a Slack/email notification with the user's portfolio summary

---

### Module 10 — Subscription & payment tiers

**Goal:** Monetise the platform across mass-market, premium, and HNI tiers.

**Tier structure:**

| Tier | Price | What's included |
|------|-------|------------------|
| Free | ₹0 | Portfolio dashboard, basic SWOT, 1 wealth plan per year |
| Premium | ₹999/month or ₹9,999/year | Unlimited wealth plans, harvesting engine, all asset modules, alerts |
| HNI | ₹49,999/year | Premium + quarterly review call with advisor, custom PMS/AIF allocations |
| Enterprise (defence officers / corporate) | Custom | Premium for groups, white-labelled reports |

**Build:**
- Database: `subscriptions` table with `sub_id, user_id, tier, start_date, end_date, razorpay_subscription_id, status`
- Razorpay integration: subscription plans + one-time payments
- React component: `PricingPage` and `BillingDashboard`
- Feature flag system: every premium feature checks `user.tier` before rendering
- Free tier limits enforced server-side (not just UI hide)
- Trial: 14-day premium trial on sign-up

**Definition of done:**
- User can subscribe via Razorpay
- Feature gates correctly restrict free users
- Cancel and renew flows work
- Failed payment handling with retry logic
- Receipts auto-generated and emailed

---

### Module 11 — Defence officer specialisation (the moat)

**Goal:** Build the defence-officer-specific features that no competing platform offers. This is Ashish's defensive moat.

**Build:**
- Onboarding question: "Are you a serving / retired defence personnel?" → unlocks defence module
- Database: `defence_profile` table with `user_id, service (Army/Navy/Air Force), commission_type, current_rank, years_of_service, retirement_age, pension_status, OROP_applicable`
- Specialised calculators:
  - **OROP pension projection** — calculates expected lifetime pension based on rank, service, OROP revisions
  - **Commutation calculator** — should you commute pension or take full monthly?
  - **DSOP fund projection** — projects DSOP corpus at retirement
  - **AGIF / NGIS / AFGIS benefits**
  - **Resettlement allowance + leave encashment** modelling
  - **CSD vs civilian purchase** cost comparator (cars, electronics)
  - **ECHS vs civilian health insurance** gap analysis
  - **Cantonment housing vs civilian housing** opportunity cost
- AI-generated retirement plan specifically optimised for defence cashflow profile

**Definition of done:**
- All defence calculators give accurate results matching official government formulas
- A serving Colonel can generate a full retirement plan in under 5 minutes that includes pension, DSOP, gratuity, resettlement
- Disclaimer that pension and OROP rules are subject to change

---

### Module 12 — Global expansion foundation (Phase 4)

**Goal:** Prepare the platform for global users (NRIs, Dubai expats, eventual non-Indian customers).

**Build:**
- Multi-currency support — every monetary value stored with currency code; UI displays in user's preferred currency with live FX
- Stripe integration alongside Razorpay (Stripe for non-INR billing)
- Multi-language support (i18n framework: react-i18next) — start with English only, structure for Hindi + Arabic later
- Tax engine pluggable by jurisdiction — India tax rules in their own module, structure for adding UAE, UK, US tax rules later
- Compliance gating — features that require licence in a jurisdiction get gated by user's country. Indian regulatory features hidden for non-India users; vice versa.

**Definition of done:**
- A user in Dubai can sign up, see prices in AED, get a US$-denominated wealth plan, and not see India-specific tax features
- Stripe payment flow works for international cards
- Backend supports adding a new country in under a week of dev work

---

## 5. Database schema (new tables — additive to existing)

```sql
-- Portfolio aggregation
create table tax_lots (
  lot_id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  isin text not null,
  fund_house text,
  fund_category text,
  units numeric(18,4) not null,
  purchase_nav numeric(12,4) not null,
  purchase_date date not null,
  current_nav numeric(12,4),
  current_value numeric(15,2),
  unrealised_gain_loss numeric(15,2),
  holding_type text check (holding_type in ('equity_mf','debt_mf','hybrid_mf','elss','direct_equity','etf')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table pms_holdings (
  holding_id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  provider_name text not null,
  scheme_name text not null,
  invested_amount numeric(15,2) not null,
  current_value numeric(15,2),
  valuation_date date,
  irr numeric(6,2),
  inception_date date,
  notes text,
  created_at timestamptz default now()
);

create table aif_holdings (
  holding_id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  fund_name text not null,
  category text check (category in ('Cat I','Cat II','Cat III')),
  committed_amount numeric(15,2) not null,
  drawn_amount numeric(15,2),
  current_nav numeric(15,2),
  vintage_year int,
  expected_exit_year int,
  created_at timestamptz default now()
);

create table unlisted_holdings (
  holding_id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  company_name text not null,
  shares_held numeric(15,4) not null,
  purchase_price numeric(15,2) not null,
  purchase_date date not null,
  last_known_valuation numeric(15,2),
  valuation_date date,
  source text,
  notes text,
  created_at timestamptz default now()
);

create table crypto_holdings (
  holding_id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  coin_id text not null,
  coin_symbol text not null,
  exchange text,
  units numeric(20,8) not null,
  purchase_price_inr numeric(15,2) not null,
  purchase_date date not null,
  current_price_inr numeric(15,2),
  created_at timestamptz default now()
);

create table real_estate_holdings (
  holding_id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  property_type text,
  location text,
  purchase_price numeric(15,2),
  purchase_date date,
  current_valuation numeric(15,2),
  valuation_date date,
  rental_income_monthly numeric(15,2),
  loan_outstanding numeric(15,2),
  created_at timestamptz default now()
);

create table insurance_policies (
  policy_id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  policy_type text check (policy_type in ('term','endowment','ulip','health','disability','critical_illness')),
  insurer text not null,
  policy_name text,
  sum_assured numeric(15,2),
  annual_premium numeric(15,2),
  start_date date,
  maturity_date date,
  current_value numeric(15,2),
  created_at timestamptz default now()
);

create table liabilities (
  liability_id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  liability_type text check (liability_type in ('home_loan','personal_loan','car_loan','education_loan','credit_card','other')),
  lender text,
  outstanding_amount numeric(15,2),
  emi numeric(15,2),
  interest_rate numeric(5,2),
  tenure_months_remaining int,
  created_at timestamptz default now()
);

-- Tax harvesting
create table harvest_alerts (
  alert_id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  lot_id uuid references tax_lots(lot_id),
  alert_type text check (alert_type in ('loss_harvest','gain_harvest')),
  unrealised_amount numeric(15,2),
  recommended_action text,
  replacement_isin text,
  estimated_tax_saving numeric(15,2),
  status text check (status in ('pending','sent','acted','ignored','expired')) default 'pending',
  created_at timestamptz default now(),
  acted_at timestamptz
);

create table fund_correlations (
  source_isin text,
  alternate_isin text,
  correlation numeric(4,3),
  category_match boolean,
  primary key (source_isin, alternate_isin)
);

-- Wealth plans (versioned)
create table wealth_plans (
  plan_id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  version int not null,
  plan_json jsonb not null,
  pdf_url text,
  generated_at timestamptz default now(),
  reviewed_by uuid references admin_users(user_id),
  reviewed_at timestamptz
);

-- Subscriptions
create table subscriptions (
  sub_id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  tier text check (tier in ('free','premium','hni','enterprise')),
  start_date date not null,
  end_date date,
  razorpay_subscription_id text,
  stripe_subscription_id text,
  status text check (status in ('active','cancelled','past_due','trial')) default 'trial',
  created_at timestamptz default now()
);

-- Risk profile
create table risk_profiles (
  profile_id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  score int,
  category text check (category in ('Conservative','Moderate','Aggressive')),
  responses_json jsonb,
  assessed_at timestamptz default now()
);

-- Goals
create table financial_goals (
  goal_id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  goal_name text not null,
  goal_type text check (goal_type in ('retirement','education','wedding','home','car','vacation','emergency','other')),
  target_amount_today numeric(15,2),
  target_year int,
  inflation_rate numeric(5,2),
  future_value numeric(15,2),
  sip_required numeric(15,2),
  lumpsum_required numeric(15,2),
  priority int check (priority between 1 and 5),
  created_at timestamptz default now()
);

-- Defence-specific
create table defence_profile (
  profile_id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  service text check (service in ('Army','Navy','Air Force')),
  commission_type text,
  current_rank text,
  years_of_service int,
  retirement_age int,
  pension_status text check (pension_status in ('serving','retired_with_pension','retired_no_pension')),
  orop_applicable boolean,
  dsop_balance numeric(15,2),
  created_at timestamptz default now()
);

-- Admin
create table admin_users (
  user_id uuid primary key references auth.users(id),
  role text check (role in ('founder','advisor','compliance','support')),
  created_at timestamptz default now()
);

-- RLS on every table
alter table tax_lots enable row level security;
create policy "Users see only their tax lots" on tax_lots for all using (auth.uid() = user_id);
-- repeat for every table above
```

---

## 6. AI prompt engineering principles

Every Claude API call from WealthWise must follow these rules:

1. **One section per call.** Never ask Claude to generate the entire wealth plan in one call.
2. **Structured output only.** Always request JSON output with a defined schema. Parse and validate before storing.
3. **Anonymised data.** Strip name, PAN, email, phone before sending to Claude.
4. **Mandatory compliance instruction** in every system prompt: *"Do not recommend specific securities. Do not promise guaranteed returns. Use educational framing only."*
5. **Token budget per call:** target 2000-4000 input tokens, 1000-2000 output. If the data is larger, summarise first or split.
6. **Temperature:** 0.3 for analytical sections (SWOT, projections), 0.7 for narrative sections (commentary, summary)
7. **Retry on failure** with exponential backoff (1s, 2s, 4s). Surface error to admin queue after 3 failures.
8. **Cache** identical input → output for 24 hours to reduce API costs.

---

## 7. Branding (apply consistently)

- **Logo:** Auris icon-only (navy + gold)
- **Colours:** Navy `#0B2447`, Gold `#FFB800`, off-white `#F8F7F2`, deep charcoal `#1A1A1A`
- **Typography:** Headings — Playfair Display or similar serif; Body — Inter or System UI
- **Tone:** Professional, calm, military precision. Avoid hyperbolic language. Use Indian conventions (₹, lakhs/crores not millions/billions).

---

## 8. Testing strategy

- **Unit tests** for every calculation function (SIP, lumpsum, retirement corpus, tax computation, etc.). Use Vitest.
- **Integration tests** for every Edge Function. Use Deno test.
- **End-to-end tests** for critical flows (sign-up, generate wealth plan, harvest alert): Playwright.
- **Compliance tests:** Snapshot tests of AI outputs to ensure no banned phrases ("guaranteed return", "you will earn", "best stock") appear.
- **Performance budget:** dashboard loads in < 2s on 4G; wealth plan generation < 60s; harvest scanner completes for 10,000 users in < 10 minutes.

---

## 9. Deployment & monitoring

- **CI/CD:** GitHub Actions builds and tests on every push; deploys to Netlify preview on PR, production on merge to main
- **Database migrations:** every schema change via Supabase migration files, never direct edits in dashboard
- **Error monitoring:** Sentry (free tier) for frontend; Supabase logs + custom Slack alerts for Edge Function errors
- **Uptime monitoring:** Better Uptime free tier
- **Cost monitoring:** weekly alert on Claude API spend exceeding ₹5,000 (initially), Supabase usage exceeding free tier

---

## 10. What NOT to build (deliberate scope cuts)

To prevent scope creep — do not build any of these without an explicit instruction from Ashish:

- Discretionary portfolio management (needs SEBI PMS licence + ₹5Cr capital)
- Crypto exchange functionality (regulatory grey zone)
- Loan origination (NBFC licence)
- Direct stock trading execution (needs broker partnership)
- Tax filing (separate domain, partner with ClearTax/Quicko instead)
- Estate planning legal documents (partner with iWill or similar)

---

## 11. Reference: Equentis financial plan structure

Mirror the section headings and structure of the Equentis financial plan that Ashish has been delivered (in project knowledge: `FP_Note_Col_Ashish_Bhardwaj_02092024.pdf`). The intent is to deliver an equally rigorous product, generated by software, continuously updated.

Key assumption defaults (user-adjustable):
- General inflation: 6%
- Education inflation: 10%
- Medical inflation: 12%
- Equity returns: 12% (we use a conservative figure, not Equentis' 15%)
- Debt returns: 6%
- Gold: 7%
- Real estate: 5%
- Life expectancy: 85 years (default; adjustable)
- Income growth: 5% p.a. (default; adjustable)

---

## 12. Phase order summary

| Phase | Modules | Duration target |
|-------|---------|------------------|
| 1 | M1, M2, M3, M11 | 6-8 weeks |
| 2 | M4, M5 (Phase 1), M10 | 4-6 weeks |
| 3 | M5 (Phase 2), M6, M7, M8, M9 | 6-8 weeks |
| 4 | M12 (global), M5 (Phase 3) | 8-12 weeks |

---

## 13. Mandatory disclaimer (paste on every recommendation, every report, every advice-shaped output)

> WealthWise is an educational financial planning tool offered by Auris Pvt Ltd (CIN: U70200HR2026PTC141922). The analysis, projections, and information provided are based on the data you have entered and assumptions about future returns, inflation, and other variables that may not materialise. This is not investment advice. Investments in securities, mutual funds, PMS, AIF, unlisted shares, and cryptocurrency are subject to market risks. Read all scheme-related documents carefully before investing. Past performance is not indicative of future returns. Please consult a SEBI-registered investment adviser, a chartered accountant, and a tax professional before acting on any information provided here. Auris Pvt Ltd does not guarantee any returns and is not liable for any losses arising from decisions taken based on this platform.

---

## 14. Working session conventions for Claude Code

When Ashish (or any developer) opens Claude Code in this repo:

1. **Start every session** with: *"Read CLAUDE.md and SCHEMA.md. Summarise the current build state."*
2. **For new module work**, paste the module number: *"Build Module 4 from CLAUDE.md."*
3. **For bug fixes**, paste the file path and error: *"Fix the error in src/pages/Dashboard.tsx — [paste error]."*
4. **For schema changes**, always: *"Generate a Supabase migration file for [change], then update SCHEMA.md."*
5. **Before committing**: *"Run the test suite and show me any failures."*
6. **Never delete code without asking.** Always: *"Show me the diff before applying."*
7. **Compliance check** before deploying: *"Scan all AI prompts and user-facing strings for banned phrases (guaranteed return, will earn, best stock, recommend) and report any violations."*

---

## 15. v2 feature additions shipped in this repo

The following client-facing features were added on top of the original WealthWise planner (all in `src/App.jsx`, no new dependencies):

1. **On-track / off-track traffic light per goal** — each goal in the report shows a 🟢/🟡/🔴 status and a funding-coverage bar. Coverage is computed in `computeGoalFunding()`, which greedily allocates current financial assets (as lumpsum) and monthly savings (as SIP) to goals in priority order, then by urgency. A summary strip tallies on/at-risk/off-track counts.
2. **Lifecycle support visualisation** — `LifecycleSupport` renders a four-stage trust timeline on the landing page: pre-investment due diligence → transaction execution → post-investment reporting → exit & rebalancing.
3. **Drill-down asset allocation** — `DrillDownAllocation` is a Recharts pie with breadcrumb navigation. Click a slice to zoom in: asset class → holding → sector → geography (sector/geography come from optional `detail` on each asset; demo data includes it).
4. **Customisable PDF report** — `PdfExportModal` lets the user pick which sections to include, add a personal note, and toggle a branded cover page, then exports via the browser's print-to-PDF (`@media print` styles hide nav/footer/buttons). The artifact is forwardable to a CA, spouse or partner.
5. **Financial Freedom Number** — a hero section in the report showing the corpus at which work becomes optional (the FI / FIRE number = annual expenses ÷ 4% safe-withdrawal rate ≈ 25×). Shows progress vs current financial assets, the passive income those assets generate, the remaining gap, and an estimated years-to-freedom projection using the portfolio return and expense inflation.
6. **Guided Plan tab (YNAB-style)** — a separate entry point (`✨ Guided Plan` in the navbar → `page === "guided"`, component `GuidedPlanWizard`) that does NOT alter the existing landing/detailed-planner. It asks ~11 simple, plain-language multiple-choice questions one at a time (life stage, dependents, home/car, spending style, risk, primary goal, target freedom age), then a short numbers step whose fields adapt to the answers. `buildGuidedData()` maps the answers + numbers into the existing plan data model, then it renders a YNAB-style "Monthly Money Plan" budget card (`GuidedBudgetCard`, give-every-rupee-a-job) on top of the full existing `ReportView` (so traffic-lights, Freedom Number, drill-down and PDF all come for free).

---

*End of CLAUDE.md. This file is the source of truth. Update it as the product evolves.*
