import { motion } from 'framer-motion';
import { FiAward, FiFileText, FiStar, FiBookOpen, FiUsers, FiPenTool } from 'react-icons/fi';

const achievements = [
  {
    id: 1,
    title: "Thesis Proposal Defense",
    description: "Successfully defended research proposal with commendation from the committee.",
    icon: <FiFileText size={24} />,
    iconBg: "bg-primary-100",
    iconColor: "text-primary-600",
    date: "March 2025"
  },
  {
    id: 2,
    title: "Academic Excellence Award",
    description: "Recognized for outstanding academic performance with a GPA of 3.95/4.0.",
    icon: <FiAward size={24} />,
    iconBg: "bg-secondary-100",
    iconColor: "text-secondary-600",
    date: "December 2024"
  },
  {
    id: 3,
    title: "Research Publication",
    description: "Published research paper in a renowned academic journal in the field.",
    icon: <FiBookOpen size={24} />,
    iconBg: "bg-accent-100",
    iconColor: "text-accent-600",
    date: "October 2024"
  },
  {
    id: 4,
    title: "Conference Presentation",
    description: "Presented research findings at the International Conference on Advanced Research.",
    icon: <FiUsers size={24} />,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    date: "August 2024"
  },
  {
    id: 5,
    title: "Research Grant",
    description: "Secured competitive research funding to support the thesis project.",
    icon: <FiStar size={24} />,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    date: "June 2024"
  },
  {
    id: 6,
    title: "Teaching Assistantship",
    description: "Selected to serve as a teaching assistant for undergraduate courses.",
    icon: <FiPenTool size={24} />,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    date: "January 2024"
  }
];

const AchievementCard = ({ achievement, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="card"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-4">
          <div className={`p-3 rounded-full ${achievement.iconBg} ${achievement.iconColor}`}>
            {achievement.icon}
          </div>
          <div className="ml-3">
            <h3 className="font-bold text-lg">{achievement.title}</h3>
            <p className="text-sm text-gray-500">{achievement.date}</p>
          </div>
        </div>
        
        <p className="text-gray-600 flex-grow">
          {achievement.description}
        </p>
      </div>
    </motion.div>
  );
};

const AchievementCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {achievements.map((achievement, index) => (
        <AchievementCard 
          key={achievement.id} 
          achievement={achievement}
          index={index}
        />
      ))}
    </div>
  );
};

export default AchievementCards;