import React from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';

const ResponsiveLayout = ({ 
  children, 
  className = "",
  animate = true,
  delay = 0
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: isMobile ? delay * 0.5 : delay, // Reduced delay on mobile
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className={`px-4 md:px-6 lg:px-8 mx-auto w-full ${className}`}
      initial={animate ? "hidden" : "visible"}
      whileInView={animate ? "visible" : undefined}
      viewport={{ once: true, margin: "-50px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

// Pre-defined layout variants for different sections
export const HeroLayout = ({ children, className = "" }) => (
  <ResponsiveLayout className={`max-w-7xl ${className}`}>
    {children}
  </ResponsiveLayout>
);

export const SectionLayout = ({ children, className = "", delay = 0 }) => (
  <ResponsiveLayout className={`max-w-6xl py-12 md:py-16 lg:py-20 ${className}`} delay={delay}>
    {children}
  </ResponsiveLayout>
);

export const ContentLayout = ({ children, className = "", delay = 0.1 }) => (
  <ResponsiveLayout className={`max-w-4xl ${className}`} delay={delay}>
    {children}
  </ResponsiveLayout>
);

export const CardGridLayout = ({ children, className = "", columns = 3 }) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6 ${className}`}>
    {children}
  </div>
);

export default ResponsiveLayout;