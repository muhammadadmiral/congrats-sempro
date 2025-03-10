import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';

const stats = [
  { id: 1, number: 3.95, label: "GPA", suffix: "/4.0" },
  { id: 2, number: 5, label: "Publications", suffix: "" },
  { id: 3, number: 8, label: "Conferences", suffix: "" },
  { id: 4, number: 2, label: "Research Grants", suffix: "" }
];

const StatItem = ({ stat, inView }) => {
  const counterRef = useRef(null);
  
  useEffect(() => {
    if (inView) {
      gsap.fromTo(
        counterRef.current,
        { innerText: 0 },
        {
          innerText: stat.number,
          duration: 1.5,
          snap: { innerText: 0.01 }, // for decimal precision
          ease: "power2.out",
        }
      );
    }
  }, [inView, stat.number]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center p-6"
    >
      <div className="flex justify-center items-baseline">
        <span
          ref={counterRef}
          className="text-4xl md:text-5xl font-bold text-primary-600"
        >
          0
        </span>
        <span className="text-2xl md:text-3xl font-bold text-primary-600">
          {stat.suffix}
        </span>
      </div>
      <p className="text-gray-600 mt-2 text-lg">{stat.label}</p>
    </motion.div>
  );
};

const AchievementStats = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: false, amount: 0.3 });

  return (
    <section className="py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto text-center mb-12">
          <h2 className="section-title">Academic Performance</h2>
          <p className="text-gray-600">
            Numbers that highlight Nur Fadiyah Azzizah's academic journey and research contributions
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat) => (
              <StatItem key={stat.id} stat={stat} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementStats;