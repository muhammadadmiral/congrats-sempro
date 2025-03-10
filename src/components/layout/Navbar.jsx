import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiHome, FiAward, FiCamera, FiClock, FiMessageCircle, FiMoon, FiSun } from 'react-icons/fi';

const Navbar = () => {
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const navLinks = [
    { name: 'Beranda', path: '/', icon: <FiHome className="mr-2" /> },
    { name: 'Prestasi', path: '/achievements', icon: <FiAward className="mr-2" /> },
    { name: 'Galeri', path: '/gallery', icon: <FiCamera className="mr-2" /> },
    { name: 'Perjalanan', path: '/timeline', icon: <FiClock className="mr-2" /> },
    { name: 'Ucapan', path: '/congratulations', icon: <FiMessageCircle className="mr-2" /> },
  ];

  return (
    <header 
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
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <NavLink to="/" className="flex items-center group">
            <motion.div 
              className="text-2xl font-display font-bold"
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
            </motion.div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
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
              </NavLink>
            ))}
            
            <div className="h-8 w-px bg-gray-300 dark:bg-gray-700 mx-2"></div>
            
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors duration-300 ${
                darkMode 
                  ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-label={darkMode ? "Aktifkan Mode Terang" : "Aktifkan Mode Gelap"}
            >
              {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            
            {/* Informasi Jadwal */}
            <div className={`text-sm font-medium px-3 py-1 rounded-full border ${
              darkMode
                ? 'text-primary-400 border-primary-900 bg-primary-900/40'
                : scrolled 
                  ? 'text-primary-600 border-primary-300 bg-primary-50' 
                  : location.pathname === '/'
                    ? 'text-white border-white/30 bg-white/10' 
                    : 'text-primary-600 border-primary-300 bg-primary-50'
            }`}>
              <span className="hidden sm:inline">Seminar Proposal:</span> Maret 2025
            </div>
          </nav>

          {/* Mobile Menu Button Area */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Dark Mode Toggle (Mobile) */}
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors duration-300 ${
                darkMode 
                  ? 'bg-gray-700 text-yellow-300' 
                  : 'bg-gray-100 text-gray-600'
              }`}
              aria-label={darkMode ? "Aktifkan Mode Terang" : "Aktifkan Mode Gelap"}
            >
              {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            
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
                      flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-300
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
                  </NavLink>
                ))}
                
                <div className={`h-px w-full my-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                
                <div className={`text-sm px-4 py-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div className="flex justify-between items-center">
                    <span>Seminar Proposal:</span>
                    <span className={`font-semibold ${darkMode ? 'text-primary-400' : 'text-primary-600'}`}>Maret 2025</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span>Seminar Hasil:</span>
                    <span className={`font-semibold ${darkMode ? 'text-secondary-400' : 'text-secondary-600'}`}>Mei 2025</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span>Ujian Komprehensif:</span>
                    <span className={`font-semibold ${darkMode ? 'text-accent-400' : 'text-accent-600'}`}>Juli 2025</span>
                  </div>
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