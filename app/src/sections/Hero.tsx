import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FloatingTag = ({ 
  text, 
  className, 
  delay = 0 
}: { 
  text: string; 
  className: string; 
  delay?: number;
}) => {
  return (
    <div
      className={`absolute px-4 py-2 rounded-full text-sm font-medium shadow-soft floating-tag ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {text}
    </div>
  );
};

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const tags = tagsRef.current;
    const headline = headlineRef.current;
    const cta = ctaRef.current;

    if (!section || !image || !tags || !headline || !cta) return;

    const ctx = gsap.context(() => {
      // Initial entrance animation
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        image,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }
      )
        .fromTo(
          headline.children,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          tags.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' },
          '-=0.4'
        )
        .fromTo(
          cta,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.3'
        );

      // Scroll-based parallax
      gsap.to(image, {
        y: -80,
        scale: 0.95,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(tags.children, {
        y: -120,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(headline, {
        y: -40,
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: '50% top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen bg-[#F4F4F5] overflow-hidden pt-20"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-lavender/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-mint/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="flex flex-col items-center text-center">
          {/* Headline */}
          <div ref={headlineRef} className="mb-8 z-10">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-navy leading-tight">
              <span className="block">Natural Healing.</span>
              <span className="block italic text-teal">Holistic Care.</span>
            </h1>
          </div>

          {/* Hero Image with Floating Tags */}
          <div className="relative w-full max-w-lg mx-auto mb-12">
            {/* Floating Tags */}
            <div ref={tagsRef} className="absolute inset-0 pointer-events-none">
              <FloatingTag
                text="Natural Cure"
                className="top-4 -left-4 lg:-left-12 bg-lavender text-navy"
                delay={0}
              />
              <FloatingTag
                text="Safe & Gentle"
                className="top-20 -left-8 lg:-left-16 bg-pink text-navy"
                delay={0.5}
              />
              <FloatingTag
                text="No Side Effects"
                className="top-8 -right-4 lg:-right-12 bg-mint text-navy"
                delay={1}
              />
              <FloatingTag
                text="Family Care"
                className="top-24 -right-8 lg:-right-16 bg-yellow text-navy"
                delay={1.5}
              />
            </div>

            {/* Main Image */}
            <div ref={imageRef} className="relative z-0">
              <div className="relative w-64 h-80 sm:w-80 sm:h-96 lg:w-96 lg:h-[28rem] mx-auto">
                {/* Yellow background arc */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-4/5 bg-yellow/60 rounded-t-full" />
                
                {/* Image */}
                <img
                  src="/images/hero_woman.png"
                  alt="Happy patient"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full object-contain object-bottom"
                />
              </div>
            </div>
          </div>

          {/* CTA Bar */}
          <div ref={ctaRef} className="w-full max-w-md mx-auto">
            <button
              onClick={scrollToContact}
              className="group w-full flex items-center justify-between px-6 py-4 bg-white rounded-full shadow-card hover:shadow-lg transition-shadow"
            >
              <span className="text-navy font-medium">Book Appointment</span>
              <span className="flex items-center justify-center w-10 h-10 bg-navy rounded-full group-hover:scale-110 transition-transform">
                <ArrowRight className="w-5 h-5 text-white" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
