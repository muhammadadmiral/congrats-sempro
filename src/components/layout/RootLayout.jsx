import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from '../shared/ScrollToTop';
import { MusicPlayerProvider, useMusicPlayer } from '../shared/MusicPlayerContext';

export default function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showInitialButton, setShowInitialButton] = useState(false);

  useEffect(() => {
    // Initialize AOS library with responsive settings
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      disable: window.innerWidth < 768 ? 'phone' : false,
    });

    // Refresh AOS on window resize for better responsiveness
    window.addEventListener('resize', () => {
      AOS.refresh();
    });

    // Simulate loading for a smoother experience
    const timer = setTimeout(() => {
      setShowInitialButton(true);
    }, 1200);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', () => {
        AOS.refresh();
      });
    };
  }, []);

  // Variants for page transitions - optimized for mobile
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 10,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  // Button variants
  const buttonVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    idle: {
      scale: 1,
      boxShadow: "0px 0px 8px rgba(255,255,255,0.2)"
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 0px 20px rgba(255,255,255,0.6)"
    },
    tap: {
      scale: 0.95,
      boxShadow: "0px 0px 5px rgba(255,255,255,0.1)"
    }
  };

  // Text animation variants
  const textVariants = {
    initial: {
      opacity: 0,
      y: -30
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        delay: 0.2
      }
    }
  };

  // Handling the entrance
  const handleStart = () => {
    // First animate out
    setIsLoading(false);
    // Then navigate
    setTimeout(() => {
      navigate ('/hngg')
    }, 400);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-primary-500/20 via-secondary-500/15 to-primary-500/10 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ 
              x: [0, 10, 0], 
              y: [0, -10, 0],
              opacity: [0.4, 0.5, 0.4]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              repeatType: "mirror" 
            }}
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary-500/10 dark:bg-primary-500/5 blur-3xl"
          />
          <motion.div
            animate={{ 
              x: [0, -15, 0], 
              y: [0, 15, 0],
              opacity: [0.3, 0.4, 0.3]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              repeatType: "mirror" 
            }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary-500/10 dark:bg-secondary-500/5 blur-3xl"
          />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-2 h-20 bg-gradient-to-b from-primary-500/50 to-transparent rounded-full hidden md:block"></div>
        <div className="absolute bottom-10 right-10 w-2 h-20 bg-gradient-to-t from-secondary-500/50 to-transparent rounded-full hidden md:block"></div>
        <div className="absolute top-1/2 right-10 w-20 h-1 bg-gradient-to-r from-transparent to-primary-500/30 rounded-full hidden md:block"></div>
        <div className="absolute bottom-1/2 left-10 w-20 h-1 bg-gradient-to-l from-transparent to-secondary-500/30 rounded-full hidden md:block"></div>
        
        {/* Content container with subtle glassmorphism */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 bg-white/5 dark:bg-black/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10 dark:border-white/5 shadow-2xl max-w-2xl w-full mx-auto"
        >
          <motion.div
            variants={textVariants}
            initial="initial"
            animate="animate"
            className="text-center"
          >
            <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto mb-6"></div>
            
            <motion.div
              animate={{
                scale: [1, 1.03, 1],
                opacity: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="text-2xl sm:text-3xl md:text-4xl font-display font-bold gradient-text text-center mb-6"
            >
              Congratulations
              <br />
              Nur Fadiyah Azzizah
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-10 max-w-lg mx-auto"
            >
              Merayakan kesuksesan dalam seminar proposal
              dan langkah awal dalam perjalanan akademikmu
            </motion.p>
          </motion.div>

          <AnimatePresence>
            {showInitialButton && (
              <motion.div
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                className="flex justify-center mb-8"
              >
                <motion.button
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonVariants}
                  onClick={handleStart}
                  className="px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full font-bold text-lg shadow-xl relative overflow-hidden"
                >
                  <div className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Animated shine effect */}
                  <motion.div 
                    className="absolute inset-0 w-20 h-full bg-white/10 transform -skew-x-30"
                    animate={{ 
                      x: ['-100%', '200%'],
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      repeatType: "loop", 
                      duration: 3,
                      ease: "easeInOut",
                      repeatDelay: 1
                    }}
                  />
                  
                  <div className="relative z-10 flex items-center justify-center">
                    <span>Udah Siap Liat Nya?</span>
                    <motion.svg 
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="ml-2 w-5 h-5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </motion.svg>
                  </div>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-gray-500 dark:text-gray-400 text-sm text-center mt-8"
          >
            * Tekan tombol untuk melanjutkan
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <MusicPlayerProvider>
      <RootLayoutContent 
        pageVariants={pageVariants} 
        location={location} 
      />
    </MusicPlayerProvider>
  );
}

// Separate component to access context
function RootLayoutContent({ pageVariants, location }) {
  const { isMusicPlaying, toggleMusic, isMusicAvailable } = useMusicPlayer();
  const [isReady, setIsReady] = useState(false);

  // Make sure the layout is fully ready before transitions
  useEffect(() => {
    setIsReady(true);
    
    // Ensure smooth scrolling works on iOS
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);
  
  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <div className="sticky top-0 z-50">
          <Navbar 
            isMusicPlaying={isMusicPlaying} 
            toggleMusic={toggleMusic} 
            isMusicAvailable={isMusicAvailable}
          />
        </div>
        <main className="flex-grow relative">
          {isReady && (
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                className="w-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          )}
        </main>
        <Footer 
          isMusicPlaying={isMusicPlaying} 
          toggleMusic={toggleMusic} 
          isMusicAvailable={isMusicAvailable}
        />
      </div>
    </>
  );
}