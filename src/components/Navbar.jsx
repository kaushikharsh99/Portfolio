import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = ['Home', 'About', 'Experience', 'Projects', 'Blog', 'Resume', 'Contact'];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (location.pathname === '/') {
        const sections = ['home', 'about', 'experience', 'projects', 'contact'];
        const scrollPosition = window.scrollY + 100;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const offsetTop = element.offsetTop;
            const height = element.offsetHeight;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
              setActiveSection(section);
            }
          }
        }
      } else if (location.pathname.startsWith('/blog')) {
        setActiveSection('blog');
      } else if (location.pathname === '/resume') {
        setActiveSection('resume');
      } else {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount/location change to set initial active state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (item) => {
    const lowerItem = item.toLowerCase();
    
    if (lowerItem === 'blog') {
      navigate('/blog');
    } else if (lowerItem === 'resume') {
      navigate('/resume');
    } else {
      // Handle scroll links
      if (location.pathname === '/') {
        const element = document.getElementById(lowerItem);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/', { state: { target: lowerItem } });
        setTimeout(() => {
          const element = document.getElementById(lowerItem);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
    setIsOpen(false);
  };
  
  // Handle scroll from other pages
  useEffect(() => {
     if (location.state && location.state.target && location.pathname === '/') {
        const element = document.getElementById(location.state.target);
        if (element) {
           setTimeout(() => {
             element.scrollIntoView({ behavior: 'smooth' });
           }, 100);
        }
     }
  }, [location]);


  const navVariants = {
    hidden: { y: -100 },
    visible: { 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const linkVariants = {
    hover: { scale: 1.1, color: "#60A5FA" }, // blue-400
    tap: { scale: 0.95 }
  };

  return (
    <motion.nav 
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-2 glass shadow-lg bg-gray-900/80' : 'py-4 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
             <motion.span 
               whileHover={{ scale: 1.05 }}
               className="font-bold text-2xl tracking-wider text-white"
             >
               Harsh<span className="text-blue-500">.</span>dev
             </motion.span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => {
                const sectionId = item.toLowerCase();
                const isActive = activeSection === sectionId;
                
                return (
                  <motion.button
                    key={item}
                    onClick={() => handleNavClick(item)}
                    variants={linkVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative cursor-pointer bg-transparent border-none ${
                      isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item}
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass bg-gray-900/95 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => {
                 const sectionId = item.toLowerCase();
                 const isActive = activeSection === sectionId;
                 return (
                    <button
                      key={item}
                      onClick={() => handleNavClick(item)}
                      className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                        isActive ? 'text-white bg-blue-500/20' : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {item}
                    </button>
                 );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;