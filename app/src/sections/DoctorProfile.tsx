import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Doctor {
  id: number;
  name: string;
  title: string;
  description: string;
  image: string;
  bgColor: string;
}

const doctor: Doctor = {
  id: 1,
  name: 'Dr. Masudul Karim',
  title: 'BHMS (WBUHS) - Homeopathic Physician',
  description: 'With over 15 years of experience in homeopathic medicine, Dr. Karim has helped thousands of patients achieve optimal health through natural healing.',
  image: `/images/doctor_main.png?v=${Date.now() + 1}`,
  bgColor: 'bg-lavender',
};

const DoctorProfile = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;

    if (!section || !heading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heading,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
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
      id="doctor"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12 lg:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy">
            Meet the <span className="italic">HomeoCare</span> Doctor
          </h2>
        </div>

        {/* Doctor Profile Display */}
        <div className="relative">
          <div className="flex justify-center items-center">
            {/* Main Doctor Display */}
            <div className="w-full max-w-sm relative">
              <div className={`${doctor.bgColor} rounded-3xl p-8 relative overflow-hidden`}>
                {/* Doctor Image */}
                <div className="relative aspect-[3/4] mb-6 object-cover object-top overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-white/30 rounded-2xl" />
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top relative z-10"
                  />
                </div>

                {/* Doctor Info */}
                <div className="text-center">
                  <h3 className="font-serif text-2xl text-navy mb-1">{doctor.name}</h3>
                  <p className="text-navy/70 text-sm mt-2">{doctor.title}</p>
                </div>

                {/* CTA Button */}
                <button
                  onClick={scrollToContact}
                  className="mt-6 w-full flex items-center justify-between px-6 py-3 bg-white rounded-full shadow-soft hover:shadow-md transition-shadow"
                >
                  <span className="text-navy text-sm font-medium">Book Appointment</span>
                  <ArrowRight className="w-4 h-4 text-navy" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorProfile;
