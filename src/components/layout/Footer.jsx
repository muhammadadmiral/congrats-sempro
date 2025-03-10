import { FiHeart, FiGithub, FiLinkedin, FiInstagram, FiMusic, FiChevronUp } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Footer = ({ isMusicPlaying, toggleMusic, isMusicAvailable }) => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Show scroll-to-top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-accent-500/20"></div>
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg className="w-full h-12 -mt-1 text-gray-50 dark:text-gray-900" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
        </svg>
      </div>
      
      {/* Scroll to top button */}
      <motion.button
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-primary-600 text-white shadow-lg z-40 ${showScrollTop ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={scrollToTop}
        animate={{ y: showScrollTop ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to top"
      >
        <FiChevronUp size={24} />
      </motion.button>
      
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-display font-bold mb-4 gradient-text">Sempro Success</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Rayakan keberhasilan seminar proposal Nur Fadiyah Azzizah. Situs ini dibuat khusus untuk mengabadikan momen penting dalam perjalanan akademik.
            </p>
            
            {/* Music player */}
            {isMusicAvailable && (
              <div className="flex items-center mb-6">
                <button 
                  onClick={toggleMusic}
                  className="flex items-center bg-gray-800 hover:bg-gray-700 text-white rounded-full px-4 py-2 transition-all duration-300"
                >
                  <FiMusic className={`mr-2 ${isMusicPlaying ? 'animate-pulse text-primary-400' : 'text-gray-400'}`} />
                  <span>{isMusicPlaying ? 'Now Playing: Ada Masanya Kita' : 'Play Background Music'}</span>
                </button>
              </div>
            )}
            
            <div className="flex space-x-4">
              <motion.a 
                href="https://github.com" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: "#4299E1" }}
                className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white transition-colors"
              >
                <FiGithub size={20} />
              </motion.a>
              <motion.a 
                href="https://linkedin.com" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: "#0077B5" }}
                className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white transition-colors"
              >
                <FiLinkedin size={20} />
              </motion.a>
              <motion.a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: "#E1306C" }}
                className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white transition-colors"
              >
                <FiInstagram size={20} />
              </motion.a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                  Home
                </a>
              </li>
              <li>
                <a href="/gallery" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                  Gallery
                </a>
              </li>
              <li>
                <a href="/timeline" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                  Timeline
                </a>
              </li>
              <li>
                <a href="/congratulations" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                  Congratulations
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <p className="text-gray-400 mb-4">Feel free to reach out for future collaborations.</p>
            <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
              <h4 className="font-medium text-primary-400 mb-2">Nur Fadiyah Azzizah</h4>
              <a href="mailto:info@example.com" className="text-gray-300 hover:text-primary-300 transition-colors block mb-1">
                info@example.com
              </a>
              <p className="text-gray-500 text-sm">
                Universitas Brawijaya<br />
                Malang, Indonesia
              </p>
            </div>
          </div>
        </div>
        
        {/* Copyright section */}
        <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
          <p className="flex items-center justify-center mb-2">
            Made with 
            <motion.span 
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatType: "loop"
              }}
              className="mx-1 text-red-500"
            >
              <FiHeart />
            </motion.span> 
            for Nur Fadiyah Azzizah
          </p>
          <p className="text-sm text-gray-500">© {currentYear} All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;