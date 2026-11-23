// Project list shared by the Projects section and the downloadable CV
// (scripts/build-cv.ts). Keep it plain data: no JSX or path aliases, so the
// CV script can import it with Node directly.

export type Status = "live" | "building" | "internal";

export type Project = {
  name: string;
  kicker: string;
  category: "saas" | "website" | "hobby";
  year: string;
  status: Status;
  body: string;
  specs?: { label: string; value: string }[];
  image?: string;
  url?: string;
  tag?: string;
};

export const allProjects: Project[] = [
  // 1. Featured SaaS & Mobile Platforms
  {
    name: "FestFloww",
    kicker: "Program management SaaS for SSF Kerala",
    category: "saas",
    year: "2025 — now",
    status: "live",
    image: "/projects/festfloww.png",
    body:
      "SSF runs festivals with thousands of participants spread across hundreds of local units. FestFloww took over registration, judging, live scoring and certificate generation across a multi-level org hierarchy.",
    specs: [
      { label: "Role", value: "Led engineering" },
      { label: "Stack", value: "Next.js · Node.js · MongoDB" },
    ],
    url: "https://festfloww.com",
  },
  {
    name: "Peedia.online",
    kicker: "Multi-tenant ecommerce SaaS platform",
    category: "saas",
    year: "2025 — now",
    status: "building",
    image: "/projects/peedia.online.png",
    body:
      "Cofounded ecommerce SaaS where every merchant gets an independent storefront running on shared multi-tenant infrastructure, with WhatsApp ordering and AI automation.",
    specs: [
      { label: "Role", value: "Cofounder & architect" },
      { label: "Stack", value: "Next.js · Node.js · Postgres" },
    ],
    url: "https://peedia.online",
  },
  {
    name: "HabiLife",
    kicker: "Health and habit tracking across iOS, Android & Web",
    category: "saas",
    year: "2024 — now",
    status: "live",
    image: "/projects/habilife.png",
    body:
      "Built Flutter and React Native mobile apps and Next.js web version at UnitVilla. Features Apple HealthKit sync, offline storage, and push notifications.",
    specs: [
      { label: "Role", value: "Mobile & web lead" },
      { label: "Stack", value: "Flutter · React Native · Next.js" },
    ],
    url: "https://habilife.app",
  },
  {
    name: "Netor.ai",
    kicker: "AI-assisted networking and connection platform",
    category: "saas",
    year: "2025",
    status: "live",
    image: "/projects/netor.png",
    body:
      "Solves low-value networking noise using AI-assisted opportunity discovery and smart connection matching for tech professionals.",
    specs: [
      { label: "Role", value: "Full-Stack Dev" },
      { label: "Stack", value: "React · Node.js · AI APIs" },
    ],
    url: "https://netor.ai",
  },
  {
    name: "AppReady",
    kicker: "Google Play closed-testing automation SaaS",
    category: "saas",
    year: "2025",
    status: "live",
    image: "/projects/AppReady.png",
    body:
      "Tooling that automates Google Play's 14-day closed testing requirement — SDK wiring, tester activity tracking via Cloud Functions.",
    specs: [
      { label: "Role", value: "Creator" },
      { label: "Stack", value: "React · Node.js · Cloud Functions" },
    ],
    url: "https://apprdy.cvsuhail.online",
  },
  {
    name: "Pin&Plan",
    kicker: "Projects, approvals & invoices for creative agencies",
    category: "saas",
    year: "2026",
    status: "live",
    image: "/projects/pinplan.jpg",
    body:
      "One app for creative agencies to plan projects, collect client approvals, send quotations and raise GST invoices. Plan. Approve. Get paid.",
    specs: [
      { label: "Type", value: "Agency SaaS" },
      { label: "Market", value: "India · GST-ready" },
    ],
    url: "https://pinplan.work/",
  },
  {
    name: "Zikkaro",
    kicker: "All-in-one operating system for tour agencies",
    category: "saas",
    year: "2026",
    status: "live",
    image: "/projects/zikkaro.png",
    body:
      "Packages, dated trips, a branded booking site, payments, guides and profit per trip in one place, built for Indian tour and trip agencies.",
    specs: [
      { label: "Type", value: "Travel SaaS" },
      { label: "Market", value: "Indian tour agencies" },
    ],
    url: "https://zikkaro.com/",
  },
  {
    name: "botire ai",
    kicker: "One project, every AI account",
    category: "saas",
    year: "2026",
    status: "live",
    image: "/projects/botire-ai.png",
    body:
      "Free desktop app that keeps one project and its full context while you switch between Claude, ChatGPT, Gemini and more through their official apps.",
    specs: [
      { label: "Type", value: "Desktop App" },
      { label: "Platforms", value: "macOS · Windows · Linux" },
    ],
    url: "https://botire-ai.web.app/",
  },

  // 2. Client Websites & Static Web Experiences
  {
    name: "Kerala Sahityotsav",
    kicker: "Official grand festival web platform",
    category: "website",
    year: "2024",
    status: "live",
    image: "/projects/keralaSahityotsav.png",
    body:
      "Official website for Kerala Sahityotsav — event schedules, live updates, announcements, and participant information delivered with fast page loads.",
    specs: [
      { label: "Type", value: "Event Platform" },
      { label: "Stack", value: "React · Next.js · Tailwind" },
    ],
    url: "https://keralasahityotsav.com",
  },
  {
    name: "Sahityotsav Portal",
    kicker: "State & District cultural festival portal",
    category: "website",
    year: "2024",
    status: "live",
    image: "/projects/sahityotsav.png",
    body:
      "High-traffic cultural festival digital hub handling program details, announcements, and real-time result broadcasts across Kerala.",
    specs: [
      { label: "Type", value: "High-Traffic Hub" },
      { label: "Stack", value: "Next.js · TypeScript" },
    ],
    url: "https://sahityotsav.com",
  },
  {
    name: "Sensorium",
    kicker: "Digital operations & festival web experience",
    category: "website",
    year: "2024",
    status: "live",
    image: "/projects/sensorium.png",
    body:
      "Digital operations and web platform for Sensorium SSF Kerala — workflow coordination, digital passes, and event record management.",
    specs: [
      { label: "Type", value: "Digital Experience" },
      { label: "Stack", value: "Next.js · React" },
    ],
    url: "https://sensorium.ssfkerala.org/",
  },
  {
    name: "Reelman Uniforms",
    kicker: "Custom uniform manufacturing & brand showcase",
    category: "website",
    year: "2024",
    status: "live",
    image: "/projects/reelmanuniforms.png",
    body:
      "Official web showcase for Reelman Uniforms — commercial uniform catalog, custom order inquiries, and brand portfolio.",
    specs: [
      { label: "Type", value: "Brand Showcase" },
      { label: "Stack", value: "React · Tailwind CSS" },
    ],
    url: "https://uniform-company.vercel.app/",
  },
  {
    name: "Reelman Bespoke",
    kicker: "Bespoke tailoring & luxury apparel web experience",
    category: "website",
    year: "2024",
    status: "live",
    image: "/projects/reelmanbespoke.png",
    body:
      "High-end bespoke tailoring digital storefront featuring custom fitting booking, gallery showcases, and brand storytelling.",
    specs: [
      { label: "Type", value: "Luxury Brand Site" },
      { label: "Stack", value: "React · Modern Styling" },
    ],
    url: "https://reelman-bespoke.vercel.app/",
  },
  {
    name: "Yas Orcin",
    kicker: "Creative brand & web experience",
    category: "website",
    year: "2024",
    status: "live",
    image: "/projects/yas.png",
    body:
      "Modern web experience built for Yas Orcin — responsive layouts, interactive elements, and fast Vercel hosting deployment.",
    specs: [
      { label: "Type", value: "Web Experience" },
      { label: "Stack", value: "Next.js · Vercel" },
    ],
    url: "https://yas-orcin.vercel.app",
  },

  // 3. Hobby Projects & Experiments
  {
    name: "PlanUndo",
    kicker: "Social activity discovery & real-world meetups",
    category: "hobby",
    year: "2024",
    status: "live",
    image: "/projects/planundo.png",
    body:
      "Find people nearby, plan activities, and show up. Social discovery platform built around real-world events and activity coordination.",
    tag: "Hobby Project",
    url: "https://planundo-online.vercel.app/",
  },
  {
    name: "BrandQR",
    kicker: "Smart QR code & digital profile generator",
    category: "hobby",
    year: "2024",
    status: "live",
    image: "/projects/brandQR.png",
    body:
      "Custom smart QR codes and digital business profile cards for businesses and professionals to share contact details instantly.",
    tag: "Hobby Project",
    url: "https://brandqr.site",
  },
  {
    name: "Umigle",
    kicker: "Real-time P2P WebRTC video chat application",
    category: "hobby",
    year: "2024",
    status: "live",
    image: "/projects/umigle.png",
    body:
      "Real-time video chat built over WebRTC peer connections without central media server relaying, exploring WebRTC connection resilience.",
    tag: "WebRTC Experiment",
    url: "https://umigle.cvsuhail.online/",
  },
];
