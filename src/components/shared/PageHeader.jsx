import { motion } from 'framer-motion';

const PageHeader = ({ title, subtitle, bgColor = "from-primary-600 to-secondary-600" }) => {
  return (
    <section className={`relative py-20 bg-gradient-to-r ${bgColor} text-white overflow-hidden`}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white opacity-10 -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-10 w-48 h-48 rounded-full bg-white opacity-10 translate-y-1/3"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            {title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/80"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;