import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  bgColor: string;
}

const services: Service[] = [
  {
    id: 1,
    title: 'Homeopathic Medicines',
    description: 'Personalized remedies prepared from natural sources to stimulate your body\'s healing response.',
    image: '/images/service_medicines.jpg',
    bgColor: 'bg-lavender',
  },
  {
    id: 2,
    title: 'Herbal Treatments',
    description: 'Traditional herbal formulations combined with modern homeopathic principles for optimal results.',
    image: '/images/service_herbs.jpg',
    bgColor: 'bg-mint',
  },
  {
    id: 3,
    title: 'Health Consultation',
    description: 'Comprehensive health assessments and personalized treatment plans for chronic and acute conditions.',
    image: '/images/service_consultation.jpg',
    bgColor: 'bg-yellow',
  },
  {
    id: 4,
    title: 'Family Healthcare',
    description: 'Complete homeopathic care for the entire family — from infants to seniors.',
    image: '/images/service_family.jpg',
    bgColor: 'bg-pink',
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const carousel = carouselRef.current;

    if (!section || !heading || !carousel) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        heading.children,
        { y: 50, opacity: 0 },
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

      // Carousel animation
      gsap.fromTo(
        carousel,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="mb-12 lg:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy mb-4">
            Our core <span className="italic">homeopathy</span> services
          </h2>
          <p className="text-gray-600 max-w-xl">
            Personalized care. Trusted treatments. From chronic conditions to acute 
            ailments, we've got your family's health covered.
          </p>
        </div>

        {/* Carousel */}
        <div ref={carouselRef} className="relative">
          {/* Navigation Arrows */}
          <div className="absolute -top-16 right-0 flex gap-2 z-10">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-navy hover:text-white transition-colors"
              aria-label="Previous service"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center hover:bg-navy/80 transition-colors"
              aria-label="Next service"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Cards Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
            >
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3"
                >
                  <div
                    className={`${service.bgColor} rounded-3xl p-6 lg:p-8 h-full group cursor-pointer hover:shadow-xl transition-shadow duration-500`}
                  >
                    {/* Image */}
                    <div className="aspect-square rounded-2xl overflow-hidden mb-6 bg-white/50">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    {/* Content */}
                    <h3 className="font-serif text-xl lg:text-2xl text-navy mb-3">
                      {service.title}
                    </h3>
                    <p className="text-navy/70 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-8 bg-navy' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
