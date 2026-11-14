
import { forwardRef, useState } from "react";
import { LOGO } from "./logoPaths.js";
import "./Logo.css";

const Logo = forwardRef(function Logo({ onAnimationComplete }, ref) {
  const [animationComplete, setAnimationComplete] = useState(false);

  const goTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const byLetters = [...LOGO.by, ...LOGO.verligte];

  const handleLastLetterAnimation = () => {
    if (animationComplete) return;

    setAnimationComplete(true);
    onAnimationComplete?.();
  };

  return (
    <a
      className={`rmt-logo ${animationComplete ? "rmt-logo--complete" : ""}`}
      ref={ref}
      href="#top"
      onClick={goTop}
      aria-label="RMT – React Material Template by Verligte"
    >
      <svg viewBox={LOGO.viewBox} aria-hidden="true">
        <defs>
          <clipPath id="rmt-clip-letters">
            <rect x="0" y="100" width="900" height="280" />
          </clipPath>
        </defs>

        <path
          className="sq sq--top"
          d={LOGO.sqTop}
          fill="var(--orange)"
          fillRule="evenodd"
        />

        <path
          className="sq sq--bottom"
          d={LOGO.sqBottom}
          fill="var(--orange)"
          fillRule="evenodd"
        />

        <g clipPath="url(#rmt-clip-letters)">
          {["r", "m", "t"].map((k, i) => (
            <path
              key={k}
              className="ltr"
              style={{ "--i": i }}
              d={LOGO[k]}
              fill="#000"
              fillRule="evenodd"
            />
          ))}
        </g>

        <g className="tag">
          {LOGO.sub.map((d, i) => (
            <path
              key={i}
              className="tag__c"
              style={{ "--i": i }}
              d={d}
              fill="var(--orange)"
              fillRule="evenodd"
            />
          ))}
        </g>

        <g className="bv">
          {byLetters.map((o, i) => (
            <path
              key={i}
              className="bv__c"
              style={{ "--i": i }}
              d={o.d}
              fill={o.fill}
              fillRule="evenodd"
              onAnimationEnd={
                i === byLetters.length - 1
                  ? handleLastLetterAnimation
                  : undefined
              }
            />
          ))}
        </g>
      </svg>
    </a>
  );
});

export default Logo;
