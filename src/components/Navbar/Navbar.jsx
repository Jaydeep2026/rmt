import { forwardRef, useEffect, useState } from "react";
import "./Navbar.css";

const LINKS_LEFT = [
  { label: "About RMT", href: "#about" },
  { label: "How it Works", href: "#how" },
];
const LINKS_RIGHT = [
  { label: "Visit Verligte", href: "https://verligte.com", external: true },
  { label: "Portfolio", href: "#portfolio" },
];

const Navbar = forwardRef(function Navbar(_, ref) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // highlight link of the section currently on screen
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
          // section left the middle band -> clear it (hero/top has no active link)
          else setActive((prev) => (prev === e.target.id ? "" : prev));
        }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["about", "how", "portfolio", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      el && io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    document.body.classList.toggle("menu-open", open);
    return () => { document.body.style.overflow = ""; document.body.classList.remove("menu-open"); };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const NavLink = ({ link }) => (
    <a
      className="rmt-link"
      href={link.href}
      aria-current={active === link.href.slice(1) ? "true" : undefined}
      {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {link.label}
      {link.external && (
        <svg className="rmt-ext" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M3 9l6-6M4 3h5v5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </a>
  );

  return (
    <>
      <header className="rmt-nav" ref={ref}>
        <div className="rmt-nav__inner">
          <nav className="rmt-nav__side" aria-label="Primary">
            <button
              className="rmt-burger"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="rmt-drawer"
              onClick={() => setOpen((o) => !o)}
            >
              <span /><span /><span />
            </button>
            <div className="rmt-links">{LINKS_LEFT.map((l) => <NavLink key={l.label} link={l} />)}</div>
          </nav>

          {/* empty centre: the fixed <Logo/> docks here */}
          <div className="rmt-nav__logo-slot" aria-hidden="true" />

          <div className="rmt-nav__side rmt-nav__side--right">
            <div className="rmt-links">{LINKS_RIGHT.map((l) => <NavLink key={l.label} link={l} />)}</div>
            <a className="rmt-cta" href="#contact" aria-label="Contact">
              <span className="rmt-cta__label">Contact</span>
              <svg className="rmt-cta__icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      <div className={`rmt-overlay ${open ? "open" : ""}`} onClick={() => setOpen(false)} aria-hidden="true" />

      <nav id="rmt-drawer" className={`rmt-drawer ${open ? "open" : ""}`} aria-label="Mobile" onClick={() => setOpen(false)}>
        {[...LINKS_LEFT, ...LINKS_RIGHT].map((l) => (
          <a key={l.label} href={l.href} {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}>
            {l.label}{l.external ? " ↗" : ""}
          </a>
        ))}
      </nav>
    </>
  );
});

export default Navbar;
