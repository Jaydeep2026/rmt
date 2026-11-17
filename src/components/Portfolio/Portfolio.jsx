
import { useEffect, useState } from "react";
import "./Portfolio.css";

const WORK = [
  {
    id: "eco-laboratories",
    name: "Ecological Laboratories",
    category: "Testing & Laboratories",
    type: "Multipage",
    description:
      "A professional website presenting the company's consumer product testing services, laboratory capabilities and industry expertise.",
    featuredImage: "/images/portfolio/ecolabindia.jpg",
    modalImage: "/images/portfolio/ecolabindia.jpg",
    url: "https://ecolabindia.com/",
  },
  {
    id: "ajr-website",
    name: "AJR Infra & Tolling Limited",
    category: "Infrastructure",
    type: "Multipage",
    description:
      "A corporate digital platform presenting the company's infrastructure portfolio, sector expertise, projects and investor information.",
    featuredImage: "/images/portfolio/ajrinfra.jpg",
    modalImage: "/images/portfolio/ajrinfra.jpg",
    url: "https://www.ajrinfra.in/",
  },
  {
    id: "elaya-wellness",
    name: "Elaya Wellness",
    category: "Wellness",
    type: "Single Page",
    description:
      "A focused digital presence that brings the brand, its wellness offerings and essential business information together in a seamless browsing experience.",
    featuredImage: "/images/portfolio/elayawellness.jpg",
    modalImage: "/images/portfolio/elayawellness.jpg",
    url: "https://www.elayawellness.com/",
  },
  {
    id: "echjay-group",
    name: "Echjay Group",
    category: "Corporate / Real Estate",
    type: "Multipage",
    description:
      "A corporate website highlighting the group's real estate presence, redevelopment activities and approach to modern living.",
    featuredImage: "/images/portfolio/echjaygroup.jpg",
    modalImage: "/images/portfolio/echjaygroup.jpg",
    url: "https://www.echjaygroup.com/",
  },
  {
    id: "athena-suites",
    name: "Athena Suites",
    category: "Hospitality",
    type: "Single Page",
    description:
      "A compact website that brings together the property's identity, accommodation details and essential information in one streamlined experience.",
    featuredImage: "/images/portfolio/athenasuites.jpg",
    modalImage: "/images/portfolio/athenasuites.jpg",
    url: "https://www.athenasuites.in/",
  },
  {
    id: "shrishti-cbd",
    name: "Shrishti CBD",
    category: "Real Estate",
    type: "Multipage",
    description:
      "A comprehensive property website showcasing an integrated development through dedicated sections for residential, commercial and retail spaces.",
    featuredImage: "/images/portfolio/shrishticbd.jpg",
    modalImage: "/images/portfolio/shrishticbd.jpg",
    url: "https://www.shrishticbd.com/",
  },
  {
    id: "hotel-sahara",
    name: "Hotel Sahara International",
    category: "Hospitality",
    type: "Multipage",
    description:
      "A hospitality-focused website designed to present the hotel's accommodation and services while helping visitors discover its offerings.",
    featuredImage: "/images/portfolio/hotelsaharainternational.jpg",
    modalImage: "/images/portfolio/hotelsaharainternational.jpg",
    url: "http://www.hotelsaharainternational.com/",
  },
  {
    id: "hotel-alif",
    name: "Hotel Alif International",
    category: "Hospitality",
    type: "Multipage",
    description:
      "A hotel website designed to showcase its accommodation, facilities and hospitality offerings, providing visitors with a convenient way to explore their stay.",
    featuredImage: "/images/portfolio/hotelalifinternational.jpg",
    modalImage: "/images/portfolio/hotelalifinternational.jpg",
    url: "http://www.hotelalifinternational.com/",
  },
  {
    id: "hotel-zillion",
    name: "Hotel Zillion International",
    category: "Hospitality",
    type: "Multipage",
    description:
      "A welcoming hotel website presenting room categories, amenities and essential guest information through a clear and accessible layout.",
    featuredImage: "/images/portfolio/hotelzillioninternational.jpg",
    modalImage: "/images/portfolio/hotelzillioninternational.jpg",
    url: "https://hotelzillioninternational.com/",
  },
];

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
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
    aria-hidden="true"
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

