import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import TargetAudience from "@/sections/TargetAudience";
import WhyChooseUs from "@/sections/WhyChooseUs";
import ContactForm from "@/sections/ContactForm";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Header />
      <Hero />
      <Services />
      <TargetAudience />
      <WhyChooseUs />
      <ContactForm />
      <Footer />
    </main>
  );
}