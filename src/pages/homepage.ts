import type { HomePageData } from "../lib/types";

export const defaultHomePageContent: HomePageData = {
  heroTitle: "Fire-kissed Pizza with Modern Italian Soul",
  heroHighlight: "Pizza",
  heroDescription:
    "Hand-stretched dough, premium ingredients, and a stone oven built for deep flavor.",
  heroBadge: "Signature Fire, Modern Craft",
  heroVideoUrl: "/videos/12456197_2160_3840_25fps.mp4",
  heroVideoTag: "Chef Cam Live",
  heroPrimaryCtaLabel: "Reservation",
  heroSecondaryCtaLabel: "View Menu",
  navOrderNowLabel: "Order Now",
  craftedTitle: "Crafted With Intention",
  experienceTitle: "Beyond The Table",
  experienceDescription:
    "Immersive moments designed for guests who care about craft, ritual, and atmosphere.",
  processTitle: "The allora Method",
  processSubtitle: "How We Craft Your Pizza",
  featuredTitle: "Popular Choice",
  featuredSubtitle: "Featured Pizza",
  chefTitle: "From The Chef",
  chefQuote:
    "Our idea is simple: start with deep fermentation, keep ingredients honest, and finish each pizza with precision.",
  chefSign: "Chef Matteo R.",
  editorialTitle: "Editorial Notes",
  editorialDescription:
    "Inside the studio where technique meets mood, timing, and relentless detail.",
  studioTitle: "Studio Services",
  studioDescription:
    "Design-forward hospitality experiences crafted for guests who appreciate detail.",
  weeklyTitle: "Weekly Rituals",
  weeklyDescription: "Reserve a place at our most requested evenings.",
  testimonialsTitle: "What Guests Say",
  testimonialsDescription:
    "Real words from people who keep coming back for the atmosphere and flavor.",
  newsletterTitle: "Table Notes, Straight to Your Inbox",
  newsletterDescription:
    "Get seasonal specials, chef picks, and first access to limited weekly menus.",
  newsletterPlaceholder: "Enter your email",
  newsletterButtonLabel: "Subscribe",
  ctaTitle: "Tonight Deserves Better Pizza",
  ctaDescription: "Order pickup or delivery from allora and taste real fire and real craft.",
  ctaPrimaryLabel: "Order Online",
  ctaSecondaryLabel: "View Full Menu",
  footerBrandTitle: "allora pizza",
  footerTagline: "Traditional craft. Modern Italian energy.",
  footerCopyright: "(c) 2026 allora. All rights reserved.",
  signatureHighlights: [
    { title: "Slow-Fermented Dough", description: "48-hour fermentation for a crisp crust and airy center." },
    { title: "Seasonal Ingredients", description: "Small-batch toppings sourced from trusted local partners." },
    { title: "Open Kitchen", description: "Watch every pie fired to perfection in our stone oven." },
  ],
  experiencePillars: [
    { title: "Chef Counter Nights", description: "A 6-seat tasting experience.", meta: "Tue and Thu" },
    { title: "Seasonal Pairings", description: "Curated cocktails and natural wines.", meta: "Updated weekly" },
    { title: "After-Hours Dough Lab", description: "Late-evening workshop on fermentation.", meta: "Limited seats" },
  ],
  process: [
    { title: "48-Hour Fermentation", description: "Slow fermentation builds flavor and structure." },
    { title: "Premium Ingredients", description: "Tomatoes, mozzarella, basil, and olive oil." },
    { title: "Stone-Oven Bake", description: "Balanced char, crunch, and tenderness." },
  ],
  stats: [
    { value: "4.9", label: "Average Rating" },
    { value: "15k+", label: "Pizza Lovers" },
    { value: "12", label: "Signature Pizza" },
  ],
  featuredPizzas: [
    { name: "Queen Margherita", price: "$18" },
    { name: "The Hot Honey", price: "$22" },
    { name: "Wild Forest", price: "$24" },
  ],
  chefMetrics: [
    { value: "14+", label: "Years of dough research" },
    { value: "9", label: "Regional flour blends tested yearly" },
    { value: "1000F", label: "Peak oven stone temperature" },
  ],
  editorialMoments: [
    { title: "Midnight Dough Session", description: "Hydration, folds, and patience." },
    { title: "Char & Balance", description: "Controlled blister with soft interior." },
    { title: "Plating Ritual", description: "Each pie is finished with precision." },
    { title: "Table Atmosphere", description: "Warm light and handcrafted details." },
  ],
  serviceMoments: [
    { title: "Private Dining", description: "Chef-led dinners for curated gatherings." },
    { title: "Seasonal Residencies", description: "Collaborations with guest chefs." },
    { title: "Tasting Pairings", description: "Pairing flights with wines and zero-proof options." },
  ],
  weeklyEvents: [
    { day: "Tuesday", event: "Fermentation Masterclass", time: "7:30 PM" },
    { day: "Thursday", event: "Chef Counter Experience", time: "8:00 PM" },
    { day: "Saturday", event: "Live Fire Evenings", time: "9:00 PM" },
  ],
  testimonials: [
    {
      quote: "The margherita tastes like Naples with a modern edge.",
      name: "Sofia G.",
      role: "Food Editor",
    },
    {
      quote: "Our Friday ritual: allora and one extra order to take home.",
      name: "Marcus L.",
      role: "Regular Guest",
    },
    {
      quote: "Service is warm, the space is beautiful, and the crust is incredible.",
      name: "Ava R.",
      role: "Neighborhood Local",
    },
  ],
};

export const fallbackRemoteImages = [
  "https://images.unsplash.com/photo-1594007654729-407eedc4be65",
  "https://images.unsplash.com/photo-1628840042765-356cda07504e",
  "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e",
];

export const mergeHomePageData = (data: HomePageData | null): HomePageData => {
  if (!data) {
    return defaultHomePageContent;
  }

  return {
    ...defaultHomePageContent,
    ...data,
    process: data.process?.length ? data.process : defaultHomePageContent.process,
    stats: data.stats?.length ? data.stats : defaultHomePageContent.stats,
    featuredPizzas: data.featuredPizzas?.length ? data.featuredPizzas : defaultHomePageContent.featuredPizzas,
    signatureHighlights: data.signatureHighlights?.length ? data.signatureHighlights : defaultHomePageContent.signatureHighlights,
    experiencePillars: data.experiencePillars?.length ? data.experiencePillars : defaultHomePageContent.experiencePillars,
    editorialMoments: data.editorialMoments?.length ? data.editorialMoments : defaultHomePageContent.editorialMoments,
    serviceMoments: data.serviceMoments?.length ? data.serviceMoments : defaultHomePageContent.serviceMoments,
    weeklyEvents: data.weeklyEvents?.length ? data.weeklyEvents : defaultHomePageContent.weeklyEvents,
    testimonials: data.testimonials?.length ? data.testimonials : defaultHomePageContent.testimonials,
    chefMetrics: data.chefMetrics?.length ? data.chefMetrics : defaultHomePageContent.chefMetrics,
  };
};
