import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { GalleryItems } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function GalleryPage() {
  const [allItems, setAllItems] = useState<GalleryItems[]>([]);
  const [filteredItems, setFilteredItems] = useState<GalleryItems[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await BaseCrudService.getAll<GalleryItems>('galleryitems');
      setAllItems(data.items);
      setFilteredItems(data.items);
    } catch (error) {
      console.error('Error loading gallery:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filters = ['All', 'Classes', 'Concerts', 'Students', 'Events'];

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
    if (filter === 'All') {
      setFilteredItems(allItems);
    } else {
      setFilteredItems(allItems.filter(item => 
        item.category?.toLowerCase() === filter.toLowerCase()
      ));
    }
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const goToPrevious = () => {
    if (lightboxIndex !== null && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    }
  };

  const goToNext = () => {
    if (lightboxIndex !== null && lightboxIndex < filteredItems.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') goToPrevious();
        if (e.key === 'ArrowRight') goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

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
            Our Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto"
          >
            Moments captured from our vibrant creative community
          </motion.p>
        </div>
      </section>
      {/* Filter Tabs */}
      <section className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-12">
        <div className="flex flex-wrap justify-center gap-4">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilter(filter)}
              className={`px-8 py-3 font-heading text-lg transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-primary text-primary-foreground shadow-[0_0_20px_rgba(218,165,32,0.3)]'
                  : 'bg-transparent border border-primary/30 text-foreground hover:border-primary hover:text-primary'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>
      {/* Gallery Grid */}
      <section className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-12 pb-24" style={{ minHeight: '800px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? null : filteredItems.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => openLightbox(index)}
              className="group cursor-pointer relative overflow-hidden aspect-square border border-primary/20 hover:border-primary transition-all duration-300"
            >

            </motion.div>
          ))}
        </div>

        {!isLoading && filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-foreground/60">No items found in this category</p>
          </div>
        )}
      </section>
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/98 z-50 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-primary/10 hover:bg-primary text-foreground hover:text-primary-foreground transition-all duration-300 z-10"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {lightboxIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-6 w-12 h-12 flex items-center justify-center bg-primary/10 hover:bg-primary text-foreground hover:text-primary-foreground transition-all duration-300"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {lightboxIndex < filteredItems.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-6 w-12 h-12 flex items-center justify-center bg-primary/10 hover:bg-primary text-foreground hover:text-primary-foreground transition-all duration-300"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            <div className="max-w-7xl max-h-[90vh] px-20" onClick={(e) => e.stopPropagation()}>
              {filteredItems[lightboxIndex]?.image && (
                <Image
                  src={filteredItems[lightboxIndex].image!}
                  alt={filteredItems[lightboxIndex].title || 'Gallery image'}
                  className="w-full h-full object-contain"
                  width={1200}
                />
              )}
              <div className="text-center mt-6">
                <h3 className="font-heading text-2xl text-foreground mb-2">
                  {filteredItems[lightboxIndex]?.title}
                </h3>
                {filteredItems[lightboxIndex]?.description && (
                  <p className="text-foreground/70">
                    {filteredItems[lightboxIndex].description}
                  </p>
                )}
                <p className="text-sm text-foreground/50 mt-2">
                  {lightboxIndex + 1} / {filteredItems.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}
