import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from '../shared/ScrollToTop';
import { MusicPlayerProvider, useMusicPlayer } from '../shared/MusicPlayerContext';

export default function RootLayout() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize AOS library
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });

    // Simulate loading for a smoother experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Variants for page transitions
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="text-4xl font-display font-bold gradient-text"
        >
          Congratulations Nur Fadiyah Azzizah
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
  
  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar 
          isMusicPlaying={isMusicPlaying} 
          toggleMusic={toggleMusic} 
          isMusicAvailable={isMusicAvailable}
        />
        <main className="flex-grow">
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