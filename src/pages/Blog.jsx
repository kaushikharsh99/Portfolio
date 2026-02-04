import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { posts } from '../data/posts';
import { FaCalendar, FaClock, FaArrowRight, FaTag, FaSearch } from 'react-icons/fa';

const Blog = () => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ['All', ...new Set(posts.map(post => post.category))];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = filter === 'All' || post.category === filter;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = posts[0]; // Assume the first post is featured

  return (
    <div className="pt-24 pb-20 bg-gray-950 min-h-screen text-white selection:bg-blue-500 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Thoughts</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Exploring the frontiers of Artificial Intelligence, Machine Learning, and Data Science.
          </p>
        </motion.div>

        {/* Featured Post Section (Only show if no search/filter active) */}
        {filter === 'All' && !searchTerm && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-20 relative group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            <Link to={`/blog/${featuredPost.id}`} className="relative block bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="h-64 md:h-auto overflow-hidden">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-sm font-semibold text-blue-400 mb-4">
                    <span className="bg-blue-500/10 px-3 py-1 rounded-full uppercase tracking-wider text-xs">{featuredPost.category}</span>
                    <span className="text-gray-500 flex items-center gap-1"><FaCalendar className="text-xs"/> {featuredPost.date}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight group-hover:text-blue-400 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-400 text-lg mb-6 line-clamp-2">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <img src={featuredPost.author.avatar} alt={featuredPost.author.name} className="w-10 h-10 rounded-full border border-gray-700" />
                    <div>
                      <p className="text-sm font-medium text-white">{featuredPost.author.name}</p>
                      <p className="text-xs text-gray-500">{featuredPost.author.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Controls: Search & Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === cat 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white pl-10 pr-4 py-2 rounded-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-500 text-sm"
            />
          </div>
        </div>

        {/* Posts Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <motion.article
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={post.id}
                  className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-600 transition-all duration-300 hover:shadow-2xl flex flex-col group"
                >
                  <Link to={`/blog/${post.id}`} className="block h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 z-20">
                       <span className="bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                         {post.category}
                       </span>
                    </div>
                  </Link>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1"><FaCalendar /> {post.date}</span>
                      <span className="flex items-center gap-1"><FaClock /> {post.readTime}</span>
                    </div>

                    <Link to={`/blog/${post.id}`} className="block">
                      <h2 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                    </Link>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-800">
                      <div className="flex items-center gap-2">
                        <img src={post.author.avatar} alt="Author" className="w-6 h-6 rounded-full" />
                        <span className="text-xs text-gray-400">{post.author.name}</span>
                      </div>
                      <Link 
                        to={`/blog/${post.id}`}
                        className="text-blue-400 hover:text-white text-sm font-medium flex items-center gap-1 transition-colors"
                      >
                        Read <FaArrowRight className="text-xs" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-gray-500">
                <p className="text-xl">No posts found matching your criteria.</p>
                <button onClick={() => {setFilter('All'); setSearchTerm('');}} className="mt-4 text-blue-400 hover:underline">Clear filters</button>
              </div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
};

export default Blog;