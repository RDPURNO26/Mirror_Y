import { Link } from 'react-router-dom';
import { Mail, Phone, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Musical Instruments', path: '/instruments' },
    { name: 'Singing', path: '/singing' },
    { name: 'Dancing', path: '/dancing' },
    { name: 'Art', path: '/art' },
    { name: 'Teachers', path: '/teachers' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Book Us', path: '/book-us' },
    { name: 'About Us', path: '/about' }
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' }
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-background to-primary/5 border-t border-primary/20">
      <div className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <div className="font-heading text-3xl text-primary">
                Mirror Creative
              </div>
            </Link>
            <p className="text-foreground/70 mb-6">
              Unleashing creativity and nurturing talent across musical instruments, singing, dancing, and art.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center border border-primary/30 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-xl text-foreground mb-6">Quick Links</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-foreground/70 hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-xl text-foreground mb-6">Contact Us</h3>
            <div className="space-y-4">
              <a
                href="mailto:info@mirrorcreative.com"
                className="flex items-center gap-3 text-foreground/70 hover:text-primary transition-colors duration-300 group"
              >
                <div className="w-10 h-10 flex items-center justify-center border border-primary/30 group-hover:border-primary transition-colors duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <span>info@mirrorcreative.com</span>
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-3 text-foreground/70 hover:text-primary transition-colors duration-300 group"
              >
                <div className="w-10 h-10 flex items-center justify-center border border-primary/30 group-hover:border-primary transition-colors duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <span>+1 (234) 567-890</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-foreground/60 text-sm text-center md:text-left">
              © {currentYear} Mirror Creative Institute. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-foreground/60 hover:text-primary transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-foreground/60 hover:text-primary transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
