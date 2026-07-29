import About from "@/components/About";
import Coach from "@/components/Coach";
import Contact from "@/components/Contact";
import Facilities from "@/components/Facilities";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import MarqueeCta from "@/components/MarqueeCta";
import Navbar from "@/components/Navbar";
import Plans from "@/components/Plans";
import Programs from "@/components/Programs";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <MarqueeCta />
        <About />
        <Coach />
        <Programs />
        <Facilities />
        <Gallery />
        <Testimonials />
        <Plans />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
