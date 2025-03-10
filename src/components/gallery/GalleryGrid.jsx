import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiZoomIn, FiFilter, FiClipboard, FiBook, FiUser, FiUsers, FiAward, FiCamera, FiHeart, FiActivity, FiDroplet } from 'react-icons/fi';
import { galleryItems, categories } from './GalleryItems'; // Pastikan nama file sesuai

const GalleryGrid = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState("Semua");
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [showFilters, setShowFilters] = useState(false); // untuk tampilan mobile
  
  const filteredItems = filter === "Semua" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  useEffect(() => {
    // Simulasi loading gambar
    const timer = setTimeout(() => {
      setImagesLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Helper function untuk mendapatkan icon yang sesuai
  const getIcon = (iconName) => {
    switch(iconName) {
      case 'FiBook': return <FiBook />;
      case 'FiUsers': return <FiUsers />;
      case 'FiAward': return <FiAward />;
      case 'FiClipboard': return <FiClipboard />;
      case 'FiUser': return <FiUser />;
      case 'FiHeart': return <FiHeart />;
      case 'FiActivity': return <FiActivity />;
      case 'FiDroplet': return <FiDroplet />; // Menggunakan FiDroplet yang tersedia
      default: return <FiCamera />;
    }
  };

  return (
    <section className="py-8 md:py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-3 md:px-4">
        <div className="mb-6 md:mb-10 flex flex-col md:flex-row justify-between items-start md:items-center">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-display font-bold mb-4 md:mb-0 gradient-text"
          >
            Galeri Perjalanan
          </motion.h2>
          
          {/* Filter Button for Mobile */}
          <div className="md:hidden w-full">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-between w-full p-3 bg-white dark:bg-gray-800 rounded-lg shadow text-gray-700 dark:text-gray-300"
            >
              <span className="flex items-center">
                <FiFilter className="mr-2 text-primary-500" />
                <span>Filter: <span className="font-medium">{filter}</span></span>
              </span>
              <span className={`transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            
            {/* Mobile Filters Dropdown */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="flex flex-col p-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => {
                          setFilter(category);
                          setShowFilters(false);
                        }}
                        className={`px-4 py-3 text-sm font-medium text-left rounded-lg my-1 transition-all ${
                          filter === category
                            ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Desktop Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:inline-flex flex-wrap p-1 bg-white dark:bg-gray-800 rounded-full shadow-lg"
          >
            <FiFilter className="ml-3 mr-1 text-gray-500 dark:text-gray-400 self-center" />
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-3 md:px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  filter === category
                    ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
        
        {!imagesLoaded ? (
          // Loading skeleton
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow animate-pulse">
                <div className="h-48 md:h-60 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            layout
          >
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  layout
                  whileHover={{ y: -5 }}
                  className="card-fancy dark:bg-gray-800 dark:border-gray-700 overflow-hidden cursor-pointer group p-0"
                  onClick={() => setSelectedImage(item)}
                >
                  <div className="relative h-48 sm:h-52 md:h-60 overflow-hidden">
                    <img 
                      src={item.imagePath} 
                      alt={item.title}
                      onError={(e) => {
                        // Fallback untuk gambar yang belum tersedia
                        e.target.src = `https://via.placeholder.com/600x400/0284c7/FFFFFF?text=${item.title.replace(/ /g, '+')}`;
                      }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <div className="text-white">
                        <h3 className="font-bold text-lg">{item.title}</h3>
                        <p className="text-sm opacity-80">{item.category}</p>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-2 shadow-md text-primary-600 dark:text-primary-400">
                      {getIcon(item.icon)}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                        <FiZoomIn className="text-white text-2xl" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white truncate">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{item.category}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
        
        {/* Modal for selected image - lebih responsif */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-2 md:p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative max-w-4xl w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-2 right-2 p-2 bg-white/10 backdrop-blur-md rounded-full text-white z-10 hover:bg-white/30 transition-colors"
                  onClick={() => setSelectedImage(null)}
                >
                  <FiX size={20} />
                </button>
                
                <div className="md:flex-1 h-56 sm:h-72 md:h-auto overflow-hidden">
                  <img 
                    src={selectedImage.imagePath}
                    alt={selectedImage.title}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/800x600/0284c7/FFFFFF?text=${selectedImage.title.replace(/ /g, '+')}`;
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="md:w-2/5 p-4 md:p-6 overflow-y-auto">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-500 dark:text-primary-400 mr-3">
                      {getIcon(selectedImage.icon)}
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold gradient-text">{selectedImage.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Kategori: {selectedImage.category}</p>
                    </div>
                  </div>
                  
                  <div className="h-px w-full bg-gray-200 dark:bg-gray-700 my-4"></div>
                  
                  <p className="text-gray-800 dark:text-gray-300 text-sm md:text-base">
                    {selectedImage.description}
                  </p>
                  
                  <div className="mt-6 flex justify-end">
                    <button 
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setSelectedImage(null)}
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GalleryGrid;