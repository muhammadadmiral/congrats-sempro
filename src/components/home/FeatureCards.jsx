import { motion } from 'framer-motion';
import { FiAward, FiBook, FiTarget, FiUsers, FiThumbsUp, FiClipboard, FiLayers, FiCpu } from 'react-icons/fi';

const FeatureCard = ({ icon, title, description, delay, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={`card dark:bg-gray-800 dark:border-gray-700 overflow-visible group`}
    >
      <div className="flex flex-col items-center text-center">
        <div className={`mb-4 p-4 rounded-full ${color} text-white transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

const FeatureCards = () => {
  const features = [
    {
      icon: <FiBook size={28} />,
      title: "Penelitian Inovatif",
      description: "Mengembangkan ide-ide yang mendorong batas pengetahuan akademik di bidang kimia lingkungan.",
      delay: 0,
      color: "bg-gradient-to-br from-primary-500 to-primary-600"
    },
    {
      icon: <FiAward size={28} />,
      title: "Keunggulan Akademik",
      description: "Konsisten menunjukkan performa luar biasa sepanjang perjalanan akademik dengan IPK 3.95.",
      delay: 0.1,
      color: "bg-gradient-to-br from-secondary-500 to-secondary-600"
    },
    {
      icon: <FiTarget size={28} />,
      title: "Metodologi Jelas",
      description: "Pendekatan komprehensif dengan metode penelitian dan kerangka analitis yang terdefinisi dengan baik.",
      delay: 0.2,
      color: "bg-gradient-to-br from-accent-500 to-accent-600"
    },
    {
      icon: <FiUsers size={28} />,
      title: "Kontribusi Berdampak",
      description: "Penelitian yang menangani masalah dunia nyata dengan aplikasi dan solusi praktis untuk lingkungan.",
      delay: 0.3,
      color: "bg-gradient-to-br from-green-500 to-green-600"
    },
    {
      icon: <FiClipboard size={28} />,
      title: "Pengalaman Magang",
      description: "Magang di Badan Riset dan Inovasi Nasional (BRIN) memperkaya pemahaman riset terapan.",
      delay: 0.4,
      color: "bg-gradient-to-br from-purple-500 to-purple-600"
    },
    {
      icon: <FiThumbsUp size={28} />,
      title: "Presentasi Meyakinkan",
      description: "Kemampuan komunikasi yang kuat dalam menyampaikan konsep ilmiah yang kompleks kepada berbagai audiens.",
      delay: 0.5,
      color: "bg-gradient-to-br from-yellow-500 to-yellow-600"
    },
    {
      icon: <FiLayers size={28} />,
      title: "Keterampilan Analitis",
      description: "Kemampuan menganalisis data kompleks dan menghasilkan kesimpulan yang bermakna dari hasil penelitian.",
      delay: 0.6,
      color: "bg-gradient-to-br from-blue-500 to-blue-600"
    },
    {
      icon: <FiCpu size={28} />,
      title: "Penguasaan Instrumentasi",
      description: "Kemahiran mengoperasikan instrumen analitis canggih seperti Spektrofotometer UV-Visible untuk analisis kuantitatif.",
      delay: 0.7,
      color: "bg-gradient-to-br from-indigo-500 to-indigo-600"
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
          color={feature.color}
        />
      ))}
    </div>
  );
};

export default FeatureCards;