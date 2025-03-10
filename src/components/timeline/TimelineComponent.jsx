import { motion } from 'framer-motion';
import { FiCalendar, FiBookOpen, FiEdit3, FiAward, FiUsers, FiBarChart2, FiCheckCircle } from 'react-icons/fi';

const timelineEvents = [
  {
    id: 1,
    date: "March 2025",
    title: "Thesis Proposal Defense",
    description: "Successfully presented and defended the thesis proposal to the academic committee.",
    icon: <FiCheckCircle />,
    iconBg: "bg-primary-500",
    position: "right"
  },
  {
    id: 2,
    date: "January 2025",
    title: "Research Methodology Finalization",
    description: "Completed the comprehensive research methodology framework for the thesis.",
    icon: <FiEdit3 />,
    iconBg: "bg-secondary-500",
    position: "left"
  },
  {
    id: 3,
    date: "November 2024",
    title: "Preliminary Data Collection",
    description: "Began the process of collecting primary research data for analysis.",
    icon: <FiBarChart2 />,
    iconBg: "bg-accent-500",
    position: "right"
  },
  {
    id: 4,
    date: "September 2024",
    title: "Research Grant Approval",
    description: "Secured funding to support the thesis research project.",
    icon: <FiAward />,
    iconBg: "bg-green-500",
    position: "left"
  },
  {
    id: 5,
    date: "July 2024",
    title: "International Conference",
    description: "Presented research at the International Academic Conference.",
    icon: <FiUsers />,
    iconBg: "bg-purple-500",
    position: "right"
  },
  {
    id: 6,
    date: "May 2024",
    title: "Literature Review Completion",
    description: "Finished comprehensive review of existing literature in the field.",
    icon: <FiBookOpen />,
    iconBg: "bg-blue-500",
    position: "left"
  },
  {
    id: 7,
    date: "January 2024",
    title: "Research Topic Selection",
    description: "Identified and finalized the thesis research topic with advisors.",
    icon: <FiCalendar />,
    iconBg: "bg-yellow-500",
    position: "right"
  }
];

const TimelineComponent = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-12" data-aos="fade-up">
          Academic and Research Timeline
        </h2>
        
        <div className="relative max-w-3xl mx-auto">
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 z-0"></div>
          
          {/* Timeline items */}
          <div className="relative z-10">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex mb-12 items-center ${
                  event.position === "left" 
                    ? "flex-row" 
                    : "flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className="w-5/12">
                  <div className="card hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                    <div className={`absolute top-0 left-0 w-2 h-full ${
                      event.position === "left" 
                        ? `rounded-tl-xl rounded-bl-xl`
                        : `rounded-tr-xl rounded-br-xl`
                      } ${event.iconBg.replace('bg-', 'bg-')}`}
                    ></div>
                    <div className="p-6">
                      <span className="inline-block text-xs font-semibold text-gray-500 mb-2">
                        {event.date}
                      </span>
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <p className="text-gray-600">{event.description}</p>
                    </div>
                  </div>
                </div>
                
                {/* Icon */}
                <div className="w-2/12 flex justify-center">
                  <div className={`w-12 h-12 rounded-full ${event.iconBg} text-white flex items-center justify-center shadow-lg`}>
                    {event.icon}
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