import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
        <Link to="/projects" className="text-blue-500 hover:underline">
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <Link 
          to="/projects" 
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back to Projects
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>

        <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8 shadow-2xl">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {project.longDescription || project.description}
              </p>
            </div>

            {project.features && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="bg-gray-800 p-6 rounded-xl h-fit">
            <h3 className="text-xl font-bold mb-4">Technologies</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-3 py-1 text-sm font-medium text-blue-400 bg-blue-400/10 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="space-y-4">
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full gap-2 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors font-medium"
              >
                <FaGithub size={20} /> View Source
              </a>
              <a 
                href={project.demo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors font-medium"
              >
                <FaExternalLinkAlt size={18} /> Live Demo
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
