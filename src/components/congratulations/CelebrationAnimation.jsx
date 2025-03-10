import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import Lottie from 'lottie-react';

// JSON for a simple celebration animation
const celebrationAnimationData = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  nm: "Celebration",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Star",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [0], e: [100] },
            { t: 15, s: [100], e: [100] },
            { t: 45, s: [100], e: [0] },
            { t: 60, s: [0] }
          ]
        },
        r: {
          a: 1,
          k: [
            { t: 0, s: [0], e: [360] },
            { t: 60, s: [360] }
          ]
        },
        p: { a: 0, k: [100, 100] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [0, 0], e: [100, 100] },
            { t: 15, s: [100, 100], e: [100, 100] },
            { t: 45, s: [100, 100], e: [0, 0] },
            { t: 60, s: [0, 0] }
          ]
        }
      },
      shapes: [
        {
          ty: "sr",
          d: 1,
          pt: { a: 0, k: 5, ix: 3 },
          p: { a: 0, k: [0, 0], ix: 4 },
          r: { a: 0, k: 50, ix: 5 },
          ir: { a: 0, k: 20, ix: 6 },
          is: { a: 0, k: 0, ix: 8 },
          or: { a: 0, k: 40, ix: 7 },
          os: { a: 0, k: 0, ix: 9 },
          ix: 1,
          nm: "Star"
        },
        {
          ty: "fl",
          c: { a: 0, k: [1, 0.8, 0, 1] },
          o: { a: 0, k: 100 },
          r: 1,
          nm: "Fill"
        }
      ]
    }
  ]
};

const CelebrationAnimation = () => {
  const [showLottie, setShowLottie] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    // Check for dark mode
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
    
    // Create confetti effect on mount
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      
      const particleCount = 50 * (timeLeft / duration);
      
      // Colors that work well in both light and dark mode
      const colors = ['#0ea5e9', '#d946ef', '#f97316', '#22c55e', '#8b5cf6'];
      
      // Launch confetti from random positions
      confetti({
        particleCount,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: colors,
        gravity: 0.8,
        spread: 70,
        ticks: 300,
        shapes: ['square', 'circle'],
        scalar: Math.random() * 0.8 + 0.2
      });
    }, 250);
    
    // Hide Lottie animation after a delay
    const timer = setTimeout(() => {
      setShowLottie(false);
    }, 6000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);
  
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Floating elements */}
      <div className="fixed inset-0">
        {/* Floating stars */}
        {Array.from({ length: 10 }, (_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              scale: 0,
              opacity: 0
            }}
            animate={{ 
              y: [null, Math.random() * -500 - 100],
              scale: [0, Math.random() * 0.8 + 0.2],
              opacity: [0, 1, 0],
              rotate: Math.random() * 360
            }}
            transition={{ 
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "loop",
              delay: Math.random() * 5
            }}
            className={`absolute text-4xl ${isDarkMode ? 'text-yellow-300' : 'text-yellow-400'}`}
          >
            ★
          </motion.div>
        ))}
        
        {/* Floating confetti pieces */}
        {Array.from({ length: 15 }, (_, i) => {
          const colors = ['text-primary-500', 'text-secondary-500', 'text-accent-500', 'text-purple-500', 'text-emerald-500'];
          const shapes = ['■', '●', '▲', '◆', '✦'];
          const size = Math.random() * 24 + 12;
          
          return (
            <motion.div
              key={`confetti-${i}`}
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: -50,
                scale: 0,
                opacity: 0
              }}
              animate={{ 
                y: window.innerHeight + 100,
                scale: [0, 1],
                opacity: [0, 0.7, 0],
                rotate: Math.random() * 360 * (Math.random() > 0.5 ? 1 : -1)
              }}
              transition={{ 
                duration: Math.random() * 8 + 4,
                repeat: Infinity,
                repeatType: "loop",
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
              className={`absolute ${colors[i % colors.length]} select-none`}
              style={{ fontSize: `${size}px` }}
            >
              {shapes[i % shapes.length]}
            </motion.div>
          )
        })}
      </div>
      
      {/* Center celebration animation */}
      {showLottie && (
        <div className="fixed inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.5 }}
            className="w-64 h-64"
          >
            <Lottie
              animationData={celebrationAnimationData}
              loop={true}
              autoplay={true}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CelebrationAnimation;