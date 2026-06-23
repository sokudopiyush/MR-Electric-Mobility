import { Router } from "express";
import { ObjectId } from "mongodb";
import { getDB } from "../db.js";

const router = Router();

// Local product photos (served from the frontend's /public/products folder).
// Mapped by product name because some Cloudinary URLs in the data are access-restricted.
const IMAGE_MAP = {
  plus: "/products/plus.webp",
  pace: "/products/pace.webp",
  "rapid 2.2": "/products/rapid.webp",
  "select 2.2": "/products/select.webp",
  "acute 2.2": "/products/acute22.webp",
  acute: "/products/acute.webp",
};

// Friendly titles for the spec section groups.
const SECTION_TITLES = {
  engineAndTransmission: "Motor & Performance",
  dimensionsAndCapacity: "Dimensions & Capacity",
  electricals: "Electricals",
  tyresAndBrakes: "Tyres & Brakes",
};

function prettifyKey(k) {
  return k
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

// Pull a value out of the `sections` object by matching the spec key.
function sectionVal(sections, ...needles) {
  for (const arr of Object.values(sections || {})) {
    if (!Array.isArray(arr)) continue;
    for (const item of arr) {
      const key = (item.key || "").toLowerCase();
      if (needles.some((n) => key.includes(n))) return (item.value || "").toString().trim();
    }
  }
  return null;
}

function formatINR(n) {
  return typeof n === "number" ? "₹" + n.toLocaleString("en-IN") : null;
}

function stripHtml(text) {
  if (!text) return "";
  return text.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function shorten(text, len = 130) {
  const t = stripHtml(text);
  return t.length > len ? t.slice(0, len - 3).replace(/\s+\S*$/, "") + "…" : t;
}

function imageFor(d) {
  const rawName = (d.name || "").trim().toLowerCase();
  return IMAGE_MAP[rawName] || d.colors?.[0]?.images?.[0] || d.images?.[0] || null;
}

function displayName(d) {
  const rawName = (d.name || "").trim();
  return rawName.toLowerCase().startsWith("sokudo") ? rawName : `Sokudo ${rawName}`;
}

// URL-friendly slug from the display name, e.g. "Sokudo Acute 2.2" -> "sokudo-acute-2-2"
function slugify(s) {
  return (s || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Compact shape for the product listing / cards.
function normalize(d) {
  return {
    id: d._id.toString(),
    slug: slugify(displayName(d)),
    name: displayName(d),
    image: imageFor(d),
    price: formatINR(d.netExShowroomPrice),
    onRoad: formatINR(d.onRoadePrice),
    range: sectionVal(d.sections, "range"),
    speed: sectionVal(d.sections, "top speed", "speed"),
    charge: sectionVal(d.sections, "charging time", "charging"),
    battery: sectionVal(d.sections, "battery type", "battery capacity", "battery"),
    blurb: shorten(d.description),
  };
}

// Full shape for the product detail page.
function normalizeDetail(d) {
  const specs = Object.entries(d.sections || {})
    .map(([key, arr]) => ({
      group: SECTION_TITLES[key] || prettifyKey(key),
      items: (Array.isArray(arr) ? arr : [])
        .map((it) => ({ key: (it.key || "").trim(), value: (it.value || "").toString().trim() }))
        .filter((x) => x.key),
    }))
    .filter((g) => g.items.length);

  return {
    ...normalize(d),
    blurb: undefined,
    description: stripHtml(d.description),
    colors: (d.colors || [])
      .filter((c) => c && c.name)
      .map((c) => ({
        name: c.name,
        images: (c.images || []).filter(Boolean),
      })),
    pricing: {
      exShowroom: formatINR(d.netExShowroomPrice),
      rto: formatINR(d.rto),
      insurance: formatINR(d.Insurance),
      handling: formatINR(d.handlingCharge),
      onRoad: formatINR(d.onRoadePrice),
    },
    specs,
  };
}

// GET /api/products — all products, normalized and ordered cheapest -> premium
router.get("/", async (req, res) => {
  try {
    const docs = await getDB()
      .collection("products")
      .find()
      .sort({ netExShowroomPrice: 1 })
      .toArray();
    return res.json({ ok: true, count: docs.length, products: docs.map(normalize) });
  } catch (err) {
    console.error("Fetch products failed:", err.message);
    return res.status(500).json({ error: "Could not fetch products." });
  }
});

// GET /api/products/:slug — full specification, looked up by name-slug (id still works)
router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const col = getDB().collection("products");
    let doc = null;

    // Backwards-compatible: still allow the Mongo id.
    if (ObjectId.isValid(slug)) {
      doc = await col.findOne({ _id: new ObjectId(slug) });
    }
    // Primary: match by the URL-friendly name slug.
    if (!doc) {
      const docs = await col.find().toArray();
      const target = slug.toLowerCase();
      doc = docs.find((d) => slugify(displayName(d)) === target);
    }

    if (!doc) return res.status(404).json({ error: "Product not found." });
    return res.json({ ok: true, product: normalizeDetail(doc) });
  } catch (err) {
    console.error("Fetch product failed:", err.message);
    return res.status(500).json({ error: "Could not fetch product." });
  }
});

export default router;
