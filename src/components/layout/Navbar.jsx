import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FiMenu, FiX, FiHome, FiCamera, FiClock, FiMessageCircle, FiMoon, FiSun, FiMusic, FiVolumeX, FiChevronRight } from 'react-icons/fi';
import { useMusicPlayer } from '../shared/MusicPlayerContext';
import { useIsMobile } from '../../hooks/useMediaQuery';

// Audio Button Components
// Audio Button Components - Optimized version
const MusicToggleButton = ({ isMusicPlaying, isMusicAvailable, toggleMusic, darkMode, isMobile }) => {
  if (!isMusicAvailable) return null;
  
  const handleToggleMusic = (e) => {
    // Prevent default browser behavior
    e.preventDefault();
    e.stopPropagation();
    
    // Delay toggling to ensure event is handled completely
    setTimeout(() => {
      if (typeof toggleMusic === 'function') {
        toggleMusic();
      }
    }, 100);
    
    return false;
  };
  
  // Mobile version
  if (isMobile) {
    return (
      <button
        type="button"
        onClick={handleToggleMusic}
        className={`p-1.5 rounded-full transition-all duration-300 ${
          darkMode 
            ? 'bg-gray-700 text-primary-300' 
            : 'bg-gray-100 text-primary-600'
        }`}
        aria-label={isMusicPlaying ? "Matikan Musik" : "Putar Musik"}
      >
        {isMusicPlaying ? (
          <>
            <FiMusic size={16} className="animate-pulse" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
          </>
        ) : (
          <FiVolumeX size={16} />
        )}
      </button>
    );
  }
  
  // Desktop version
  return (
    <button
      type="button"
      onClick={handleToggleMusic}
      className={`p-2 rounded-full transition-all duration-300 mr-2 relative ${
        darkMode 
          ? 'bg-gray-700 text-primary-300 hover:bg-gray-600' 
          : 'bg-gray-100 text-primary-600 hover:bg-gray-200'
      }`}
      aria-label={isMusicPlaying ? "Matikan Musik" : "Putar Musik"}
    >
      {isMusicPlaying ? (
        <>
          <FiMusic size={18} className="animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
        </>
      ) : (
        <FiVolumeX size={18} />
      )}
    </button>
  );
};
const Navbar = () => {
  const { isMusicPlaying, toggleMusic, isMusicAvailable } = useMusicPlayer();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
  const isMobile = useIsMobile();
  
  // For scroll-based animations
  const { scrollY } = useScroll();
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
  
  // Handle body scroll when menu is open
  useEffect(() => {
    if (isMobile) {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, isMobile]);

  // Force re-render on screen size change to fix disappearing navbar
  useEffect(() => {
    const handleResize = () => {
      // Force update to rerender navbar
      setIsOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const navLinks = [
    { name: 'Beranda', path: '/', icon: <FiHome className="mr-2" /> },
    { name: 'Galeri', path: '/gallery', icon: <FiCamera className="mr-2" /> },
    { name: 'Perjalanan', path: '/timeline', icon: <FiClock className="mr-2" /> },
    { name: 'Ucapan', path: '/congratulations', icon: <FiMessageCircle className="mr-2" /> },
  ];

  // Render a NavLink with consistent styling
  const renderNavLink = ({ name, path, icon, index }) => {
    const isActive = location.pathname === path;
    
    return (
      <NavLink
        key={path}
        to={path}
        className={({ isActive }) => `
          flex items-center px-3 md:px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
          ${isActive 
            ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md' 
            : darkMode
              ? 'text-gray-300 hover:bg-gray-700/50'
              : 'text-gray-700 hover:bg-gray-100'
          }
        `}
        onClick={() => setIsOpen(false)}
      >
        {icon}
        <span className="whitespace-nowrap">{name}</span>
        
        {/* Dot indicator for the congratulations page */}
        {path === '/congratulations' && (
          <span className="ml-1 w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
        )}
      </NavLink>
    );
  };

  return (
    <header 
      ref={navbarRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? darkMode 
            ? 'bg-gray-800/95 backdrop-blur-md shadow-lg shadow-black/10' 
            : 'bg-white/95 backdrop-blur-md shadow-lg' 
          : location.pathname === '/' 
            ? darkMode 
              ? 'bg-gray-900/30 backdrop-blur-sm' 
              : 'bg-white/30 backdrop-blur-sm' 
            : darkMode 
              ? 'bg-gray-800/80 backdrop-blur-sm' 
              : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      {/* Animated bottom border */}
      <motion.div 
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500"
        animate={{ width: scrolled ? '100%' : '0%' }}
        transition={{ duration: 0.6 }}
      />
      
      <div className="container mx-auto px-3 sm:px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <NavLink to="/" className="flex items-center group z-10">
            <motion.div 
              className="text-lg md:text-xl lg:text-2xl font-display font-bold"
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
                    ? darkMode ? 'text-white' : 'text-primary-700'
                    : darkMode 
                      ? 'text-white' 
                      : 'text-primary-600'
              }`}>
                Selamat
              </span>
              <span className="fancy-gradient-text ml-1 md:ml-2">Sempro</span>
            </motion.div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => renderNavLink({ ...link, index }))}
            
            <div className="h-8 w-px bg-gray-300 dark:bg-gray-700 mx-2"></div>
            
           {/* Music Toggle Button - Desktop */}
{(
  <MusicToggleButton 
    isMusicPlaying={isMusicPlaying}
    isMusicAvailable={true} // Force true untuk testing
    toggleMusic={toggleMusic}
    darkMode={darkMode}
    isMobile={false}
  />
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
          </nav>

          {/* Mobile Menu Controls */}
          <div className="md:hidden flex items-center space-x-2">
           {/* Music Toggle Button - Mobile */}
{!isCongratsPage && (
  <MusicToggleButton 
    isMusicPlaying={isMusicPlaying}
    isMusicAvailable={true} // Force true untuk menampilkan tombol
    toggleMusic={toggleMusic}
    darkMode={darkMode}
    isMobile={true}
  />
)}
            
            {/* Dark Mode Toggle (Mobile) */}
            <motion.button 
              onClick={toggleDarkMode}
              whileTap={{ scale: 0.9 }}
              className={`p-1.5 rounded-full transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-700 text-yellow-300' 
                  : 'bg-gray-100 text-gray-600'
              }`}
              aria-label={darkMode ? "Aktifkan Mode Terang" : "Aktifkan Mode Gelap"}
            >
              {darkMode ? <FiSun size={16} /> : <FiMoon size={16} />}
            </motion.button>
            
           {/* Menu Button */}
<motion.button
  onClick={() => setIsOpen(!isOpen)}
  whileTap={{ scale: 0.9 }}
  aria-label={isOpen ? "Tutup menu" : "Buka menu"}
  className={`p-1.5 rounded-full transition-all duration-300 ${
    darkMode 
      ? 'bg-gray-700 text-white' 
      : 'bg-gray-100 text-gray-800'
  }`}
>
  {isOpen ? (
    <FiX className="w-5 h-5" />
  ) : (
    <FiMenu className="w-5 h-5" />
  )}
</motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100vh - 56px)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden fixed left-0 right-0 top-[56px] overflow-y-auto pb-6 ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="container mx-auto px-4 py-2 md:py-4">
              <div className="flex flex-col space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <NavLink
                      to={link.path}
                      className={({ isActive }) => `
                        flex items-center justify-between px-4 py-2.5 rounded-lg text-base font-medium transition-all duration-300
                        ${isActive 
                          ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white' 
                          : darkMode
                            ? 'text-gray-200 hover:bg-gray-700/50'
                            : 'text-gray-700 hover:bg-gray-100'
                        }
                      `}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center">
                        {link.icon}
                        {link.name}
                        
                        {link.path === '/congratulations' && (
                          <span className="ml-2 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        )}
                      </div>
                      <FiChevronRight size={16} />
                    </NavLink>
                  </motion.div>
                ))}
                
                <div className={`h-px w-full my-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                
                {/* Schedule Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className={`p-3 rounded-lg ${
                    darkMode ? 'bg-gray-700/50' : 'bg-gray-100'
                  }`}
                >
                  <h3 className={`font-bold mb-2 text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Jadwal Penting
                  </h3>
                  
                  <div className="space-y-1.5">
                    <div className={`flex justify-between items-center text-xs ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      <span>Seminar Proposal:</span>
                      <span className={`font-semibold ${darkMode ? 'text-primary-400' : 'text-primary-600'}`}>
                        Maret 2025
                      </span>
                    </div>
                    <div className={`flex justify-between items-center text-xs ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      <span>Seminar Hasil:</span>
                      <span className={`font-semibold ${darkMode ? 'text-secondary-400' : 'text-secondary-600'}`}>
                        Mei 2025
                      </span>
                    </div>
                    <div className={`flex justify-between items-center text-xs ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      <span>Ujian Komprehensif:</span>
                      <span className={`font-semibold ${darkMode ? 'text-accent-400' : 'text-accent-600'}`}>
                        Juli 2025
                      </span>
                    </div>
                  </div>
                </motion.div>
                
                {/* Quick Contact */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className={`mt-2 p-3 rounded-lg text-center ${
                    darkMode ? 'bg-gray-700/50' : 'bg-gray-100'
                  }`}
                >
                  <div className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <p className="mb-2">Kirim ucapan selamat:</p>
                    <button 
                      onClick={() => {
                        setIsOpen(false);
                        window.location.href = '/congratulations';
                      }}
                      className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-1.5 rounded-full text-xs font-medium"
                    >
                      Buka Halaman Ucapan
                    </button>
                  </div>
                </motion.div>
                
                {/* Upcoming Events Section for Mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className={`mt-2 p-3 rounded-lg ${
                    darkMode ? 'bg-gray-700/50' : 'bg-gray-100'
                  }`}
                >
                  <h3 className={`font-bold mb-2 text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Acara Mendatang
                  </h3>
                  
                  <div className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'} space-y-2`}>
                    <div className="flex items-start">
                      <div className="w-2 h-2 mt-1 rounded-full bg-primary-500 mr-2"></div>
                      <div>
                        <p className="font-medium">Seminar Hasil Penelitian</p>
                        <p className="text-gray-400 dark:text-gray-500">15 Mei 2025, 09:00 WIB</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-2 h-2 mt-1 rounded-full bg-secondary-500 mr-2"></div>
                      <div>
                        <p className="font-medium">Workshop Penulisan Skripsi</p>
                        <p className="text-gray-400 dark:text-gray-500">5 April 2025, 13:00 WIB</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
              
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;