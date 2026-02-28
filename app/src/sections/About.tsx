import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const images = imagesRef.current;
    const text = textRef.current;

    if (!section || !heading || !images || !text) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        heading.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Images scattered animation
      const imageElements = images.querySelectorAll('.about-image');
      imageElements.forEach((img, index) => {
        const rotation = index === 0 ? -5 : index === 1 ? 3 : -3;
        gsap.fromTo(
          img,
          { 
            y: 100, 
            opacity: 0, 
            rotation: rotation + 10 
          },
          {
            y: 0,
            opacity: 1,
            rotation: rotation,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.15,
          }
        );
      });

      // Text animation
      gsap.fromTo(
        text,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="inline-block text-xs font-medium tracking-widest text-teal uppercase mb-4">
            (About Us)
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy">
            Care - <span className="italic">first</span>.
            <br />
            Health - <span className="italic">always</span>.
          </h2>
        </div>

        {/* Scattered Images Grid */}
        <div ref={imagesRef} className="relative grid grid-cols-12 gap-4 lg:gap-6 mb-12 max-w-4xl mx-auto">
          {/* Image 1 - Left */}
          <div className="about-image col-span-5 row-span-2 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-card">
              <img
                src="/images/about_smile.jpg"
                alt="Happy patient"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Image 2 - Center/Right */}
          <div className="about-image col-span-7 col-start-6 row-start-1 transform rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-card">
              <img
                src="/images/about_consultation.jpg"
                alt="Homeopathic consultation"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Image 3 - Bottom Center */}
          <div className="about-image col-span-6 col-start-4 row-start-2 transform -rotate-2 hover:rotate-0 transition-transform duration-500 mt-4">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-card">
              <img
                src="/images/about_family.jpg"
                alt="Family healthcare"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        {/* Description Text */}
        <p
          ref={textRef}
          className="max-w-2xl mx-auto text-center text-gray-600 text-base lg:text-lg leading-relaxed"
        >
          We don't believe in one-size-fits-all treatments. At HomeoCare, every patient 
          receives thoughtful, personalized homeopathic care — built on their unique 
          symptoms, lifestyle, and overall well-being. Our approach treats the root 
          cause, not just the symptoms.
        </p>
      </div>
    </section>
  );
};

export default About;
