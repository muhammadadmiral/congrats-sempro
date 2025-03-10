import { motion } from 'framer-motion';
import { FiCalendar, FiBookOpen, FiEdit3, FiAward, FiUsers, FiBarChart2, FiCheckCircle, FiUser, FiBriefcase, FiMapPin, FiStar, FiHeart, FiClipboard } from 'react-icons/fi';
import { timelineEvents } from './TimelineEvent';
const TimelineComponent = () => {
  // Helper function untuk mendapatkan icon yang sesuai
  const getIcon = (iconName) => {
    switch(iconName) {
      case 'FiCheckCircle': return <FiCheckCircle />;
      case 'FiEdit3': return <FiEdit3 />;
      case 'FiAward': return <FiAward />;
      case 'FiBarChart2': return <FiBarChart2 />;
      case 'FiBookOpen': return <FiBookOpen />;
      case 'FiCalendar': return <FiCalendar />;
      case 'FiUser': return <FiUser />;
      case 'FiBriefcase': return <FiBriefcase />;
      case 'FiUsers': return <FiUsers />;
      case 'FiStar': return <FiStar />;
      case 'FiHeart': return <FiHeart />;
      case 'FiClipboard': return <FiClipboard />;
      default: return <FiCalendar />;
    }
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-4 dark:text-white" data-aos="fade-up">
          Perjalanan Akademik
        </h2>
        <p className="section-subtitle text-center dark:text-gray-300" data-aos="fade-up" data-aos-delay="100">
          Jejak langkah pendidikan dan pencapaian Nur Fadiyah Azzizah hingga saat ini
        </p>
        
        <div className="relative max-w-4xl mx-auto mt-16">
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-500 via-secondary-500 to-primary-200 rounded-full z-0"></div>
          
          {/* Timeline items */}
          <div className="relative z-10">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex mb-16 items-center ${
                  event.position === "left" 
                    ? "flex-row" 
                    : "flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className="w-5/12">
                  <div className={`${
                    event.highlight 
                      ? 'card-fancy shadow-xl dark:bg-gray-800' 
                      : event.upcoming
                        ? 'card bg-gray-50 dark:bg-gray-800/50 border border-dashed border-gray-300 dark:border-gray-700'
                        : 'card dark:bg-gray-800'
                    } hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`
                  }>
                    <div className={`absolute top-0 left-0 w-2 h-full ${
                      event.position === "left" 
                        ? 'rounded-tl-xl rounded-bl-xl'
                        : 'rounded-tr-xl rounded-br-xl'
                      } ${event.iconBg}`}
                    ></div>
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
                </div>
                
                {/* Icon */}
                <div className="w-2/12 flex justify-center">
                  <div className={`w-14 h-14 rounded-full ${event.iconBg} text-white flex items-center justify-center shadow-lg ${
                    event.highlight ? 'animate-pulse ring-4 ring-primary-200 dark:ring-primary-900' : ''
                  }`}>
                    {getIcon(event.icon)}
                  </div>
                </div>
                
                {/* Empty space for opposite side */}
                <div className="w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineComponent;