import { Router } from "express";
import { getDB } from "../db.js";

const router = Router();

// POST /api/enquiries — save a new enquiry from the website contact form
router.post("/", async (req, res) => {
  const name = (req.body?.name || "").toString().trim();
  const phone = (req.body?.phone || "").toString().trim();
  const model = (req.body?.model || "").toString().trim();
  const message = (req.body?.message || "").toString().trim();

  if (name.length < 2) {
    return res.status(400).json({ error: "Please enter your name." });
  }
  if (!/^[0-9+\-\s]{8,15}$/.test(phone)) {
    return res.status(400).json({ error: "Please enter a valid phone number." });
  }

  try {
    const result = await getDB().collection("enquiries").insertOne({
      name,
      phone,
      model: model || null,
      message: message || null,
      createdAt: new Date(),
      source: "website-contact-form",
    });
    return res.status(201).json({ ok: true, id: result.insertedId });
  } catch (err) {
    console.error("Enquiry save failed:", err.message);
    return res
      .status(500)
      .json({ error: "Could not save your enquiry. Please try again or call us." });
  }
});

// GET /api/enquiries — list recent enquiries (for a simple admin view)
router.get("/", async (req, res) => {
  try {
    const items = await getDB()
      .collection("enquiries")
      .find()
      .sort({ createdAt: -1 })
      .limit(200)
      .toArray();
    return res.json({ ok: true, count: items.length, enquiries: items });
  } catch (err) {
    console.error("Fetch enquiries failed:", err.message);
    return res.status(500).json({ error: "Could not fetch enquiries." });
  }
});

export default router;
