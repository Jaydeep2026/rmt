
import { useRef, useState } from "react";
import useLogoDock from "./hooks/useLogoDock.js";
import Navbar from "./components/Navbar/Navbar.jsx";
import Logo from "./components/Logo/Logo.jsx";
import Hero from "./components/Hero/Hero.jsx";
import About from "./components/About/About.jsx";
import HowItWorks from "./components/HowItWorks/HowItWorks.jsx";
import Portfolio from "./components/Portfolio/Portfolio.jsx";
import Contact from "./components/Contact/Contact.jsx";
import Footer from "./components/Footer/Footer.jsx";

export default function App() {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const [navbarVisible, setNavbarVisible] = useState(false);

  useLogoDock(logoRef, navRef);

  return (
    <div className="rmt-root">
      <Navbar ref={navRef} visible={navbarVisible} />

      <Logo
        ref={logoRef}
        onAnimationComplete={() => setNavbarVisible(true)}
      />

      <Hero />

      <main>
        <About />
        <HowItWorks />
        <Portfolio />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
