export const HOME_PAGE_QUERY = `*[_type == "homepage"][0]{
  heroTitle,
  heroHighlight,
  heroDescription,
  heroImage,
  process,
  ctaTitle,
  ctaDescription,
  featuredPizzas,
  stats
}`;

export const RESTAURANT_PAGE_QUERY = `*[_type == "restaurantPage"][0]{
  heroEyebrow,
  heroTitle,
  heroDescription,
  heroImage,
  signatureDishes,
  testimonials,
  reservationTitle,
  reservationDescription
}`;
