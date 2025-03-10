import { motion } from 'framer-motion';

const skills = [
  { name: "Research Methodology", level: 95 },
  { name: "Data Analysis", level: 90 },
  { name: "Academic Writing", level: 92 },
  { name: "Critical Thinking", level: 88 },
  { name: "Project Management", level: 85 },
  { name: "Statistical Analysis", level: 87 },
  { name: "Programming", level: 80 },
  { name: "Presentation Skills", level: 93 }
];

const SkillBar = ({ skill, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="mb-6"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-gray-800">{skill.name}</h3>
        <span className="text-sm font-medium text-primary-600">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="h-2.5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
        ></motion.div>
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="section-title">Academic & Research Skills</h2>
              <p className="text-gray-600 mb-8">
                A diverse set of skills honed through years of academic study and research projects, reflecting a well-rounded scholarly profile.
              </p>
              <div className="bg-gradient-to-br from-primary-500 to-secondary-600 p-6 rounded-xl text-white shadow-lg">
                <h3 className="text-xl font-bold mb-4">Research Focus Areas</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                    <span>Advanced Data Analysis Techniques</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                    <span>Innovative Research Methodologies</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                    <span>Cross-disciplinary Applications</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                    <span>Real-world Problem Solving</span>
                  </li>
                </ul>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              {skills.map((skill, index) => (
                <SkillBar key={index} skill={skill} index={index} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;