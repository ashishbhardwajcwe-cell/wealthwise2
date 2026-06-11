// Shared brand theme for marketing pages (mirrors values from src/App.jsx).
export const T = {
  navy: "#0A1628", midnight: "#0F2035", ocean: "#142D4C",
  gold: "#C9A84C", goldLight: "#E4CC7A", goldDim: "#A08030",
  cream: "#FFFDF5", parchment: "#FFF9EC", sand: "#F5EFE0",
  white: "#FFFFFF", offwhite: "#FAFAF7",
  slate: "#5A6B80", steel: "#8899AA", silver: "#C4CDD5",
  emerald: "#10B981", ruby: "#EF4444", amber: "#F59E0B", teal: "#0891B2",
  chart: ["#0A1628","#C9A84C","#0891B2","#10B981","#F59E0B","#EF4444","#8B5CF6","#EC4899"],
};
export const DISPLAY = `'Cormorant Garamond', 'Playfair Display', Georgia, serif`;
export const BODY = `'Outfit', 'Inter', 'DM Sans', system-ui, sans-serif`;

export const fmtINR = (n) => {
  if (n == null || isNaN(n)) return "₹0";
  const a = Math.abs(n);
  if (a >= 1e7) return `₹${(n/1e7).toFixed(2)} Cr`;
  if (a >= 1e5) return `₹${(n/1e5).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
};
