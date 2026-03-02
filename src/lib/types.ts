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

export type HomePageData = {
  heroTitle?: string;
  heroHighlight?: string;
  heroDescription?: string;
  heroImage?: SanityImage;
  process?: ProcessItem[];
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

export type RestaurantPageData = {
  heroEyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroImage?: SanityImage;
  signatureDishes?: SignatureDish[];
  testimonials?: TestimonialItem[];
  reservationTitle?: string;
  reservationDescription?: string;
};
