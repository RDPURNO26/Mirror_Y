import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Users, Calendar, Star, ExternalLink } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { PerformanceServices } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BookUsPage() {
  const [services, setServices] = useState<PerformanceServices[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await BaseCrudService.getAll<PerformanceServices>('performanceservices');
      setServices(data.items);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const highlights = [
    {
      icon: Music,
      title: 'Professional Performances',
      description: 'Our talented musicians and performers deliver unforgettable shows'
    },
    {
      icon: Users,
      title: 'Versatile Ensemble',
      description: 'From solo acts to full bands, we adapt to your event needs'
    },
    {
      icon: Calendar,
      title: 'Flexible Scheduling',
      description: 'Available for concerts, private events, school functions, and more'
    },
    {
      icon: Star,
      title: 'Premium Quality',
      description: 'Years of experience ensuring excellence in every performance'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full max-w-[100rem] mx-auto min-h-[70vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background" />
        <div className="relative z-10 text-center px-8 md:px-16 lg:px-24 py-24">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading text-6xl md:text-8xl text-foreground mb-8"
          >
            Bring the Magic to Your Stage
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto mb-12"
          >
            Book our talented performers for concerts, school events, private shows, and special occasions. Let us make your event unforgettable.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href="https://forms.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-5 text-lg font-heading hover:shadow-[0_0_30px_rgba(218,165,32,0.4)] transition-all duration-300"
            >
              Book Now
              <ExternalLink className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-8 border border-primary/20 hover:border-primary transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 mb-6">
                <highlight.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-xl text-foreground mb-3">
                {highlight.title}
              </h3>
              <p className="text-foreground/70">
                {highlight.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      {services.length > 0 && (
        <section className="w-full bg-gradient-to-b from-background to-primary/5 py-24">
          <div className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <h2 className="font-heading text-5xl md:text-7xl text-foreground mb-6">
                Our Services
              </h2>
              <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
                Discover what we can bring to your event
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12" style={{ minHeight: '500px' }}>
              {isLoading ? null : services.map((service, index) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group border border-primary/20 hover:border-primary transition-all duration-300 overflow-hidden"
                >
                  {service.promotionalImage && (
                    <div className="relative overflow-hidden h-80">
                      <Image
                        src={service.promotionalImage}
                        alt={service.serviceName || 'Service'}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        width={800}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className="font-heading text-3xl text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                      {service.serviceName}
                    </h3>
                    {service.shortDescription && (
                      <p className="text-lg text-primary mb-4">
                        {service.shortDescription}
                      </p>
                    )}
                    {service.description && (
                      <p className="text-foreground/80 mb-6 leading-relaxed">
                        {service.description}
                      </p>
                    )}
                    {service.bookingFormUrl && (
                      <a
                        href={service.bookingFormUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors duration-300 font-heading"
                      >
                        Book This Service
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center bg-gradient-to-r from-primary/20 to-secondary/20 p-16 md:p-24 border border-primary/30"
        >
          <h2 className="font-heading text-4xl md:text-6xl text-foreground mb-6">
            Ready to Book?
          </h2>
          <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Fill out our booking form or contact us directly to discuss your event requirements
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="https://forms.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-10 py-5 text-lg font-heading hover:shadow-[0_0_30px_rgba(218,165,32,0.4)] transition-all duration-300"
            >
              Book Now
              <ExternalLink className="w-5 h-5" />
            </a>
            <a
              href="mailto:info@mirrorcreative.com"
              className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-primary text-primary px-10 py-5 text-lg font-heading hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Email Us
            </a>
          </div>
          <div className="mt-8 text-foreground/70">
            <p>Or call us at: <a href="tel:+1234567890" className="text-primary hover:text-secondary transition-colors">+1 (234) 567-890</a></p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
