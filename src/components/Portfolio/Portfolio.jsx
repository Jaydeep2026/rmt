
import { useEffect, useRef, useState } from "react";
import "./Portfolio.css";

const WORK = [
  {
    name: "Hotel Alif International",
    type: "Hospitality",
    description:
      "A welcoming digital presence showcasing the hotel’s accommodation, facilities and guest experience in Mumbai.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=85",
    url: "https://example.com",
  },
  {
    name: "Studio Forma",
    type: "Architecture",
    description:
      "A refined digital experience highlighting architectural projects, creative spaces and contemporary design.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85",
    url: "https://example.com",
  },
  {
    name: "Nova Advisors",
    type: "Professional Services",
    description:
      "A professional website designed to communicate expertise, services and business credibility.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85",
    url: "https://example.com",
  },
  {
    name: "Atelier Noor",
    type: "Retail",
    description:
      "A modern online presence showcasing products, brand identity and a distinctive shopping experience.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=85",
    url: "https://example.com",
  },
];

const ArrowIcon = ({ direction = "right" }) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      transform: direction === "left" ? "rotate(180deg)" : "none",
    }}
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const CloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="21"
    height="21"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="m18 6-12 12M6 6l12 12" />
  </svg>
);

const CategoryIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="21"
    height="21"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M7 7V4h10v3M7 20v-5h4v5M15 20v-5h4v5" />
  </svg>
);

const ExternalIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17 17 7M7 7h10v10" />
  </svg>
);

export default function Portfolio() {
  const track = useRef(null);
  const [selected, setSelected] = useState(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const sync = () => {
    const el = track.current;
    if (!el) return;

    setEdge({
      start: el.scrollLeft <= 8,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8,
    });
  };

  useEffect(() => {
    sync();

    const el = track.current;
    if (!el) return;

    el.addEventListener("scroll", sync);
    window.addEventListener("resize", sync);

    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  useEffect(() => {
    if (!selected) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelected(null);

      if (e.key === "ArrowRight") {
        setSelected((current) => {
          if (!current) return null;
          const index = WORK.findIndex((item) => item.name === current.name);
          return WORK[(index + 1) % WORK.length];
        });
      }

      if (e.key === "ArrowLeft") {
        setSelected((current) => {
          if (!current) return null;
          const index = WORK.findIndex((item) => item.name === current.name);
          return WORK[(index - 1 + WORK.length) % WORK.length];
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selected]);

  const go = (direction) => {
    const el = track.current;
    const card = el?.querySelector(".work__card");

    if (!el || !card) return;

    el.scrollBy({
      left: direction * (card.getBoundingClientRect().width + 20),
      behavior: "smooth",
    });
  };

  return (
    <section className="work" id="portfolio">
      <div className="work__inner">
        <div className="work__head">
          <div className="work__heading">
            <h2 className="section-title">
              Made with <em>RMT.</em>
            </h2>

            <h3 className="work__subtitle">
              Good work speaks for itself.
            </h3>

            <p className="work__description">
              We bring your requirements to life through thoughtful design,
              reliable development and attention to every detail.
            </p>
          </div>

          <div className="work__nav">
            <button
              onClick={() => go(-1)}
              disabled={edge.start}
              aria-label="Previous"
              type="button"
            >
              <ArrowIcon direction="left" />
            </button>

            <button
              onClick={() => go(1)}
              disabled={edge.end}
              aria-label="Next"
              className="is-dark"
              type="button"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>

        <div className="work__track" ref={track} onScroll={sync}>
          {WORK.map((item) => (
            <article
              className="work__card"
              key={item.name}
              onClick={() => setSelected(item)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelected(item);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`View ${item.name} project`}
            >
              <div className="work__img">
                <img
                  src={item.image}
                  alt={`${item.name} website preview`}
                  loading="lazy"
                />

                <span className="work__label">{item.name}</span>

                <span className="work__view">
                  <ArrowIcon />
                </span>
              </div>

              <h3>{item.name}</h3>
              <p>{item.type}</p>
            </article>
          ))}
        </div>

        <div className="work__bottom">
          <p>Selected projects developed with RMT.</p>
          <span>{String(WORK.length).padStart(2, "0")} Projects</span>
        </div>
      </div>

      {selected && (
        <div
          className="work__overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setSelected(null);
          }}
        >
          <div
            className="work__modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${selected.name} project details`}
          >
            <button
              className="work__close"
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close project preview"
            >
              <CloseIcon />
            </button>

            <div className="work__modal-content">
              <div className="work__preview">
                <img
                  src={selected.image}
                  alt={`${selected.name} website preview`}
                />
                <span className="work__preview-caption">
                  Website Preview
                </span>
              </div>

              <div className="work__details">
                <div className="work__details-top">
                  <div className="work__details-heading">
                    <span className="work__eyebrow">
                      PROJECT SHOWCASE
                    </span>
                    <h2>{selected.name}</h2>
                  </div>

                  <span className="work__category">
                    <CategoryIcon />
                    {selected.type}
                  </span>
                </div>

                <p className="work__description">
                  {selected.description}
                </p>
              </div>
            </div>

            <div className="work__modal-footer">
              <p>
                Built with <strong>RMT</strong>
              </p>

              <a
                href={selected.url}
                target="_blank"
                rel="noopener noreferrer"
                className="work__visit"
              >
                Visit Website
                <ExternalIcon />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
