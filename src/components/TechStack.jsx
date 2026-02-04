import React from 'react';
import { motion } from 'framer-motion';
import { FaPython, FaDocker, FaAws, FaGitAlt, FaLinux } from 'react-icons/fa';
import { SiPytorch, SiTensorflow, SiPandas, SiNumpy, SiScikitlearn, SiJupyter, SiHuggingface, SiOpencv, SiKeras, SiMysql, SiPostgresql } from 'react-icons/si';

const techs = [
  { icon: FaPython, color: "#3776AB" },
  { icon: SiPytorch, color: "#EE4C2C" },
  { icon: SiTensorflow, color: "#FF6F00" },
  { icon: SiScikitlearn, color: "#F7931E" },
  { icon: SiPandas, color: "#150458" },
  { icon: SiNumpy, color: "#013243" },
  { icon: SiJupyter, color: "#F37626" },
  { icon: SiHuggingface, color: "#FFD21E" },
  { icon: SiOpencv, color: "#5C3EE8" },
  { icon: SiKeras, color: "#D00000" },
  { icon: FaAws, color: "#FF9900" },
  { icon: FaDocker, color: "#2496ED" },
  { icon: SiPostgresql, color: "#4169E1" },
  { icon: SiMysql, color: "#4479A1" },
  { icon: FaLinux, color: "#FCC624" },
  { icon: FaGitAlt, color: "#F05032" },
];

const TechStack = () => {
  return (
    <div className="py-10 bg-gray-950 border-y border-gray-800 overflow-hidden relative">
      {/* Fade Gradients */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-gray-950 to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-gray-950 to-transparent z-10"></div>

      <motion.div 
        className="flex space-x-16 w-max"
        animate={{ x: [0, -1035] }} // Approximate width of half the icons
        transition={{ 
          repeat: Infinity, 
          duration: 25, 
          ease: "linear" 
        }}
      >
        {/* Duplicate list to create seamless loop */}
        {[...techs, ...techs, ...techs].map((Tech, index) => (
          <div key={index} className="flex items-center justify-center group">
            <Tech.icon 
              className="text-5xl transition-colors duration-300 group-hover:grayscale-0 filter grayscale opacity-50 group-hover:opacity-100" 
              style={{ color: Tech.color }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechStack;
