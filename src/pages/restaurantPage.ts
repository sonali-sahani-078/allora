import type { RestaurantPageData } from "../lib/types";

export const defaultRestaurantPageContent: RestaurantPageData = {
  heroEyebrow: "Chef's Table Experience",
  heroTitle: "Signature Pizzas",
  heroDescription: "An evening built around fire, flavor, and hospitality.",
  pageTitle: "Signature Pizzas",
  pageSubtitle: "items available",
  buildTitle: "Build Your Own",
  buildDescription: "Classic base + mozzarella + house sauce + 2 premium toppings.",
  buildButtonLabel: "Add Custom Pizza ($19.00)",
  sidesTitle: "allora Sides",
  drinksTitle: "Drinks",
  reservationTabTitle: "Table Reservations",
  reserveButtonLabel: "Reserve Table",
  checkoutButtonLabel: "Proceed to Checkout",
  emptyCartTitle: "Your cart is empty",
  emptyCartDescription: "Add a pizza or side to see pricing, delivery, and checkout details.",
  deliveryPillLabel: "Delivery in 25-35 min",
  quickOrderSliderLabel: "Quick order slider",
  orderSuccessMessage: "Order placed successfully. Your kitchen ticket is now live.",
  pickupOtpPrefix: "Your pickup OTP: ",
  footerDescription: "Handcrafted pizzas with premium ingredients. Authentic recipes made for the modern palate.",
  signatureDishes: [
    { name: "Margherita Classica", description: "San Marzano tomato, fior di latte, basil.", price: "$18" },
    { name: "Funghi Tartufo", description: "Wild mushrooms, truffle crema, pecorino.", price: "$23" },
    { name: "Calabrese Piccante", description: "Spicy salami, chili oil, smoked scamorza.", price: "$22" },
  ],
  sideItems: [
    { id: "side-garlic-knots", name: "Garlic Knots", price: "$5.99", image: "https://images.unsplash.com/photo-1619531038896-6d3b4be94c2d" },
    { id: "side-caesar-salad", name: "Caesar Salad", price: "$7.50", image: "https://images.unsplash.com/photo-1551248429-40975aa4de74" },
  ],
  drinkItems: [
    { id: "drink-sparkling", name: "Sparkling Citrus Soda", price: "$4.50" },
    { id: "drink-berry", name: "Berry Basil Cooler", price: "$5.25" },
  ],
  reservationSlots: ["11:30", "12:00", "12:30", "13:00", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"],
  reservationTitle: "Reserve Your Table",
  reservationDescription: "Book your table in seconds",
};

export const fallbackRestaurantImages = [
  "https://images.unsplash.com/photo-1559339352-11d035aa65de",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
  "https://images.unsplash.com/photo-1544025162-d76694265947",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
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
    signatureDishes: data.signatureDishes?.length ? data.signatureDishes : defaultRestaurantPageContent.signatureDishes,
    sideItems: data.sideItems?.length ? data.sideItems : defaultRestaurantPageContent.sideItems,
    drinkItems: data.drinkItems?.length ? data.drinkItems : defaultRestaurantPageContent.drinkItems,
    reservationSlots: data.reservationSlots?.length ? data.reservationSlots : defaultRestaurantPageContent.reservationSlots,
  };
};
