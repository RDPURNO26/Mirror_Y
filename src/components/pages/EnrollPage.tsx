import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function EnrollPage() {
  const navigate = useNavigate();

  const subjects = [
    {
      name: 'Musical Instruments',
      path: '/instruments',
      description: 'Learn to play various instruments with expert guidance',
      color: 'from-blue-600 to-blue-400'
    },
    {
      name: 'Singing',
      path: '/singing',
      description: 'Develop your vocal skills and discover your unique voice',
      color: 'from-purple-600 to-purple-400'
    },
    {
      name: 'Dancing',
      path: '/dancing',
      description: 'Master different dance styles and express yourself through movement',
      color: 'from-pink-600 to-pink-400'
    },
    {
      name: 'Art',
      path: '/art',
      description: 'Explore visual arts and unleash your creative potential',
      color: 'from-orange-600 to-orange-400'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full max-w-[120rem] mx-auto min-h-[50vh] flex items-center justify-center overflow-hidden mt-20 px-8 md:px-16 lg:px-24">
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl text-foreground mb-6"
          >
            Choose Your Creative Path
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto"
          >
            Select a subject to explore and begin your artistic journey
          </motion.p>
        </div>
      </section>

      {/* 4-Split Screen Section */}
      <section className="w-full max-w-[120rem] mx-auto px-8 md:px-16 lg:px-24 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.path}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => navigate(subject.path)}
              className="group relative overflow-hidden cursor-pointer h-96 md:h-[500px] border border-primary/20 hover:border-primary transition-all duration-300"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${subject.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                  className="mb-6"
                >
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${subject.color} flex items-center justify-center`}>
                    <div className="text-4xl text-white font-heading">
                      {subject.name.charAt(0)}
                    </div>
                  </div>
                </motion.div>

                <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {subject.name}
                </h2>
                <p className="text-foreground/80 mb-8 text-lg leading-relaxed">
                  {subject.description}
                </p>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                  className="flex items-center gap-2 text-primary group-hover:text-secondary transition-colors duration-300 font-heading"
                >
                  Explore
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </motion.div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-background/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Section */}
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
              Why Enroll With Us?
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
              Discover the advantages of learning at Mirror Creative Institute
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              'Expert instruction from experienced professionals',
              'Flexible class schedules to fit your lifestyle',
              'State-of-the-art facilities and equipment',
              'Performance opportunities throughout the year',
              'Supportive and inspiring learning environment',
              'Certified courses and skill development programs',
              'Small class sizes for personalized attention',
              'Access to our vibrant creative community'
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 border border-primary/20 hover:border-primary transition-all duration-300"
              >
                <div className="w-6 h-6 rounded-full bg-primary flex-shrink-0 mt-1" />
                <p className="text-foreground/80 text-lg">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
