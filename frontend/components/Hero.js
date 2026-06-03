import Image from "next/image";
import { IconCheck } from "@/components/Icons";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        
        <h1 className="hero-title">
          Authorised Distributor of{" "}
          <span className="accent">Sokudo Electric India</span>
          <br />
          in Delhi&nbsp;NCR
        </h1>
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="hero-sub">
              Explore the complete range of Sokudo electric scooters with transparent
              pricing, easy finance, free test rides and dependable after-sales service
              — right here in Delhi&nbsp;NCR.
            </p>
            <div className="hero-actions">
              <a href="#products" className="btn btn-primary">Explore the range</a>
              <a href="#contact" className="btn btn-outline">Book a free test ride</a>
            </div>
            <ul className="hero-trust">
             
              <li><strong>150 km</strong> max range</li>
              <li><strong>3 yr</strong> battery warranty</li>
               <li><strong>6+</strong> models in stock</li>
            </ul>
          </div>
          <div className="hero-figure">
            <Image
              src="/products/acute22.webp"
              alt="Sokudo Acute electric scooter"
              width={1200}
              height={800}
              priority
              sizes="(max-width: 900px) 90vw, 520px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
