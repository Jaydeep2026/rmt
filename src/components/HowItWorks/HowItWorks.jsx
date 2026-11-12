import useInView from "../../hooks/useInView.js";
import "./HowItWorks.css";

const STEPS = [
  { title: "Understand", text: "We learn about your business, goals, and audience." },
  { title: "Shape", text: "We establish the layout, direction, and content structure." },
  { title: "Refine", text: "We bridge together the design with clarity and detail." },
  { title: "Build", text: "We develop your responsive website using modern technology." },
  { title: "Launch", text: "We test, optimize, and get your website ready for the world." },
];

export default function HowItWorks() {
  const [ref, seen] = useInView(0.3);

  return (
    <section className={`how ${seen ? "is-in" : ""}`} id="how">
      <div className="how__inner">
        <p className="eyebrow">How it works</p>
        <h2 className="section-title">From idea to <em>live website.</em></h2>

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
