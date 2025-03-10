import { useEffect } from 'react';
import { Link, useNavigate, useRouteError } from 'react-router-dom';
import { motion } from 'framer-motion';

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  useEffect(() => {
    // Log the error for debugging purposes
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-5 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden p-10"
      >
        <div className="space-y-6">
          <motion.h1 
            className="text-6xl font-display font-bold gradient-text"
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            Oops!
          </motion.h1>
          
          <p className="text-xl text-gray-700">
            Something went wrong
          </p>
          
          <div className="text-gray-500 text-sm">
            {error?.statusText || error?.message || 'An unexpected error occurred'}
          </div>
          
          <div className="pt-6 flex flex-col space-y-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary w-full"
              onClick={() => navigate(-1)}
            >
              Go Back
            </motion.button>
            
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline w-full"
              >
                Return Home
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;