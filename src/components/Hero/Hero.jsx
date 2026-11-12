import "./Hero.css";

/* The big logo itself is the fixed <Logo/> component; Hero provides the stage behind it. */
export default function Hero() {
  return (
    <section className="rmt-hero" id="top">
      {/* <svg className="rmt-ribbon" viewBox="0 0 600 400" preserveAspectRatio="xMaxYMax slice" aria-hidden="true">
        <defs>
          <linearGradient id="rg1" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#ff5a0a" /><stop offset="1" stopColor="#ff8a3d" />
          </linearGradient>
          <linearGradient id="rg2" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#0d0d0d" /><stop offset="1" stopColor="#ff5a0a" />
          </linearGradient>
        </defs>
        <path d="M600 40 C480 60 330 150 230 260 C170 325 110 380 40 400 L600 400 Z" fill="url(#rg1)" />
        <path d="M600 140 C500 170 400 250 330 340 C300 375 270 392 240 400 L600 400 Z" fill="url(#rg2)" opacity=".9" />
      </svg>
      <div className="rmt-hero__chev" aria-hidden="true" /> */}
    </section>
  );
}
