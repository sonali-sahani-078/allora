import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { HOME_PAGE_QUERY } from "../lib/queries";
import { hasSanityConfig, sanityClient } from "../lib/sanity";
import { buildSanityImageUrl } from "../lib/sanityImage";
import type { FeaturedPizza, HomePageData, ProcessItem, StatItem } from "../lib/types";
import {
  defaultHomePageContent,
  fallbackRemoteImages,
  mergeHomePageData,
} from "./homepage";

function Home() {
  const [data, setData] = useState<HomePageData | null>(null);

  useEffect(() => {
    if (!hasSanityConfig) {
      return;
    }

    void sanityClient
      .fetch<HomePageData>(HOME_PAGE_QUERY)
      .then((response) => {
        setData(response ?? null);
      })
      .catch(() => {
        setData(null);
      });
  }, []);

  const content = mergeHomePageData(data);

  const heroTitle = content.heroTitle ?? "";
  const heroHighlight = content.heroHighlight ?? "";
  const heroDescription = content.heroDescription ?? "";

  const heroImage =
    buildSanityImageUrl(data?.heroImage?.asset?._ref, { width: 1200, height: 900 }) ??
    "https://images.unsplash.com/photo-1601924638867-3ec2f0dbe0e6";

  const processItems: ProcessItem[] = content.process ?? defaultHomePageContent.process ?? [];
  const statItems: StatItem[] = content.stats ?? defaultHomePageContent.stats ?? [];
  const featuredPizzas: FeaturedPizza[] =
    content.featuredPizzas ?? defaultHomePageContent.featuredPizzas ?? [];

  const heroHeadingParts = (() => {
    if (!heroHighlight || !heroTitle.includes(heroHighlight)) {
      return { before: heroTitle, highlight: "", after: "" };
    }

    const [before, after = ""] = heroTitle.split(heroHighlight, 2);
    return { before, highlight: heroHighlight, after };
  })();

  return (
    <div className="home-container">
      <div className="bg-orb orb-one" />
      <div className="bg-orb orb-two" />

      <header className="navbar">
        <div className="nav-inner">
          <div className="logo">
            <span className="icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" role="img">
                <defs>
                  <linearGradient id="pizzaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f7c66b" />
                    <stop offset="100%" stopColor="#de8b33" />
                  </linearGradient>
                </defs>
                <path d="M6 10h36L24 42z" fill="url(#pizzaGrad)" stroke="#b76019" strokeWidth="2" />
                <circle cx="19" cy="22" r="2.5" fill="#c53d22" />
                <circle cx="27" cy="18" r="2.5" fill="#c53d22" />
                <circle cx="25" cy="27" r="2.5" fill="#8f9a32" />
              </svg>
            </span>
            <h2>allora</h2>
          </div>

          <nav className="nav-links">
            <a href="#menu">Menu</a>
            <a href="#story">Our Story</a>
            <a href="#locations">Locations</a>
            <a href="#reviews">Reviews</a>
            <Link to="/contact">Contact Us</Link>
          </nav>

          <div className="nav-actions">
            <Link to="/restaurant" className="primary-btn">
              Order Now
            </Link>
            <div className="profile-icon" aria-label="profile">
              <svg viewBox="0 0 24 24" role="img">
                <path d="M12 12a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" fill="#9a3d1f" />
                <path d="M4 21a8 8 0 0116 0" fill="none" stroke="#9a3d1f" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      <section className="hero" id="story">
        <div className="hero-left">
          <div className="badge">
            <svg viewBox="0 0 24 24" role="img">
              <path
                d="M13 2c.8 2.2-.4 3.9-1.8 5.4-1.2 1.3-2.5 2.8-2.2 4.8.3 1.8 1.7 2.8 3.3 2.8 2 0 3.7-1.6 3.7-3.8 0-1.7-.9-3.4-2-5.1.1 2.5-1.1 3.5-2.3 4.4.4-2.7-.8-4.6-3-6.5C7.8 5.7 6 8.4 6 11.5 6 16 8.9 20 13 20s7-3.8 7-8.4C20 7.3 17.5 4 13 2z"
                fill="#b03518"
              />
            </svg>
            Voted #1 Wood-Fired Pizza
          </div>

          <h1>
            {heroHeadingParts.before}
            {heroHeadingParts.highlight ? <span>{heroHeadingParts.highlight}</span> : null}
            {heroHeadingParts.after}
          </h1>

          <p>{heroDescription}</p>

          <div className="hero-buttons">
            <button className="primary-btn large">View Menu</button>
            <button className="secondary-btn large">Find a Location</button>
          </div>

          <div className="hero-stats">
            {statItems.map((item) => (
              <div className="stat-card" key={`${item.value}-${item.label}`}>
                <h3>{item.value}</h3>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-image">
          <img src={heroImage} alt={data?.heroImage?.alt ?? "Wood-fired pizza"} />
        </div>
      </section>

      <section className="process" id="reviews">
        <h2>The allora Method</h2>
        <h3>How We Craft Your Pizza</h3>

        <div className="process-grid">
          {processItems.map((item) => (
            <div className="process-card" key={`${item.title}-${item.description}`}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="featured" id="menu">
        <h2>Popular Choice</h2>
        <h3>Featured Pizza</h3>

        <div className="pizza-grid">
          {featuredPizzas.map((pizza, index) => {
            const imageUrl =
              buildSanityImageUrl(pizza.image?.asset?._ref, { width: 900, height: 700 }) ??
              fallbackRemoteImages[index % fallbackRemoteImages.length];

            return (
              <article className="pizza-card" key={`${pizza.name}-${pizza.price}-${index}`}>
                <img src={imageUrl} alt={pizza.image?.alt ?? `${pizza.name} pizza`} />
                <div className="pizza-info">
                  <h4>{pizza.name}</h4>
                  <span>{pizza.price}</span>
                  <button>Add to Order</button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="cta" id="locations">
        <h2>{content.ctaTitle}</h2>
        <p>{content.ctaDescription}</p>

        <div className="cta-buttons">
          <button className="primary-btn">Order Online</button>
          <button className="secondary-btn">View Full Menu</button>
        </div>
      </section>

      <footer className="footer">
        <div>
          <h3>allora pizza</h3>
          <p>Traditional craft. Modern Italian energy.</p>
        </div>

        <p>© 2026 allora. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
