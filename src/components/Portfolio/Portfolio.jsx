import { useEffect, useRef, useState } from "react";
import "./Portfolio.css";

// add `image: "/work/cliff.jpg"` to use real screenshots; otherwise the gradient is shown
const WORK = [
  { name: "The Cliff House", type: "Hospitality", bg: "linear-gradient(160deg,#1c2a44 0%,#5b4a6b 45%,#e8955f 100%)" },
  { name: "Studio Forma", type: "Architecture", bg: "linear-gradient(160deg,#f1e6d8 0%,#d9a67a 55%,#a4673f 100%)" },
  { name: "Nova Advisors", type: "Professional Services", bg: "linear-gradient(160deg,#0b1020 0%,#1a2f6b 55%,#4f7cff 100%)" },
  { name: "Atelier Noor", type: "Retail", bg: "linear-gradient(160deg,#2b1b14 0%,#8a4a2a 55%,#ff8a3d 100%)" },
];
const Arrow = ({ dir = 1 }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: dir < 0 ? "scaleX(-1)" : "none" }}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function Portfolio() {
  const track = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const sync = () => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  };
  useEffect(sync, []);

  const go = (dir) => {
    const el = track.current;
    const card = el.querySelector(".work__card");
    el.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: "smooth" });
  };

  return (
    <section className="work" id="portfolio">
      <div className="work__inner">
        <div className="work__head">
          <div>
            <p className="eyebrow">Our work</p>
            <h2 className="section-title">Good work <br />speaks for <em>itself.</em></h2>
          </div>
          <div className="work__nav">
            <button onClick={() => go(-1)} disabled={edge.start} aria-label="Previous"><Arrow dir={-1} /></button>
            <button onClick={() => go(1)} disabled={edge.end} aria-label="Next" className="is-dark"><Arrow /></button>
          </div>
        </div>

        <div className="work__track" ref={track} onScroll={sync}>
          {WORK.map((w) => (
            <article className="work__card" key={w.name}>
              <div className="work__img" style={{ backgroundImage: w.image ? `url(${w.image})` : w.bg }}>
                <span className="work__label">{w.name}</span>
              </div>
              <h3>{w.name}</h3>
              <p>{w.type}</p>
            </article>
          ))}
        </div>

        <a className="work__btn" href="#contact">Explore our Portfolio <Arrow /></a>
      </div>
    </section>
  );
}
