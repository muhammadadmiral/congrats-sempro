import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiX, FiCheck, FiHeart, FiStar, FiAward, FiAlertTriangle } from 'react-icons/fi';

// Custom component that handles its own layout without the parent RootLayout's navbar and footer
const Siap = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  const mainContainerRef = useRef(null);

  // Array of stickers to show in background (bigger)
  const backgroundStickers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  
  useEffect(() => {
    document.title = '✨ Siap? - Congratulations Nur Fadiyah Azzizah';
    
    // Ensure modal doesn't appear immediately
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Function to trigger heart animation
  const triggerHeartAnimation = () => {
    setShowHeartAnimation(true);
    setTimeout(() => setShowHeartAnimation(false), 1500);
  };

  const handleContinue = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    // Show second modal instead of navigating directly
    setShowSecondModal(true);
  };
  
  const handleFinalConfirm = () => {
    // Make sure the hasVisitedBefore flag is set in sessionStorage
    sessionStorage.setItem('hasVisitedBefore', 'true');
    
    // Navigate to home and replace the current entry in history
    // This ensures we don't go back to the loading screen
    navigate('/', { replace: true });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const floatingIconVariants = {
    animate: {
      y: [0, -15, 0],
      rotate: [0, 5, 0, -5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };
  
  const stickerFloatVariants = {
    initial: { 
      scale: 0,
      rotate: -10,
      opacity: 0 
    },
    animate: { 
      scale: 1,
      rotate: 0,
      opacity: 0.7,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    float: (index) => ({
      y: [0, -25, 0],
      x: [0, index % 2 === 0 ? 15 : -15, 0],
      rotate: [0, index % 2 === 0 ? 10 : -10, 0],
      transition: {
        duration: 5 + (index % 3) * 2,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut"
      }
    })
  };

  const buttonVariants = {
    idle: {
      scale: 1,
      boxShadow: "0px 0px 8px rgba(255,255,255,0.2)"
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 0px 15px rgba(255,255,255,0.4)"
    },
    tap: {
      scale: 0.95,
      boxShadow: "0px 0px 5px rgba(255,255,255,0.1)"
    },
    pulse: {
      scale: [1, 1.05, 1],
      boxShadow: ["0px 0px 8px rgba(255,255,255,0.2)", "0px 0px 15px rgba(255,255,255,0.4)", "0px 0px 8px rgba(255,255,255,0.2)"],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };
  
  const heartAnimationVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: [0, 1.2, 1],
      opacity: [0, 1, 0],
      transition: { duration: 1.5 }
    }
  };

  // Generate random positions for stickers
  const getRandomPosition = (index) => {
    const positions = [
      { top: '5%', left: '10%' },
      { top: '15%', right: '15%' },
      { top: '30%', left: '5%' },
      { bottom: '25%', right: '10%' },
      { bottom: '10%', left: '15%' },
      { top: '40%', right: '5%' },
      { bottom: '35%', left: '8%' },
      { top: '60%', right: '12%' },
      { bottom: '60%', left: '20%' },
      { top: '70%', right: '20%' },
      { bottom: '45%', right: '25%' },
      { top: '20%', left: '25%' },
      { bottom: '15%', right: '30%' },
      { top: '50%', left: '30%' },
      { bottom: '50%', right: '5%' },
    ];
    
    return positions[index % positions.length];
  };

  return (
    <div className="min-h-screen py-16 px-4 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center relative overflow-hidden">
      {/* Floating hearts animation */}
      {showHeartAnimation && (
        <motion.div 
          className="fixed inset-0 z-50 pointer-events-none"
          variants={heartAnimationVariants}
          initial="initial"
          animate="animate"
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <FiHeart className="text-red-500 w-40 h-40 md:w-60 md:h-60" />
          </div>
        </motion.div>
      )}
      
      {/* Floating background stickers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {backgroundStickers.map((sticker, index) => (
          <motion.div
            key={`sticker-${sticker}`}
            className="absolute"
            style={getRandomPosition(index)}
            variants={stickerFloatVariants}
            initial="initial"
            animate="animate"
            custom={index}
          >
            <motion.img
              src={`/stickers/jijah-${sticker}.png`}
              alt={`Sticker ${sticker}`}
              className="w-24 md:w-32 lg:w-40 h-auto object-contain"
              animate="float"
              custom={index}
              variants={stickerFloatVariants}
            />
          </motion.div>
        ))}
        
        {/* Classic floating icons as well */}
        <motion.div 
          variants={floatingIconVariants}
          animate="animate"
          className="absolute top-1/4 left-1/4 text-primary-300 opacity-20"
          style={{ fontSize: '6rem' }}
        >
          <FiAward />
        </motion.div>
        <motion.div 
          variants={floatingIconVariants}
          animate="animate"
          className="absolute top-3/4 left-1/5 text-secondary-300 opacity-20"
          style={{ fontSize: '7rem' }}
        >
          <FiStar />
        </motion.div>
        <motion.div 
          variants={floatingIconVariants}
          animate="animate"
          className="absolute top-1/3 right-1/4 text-accent-300 opacity-20"
          style={{ fontSize: '8rem' }}
        >
          <FiHeart />
        </motion.div>
      </div>

      <motion.div 
        ref={mainContainerRef}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 max-w-4xl w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 dark:from-primary-900/10 dark:to-secondary-900/10"></div>
        
        <div className="relative z-30 p-6 md:p-10">
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
          </motion.div>
          
          {/* Main seminar sticker */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center mb-8"
            onMouseEnter={triggerHeartAnimation}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <div className="relative overflow-hidden shadow-2xl rounded-2xl transform transition-all duration-300">
              {/* Shine effect overlay */}
              <motion.div 
                className="absolute inset-0 w-full h-full bg-white/30 transform -skew-x-30 z-10"
                animate={{ 
                  x: ['-100%', '200%'],
                }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "loop", 
                  duration: 2.5,
                  repeatDelay: 3
                }}
              />
              
              <img 
                src="/stickers/jijah-sempro-2.png" 
                alt="Nur Fadiyah Seminar Proposal" 
                className="h-64 sm:h-72 md:h-80 mx-auto object-contain"
              />
            </div>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl text-center font-bold mb-6 gradient-text"
          >
            Selamat yaaaaaa sempro nyaaaaaaa!
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-center text-gray-700 dark:text-gray-300 mb-8"
          >
            tapi ini bukan akhirnya baru awalan nya
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col md:flex-row gap-6 justify-center items-center mb-10"
          >
            <motion.div 
              className="w-full md:w-1/2"
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl shadow-lg text-center flex-1 relative overflow-hidden h-full">
                <div className="absolute -right-6 -bottom-6 opacity-10">
                  <img src="/stickers/jijah-2.png" alt="" className="w-32 h-32 object-contain" />
                </div>
                <h3 className="text-primary-600 dark:text-primary-400 font-bold text-xl mb-2">gatau apa apa</h3>
                <p className="text-gray-700 dark:text-gray-300">tiba tiba sempro wkwkwk</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="w-full md:w-1/2"
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl shadow-lg text-center flex-1 relative overflow-hidden h-full">
                <div className="absolute -right-6 -bottom-6 opacity-10">
                  <img src="/stickers/jijah-7.png" alt="" className="w-32 h-32 object-contain" />
                </div>
                <h3 className="text-secondary-600 dark:text-secondary-400 font-bold text-xl mb-2">Langkah Selanjutnyaaaaaaaa</h3>
                <p className="text-gray-700 dark:text-gray-300">Seminar hasil, penyusunan skripsi, dan ujian komprehensif telah menunggumu.</p>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="flex justify-center"
          >
            {animationComplete && (
              <motion.button
                initial="idle"
                whileHover="hover"
                whileTap="tap"
                animate="pulse"
                variants={buttonVariants}
                onClick={handleContinue}
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full font-bold text-lg shadow-lg flex items-center justify-center gap-2 group relative overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                
                {/* Animated shine effect */}
                <motion.div 
                  className="absolute inset-0 w-20 h-full bg-white/20 transform -skew-x-30"
                  animate={{ 
                    x: ['-100%', '200%'],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "loop", 
                    duration: 1.5,
                    repeatDelay: 1
                  }}
                />
                
                <span className="relative z-10">Lanjutkan Perjalanan</span>
                <FiArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* First Confirmation Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => !showSecondModal && setShowModal(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="text-center">
                <motion.div 
                  className="w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center overflow-hidden"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <img src="/stickers/jijah-4.png" alt="Nur Fadiyah" className="w-full h-full object-contain" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Udah Siap?</h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  jangan lupa di jelajahi 1 1, kalo ada yang ga ke load bisa coba refresh yaa
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    belummm
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleConfirm}
                    className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    sudaaaaa
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
              
              {/* Second Modal (nested inside first modal) */}
              <AnimatePresence>
                {showSecondModal && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSecondModal(false);
                    }}
                  >
                    <motion.div
                      variants={modalVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      onClick={(e) => e.stopPropagation()}
                      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-6 max-w-md w-full shadow-2xl border-2 border-primary-500/20"
                    >
                      <div className="text-center">
                        <motion.div 
                          className="w-40 h-40 mx-auto mb-4 rounded-full flex items-center justify-center overflow-hidden"
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        >
                          <img src="/stickers/jijah-10.png" alt="Nur Fadiyah" className="w-full h-full object-contain" />
                        </motion.div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Yakin udh siap?</h3>
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                          Semoga apa yang ditampilkan bisa membuat kamu senang yaa
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowSecondModal(false)}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            Paansi lu gaje
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleFinalConfirm}
                            className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                          >
                            Iye udh bawel
                            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Siap;