import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FiMenu, FiX, FiHome, FiCamera, FiClock, FiMessageCircle, FiMoon, FiSun, FiMusic, FiVolumeX, FiGift, FiInfo } from 'react-icons/fi';
import { useMusicPlayer } from '../shared/MusicPlayerContext';
import gsap from 'gsap';

const Navbar = () => {
  const { isMusicPlaying, toggleMusic, isMusicAvailable } = useMusicPlayer();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notification, setNotification] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage or system preference
    if (localStorage.getItem('darkMode') !== null) {
      return localStorage.getItem('darkMode') === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  const location = useLocation();
  const isCongratsPage = location.pathname === '/congratulations';
  const navbarRef = useRef(null);
  
  // For scroll-based animations
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);

  // Close mobile menu when navigating to a new page
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apply dark mode class to HTML element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);
  
  // Show notification after page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification(true);
      
      // Hide notification after 5 seconds
      const hideTimer = setTimeout(() => {
        setNotification(false);
      }, 5000);
      
      return () => clearTimeout(hideTimer);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // GSAP animation for menu items
  useEffect(() => {
    if (isOpen) {
      const navItems = document.querySelectorAll('.mobile-nav-item');
      gsap.from(navItems, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  }, [isOpen]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const navLinks = [
    { name: 'Beranda', path: '/', icon: <FiHome className="mr-2" /> },
    { name: 'Galeri', path: '/gallery', icon: <FiCamera className="mr-2" /> },
    { name: 'Perjalanan', path: '/timeline', icon: <FiClock className="mr-2" /> },
    { name: 'Ucapan', path: '/congratulations', icon: <FiMessageCircle className="mr-2" /> },
  ];

  return (
    <header 
      ref={navbarRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? darkMode 
            ? 'bg-gray-800/90 backdrop-blur-md shadow-lg shadow-black/10' 
            : 'bg-white/90 backdrop-blur-md shadow-lg' 
          : location.pathname === '/' 
            ? 'bg-transparent' 
            : darkMode 
              ? 'bg-gray-800/70' 
              : 'bg-white/70 backdrop-blur-sm'
      }`}
    >
      {/* Animated bottom border */}
      <motion.div 
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500"
        style={{ width: scrolled ? '100%' : '0%' }}
        animate={{ width: scrolled ? '100%' : '0%' }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Notification banner */}
      <AnimatePresence>
        {notification && !isCongratsPage && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-center text-sm py-1"
          >
            <span>🎵 Background music is available! Use the music toggle to enjoy.</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <NavLink to="/" className="flex items-center group z-10">
            <motion.div 
              className="text-2xl font-display font-bold"
              style={{ scale: logoScale }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={`transition-colors duration-300 ${
                scrolled 
                  ? darkMode 
                    ? 'text-white' 
                    : 'text-primary-600' 
                  : location.pathname === '/' 
                    ? 'text-white' 
                    : darkMode 
                      ? 'text-white' 
                      : 'text-primary-600'
              }`}>
                Selamat
              </span>
              <span className="fancy-gradient-text ml-2">Sempro</span>
              
              {/* Small ribbon */}
              <motion.div 
                className="absolute -top-2 -right-2 text-xs bg-accent-500 text-white px-2 py-0.5 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 20,
                  delay: 1
                }}
              >
                2025!
              </motion.div>
            </motion.div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `
                  flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${isActive 
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md' 
                    : scrolled
                      ? darkMode
                        ? 'text-gray-300 hover:bg-gray-700/50'
                        : 'text-gray-700 hover:bg-gray-100' 
                      : location.pathname === '/'
                        ? 'text-white hover:bg-white/10'
                        : darkMode
                          ? 'text-gray-300 hover:bg-gray-700/50'
                          : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                {link.icon}
                {link.name}
                
                {/* Dot indicator for animated paths */}
                {link.path === '/congratulations' && (
                  <span className="ml-1 w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                )}
              </NavLink>
            ))}
            
            <div className="h-8 w-px bg-gray-300 dark:bg-gray-700 mx-2"></div>
            
            {/* Music Toggle Button */}
            {!isCongratsPage && isMusicAvailable && (
              <motion.button 
                onClick={toggleMusic}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-full transition-all duration-300 mr-2 relative ${
                  darkMode 
                    ? 'bg-gray-700 text-primary-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-primary-600 hover:bg-gray-200'
                }`}
                aria-label={isMusicPlaying ? "Mute Music" : "Play Music"}
              >
                {isMusicPlaying ? (
                  <>
                    <FiMusic size={18} className="animate-pulse" />
                    <motion.span 
                      className="absolute -top-1 -right-1 w-2 h-2 bg-primary-500 rounded-full"
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.5, 1]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    />
                  </>
                ) : (
                  <FiVolumeX size={18} />
                )}
              </motion.button>
            )}
            
            {/* Dark Mode Toggle */}
            <motion.button 
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-label={darkMode ? "Aktifkan Mode Terang" : "Aktifkan Mode Gelap"}
            >
              {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </motion.button>
            
            {/* Informasi Jadwal */}
            <motion.div 
              whileHover={{ y: -2 }}
              className={`text-sm font-medium px-3 py-1 rounded-full border ${
                darkMode
                  ? 'text-primary-400 border-primary-900 bg-primary-900/40'
                  : scrolled 
                    ? 'text-primary-600 border-primary-300 bg-primary-50' 
                    : location.pathname === '/'
                      ? 'text-white border-white/30 bg-white/10' 
                      : 'text-primary-600 border-primary-300 bg-primary-50'
              }`}
            >
              <span className="hidden sm:inline">Seminar Proposal:</span> Maret 2025
            </motion.div>
          </nav>

          {/* Mobile Menu Button Area */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Music Toggle (Mobile) */}
            {!isCongratsPage && isMusicAvailable && (
              <motion.button 
                onClick={toggleMusic}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-full transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-700 text-primary-300' 
                    : 'bg-gray-100 text-primary-600'
                }`}
                aria-label={isMusicPlaying ? "Mute Music" : "Play Music"}
              >
                {isMusicPlaying ? (
                  <FiMusic size={18} className="animate-pulse" />
                ) : (
                  <FiVolumeX size={18} />
                )}
              </motion.button>
            )}
            
            {/* Dark Mode Toggle (Mobile) */}
            <motion.button 
              onClick={toggleDarkMode}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-700 text-yellow-300' 
                  : 'bg-gray-100 text-gray-600'
              }`}
              aria-label={darkMode ? "Aktifkan Mode Terang" : "Aktifkan Mode Gelap"}
            >
              {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </motion.button>
            
            {/* Menu Button */}
            <motion.button
              className="flex items-center"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label={isOpen ? "Tutup menu" : "Buka menu"}
            >
              {isOpen ? (
                <FiX className={`w-6 h-6 ${
                  darkMode 
                    ? 'text-white' 
                    : scrolled 
                      ? 'text-gray-800' 
                      : location.pathname === '/' 
                        ? 'text-white' 
                        : 'text-gray-800'
                }`} />
              ) : (
                <FiMenu className={`w-6 h-6 ${
                  darkMode 
                    ? 'text-white' 
                    : scrolled 
                      ? 'text-gray-800' 
                      : location.pathname === '/' 
                        ? 'text-white' 
                        : 'text-gray-800'
                }`} />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden overflow-hidden ${
              darkMode ? 'bg-gray-800 shadow-lg shadow-black/20' : 'bg-white shadow-xl'
            }`}
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) => `
                      mobile-nav-item flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-300
                      ${isActive 
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white' 
                        : darkMode
                          ? 'text-gray-200 hover:bg-gray-700/50'
                          : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.icon}
                    {link.name}
                    
                    {link.path === '/congratulations' && (
                      <span className="ml-2 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    )}
                  </NavLink>
                ))}
                
                <div className={`h-px w-full my-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                
                {/* Additional Info Section */}
                <div className={`text-sm px-4 py-3 rounded-lg ${
                  darkMode ? 'bg-gray-700/50' : 'bg-gray-100'
                }`}>
                  <div className="flex items-center mb-2">
                    <FiInfo className={`mr-2 ${
                      darkMode ? 'text-primary-400' : 'text-primary-600'
                    }`} />
                    <span className={`font-medium ${
                      darkMode ? 'text-white' : 'text-gray-800'
                    }`}>Informasi Jadwal</span>
                  </div>
                  
                  <div className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <div className="flex justify-between items-center">
                      <span>Seminar Proposal:</span>
                      <span className={`font-semibold ${darkMode ? 'text-primary-400' : 'text-primary-600'}`}>Maret 2025</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Seminar Hasil:</span>
                      <span className={`font-semibold ${darkMode ? 'text-secondary-400' : 'text-secondary-600'}`}>Mei 2025</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Ujian Komprehensif:</span>
                      <span className={`font-semibold ${darkMode ? 'text-accent-400' : 'text-accent-600'}`}>Juli 2025</span>
                    </div>
                  </div>
                </div>
                
                {/* Social Icons */}
                <div className={`flex justify-center mt-2 pt-2 ${darkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'}`}>
                  <motion.a 
                    href="/"
                    whileHover={{ y: -3, scale: 1.1 }}
                    className={`mx-2 p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                  >
                    <FiGift className={darkMode ? 'text-primary-400' : 'text-primary-600'} />
                  </motion.a>
                  <motion.a 
                    href="/"
                    whileHover={{ y: -3, scale: 1.1 }}
                    className={`mx-2 p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                  >
                    <FiCamera className={darkMode ? 'text-secondary-400' : 'text-secondary-600'} />
                  </motion.a>
                  <motion.a 
                    href="/"
                    whileHover={{ y: -3, scale: 1.1 }}
                    className={`mx-2 p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                  >
                    <FiInfo className={darkMode ? 'text-accent-400' : 'text-accent-600'} />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;