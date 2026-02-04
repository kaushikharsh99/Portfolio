import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { posts } from '../data/posts';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FaCalendar, FaClock, FaArrowLeft, FaLinkedin, FaTwitter, FaFacebook, FaLink } from 'react-icons/fa';
import toast from 'react-hot-toast';

const BlogPost = () => {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white">
        <h2 className="text-3xl font-bold mb-4">Post Not Found</h2>
        <Link to="/blog" className="text-blue-500 hover:underline">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 selection:bg-blue-500 selection:text-white font-sans">
      
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 origin-left z-50"
        style={{ scaleX }}
      />

      <div className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link 
          to="/blog" 
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3 group-hover:bg-blue-600 transition-colors">
            <FaArrowLeft className="text-sm" />
          </div>
          <span className="font-medium">Back to Insights</span>
        </Link>

        {/* Article Header */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
             {post.category}
          </div>
          
          <h1 className="text-3xl md:text-5xl md:leading-tight font-bold mb-8 text-white">
            {post.title}
          </h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-gray-400 text-sm border-y border-gray-800 py-6">
            <div className="flex items-center gap-3">
               <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full border border-gray-700" />
               <div className="text-left">
                 <p className="text-white font-medium">{post.author.name}</p>
                 <p className="text-xs">{post.author.role}</p>
               </div>
            </div>
            <div className="hidden md:block w-px h-8 bg-gray-800"></div>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2"><FaCalendar /> {post.date}</span>
              <span className="flex items-center gap-2"><FaClock /> {post.readTime}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative h-[400px] w-full rounded-2xl overflow-hidden mb-12 shadow-2xl border border-gray-800"
        >
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Content */}
        <article className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-blue-400 prose-blockquote:border-blue-500 prose-blockquote:bg-gray-800/50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-code:text-pink-400 prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        {/* Footer: Tags & Share */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags && post.tags.map(tag => (
                <span key={tag} className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-md hover:text-white transition-colors cursor-default">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Share:</span>
              <button onClick={() => toast('Shared on Twitter!', { icon: '🐦' })} className="p-2 rounded-full bg-gray-800 text-gray-400 hover:bg-blue-400 hover:text-white transition-all">
                <FaTwitter />
              </button>
              <button onClick={() => toast('Shared on LinkedIn!', { icon: '💼' })} className="p-2 rounded-full bg-gray-800 text-gray-400 hover:bg-blue-700 hover:text-white transition-all">
                <FaLinkedin />
              </button>
               <button onClick={() => toast('Shared on Facebook!', { icon: '👍' })} className="p-2 rounded-full bg-gray-800 text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
                <FaFacebook />
              </button>
              <button onClick={copyLink} className="p-2 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-all" title="Copy Link">
                <FaLink />
              </button>
            </div>
          </div>

          {/* Author Bio Box */}
          <div className="mt-12 bg-gray-900 border border-gray-800 rounded-2xl p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
             <img src={post.author.avatar} alt={post.author.name} className="w-20 h-20 rounded-full border-2 border-blue-500" />
             <div className="text-center md:text-left">
               <h3 className="text-xl font-bold text-white mb-2">Written by {post.author.name}</h3>
               <p className="text-gray-400 mb-4">
                 {post.author.role} specializing in Large Language Models and Generative AI. Passionate about making complex AI concepts accessible to everyone.
               </p>
               <Link to="/resume" className="text-blue-400 hover:text-blue-300 font-medium text-sm">
                 View Full Profile &rarr;
               </Link>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default BlogPost;