
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <a className="footer__brand" href="#top" aria-label="RMT by Verligte">
          <img
            src="/images/rmt-logo.png"
            alt="React Material Template by Verligte"
          />
        </a>

        <p className="footer__mid">
          RMT by Verligte <i>·</i> A web solution by Verligte
        </p>

        <nav className="footer__links" aria-label="Footer">
          <a href="https://verligte.com" target="_blank" rel="noreferrer">
            Visit Verligte ↗
          </a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </nav>
      </div>
    </footer>
  );
}
