import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const PIXEL_ID = "1557265498596600";
const ACCESS_TOKEN = Deno.env.get("FACEBOOK_ACCESS_TOKEN") || "EAArF7I3elZB4BP8F5Y9VoagBirMMwCOpmP0DcDzqVjhoFT1SWalkebLdo2JqW9ZCZAZBq88Yf5MGEtgwN9ZCozZCu4fZB4QoUCLCmWSbbm1TpQPZCKiziSActkje0s9wciFIwGDMf0oH6WH27OfnXczWR82d78MJkwNXtspsb2ufsZB5mWH0HuMNirnrioxDSCcakNmwZDZD";

async function sha256(str: string): Promise<string> {
  if (!str) return "";
  const msgBuffer = new TextEncoder().encode(str.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

interface EventData {
  event_name: string;
  event_time: number;
  event_id: string;
  event_source_url: string;
  action_source: string;
  user_data: {
    client_ip_address?: string;
    client_user_agent?: string;
    em?: string[];
    ph?: string[];
    fbp?: string;
    fbc?: string;
    external_id?: string;
  };
  custom_data?: {
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
    currency?: string;
    value?: number;
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const payload = await req.json();
    const {
      event_name,
      event_id,
      event_source_url,
      user_data = {},
      custom_data = {},
    } = payload;

    if (!event_name) {
      return new Response(
        JSON.stringify({ success: false, error: "event_name is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "";
    const userAgent = req.headers.get("user-agent") || "";

    const hashedUserData: EventData["user_data"] = {
      client_ip_address: clientIp,
      client_user_agent: userAgent,
      fbp: user_data.fbp || "",
      fbc: user_data.fbc || "",
    };

    if (user_data.email) {
      hashedUserData.em = [await sha256(user_data.email)];
    }

    if (user_data.phone) {
      hashedUserData.ph = [await sha256(user_data.phone)];
    }

    if (user_data.external_id) {
      hashedUserData.external_id = user_data.external_id;
    }

    const eventData: EventData = {
      event_name,
      event_time: Math.floor(Date.now() / 1000),
      event_id: event_id || crypto.randomUUID(),
      event_source_url: event_source_url || "",
      action_source: "website",
      user_data: hashedUserData,
    };

    if (Object.keys(custom_data).length > 0) {
      eventData.custom_data = custom_data;
    }

    const fbResponse = await fetch(
      `https://graph.facebook.com/v18.0/${PIXEL_ID}/events`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [eventData],
          access_token: ACCESS_TOKEN,
        }),
      }
    );

    const fbResult = await fbResponse.json();

    if (!fbResponse.ok) {
      console.error("Facebook API Error:", fbResult);
      return new Response(
        JSON.stringify({ success: false, error: fbResult }),
        {
          status: fbResponse.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: fbResult }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing Facebook conversion:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});