import React from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaNetworkWired, FaRobot, FaTools } from 'react-icons/fa';

const About = () => {
  const skills = [
    { name: 'Machine Learning', icon: <FaBrain className="text-4xl text-blue-400" />, items: ['Python', 'Scikit-learn', 'XGBoost', 'Pandas'] },
    { name: 'Deep Learning', icon: <FaNetworkWired className="text-4xl text-green-500" />, items: ['PyTorch', 'TensorFlow', 'Keras', 'OpenCV'] },
    { name: 'NLP & GenAI', icon: <FaRobot className="text-4xl text-yellow-500" />, items: ['Transformers', 'LLMs', 'LangChain', 'HuggingFace'] },
    { name: 'MLOps & Tools', icon: <FaTools className="text-4xl text-pink-500" />, items: ['Docker', 'AWS SageMaker', 'Git', 'MLflow'] },
  ];

  return (
    <section id="about" className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4"><span className="text-blue-500">01.</span> About Me</h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Hello! My name is Harsh and I enjoy finding patterns in chaos. My journey into the world of data started when I analyzed my first dataset using Python — detecting hidden trends felt like uncovering a secret language.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Fast-forward to today, and I&apos;ve had the privilege of building predictive models for startups and optimizing RAG pipelines for enterprise solutions. My main focus these days is researching Efficient LLM Fine-tuning and building scalable AI agents that solve real-world problems.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              I also actively contribute to open-source AI projects and write about the latest advancements in Computer Vision and NLP.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-6">
             {skills.map((skill, index) => (
               <motion.div
                 key={skill.name}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: index * 0.1, duration: 0.5 }}
                 whileHover={{ scale: 1.05 }}
                 className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all shadow-lg group"
               >
                 <div className="mb-4 group-hover:scale-110 transition-transform duration-300">{skill.icon}</div>
                 <h3 className="text-xl font-bold text-white mb-2">{skill.name}</h3>
                 <ul className="space-y-1">
                   {skill.items.map((item) => (
                     <li key={item} className="text-gray-400 text-sm flex items-center">
                       <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                       {item}
                     </li>
                   ))}
                 </ul>
               </motion.div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
