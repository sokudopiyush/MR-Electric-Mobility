const faqs = [
  {
    q: "Which Sokudo electric scooter is best for me?",
    a: "It depends on your daily distance and budget. The Sokudo Plus (₹67,951) is a licence-free 25 km/h scooter ideal for short city trips, while the Sokudo Acute (₹1,25,951) offers up to 150 km range and a 70 km/h top speed for longer commutes. Visit our Delhi NCR showroom for a free test ride and personalised advice.",
  },
  {
    q: "What is the price of Sokudo electric scooters in Delhi NCR?",
    a: "Sokudo electric scooters start from ₹67,951 (ex-showroom) for the Plus and go up to ₹1,25,951 for the Acute. Contact Mr Electric Mobility for the latest on-road prices, current offers and easy EMI / finance options.",
  },
  {
    q: "Do I need a licence or registration for a Sokudo scooter?",
    a: "The Sokudo Plus is a low-speed (25 km/h) electric scooter that does not require a driving licence or RTO registration. Higher-speed models such as the Pace, Rapid 2.2, Select 2.2 and Acute do require a valid licence and registration.",
  },
  {
    q: "What battery and warranty do Sokudo scooters come with?",
    a: "Sokudo scooters use fixed Lithium Ferro-Phosphate (LFP) batteries, which are safer and longer-lasting than ordinary lithium-ion. They come with up to a 3-year / 30,000 km warranty.",
  },
  {
    q: "Where is Mr Electric Mobility located?",
    a: "We are an authorised Sokudo Electric distributor based in Vasundhara, Ghaziabad, serving customers across Delhi NCR including Ghaziabad, Noida, Delhi and nearby areas.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function SeoContent() {
  return (
    <section className="section section-alt seo-content" id="faq">
      <div className="container seo-grid">
        <div className="seo-text">
          <h2>Sokudo Electric Scooters in Delhi NCR</h2>
          <p>
            Looking for a reliable electric scooter in Delhi NCR? Mr Electric Mobility is
            an authorised distributor of <strong>Sokudo Electric India</strong>, offering
            the complete range of Sokudo electric scooters in Ghaziabad, Noida and across
            the National Capital Region. Whether you want a budget-friendly city commuter
            or a long-range electric scooter, we have a Sokudo model to match your needs.
          </p>
          <p>
            Our line-up includes the licence-free <strong>Sokudo Plus</strong>, the
            everyday <strong>Sokudo Pace</strong>, the highway-ready{" "}
            <strong>Sokudo Rapid 2.2</strong> and <strong>Select 2.2</strong>, and the
            flagship <strong>Sokudo Acute</strong> with up to 150 km range on a single
            charge. Every Sokudo electric scooter features a safe LFP battery, low running
            cost and a 3-year warranty — backed by transparent ex-showroom pricing, easy
            finance and EMI options, exchange offers and authorised after-sales service.
          </p>
          <p>
            Book a free test ride at our Ghaziabad showroom, compare models and prices,
            and switch to clean, affordable electric mobility today. Mr Electric Mobility
            makes it simple to buy a Sokudo electric scooter in Delhi NCR.
          </p>
        </div>

        <div className="seo-faq">
          <h3 className="faq-title">Frequently Asked Questions</h3>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}
