import { FiHeart, FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-display font-bold mb-4 gradient-text">Sempro Success</h3>
            <p className="text-gray-300 mb-4">
              Celebrating academic milestones and achievements of Nur Fadiyah Azzizah.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="#" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: "#4299E1" }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiGithub size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: "#0077B5" }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiLinkedin size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: "#E1306C" }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiInstagram size={20} />
              </motion.a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="/achievements" className="text-gray-400 hover:text-white transition-colors">Achievements</a>
              </li>
              <li>
                <a href="/gallery" className="text-gray-400 hover:text-white transition-colors">Gallery</a>
              </li>
              <li>
                <a href="/timeline" className="text-gray-400 hover:text-white transition-colors">Timeline</a>
              </li>
              <li>
                <a href="/congratulations" className="text-gray-400 hover:text-white transition-colors">Congratulations</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 mb-2">Feel free to reach out for future collaborations.</p>
            <a href="mailto:info@example.com" className="text-primary-400 hover:text-primary-300 transition-colors">
              info@example.com
            </a>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
          <p className="flex items-center justify-center">
            Made with 
            <motion.span 
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatType: "loop"
              }}
              className="mx-1 text-red-500"
            >
              <FiHeart />
            </motion.span> 
            for Nur Fadiyah Azzizah &copy; {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;