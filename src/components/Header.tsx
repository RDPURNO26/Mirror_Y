import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from '@/components/ui/image';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubjectsOpen, setIsSubjectsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSubjectsOpen(false);
  }, [location]);

  const subjects = [
    { name: 'Musical Instruments', path: '/instruments' },
    { name: 'Singing', path: '/singing' },
    { name: 'Dancing', path: '/dancing' },
    { name: 'Art', path: '/art' }
  ];

  const navLinks = [
    { name: 'Teachers', path: '/teachers' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Book Us', path: '/book-us' },
    { name: 'About Us', path: '/about' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-glassmorphism-overlay backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo - Home Button with Image */}
          <Link to="/" className="flex items-center gap-3 group hover:opacity-80 transition-opacity duration-300">
            <Image 
              src="https://static.wixstatic.com/media/43707e_b279f9dc4a70477d85c02646016a2bdb~mv2.png" 
              alt="Mirror Creative Institute Logo" 
              className="h-12 md:h-16 w-auto object-contain"
              width={80}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {/* Subjects Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsSubjectsOpen(true)}
              onMouseLeave={() => setIsSubjectsOpen(false)}
            >
              <button className="flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-300 font-paragraph text-base">
                Subjects
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isSubjectsOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isSubjectsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-4 w-64 bg-background border border-primary/20 shadow-lg"
                  >
                    {subjects.map((subject) => (
                      <Link
                        key={subject.path}
                        to={subject.path}
                        className="block px-6 py-4 text-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-200 border-b border-primary/10 last:border-b-0"
                      >
                        {subject.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-foreground hover:text-primary transition-colors duration-300 font-paragraph text-base"
              >
                {link.name}
              </Link>
            ))}

            {/* Book Us for Concert CTA */}
            <Link
              to="/book-us"
              className="bg-secondary text-secondary-foreground px-6 py-3 font-heading hover:shadow-[0_0_20px_rgba(184,134,11,0.4)] transition-all duration-300"
            >
              Book Us for Concert
            </Link>

            {/* Enroll Now CTA */}
            <Link
              to="/enroll"
              className="bg-primary text-primary-foreground px-6 py-3 font-heading hover:shadow-[0_0_20px_rgba(218,165,32,0.4)] transition-all duration-300"
            >
              Enroll Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-foreground hover:text-primary transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-background border-t border-primary/20 overflow-hidden"
          >
            <div className="px-8 py-6 space-y-4">
              {/* Subjects in Mobile */}
              <div>
                <button
                  onClick={() => setIsSubjectsOpen(!isSubjectsOpen)}
                  className="flex items-center justify-between w-full text-foreground hover:text-primary transition-colors duration-300 font-paragraph text-base py-2"
                >
                  Subjects
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isSubjectsOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isSubjectsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-4 mt-2 space-y-2 overflow-hidden"
                    >
                      {subjects.map((subject) => (
                        <Link
                          key={subject.path}
                          to={subject.path}
                          className="block text-foreground/80 hover:text-primary transition-colors duration-200 py-2"
                        >
                          {subject.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other Links in Mobile */}
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-foreground hover:text-primary transition-colors duration-300 font-paragraph text-base py-2"
                >
                  {link.name}
                </Link>
              ))}

              {/* Book Us for Concert in Mobile */}
              <Link
                to="/book-us"
                className="block text-center bg-secondary text-secondary-foreground px-6 py-3 font-heading hover:shadow-[0_0_20px_rgba(184,134,11,0.4)] transition-all duration-300 mt-4"
              >
                Book Us for Concert
              </Link>

              {/* Enroll Now in Mobile */}
              <Link
                to="/enroll"
                className="block text-center bg-primary text-primary-foreground px-6 py-3 font-heading hover:shadow-[0_0_20px_rgba(218,165,32,0.4)] transition-all duration-300 mt-2"
              >
                Enroll Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
