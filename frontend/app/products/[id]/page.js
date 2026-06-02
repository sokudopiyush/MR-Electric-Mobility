"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IconRange, IconSpeed, IconCharge, IconBattery, IconArrow, IconCheck } from "@/components/Icons";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Map colour names to a display swatch colour (solid or half–half gradient).
const COLOR_MAP = {
  White: "#ffffff",
  Brown: "#5C4033",
  Grey: "#818181",
  Black: "#000000",
  Blue: "#0c2065",
  Red: "#be0900",
  Yellow: "#eca21e",
  Orange: "#fc6c0f",
  // half–half (two-tone)
  BlackGrey: "linear-gradient(to bottom, #000000 50%, #8f8984 50%)",
  NavyGrey: "linear-gradient(to bottom, #212e52 50%, #8f8984 50%)",
  RedWhite: "linear-gradient(to bottom, #d52a29 50%, #ffffff 50%)",
  YellowWhite: "linear-gradient(to bottom, #eca21e 50%, #ffffff 50%)",
};

function colorHex(name) {
  const raw = (name || "").trim();
  if (COLOR_MAP[raw]) return COLOR_MAP[raw];
  // normalise (ignore spaces/hyphens/case): "Black Grey" -> "blackgrey" -> BlackGrey
  const norm = raw.replace(/[\s_-]+/g, "").toLowerCase();
  for (const key in COLOR_MAP) {
    if (key.toLowerCase() === norm) return COLOR_MAP[key];
  }
  return "#9ca3af";
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [state, setState] = useState("loading"); // loading | done | error
  const [activeColor, setActiveColor] = useState(0);

  useEffect(() => {
    if (!id) return;
    let active = true;
    fetch(`${API_URL}/api/products/${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (!active) return;
        if (d.ok && d.product) {
          setProduct(d.product);
          setState("done");
        } else {
          setState("error");
        }
      })
      .catch(() => active && setState("error"));
    return () => {
      active = false;
    };
  }, [id]);

  return (
    <>
      <Navbar />
      <main className="detail">
        <div className="container">
          <Link href="/#products" className="back-link">
            ← Back to all scooters
          </Link>

          {state === "loading" && <p className="detail-status">Loading specifications…</p>}

          {state === "error" && (
            <p className="detail-status error">
              Couldn&apos;t load this scooter. Please make sure the backend is running and try again.
            </p>
          )}

          {state === "done" && product && (
            <>
              <div className="detail-top">
                <div className="detail-media">
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={900}
                      height={600}
                      priority
                      sizes="(max-width: 900px) 92vw, 520px"
                    />
                  )}
                </div>

                <div className="detail-info">
                  <h1>{product.name}</h1>
                  {product.description && <p className="detail-desc">{product.description}</p>}

                  <div className="highlight-row">
                    <div className="highlight"><IconRange width={20} height={20} /><span>{product.range || "—"}</span><small>Range</small></div>
                    <div className="highlight"><IconSpeed width={20} height={20} /><span>{product.speed || "—"}</span><small>Top speed</small></div>
                    <div className="highlight"><IconCharge width={20} height={20} /><span>{product.charge || "—"}</span><small>Charge</small></div>
                    <div className="highlight"><IconBattery width={20} height={20} /><span>{product.battery || "—"}</span><small>Battery</small></div>
                  </div>

                  <div className="detail-price">
                    <div>
                      <span className="price-label">Ex-showroom price</span>
                      <strong>{product.pricing?.exShowroom || product.price || "Ask us"}</strong>
                    </div>
                  </div>

                  {product.colors?.length > 0 && (
                    <div className="detail-colors">
                      <span className="price-label">
                        Colour — <strong>{product.colors[activeColor]}</strong>
                      </span>
                      <div className="color-swatches">
                        {product.colors.map((c, i) => (
                          <button
                            type="button"
                            key={c}
                            className={`swatch${i === activeColor ? " active" : ""}`}
                            style={{ background: colorHex(c) }}
                            onClick={() => setActiveColor(i)}
                            aria-label={c}
                            aria-pressed={i === activeColor}
                            title={c}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <Link href="/#contact" className="btn btn-primary detail-cta">
                    Book a test ride <IconArrow width={16} height={16} />
                  </Link>
                </div>
              </div>

              {/* Full specifications */}
              {product.specs?.length > 0 && (
                <section className="detail-section">
                  <h2>Full specifications</h2>
                  <div className="spec-groups">
                    {product.specs.map((group) => (
                      <div className="spec-group" key={group.group}>
                        <h3>{group.group}</h3>
                        <table className="spec-table">
                          <tbody>
                            {group.items.map((item, i) => (
                              <tr key={i}>
                                <td>{item.key}</td>
                                <td>{item.value || "—"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <div className="detail-foot">
                <p><IconCheck width={18} height={18} /> Authorised Sokudo dealer · genuine warranty · service support</p>
                <Link href="/#contact" className="btn btn-primary">Enquire about the {product.name}</Link>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
