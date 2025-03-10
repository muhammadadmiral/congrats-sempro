import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiZoomIn, FiFilter } from 'react-icons/fi';

// Since we don't have actual images, we'll create placeholder images with gradients
const galleryItems = [
  {
    id: 1,
    title: "Thesis Proposal Defense",
    category: "Academic",
    color: "from-primary-400 to-primary-600"
  },
  {
    id: 2,
    title: "Research Presentation",
    category: "Conference",
    color: "from-secondary-400 to-secondary-600"
  },
  {
    id: 3,
    title: "Academic Award Ceremony",
    category: "Award",
    color: "from-accent-400 to-accent-600"
  },
  {
    id: 4,
    title: "Laboratory Research",
    category: "Research",
    color: "from-green-400 to-green-600"
  },
  {
    id: 5,
    title: "Department Recognition",
    category: "Award",
    color: "from-yellow-400 to-yellow-600"
  },
  {
    id: 6,
    title: "Conference Networking",
    category: "Conference",
    color: "from-purple-400 to-purple-600"
  },
  {
    id: 7,
    title: "Research Team Meeting",
    category: "Research",
    color: "from-blue-400 to-blue-600"
  },
  {
    id: 8,
    title: "Data Analysis Session",
    category: "Research",
    color: "from-indigo-400 to-indigo-600"
  },
  {
    id: 9,
    title: "Publication Celebration",
    category: "Award",
    color: "from-pink-400 to-pink-600"
  }
];

const categories = ["All", "Academic", "Conference", "Award", "Research"];

const GalleryGrid = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState("All");
  
  const filteredItems = filter === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-3xl font-display font-bold mb-4 md:mb-0">Memorable Moments</h2>
          
          <div className="inline-flex p-1 bg-white rounded-full shadow-md">
            <FiFilter className="ml-3 mr-1 text-gray-500 self-center" />
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  filter === category
                    ? "bg-primary-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
                className="rounded-xl overflow-hidden shadow-lg bg-white cursor-pointer group"
                onClick={() => setSelectedImage(item)}
              >
                <div className={`h-60 bg-gradient-to-br ${item.color} relative`}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                    <FiZoomIn className="text-white text-3xl" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.category}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Modal for selected image */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full text-white z-10"
                  onClick={() => setSelectedImage(null)}
                >
                  <FiX size={24} />
                </button>
                
                <div className={`h-96 bg-gradient-to-br ${selectedImage.color}`}></div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                  <p className="text-gray-600">Category: {selectedImage.category}</p>
                  <p className="mt-4 text-gray-800">
                    This memorable moment captures an important milestone in Nur Fadiyah Azzizah's academic journey, showcasing her dedication and achievement.
                  </p>
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