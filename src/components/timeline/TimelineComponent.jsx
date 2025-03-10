import { motion } from 'framer-motion';
import { FiCalendar, FiBookOpen, FiEdit3, FiAward, FiUsers, FiBarChart2, FiCheckCircle, FiUser, FiBriefcase, FiMapPin, FiStar, FiHeart, FiClipboard } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { timelineEvents } from './TimelineEvent';

const TimelineComponent = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Helper function untuk mendapatkan icon yang sesuai
  const getIcon = (iconName) => {
    switch(iconName) {
      case 'FiCheckCircle': return <FiCheckCircle className={isMobile ? 'text-lg' : 'text-xl'} />;
      case 'FiEdit3': return <FiEdit3 className={isMobile ? 'text-lg' : 'text-xl'} />;
      case 'FiAward': return <FiAward className={isMobile ? 'text-lg' : 'text-xl'} />;
      case 'FiBarChart2': return <FiBarChart2 className={isMobile ? 'text-lg' : 'text-xl'} />;
      case 'FiBookOpen': return <FiBookOpen className={isMobile ? 'text-lg' : 'text-xl'} />;
      case 'FiCalendar': return <FiCalendar className={isMobile ? 'text-lg' : 'text-xl'} />;
      case 'FiUser': return <FiUser className={isMobile ? 'text-lg' : 'text-xl'} />;
      case 'FiBriefcase': return <FiBriefcase className={isMobile ? 'text-lg' : 'text-xl'} />;
      case 'FiUsers': return <FiUsers className={isMobile ? 'text-lg' : 'text-xl'} />;
      case 'FiStar': return <FiStar className={isMobile ? 'text-lg' : 'text-xl'} />;
      case 'FiHeart': return <FiHeart className={isMobile ? 'text-lg' : 'text-xl'} />;
      case 'FiClipboard': return <FiClipboard className={isMobile ? 'text-lg' : 'text-xl'} />;
      default: return <FiCalendar className={isMobile ? 'text-lg' : 'text-xl'} />;
    }
  };

  // Function to truncate text for mobile devices
  const truncateText = (text, maxLength = 100) => {
    if (!isMobile) return text;
    
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <section className="py-12 md:py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-3 md:mb-4 dark:text-white text-2xl md:text-3xl" data-aos="fade-up">
          Perjalanan Akademik
        </h2>
        <p className="section-subtitle text-center dark:text-gray-300 text-sm md:text-base px-4" data-aos="fade-up" data-aos-delay="100">
          Jejak langkah pendidikan dan pencapaian Nur Fadiyah Azzizah hingga saat ini
        </p>
        
        <div className="relative max-w-4xl mx-auto mt-8 md:mt-16">
          {/* Center line - hidden on mobile, visible on desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-500 via-secondary-500 to-primary-200 rounded-full z-0"></div>
          
          {/* Mobile center line - visible only on mobile */}
          <div className="md:hidden absolute left-6 top-0 h-full w-1 bg-gradient-to-b from-primary-500 via-secondary-500 to-primary-200 rounded-full z-0"></div>
          
          {/* Timeline items */}
          <div className="relative z-10">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex mb-8 md:mb-16 items-start md:items-center ${
                  isMobile 
                    ? "flex-row" 
                    : event.position === "left" 
                      ? "flex-row" 
                      : "flex-row-reverse"
                }`}
              >
                {/* Icon - Mobile Layout */}
                {isMobile && (
                  <div className="mr-4">
                    <div className={`w-10 h-10 rounded-full ${event.iconBg} text-white flex items-center justify-center shadow-md ${
                      event.highlight ? 'animate-pulse ring-2 ring-primary-200 dark:ring-primary-900' : ''
                    }`}>
                      {getIcon(event.icon)}
                    </div>
                  </div>
                )}
                
                {/* Content - Mobile Layout */}
                {isMobile && (
                  <div className="flex-1">
                    <div className={`${
                      event.highlight 
                        ? 'border-l-4 border-primary-500' 
                        : event.upcoming
                          ? 'border-l-4 border-gray-300 border-dashed'
                          : 'border-l-4 border-secondary-500'
                      } pl-4 hover:shadow-md transform hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-gray-800 rounded-r-lg mb-4 pb-2`
                    }>
                      <span className={`inline-block text-xs font-semibold mb-1 px-2 py-0.5 rounded-full ${
                        event.upcoming 
                          ? 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400' 
                          : 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300'
                      }`}>
                        {event.date}
                      </span>
                      <h3 className={`text-lg font-bold mb-1 ${event.highlight ? 'gradient-text' : 'dark:text-white'}`}>
                        {event.title}
                      </h3>
                      <div className={`text-sm text-gray-600 dark:text-gray-300 ${event.upcoming ? 'italic' : ''}`}>
                        {truncateText(event.description)}
                        {event.description.length > 100 && isMobile && (
                          <button 
                            className="ml-1 text-primary-500 font-medium hover:underline text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              alert(event.description);
                            }}
                          >
                            Baca Selengkapnya
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Desktop Layout */}
                {!isMobile && (
                  <>
                    {/* Content - Left side */}
                    <div className="w-5/12">
                      {event.position === "left" && (
                        <div className={`${
                          event.highlight 
                            ? 'card-fancy shadow-xl dark:bg-gray-800' 
                            : event.upcoming
                              ? 'card bg-gray-50 dark:bg-gray-800/50 border border-dashed border-gray-300 dark:border-gray-700'
                              : 'card dark:bg-gray-800'
                          } hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`
                        }>
                          <div className={`absolute top-0 left-0 w-2 h-full rounded-tl-xl rounded-bl-xl ${event.iconBg}`}></div>
                          <div className="p-6">
                            <span className={`inline-block text-xs font-semibold mb-2 px-3 py-1 rounded-full ${
                              event.upcoming 
                                ? 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400' 
                                : 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300'
                            }`}>
                              {event.date}
                            </span>
                            <h3 className={`text-xl font-bold mb-2 ${event.highlight ? 'gradient-text' : 'dark:text-white'}`}>
                              {event.title}
                            </h3>
                            <p className={`text-gray-600 dark:text-gray-300 ${event.upcoming ? 'italic' : ''}`}>
                              {event.description}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Icon */}
                    <div className="w-2/12 flex justify-center">
                      <div className={`w-14 h-14 rounded-full ${event.iconBg} text-white flex items-center justify-center shadow-lg ${
                        event.highlight ? 'animate-pulse ring-4 ring-primary-200 dark:ring-primary-900' : ''
                      }`}>
                        {getIcon(event.icon)}
                      </div>
                    </div>
                    
                    {/* Content - Right side */}
                    <div className="w-5/12">
                      {event.position === "right" && (
                        <div className={`${
                          event.highlight 
                            ? 'card-fancy shadow-xl dark:bg-gray-800' 
                            : event.upcoming
                              ? 'card bg-gray-50 dark:bg-gray-800/50 border border-dashed border-gray-300 dark:border-gray-700'
                              : 'card dark:bg-gray-800'
                          } hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`
                        }>
                          <div className={`absolute top-0 right-0 w-2 h-full rounded-tr-xl rounded-br-xl ${event.iconBg}`}></div>
                          <div className="p-6">
                            <span className={`inline-block text-xs font-semibold mb-2 px-3 py-1 rounded-full ${
                              event.upcoming 
                                ? 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400' 
                                : 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300'
                            }`}>
                              {event.date}
                            </span>
                            <h3 className={`text-xl font-bold mb-2 ${event.highlight ? 'gradient-text' : 'dark:text-white'}`}>
                              {event.title}
                            </h3>
                            <p className={`text-gray-600 dark:text-gray-300 ${event.upcoming ? 'italic' : ''}`}>
                              {event.description}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineComponent;