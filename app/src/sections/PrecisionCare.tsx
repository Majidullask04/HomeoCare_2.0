import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PrecisionCare = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;
    const card = cardRef.current;

    if (!section || !content || !image || !card) return;

    const ctx = gsap.context(() => {
      // Content reveal animation
      gsap.fromTo(
        content.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Image reveal
      gsap.fromTo(
        image,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Score card slide up
      gsap.fromTo(
        card,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
            onEnter: () => {
              // Animate the counter
              gsap.to({ value: 0 }, {
                value: 96,
                duration: 2,
                ease: 'power2.out',
                onUpdate: function() {
                  setScore(Math.round(this.targets()[0].value));
                },
              });
            },
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-navy overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-lavender/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div ref={contentRef}>
            <span className="inline-block text-xs font-medium tracking-widest text-lavender uppercase mb-6">
              (Precision Care)
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-6 leading-tight">
              Health is <span className="italic text-lavender">powerful</span>.
              <br />
              Let's help you own yours.
            </h2>
            <p className="text-white/70 text-base lg:text-lg leading-relaxed mb-8">
              We know that great healthcare transforms more than just your body. 
              It boosts your confidence, your mood, and how the world sees you. 
              At HomeoCare, we care for your whole wellness journey — inside and out.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-lavender/20 flex items-center justify-center">
                <span className="text-lavender text-xl">✓</span>
              </div>
              <p className="text-white/80 text-sm">
                Precision is care.
                <br />
                <span className="text-lavender">Personalization is power.</span>
              </p>
            </div>
          </div>

          {/* Right Content - Image with Score Card */}
          <div className="relative">
            {/* Main Image */}
            <div ref={imageRef} className="relative rounded-3xl overflow-hidden">
              <img
                src="/images/patient_testimonial.jpg"
                alt="Happy patient"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>

            {/* Floating Score Card */}
            <div
              ref={cardRef}
              className="absolute -bottom-8 -left-8 lg:-left-16 bg-lavender rounded-2xl p-6 shadow-xl"
            >
              <div className="text-navy">
                <p className="text-sm font-medium mb-1">Patient Satisfaction</p>
                <p className="font-serif text-5xl font-bold">{score}%</p>
                <p className="text-xs mt-2 opacity-70">Based on 1,200+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrecisionCare;
