import "./About.css";

const ico = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
const FEATURES = [
  { title: "Thoughtfully designed.", icon: <svg viewBox="0 0 24 24" {...ico}><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M3 9h18M9 9v11" /></svg> },
  { title: "Intelligently developed.", icon: <svg viewBox="0 0 24 24" {...ico}><path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" /></svg> },
  { title: "Ready to launch.", icon: <svg viewBox="0 0 24 24" {...ico}><path d="M5 19c0-4 2-7 6-10 2-1.6 5-2.6 8-3-.4 3-1.4 6-3 8-3 4-6 6-11 5z" /><circle cx="14.5" cy="9.5" r="1.4" /><path d="M5 19l-1 1" /></svg> },
];

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__inner">
        <div className="about__head">
          <p className="eyebrow">About RMT</p>
          <h2 className="section-title">A smarter way to build your <em>website.</em></h2>
        </div>
        <div className="about__body">
          <p className="about__text">
            RMT (React Material Template) is a streamlined website development solution by Verligte.
            We combine considered design, proven structure, and modern development practices to create
            professional websites with a more efficient approach.
          </p>
          {/* <ul className="about__features">
            {FEATURES.map((f) => (
              <li key={f.title}>
                <span className="about__icon">{f.icon}</span>
                <span>{f.title}</span>
              </li>
            ))}
          </ul> */}
        </div>
      </div>
    </section>
  );
}
