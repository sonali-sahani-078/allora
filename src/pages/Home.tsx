import { useEffect, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
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

const signatureHighlights = [
  {
    title: "Slow-Fermented Dough",
    description: "48-hour fermentation for a crisp crust and airy center.",
  },
  {
    title: "Seasonal Ingredients",
    description: "Small-batch toppings sourced from trusted local partners.",
  },
  {
    title: "Open Kitchen",
    description: "Watch every pie fired to perfection in our stone oven.",
  },
];

const testimonials = [
  {
    quote:
      "The margherita tastes like Naples with a modern edge. Every bite feels intentional.",
    name: "Sofia G.",
    role: "Food Editor",
  },
  {
    quote:
      "Our Friday ritual: allora, two spritzes, and one extra order to take home.",
    name: "Marcus L.",
    role: "Regular Guest",
  },
  {
    quote:
      "Service is warm, the space is beautiful, and the crust is incredible.",
    name: "Ava R.",
    role: "Neighborhood Local",
  },
];

const experiencePillars = [
  {
    title: "Chef Counter Nights",
    description: "A 6-seat tasting experience where every course is finished in front of you.",
    meta: "Tue and Thu",
  },
  {
    title: "Seasonal Pairings",
    description: "Curated cocktails and natural wines matched to the weekly oven menu.",
    meta: "Updated weekly",
  },
  {
    title: "After-Hours Dough Lab",
    description: "Late-evening workshop on fermentation, hydration, and shaping technique.",
    meta: "Limited seats",
  },
];

const atmosphereNotes = ["Warm stone", "Live flame", "Vinyl jazz", "Open pass", "Handmade ceramics"];

const editorialMoments = [
  {
    title: "Midnight Dough Session",
    description: "Hydration, folds, and patience. The dough room runs long after service.",
  },
  {
    title: "Char & Balance",
    description: "A controlled blister on the crust with a soft interior is the benchmark.",
  },
  {
    title: "Plating Ritual",
    description: "Every pie is finished with oil, herb lift, and final heat before the pass.",
  },
  {
    title: "Table Atmosphere",
    description: "Warm light, handmade ceramics, and a soundtrack tuned to the room.",
  },
];

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

  const heroVideoSrc = "/videos/12456197_2160_3840_25fps.mp4";

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
            <a href="#testimonials">Reviews</a>
            <Link to="/contact">Contact Us</Link>
          </nav>

          <motion.div className="nav-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <motion.div whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link to="/restaurant" className="primary-btn">
                Order Now
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
            Signature Fire, Modern Craft
          </motion.div>

          <motion.h1 variants={revealUp}>
            {heroHeadingParts.before}
            {heroHeadingParts.highlight ? <span>{heroHeadingParts.highlight}</span> : null}
            {heroHeadingParts.after}
          </motion.h1>

          <motion.p variants={revealUp}>{heroDescription}</motion.p>

          <motion.div className="hero-buttons" variants={revealUp}>
            <motion.button className="primary-btn large" whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              Reservation
            </motion.button>
            <motion.button className="secondary-btn large" whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              View Menu
            </motion.button>
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
            poster="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=80"
            aria-label="Pizza making process"
          />
          <div className="hero-media-tag">Chef Cam Live</div>
        </motion.div>
      </motion.section>

      <section className="atmosphere-band" aria-label="ambience notes">
        <div className="atmosphere-track">
          {[...atmosphereNotes, ...atmosphereNotes].map((note, index) => (
            <span key={`${note}-${index}`}>{note}</span>
          ))}
        </div>
      </section>

      <motion.section
        className="highlights"
        aria-label="signature highlights"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        transition={{ staggerChildren: 0.12 }}
      >
        <motion.div className="section-headline" variants={revealUp}>
          <h2>Crafted With Intention</h2>
          <p>Every component is designed for flavor, balance, and a memorable table experience.</p>
        </motion.div>
        <div className="highlight-grid">
          {signatureHighlights.map((item) => (
            <motion.article className="highlight-card" key={item.title} variants={revealUp} whileHover={{ y: -8 }}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.article>
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
          <h2>Beyond The Table</h2>
          <p>Immersive moments designed for guests who care about craft, ritual, and atmosphere.</p>
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
        <motion.h2 variants={revealUp}>The allora Method</motion.h2>
        <motion.h3 variants={revealUp}>How We Craft Your Pizza</motion.h3>

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
        <motion.h2 variants={revealUp}>Popular Choice</motion.h2>
        <motion.h3 variants={revealUp}>Featured Pizza</motion.h3>

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
                transition={{ duration: 0.62, ease: "easeOut" }}
              >
                <img src={imageUrl} alt={pizza.image?.alt ?? `${pizza.name} pizza`} />
                <div className="pizza-info">
                  <h4>{pizza.name}</h4>
                  <span>{pizza.price}</span>
                  <button>Add to Order</button>
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
          <h2>From The Chef</h2>
          <p>
            "Our idea is simple: start with deep fermentation, keep ingredients honest, and finish each pizza with
            precision that respects both tradition and modern flavor."
          </p>
          <p className="chef-sign">Chef Matteo R.</p>
        </motion.div>
        <motion.div className="chef-metrics" variants={revealUp}>
          <div>
            <h4>14+</h4>
            <p>Years of dough research</p>
          </div>
          <div>
            <h4>9</h4>
            <p>Regional flour blends tested yearly</p>
          </div>
          <div>
            <h4>1000F</h4>
            <p>Peak oven stone temperature</p>
          </div>
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
          <h2>Editorial Notes</h2>
          <p>Inside the studio where technique meets mood, timing, and relentless detail.</p>
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
          <h2>What Guests Say</h2>
          <p>Real words from people who keep coming back for the atmosphere and the flavor.</p>
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
          <h2>Table Notes, Straight to Your Inbox</h2>
          <p>Get seasonal specials, chef picks, and first access to limited weekly menus.</p>
        </div>
        <form className="newsletter-form" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input id="newsletter-email" type="email" placeholder="Enter your email" />
          <button type="submit" className="primary-btn">
            Subscribe
          </button>
        </form>
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

        <p>(c) 2026 allora. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
