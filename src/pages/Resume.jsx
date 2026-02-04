import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

const Resume = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const experiences = [
    {
      role: 'Senior Data Scientist',
      company: 'Innovate AI Labs',
      period: '2023 - Present',
      description: 'Leading the development of Generative AI solutions for enterprise clients. Fine-tuning Llama-3 models and deploying RAG pipelines on AWS.',
      skills: ['Python', 'PyTorch', 'AWS SageMaker', 'LLMs', 'LangChain']
    },
    {
      role: 'Machine Learning Engineer',
      company: 'DataDriven Corp',
      period: '2021 - 2023',
      description: 'Designed and deployed predictive models for customer churn and demand forecasting. Reduced model inference latency by 40% using ONNX.',
      skills: ['Scikit-learn', 'TensorFlow', 'Docker', 'SQL', 'FastAPI']
    },
    {
      role: 'Data Analyst',
      company: 'FinTech Solutions',
      period: '2019 - 2021',
      description: 'Analyzed large financial datasets to identify fraud patterns. Created automated reporting dashboards using Tableau and Python.',
      skills: ['SQL', 'Pandas', 'Tableau', 'Statistical Analysis']
    }
  ];

  const education = [
    {
      degree: 'Master of Science in Artificial Intelligence',
      school: 'Tech University',
      period: '2018 - 2020'
    },
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of Technology',
      period: '2014 - 2018'
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-gray-900 min-h-screen text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-gray-800 pb-8"
        >
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h1 className="text-4xl font-bold mb-2">Harsh Kaushik</h1>
            <p className="text-xl text-blue-400">Data Scientist | AI Engineer</p>
            <p className="text-gray-400 mt-2 max-w-lg">
              Expert in Machine Learning, Deep Learning, and Large Language Models. Transforming raw data into actionable intelligence.
            </p>
          </div>
          
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg">
              <FaDownload /> Download PDF
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="md:col-span-2 space-y-12">
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6 border-l-4 border-blue-500 pl-4">Experience</h2>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative pl-4 border-l border-gray-700 ml-2">
                    <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[6.5px] top-1.5"></div>
                    <h3 className="text-xl font-bold">{exp.role}</h3>
                    <h4 className="text-lg text-gray-400 mb-2">{exp.company} | {exp.period}</h4>
                    <p className="text-gray-300 mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-gray-800 rounded text-xs text-blue-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6 border-l-4 border-blue-500 pl-4">Technical Expertise</h2>
               <ul className="list-disc list-inside text-gray-300 space-y-2">
                 <li><strong>Machine Learning:</strong> Regression, Classification, Clustering, XGBoost, LightGBM</li>
                 <li><strong>Deep Learning:</strong> CNNs, RNNs, LSTMs, Transformers, GANs</li>
                 <li><strong>NLP:</strong> LLMs (GPT, Llama), HuggingFace, LangChain, BERT, Tokenization</li>
                 <li><strong>MLOps:</strong> Docker, Kubernetes, MLflow, AWS SageMaker</li>
               </ul>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-10">
            <motion.section
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.4 }}
            >
              <h2 className="text-xl font-bold mb-4 text-gray-200">Contact</h2>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-3">
                  <FaEnvelope className="text-blue-500" /> contact@harsh.dev
                </li>
                <li className="flex items-center gap-3">
                  <FaLinkedin className="text-blue-500" /> linkedin.com/in/harsh
                </li>
                <li className="flex items-center gap-3">
                  <FaGithub className="text-blue-500" /> github.com/kaushikharsh99
                </li>
              </ul>
            </motion.section>

            <motion.section
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.5 }}
            >
              <h2 className="text-xl font-bold mb-4 text-gray-200">Education</h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-bold text-white">{edu.degree}</h3>
                  <p className="text-sm text-gray-400">{edu.school}</p>
                  <p className="text-xs text-gray-500">{edu.period}</p>
                </div>
              ))}
            </motion.section>

            <motion.section
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.6 }}
            >
              <h2 className="text-xl font-bold mb-4 text-gray-200">Core Stack</h2>
              <div className="flex flex-wrap gap-2">
                {['Python', 'PyTorch', 'TensorFlow', 'SQL', 'Pandas', 'NumPy', 'AWS', 'Docker'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.section>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Resume;