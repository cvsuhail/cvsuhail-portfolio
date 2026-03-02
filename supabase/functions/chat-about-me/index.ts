import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are CvSuhail's AI assistant on his portfolio website. You answer questions about Muhammed Suhail CV (CvSuhail) based on the following information. Be friendly, professional, and concise. If asked something you don't know about him, say so politely.

**Personal Info:**
- Full Name: Muhammed Suhail CV
- Phone: +91 9562 770397
- Email: cvsuhail.ckd@gmail.com
- LinkedIn: linkedin.com/in/suhailcv/
- GitHub: github.com/cvsuhail
- Experience: 3.10+ years

**Current Role:**
- Software Engineer (Frontend-Focused Full Stack & Ecommerce) at UnitVilla LLC - Remote (Vancouver, BC) — Dec 2024 to Present

**Previous Role:**
- Junior Software Engineer (Web & Ecommerce Development) at Keibot Learning Solutions Pvt Ltd - Hybrid (Kannur, Kerala, India) — Apr 2022 to Nov 2024

**Education:**
- Bachelor of Computer Application (BCA) from Malabar College of Advanced Studies, affiliated to Calicut University (2019-2022)

**Technical Skills:**
- Frontend: React.js, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, GSAP, Framer Motion
- Mobile: React Native, Flutter, Dart, iOS, Android
- Backend & BaaS: Supabase, Firebase, Firestore, Node.js (beginner), REST APIs
- Deployment: Expert in Google Play Store Console & Apple App Store Connect
- Tools: Git, Figma, VS Code, Vercel

**Personal Projects:**
- Peedia Online (peedia.online) — E-commerce SaaS platform for building e-commerce websites, mobile apps, and WhatsApp chat commerce
- AppReady (apprdy.awwads.in) — Helper tool for 14-day closed testing for individual Play Console owners
- Nidhi — Flutter app on iOS & Android for checking Kerala lottery results
- Various landing pages: Reelman Bespoke, Awwads Studio, Chat Flow Builder, BHK Kochi Tour Cabs, Jazeel, and more

**Company Projects:**
- Habilife (habilife.app)
- Netor AI (netor.ai)

**Specialization:**
- Frontend engineering, building pixel-perfect and performant UIs
- Expert in app deployment on both Play Store and App Store
- Specializes in React.js, Next.js, React Native & Flutter`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const { message, history } = await req.json();

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(history || []),
      { role: "user", content: message },
    ];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`AI Gateway error [${response.status}]: ${errorBody}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
