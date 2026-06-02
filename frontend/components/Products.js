"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconArrow } from "@/components/Icons";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [state, setState] = useState("loading"); // loading | done | error

  useEffect(() => {
    let active = true;
    fetch(`${API_URL}/api/products`)
      .then((r) => r.json())
      .then((d) => {
        if (!active) return;
        if (d.ok && Array.isArray(d.products)) {
          setProducts([...d.products].reverse());
          setState("done");
        } else {
          setState("error");
        }
      })
      .catch(() => active && setState("error"));
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="section" id="products">
      <div className="container">
        <div className="section-head">
         
          <h2>Our Range of Electric Scooters</h2>
          <p>
            Browse the complete Sokudo line-up with transparent ex-showroom pricing.
            Please contact us for on-road prices, current offers and finance options.
          </p>
        </div>

        {(state === "loading" || state === "error") && (
          <div className="product-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div className="product-card skeleton" key={i}>
                <div className="product-media" />
                <div className="product-body">
                  <span className="sk-line sk-lg" />
                  <span className="sk-line" />
                  <span className="sk-line sk-sm" />
                </div>
              </div>
            ))}
          </div>
        )}

        {state === "done" && (
          <div className="product-grid">
            {products.map((p) => (
              <article className="product-card" key={p.id || p.name}>
                <Link href={`/products/${p.id}`} className="product-card-link" aria-label={p.name} />
                <div className="product-media">
                  {p.tag && <span className="product-tag">{p.tag}</span>}
                  {p.image && (
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={600}
                      height={400}
                      sizes="(max-width: 700px) 90vw, 340px"
                    />
                  )}
                </div>
                <div className="product-body">
                  <h3>{p.name}</h3>
                  <div className="product-stats">
                    <div className="stat">
                      <span className="stat-val">{p.range || "—"}</span>
                      <span className="stat-key">Range</span>
                    </div>
                    <div className="stat">
                      <span className="stat-val">{p.speed || "—"}</span>
                      <span className="stat-key">Top speed</span>
                    </div>
                    <div className="stat">
                      <span className="stat-val">{p.charge || "—"}</span>
                      <span className="stat-key">Charge</span>
                    </div>
                  </div>
                  <div className="product-foot">
                    <div className="product-price">
                      <span className="price-label">Ex-showroom</span>
                      <strong>{p.price || "Ask us"}</strong>
                    </div>
                    <span className="product-cta">
                      View details <IconArrow width={16} height={16} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
