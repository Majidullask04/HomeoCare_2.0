import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;

    if (!section || !form) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        form,
        { x: -80, opacity: 0 },
        {
          x: 0,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', date: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-[#F4F4F5] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Form */}
          <div ref={formRef}>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy mb-6">
              Book your homeopathic consultation.
            </h2>

            {isSubmitted ? (
              <div className="bg-mint rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-teal rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-navy mb-2">Thank You!</h3>
                <p className="text-gray-600">We'll contact you shortly to confirm your appointment.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 lg:p-8 shadow-card">
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Preferred Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm text-gray-600 mb-2">Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all resize-none"
                    placeholder="Tell us about your health concerns..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-between px-6 py-4 bg-navy text-white rounded-full hover:bg-navy/90 transition-colors"
                >
                  <span className="font-medium">Book Appointment</span>
                  <span className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Info & Image */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden mb-8">
              <img
                src="/images/about_consultation.jpg"
                alt="Consultation"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>

            {/* Contact Cards */}
            <div className="grid sm:grid-cols-3 gap-4">
              <a
                href="tel:+919143096665"
                className="bg-white rounded-2xl p-4 shadow-soft hover:shadow-card transition-shadow"
              >
                <div className="w-10 h-10 bg-lavender rounded-full flex items-center justify-center mb-3">
                  <Phone className="w-5 h-5 text-navy" />
                </div>
                <p className="text-xs text-gray-500 mb-1">Call Us</p>
                <p className="text-sm font-medium text-navy">+91 91430 96665</p>
              </a>

              <a
                href="mailto:drmasudulkarim@gmail.com"
                className="bg-white rounded-2xl p-4 shadow-soft hover:shadow-card transition-shadow"
              >
                <div className="w-10 h-10 bg-mint rounded-full flex items-center justify-center mb-3">
                  <Mail className="w-5 h-5 text-navy" />
                </div>
                <p className="text-xs text-gray-500 mb-1">Email</p>
                <p className="text-sm font-medium text-navy truncate">drmasudulkarim@gmail.com</p>
              </a>

              <a
                href="https://maps.app.goo.gl/uQjipni1kPi51fwY8"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-4 shadow-soft hover:shadow-card transition-shadow"
              >
                <div className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center mb-3">
                  <MapPin className="w-5 h-5 text-navy" />
                </div>
                <p className="text-xs text-gray-500 mb-1">Location</p>
                <p className="text-sm font-medium text-navy">Plassey, Nadia</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
