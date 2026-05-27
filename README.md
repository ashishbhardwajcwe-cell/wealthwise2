# WealthWise — Financial Independence Planner

A comprehensive financial planning web application that generates personalized financial independence reports with SWOT analysis, retirement scenarios, goal planning, and AI-powered recommendations.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Deploy to Netlify

1. Push this repo to GitHub
2. Go to https://app.netlify.com
3. Click "Add new site" → "Import an existing project" → select this repo
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click Deploy

## Features

- Personal financial data input (5-step form)
- SWOT Analysis (auto-generated)
- Net Worth & Asset Allocation charts
- Goal Planning with SIP/Lumpsum calculations
- Retirement Planning (3 scenarios)
- 5-Year Cashflow Projections
- AI Pro Analysis toggle (premium feature)
- Google Sign-In ready (Supabase)
- Cashfree payment integration ready

## Tech Stack

- React 18 + Vite
- Recharts (charts)
- Supabase (auth + database)
- Claude API (AI analysis)
- Cashfree (payments)
