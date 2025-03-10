import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiCamera, FiCalendar } from 'react-icons/fi';
import confetti from 'canvas-confetti';

const HeroSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Create confetti effect
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    
    const randomInRange = (min, max) => {
      return Math.random() * (max - min) + min;
    };
    
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      
      const particleCount = 50 * (timeLeft / duration);
      
      // Launch confetti from both sides
      confetti({
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: 0.5 },
        colors: ['#0ea5e9', '#d946ef', '#f97316'],
        spread: 80,
        gravity: 0.8,
        scalar: 1.2
      });
      
      confetti({
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: 0.5 },
        colors: ['#0ea5e9', '#d946ef', '#f97316'],
        spread: 80,
        gravity: 0.8,
        scalar: 1.2
      });
    }, 250);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-16 pb-32 overflow-hidden bg-gradient-to-b from-primary-50 to-white"
    >
      {/* Background Decorations */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-secondary-200 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-primary-200 opacity-20 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <span className="inline-block bg-secondary-100 text-secondary-800 px-3 py-1 rounded-full text-sm font-medium mb-6">
              Congratulations!
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              <span className="block">Celebrating</span>
              <span className="gradient-text">Nur Fadiyah Azzizah</span>
            </h1>
            
            <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-xl">
              On successfully defending her thesis proposal and completing an important milestone in her academic journey.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link to="/gallery">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex items-center"
                >
                  <FiCamera className="mr-2" />
                  View Gallery
                </motion.button>
              </Link>
              
              <Link to="/timeline">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-outline flex items-center"
                >
                  <FiCalendar className="mr-2" />
                  See Timeline
                </motion.button>
              </Link>
            </div>
          </motion.div>
          
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Placeholder for graduate image */}
              <div className="w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white text-6xl font-display">
                <span className="font-bold">N</span>
              </div>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute -top-6 -right-6 bg-accent-400 w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                2025
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-xl"
                animate={{
                  y: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                <div className="text-sm font-medium text-gray-500">Thesis Proposal</div>
                <div className="text-lg font-bold text-primary-600">Defended Successfully</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <FiChevronRight className="w-6 h-6 text-gray-400 transform rotate-90" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;