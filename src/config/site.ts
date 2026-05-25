export const siteConfig = {
  name: "Zoro WebStudio",
  owner: "Radoslav Petkov",
  subtitle: "by Radoslav Petkov",
  email: "radigoig@gmail.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Modern websites for restaurants, cafes, shops, and local businesses, built to make customer contact, reservations, and orders easier.",
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "Projects", href: "/projects" },
    { label: "Pricing", href: "/#pricing" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/contact" },
  ],
  valuePoints: [
    "Built for trust and inquiries",
    "Fast mobile-first websites",
    "Clear service presentation",
    "Clear calls, bookings, or orders",
  ],
  services: [
    {
      title: "Local Business Websites",
      description:
        "Modern sites for restaurants, cafes, shops, salons, gyms, and local services, with clear customer actions.",
      icon: "monitor",
    },
    {
      title: "Menus, Products and Online Stores",
      description:
        "Clear menu or product presentation, with a shop setup when customers need to browse and order online.",
      icon: "sparkles",
    },
    {
      title: "Contact, Booking and Ordering Flows",
      description:
        "Forms, maps, reservations, calls, and ordering actions designed to work naturally from a phone.",
      icon: "messages",
    },
    {
      title: "Website Redesign and Improvement",
      description:
        "A clearer, faster and more professional replacement for an old website or social-only presence.",
      icon: "layout",
    },
    {
      title: "Advanced Features When Needed",
      description:
        "Online shops, booking integrations, portals, dashboards or automations quoted around a real business requirement.",
      icon: "code",
    },
    {
      title: "Maintenance and Improvements",
      description:
        "Ongoing support, small updates, performance checks, SEO improvements, and landing page refinements after the first launch.",
      icon: "compass",
    },
  ],
  process: [
    {
      step: "01",
      title: "Request",
      description:
        "You send a short request with your business type, current online presence, and website goal.",
    },
    {
      step: "02",
      title: "Review",
      description:
        "I review what customers need to see and which action should be easiest for them.",
    },
    {
      step: "03",
      title: "Scope",
      description:
        "We clarify scope, timeline, expectations, communication, and what should be included before paid work begins.",
    },
    {
      step: "04",
      title: "Portal",
      description:
        "Approved projects can use a private workspace for details, messages, and progress updates.",
    },
    {
      step: "05",
      title: "Build",
      description:
        "I build the agreed version, share progress, and keep communication organized inside the portal.",
    },
    {
      step: "06",
      title: "Launch",
      description:
        "We review, polish, test the essentials, and launch with a clear next-improvement path.",
    },
  ],
  demoProjects: [
    {
      title: "Cinema Demo",
      industry: "Local cinema and events",
      problem:
        "Visitors need to see films, times, ticket information, and location quickly without searching through social posts.",
      solution:
        "A cinema website concept with programme highlights, ticket information, weekly schedule, and clear mobile actions.",
      features: [
        "Daily and weekly programme",
        "Ticket pricing section",
        "Location and navigation links",
        "Reservation-oriented CTA flow",
      ],
      idealFor: "Cinemas, cultural venues, event spaces, and local entertainment businesses.",
      resultPromise:
        "A live demo showing how programme and ticket information can become easier to find on a phone.",
      slug: "cinema-demo",
      href: "https://cinema-demo-tau.vercel.app/",
      image: "/demos/cinema-demo.png",
    },
    {
      title: "Sofia Cheese Steak",
      industry: "Street food and takeaway",
      problem:
        "A food business needs customers to understand the menu and ordering path within seconds.",
      solution:
        "A food website demo with menu presentation, mobile-first ordering actions, and location details.",
      features: [
        "Hero and signature products",
        "Menu-focused layout",
        "Order or contact CTA",
        "Mobile-first presentation",
      ],
      idealFor: "Takeaways, street food brands, cafes, bakeries, and fast-casual venues.",
      resultPromise:
        "A live demo focused on making the offer easy to understand before a customer orders.",
      slug: "sofia-cheese-steak",
      href: "https://sofia-cheese-steak.vercel.app/",
      image: "/demos/sofia-cheese-steak.png",
    },
    {
      title: "Restaurant Oasis",
      industry: "Restaurant and hospitality",
      problem:
        "A restaurant needs to communicate atmosphere while menu, location, and reservation actions remain easy to reach.",
      solution:
        "A premium restaurant demo with visual presentation, guest information, and clear reservation intent.",
      features: [
        "Restaurant hero presentation",
        "Menu and offer sections",
        "Reservation or contact path",
        "Responsive hospitality layout",
      ],
      idealFor: "Restaurants, cafes, bistros, bars, and hospitality venues.",
      resultPromise:
        "A live demo showing a polished online first impression for restaurant guests.",
      slug: "restaurant-oasis",
      href: "https://restaurant-oasis-demo.vercel.app/",
      image: "/demos/restaurant-oasis.png",
    },
  ],
  pricing: [
    {
      name: "Starter Website",
      price: "From €249",
      description:
        "A clean one-page website that gives a local business a professional online starting point.",
      bestFor:
        "New or small local businesses that need a clear mobile-friendly presence.",
      features: [
        "One focused website page",
        "Services or menu overview",
        "Contact button and inquiry form",
        "Map, hours, and contact information",
        "Mobile-friendly design",
        "Basic SEO setup and deployment",
      ],
    },
    {
      name: "Business Website",
      price: "From €399",
      description:
        "A fuller website for businesses that need clear pages, stronger trust, and easier customer contact.",
      bestFor:
        "Recommended for restaurants, shops, salons, services, and growing local businesses.",
      features: [
        "Three to five pages",
        "Services, menu, gallery, or offers",
        "Contact, call, reservation, or enquiry CTA",
        "Google Maps and business details",
        "Mobile performance and SEO basics",
        "Deployment and analytics setup",
      ],
      featured: true,
    },
    {
      name: "Advanced Website / Online Store",
      price: "From €699+",
      description:
        "A more advanced website or small online store when your offer needs products, ordering, integrations, or more custom structure.",
      bestFor:
        "Businesses selling products online or needing a larger, more tailored website.",
      features: [
        "Advanced page structure and content sections",
        "Product catalogue or online store foundation",
        "Cart/payment integration when agreed",
        "Analytics and performance optimization",
        "Custom integrations quoted clearly",
        "Final quote after a free website review",
      ],
    },
  ],
  maintenancePlans: [
    {
      name: "Basic Care",
      price: "€39/month",
      description: "Simple support for keeping a small website healthy.",
      features: [
        "Website health check",
        "Small text changes",
        "Help with domain/hosting issues",
        "Basic support",
      ],
    },
    {
      name: "Standard Care",
      price: "€59/month",
      description: "A practical monthly plan for regular small improvements.",
      features: [
        "Up to 2 hours of changes per month",
        "Content updates",
        "Small new sections",
        "Monitoring for issues",
        "Monthly summary",
      ],
      featured: true,
    },
    {
      name: "Premium Care",
      price: "€99/month",
      description: "Priority improvement support for stronger ongoing growth.",
      features: [
        "Up to 4 hours of work per month",
        "SEO improvements",
        "Landing page improvements",
        "Performance checks",
        "Priority support",
      ],
    },
  ],
  formOptions: {
    services: [
      "Business website",
      "Starter one-page website",
      "Advanced website / online store",
      "Website redesign",
      "Not sure yet",
    ],
    budgets: [
      "Under €300",
      "€300–€700",
      "€700–€1500",
      "€1500+",
      "Not sure yet",
    ],
  },
  reasons: [
    "You work directly with Radoslav Petkov, from the first website review through build and launch.",
    "The scope stays practical: the pages and actions your customers actually need, presented clearly.",
    "Every build is designed for mobile usability, speed, trust, and an easier contact or order path.",
    "The website can grow into a store or custom functionality later, when the business truly needs it.",
  ],
  faqs: [
    {
      question: "How much does a website cost?",
      answer:
        "A Starter Website begins from €249. A fuller Business Website begins from €399. Advanced websites and online stores begin from €699+ and are quoted after a short review of required pages and features.",
    },
    {
      question: "Are domain and hosting included?",
      answer:
        "Domain, hosting, paid tools, and third-party services are not included in the base price. I help you choose and configure them.",
    },
    {
      question: "How long does it take to build a website?",
      answer:
        "A simple landing page can usually be completed in a few days after the content is ready. A business website usually takes 1-2 weeks, depending on the number of pages, revisions, and features.",
    },
    {
      question: "Do you offer support after the website is finished?",
      answer:
        "Yes. I offer monthly maintenance plans starting from €39/month for small updates, monitoring, support, and improvements.",
    },
    {
      question: "Can you build something more complex than a website?",
      answer:
        "Yes. If a business later needs an online store, booking integration, client portal, dashboard, or automation, I can scope that as advanced custom work after understanding the workflow.",
    },
    {
      question: "Do I need a client portal before starting?",
      answer:
        "No. The client portal is used after a project is approved. It helps clients track progress, view status updates, and keep communication organized. The first step is still a simple request and free project review.",
    },
    {
      question: "Do you guarantee more clients?",
      answer:
        "No one can honestly guarantee sales, but a professional website can improve trust, presentation, speed, mobile experience, and the chance that visitors contact the business.",
    },
  ],
};
