import { useEffect, useState } from "react";
import IntlTelInput from "intl-tel-input/reactWithUtils";
import "intl-tel-input/styles";
import "./Contact.css";

const BUDGETS = {
  single: ["₹15,000 – ₹20,000", "₹20,000+"],
  multipage: ["₹25,000 – ₹35,000", "₹35,000 – ₹45,000", "₹45,000+"],
};

const EMPTY = {
  name: "",
  company: "",
  email: "",
  websiteType: "",
  budget: "",
  message: "",
  website: "",
};

const API_URL =
  import.meta.env.VITE_CONTACT_API_URL ||
  "http://localhost/rmt-backend/contact.php";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

/* ---------- Validation helpers ---------- */

const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M}\s.'-]{1,99}$/u;

const EMAIL_RE =
  /^[A-Za-z0-9](?:[A-Za-z0-9._%+-]{0,62}[A-Za-z0-9])?@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

const BLOCKED_EMAIL_DOMAINS = [
  "mailinator.com",
  "tempmail.com",
  "temp-mail.org",
  "10minutemail.com",
  "guerrillamail.com",
  "sharklasers.com",
  "yopmail.com",
  "trashmail.com",
  "throwawaymail.com",
  "getnada.com",
  "dispostable.com",
  "maildrop.cc",
  "fakeinbox.com",
  "mailnesia.com",
  "example.com",
  "example.org",
  "test.com",
  "domain.com",
];

const FAKE_NUMBERS = ["1234567890", "0123456789", "9876543210", "0987654321"];

function validateEmail(email) {
  if (!EMAIL_RE.test(email) || email.includes("..")) {
    return "Please enter a valid email address.";
  }
  const domain = email.split("@")[1].toLowerCase();
  if (BLOCKED_EMAIL_DOMAINS.includes(domain)) {
    return "Temporary or fake email addresses are not allowed.";
  }
  return "";
}

function isFakePhone(e164) {
  const last10 = e164.replace(/\D/g, "").slice(-10);
  return /^(\d)\1{5,}$/.test(last10) || FAKE_NUMBERS.includes(last10);
}

function getRecaptchaToken() {
  return new Promise((resolve, reject) => {
    if (!window.grecaptcha) {
      reject(
        new Error(
          "Security check could not load. Please refresh the page and try again."
        )
      );
      return;
    }

    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(RECAPTCHA_SITE_KEY, { action: "contact_form" })
        .then(resolve)
        .catch(() =>
          reject(
            new Error("Security check failed. Please refresh and try again.")
          )
        );
    });
  });
}

