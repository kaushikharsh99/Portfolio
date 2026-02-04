import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const Preloader = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2; // Adjust speed here
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (count === 100) {
      // Add a small delay before finishing to show 100%
      const timeout = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [count, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gray-950"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <span className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
            Harsh<span className="text-blue-500">.</span>dev
          </span>
        </motion.div>

        {/* Progress Bar Container */}
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden relative">
          {/* Progress Bar Fill */}
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${count}%` }}
            transition={{ ease: "linear", duration: 0.02 }} // Match interval speed
          />
        </div>
        
        <div className="mt-2 text-right">
          <span className="text-gray-400 font-mono text-sm">{count}%</span>
        </div>
      </div>
    </motion.div>
  );
};

Preloader.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default Preloader;
