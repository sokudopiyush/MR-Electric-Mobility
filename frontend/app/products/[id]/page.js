import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetailClient from "./ProductDetailClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const SITE_URL = "https://mrelectricmobility.com";

async function getProduct(slug) {
  try {
    const res = await fetch(`${API_URL}/api/products/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.ok ? data.product : null;
  } catch {
    return null;
  }
}

function absImg(img) {
  if (!img) return undefined;
  return img.startsWith("http") ? img : `${SITE_URL}${img}`;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const p = await getProduct(id);
  if (!p) {
    return { title: "Sokudo Electric Scooter | Mr Electric Mobility" };
  }
  const price = p.pricing?.exShowroom || p.price || "";
  const title = `${p.name} Price, Range & Specs in Delhi NCR | Mr Electric Mobility`;
  const description = `${p.name} electric scooter — ${p.range || ""} range, ${p.speed || ""} top speed, ${p.battery || "LFP"} battery. Ex-showroom ${price}. Book a free test ride at Mr Electric Mobility, authorised Sokudo dealer in Delhi NCR.`;
  return {
    title,
    description,
    alternates: { canonical: `/products/${id}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/products/${id}`,
      type: "website",
      images: p.image ? [absImg(p.image)] : [],
    },
  };
}

function ProductSeo({ product: p }) {
  const price = p.pricing?.exShowroom || p.price || "the listed price";
  const faqs = [
    {
      q: `What is the price of the ${p.name}?`,
      a: `The ${p.name} is priced at ${price} (ex-showroom). Contact Mr Electric Mobility for the latest on-road price, offers and finance options in Delhi NCR.`,
    },
    {
      q: `What is the range and top speed of the ${p.name}?`,
      a: `The ${p.name} offers a range of ${p.range || "the rated distance"} on a single charge with a top speed of ${p.speed || "the rated speed"}, powered by a ${p.battery || "Lithium LFP"} battery.`,
    },
    {
      q: `Where can I buy the ${p.name} in Delhi NCR?`,
      a: `You can buy the ${p.name} from Mr Electric Mobility, an authorised Sokudo Electric distributor in Vasundhara, Ghaziabad — serving customers across Delhi NCR, Noida and Delhi. Visit us for a free test ride.`,
    },
  ];

  return (
    <section className="section section-alt">
      <div className="container">
        <h2 className="seo-h2">Buy the {p.name} in Delhi NCR</h2>
        <div className="legal-body">
          <p>
            The <strong>{p.name}</strong> is part of the Sokudo electric scooter range
            available at Mr Electric Mobility, an authorised distributor of Sokudo Electric
            India in Delhi NCR. With a range of <strong>{p.range || "a dependable distance"}</strong>{" "}
            on a single charge, a top speed of <strong>{p.speed || "city-friendly speed"}</strong>{" "}
            and a <strong>{p.battery || "Lithium LFP"}</strong> battery, the {p.name} is built
            for comfortable, low-cost daily riding.
          </p>
          <p>
            Priced at <strong>{price}</strong> (ex-showroom), the {p.name} offers great value
            for money. At Mr Electric Mobility you can book a free test ride of the {p.name}{" "}
            at our Ghaziabad showroom, explore easy finance and EMI options, exchange offers,
            and authorised after-sales service across Ghaziabad, Noida and Delhi.
          </p>
          <p>
            Like every Sokudo electric scooter, the {p.name} comes with a safe LFP battery and
            a manufacturer warranty for complete peace of mind. Contact Mr Electric Mobility
            today to get the best price on the {p.name} in Delhi NCR and switch to clean,
            affordable electric mobility.
          </p>
        </div>

        <h3 className="faq-title">{p.name} — Frequently Asked Questions</h3>
        <div className="faq">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(p)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
    </section>
  );
}

function productJsonLd(p) {
  const priceNum = (p.pricing?.exShowroom || p.price || "").replace(/[^\d]/g, "");
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    image: p.image ? [absImg(p.image)] : undefined,
    description: `${p.name} electric scooter with ${p.range || ""} range and ${p.speed || ""} top speed, available at Mr Electric Mobility, authorised Sokudo dealer in Delhi NCR.`,
    brand: { "@type": "Brand", name: "Sokudo Electric" },
    ...(priceNum
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            price: priceNum,
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}/products/${slugify(p.name)}`,
            seller: { "@type": "Organization", name: "Mr Electric Mobility" },
          },
        }
      : {}),
  };
}

function faqJsonLd(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

function slugify(s) {
  return (s || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <>
      <Navbar />
      <ProductDetailClient initialProduct={product} slug={id} />
      {product && <ProductSeo product={product} />}
      <Footer />
    </>
  );
}
