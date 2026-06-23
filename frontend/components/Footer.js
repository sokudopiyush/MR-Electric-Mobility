import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link href="/" className="brand">
            <Image
              src="/brand/MR.png"
              alt="Mr Electric Mobility logo"
              width={44}
              height={44}
              className="brand-mark"
            />
            <span className="brand-text">Mr Electric Mobility</span>
          </Link>
          <p>Authorised distributor of Sokudo Electric India.</p>
        </div>
        <nav className="footer-nav">
          <a href="/#products">Scooters</a>
          <a href="/#why">Why us</a>
          <a href="/#about">About</a>
          <a href="/#faq">FAQ</a>
          <a href="/#contact">Contact</a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Mr Electric Mobility. All rights reserved.</p>
        <nav className="footer-legal">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms &amp; Conditions</Link>
          <Link href="/refund-policy">Refund Policy</Link>
          <Link href="/disclaimer">Disclaimer</Link>
        </nav>
      </div>
    </footer>
  );
}
