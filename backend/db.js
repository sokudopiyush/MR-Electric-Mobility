import { MongoClient } from "mongodb";
import dns from "dns";

// Some networks can't resolve SRV DNS records (mongodb+srv://). Opt in to public
// DNS when needed. Not required when using the direct (non-SRV) connection string.
if (process.env.FORCE_PUBLIC_DNS === "true") {
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
}

let db = null;
let client = null;

export async function connectDB() {
  if (db) return db;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set. Add it to backend/.env");

  client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });
  await client.connect();
  db = client.db(process.env.MONGODB_DB || "mrelectric");
  console.log(`✓ Connected to MongoDB (db: ${db.databaseName})`);
  return db;
}

export function getDB() {
  if (!db) throw new Error("Database not initialised. Call connectDB() first.");
  return db;
}
