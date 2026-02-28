import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Review {
  id: number;
  name: string;
  role: string;
  rating: number;
  text: string;
  avatar: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'Ananya Das',
    role: 'Teacher',
    rating: 5,
    text: 'I was scared of trying new treatments. Now, I look forward to my visits. That says everything!',
    avatar: '/images/about_smile.jpg',
  },
  {
    id: 2,
    name: 'Rajiv Kumar',
    role: 'Business Owner',
    rating: 5,
    text: 'The experience was flawless from consultation to final result. My chronic migraine is finally under control.',
    avatar: '/images/about_family.jpg',
  },
  {
    id: 3,
    name: 'Meera Patel',
    role: 'Homemaker',
    rating: 5,
    text: 'HomeoCare didn\'t just fix my skin issues. They gave me back my confidence. Highly recommended!',
    avatar: '/images/patient_testimonial.jpg',
  },
  {
    id: 4,
    name: 'Sanjay Gupta',
    role: 'Software Engineer',
    rating: 5,
    text: 'After years of digestive issues, I finally found relief. The personalized approach makes all the difference.',
    avatar: '/images/about_consultation.jpg',
  },
];

const Reviews = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content.children,
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
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-[#F4F4F5] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={contentRef} className="grid lg:grid-cols-4 gap-8">
          {/* Left Column - Rating Summary */}
          <div className="lg:col-span-1">
            <h2 className="font-serif text-3xl sm:text-4xl text-navy mb-6">
              Real Patients.
              <br />
              <span className="italic">Real Results.</span>
            </h2>
            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-5xl font-bold text-teal">4.9</span>
                <span className="text-gray-500">/5</span>
              </div>
              <p className="text-gray-600 text-sm mt-2">
                We've helped 2,000+ patients achieve better health naturally.
              </p>
            </div>
            <div className="flex -space-x-2 mb-6">
              {reviews.slice(0, 4).map((review, index) => (
                <div
                  key={index}
                  className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                >
                  <img
                    src={review.avatar}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Trusted by happy patients across Nadia district.
            </p>
            <a
              href="https://search.google.com/local/writereview?placeid=ChIJ33oPJzJz-TkRHA4cvMrs_Ok"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy text-white text-sm font-medium rounded-full hover:bg-navy/90 transition-colors"
            >
              Leave a Review
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <Plus className="w-3 h-3" />
              </span>
            </a>
          </div>

          {/* Right Columns - Review Cards */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-card transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-navy text-sm">{review.name}</p>
                      <p className="text-xs text-gray-500">{review.role}</p>
                    </div>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow text-yellow" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  "{review.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
