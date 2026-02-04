import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaArrowRight } from 'react-icons/fa';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 relative overflow-hidden">
      {/* Overlay pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      
      <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-white mb-6"
        >
          Ready to start your next project?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto"
        >
          I&apos;m currently available for freelance work and full-time positions. Let&apos;s build something amazing together.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <a 
            href="#contact" 
            className="bg-white text-blue-600 font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            Hire Me <FaArrowRight />
          </a>
          <a 
            href="#" 
            className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
          >
            Download CV <FaDownload />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
