import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./db.js";
import enquiriesRouter from "./routes/enquiries.js";
import productsRouter from "./routes/products.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allow the frontend (Next.js) to call this API. Comma-separated origins in env,
// or allow all in development if not set.
const allowed = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(",").map((s) => s.trim())
  : true;

app.use(cors({ origin: allowed }));
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", service: "Mr Electric Mobility API" });
});

app.use("/api/enquiries", enquiriesRouter);
app.use("/api/products", productsRouter);

// 404 fallback
app.use((req, res) => res.status(404).json({ error: "Not found" }));

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✓ Mr Electric Mobility API running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("✗ Failed to start server:", err.message);
    process.exit(1);
  });
