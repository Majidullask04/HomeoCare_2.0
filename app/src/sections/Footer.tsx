import { useState } from 'react';
import { ArrowRight, Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    company: [
      { label: 'About Us', href: '#about' },
      { label: 'Our Doctors', href: '#doctor' },
      { label: 'Testimonials', href: '#reviews' },
      { label: 'Contact', href: '#contact' },
    ],
    services: [
      { label: 'Homeopathic Medicines', href: '#services' },
      { label: 'Herbal Treatments', href: '#services' },
      { label: 'Health Consultation', href: '#services' },
      { label: 'Family Healthcare', href: '#services' },
    ],
    support: [
      { label: 'Patient Help', href: '#faq' },
      { label: 'Book Appointment', href: '#contact' },
      { label: 'Treatment FAQ', href: '#faq' },
      { label: 'Privacy Policy', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/drmasudulkarim', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/drmasudulkarim', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Company */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-medium text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-medium text-white mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-medium text-white mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith('#')) {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }
                    }}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-2 lg:col-span-2">
            <h4 className="font-medium text-white mb-4">Join HomeoCare</h4>
            <p className="text-white/60 text-sm mb-4">
              Subscribe to our newsletter for health tips and updates.
            </p>
            {isSubscribed ? (
              <div className="bg-mint/20 rounded-full px-6 py-3 text-mint text-sm">
                Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/10 rounded-full text-white placeholder:text-white/40 text-sm outline-none focus:ring-2 focus:ring-lavender/50"
                />
                <button
                  type="submit"
                  className="w-12 h-12 bg-lavender rounded-full flex items-center justify-center hover:bg-lavender/80 transition-colors"
                >
                  <ArrowRight className="w-5 h-5 text-navy" />
                </button>
              </form>
            )}

            {/* Social Links */}
            <div className="mt-6">
              <p className="text-white/60 text-sm mb-3">Follow us</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <div className="font-serif text-3xl lg:text-4xl text-lavender">
              Homeo<span className="text-white">Care</span>
            </div>

            {/* Copyright */}
            <div className="text-white/40 text-sm text-center">
              © 2021-2025, HomeoCare. All Rights Reserved.
            </div>

            {/* Legal Links */}
            <div className="flex gap-6">
              <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">
                Terms & Conditions
              </a>
              <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
