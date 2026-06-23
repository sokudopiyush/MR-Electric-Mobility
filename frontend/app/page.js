import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import WhyUs from "@/components/WhyUs";
import About from "@/components/About";
import SeoContent from "@/components/SeoContent";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Products />
        <WhyUs />
        <About />
        <SeoContent />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
