import { motion } from 'framer-motion';
import { FiMessageCircle, FiClock, FiUserCheck } from 'react-icons/fi';

// Format date to readable string
const formatDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleDateString('id-ID', options);
};

const MessageCard = ({ message, index }) => {
  // Different colors for message cards
  const cardColors = [
    'bg-primary-50 border-primary-200 dark:bg-primary-900/20 dark:border-primary-800',
    'bg-secondary-50 border-secondary-200 dark:bg-secondary-900/20 dark:border-secondary-800',
    'bg-accent-50 border-accent-200 dark:bg-accent-900/20 dark:border-accent-800',
    'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800',
    'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800',
  ];

  const textColors = [
    'text-primary-700 dark:text-primary-300',
    'text-secondary-700 dark:text-secondary-300',
    'text-accent-700 dark:text-accent-300',
    'text-green-700 dark:text-green-300',
    'text-purple-700 dark:text-purple-300',
  ];

  const colorIndex = index % cardColors.length;
  const cardColorClass = cardColors[colorIndex];
  const textColorClass = textColors[colorIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`rounded-lg p-5 shadow-md border-l-4 ${cardColorClass} mb-4 hover:shadow-lg transition-shadow`}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-gray-800 dark:text-white flex items-center">
            {message.name}
            <span className="inline-flex items-center ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
              <FiUserCheck className="mr-1" />
              {message.role}
            </span>
          </h3>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
          <FiClock className="mr-1" />
          {formatDate(message.timestamp)}
        </span>
      </div>
      
      <p className={`italic ${textColorClass} relative pl-6`}>
        <span className="absolute left-0 top-0 text-2xl font-serif opacity-50">"</span>
        {message.message}
        <span className="absolute text-2xl font-serif opacity-50">"</span>
      </p>
    </motion.div>
  );
};

const MessageWall = ({ messages }) => {
  return (
    <div className="card dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6 dark:text-white flex items-center">
        <FiMessageCircle className="mr-2 text-secondary-500" />
        Ucapan Selamat
      </h2>
      
      <div className="max-h-[600px] overflow-y-auto pr-2 messages-container">
        {messages.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            Belum ada ucapan. Jadilah yang pertama memberikan ucapan selamat!
          </div>
        ) : (
          messages.map((message, index) => (
            <MessageCard key={message.id} message={message} index={index} />
          ))
        )}
      </div>
      
      {messages.length > 0 && (
        <div className="text-center mt-4 text-gray-500 dark:text-gray-400 text-sm">
          Menampilkan {messages.length} ucapan
        </div>
      )}
    </div>
  );
};

export default MessageWall;