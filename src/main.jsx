import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import MarketingRoutes from './marketing/Routes.jsx'

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
          <Route path="/app/guided" element={<App initialPage="guided" />} />
          <Route path="/app/dashboard" element={<App initialPage="dashboard" />} />
          <Route path="/*" element={<MarketingRoutes />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)
