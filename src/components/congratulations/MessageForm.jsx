import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiUser, FiBriefcase, FiMessageSquare } from 'react-icons/fi';
import { useForm } from 'react-hook-form';

const MessageForm = ({ onSubmit }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const submitMessage = (data) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit(data);
      setIsSubmitting(false);
      setShowSuccess(true);
      reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }, 1000);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Share Your Wishes</h2>
      
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg"
        >
          Your message has been added! Thank you for your wishes.
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit(submitMessage)}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            <div className="flex items-center">
              <FiUser className="mr-2" />
              Your Name
            </div>
          </label>
          <input
            type="text"
            id="name"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your name"
            {...register('name', { required: true })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">Name is required</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700 font-medium mb-2">
            <div className="flex items-center">
              <FiBriefcase className="mr-2" />
              Your Role / Relationship
            </div>
          </label>
          <input
            type="text"
            id="role"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.role ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., Friend, Colleague, Professor"
            {...register('role', { required: true })}
          />
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">Role is required</p>
          )}
        </div>
        
        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
            <div className="flex items-center">
              <FiMessageSquare className="mr-2" />
              Your Message
            </div>
          </label>
          <textarea
            id="message"
            rows="4"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Write your congratulatory message..."
            {...register('message', { required: true, minLength: 10 })}
          ></textarea>
          {errors.message && errors.message.type === 'required' && (
            <p className="text-red-500 text-sm mt-1">Message is required</p>
          )}
          {errors.message && errors.message.type === 'minLength' && (
            <p className="text-red-500 text-sm mt-1">Message should be at least 10 characters</p>
          )}
        </div>
        
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="mr-2">Sending...</span>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </>
          ) : (
            <>
              <span>Send Wishes</span>
              <FiSend className="ml-2" />
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default MessageForm;