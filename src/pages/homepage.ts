import type { HomePageData } from "../lib/types";

export const defaultHomePageContent: HomePageData = {
  heroTitle: "Fire-kissed Pizza with Modern Italian Soul",
  heroHighlight: "Pizza",
  heroDescription:
    "allora serves 48-hour fermented sourdough pizza crafted with premium, fresh ingredients and baked at 700°F for the perfect blistered finish.",
  process: [
    {
      title: "48-Hour Fermentation",
      description: "Slow-fermented dough creates an airy crumb and deep flavor in every bite.",
    },
    {
      title: "Premium Ingredients",
      description: "San Marzano tomatoes, fresh mozzarella, basil, and cold-pressed olive oil.",
    },
    {
      title: "700° Wood-Fire Bake",
      description: "Flash-baked to balance smoky char, crunch, and tenderness.",
    },
  ],
  stats: [
    { value: "4.9", label: "Average Rating" },
    { value: "15k+", label: "Pizza Lovers" },
    { value: "12", label: "Signature Pizza" },
  ],
  featuredPizzas: [
    {
      name: "Queen Margherita",
      price: "$18",
      image: {
        asset: {
          _ref: "image-placeholder-margherita-jpg",
        },
        alt: "Margherita pizza",
      },
    },
    {
      name: "The Hot Honey",
      price: "$22",
      image: {
        asset: {
          _ref: "image-placeholder-pepperoni-jpg",
        },
        alt: "Pepperoni pizza",
      },
    },
    {
      name: "Wild Forest",
      price: "$24",
      image: {
        asset: {
          _ref: "image-placeholder-truffle-jpg",
        },
        alt: "Truffle pizza",
      },
    },
  ],
  ctaTitle: "Tonight Deserves Better Pizza",
  ctaDescription:
    "Order pickup or delivery from allora and taste the difference of real fire, real dough, and real craft.",
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
    featuredPizzas: data.featuredPizzas?.length
      ? data.featuredPizzas
      : defaultHomePageContent.featuredPizzas,
  };
};

