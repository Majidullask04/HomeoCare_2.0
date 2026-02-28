import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'Do I need an appointment or can I walk in?',
    answer: 'While we welcome walk-in patients, we recommend booking an appointment to ensure minimal waiting time and dedicated attention to your health concerns.',
  },
  {
    question: 'How long does a typical consultation take?',
    answer: 'Initial consultations usually take 30-45 minutes as we take a detailed case history. Follow-up visits are typically 15-20 minutes.',
  },
  {
    question: 'Is homeopathic treatment safe for children?',
    answer: 'Yes, homeopathic medicines are completely safe for children, including infants. They are natural, non-toxic, and have no side effects.',
  },
  {
    question: 'What conditions can be treated with homeopathy?',
    answer: 'Homeopathy can effectively treat a wide range of conditions including allergies, asthma, skin disorders, digestive issues, hormonal imbalances, chronic headaches, and more.',
  },
  {
    question: 'Is the treatment painful?',
    answer: 'Not at all. Homeopathic treatment involves taking small, sweet-tasting pills or liquid drops. There are no injections or painful procedures.',
  },
  {
    question: 'How much does a consultation cost?',
    answer: 'Our consultation fees are affordable. Initial consultation is ₹500, and follow-up visits are ₹300. Medicine costs vary based on your prescription.',
  },
  {
    question: 'Do you offer online consultations?',
    answer: 'Yes, we offer teleconsultation services for patients who cannot visit the clinic in person. Please call us to schedule an online appointment.',
  },
  {
    question: 'Are you a certified homeopathic practitioner?',
    answer: 'Yes, Dr. Masudul Karim is a registered homeopathic physician with BHMS (WBUHS) degree and is registered with CHMWB (Regd No - 30910) and CCRH (Regd No - NRH/0030536).',
  },
];

const FAQ = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content.children,
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
      className="relative py-20 lg:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={contentRef} className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Header */}
          <div className="lg:col-span-1">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy mb-6">
              Healthy <span className="italic">Living</span>,
              <br />
              Clear <span className="italic">Answers</span>
            </h2>
            <p className="text-gray-600 mb-8">
              Worry less, live more — we've answered your most common questions about homeopathic treatment.
            </p>
            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white text-sm font-medium rounded-full hover:bg-navy/90 transition-colors"
            >
              Book Appointment
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column - Accordion */}
          <div className="lg:col-span-2">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-gray-200"
                >
                  <AccordionTrigger className="text-left text-navy font-medium py-5 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
