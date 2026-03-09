import { useEffect, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Home.css";
import { HOME_PAGE_QUERY } from "../lib/queries";
import { hasSanityConfig, sanityClient } from "../lib/sanity";
import { buildSanityImageUrl } from "../lib/sanityImage";
import type { FeaturedPizza, HomePageData, ProcessItem, StatItem } from "../lib/types";
import { fallbackRemoteImages, mergeHomePageData } from "./homepage";

function Home() {
  const [data, setData] = useState<HomePageData | null>(null);
  const [heroGlow, setHeroGlow] = useState({ x: 72, y: 32 });

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

  const heroVideoSrc = content.heroVideoUrl ?? "";

  const processItems: ProcessItem[] = content.process ?? [];
  const statItems: StatItem[] = content.stats ?? [];
  const featuredPizzas: FeaturedPizza[] = content.featuredPizzas ?? [];
  const signatureHighlights = content.signatureHighlights ?? [];
  const testimonials = content.testimonials ?? [];
  const experiencePillars = content.experiencePillars ?? [];
  const editorialMoments = content.editorialMoments ?? [];
  const serviceMoments = content.serviceMoments ?? [];
  const weeklyEvents = content.weeklyEvents ?? [];

  const heroHeadingParts = (() => {
    if (!heroHighlight || !heroTitle.includes(heroHighlight)) {
      return { before: heroTitle, highlight: "", after: "" };
    }

    const [before, after = ""] = heroTitle.split(heroHighlight, 2);
    return { before, highlight: heroHighlight, after };
  })();

  const revealUp = {
    hidden: { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0 },
  };

  const maskedReveal = {
    hidden: { opacity: 0, clipPath: "inset(0 0 100% 0 round 18px)" },
    show: { opacity: 1, clipPath: "inset(0 0 0% 0 round 18px)" },
  };

  return (
    <div className="home-container">
      <div className="bg-orb orb-one" />
      <div className="bg-orb orb-two" />

      <motion.header
        className="navbar"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="nav-inner">
          <motion.div className="logo" whileHover={{ scale: 1.03 }}>
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
          </motion.div>

          <nav className="nav-links">
            <a href="#menu">Menu</a>
            <a href="#story">Our Story</a>
            <a href="#experience">Experience</a>
            <a href="#studio-services">Studio</a>
            <a href="#testimonials">Reviews</a>
            <Link to="/contact">Contact Us</Link>
          </nav>

          <motion.div className="nav-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <motion.div whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link to="/restaurant" className="primary-btn">
                {content.navOrderNowLabel ?? ""}
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2, scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <div className="profile-icon" aria-label="profile">
                <svg viewBox="0 0 24 24" role="img">
                  <path d="M12 12a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" fill="#9a3d1f" />
                  <path d="M4 21a8 8 0 0116 0" fill="none" stroke="#9a3d1f" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.header>

      <motion.section
        className="hero"
        id="story"
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
      >
        <motion.div className="hero-left" variants={revealUp}>
          <motion.div className="badge" variants={revealUp}>
            <svg viewBox="0 0 24 24" role="img">
              <path
                d="M13 2c.8 2.2-.4 3.9-1.8 5.4-1.2 1.3-2.5 2.8-2.2 4.8.3 1.8 1.7 2.8 3.3 2.8 2 0 3.7-1.6 3.7-3.8 0-1.7-.9-3.4-2-5.1.1 2.5-1.1 3.5-2.3 4.4.4-2.7-.8-4.6-3-6.5C7.8 5.7 6 8.4 6 11.5 6 16 8.9 20 13 20s7-3.8 7-8.4C20 7.3 17.5 4 13 2z"
                fill="#b03518"
              />
            </svg>
            {content.heroBadge ?? ""}
          </motion.div>

          <motion.h1 variants={revealUp}>
            {heroHeadingParts.before}
            {heroHeadingParts.highlight ? <span>{heroHeadingParts.highlight}</span> : null}
            {heroHeadingParts.after}
          </motion.h1>

          <motion.p variants={revealUp}>{heroDescription}</motion.p>

          <motion.div className="hero-buttons" variants={revealUp}>
            <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link to="/restaurant" className="primary-btn large">
                {content.heroPrimaryCtaLabel ?? ""}
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link to="/restaurant" className="secondary-btn large">
                {content.heroSecondaryCtaLabel ?? ""}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div className="hero-stats" variants={revealUp}>
            {statItems.map((item) => (
              <motion.div className="stat-card" key={`${item.value}-${item.label}`} whileHover={{ y: -6 }}>
                <h3>{item.value}</h3>
                <p>{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-image"
          variants={revealUp}
          whileHover={{ scale: 1.01 }}
          style={
            {
              "--spot-x": `${heroGlow.x}%`,
              "--spot-y": `${heroGlow.y}%`,
            } as CSSProperties
          }
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;
            setHeroGlow({ x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) });
          }}
        >
          <video
            className="hero-media"
            src={heroVideoSrc}
            title="Pizza making process"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-label="Pizza making process"
          />
          <div className="hero-media-tag">{content.heroVideoTag ?? ""}</div>
        </motion.div>
      </motion.section>

      <motion.section
        className="highlights"
        aria-label="signature highlights"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        transition={{ staggerChildren: 0.12 }}
      >
        <motion.h2 className="crafted-title" variants={revealUp}>
          {content.craftedTitle ?? ""}
        </motion.h2>
        <div className="highlight-grid recipe-layout">
          <motion.div
            className="recipe-plate recipe-plate-top"
            aria-hidden="true"
            initial={{ opacity: 0, x: 42, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
          <motion.div
            className="recipe-plate recipe-plate-mid"
            aria-hidden="true"
            initial={{ opacity: 0, x: -42, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.12 }}
          />
          <motion.div
            className="recipe-plate recipe-plate-bottom"
            aria-hidden="true"
            initial={{ opacity: 0, x: 42, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.24 }}
          />
          {signatureHighlights.map((item, index) => (
            <article className={`highlight-card recipe-note recipe-note-${index + 1}`} key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="experience"
        id="experience"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.12 }}
      >
        <motion.div className="section-headline" variants={revealUp}>
          <h2>{content.experienceTitle ?? ""}</h2>
          <p>{content.experienceDescription ?? ""}</p>
        </motion.div>
        <div className="experience-grid">
          {experiencePillars.map((pillar) => (
            <motion.article className="experience-card" key={pillar.title} variants={revealUp} whileHover={{ y: -10 }}>
              <p className="eyebrow">{pillar.meta}</p>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="process"
        id="reviews"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.1 }}
      >
        <motion.h2 variants={revealUp}>{content.processTitle ?? ""}</motion.h2>
        <motion.h3 variants={revealUp}>{content.processSubtitle ?? ""}</motion.h3>

        <div className="process-grid">
          {processItems.map((item) => (
            <motion.div className="process-card" key={`${item.title}-${item.description}`} variants={revealUp} whileHover={{ y: -8 }}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="featured"
        id="menu"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.1 }}
      >
        <motion.h2 variants={revealUp}>{content.featuredTitle ?? ""}</motion.h2>
        <motion.h3 variants={revealUp}>{content.featuredSubtitle ?? ""}</motion.h3>

        <div className="pizza-grid">
          {featuredPizzas.map((pizza, index) => {
            const imageUrl =
              buildSanityImageUrl(pizza.image?.asset?._ref, { width: 900, height: 700 }) ??
              fallbackRemoteImages[index % fallbackRemoteImages.length];

            return (
              <motion.article
                className="pizza-card"
                key={`${pizza.name}-${pizza.price}-${index}`}
                variants={maskedReveal}
                whileHover={{ y: -10, rotate: index % 2 === 0 ? -0.4 : 0.4 }}
                transition={{ duration: 0.68, ease: "easeOut", delay: index * 0.05 }}
              >
                <img src={imageUrl} alt={pizza.image?.alt ?? `${pizza.name} pizza`} />
                <div className="pizza-info">
                  <p className="pizza-tag">Chef Feature</p>
                  <h4>{pizza.name}</h4>
                  <span>{pizza.price}</span>
                  <Link to="/restaurant">{content.ctaPrimaryLabel ?? ""}</Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.section>

      <motion.section
        className="chef-note"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        transition={{ staggerChildren: 0.12 }}
      >
        <motion.div className="chef-copy" variants={revealUp}>
          <h2>{content.chefTitle ?? ""}</h2>
          <p>
            {content.chefQuote ?? ""}
          </p>
          <p className="chef-sign">{content.chefSign ?? ""}</p>
        </motion.div>
        <motion.div className="chef-metrics" variants={revealUp}>
          {content.chefMetrics?.map((metric) => (
            <div key={`${metric.value}-${metric.label}`}>
              <h4>{metric.value}</h4>
              <p>{metric.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        className="editorial"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        transition={{ staggerChildren: 0.1 }}
      >
        <motion.div className="section-headline" variants={revealUp}>
          <h2>{content.editorialTitle ?? ""}</h2>
          <p>{content.editorialDescription ?? ""}</p>
        </motion.div>
        <div className="editorial-grid">
          {editorialMoments.map((moment, index) => (
            <motion.article
              className="editorial-card"
              key={moment.title}
              variants={maskedReveal}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.62, ease: "easeOut", delay: index * 0.04 }}
            >
              <p className="editorial-index">{String(index + 1).padStart(2, "0")}</p>
              <h3>{moment.title}</h3>
              <p>{moment.description}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <section className="service-lab" id="studio-services">
        <div className="section-headline">
          <h2>{content.studioTitle ?? ""}</h2>
          <p>{content.studioDescription ?? ""}</p>
        </div>
        <div className="service-grid">
          {serviceMoments.map((item) => (
            <article className="service-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <motion.section
        className="events"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        transition={{ staggerChildren: 0.1 }}
      >
        <motion.div className="section-headline" variants={revealUp}>
          <h2>{content.weeklyTitle ?? ""}</h2>
          <p>{content.weeklyDescription ?? ""}</p>
        </motion.div>
        <div className="events-list">
          {weeklyEvents.map((item) => (
            <motion.article className="event-item" key={`${item.day}-${item.event}`} variants={revealUp} whileHover={{ x: 4 }}>
              <p className="event-day">{item.day}</p>
              <h3>{item.event}</h3>
              <p className="event-time">{item.time}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="testimonials"
        id="testimonials"
        aria-label="guest reviews"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        transition={{ staggerChildren: 0.1 }}
      >
        <motion.div className="section-headline" variants={revealUp}>
          <h2>{content.testimonialsTitle ?? ""}</h2>
          <p>{content.testimonialsDescription ?? ""}</p>
        </motion.div>
        <div className="testimonial-grid">
          {testimonials.map((item, index) => (
            <motion.article
              className="testimonial-card"
              key={item.name}
              variants={maskedReveal}
              whileHover={{ y: -10, rotate: index % 2 === 0 ? -0.6 : 0.6 }}
              transition={{ duration: 0.62, ease: "easeOut" }}
            >
              <p className="quote">"{item.quote}"</p>
              <p className="author">{item.name}</p>
              <p className="role">{item.role}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <section className="newsletter" aria-label="newsletter signup">
        <div>
          <h2>{content.newsletterTitle ?? ""}</h2>
          <p>{content.newsletterDescription ?? ""}</p>
        </div>
        <form className="newsletter-form" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input id="newsletter-email" type="email" placeholder={content.newsletterPlaceholder ?? ""} />
          <Link to="/contact" className="primary-btn">
            {content.newsletterButtonLabel ?? ""}
          </Link>
        </form>
      </section>

      <section className="cta" id="locations">
        <h2>{content.ctaTitle}</h2>
        <p>{content.ctaDescription}</p>

        <div className="cta-buttons">
          <Link to="/restaurant" className="primary-btn">
            {content.ctaPrimaryLabel ?? ""}
          </Link>
          <Link to="/restaurant" className="secondary-btn">
            {content.ctaSecondaryLabel ?? ""}
          </Link>
        </div>
      </section>

      <footer className="footer">
        <div>
          <h3>{content.footerBrandTitle ?? ""}</h3>
          <p>{content.footerTagline ?? ""}</p>
        </div>

        <p>{content.footerCopyright ?? ""}</p>
      </footer>
    </div>
  );
}

export default Home;

