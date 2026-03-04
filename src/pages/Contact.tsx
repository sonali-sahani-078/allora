import {  useState } from "react";
import type {  FormEvent } from "react";

import { Link } from "react-router-dom";
import "./Contact.css";

type SubmitState = "idle" | "submitting" | "success" | "error";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initialForm: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;

function Contact() {
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const isSubmitting = submitState === "submitting";

  const submitToWeb3Forms = async (payload: ContactFormData) => {
    if (!web3FormsAccessKey) {
      throw new Error("Missing Web3Forms access key.");
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: web3FormsAccessKey,
        name: payload.name,
        from_name: payload.name,
        subject: payload.subject,
        replyto: payload.email,
        phone: payload.phone,
        email: payload.email,
        message: payload.message,
        source: "allora-contact-page",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit contact form.");
    }

    const responseText = await response.text();
    if (!responseText) {
      throw new Error("Empty response from Web3Forms.");
    }

    let parsed: { success?: boolean; message?: string };
    try {
      parsed = JSON.parse(responseText) as { success?: boolean; message?: string };
    } catch {
      throw new Error("Invalid JSON response from Web3Forms.");
    }

    if (!parsed.success) {
      throw new Error(parsed.message || "Web3Forms returned unsuccessful response.");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("submitting");
    setStatusMessage("");

    try {
      await submitToWeb3Forms(form);
      setSubmitState("success");
      setStatusMessage("Thanks, your message has been sent.");
      setForm(initialForm);
    } catch (error) {
      console.error("Contact submit failed:", error);
      const message = error instanceof Error ? error.message : "Unknown submit error.";
      setSubmitState("error");
      setStatusMessage(`Unable to send: ${message}`);
    }
  };

  return (
    <div className="contact-container">
      <div className="bg-orb orb-one" />
      <div className="bg-orb orb-two" />

      <header className="navbar">
        <div className="nav-inner">
          <div className="logo">
            <span className="icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" role="img">
                <defs>
                  <linearGradient id="pizzaGradContact" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f7c66b" />
                    <stop offset="100%" stopColor="#de8b33" />
                  </linearGradient>
                </defs>
                <path
                  d="M6 10h36L24 42z"
                  fill="url(#pizzaGradContact)"
                  stroke="#b76019"
                  strokeWidth="2"
                />
                <circle cx="19" cy="22" r="2.5" fill="#c53d22" />
                <circle cx="27" cy="18" r="2.5" fill="#c53d22" />
                <circle cx="25" cy="27" r="2.5" fill="#8f9a32" />
              </svg>
            </span>
            <h2>allora</h2>
          </div>

          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/restaurant">Menu</Link>
            <Link to="/contact">Contact Us</Link>
          </nav>

          <div className="nav-actions">
            <Link to="/restaurant" className="primary-btn">
              Order Now
            </Link>
          </div>
        </div>
      </header>

      <main className="contact-main">
        <section className="contact-hero">
          <h1>
            Contact <span>allora</span>
          </h1>
          <p>Questions, catering requests, and feedback. Send us a message and we will get back soon.</p>
        </section>

        <section className="contact-grid">
          <article className="contact-card">
            <h2>Send a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <label>
                Name
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                />
              </label>
              <label>
                Phone
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                />
              </label>
              <label>
                Subject
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(event) => setForm((prev) => ({ ...prev, subject: event.target.value }))}
                />
              </label>
              <label>
                Message
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                />
              </label>
              <button type="submit" className="primary-btn large" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
            {statusMessage ? (
              <p className={`form-status ${submitState === "success" ? "is-success" : "is-error"}`}>
                {statusMessage}
              </p>
            ) : null}
          </article>

          <article className="contact-card">
            <h2>Visit Us</h2>
            <p>Allora Pizza House</p>
            <p>123 Oven Street, Flavor District</p>
            <p>Open Daily: 11:00 AM - 11:00 PM</p>
            <p>Phone: +1 (555) 234-9876</p>
            <p>Email: hello@allora.com</p>
          </article>
        </section>
      </main>
    </div>
  );
}

export default Contact;
