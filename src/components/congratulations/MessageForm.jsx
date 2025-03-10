import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiUser, FiBriefcase, FiMessageSquare, FiHeart } from 'react-icons/fi';
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
    <div className="card dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6 dark:text-white flex items-center">
        <FiHeart className="mr-2 text-red-500 animate-pulse" />
        Kirim Ucapan
      </h2>
      
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg"
        >
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            <span>Pesan Anda telah ditambahkan! Terima kasih atas ucapannya.</span>
          </div>
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit(submitMessage)}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            <div className="flex items-center">
              <FiUser className="mr-2" />
              Nama Anda
            </div>
          </label>
          <input
            type="text"
            id="name"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-400 ${
              errors.name ? 'border-red-500 dark:border-red-700' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Masukkan nama Anda"
            {...register('name', { required: true })}
          />
          {errors.name && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1">Nama harus diisi</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            <div className="flex items-center">
              <FiBriefcase className="mr-2" />
              Hubungan / Peran Anda
            </div>
          </label>
          <input
            type="text"
            id="role"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-400 ${
              errors.role ? 'border-red-500 dark:border-red-700' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="contoh: Teman, Dosen, Keluarga"
            {...register('role', { required: true })}
          />
          {errors.role && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1">Hubungan/peran harus diisi</p>
          )}
        </div>
        
        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            <div className="flex items-center">
              <FiMessageSquare className="mr-2" />
              Pesan Ucapan
            </div>
          </label>
          <textarea
            id="message"
            rows="4"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-400 ${
              errors.message ? 'border-red-500 dark:border-red-700' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Tulis ucapan selamat Anda di sini..."
            {...register('message', { required: true, minLength: 10 })}
          ></textarea>
          {errors.message && errors.message.type === 'required' && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1">Pesan ucapan harus diisi</p>
          )}
          {errors.message && errors.message.type === 'minLength' && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1">Pesan minimal 10 karakter</p>
          )}
        </div>
        
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          } shadow-md hover:shadow-lg transition-all duration-300`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="mr-2">Mengirim...</span>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </>
          ) : (
            <>
              <span>Kirim Ucapan</span>
              <FiSend className="ml-2" />
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default MessageForm;