import { motion } from 'framer-motion';

// Format date to readable string
const formatDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleDateString('en-US', options);
};

const MessageCard = ({ message, index }) => {
  // Different colors for message cards
  const cardColors = [
    'bg-primary-50 border-primary-200',
    'bg-secondary-50 border-secondary-200',
    'bg-accent-50 border-accent-200',
    'bg-green-50 border-green-200',
    'bg-purple-50 border-purple-200',
  ];

  const colorClass = cardColors[index % cardColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`rounded-lg p-5 shadow-md border-l-4 ${colorClass} mb-4`}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-gray-800">{message.name}</h3>
          <p className="text-sm text-gray-600">{message.role}</p>
        </div>
        <span className="text-xs text-gray-500">
          {formatDate(message.timestamp)}
        </span>
      </div>
      
      <p className="text-gray-700 italic">"{message.message}"</p>
    </motion.div>
  );
};

const MessageWall = ({ messages }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Congratulatory Messages</h2>
      
      <div className="max-h-[600px] overflow-y-auto pr-2 messages-container">
        {messages.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No messages yet. Be the first to congratulate!
          </div>
        ) : (
          messages.map((message, index) => (
            <MessageCard key={message.id} message={message} index={index} />
          ))
        )}
      </div>
      
      {messages.length > 0 && (
        <div className="text-center mt-4 text-gray-500 text-sm">
          Showing {messages.length} message{messages.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
};

export default MessageWall;