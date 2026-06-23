"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
  BlackGrey: "linear-gradient(to bottom, #000000 50%, #8f8984 50%)",
  NavyGrey: "linear-gradient(to bottom, #212e52 50%, #8f8984 50%)",
  RedWhite: "linear-gradient(to bottom, #d52a29 50%, #ffffff 50%)",
  YellowWhite: "linear-gradient(to bottom, #eca21e 50%, #ffffff 50%)",
};

function colorHex(name) {
  const raw = (name || "").trim();
  if (COLOR_MAP[raw]) return COLOR_MAP[raw];
  const norm = raw.replace(/[\s_-]+/g, "").toLowerCase();
  for (const key in COLOR_MAP) {
    if (key.toLowerCase() === norm) return COLOR_MAP[key];
  }
  return "#9ca3af";
}

export default function ProductDetailClient({ initialProduct = null, slug }) {
  const [product, setProduct] = useState(initialProduct);
  const [state, setState] = useState(initialProduct ? "done" : "loading");
  const [activeColor, setActiveColor] = useState(0);
  const [activeImg, setActiveImg] = useState(null);

  // Fetch only if the server didn't already provide the product.
  useEffect(() => {
    if (initialProduct || !slug) return;
    let active = true;
    fetch(`${API_URL}/api/products/${slug}`)
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
  }, [slug, initialProduct]);

  // When the colour changes, show that colour's first photo.
  useEffect(() => {
    if (!product) return;
    const imgs = product.colors?.[activeColor]?.images || [];
    setActiveImg(imgs[0] || product.image || null);
  }, [product, activeColor]);

  const colorImages = product?.colors?.[activeColor]?.images || [];
  const gallery = colorImages.length ? colorImages : product?.image ? [product.image] : [];
  const mainImg = activeImg || product?.image || null;

  return (
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
                {mainImg && (
                  <img
                    src={mainImg}
                    alt={product.name}
                    className="detail-main-img"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      if (product.image) e.currentTarget.src = product.image;
                    }}
                  />
                )}
                {gallery.length > 1 && (
                  <div className="detail-thumbs">
                    {gallery.map((img, i) => (
                      <button
                        type="button"
                        key={img + i}
                        className={`thumb${img === mainImg ? " active" : ""}`}
                        onClick={() => setActiveImg(img)}
                        aria-label={`Photo ${i + 1}`}
                      >
                        <img
                          src={img}
                          alt=""
                          onError={(e) => {
                            const t = e.currentTarget.closest(".thumb");
                            if (t) t.style.display = "none";
                          }}
                        />
                      </button>
                    ))}
                  </div>
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
                      Colour — <strong>{product.colors[activeColor]?.name}</strong>
                    </span>
                    <div className="color-swatches">
                      {product.colors.map((c, i) => (
                        <button
                          type="button"
                          key={c.name}
                          className={`swatch${i === activeColor ? " active" : ""}`}
                          style={{ background: colorHex(c.name) }}
                          onClick={() => setActiveColor(i)}
                          aria-label={c.name}
                          aria-pressed={i === activeColor}
                          title={c.name}
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
  );
}
