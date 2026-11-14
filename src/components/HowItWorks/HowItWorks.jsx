import useInView from "../../hooks/useInView.js";
import "./HowItWorks.css";

const STEPS = [
  { title: "Website Brief & Content", text: "Share your business details, website requirements and content with us." },
  { title: "Sitemap & Scope of Work", text: "We map out the website structure, pages and deliverables for your approval." },
  { title: "Layout Development", text: "We bring your content to life through a distinctive layout using our RMT framework." },
  { title: "Client Submission & Corrections", text: "Review your website, share feedback and we'll make the agreed refinements." },
  { title: "Go Live", text: "Once approved, we deploy your website and get your business online." },
];

export default function HowItWorks() {
  const [ref, seen] = useInView(0.3);

  return (
    <section className={`how ${seen ? "is-in" : ""}`} id="how">
      <div className="how__inner">
        <div className="how__heading">
          <h2 className="how__title">
            How it <em>works.</em>
          </h2>

          <h3 className="how__subtitle">
            From brief to live website.
          </h3>

          <p className="how__intro">
            A simple, structured process to take your website from planning to launch.
          </p>
        </div>
        {/* <h2 className="section-title">How it <em>works</em></h2>
        <p className="eyebrow">A simple, structured process to take your website from planning to launch.</p> */}
        <ol className="how__steps" ref={ref}>
          {STEPS.map((s, i) => (
            <li className="how__step" key={s.title} style={{ "--i": i }}>
              <span className="how__node">{String(i + 1).padStart(2, "0")}</span>
              {i < STEPS.length - 1 && (
                <span className="how__arrow" aria-hidden="true">
                  <span className="how__line" />
                  <span className="how__head" />
                </span>
              )}
              <div className="how__body">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
