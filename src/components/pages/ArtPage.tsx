import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { CreativeSubjects, SubjectStyles } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ArtPage() {
  const [subjects, setSubjects] = useState<CreativeSubjects[]>([]);
  const [styles, setStyles] = useState<SubjectStyles[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStyle, setSelectedStyle] = useState<SubjectStyles | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [subjectsData, stylesData] = await Promise.all([
        BaseCrudService.getAll<CreativeSubjects>('creativesubjects'),
        BaseCrudService.getAll<SubjectStyles>('subjectstyles')
      ]);

      const filtered = subjectsData.items.filter(
        s => s.category?.toLowerCase() === 'art'
      );
      setSubjects(filtered);
      setStyles(stylesData.items);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getArtStyles = () => {
    return styles.filter(style => 
      style.styleName?.toLowerCase().includes('art') || 
      style.styleName?.toLowerCase().includes('sketch') ||
      style.styleName?.toLowerCase().includes('paint') ||
      style.styleName?.toLowerCase().includes('digital')
    );
  };

  const closeModal = () => {
    setSelectedStyle(null);
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
            Create Your Vision
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto mb-8"
          >
            Explore visual creativity through diverse mediums. From traditional to digital, bring your imagination to life.
          </motion.p>
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-primary italic max-w-2xl mx-auto"
          >
            "Every artist was first an amateur." — Ralph Waldo Emerson
          </motion.blockquote>
        </div>
      </section>

      {/* Art Styles Grid */}
      <section className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-24" style={{ minHeight: '600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading ? null : getArtStyles().map((style, index) => (
            <motion.div
              key={style._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedStyle(style)}
              className="group cursor-pointer relative overflow-hidden border border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-[0_0_40px_rgba(218,165,32,0.2)]"
            >
              {style.styleImage && (
                <Image
                  src={style.styleImage}
                  alt={style.styleName || 'Art style'}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  width={400}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-heading text-2xl text-foreground group-hover:text-primary transition-colors duration-300">
                  {style.styleName}
                </h3>
                {style.shortSummary && (
                  <p className="text-sm text-foreground/70 mt-2">
                    {style.shortSummary}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modal - Style Details */}
      <AnimatePresence>
        {selectedStyle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background border-2 border-primary/30 max-w-5xl w-full max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-primary/10 hover:bg-primary text-foreground hover:text-primary-foreground transition-all duration-300 z-10"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                <div className="relative">
                  {selectedStyle.styleImage && (
                    <Image
                      src={selectedStyle.styleImage}
                      alt={selectedStyle.styleName || 'Style'}
                      className="w-full h-full object-cover"
                      width={600}
                    />
                  )}
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-6">
                      {selectedStyle.styleName}
                    </h2>

                    {selectedStyle.description && (
                      <p className="text-foreground/80 mb-8 leading-relaxed">
                        {selectedStyle.description}
                      </p>
                    )}
                  </div>

                  {selectedStyle.enrollmentFormUrl && (
                    <a
                      href={selectedStyle.enrollmentFormUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-5 text-lg font-heading hover:shadow-[0_0_30px_rgba(218,165,32,0.4)] transition-all duration-300"
                    >
                      Enroll for {selectedStyle.styleName}
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
