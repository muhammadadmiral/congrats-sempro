import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiHeart } from 'react-icons/fi';

const CallToAction = ({ title, description, buttonText, buttonLink }) => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-900 dark:to-secondary-900"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white opacity-10"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-white opacity-5"></div>
        
        {/* Animated floating elements */}
        <motion.div
          className="absolute top-1/4 right-1/3 w-8 h-8 bg-white/20 rounded-lg"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, 0],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-6 h-6 bg-white/20 rounded-full"
          animate={{
            y: [0, -10, 0],
            x: [0, 10, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-2/3 right-1/4 w-12 h-4 bg-white/20 rounded-lg"
          animate={{
            y: [0, -20, 0],
            rotate: [0, -5, 0],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center justify-center mb-2"
          >
            <span className="inline-flex items-center px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
              <FiHeart className="mr-2 text-red-300 animate-heartbeat" />
              <span>Bagikan Dukungan Anda</span>
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl font-display font-bold mb-6 text-white drop-shadow-text-glow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>
          
          <motion.p 
            className="text-lg text-white/90 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to={buttonLink}>
              <motion.button
                className="bg-white text-primary-600 px-8 py-3 rounded-full font-bold inline-flex items-center hover:bg-gray-100 transition-colors duration-300 shadow-lg group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{buttonText}</span>
                <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            
            <Link to="/gallery">
              <motion.button
                className="bg-transparent border-2 border-white/70 text-white px-8 py-3 rounded-full font-bold inline-flex items-center hover:bg-white/10 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Lihat Galeri
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none transform translate-y-1">
        <svg className="relative block w-full h-12 sm:h-16" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-gray-50 dark:fill-gray-900"></path>
        </svg>
      </div>
    </section>
  );
};

export default CallToAction;