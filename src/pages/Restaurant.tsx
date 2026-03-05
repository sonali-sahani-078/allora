import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import "./Restaurant.css";
import { RESTAURANT_PAGE_QUERY } from "../lib/queries";
import { buildSanityImageUrl } from "../lib/sanityImage";
import { hasSanityConfig, sanityClient } from "../lib/sanity";
import type { RestaurantPageData, SignatureDish } from "../lib/types";
import {
  defaultRestaurantPageContent,
  fallbackRestaurantImages,
  mergeRestaurantPageData,
} from "./restaurantPage";

type SideItem = {
  id: string;
  name: string;
  price: string;
  image: string;
};

type DrinkItem = {
  id: string;
  name: string;
  price: string;
};

type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

type TabKey = "signature" | "build" | "sides" | "drinks" | "reservation";
type DietaryFilter = "all" | "vegan" | "glutenFree" | "dairyFree";
type SpiceFilter = "all" | "mild" | "spicy" | "extraHot";
type ReservationStatus = { kind: "success" | "error"; message: string };

const reservationSlots = [
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
];

const web3FormsEndpoint = "https://api.web3forms.com/submit";
const web3FormsAccessKey =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? "b00e87dc-2490-4708-a404-c13e34c4d963";


const sideItems: SideItem[] = [
  {
    id: "side-garlic-knots",
    name: "Garlic Knots",
    price: "$5.99",
    image: "https://images.unsplash.com/photo-1619531038896-6d3b4be94c2d",
  },
  {
    id: "side-caesar-salad",
    name: "Caesar Salad",
    price: "$7.50",
    image: "https://images.unsplash.com/photo-1551248429-40975aa4de74",
  },
  {
    id: "side-caprese-sticks",
    name: "Caprese Sticks",
    price: "$6.25",
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7",
  },
  {
    id: "side-wild-green-salad",
    name: "Wild Green Salad",
    price: "$7.00",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
  },
];

const drinkItems: DrinkItem[] = [
  { id: "drink-sparkling", name: "Sparkling Citrus Soda", price: "$4.50" },
  { id: "drink-berry", name: "Berry Basil Cooler", price: "$5.25" },
  { id: "drink-espresso", name: "Iced Espresso", price: "$4.75" },
];

const parsePrice = (value?: string): number => {
  if (!value) {
    return 0;
  }

  const numeric = Number.parseFloat(value.replace(/[^0-9.]/g, ""));
  return Number.isNaN(numeric) ? 0 : numeric;
};

const todayLocalDate = () => new Date().toISOString().split("T")[0];

const getFallbackSlots = (date: string, locallyBooked: Record<string, string[]>) => {
  const now = new Date();
  const isToday = date === todayLocalDate();
  const booked = new Set(locallyBooked[date] ?? []);

  return reservationSlots.filter((slot) => {
    if (booked.has(slot)) {
      return false;
    }

    if (!isToday) {
      return true;
    }

    const [hour, minute] = slot.split(":").map((value) => Number.parseInt(value, 10));
    const slotDate = new Date(now);
    slotDate.setHours(hour, minute, 0, 0);
    return slotDate > now;
  });
};

const getDishTags = (dish: SignatureDish) => {
  const text = `${dish.name ?? ""} ${dish.description ?? ""}`.toLowerCase();

  return {
    vegan: text.includes("vegan") || text.includes("mushroom") || text.includes("garden"),
    glutenFree: text.includes("gluten-free"),
    dairyFree: text.includes("dairy-free") || text.includes("vegan"),
    spicy:
      text.includes("spicy") || text.includes("hot") || text.includes("chili") || text.includes("pep"),
    extraHot: text.includes("extra hot") || text.includes("fire"),
  };
};

function Restaurant() {
  const [data, setData] = useState<RestaurantPageData | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [tab, setTab] = useState<TabKey>("signature");
  const [search, setSearch] = useState("");
  const [dietary, setDietary] = useState<DietaryFilter>("all");
  const [spice, setSpice] = useState<SpiceFilter>("all");
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [orderMessage, setOrderMessage] = useState("");
  const [reservationDate, setReservationDate] = useState(todayLocalDate);
  const [reservationTime, setReservationTime] = useState("");
  const [guestCount, setGuestCount] = useState(2);
  const [reservationName, setReservationName] = useState("");
  const [reservationPhone, setReservationPhone] = useState("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isSubmittingReservation, setIsSubmittingReservation] = useState(false);
  const [reservationStatus, setReservationStatus] = useState<ReservationStatus | null>(null);
  const [locallyBookedSlots, setLocallyBookedSlots] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (!hasSanityConfig) {
      return;
    }

    void sanityClient
      .fetch<RestaurantPageData>(RESTAURANT_PAGE_QUERY)
      .then((response) => {
        setData(response ?? null);
      })
      .catch(() => {
        setData(null);
      });
  }, []);

  useEffect(() => {
    const fallback = getFallbackSlots(reservationDate, locallyBookedSlots);
    setIsLoadingSlots(false);
    setAvailableSlots(fallback);
    setReservationTime((prev) => (fallback.includes(prev) ? prev : fallback[0] ?? ""));
  }, [guestCount, locallyBookedSlots, reservationDate]);

  const content = mergeRestaurantPageData(data);

  const heroImage =
    buildSanityImageUrl(data?.heroImage?.asset?._ref, { width: 1600, height: 900 }) ??
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4";

  const dishes: SignatureDish[] =
    content.signatureDishes ?? defaultRestaurantPageContent.signatureDishes ?? [];

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      const text = `${dish.name ?? ""} ${dish.description ?? ""}`.toLowerCase();

      if (search && !text.includes(search.toLowerCase())) {
        return false;
      }

      const tags = getDishTags(dish);

      if (dietary === "vegan" && !tags.vegan) {
        return false;
      }

      if (dietary === "glutenFree" && !tags.glutenFree) {
        return false;
      }

      if (dietary === "dairyFree" && !tags.dairyFree) {
        return false;
      }

      if (spice === "mild" && (tags.spicy || tags.extraHot)) {
        return false;
      }

      if (spice === "spicy" && !(tags.spicy || tags.extraHot)) {
        return false;
      }

      if (spice === "extraHot" && !tags.extraHot) {
        return false;
      }

      return true;
    });
  }, [dishes, dietary, spice, search]);

  const addToCart = (item: { id: string; name?: string; price?: string }) => {
    const name = item.name ?? "Menu Item";
    const price = parsePrice(item.price);

    if (!price) {
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find((entry) => entry.id === item.id);

      if (existing) {
        return prev.map((entry) =>
          entry.id === item.id ? { ...entry, qty: entry.qty + 1 } : entry,
        );
      }

      return [...prev, { id: item.id, name, price, qty: 1 }];
    });

    setSwipeProgress(0);
    setOrderMessage("");
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0),
    );
    setSwipeProgress(0);
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    setSwipeProgress(0);
  };

  const itemCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const total = cartItems.reduce((sum, item) => sum + item.qty * item.price, 0);

  const placeOrder = () => {
    if (!cartItems.length) {
      return;
    }

    setCartItems([]);
    setSwipeProgress(0);
    setOrderMessage("Order placed successfully. Your kitchen ticket is now live.");
  };

  const handleSwipeChange = (value: number) => {
    setSwipeProgress(value);

    if (value >= 96) {
      placeOrder();
    }
  };

  const contentTitle =
    tab === "signature"
      ? content.heroTitle ?? "Signature Pizzas"
      : tab === "build"
        ? "Build Your Own"
        : tab === "sides"
          ? "allora Sides"
          : tab === "drinks"
            ? "Drinks"
            : "Table Reservations";

  const contentCount =
    tab === "signature"
      ? `${filteredDishes.length} items available`
      : tab === "build"
        ? "Pick your custom combo"
        : tab === "sides"
          ? `${sideItems.length} items available`
          : tab === "drinks"
            ? `${drinkItems.length} items available`
            : "Book your table in seconds";

  const submitReservation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setReservationStatus(null);

    if (!reservationDate || !reservationTime || !reservationName.trim() || !reservationPhone.trim()) {
      setReservationStatus({ kind: "error", message: "Please complete all reservation fields." });
      return;
    }

    if (!web3FormsAccessKey) {
      setReservationStatus({ kind: "error", message: "Missing Web3Forms access key." });
      return;
    }

    if (!availableSlots.includes(reservationTime)) {
      setReservationStatus({ kind: "error", message: "Please choose an available time slot." });
      return;
    }

    setIsSubmittingReservation(true);

    try {
      const payload = {
        access_key: web3FormsAccessKey,
        subject: "New Table Reservation - allora",
        from_name: "allora Website",
        reservation_date: reservationDate,
        reservation_time: reservationTime,
        guests: String(guestCount),
        customer_name: reservationName.trim(),
        customer_phone: reservationPhone.trim(),
        message: `Reservation request from ${reservationName.trim()} (${reservationPhone.trim()}) for ${guestCount} guest(s) on ${reservationDate} at ${reservationTime}.`,
      };

      const response = await fetch(web3FormsEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "Reservation request failed.");
      }

      setLocallyBookedSlots((prev) => ({
        ...prev,
        [reservationDate]: [...(prev[reservationDate] ?? []), reservationTime],
      }));
      setReservationStatus({
        kind: "success",
        message: `Reservation submitted for ${reservationDate} at ${reservationTime}. We will contact you to confirm.`,
      });
      setReservationName("");
      setReservationPhone("");
    } catch {
      setReservationStatus({
        kind: "error",
        message: "Reservation could not be submitted. Please try again in a moment.",
      });
    } finally {
      setIsSubmittingReservation(false);
    }
  };

  return (
    <div className="ac-page">
      <header className="ac-header">
        <div className="ac-brand-wrap">
          <div className="ac-brand">
            <span className="ac-brand-icon">a</span>
            <h2>allora</h2>
          </div>
          <nav className="ac-nav">
            <button type="button" onClick={() => setTab("signature")}>Menu</button>
            <button type="button" onClick={() => setIsCartOpen(true)}>Orders</button>
            <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Profile</button>
            <Link to="/">Home</Link>
          </nav>
        </div>

        <div className="ac-header-actions">
          <input
            type="text"
            placeholder="Search for pizza..."
            aria-label="Search pizza"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button className="ac-cart" type="button" onClick={() => setIsCartOpen((prev) => !prev)}>
            Cart {itemCount ? `(${itemCount})` : ""}
          </button>
          <div className="ac-avatar" aria-label="profile">
            <svg viewBox="0 0 24 24" role="img">
              <path d="M12 12a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" fill="#9a3d1f" />
              <path d="M4 21a8 8 0 0116 0" fill="none" stroke="#9a3d1f" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </header>

      <main className="ac-main">
        <div className="ac-layout">
          <aside className="ac-sidebar">
            <div className="ac-panel">
              <h3>Filters</h3>
              <p className="ac-label">Dietary Needs</p>
              <div className="ac-chip-stack">
                <button className={dietary === "vegan" ? "is-active" : ""} type="button" onClick={() => setDietary("vegan")}>Vegan</button>
                <button className={dietary === "glutenFree" ? "is-active" : ""} type="button" onClick={() => setDietary("glutenFree")}>Gluten-Free</button>
                <button className={dietary === "dairyFree" ? "is-active" : ""} type="button" onClick={() => setDietary("dairyFree")}>Dairy-Free</button>
                <button className={dietary === "all" ? "is-active" : ""} type="button" onClick={() => setDietary("all")}>Clear Dietary</button>
              </div>

              <hr />

              <p className="ac-label">Spice Level</p>
              <div className="ac-chip-row">
                <button className={spice === "mild" ? "is-hot" : ""} type="button" onClick={() => setSpice("mild")}>Mild</button>
                <button className={spice === "spicy" ? "is-hot" : ""} type="button" onClick={() => setSpice("spicy")}>Spicy</button>
                <button className={spice === "extraHot" ? "is-hot" : ""} type="button" onClick={() => setSpice("extraHot")}>Extra Hot</button>
                <button className={spice === "all" ? "is-hot" : ""} type="button" onClick={() => setSpice("all")}>Any</button>
              </div>
            </div>

            <div className="ac-cta-card">
              <h4>Build Your Own!</h4>
              <p>Can&apos;t find what you like? Create your own masterpiece with over 30 toppings.</p>
              <button type="button" onClick={() => setTab("build")}>Start Building</button>
            </div>
          </aside>

          <section className="ac-content">
            <div className="ac-tabs">
              <button className={tab === "signature" ? "is-current" : ""} type="button" onClick={() => setTab("signature")}>Signature Pizzas</button>
              <button className={tab === "build" ? "is-current" : ""} type="button" onClick={() => setTab("build")}>Build Your Own</button>
              <button className={tab === "sides" ? "is-current" : ""} type="button" onClick={() => setTab("sides")}>Sides</button>
              <button className={tab === "drinks" ? "is-current" : ""} type="button" onClick={() => setTab("drinks")}>Drinks</button>
              <button className={tab === "reservation" ? "is-current" : ""} type="button" onClick={() => setTab("reservation")}>Reservations</button>
            </div>

            <div className="ac-title-row">
              <h1>{contentTitle}</h1>
              <span>{contentCount}</span>
            </div>

            <div className="ac-hero-banner">
              <img src={heroImage} alt={data?.heroImage?.alt ?? "Restaurant interior"} />
              <div>
                <p>{content.heroEyebrow}</p>
                <p>{content.heroDescription}</p>
              </div>
            </div>

            {tab === "signature" ? (
              <div className="ac-grid">
                {filteredDishes.map((dish, index) => {
                  const dishImage =
                    buildSanityImageUrl(dish.image?.asset?._ref, { width: 1000, height: 700 }) ??
                    fallbackRestaurantImages[index % fallbackRestaurantImages.length];

                  const dishId = `dish-${index}-${dish.name ?? "item"}`;

                  return (
                    <article className="ac-card" key={`${dish.name}-${dish.price}-${index}`}>
                      <div className="ac-card-image">
                        <img src={dishImage} alt={dish.image?.alt ?? dish.name ?? "Pizza"} />
                        <span>4.{9 - (index % 4)}</span>
                      </div>
                      <div className="ac-card-body">
                        <div className="ac-card-top">
                          <h3>{dish.name}</h3>
                          <strong>{dish.price}</strong>
                        </div>
                        <p>{dish.description}</p>
                        <button
                          type="button"
                          onClick={() => addToCart({ id: dishId, name: dish.name, price: dish.price })}
                        >
                          Add
                        </button>
                      </div>
                    </article>
                  );
                })}
                {filteredDishes.length === 0 ? (
                  <article className="ac-empty-state">
                    <h3>No pizzas match your filters</h3>
                    <p>Try clearing dietary or spice filters, or use a broader search term.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setDietary("all");
                        setSpice("all");
                      }}
                    >
                      Reset filters
                    </button>
                  </article>
                ) : null}
              </div>
            ) : null}

            {tab === "build" ? (
              <section className="ac-builder">
                <p>Classic base + mozzarella + house sauce + 2 premium toppings.</p>
                <button
                  type="button"
                  onClick={() => addToCart({ id: "custom-pizza", name: "Custom Pizza", price: "$19.00" })}
                >
                  Add Custom Pizza ($19.00)
                </button>
              </section>
            ) : null}

            {tab === "sides" ? (
              <section className="ac-sides">
                <div className="ac-title-row">
                  <h2>allora Sides</h2>
                  <button type="button" className="ac-link-btn" onClick={() => setTab("sides")}>View all sides</button>
                </div>
                <div className="ac-sides-grid">
                  {sideItems.map((item) => (
                    <article key={item.name}>
                      <img src={item.image} alt={item.name} />
                      <div>
                        <h4>{item.name}</h4>
                        <p>{item.price}</p>
                        <button
                          type="button"
                          onClick={() => addToCart({ id: item.id, name: item.name, price: item.price })}
                        >
                          + Add to cart
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            {tab === "drinks" ? (
              <section className="ac-drinks">
                {drinkItems.map((drink) => (
                  <article key={drink.id}>
                    <div>
                      <h4>{drink.name}</h4>
                      <p>{drink.price}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => addToCart({ id: drink.id, name: drink.name, price: drink.price })}
                    >
                      Add
                    </button>
                  </article>
                ))}
              </section>
            ) : null}

            {tab === "reservation" ? (
              <section className="ac-reservation">
                <form className="ac-reservation-form" onSubmit={submitReservation}>
                  <div className="ac-reservation-grid">
                    <label>
                      Date
                      <input
                        type="date"
                        min={todayLocalDate()}
                        value={reservationDate}
                        onChange={(event) => setReservationDate(event.target.value)}
                        required
                      />
                    </label>

                    <label>
                      Number of Guests
                      <select
                        value={guestCount}
                        onChange={(event) => setGuestCount(Number(event.target.value))}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
                          <option key={count} value={count}>
                            {count} Guest{count > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label>
                      Time Slot
                      <select
                        value={reservationTime}
                        onChange={(event) => setReservationTime(event.target.value)}
                        disabled={isLoadingSlots || availableSlots.length === 0}
                        required
                      >
                        {availableSlots.length === 0 ? (
                          <option value="">{isLoadingSlots ? "Loading slots..." : "No slots available"}</option>
                        ) : (
                          availableSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))
                        )}
                      </select>
                    </label>

                    <label>
                      Full Name
                      <input
                        type="text"
                        value={reservationName}
                        onChange={(event) => setReservationName(event.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </label>

                    <label>
                      Phone Number
                      <input
                        type="tel"
                        value={reservationPhone}
                        onChange={(event) => setReservationPhone(event.target.value)}
                        placeholder="+1 555 123 4567"
                        required
                      />
                    </label>
                  </div>

                  <button type="submit" disabled={isSubmittingReservation || availableSlots.length === 0}>
                    {isSubmittingReservation ? "Confirming..." : "Reserve Table"}
                  </button>
                </form>

                {reservationStatus ? (
                  <p className={`ac-reservation-msg ${reservationStatus.kind === "success" ? "is-success" : "is-error"}`}>
                    {reservationStatus.message}
                  </p>
                ) : null}
              </section>
            ) : null}
          </section>
        </div>
      </main>

      {isCartOpen ? <button type="button" className="ac-cart-backdrop" onClick={() => setIsCartOpen(false)} aria-label="Close cart overlay" /> : null}

      <aside className={`ac-cart-panel ${isCartOpen ? "is-open" : ""}`} aria-label="Shopping cart">
        <div className="ac-cart-header">
          <h3>Your Cart</h3>
          <button type="button" onClick={() => setIsCartOpen(false)}>
            Close
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p className="ac-cart-empty">Your cart is empty.</p>
        ) : (
          <>
            <div className="ac-cart-list">
              {cartItems.map((item) => (
                <div key={item.id} className="ac-cart-item">
                  <div>
                    <h4>{item.name}</h4>
                    <p>${item.price.toFixed(2)}</p>
                  </div>
                  <div className="ac-qty-controls">
                    <button type="button" onClick={() => updateQuantity(item.id, -1)}>
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, 1)}>
                      +
                    </button>
                  </div>
                  <button type="button" className="ac-remove" onClick={() => removeItem(item.id)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="ac-cart-footer">
              <p>Total</p>
              <strong>${total.toFixed(2)}</strong>
            </div>
            <div className="ac-swipe-wrap">
              <p>Swipe to place order</p>
              <input
                type="range"
                min={0}
                max={100}
                value={swipeProgress}
                onChange={(event) => handleSwipeChange(Number(event.target.value))}
                aria-label="Swipe to place order"
              />
            </div>
          </>
        )}

        {orderMessage ? <p className="ac-order-msg">{orderMessage}</p> : null}
      </aside>

      <footer className="ac-footer">
        <div className="ac-footer-grid">
          <div>
            <div className="ac-brand">
              <span className="ac-brand-icon">a</span>
              <h2>allora</h2>
            </div>
            <p>
              Handcrafted pizzas with premium ingredients. Authentic recipes made for the modern
              palate.
            </p>
          </div>
          <div>
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Our Kitchen</a>
            <a href="#">Careers</a>
          </div>
          <div>
            <h4>Support</h4>
            <a href="#">Help Center</a>
            <a href="#">Store Locator</a>
            <a href="#">Contact</a>
          </div>
        </div>
        <p className="ac-copyright">© 2026 allora. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Restaurant;
