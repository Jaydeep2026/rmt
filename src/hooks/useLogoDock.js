import { useLayoutEffect } from "react";

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => t * t * (3 - 2 * t);

// logo geometry (SVG viewBox units): width, full height, height once tagline collapsed
const VB_W = 790, VB_H_FULL = 522, VB_H_DOCKED = 464;

/**
 * Moves the logo from hero centre into navbar centre while scrolling.
 * Change `endW` below to control docked logo size.
 */
export default function useLogoDock(logoRef, navRef) {
  useLayoutEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const logo = logoRef.current, nav = navRef.current;
      if (!logo || !nav) return;
      const vh = window.innerHeight, vw = window.innerWidth;
      const navH = nav.offsetHeight;
      const p = ease(clamp(window.scrollY / (vh * 0.6)));

      logo.style.setProperty("--p", p.toFixed(4));
      nav.classList.toggle("is-solid", window.scrollY > 8);

      const mobile = vw < 900;
      const W0 = Math.min(vw * (mobile ? 0.88 : 0.8), mobile ? 520 : 760, (vh - 200) * 1.51); // hero width
      const endW = mobile ? 96 : 124;                                                        // navbar width
      const w = lerp(W0, endW, p);
      const h = (w * lerp(VB_H_FULL, VB_H_DOCKED, p)) / VB_W;
      logo.style.width = `${w}px`;
      logo.style.height = `${h}px`;

      const heroCenter = navH + (vh - navH) / 2 - 10;
      logo.style.top = `${lerp(heroCenter, navH / 2, p) - h / 2}px`;
      logo.style.transform = "translateX(-50%)";
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [logoRef, navRef]);
}
