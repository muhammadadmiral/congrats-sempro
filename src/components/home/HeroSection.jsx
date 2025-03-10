import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiCamera, FiCalendar, FiAward, FiHeart } from 'react-icons/fi';
import confetti from 'canvas-confetti';
import gsap from 'gsap';

const HeroSection = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Handle mouse move for 3D effect
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const moveX = (x - centerX) / 25;
    const moveY = (y - centerY) / 25;
    
    setMousePosition({ x: moveX, y: moveY });
  };

  useEffect(() => {
    // Text animation with GSAP
    if (titleRef.current) {
      gsap.from(titleRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out"
      });
    }
    
    // Create confetti effect
    const duration = 5 * 1000;
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
        colors: ['#0ea5e9', '#d946ef', '#f97316', '#eab308', '#14b8a6'],
        spread: 80,
        gravity: 0.8,
        scalar: 1.2,
        ticks: 300,
        shapes: ['square', 'circle']
      });
      
      confetti({
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: 0.5 },
        colors: ['#0ea5e9', '#d946ef', '#f97316', '#eab308', '#14b8a6'],
        spread: 80,
        gravity: 0.8,
        scalar: 1.2,
        ticks: 300,
        shapes: ['square', 'circle']
      });
    }, 250);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center pt-20 pb-32 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-50/60 to-white z-0"></div>
      
      {/* Animated Background Shapes */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-secondary-200 opacity-20 blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-primary-200 opacity-20 blur-3xl animate-float animation-delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full bg-accent-200 opacity-20 blur-3xl animate-float animation-delay-2000"></div>
      
      {/* Floating Shapes */}
      <motion.div
        className="absolute top-32 right-1/4 w-8 h-8 rotate-45 bg-primary-400/30 rounded-lg"
        animate={{
          y: [0, -20, 0],
          rotate: [45, 90, 45],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-40 left-1/3 w-6 h-6 bg-secondary-400/30 rounded-full"
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-60 left-20 w-10 h-10 bg-accent-400/30 rotate-12 rounded-lg"
        animate={{
          y: [0, -25, 0],
          rotate: [12, -12, 12],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center md:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-secondary-100 to-primary-100 text-primary-800 font-medium shadow-md"
            >
              <FiAward className="mr-2" />
              <span>Academic Excellence</span>
            </motion.div>
            
            <div ref={titleRef} className="overflow-hidden">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight mb-6">
                <span className="block mb-2">Celebrating</span>
                <span className="fancy-gradient-text">Nur Fadiyah Azzizah</span>
              </h1>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-600 text-lg md:text-xl mb-8 max-w-xl leading-relaxed"
            >
              On successfully defending her thesis proposal and completing an important milestone in her academic journey. A journey of excellence, dedication, and remarkable achievements.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center md:justify-start"
            >
              <Link to="/gallery">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary group flex items-center"
                >
                  <FiCamera className="mr-2 group-hover:animate-pulse" />
                  View Gallery
                  <FiChevronRight className="ml-1 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                </motion.button>
              </Link>
              
              <Link to="/timeline">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-outline-secondary group flex items-center"
                >
                  <FiCalendar className="mr-2 group-hover:animate-pulse" />
                  See Timeline
                  <FiChevronRight className="ml-1 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                </motion.button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-12 flex items-center justify-center md:justify-start"
            >
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold border-2 border-white">P</div>
                <div className="w-10 h-10 rounded-full bg-secondary-500 flex items-center justify-center text-white font-bold border-2 border-white">D</div>
                <div className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center text-white font-bold border-2 border-white">R</div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Join <span className="text-primary-600 font-semibold">48+</span> others in celebrating this achievement</p>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            style={{
              transform: `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
              transformStyle: "preserve-3d"
            }}
            className="flex justify-center"
          >
            <div className="relative card-3d">
              {/* Main graduate image/placeholder */}
              <div className="relative w-80 h-80 md:w-96 md:h-96 overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 p-1 shadow-xl">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <span className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary-500 to-secondary-500">N</span>
                </div>
                
                {/* Decorative circle around image */}
                <div className="absolute -inset-1 rounded-full border-4 border-dashed border-white opacity-50 animate-spin-slow"></div>
              </div>
              
              {/* Floating elements */}
              <motion.div 
                className="absolute -top-8 -right-8 bg-accent-400 w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
                style={{ 
                  transform: `translateZ(40px) rotateX(${mousePosition.y * 0.2}deg) rotateY(${-mousePosition.x * 0.2}deg)` 
                }}
              >
                2025
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-6 -left-6 bg-white p-5 rounded-xl shadow-xl card-fancy"
                animate={{
                  y: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
                style={{ 
                  transform: `translateZ(60px) rotateX(${mousePosition.y * 0.3}deg) rotateY(${-mousePosition.x * 0.3}deg)` 
                }}
              >
                <div className="text-sm font-medium text-gray-500 mb-1">Thesis Proposal</div>
                <div className="text-lg font-bold text-primary-600">Defended Successfully</div>
              </motion.div>
              
              <motion.div
                className="absolute top-1/2 -right-12 transform -translate-y-1/2 bg-white px-4 py-2 rounded-full shadow-md flex items-center"
                animate={{
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
                style={{ 
                  transform: `translateZ(30px) rotateY(${-mousePosition.x * 0.2}deg)` 
                }}
              >
                <FiHeart className="text-red-500 mr-1" />
                <span className="text-sm font-medium">Excellence</span>
              </motion.div>
              
              <motion.div
                className="absolute top-1/4 -left-10 transform -translate-y-1/2 bg-gradient-to-r from-secondary-500 to-primary-500 px-3 py-1 rounded-lg shadow-md text-white text-xs font-bold"
                animate={{
                  x: [0, -5, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
                style={{ 
                  transform: `translateZ(50px) rotateY(${-mousePosition.x * 0.4}deg)` 
                }}
              >
                GPA 3.95
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