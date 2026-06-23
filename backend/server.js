import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB, isDBConnected } from "./db.js";
import enquiriesRouter from "./routes/enquiries.js";
import productsRouter from "./routes/products.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allow the frontend (Next.js) to call this API. Comma-separated origins in env,
// or allow all in development if not set.
const allowedList = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(",").map((s) => s.trim()).filter(Boolean)
  : null;

// Treat www and apex (non-www) variants of an allowed origin as equivalent so a
// missing "www." in the env var doesn't trigger a CORS failure in the browser.
function isAllowedOrigin(origin) {
  if (!allowedList) return true; // no env set → allow all (dev)
  if (allowedList.includes(origin)) return true;
  const stripped = origin.replace("://www.", "://");
  const withWww = origin.replace("://", "://www.");
  return allowedList.includes(stripped) || allowedList.includes(withWww);
}

app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser requests (curl, server-to-server) with no Origin header.
      if (!origin || isAllowedOrigin(origin)) return callback(null, true);
      return callback(new Error(`Origin not allowed by CORS: ${origin}`));
    },
  })
);
app.use(express.json());

// Health check — also reports DB status
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "Mr Electric Mobility API",
    db: isDBConnected() ? "connected" : "disconnected",
  });
});

app.use("/api/enquiries", enquiriesRouter);
app.use("/api/products", productsRouter);

// 404 fallback
app.use((req, res) => res.status(404).json({ error: "Not found" }));

// Start the HTTP server FIRST so the app stays up even if the database is down.
app.listen(PORT, () => {
  console.log(`✓ Mr Electric Mobility API running on http://localhost:${PORT}`);
});

// Connect to MongoDB with automatic retries — failure does NOT crash the app.
async function initDB(attempt = 1) {
  try {
    await connectDB();
  } catch (err) {
    const delay = Math.min(30000, 5000 * attempt);
    console.error(
      `✗ MongoDB connection failed (attempt ${attempt}): ${err.message}. Retrying in ${delay / 1000}s...`
    );
    setTimeout(() => initDB(attempt + 1), delay);
  }
}
initDB();

// Don't let an unexpected error kill the process.
process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err?.message || err);
});
