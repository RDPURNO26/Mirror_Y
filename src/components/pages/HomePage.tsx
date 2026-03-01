// HPI 1.7-V
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from 'framer-motion';
import { Music, Mic, Sparkles, Palette, ArrowRight, Users, Award, Calendar, Star, Play, ArrowUpRight } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { CreativeSubjects, StudentTestimonials, Teachers, GalleryItems, CoreValues } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- Utility Components ---

const SectionHeading = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.h2
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className={`font-heading text-5xl md:text-7xl lg:text-8xl text-foreground uppercase tracking-tight leading-[0.9] ${className}`}
  >
    {children}
  </motion.h2>
);

const AnimatedText = ({ text, className = "" }: { text: string; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
      <motion.span
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block"
      >
        {text}
      </motion.span>
    </span>
  );
};

const ParallaxImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-[120%] -mt-[10%]">
        <Image src={src} alt={alt} className="w-full h-full object-cover" width={800} />
      </motion.div>
    </div>
  );
};

export default function HomePage() {
  // --- Canonical Data Sources ---
  const [subjects, setSubjects] = useState<CreativeSubjects[]>([]);
  const [testimonials, setTestimonials] = useState<StudentTestimonials[]>([]);
  const [teachers, setTeachers] = useState<Teachers[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItems[]>([]);
  const [coreValues, setCoreValues] = useState<CoreValues[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hardcoded Data Sources (Preserved)
  const heroSlides = [
    {
      title: "Discover Your Art",
      tagline: "Unleash your creative potential with expert guidance",
      image: "https://static.wixstatic.com/media/43707e_9282e5ff05b748adb3ff2fb901b1c0a9~mv2.png?originWidth=1920&originHeight=1024"
    },
    {
      title: "Move. Express. Inspire.",
      tagline: "Dance your way to excellence",
      image: "https://static.wixstatic.com/media/43707e_fb14468a50a041f8a4ea212b91434fc2~mv2.png?originWidth=1920&originHeight=1024"
    },
    {
      title: "Your Journey Starts Here",
      tagline: "Join a community of passionate artists",
      image: "https://static.wixstatic.com/media/43707e_d87da6e8f3e940b8990021b55071f1f2~mv2.png?originWidth=1920&originHeight=1024"
    }
  ];

  const subjectCategories = [
    { name: 'Musical Instruments', icon: Music, link: '/instruments', description: 'Master your favorite instrument with expert guidance', image: "https://static.wixstatic.com/media/43707e_87b968677e574da8913d2f9d0da8c0ec~mv2.png?originWidth=640&originHeight=384" },
    { name: 'Singing', icon: Mic, link: '/singing', description: 'Find your voice and express yourself through song', image: "https://static.wixstatic.com/media/43707e_39312701053f40138dba47d010268a10~mv2.png?originWidth=640&originHeight=384" },
    { name: 'Dancing', icon: Sparkles, link: '/dancing', description: 'Move with grace and rhythm across various styles', image: "https://static.wixstatic.com/media/43707e_2800d6962957408a806b8d7708edcf88~mv2.png?originWidth=640&originHeight=384" },
    { name: 'Art', icon: Palette, link: '/art', description: 'Explore visual creativity through diverse mediums', image: "https://static.wixstatic.com/media/43707e_e279c783f7e34448a8057b2e6245901b~mv2.png?originWidth=640&originHeight=384" }
  ];

  // --- Data Fetching ---
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const loadData = async () => {
    try {
      const [subjectsData, testimonialsData, teachersData, galleryData, valuesData] = await Promise.all([
        BaseCrudService.getAll<CreativeSubjects>('creativesubjects'),
        BaseCrudService.getAll<StudentTestimonials>('studenttestimonials', {}, { limit: 6 }),
        BaseCrudService.getAll<Teachers>('teachers', {}, { limit: 4 }),
        BaseCrudService.getAll<GalleryItems>('galleryitems', {}, { limit: 9 }),
        BaseCrudService.getAll<CoreValues>('corevalues')
      ]);

      setSubjects(subjectsData.items);
      setTestimonials(testimonialsData.items);
      setTeachers(teachersData.items);
      setGalleryItems(galleryData.items);
      setCoreValues(valuesData.items.filter(v => v.isActive).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Scroll Hooks ---
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left"
        style={{ scaleX }}
      />
      <Header />
      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-screen overflow-hidden bg-background">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              className="w-full h-full object-cover opacity-60"
              width={1920}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-24 max-w-[120rem] mx-auto z-10">
          <div className="overflow-hidden">
            <motion.h1
              key={`title-${currentSlide}`}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="font-heading text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] text-foreground uppercase tracking-tighter mb-6 mix-blend-difference"
            >
              {heroSlides[currentSlide].title}
            </motion.h1>
          </div>
          
          <div className="overflow-hidden mb-12">
            <motion.p
              key={`tagline-${currentSlide}`}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="text-xl md:text-3xl text-foreground/80 font-light max-w-2xl"
            >
              {heroSlides[currentSlide].tagline}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link
              to="/enroll"
              className="group relative inline-flex items-center gap-4 px-10 py-5 bg-primary text-primary-foreground text-lg font-heading uppercase tracking-wider overflow-hidden"
            >
              <span className="relative z-10">Enroll Now</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 delay-75 ease-out" />
            </Link>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-12 right-12 flex gap-4 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1 transition-all duration-500 ${
                currentSlide === index ? 'w-16 bg-primary' : 'w-8 bg-foreground/20 hover:bg-foreground/40'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
      {/* --- MARQUEE TICKER --- */}
      <div className="w-full bg-primary py-4 overflow-hidden whitespace-nowrap border-y border-primary-foreground/10">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex items-center gap-12 text-primary-foreground font-heading text-2xl md:text-4xl uppercase tracking-widest"
        >
          {[...Array(10)].map((_, i) => (
            <React.Fragment key={i}>
              <span>Music</span>
              <span className="w-2 h-2 bg-primary-foreground rounded-full" />
              <span>Dance</span>
              <span className="w-2 h-2 bg-primary-foreground rounded-full" />
              <span>Art</span>
              <span className="w-2 h-2 bg-primary-foreground rounded-full" />
              <span>Theatre</span>
              <span className="w-2 h-2 bg-primary-foreground rounded-full" />
            </React.Fragment>
          ))}
        </motion.div>
      </div>
      {/* --- WHAT WE OFFER (Bento Grid) --- */}
      <section className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-3xl">
            <span className="text-primary font-heading uppercase tracking-widest text-sm mb-4 block">Disciplines</span>
            <SectionHeading>What We Offer</SectionHeading>
          </div>
          <p className="text-foreground/60 max-w-md text-lg text-right md:text-left">
            Explore our diverse range of creative disciplines designed to unlock your potential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[400px]">
          {subjectCategories.map((category, index) => (
            <Link 
              to={category.link} 
              key={category.name}
              className={`group relative overflow-hidden rounded-none border border-white/10 bg-white/5 hover:border-primary/50 transition-colors duration-500 ${
                index === 0 || index === 3 ? 'lg:col-span-7' : 'lg:col-span-5'
              }`}
            >
              <div className="absolute inset-0">
                <Image 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              </div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <div className="p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-primary">
                    <category.icon className="w-8 h-8" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
                
                <div>
                  <h3 className="font-heading text-4xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-foreground/70 text-lg max-w-md translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      {/* --- WHY CHOOSE US (Sticky Scroll) --- */}
      <section className="relative w-full bg-foreground text-background py-32">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col lg:flex-row gap-20">
            {/* Sticky Header */}
            <div className="lg:w-1/3">
              <div className="sticky top-32">
                <h2 className="font-heading text-6xl md:text-8xl mb-8 leading-[0.9]">
                  WHY<br/>CHOOSE<br/><span className="text-primary">US?</span>
                </h2>
                <p className="text-xl opacity-80 mb-12 max-w-sm">
                  We don't just teach art; we cultivate artists. Join a legacy of excellence and creativity.
                </p>
                
                <div className="grid grid-cols-2 gap-8">
                  {[
                    { number: '500+', label: 'Students' },
                    { number: '15+', label: 'Teachers' },
                    { number: '10', label: 'Years' },
                    { number: '100%', label: 'Passion' }
                  ].map((stat, i) => (
                    <div key={i} className="border-t border-background/20 pt-4">
                      <div className="font-heading text-4xl text-primary mb-1">{stat.number}</div>
                      <div className="text-sm uppercase tracking-wider opacity-70">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="lg:w-2/3 flex flex-col gap-12">
              {[
                { icon: Users, title: "Expert Teachers", desc: "Learn from experienced professionals passionate about nurturing talent." },
                { icon: Award, title: "All Skill Levels", desc: "From beginners to advanced, we have programs tailored for everyone." },
                { icon: Calendar, title: "Performance Opportunities", desc: "Showcase your skills in concerts, exhibitions, and events." },
                { icon: Star, title: "Certified Courses", desc: "Gain recognized certifications that validate your artistic journey." }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-background/5 border border-background/10 p-12 hover:bg-background hover:text-foreground transition-all duration-500"
                >
                  <item.icon className="w-16 h-16 text-primary mb-8 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-heading text-4xl mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-xl opacity-70 group-hover:opacity-100">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* --- CORE VALUES (If Data Exists) --- */}
      {coreValues.length > 0 && (
        <section className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 py-32 border-b border-white/10">
          <div className="text-center mb-20">
            <SectionHeading>Our Core Values</SectionHeading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {coreValues.map((value) => (
              <div key={value._id} className="bg-background p-12 flex flex-col items-center text-center group hover:bg-white/5 transition-colors duration-300">
                {value.icon && (
                  <div className="w-20 h-20 mb-8 p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Image src={value.icon} alt={value.valueName || ''} className="w-full h-full object-contain" />
                  </div>
                )}
                <h3 className="font-heading text-2xl text-primary mb-4">{value.valueName}</h3>
                <p className="text-foreground/70">{value.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      {/* --- TESTIMONIALS (Horizontal Drag) --- */}
      {testimonials.length > 0 && (
        <section className="w-full py-32 overflow-hidden">
          <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 mb-16 flex justify-between items-end">
            <SectionHeading>Success Stories</SectionHeading>
            <div className="hidden md:flex gap-2">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                <ArrowRight className="w-5 h-5 rotate-180" />
              </div>
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-primary text-primary-foreground">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="flex gap-8 overflow-x-auto pb-12 px-6 md:px-12 lg:px-24 snap-x scrollbar-hide">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial._id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="min-w-[350px] md:min-w-[500px] snap-center bg-white/5 border border-white/10 p-10 flex flex-col justify-between hover:border-primary/50 transition-colors duration-300"
              >
                <div className="mb-8">
                  <div className="flex gap-1 text-primary mb-6">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="text-xl md:text-2xl font-light leading-relaxed italic">
                    "{testimonial.testimonialText}"
                  </p>
                </div>
                
                <div className="flex items-center gap-4 pt-8 border-t border-white/10">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-white/10">
                    {testimonial.studentPhoto ? (
                      <Image src={testimonial.studentPhoto} alt={testimonial.studentName || ''} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl font-heading text-primary">
                        {testimonial.studentName?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-heading text-xl">{testimonial.studentName}</h4>
                    <p className="text-primary text-sm uppercase tracking-wider">{testimonial.courseStudied}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}
      {/* --- TEACHERS (Spotlight Grid) --- */}
      {teachers.length > 0 && (
        <section className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 py-32 bg-gradient-to-b from-background to-background/50">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <SectionHeading>Meet The Masters</SectionHeading>
            <Link to="/teachers" className="group flex items-center gap-2 text-primary font-heading uppercase tracking-wider mt-8 md:mt-0">
              View All Teachers
              <span className="block w-8 h-px bg-primary group-hover:w-16 transition-all duration-300" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teachers.map((teacher, index) => (
              <motion.div
                key={teacher._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-white/5">
                  {teacher.photo && (
                    <Image
                      src={teacher.photo}
                      alt={teacher.teacherName || ''}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                      width={400}
                    />
                  )}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                  
                  {/* Hover Overlay Info */}
                  <div className="absolute inset-0 bg-black/80 flex flex-col justify-center p-8 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <p className="text-foreground/90 text-center line-clamp-6 font-light">
                      {teacher.bio}
                    </p>
                  </div>
                </div>
                
                <h3 className="font-heading text-2xl mb-1 group-hover:text-primary transition-colors">{teacher.teacherName}</h3>
                <p className="text-sm uppercase tracking-widest opacity-60">{teacher.specialization}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}
      {/* --- GALLERY TEASER (Masonry) --- */}
      {galleryItems.length > 0 && (
        <section className="w-full py-32">
          <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 mb-20 text-center">
            <span className="text-primary font-heading uppercase tracking-widest text-sm mb-4 block">Visual Diary</span>
            <SectionHeading>Life At Mirror</SectionHeading>
          </div>

          <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              {galleryItems.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="break-inside-avoid relative group overflow-hidden"
                >
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.title || 'Gallery Image'}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      width={600}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                    <div>
                      <h4 className="font-heading text-xl text-white">{item.title}</h4>
                      <p className="text-primary text-sm">{item.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <Link
                to="/gallery"
                className="inline-flex items-center gap-3 border border-primary text-primary px-10 py-4 text-lg font-heading hover:bg-primary hover:text-primary-foreground transition-all duration-300 uppercase tracking-wider"
              >
                View Full Gallery
              </Link>
            </div>
          </div>
        </section>
      )}
      {/* --- CTA BANNER --- */}
      <section className="relative w-full py-40 overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="https://static.wixstatic.com/media/43707e_cc7642bd651649f88e3f7484c6bcec49~mv2.png?originWidth=1152&originHeight=576" 
            alt="Background" 
            className="w-full h-full object-cover opacity-20" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/80" />
        </div>

        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 flex flex-col items-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-5xl md:text-7xl lg:text-9xl text-foreground mb-8 uppercase tracking-tighter"
          >
            Start Your <span className="text-primary">journey</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-foreground/70 max-w-2xl mb-12"
          >
            Join hundreds of students who have discovered their artistic passion with us. The stage is waiting for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <Link
              to="/enroll"
              className="px-12 py-6 bg-primary text-primary-foreground text-xl font-heading uppercase tracking-wider hover:shadow-[0_0_40px_rgba(218,165,32,0.4)] transition-all duration-300"
            >
              Enroll Now
            </Link>
            <Link
              to="/book-us"
              className="px-12 py-6 border border-white/20 text-foreground text-xl font-heading uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
            >
              Book Us
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}