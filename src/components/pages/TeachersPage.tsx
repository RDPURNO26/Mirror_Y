import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Teachers } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teachers[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await BaseCrudService.getAll<Teachers>('teachers');
      setTeachers(data.items);
    } catch (error) {
      console.error('Error loading teachers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full max-w-[100rem] mx-auto min-h-[50vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background" />
        <div className="relative z-10 text-center px-8 md:px-16 lg:px-24 py-24">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading text-6xl md:text-8xl text-foreground mb-8"
          >
            Learn from the Best
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto"
          >
            Our passionate educators bring years of experience and dedication to nurture your creative journey
          </motion.p>
        </div>
      </section>

      {/* Teachers Grid */}
      <section className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-24" style={{ minHeight: '800px' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {isLoading ? null : teachers.map((teacher, index) => (
            <motion.div
              key={teacher._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden mb-6 border border-primary/20 group-hover:border-primary transition-all duration-300">
                {teacher.photo && (
                  <Image
                    src={teacher.photo}
                    alt={teacher.teacherName || 'Teacher'}
                    className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500"
                    width={500}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              </div>

              <h3 className="font-heading text-3xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {teacher.teacherName}
              </h3>

              <p className="text-primary text-lg mb-4 font-heading">
                {teacher.specialization}
              </p>

              {teacher.bio && (
                <p className="text-foreground/80 mb-4 leading-relaxed">
                  {teacher.bio}
                </p>
              )}

              {teacher.experienceAndAchievements && (
                <div className="bg-primary/5 border border-primary/20 p-6 mt-4">
                  <h4 className="font-heading text-lg text-foreground mb-3">
                    Experience & Achievements
                  </h4>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    {teacher.experienceAndAchievements}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
