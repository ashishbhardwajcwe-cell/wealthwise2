import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    // Authenticate the user via Supabase JWT
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: req.headers.get("Authorization")! } } }
    );
    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { order_amount, order_currency, order_note } = await req.json();
    if (!order_amount) {
      return new Response(JSON.stringify({ error: "Missing order_amount" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const CF_APP_ID = Deno.env.get("CASHFREE_APP_ID");
    const CF_SECRET = Deno.env.get("CASHFREE_SECRET_KEY");
    if (!CF_APP_ID || !CF_SECRET) {
      return new Response(JSON.stringify({ error: "Payment gateway not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const orderId = "order_" + Date.now() + "_" + crypto.randomUUID().slice(0, 8);
    const customerName = user.user_metadata?.full_name || "Customer";
    const customerEmail = user.email || "customer@auris8.com";
    const customerPhone = user.user_metadata?.phone || "9999999999";

    // Create order via Cashfree API (server-side, secret key stays safe)
    const cfRes = await fetch("https://api.cashfree.com/pg/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": CF_APP_ID,
        "x-client-secret": CF_SECRET,
        "x-api-version": "2023-08-01",
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: order_amount,
        order_currency: order_currency || "INR",
        customer_details: {
          customer_id: user.id,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
        },
        order_meta: {
          return_url: Deno.env.get("PAYMENT_RETURN_URL") || "https://wealth.auris8.com?order_id={order_id}",
        },
        order_note: order_note || "Auris Payment",
      }),
    });

    const cfData = await cfRes.json();

    if (!cfData.payment_session_id) {
      console.error("Cashfree order creation failed:", cfData);
      return new Response(JSON.stringify({ error: "Payment order creation failed" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Return only the session ID and order ID to the frontend (no secret exposed)
    return new Response(JSON.stringify({
      payment_session_id: cfData.payment_session_id,
      order_id: cfData.order_id || orderId,
      cf_order_id: cfData.cf_order_id,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("create-cashfree-order error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
