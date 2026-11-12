# RMT Hero + Navbar

    npm install
    npm run dev
    npm run build

src/
  App.jsx                      – composes all sections
  styles/global.css            – colors (CSS variables), font, base
  hooks/useLogoDock.js         – scroll logic: logo hero -> navbar (edit endW for docked size)
  components/
    Navbar/   Navbar.jsx + Navbar.css
    Logo/     Logo.jsx + Logo.css + logoPaths.js (original logo traced to SVG)
    Hero/     Hero.jsx + Hero.css
    About/    About.jsx + About.css
    HowItWorks/ (animated road-map), Portfolio/ (carousel), Contact/ (quote form), Footer/
