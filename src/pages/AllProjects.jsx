import React, { useEffect } from 'react';
import Projects from '../components/Projects';
import { motion } from 'framer-motion';

const AllProjects = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">My Portfolio</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Here is a comprehensive list of my projects, ranging from web applications to experiments with new technologies.
        </p>
      </motion.div>
      
      {/* Reusing the Projects component without limit to show all */}
      <Projects />
    </div>
  );
};

export default AllProjects;
