import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function EnrollPage() {
  const benefits = [
    'Expert instruction from experienced professionals',
    'Flexible class schedules to fit your lifestyle',
    'State-of-the-art facilities and equipment',
    'Performance opportunities throughout the year',
    'Supportive and inspiring learning environment',
    'Certified courses and skill development programs',
    'Small class sizes for personalized attention',
    'Access to our vibrant creative community'
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full max-w-[100rem] mx-auto min-h-[60vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background" />
        <div className="relative z-10 text-center px-8 md:px-16 lg:px-24 py-24">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading text-6xl md:text-8xl text-foreground mb-8"
          >
            Start Your Creative Journey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto mb-12"
          >
            Join hundreds of students who have discovered their artistic passion at Mirror Creative Institute
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
              Enroll Now
              <ExternalLink className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-5xl md:text-7xl text-foreground mb-6">
            Why Enroll With Us?
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
            Discover the advantages of learning at Mirror Creative Institute
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4 p-6 border border-primary/20 hover:border-primary transition-all duration-300"
            >
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <p className="text-foreground/80 text-lg">{benefit}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Enrollment Process Section */}
      <section className="w-full bg-gradient-to-b from-background to-primary/5 py-24">
        <div className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-5xl md:text-7xl text-foreground mb-6">
              How to Enroll
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
              Simple steps to begin your creative journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: '01',
                title: 'Fill the Form',
                description: 'Complete our online enrollment form with your details and preferences'
              },
              {
                step: '02',
                title: 'Choose Your Course',
                description: 'Select from our diverse range of creative disciplines and styles'
              },
              {
                step: '03',
                title: 'Start Learning',
                description: 'Begin your journey with expert guidance and supportive community'
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center p-8 border border-primary/20 hover:border-primary transition-all duration-300"
              >
                <div className="font-heading text-6xl text-primary/30 mb-6">
                  {item.step}
                </div>
                <h3 className="font-heading text-2xl text-foreground mb-4">
                  {item.title}
                </h3>
                <p className="text-foreground/70">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-gradient-to-r from-primary/20 to-secondary/20 p-16 md:p-24 text-center border border-primary/30"
        >
          <h2 className="font-heading text-5xl md:text-7xl text-foreground mb-8">
            Ready to Begin?
          </h2>
          <p className="text-xl text-foreground/80 mb-12 max-w-3xl mx-auto">
            Take the first step towards discovering your creative potential. Enroll today and join our vibrant community of artists.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="https://forms.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-10 py-5 text-lg font-heading hover:shadow-[0_0_30px_rgba(218,165,32,0.4)] transition-all duration-300"
            >
              Enroll Now
              <ExternalLink className="w-5 h-5" />
            </a>
            <a
              href="mailto:info@mirrorcreative.com"
              className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-primary text-primary px-10 py-5 text-lg font-heading hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
          <div className="mt-8 text-foreground/70">
            <p>Questions? Call us at: <a href="tel:+1234567890" className="text-primary hover:text-secondary transition-colors">+1 (234) 567-890</a></p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
