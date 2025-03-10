import { motion } from 'framer-motion';
import { FiAward, FiBook, FiTarget, FiUsers } from 'react-icons/fi';

const FeatureCard = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="card p-6"
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 p-3 rounded-full bg-primary-100 text-primary-600">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

const FeatureCards = () => {
  const features = [
    {
      icon: <FiBook size={24} />,
      title: "Innovative Research",
      description: "Developing groundbreaking ideas that push the boundaries of academic knowledge in the field.",
      delay: 0
    },
    {
      icon: <FiAward size={24} />,
      title: "Academic Excellence",
      description: "Consistently demonstrating outstanding performance throughout her academic journey.",
      delay: 0.1
    },
    {
      icon: <FiTarget size={24} />,
      title: "Clear Methodology",
      description: "Comprehensive approach with well-defined research methods and analytical frameworks.",
      delay: 0.2
    },
    {
      icon: <FiUsers size={24} />,
      title: "Impactful Contribution",
      description: "Research that addresses real-world problems with practical applications and solutions.",
      delay: 0.3
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          delay={feature.delay}
        />
      ))}
    </div>
  );
};

export default FeatureCards;