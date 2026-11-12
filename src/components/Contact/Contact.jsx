import { useState } from "react";
import "./Contact.css";

const BUDGETS = ["Under ₹50,000", "₹50,000 – ₹1,50,000", "₹1,50,000 – ₹3,00,000", "₹3,00,000 – ₹5,00,000", "₹5,00,000+"];
const EMPTY = { name: "", company: "", email: "", phone: "", budget: "", message: "", website: "" };

export default function Contact() {
  const [v, setV] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | error | sent

  const set = (e) => setV((s) => ({ ...s, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!v.name.trim() || !/^\S+@\S+\.\S+$/.test(v.email)) return setStatus("error");
    // TODO: send `v` to your backend / email service here
    console.log("Quote request:", v);
    setStatus("sent");
    setV(EMPTY);
  };

  return (
    <section className="contact" id="contact">
      <div className="contact__inner">
        <div className="contact__copy">
          <p className="eyebrow">Get in touch</p>
          <h2 className="section-title">Have a project <em>in mind?</em></h2>
          <p className="contact__text">
            Tell us about your business, what you need, and the budget you’re working with. RMT takes it from there.
          </p>
          <p className="contact__note"><span /> Currently accepting projects from businesses worldwide.</p>
        </div>

        <form className="contact__form" onSubmit={submit} noValidate>
          <label>Your Name
            <input name="name" value={v.name} onChange={set} placeholder="Full name" autoComplete="name" />
          </label>
          <label>Business / Company Name
            <input name="company" value={v.company} onChange={set} placeholder="Company name" autoComplete="organization" />
          </label>
          <label>Email Address
            <input name="email" type="email" value={v.email} onChange={set} placeholder="you@company.com" autoComplete="email" />
          </label>
          <label>Phone / WhatsApp
            <input name="phone" type="tel" value={v.phone} onChange={set} placeholder="+91 00000 00000" autoComplete="tel" />
          </label>
          <label className="full">Approximate Budget
            <select name="budget" value={v.budget} onChange={set}>
              <option value="">Select an option</option>
              {BUDGETS.map((b) => <option key={b}>{b}</option>)}
            </select>
          </label>
          <label className="full">Tell us about your project
            <textarea name="message" rows="4" value={v.message} onChange={set} placeholder="Project goals, features, timeline…" />
          </label>
          <label className="full">Current Website (optional)
            <input name="website" value={v.website} onChange={set} placeholder="https://" autoComplete="url" />
          </label>

          <div className="full contact__actions">
            <button type="submit" className="contact__btn">
              Request a Quote
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
            {status === "error" && <span className="contact__msg is-error" role="alert">Please add your name and a valid email.</span>}
            {status === "sent" && <span className="contact__msg" role="status">Thanks! We’ll get back to you shortly.</span>}
          </div>
        </form>
      </div>
    </section>
  );
}
