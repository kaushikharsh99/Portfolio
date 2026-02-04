import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Hero = () => {
  return (
    <div id="home" className="relative bg-gray-950 h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-blue-500 font-mono text-xl mb-4">Hi, my name is</h2>
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-6 tracking-tight">
            Harsh<span className="text-blue-500">.</span>
          </h1>
          
          <div className="text-2xl md:text-5xl font-bold text-gray-400 mb-8 h-[60px] md:h-[80px]">
            I build{' '}
            <TypeAnimation
              sequence={[
                'predictive models.',
                1000,
                'intelligent agents.',
                1000,
                'data pipelines.',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-blue-400"
            />
          </div>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            I&apos;m a Data Scientist specializing in building intelligent systems. Currently, I&apos;m focused on researching Large Language Models and their applications in specialized domains.
          </p>

          <motion.div 
            className="flex justify-center gap-6 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {[
              { Icon: FaGithub, name: 'github' },
              { Icon: FaLinkedin, name: 'linkedin' },
              { Icon: FaTwitter, name: 'twitter' }
            ].map(({ Icon, name }) => (
              <motion.a
                key={name}
                href="#"
                whileHover={{ scale: 1.2, color: '#60A5FA' }}
                className="text-gray-400 text-3xl transition-colors"
              >
                <Icon />
              </motion.a>
            ))}
          </motion.div>

          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500/10 font-mono py-4 px-10 rounded text-lg transition-all duration-300"
          >
            Check out my work!
          </motion.a>
        </motion.div>
      </div>
      
      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-1">
          <div className="w-1 h-3 bg-blue-500 rounded-full"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
