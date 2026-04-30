export const siteConfig = {
  name: "Rado Web Studio",
  email: "radigoig@gmail.com",
  url: "https://radowebstudio.com",
  description:
    "Premium websites, AI automations, chatbots, client systems, and custom software for small and medium businesses.",
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "Projects", href: "/projects" },
    { label: "Pricing", href: "/#pricing" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/contact" },
  ],
  valuePoints: [
    "Strategy-first builds",
    "Fast, responsive interfaces",
    "Automation-ready foundations",
    "Built to grow with your business",
  ],
  services: [
    {
      title: "Websites and Landing Pages",
      description:
        "Premium marketing pages that make your offer clear, build trust quickly, and guide visitors toward action.",
      icon: "monitor",
    },
    {
      title: "AI Automations",
      description:
        "Practical automations for lead handling, follow-ups, internal workflows, and repetitive business tasks.",
      icon: "sparkles",
    },
    {
      title: "Chatbots and Assistants",
      description:
        "Helpful AI chat experiences for customer questions, lead capture, support triage, and service education.",
      icon: "messages",
    },
    {
      title: "Client Systems",
      description:
        "Simple portals, booking flows, dashboards, and tools that keep teams and customers aligned.",
      icon: "layout",
    },
    {
      title: "Custom Software",
      description:
        "Focused software solutions for the parts of your business that off-the-shelf tools cannot quite solve.",
      icon: "code",
    },
    {
      title: "Product Consulting",
      description:
        "Clear guidance on what to build first, what to skip, and how to turn business goals into a realistic roadmap.",
      icon: "compass",
    },
  ],
  process: [
    {
      step: "01",
      title: "Discover",
      description:
        "We clarify your offer, audience, goals, existing tools, and the best first version to launch.",
    },
    {
      step: "02",
      title: "Design",
      description:
        "I create a clean user journey, polished interface direction, and practical content structure.",
    },
    {
      step: "03",
      title: "Build",
      description:
        "The project is developed with modern, maintainable code and responsive behavior across devices.",
    },
    {
      step: "04",
      title: "Launch and Improve",
      description:
        "We ship the first version, review performance, and plan the next improvements based on real needs.",
    },
  ],
  demoProjects: [
    {
      title: "Barber Studio Website",
      industry: "Local service business",
      problem:
        "A barber studio needs to look premium online, explain services clearly, and make booking feel easy from a phone.",
      solution:
        "A sharp one-page or small multi-page website with service sections, location details, booking CTA, and trust-building visuals.",
      features: [
        "Mobile-first booking CTA",
        "Service and price structure",
        "Google Maps and opening hours",
        "Gallery-ready layout",
      ],
      idealFor: "Barbers, salons, beauty studios, and local appointment-based services.",
      resultPromise:
        "Turn local search and social traffic into more booking inquiries with a polished first impression.",
      slug: "barber-studio-website",
    },
    {
      title: "Fitness Coach Landing Page",
      industry: "Coaching and personal brand",
      problem:
        "A coach needs a focused offer page that explains the transformation, handles objections, and captures qualified leads.",
      solution:
        "A conversion-focused landing page with clear positioning, offer breakdown, proof placeholders, FAQs, and request flow.",
      features: [
        "Offer and program sections",
        "Lead capture CTA",
        "FAQ and objection handling",
        "Mobile-optimized sales flow",
      ],
      idealFor: "Fitness coaches, consultants, educators, and solo service providers.",
      resultPromise:
        "Give visitors a clear reason to inquire instead of leaving your social profile with unanswered questions.",
      slug: "fitness-coach-landing-page",
    },
    {
      title: "Restaurant Website",
      industry: "Hospitality and food",
      problem:
        "A restaurant needs guests to quickly find the menu, hours, location, reservation options, and the feel of the place.",
      solution:
        "A clean restaurant website with menu structure, reservation CTA, location details, and visual sections for atmosphere.",
      features: [
        "Menu-ready page structure",
        "Reservation and call CTA",
        "Location and hours block",
        "Event or private booking section",
      ],
      idealFor: "Restaurants, cafes, bakeries, bars, and hospitality venues.",
      resultPromise:
        "Help guests decide faster, visit with confidence, and contact the business without friction.",
      slug: "restaurant-website",
    },
  ],
  pricing: [
    {
      name: "Launch",
      price: "From EUR 900",
      description:
        "For a business that needs a credible online presence and a clear path for visitors to inquire.",
      features: [
        "1-5 essential pages or one focused landing page",
        "Offer and CTA structure built for inquiries",
        "Responsive design for mobile-first visitors",
        "Basic SEO and launch checklist",
      ],
    },
    {
      name: "Growth",
      price: "From EUR 1,800",
      description:
        "For businesses ready to turn the website into a stronger lead-generation and operations tool.",
      features: [
        "Custom website structure around your services",
        "Request form and lead qualification flow",
        "AI or automation roadmap for follow-up",
        "Analytics-ready setup for future improvement",
      ],
      featured: true,
    },
    {
      name: "Custom",
      price: "Scoped project",
      description:
        "For companies that need a tailored system, portal, automation, or software workflow beyond a website.",
      features: [
        "Product architecture and scope definition",
        "Custom UI, workflows, and system planning",
        "Integration and automation planning",
        "Roadmap for Supabase, auth, and backend phases",
      ],
    },
  ],
  formOptions: {
    services: [
      "Business website",
      "Landing page",
      "AI automation",
      "Chatbot",
      "Custom software",
      "Website redesign",
      "Consulting",
    ],
    budgets: [
      "Under €300",
      "€300–€700",
      "€700–€1500",
      "€1500+",
      "Not sure yet",
    ],
    timelines: [
      "As soon as possible",
      "This month",
      "1–2 months",
      "Flexible",
    ],
  },
  reasons: [
    "You get both product thinking and implementation, not just pixels on a screen.",
    "The first version stays focused so you can launch quickly and improve with confidence.",
    "Every section is written and designed around business clarity, trust, and action.",
    "The technical foundation is ready for future auth, database, payments, and automations.",
  ],
  faqs: [
    {
      question: "Can you start with just a landing page?",
      answer:
        "Yes. A focused landing page is often the best first step when you need to validate an offer, generate leads, or improve your current online presence.",
    },
    {
      question: "Do you build AI automations and chatbots too?",
      answer:
        "Yes, but the first phase stays practical. We identify useful workflows first, then build automations that save time or improve customer communication.",
    },
    {
      question: "Will this be ready for Supabase later?",
      answer:
        "Yes. This foundation is intentionally frontend-only for now, but the structure is ready for future authentication, database, dashboards, and backend logic.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "A focused landing page can often move quickly. Larger websites or custom systems depend on scope, content readiness, and integrations.",
    },
  ],
};
