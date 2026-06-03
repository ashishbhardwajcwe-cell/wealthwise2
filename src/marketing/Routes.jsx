import { Routes, Route, Navigate } from "react-router-dom";
import MarketingLayout from "./Layout";
import Home from "./Home";
import ProductPage from "./ProductPage";
import AIWealthPlanner from "./AIWealthPlanner";
import { WealthWise, Audience, About, Contact, Pricing, Legal } from "./SimplePages";
import { BlogIndex, BlogCategory, BlogPost } from "./Blog";
import { ResourcesHub, CalculatorsIndex, CalculatorPage, Glossary, Downloads } from "./Resources";

export default function MarketingRoutes() {
  return (
    <Routes>
      <Route element={<MarketingLayout />}>
        <Route index element={<Home />} />
        <Route path="investment-products">
          <Route index element={<Navigate to="/" replace />} />
          <Route path=":product" element={<ProductPage />} />
        </Route>
        <Route path="ai-wealth-planner" element={<AIWealthPlanner />} />
        <Route path="wealthwise" element={<WealthWise />} />
        <Route path="for/:audience" element={<Audience />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="blog">
          <Route index element={<BlogIndex />} />
          <Route path=":slug" element={<BlogPost />} />
          <Route path="category/:category" element={<BlogCategory />} />
        </Route>
        <Route path="resources">
          <Route index element={<ResourcesHub />} />
          <Route path="glossary" element={<Glossary />} />
          <Route path="calculators" element={<CalculatorsIndex />} />
          <Route path="calculators/:calc" element={<CalculatorPage />} />
          <Route path="downloads" element={<Downloads />} />
        </Route>
        <Route path="legal/:page" element={<Legal />} />
      </Route>
    </Routes>
  );
}
