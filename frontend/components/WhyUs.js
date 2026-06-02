import { IconShield, IconRupee, IconWrench, IconLeaf } from "@/components/Icons";

const features = [
  {
    Icon: IconShield,
    title: "Advanced LFP Batteries",
    text: "Sokudo scooters use fixed Lithium Ferro-Phosphate battery packs, offering superior safety and a longer service life than conventional lithium-ion.",
  },
  {
    Icon: IconRupee,
    title: "Flexible Finance Options",
    text: "Competitive on-road quotations, easy EMI plans and exchange offers, with the complete documentation handled by our team.",
  },
  {
    Icon: IconWrench,
    title: "Dedicated After-Sales Service",
    text: "Genuine spare parts and factory-trained technicians at our service centre, backed by the full Sokudo warranty.",
  },
  {
    Icon: IconLeaf,
    title: "Lower Running Costs",
    text: "Charge conveniently from a standard power socket at a fraction of fuel costs, delivering significant long-term savings.",
  },
];

export default function WhyUs() {
  return (
    <section className="section section-alt" id="why">
      <div className="container">
        <div className="section-head">
          
          <h2>Why Choose Mr Electric Mobility</h2>
        </div>
        <div className="feature-grid">
          {features.map(({ Icon, title, text }) => (
            <div className="feature" key={title}>
              <span className="feature-icon"><Icon width={26} height={26} /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
