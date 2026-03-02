import type { RestaurantPageData } from "../lib/types";

export const defaultRestaurantPageContent: RestaurantPageData = {
  heroEyebrow: "Chef's Table Experience",
  heroTitle: "An Evening Built Around Fire, Flavor, and Hospitality",
  heroDescription:
    "Step into allora trattoria for handmade pasta, flame-seared proteins, and seasonal plates served in a warm, candlelit dining room.",
  signatureDishes: [
    {
      name: "Burrata Alla Brace",
      description: "Charred sourdough, roasted tomato confit, basil oil, cracked pepper.",
      price: "$19",
      image: { asset: { _ref: "image-placeholder-burrata-jpg" }, alt: "Grilled burrata appetizer" },
    },
    {
      name: "Cacio e Pepe",
      description: "Fresh tonnarelli, pecorino romano, black pepper bloom, lemon zest.",
      price: "$24",
      image: { asset: { _ref: "image-placeholder-pasta-jpg" }, alt: "Cacio e pepe pasta" },
    },
    {
      name: "Bistecca al Rosmarino",
      description: "Wood-grilled striploin, rosemary jus, crispy potatoes, grilled greens.",
      price: "$39",
      image: { asset: { _ref: "image-placeholder-steak-jpg" }, alt: "Rosemary grilled steak" },
    },
    {
      name: "Margherita Classica",
      description: "San Marzano tomato, fior di latte, basil leaves, first-press olive oil.",
      price: "$18",
      image: { asset: { _ref: "image-placeholder-margherita-jpg" }, alt: "Classic margherita pizza" },
    },
    {
      name: "Funghi Tartufo",
      description: "Wild mushrooms, truffle crema, pecorino, roasted garlic and thyme.",
      price: "$23",
      image: { asset: { _ref: "image-placeholder-funghi-jpg" }, alt: "Truffle mushroom pizza" },
    },
    {
      name: "Calabrese Piccante",
      description: "Spicy salami, chili oil, smoked scamorza, oregano and hot honey drizzle.",
      price: "$22",
      image: { asset: { _ref: "image-placeholder-calabrese-jpg" }, alt: "Spicy calabrese pizza" },
    },
    {
      name: "Gnocchi al Pomodoro",
      description: "Potato gnocchi, slow-cooked tomato sugo, parmigiano, basil and lemon zest.",
      price: "$21",
      image: { asset: { _ref: "image-placeholder-gnocchi-jpg" }, alt: "Tomato gnocchi" },
    },
    {
      name: "Pollo al Mattone",
      description: "Brick-pressed chicken, charred lemon, rosemary potatoes and pan jus.",
      price: "$31",
      image: { asset: { _ref: "image-placeholder-pollo-jpg" }, alt: "Pressed chicken plate" },
    },
  ],
  testimonials: [
    {
      quote: "From the first bite to dessert, every course felt intentional and unforgettable.",
      guest: "Arianna R.",
    },
    {
      quote: "The room, the staff, and the food all deliver a true modern Italian restaurant night.",
      guest: "Dev M.",
    },
    {
      quote: "The truffle pizza and the service were both world-class.",
      guest: "Marcos T.",
    },
    {
      quote: "Beautiful atmosphere, and every plate came out hot and perfectly timed.",
      guest: "Nia L.",
    },
  ],
  reservationTitle: "Reserve Your Table at allora",
  reservationDescription:
    "Open nightly from 5 PM to 11 PM. Book ahead for chef counter seating and weekend tasting menus.",
};

export const fallbackRestaurantImages = [
  "https://images.unsplash.com/photo-1559339352-11d035aa65de",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
  "https://images.unsplash.com/photo-1544025162-d76694265947",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
  "https://images.unsplash.com/photo-1594007654729-407eedc4be65",
  "https://images.unsplash.com/photo-1628840042765-356cda07504e",
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
  "https://images.unsplash.com/photo-1559847844-5315695dadae",
];

export const mergeRestaurantPageData = (
  data: RestaurantPageData | null,
): RestaurantPageData => {
  if (!data) {
    return defaultRestaurantPageContent;
  }

  return {
    ...defaultRestaurantPageContent,
    ...data,
    signatureDishes: data.signatureDishes?.length
      ? data.signatureDishes
      : defaultRestaurantPageContent.signatureDishes,
    testimonials: data.testimonials?.length
      ? data.testimonials
      : defaultRestaurantPageContent.testimonials,
  };
};
