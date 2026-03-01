import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { CoreValues } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const [coreValues, setCoreValues] = useState<CoreValues[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await BaseCrudService.getAll<CoreValues>('corevalues');
      const activeValues = data.items
        .filter(v => v.isActive)
        .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
      setCoreValues(activeValues);
    } catch (error) {
      console.error('Error loading values:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto"
          >
            Nurturing creativity and excellence since our founding
          </motion.p>
        </div>
      </section>
      {/* Our Story Section */}
      <section className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-5xl md:text-6xl text-foreground mb-8">
              Our Story
            </h2>
            <div className="space-y-6 text-foreground/80 leading-relaxed">
              <p>
                Mirror Creative Institute was founded with a singular vision: to create a space where artistic passion meets professional excellence. What began as a small music school has blossomed into a comprehensive creative education center, nurturing talent across multiple disciplines.
              </p>
              <p>
                Over the years, we've grown from a handful of students to a thriving community of hundreds, all united by their love for the arts. Our journey has been marked by countless performances, exhibitions, and most importantly, the transformation of aspiring artists into confident creators.
              </p>
              <p>
                Today, Mirror Creative Institute stands as a beacon for creative education, offering world-class instruction in musical instruments, singing, dancing, and visual arts. Our commitment remains unchanged: to inspire, educate, and empower every student who walks through our doors.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative border border-primary/30 overflow-hidden">
              <Image
                src="https://static.wixstatic.com/media/43707e_45574766c2aa44bb92134297767a3161~mv2.png?originWidth=768&originHeight=576"
                alt="Mirror Creative Institute"
                className="w-full h-full object-cover"
                width={800}
              />
            </div>
          </motion.div>
        </div>
      </section>
      {/* Owner Section - HM Jewel */}
      <section className="w-full bg-gradient-to-b from-primary/5 to-background py-24">
        <div className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-5xl md:text-7xl text-foreground mb-6">
              Meet Our Founder
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
              The visionary behind Mirror Creative Institute
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative flex justify-center"
            >
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 blur-2xl" />
                <div className="relative border-2 border-primary/40 overflow-hidden aspect-square">
                  <Image
                    src="https://static.wixstatic.com/media/43707e_682aa501855041009cb4ca060fe7339b~mv2.jpg"
                    className="w-full h-full object-cover"
                    width={500}
                    originWidth={1024}
                    originHeight={1024}
                    focalPointX={56.103515625}
                    focalPointY={50.927734375} />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h3 className="font-heading text-4xl md:text-5xl text-foreground mb-2">
                  HM Jewel
                </h3>
                <p className="text-xl text-primary font-semibold mb-6">
                  Founder & Creative Director
                </p>
              </div>

              <div className="space-y-6 text-foreground/80 leading-relaxed text-lg">
                <p>
                  HM Jewel's journey in the creative arts spans decades of passion, dedication, and innovation. With a deep-rooted belief that creativity knows no boundaries, HM Jewel founded Mirror Creative Institute to create a sanctuary where artistic dreams transform into reality.
                </p>
                <p>
                  Drawing from extensive experience in music, performance, and visual arts, HM Jewel has mentored hundreds of students, guiding them from their first tentative steps to confident performers and accomplished artists. His philosophy centers on the belief that every individual possesses unique creative potential waiting to be discovered and nurtured.
                </p>
                <p>
                  Under HM Jewel's visionary leadership, Mirror Creative Institute has grown into a beacon of artistic excellence, known for its comprehensive curriculum, world-class instruction, and most importantly, its transformative impact on students' lives. His commitment to fostering creativity, building confidence, and celebrating artistic expression remains the driving force behind everything the institute does.
                </p>
              </div>

              <div className="pt-6 border-t border-primary/20">
                <p className="text-foreground/60 italic">
                  "Art is not just what we create—it's who we become in the process."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Mission & Vision Section */}
      <section className="w-full bg-gradient-to-b from-background to-primary/5 py-24">
        <div className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="border border-primary/20 p-12 hover:border-primary transition-all duration-300"
            >
              <h3 className="font-heading text-4xl text-foreground mb-6">Our Mission</h3>
              <p className="text-foreground/80 leading-relaxed text-lg">
                To provide exceptional creative education that empowers individuals of all ages to discover, develop, and express their artistic talents. We strive to create an inclusive, inspiring environment where passion meets discipline, and dreams become reality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border border-primary/20 p-12 hover:border-primary transition-all duration-300"
            >
              <h3 className="font-heading text-4xl text-foreground mb-6">Our Vision</h3>
              <p className="text-foreground/80 leading-relaxed text-lg">
                To be recognized as a leading creative institute that transforms lives through the arts. We envision a world where creativity is celebrated, nurtured, and accessible to all, creating a ripple effect of artistic excellence in our community and beyond.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Core Values Section */}
      {coreValues.length > 0 && (
        <section className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="font-heading text-5xl md:text-7xl text-foreground mb-6">
              Our Core Values
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" style={{ minHeight: '400px' }}>
            {isLoading ? null : coreValues.map((value, index) => (
              <motion.div
                key={value._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8 border border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-[0_0_30px_rgba(218,165,32,0.1)]"
              >
                {value.icon && (
                  <Image
                    src={value.icon}
                    alt={value.valueName || 'Value icon'}
                    className="w-16 h-16 mx-auto mb-6 object-contain"
                    width={64}
                  />
                )}
                <h3 className="font-heading text-2xl text-foreground mb-4">
                  {value.valueName}
                </h3>
                <p className="text-foreground/70">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      )}
      {/* Founder's Message Section */}
      <section className="w-full bg-gradient-to-b from-background to-primary/5 py-24">
        <div className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="font-heading text-5xl md:text-6xl text-foreground mb-6">
                A Message from Our Founder
              </h2>
            </div>

            <div className="bg-background border-2 border-primary/30 p-12 md:p-16">
              <div className="space-y-6 text-foreground/80 leading-relaxed text-lg">
                <p>
                  "When I started Mirror Creative Institute, I had a simple dream: to create a place where creativity could flourish without boundaries. A place where a child's curiosity could transform into mastery, where passion could meet purpose, and where art could change lives.
                </p>
                <p>
                  Over the years, I've witnessed countless transformations. Students who walked in hesitant and unsure, leaving as confident performers and artists. Parents who saw their children discover talents they never knew existed. Teachers who found fulfillment in nurturing the next generation of creative minds.
                </p>
                <p>
                  This institute is more than just a school—it's a community, a family, a movement. Every performance, every exhibition, every small victory reminds me why we do what we do. We're not just teaching skills; we're shaping futures, building confidence, and proving that with the right guidance and dedication, anyone can achieve artistic excellence.
                </p>
                <p>
                  Thank you for being part of our journey. Whether you're a student, parent, or supporter, you are the reason Mirror Creative Institute continues to thrive and inspire."
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-primary/20">
                <p className="font-heading text-2xl text-primary">Founder & Director</p>
                <p className="text-foreground/60 mt-2">Mirror Creative Institute</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Photo Gallery Section */}
      <section className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-5xl md:text-7xl text-foreground mb-6">
            Our Space
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
            A glimpse into our vibrant learning environment
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative overflow-hidden aspect-square border border-primary/20 hover:border-primary transition-all duration-300"
            >
              <Image
                src="https://static.wixstatic.com/media/43707e_2db17888506e42b38e64f6ebbba656a6~mv2.png?originWidth=448&originHeight=448"
                alt={`Institute space ${item}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                width={500}
              />
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
