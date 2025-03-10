import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../../../components/shared/PageHeader';
import MessageForm from '../../../components/congratulations/MessageForm';
import MessageWall from '../../../components/congratulations/MessageWall';
import CelebrationAnimation from '../../../components/congratulations/CelebrationAnimation';

const Congratulations = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Thesis Advisor",
      message: "Congratulations on your successful thesis proposal defense! Your hard work and dedication shine through in your research. Looking forward to seeing your final thesis.",
      timestamp: new Date('2025-03-10T10:30:00')
    },
    {
      id: 2,
      name: "Prof. David Williams",
      role: "Department Chair",
      message: "A well-deserved achievement. Your proposal demonstrated exceptional critical thinking and methodological rigor. Keep up the excellent work!",
      timestamp: new Date('2025-03-09T14:15:00')
    },
    {
      id: 3,
      name: "Dr. Lisa Chen",
      role: "Committee Member",
      message: "Your proposal defense was impressive. You handled the questions with confidence and demonstrated mastery of your research area. Congratulations!",
      timestamp: new Date('2025-03-08T09:45:00')
    }
  ]);

  const addMessage = (newMessage) => {
    setMessages([
      {
        id: messages.length + 1,
        ...newMessage,
        timestamp: new Date()
      },
      ...messages
    ]);
  };

  useEffect(() => {
    document.title = 'Congratulations - Congratulations Nur Fadiyah Azzizah';
  }, []);

  return (
    <div className="pt-16 relative">
      <PageHeader 
        title="Congratulations!"
        subtitle="Share your wishes and celebrate Nur Fadiyah Azzizah's successful thesis proposal defense"
        bgColor="from-secondary-500 to-accent-500"
      />
      
      <CelebrationAnimation />
      
      <section className="py-16 bg-gray-50 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <MessageForm onSubmit={addMessage} />
              </motion.div>
            </div>
            
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <MessageWall messages={messages} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Congratulations;