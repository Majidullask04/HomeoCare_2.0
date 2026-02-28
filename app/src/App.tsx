import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import PrecisionCare from './sections/PrecisionCare';
import DoctorProfile from './sections/DoctorProfile';
import BentoGrid from './sections/BentoGrid';
import Reviews from './sections/Reviews';
import FAQ from './sections/FAQ';
import ContactForm from './sections/ContactForm';
import Footer from './sections/Footer';
import Navigation from './sections/Navigation';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize smooth scroll behavior
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    
    window.addEventListener('load', handleLoad);
    
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-white overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Services />
        <PrecisionCare />
        <DoctorProfile />
        <BentoGrid />
        <Reviews />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
