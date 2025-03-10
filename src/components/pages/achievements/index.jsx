import { useEffect } from 'react';
import { motion } from 'framer-motion';
import AchievementCards from '../../achievements/AchievementsCards';
import SkillsSection from '../../achievements/SkillsSections';
import PageHeader from '../../../components/shared/PageHeader';
import AchievementStats from '../../achievements/AchievementsStats';

const Achievements = () => {
  useEffect(() => {
    document.title = 'Achievements - Congratulations Nur Fadiyah Azzizah';
  }, []);

  return (
    <div className="pt-16">
      <PageHeader 
        title="Academic Achievements"
        subtitle="Celebrating the academic journey and milestones of Nur Fadiyah Azzizah"
        bgColor="from-primary-500 to-secondary-500"
      />
      
      {/* Stats Section */}
      <AchievementStats />
      
      {/* Main Achievements */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="section-title">Key Milestones</h2>
            <p className="text-gray-600">
              From coursework excellence to research breakthroughs, these achievements represent years of dedication and hard work.
            </p>
          </motion.div>
          
          <AchievementCards />
        </div>
      </section>
      
      {/* Skills Section */}
      <SkillsSection />
    </div>
  );
};

export default Achievements;