function ProjectCard({ item, index, onOpen }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <article
      className="work__card"
      style={{ "--card-index": index }}
      onClick={() => onOpen(item)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(item);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View ${item.name} project details`}
    >
      <div className={`work__img ${imageLoaded ? "is-loaded" : ""}`}>
        {!imageLoaded && (
          <div className="work__skeleton" aria-hidden="true">
            <div className="work__skeleton-shimmer" />
          </div>
        )}

        <img
          src={item.featuredImage}
          alt={`${item.name} website preview`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />

        {/* <span className="work__label">{item.name}</span> */}

        <span className="work__view">
          <ArrowIcon />
        </span>
      </div>

      <div className="work__card-info">
        <div className="work__card-title">
          <h3>{item.name}</h3>
          <span>{item.type}</span>
        </div>
        <p>{item.category}</p>
      </div>
    </article>
  );
}

export default function Portfolio() {
  const [selected, setSelected] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [previewLoaded, setPreviewLoaded] = useState(false);

  useEffect(() => {
    const openProjectFromHash = () => {
      const projectId = window.location.hash.replace("#", "");

      if (!projectId) {
        setSelected(null);
        return;
      }

      const project = WORK.find((item) => item.id === projectId);

      if (project) {
        setSelected(project);
        setShowAll(true);

        document.getElementById("portfolio")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    openProjectFromHash();

    window.addEventListener("hashchange", openProjectFromHash);
    window.addEventListener("popstate", openProjectFromHash);

    return () => {
      window.removeEventListener("hashchange", openProjectFromHash);
      window.removeEventListener("popstate", openProjectFromHash);
    };
  }, []);

  useEffect(() => {
    if (!selected) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selected]);

  const openModal = (project) => {
    setPreviewLoaded(false);
    setSelected(project);

    if (window.location.hash !== `#${project.id}`) {
      window.history.pushState(null, "", `#${project.id}`);
    }
  };

  const closeModal = () => {
    setSelected(null);
    setPreviewLoaded(false);

    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
  };

  const visibleProjects = showAll ? WORK : WORK.slice(0, 3);

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
        </div>

        <div className="work__grid">
          {visibleProjects.map((item, index) => (
            <ProjectCard
              key={item.id}
              item={item}
              index={index}
              onOpen={openModal}
            />
          ))}
        </div>

        {WORK.length > 3 && (
          <div className="work__more">
            <button
              type="button"
              className="work__more-btn"
              onClick={() => setShowAll((previous) => !previous)}
              aria-expanded={showAll}
            >
              {showAll ? "Show Less" : "See More Projects"}
              <ArrowIcon />
            </button>
          </div>
        )}

        {/* <div className="work__bottom">
          <p>Selected projects developed with RMT.</p>
          <span>{String(WORK.length).padStart(2, "0")} Projects</span>
        </div> */}
      </div>

      {selected && (
        <div
          className="work__overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
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
              onClick={closeModal}
              aria-label="Close project preview"
            >
              <CloseIcon />
            </button>

            <div className="work__modal-content">
              <div
                className={`work__preview ${
                  previewLoaded ? "is-loaded" : ""
                }`}
              >
                {!previewLoaded && (
                  <div className="work__preview-skeleton" aria-hidden="true">
                    <div className="work__skeleton-shimmer" />
                  </div>
                )}

                <img
                  src={selected.modalImage}
                  alt={`${selected.name} complete website preview`}
                  onLoad={() => setPreviewLoaded(true)}
                  onError={() => setPreviewLoaded(true)}
                />

                <span className="work__preview-caption">
                  Website Preview
                </span>
              </div>

              <div className="work__details">
                <div className="work__details-top">
                  <div className="work__details-heading">
                    <span className="work__eyebrow">
                      Client Overview
                    </span>

                    <h2>{selected.name}</h2>
                  </div>

                  
                </div>

                <div className="work__project-meta">
                  <div className="work__meta-item">
                    <span className="work__meta-label">Category</span>
                    <span className="work__meta-value">
                      {selected.category}
                    </span>
                  </div>

                  <div className="work__meta-item">
                    <span className="work__meta-label">Website Type</span>
                    <span className="work__meta-value">
                      {selected.type}
                    </span>
                  </div>
                </div>

                <div className="work__project-description">
                  <span className="work__meta-label">
                    Project Overview
                  </span>

                  <p className="work__description">
                    {selected.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="work__modal-footer">
              <p>
                Built by <strong>RMT</strong>
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
