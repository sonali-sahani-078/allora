export type SanityImageAssetRef = {
  _ref?: string;
  _type?: string;
};

export type SanityImage = {
  asset?: SanityImageAssetRef;
  alt?: string;
};

export type ProcessItem = {
  title?: string;
  description?: string;
};

export type StatItem = {
  label?: string;
  value?: string;
};

export type FeaturedPizza = {
  name?: string;
  price?: string;
  image?: SanityImage;
};

export type HighlightItem = {
  title?: string;
  description?: string;
};

export type ExperienceItem = {
  title?: string;
  description?: string;
  meta?: string;
};

export type EditorialItem = {
  title?: string;
  description?: string;
};

export type ServiceItem = {
  title?: string;
  description?: string;
};

export type WeeklyEvent = {
  day?: string;
  event?: string;
  time?: string;
};

export type GuestReview = {
  quote?: string;
  name?: string;
  role?: string;
};

export type ChefMetric = {
  value?: string;
  label?: string;
};

export type HomePageData = {
  heroTitle?: string;
  heroHighlight?: string;
  heroDescription?: string;
  heroBadge?: string;
  heroVideoUrl?: string;
  heroVideoTag?: string;
  craftedTitle?: string;
  experienceTitle?: string;
  experienceDescription?: string;
  processTitle?: string;
  processSubtitle?: string;
  featuredTitle?: string;
  featuredSubtitle?: string;
  chefTitle?: string;
  chefQuote?: string;
  chefSign?: string;
  editorialTitle?: string;
  editorialDescription?: string;
  studioTitle?: string;
  studioDescription?: string;
  weeklyTitle?: string;
  weeklyDescription?: string;
  testimonialsTitle?: string;
  testimonialsDescription?: string;
  newsletterTitle?: string;
  newsletterDescription?: string;
  newsletterPlaceholder?: string;
  newsletterButtonLabel?: string;
  heroPrimaryCtaLabel?: string;
  heroSecondaryCtaLabel?: string;
  navOrderNowLabel?: string;
  ctaPrimaryLabel?: string;
  ctaSecondaryLabel?: string;
  footerBrandTitle?: string;
  footerTagline?: string;
  footerCopyright?: string;
  heroImage?: SanityImage;
  process?: ProcessItem[];
  signatureHighlights?: HighlightItem[];
  experiencePillars?: ExperienceItem[];
  editorialMoments?: EditorialItem[];
  serviceMoments?: ServiceItem[];
  weeklyEvents?: WeeklyEvent[];
  testimonials?: GuestReview[];
  chefMetrics?: ChefMetric[];
  ctaTitle?: string;
  ctaDescription?: string;
  featuredPizzas?: FeaturedPizza[];
  stats?: StatItem[];
};

export type SignatureDish = {
  name?: string;
  description?: string;
  price?: string;
  image?: SanityImage;
};

export type TestimonialItem = {
  quote?: string;
  guest?: string;
};

export type SideItem = {
  id?: string;
  name?: string;
  price?: string;
  image?: string;
};

export type DrinkItem = {
  id?: string;
  name?: string;
  price?: string;
};

export type RestaurantPageData = {
  heroEyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;
  pageTitle?: string;
  pageSubtitle?: string;
  buildTitle?: string;
  buildDescription?: string;
  buildButtonLabel?: string;
  sidesTitle?: string;
  drinksTitle?: string;
  reservationTabTitle?: string;
  reserveButtonLabel?: string;
  checkoutButtonLabel?: string;
  emptyCartTitle?: string;
  emptyCartDescription?: string;
  deliveryPillLabel?: string;
  quickOrderSliderLabel?: string;
  orderSuccessMessage?: string;
  pickupOtpPrefix?: string;
  footerDescription?: string;
  heroImage?: SanityImage;
  signatureDishes?: SignatureDish[];
  testimonials?: TestimonialItem[];
  sideItems?: SideItem[];
  drinkItems?: DrinkItem[];
  reservationSlots?: string[];
  reservationTitle?: string;
  reservationDescription?: string;
};
