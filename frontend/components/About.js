import { IconCheck, IconArrow } from "@/components/Icons";

const points = [
  "Complete Sokudo range on display and in stock",
  "Test rides, finance and exchange under one roof",
  "Authorised service with genuine spare parts",
];

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container about-inner">
        <div className="about-copy">
          
          <h2>About Mr Electric Mobility</h2>
          <p>
            Mr Electric Mobility is an authorised distributor of Sokudo Electric India.
            We are committed to making the transition to electric mobility simple,
            transparent and well-supported for every customer.
          </p>
          <p>
            From your initial enquiry and test ride to ongoing service, our experienced
            team provides personal attention and honest guidance to help you choose the
            right scooter for your needs.
          </p>
          <ul className="check-list">
            {points.map((t) => (
              <li key={t}><IconCheck width={18} height={18} /> {t}</li>
            ))}
          </ul>
        </div>
        <aside className="about-card">
          <span className="about-card-kicker">The Brand We Represent</span>
          <h3>Sokudo Electric India</h3>
          <p>
            A leading name in India&apos;s electric two-wheeler segment, recognised for
            its LFP battery technology, competitive pricing.
          </p>
          <a
            href="https://www.sokudoindia.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-out"
          >
            sokudoindia.com <IconArrow width={16} height={16} />
          </a>
        </aside>
      </div>
    </section>
  );
}
