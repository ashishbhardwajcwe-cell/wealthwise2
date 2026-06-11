import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import MarketingRoutes from './marketing/Routes.jsx'

// Legacy / OAuth deep-links arrive at the marketing root as /?app=1 (Google
// OAuth redirects back there after sign-in) or /?planner=1. Forward them to
// /app so the user lands in the planner instead of the marketing landing.
// The Supabase client (created in App.jsx at module load) has already picked
// up the OAuth code from the URL by the time this renders, so a client-side
// Navigate is safe and the session is preserved.
function MarketingWithDeepLink() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  if (params.get('app') === '1' || params.get('planner') === '1') {
    return <Navigate to="/app" replace />
  }
  return <MarketingRoutes />
}

// /app/*       → the existing WealthWise planner (Landing + Dashboard + Guided Plan)
// /app/guided  → Guided Plan tab inside the app (initialPage="guided")
// /app/dashboard → Dashboard
// everything else → the marketing site
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/app" element={<App />} />
          <Route path="/planner" element={<App />} />
          <Route path="/app/guided" element={<App initialPage="guided" />} />
          <Route path="/app/dashboard" element={<App initialPage="dashboard" />} />
          <Route path="/*" element={<MarketingWithDeepLink />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)
