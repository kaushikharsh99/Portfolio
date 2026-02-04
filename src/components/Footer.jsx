import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 py-8 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
        <div className="flex space-x-8 mb-6">
            {[FaGithub, FaLinkedin, FaTwitter].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{ y: -5, color: '#60A5FA' }}
                className="text-2xl transition-colors"
              >
                <Icon />
              </motion.a>
            ))}
        </div>
        <p className="text-sm font-mono flex items-center gap-2">
          Designed & Built by Harsh <FaHeart className="text-red-500 animate-pulse" />
        </p>
      </div>
    </footer>
  );
};

export default Footer;