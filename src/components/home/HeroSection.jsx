import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiCamera, FiCalendar, FiAward, FiHeart, FiStar, FiBookOpen, FiZap } from 'react-icons/fi';
import confetti from 'canvas-confetti';
import gsap from 'gsap';

const HeroSection = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Check for dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    // Create an observer to watch for class changes on <html>
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => observer.disconnect();
  }, []);
  
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
      className="relative min-h-screen flex items-center pt-20 pb-32 overflow-hidden bg-gradient-to-b from-gray-900/90 via-primary-900/80 to-gray-900/90 dark:from-gray-900 dark:via-primary-950 dark:to-gray-900 text-white"
    >
      {/* Radial gradients for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-primary-600/5 to-transparent dark:from-primary-500/10 dark:to-transparent"></div>
      
      {/* Animated Background Shapes */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-secondary-500/20 blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-primary-500/10 blur-3xl animate-float animation-delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full bg-accent-500/10 blur-3xl animate-float animation-delay-2000"></div>
      
      {/* Particle effects */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.5, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      {/* Floating Shapes */}
      <motion.div
        className="absolute top-32 right-1/4 w-8 h-8 rotate-45 bg-primary-400/20 rounded-lg"
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
        className="absolute bottom-40 left-1/3 w-6 h-6 bg-secondary-400/20 rounded-full"
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
        className="absolute top-60 left-20 w-10 h-10 bg-accent-400/20 rotate-12 rounded-lg"
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
      
      {/* Decorative lines */}
      <div className="absolute left-0 top-1/3 w-full h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent"></div>
      <div className="absolute left-0 bottom-1/3 w-full h-px bg-gradient-to-r from-transparent via-secondary-500/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Fancy top banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-full max-w-2xl"
        >
          <div className="bg-gradient-to-r from-primary-900/80 via-primary-800/90 to-primary-900/80 backdrop-blur-md shadow-lg border border-primary-700/50 rounded-full py-2 px-6 flex items-center justify-center">
            <div className="flex items-center space-x-2 text-primary-300">
              <FiStar className="animate-pulse" />
              <span className="text-sm font-medium">Seminar Proposal • Maret 2025</span>
              <FiStar className="animate-pulse" />
            </div>
          </div>
        </motion.div>
        
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
              className="inline-flex items-center mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-primary-700/70 to-secondary-700/70 text-white backdrop-blur-sm border border-white/10 shadow-lg"
            >
              <FiAward className="mr-2 text-yellow-400" />
              <span>Academic Excellence</span>
            </motion.div>
            
            <div ref={titleRef} className="overflow-hidden">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight mb-3 text-white">
                <span className="block mb-2 text-gradient-animated">Nur Fadiyah Azzizah</span>
                <span className="text-xl md:text-2xl lg:text-3xl text-secondary-300 block mt-2 font-semibold">aka Jijah</span>
              </h1>
              
              <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-6 md:mx-0 mx-auto"></div>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-300 text-lg md:text-xl mb-8 max-w-xl leading-relaxed"
            >
              Berhasil menjadi orang keren yang menyelesaikan seminar proposal yang sulitttttttt iniiiii walaupun sambil ya Allah ya Allah
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center md:justify-start"
            >
              <Link to="/gallery">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(14, 165, 233, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-full font-bold flex items-center space-x-2 shadow-lg shadow-primary-900/30 border border-primary-500/30 group hover:border-primary-400/50 transition-all duration-300"
                >
                  <FiCamera className="mr-2 group-hover:animate-pulse" />
                  <span>futunaaa</span>
                  <FiChevronRight className="ml-1 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                </motion.button>
              </Link>
              
              <Link to="/timeline">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(217, 70, 239, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border border-secondary-500/50 text-white px-6 py-3 rounded-full font-bold flex items-center space-x-2 hover:bg-secondary-900/30 transition-all duration-300 group"
                >
                  <FiCalendar className="mr-2 group-hover:animate-pulse text-secondary-300" />
                  <span>Intip Perjalanan Waktu!</span>                  
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
              <div className="relative">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold border-2 border-gray-900 shadow-lg shadow-primary-900/50 z-30">P</div>
                  <div className="w-10 h-10 rounded-full bg-secondary-500 flex items-center justify-center text-white font-bold border-2 border-gray-900 shadow-lg shadow-secondary-900/50 z-20">D</div>
                  <div className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center text-white font-bold border-2 border-gray-900 shadow-lg shadow-accent-900/50 z-10">R</div>
                </div>
                
                {/* Pulsing circle behind avatars */}
                <div className="absolute inset-0 rounded-full bg-white/5 blur-md animate-pulse -z-10 scale-125"></div>
              </div>
              
              <div className="ml-4">
                <p className="text-sm text-gray-300">Gabung bersama <span className="text-primary-400 font-semibold">48+</span> aktor kdrama yang mengucapkan chughahabnida</p>
              </div>
            </motion.div>
            
            {/* Achievement badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-8 flex flex-wrap gap-2 justify-center md:justify-start"
            >
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-900/70 text-primary-300 border border-primary-700/50">NASPO 2023</span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary-900/70 text-secondary-300 border border-secondary-700/50">BEM FMIPA UB</span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent-900/70 text-accent-300 border border-accent-700/50">Magang BRIN</span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-900/70 text-blue-300 border border-blue-700/50">Kimia UB</span>
            </motion.div>
          </motion.div>
          
          {/* Image Content with enhanced 3D effect */}
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
              {/* Main photo container with fancy border */}
              <div className="relative w-80 h-80 md:w-96 md:h-96 overflow-hidden rounded-full p-1 shadow-xl bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-400 animate-shine bg-size-200">
                <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden bg-gray-900 p-1">
                  {/* Actual photo */}
                  <div className="w-full h-full rounded-full overflow-hidden relative group">
                    <img 
                      src="/images/jijah-1.jpg" 
                      alt="Nur Fadiyah Azzizah aka Jijah" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = ""; 
                        e.target.parentElement.innerHTML = '<span class="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary-500 to-secondary-500">J</span>';
                      }}
                    />
                    
                    {/* Overlay effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
                
                {/* Shimmering border effect */}
                <div className="absolute -inset-1 rounded-full animate-spin-slow opacity-70 bg-transparent border-2 border-dashed border-white/20"></div>
                <div className="absolute -inset-4 rounded-full animate-spin-slow opacity-30 bg-transparent border border-dashed border-white/10" style={{ animationDirection: 'reverse', animationDuration: '30s' }}></div>
              </div>
              
              {/* Floating elements with enhanced depth and styling */}
              <motion.div 
                className="absolute -top-8 -right-8 bg-gradient-to-br from-accent-500 to-accent-600 w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-accent-900/50 backdrop-blur-sm border border-accent-400/30"
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
                <FiZap className="absolute -top-2 -right-2 text-yellow-300 text-xl animate-pulse" />
                <span>2025</span>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-6 -left-6 bg-gradient-to-br from-gray-900/90 to-primary-900/90 p-5 rounded-xl shadow-xl border border-primary-700/50 backdrop-blur-sm"
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
                <div className="text-sm font-medium text-primary-300 mb-1">Sempro</div>
                <div className="text-lg font-bold text-white">Berhasil di bantai!</div>
              </motion.div>
              
              <motion.div
                className="absolute top-1/2 -right-12 transform -translate-y-1/2 bg-gradient-to-r from-gray-900/80 to-primary-900/80 px-4 py-2 rounded-full shadow-lg border border-primary-700/30 backdrop-blur-sm flex items-center"
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
                <FiHeart className="text-red-500 mr-1 animate-heartbeat" />
                <span className="text-sm font-medium text-white">Excellence</span>
              </motion.div>
              
              <motion.div
                className="absolute top-1/4 -left-12 transform -translate-y-1/2 bg-gradient-to-r from-secondary-600 to-primary-600 px-3 py-1 rounded-lg shadow-lg text-white text-xs font-bold"
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
                <FiBookOpen className="inline-block mr-1" />
                <span>GPA 99.99999</span>
              </motion.div>
              
              {/* Extra floating element */}
              <motion.div
                className="absolute bottom-1/4 -right-10 transform -translate-y-1/2 bg-gradient-to-r from-purple-600/90 to-blue-600/90 px-3 py-1 rounded-lg shadow-lg text-white text-xs font-bold backdrop-blur-sm border border-purple-500/30"
                animate={{
                  y: [0, 8, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
                style={{ 
                  transform: `translateZ(45px) rotateY(${-mousePosition.x * 0.3}deg)` 
                }}
              >
                <span>Kimia Lingkungan</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator with enhanced styling */}
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
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-400 mb-2">Scroll down</span>
            <div className="w-6 h-10 border border-primary-500/50 rounded-full flex items-center justify-center p-1">
              <motion.div 
                className="w-1.5 h-1.5 bg-primary-400 rounded-full"
                animate={{
                  y: [0, 12, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;