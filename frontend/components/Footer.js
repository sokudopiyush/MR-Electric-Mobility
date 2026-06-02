import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a href="#top" className="brand">
            <Image
              src="/brand/MR.png"
              alt="Mr Electric Mobility logo"
              width={44}
              height={44}
              className="brand-mark"
            />
            <span className="brand-text">Mr Electric Mobility</span>
          </a>
          <p>Authorised distributor of Sokudo Electric India.</p>
        </div>
        <nav className="footer-nav">
          <a href="#products">Scooters</a>
          <a href="#why">Why us</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Mr Electric Mobility. All rights reserved.</p>
        <p>Prices are indicative ex-showroom and subject to change.</p>
      </div>
    </footer>
  );
}
