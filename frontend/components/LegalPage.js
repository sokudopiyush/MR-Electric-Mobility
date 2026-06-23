import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LegalPage({ title, updated, children }) {
  return (
    <>
      <Navbar />
      <main className="legal">
        <div className="container">
          <Link href="/" className="back-link">← Back to home</Link>
          <h1>{title}</h1>
          {updated && <p className="legal-updated">Last updated: {updated}</p>}
          <div className="legal-body">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
