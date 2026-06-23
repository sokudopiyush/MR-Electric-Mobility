const SITE_URL = "https://mrelectricmobility.com";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Fallback product slugs (used if the API can't be reached at build time).
const FALLBACK_SLUGS = [
  "sokudo-plus",
  "sokudo-pace",
  "sokudo-rapid-2-2",
  "sokudo-select-2-2",
  "sokudo-acute-2-2",
  "sokudo-acute",
];

export default async function sitemap() {
  const now = new Date();

  // Try to get the live product slugs; fall back to the known list on failure.
  let slugs = FALLBACK_SLUGS;
  try {
    const res = await fetch(`${API_URL}/api/products`, { next: { revalidate: 3600 } });
    const data = await res.json();
    if (data?.ok && Array.isArray(data.products) && data.products.length) {
      slugs = data.products.map((p) => p.slug).filter(Boolean);
    }
  } catch {
    // keep fallback slugs
  }

  const staticRoutes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/privacy-policy", priority: 0.4, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.4, changeFrequency: "yearly" },
    { path: "/refund-policy", priority: 0.4, changeFrequency: "yearly" },
    { path: "/disclaimer", priority: 0.4, changeFrequency: "yearly" },
  ].map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const productRoutes = slugs.map((slug) => ({
    url: `${SITE_URL}/products/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
