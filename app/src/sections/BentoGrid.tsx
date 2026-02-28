import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const BentoGrid = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;

    if (!section || !grid) return;

    const ctx = gsap.context(() => {
      const cards = grid.querySelectorAll('.bento-card');
      
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.1,
          }
        );
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
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-teal overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Smarter <span className="italic">homeopathy</span> care
            <br />
            is now simple.
          </h2>
          <p className="text-white/80 text-lg">
            Healthy living, designed just for you.
          </p>
        </div>

        {/* Bento Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Card 1 - CTA */}
          <div className="bento-card bg-lavender rounded-3xl p-6 lg:p-8">
            <h3 className="font-serif text-xl lg:text-2xl text-navy mb-3">
              Regain health in just weeks
            </h3>
            <p className="text-navy/70 text-sm mb-6">
              Homeopathic treatments — fast, safe & proven results.
            </p>
            <div className="aspect-video rounded-xl overflow-hidden mb-6 bg-white/50">
              <img
                src="/images/service_medicines.jpg"
                alt="Homeopathic medicines"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={scrollToContact}
              className="w-full flex items-center justify-between px-5 py-3 bg-white rounded-full hover:shadow-md transition-shadow"
            >
              <span className="text-navy text-sm font-medium">Get Started</span>
              <ArrowRight className="w-4 h-4 text-navy" />
            </button>
          </div>

          {/* Card 2 - Testimonial */}
          <div className="bento-card bg-white/90 rounded-3xl p-6 lg:p-8 lg:row-span-2">
            <div className="h-full flex flex-col">
              <blockquote className="font-serif text-xl lg:text-2xl text-navy mb-6 flex-grow">
                "I used to suffer from chronic allergies. Now, I can't remember 
                the last time I had a severe attack. HomeoCare gave me results 
                I never thought possible."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-lavender overflow-hidden">
                  <img
                    src="/images/about_smile.jpg"
                    alt="Priya Sharma"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-navy">Priya Sharma</p>
                  <p className="text-sm text-navy/60">Patient for 6 months</p>
                </div>
              </div>
              <div className="mt-6 rounded-xl overflow-hidden">
                <img
                  src="/images/patient_testimonial.jpg"
                  alt="Happy patient"
                  className="w-full aspect-video object-cover"
                />
              </div>
            </div>
          </div>

          {/* Card 3 - Goals */}
          <div className="bento-card bg-white rounded-3xl p-6 lg:p-8">
            <h3 className="font-serif text-xl text-navy mb-4">
              What's your health goal?
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Chronic Relief', 'Boost Immunity', 'Skin Health', 'Stress Free'].map((goal) => (
                <button
                  key={goal}
                  onClick={scrollToContact}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: ['#FDE047', '#FDA4AF', '#A7F3D0', '#D4B4FF'][
                      ['Chronic Relief', 'Boost Immunity', 'Skin Health', 'Stress Free'].indexOf(goal)
                    ],
                    color: '#1A1A2E',
                  }}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>

          {/* Card 4 - Stats */}
          <div className="bento-card bg-navy rounded-3xl p-6 lg:p-8 text-white">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-serif text-5xl font-bold text-lavender">15+</span>
              <span className="text-white/60">years</span>
            </div>
            <p className="text-white/80 text-sm">
              Of trusted homeopathic care serving the community with natural healing solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