export default function Contact() {
  const [v, setV] = useState(EMPTY);
  const [phone, setPhone] = useState(""); // E.164, e.g. +919876543210
  const [phoneValid, setPhoneValid] = useState(false);
  const [phoneKey, setPhoneKey] = useState(0); // remounts phone input to reset it
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const [popup, setPopup] = useState(null); // { type, title, message }

  const budgetOptions =
    v.websiteType === "single" ? BUDGETS.single : BUDGETS.multipage;

  const closePopup = () => setPopup(null);

  // Load reCAPTCHA v3 script once.
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) {
      console.error("VITE_RECAPTCHA_SITE_KEY is missing in your .env file.");
      return;
    }
    if (document.getElementById("recaptcha-v3-script")) return;

    const script = document.createElement("script");
    script.id = "recaptcha-v3-script";
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  // Close popup with Escape key.
  useEffect(() => {
    if (!popup) return;
    const onKey = (e) => e.key === "Escape" && closePopup();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [popup]);

  const clearError = (field) =>
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });

  const set = (e) => {
    const { name, value } = e.target;

    setV((current) => ({
      ...current,
      [name]: value,
      ...(name === "websiteType" ? { budget: "" } : {}),
    }));

    clearError(name);
    if (name === "websiteType") clearError("budget");

    setStatus("idle");
    setFeedback("");
  };

  const onPhoneNumber = (number) => {
    setPhone(number || "");
    clearError("phone");
    setStatus("idle");
    setFeedback("");
  };

  const validate = () => {
    const err = {};
    const name = v.name.trim();
    const email = v.email.trim();
    const website = v.website.trim();

    if (!NAME_RE.test(name)) {
      err.name = "Please enter your real name (letters only).";
    }

    const emailError = validateEmail(email);
    if (emailError) err.email = emailError;

    if (!phone) {
      err.phone = "Phone number is required.";
    } else if (!phoneValid) {
      err.phone = "Enter a valid phone number for the selected country.";
    } else if (isFakePhone(phone)) {
      err.phone = "Please enter a real phone number.";
    }

    if (!v.websiteType) err.websiteType = "Please select a website type.";
    if (!v.budget) err.budget = "Please select your budget.";

    if (website && !/^https?:\/\/[^\s.]+\.[^\s]{2,}$/i.test(website)) {
      err.website = "Enter a valid URL starting with http:// or https://";
    }

    return err;
  };

  const submit = async (e) => {
    e.preventDefault();

    if (status === "sending") return;

    const err = validate();
    setErrors(err);

    if (Object.keys(err).length > 0) {
      setStatus("error");
      setFeedback("Please fix the highlighted fields.");
      return;
    }

    setStatus("sending");
    setFeedback("");

    try {
      const recaptchaToken = await getRecaptchaToken();

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...v,
          name: v.name.trim(),
          email: v.email.trim().toLowerCase(),
          phone,
          recaptchaToken,
        }),
      });

      const responseText = await response.text();

      let result;
      try {
        result = JSON.parse(responseText);
      } catch {
        console.error("PHP Backend Response:", responseText);
        throw new Error(
          "Server returned an invalid response. Please try again later."
        );
      }

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to submit your enquiry.");
      }

      setStatus("sent");
      setV(EMPTY);
      setPhone("");
      setPhoneValid(false);
      setPhoneKey((k) => k + 1);
      setErrors({});
      setPopup({
        type: "success",
        title: "Enquiry Sent!",
        message:
          result.message ||
          "Thank you! We've received your enquiry and will get in touch shortly.",
      });
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
      setPopup({
        type: "error",
        title: "Something went wrong",
        message:
          error.message || "We couldn't send your enquiry. Please try again.",
      });
    }
  };

  const fieldClass = (field, extra = "") =>
    `${extra} ${errors[field] ? "has-error" : ""}`.trim();

  const FieldError = ({ field }) =>
    errors[field] ? (
      <small className="contact__error" role="alert">
        {errors[field]}
      </small>
    ) : null;

  return (
    <section className="contact" id="contact">
      <div className="contact__inner">
        <div className="contact__copy">
          <h2 className="section-title">
            Have a project <em>in mind?</em>
          </h2>

          <p className="contact__text">
            Tell us what you're looking to build. Share your requirements and
            budget, and let's get your website underway.
          </p>

          <p className="contact__note">
            <span />
            Currently accepting projects from businesses across India.
          </p>
        </div>

        <form className="contact__form" onSubmit={submit} noValidate>
          <label className={fieldClass("name")}>
            <span className="contact__label">
              Your Name <span className="contact__required">*</span>
            </span>
            <input
              name="name"
              value={v.name}
              onChange={set}
              placeholder="Full name"
              autoComplete="name"
              maxLength={100}
              required
            />
            <FieldError field="name" />
          </label>

          <label>
            <span className="contact__label">Business / Company Name</span>
            <input
              name="company"
              value={v.company}
              onChange={set}
              placeholder="Company name"
              autoComplete="organization"
              maxLength={150}
            />
          </label>

          <label className={fieldClass("email")}>
            <span className="contact__label">
              Email Address <span className="contact__required">*</span>
            </span>
            <input
              name="email"
              type="email"
              value={v.email}
              onChange={set}
              placeholder="you@company.com"
              autoComplete="email"
              maxLength={254}
              required
            />
            <FieldError field="email" />
          </label>

          <div className={fieldClass("phone", "contact__field")}>
            <span className="contact__label">
              Phone / WhatsApp <span className="contact__required">*</span>
            </span>
            <IntlTelInput
              key={phoneKey}
              onChangeNumber={onPhoneNumber}
              onChangeValidity={setPhoneValid}
              initOptions={{
                initialCountry: "in",
                separateDialCode: true,
                nationalMode: true,
                strictMode: true,
                dropdownContainer: document.body,
              }}
              inputProps={{
                name: "phone",
                placeholder: "98765 43210",
                autoComplete: "tel",
                maxLength: 20,
              }}
            />
            <FieldError field="phone" />
          </div>

          <label className={fieldClass("websiteType", "full")}>
            <span className="contact__label">
              What type of website are you looking for?{" "}
              <span className="contact__required">*</span>
            </span>
            <select
              name="websiteType"
              value={v.websiteType}
              onChange={set}
              required
            >
              <option value="">Select website type</option>
              <option value="single">Single-page website</option>
              <option value="multipage">Multipage website</option>
              <option value="not-sure">Not sure yet</option>
            </select>
            <FieldError field="websiteType" />
          </label>

          <label className={fieldClass("budget", "full")}>
            <span className="contact__label">
              What is your approximate budget?{" "}
              <span className="contact__required">*</span>
            </span>
            <select
              name="budget"
              value={v.budget}
              onChange={set}
              required
              disabled={!v.websiteType}
            >
              <option value="">
                {v.websiteType
                  ? "Select your budget"
                  : "Select website type first"}
              </option>
              {budgetOptions.map((budget) => (
                <option key={budget} value={budget}>
                  {budget}
                </option>
              ))}
            </select>
            <FieldError field="budget" />
          </label>

          <label className="full">
            <span className="contact__label">Tell us about your project</span>
            <textarea
              name="message"
              rows="4"
              value={v.message}
              onChange={set}
              placeholder="Project goals, features, timeline…"
              maxLength={5000}
            />
          </label>

          <label className={fieldClass("website", "full")}>
            <span className="contact__label">Current Website (optional)</span>
            <input
              name="website"
              type="url"
              value={v.website}
              onChange={set}
              placeholder="https://"
              autoComplete="url"
              maxLength={500}
            />
            <FieldError field="website" />
          </label>

          <div className="full contact__actions">
            <button
              type="submit"
              className="contact__btn"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending..." : "Request a Quote"}

              {status !== "sending" && (
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              )}
            </button>

            {feedback && (
              <span className="contact__msg is-error" role="alert">
                {feedback}
              </span>
            )}
          </div>

          <p className="full contact__recaptcha">
            This site is protected by reCAPTCHA and the Google{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </a>{" "}
            apply.
          </p>
        </form>
      </div>

      {popup && (
        <div className="contact-modal" onClick={closePopup} role="presentation">
          <div
            className="contact-modal__box"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`contact-modal__icon ${
                popup.type === "error" ? "is-error" : ""
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                width="30"
                height="30"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {popup.type === "error" ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M5 13l4 4L19 7" />
                )}
              </svg>
            </div>

            <h3 id="contact-modal-title">{popup.title}</h3>
            <p>{popup.message}</p>

            <button type="button" className="contact__btn" onClick={closePopup}>
              {popup.type === "error" ? "Try Again" : "Done"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}