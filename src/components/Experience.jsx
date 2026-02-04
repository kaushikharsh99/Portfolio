import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';

const experiences = [
  {
    title: "Senior Data Scientist",
    company: "Innovate AI Labs",
    date: "2023 - Present",
    description: "Leading the generative AI initiative. Fine-tuned Llama-3 for domain-specific tasks and optimized RAG pipelines, reducing hallucination rates by 30%.",
    type: "work"
  },
  {
    title: "Machine Learning Engineer",
    company: "DataDriven Corp",
    date: "2021 - 2023",
    description: "Designed end-to-end ML pipelines using AWS SageMaker. Deployed XGBoost models for churn prediction, handling 1M+ daily requests with <50ms latency.",
    type: "work"
  },
  {
    title: "Data Analyst",
    company: "FinTech Solutions",
    date: "2019 - 2021",
    description: "Analyzed complex financial datasets using Python & SQL. Built interactive Tableau dashboards that helped stakeholders identify key revenue drivers.",
    type: "work"
  },
  {
    title: "M.S. Artificial Intelligence",
    company: "Tech University",
    date: "2017 - 2019",
    description: "Specialized in Deep Learning and Natural Language Processing. Thesis on 'Efficient Transformer Architectures for Edge Devices'.",
    type: "education"
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-gray-900/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4"><span className="text-blue-500">03.</span> Experience</h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-800"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Spacer for desktop layout */}
                <div className="hidden md:block w-1/2" />

                {/* Icon */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gray-900 border-4 border-blue-500 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  {exp.type === 'work' ? <FaBriefcase className="text-blue-400 text-lg" /> : <FaGraduationCap className="text-green-400 text-xl" />}
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                  <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-colors shadow-lg relative group">
                    <div className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gray-800 border-t border-l border-gray-700 rotate-45 hidden md:block ${index % 2 === 0 ? '-right-2.5 border-t border-r border-b-0 border-l-0' : '-left-2.5'}`}></div>
                    
                    <span className="inline-block px-3 py-1 mb-2 text-xs font-mono text-blue-400 bg-blue-500/10 rounded-full">
                      {exp.date}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                    <h4 className="text-lg text-gray-400 mb-4">{exp.company}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
