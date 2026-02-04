import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

const Projects = ({ limit = null }) => {
  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <section id="projects" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {limit ? 'Featured Projects' : 'All Projects'}
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            A selection of projects that showcase my passion for building scalable and user-friendly applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col"
            >
              <div className="h-48 overflow-hidden relative group">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link 
                    to={`/project/${project.id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-medium transform scale-0 group-hover:scale-100 transition-transform duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <Link to={`/project/${project.id}`} className="hover:text-blue-400 transition-colors">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                </Link>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2 py-1 text-xs font-medium text-blue-400 bg-blue-400/10 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-auto">
                  <a 
                    href={project.github}
                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 text-sm"
                  >
                    <FaGithub size={16} /> Source
                  </a>
                  <a 
                    href={project.demo}
                    className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2 text-sm"
                  >
                    <FaExternalLinkAlt size={14} /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {limit && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link 
              to="/projects"
              className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-full font-semibold transition-all border border-gray-700 hover:border-blue-500"
            >
              View All Projects <FaArrowRight />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
