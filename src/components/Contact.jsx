import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate API call
    const sendMessage = new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    toast.promise(sendMessage, {
      loading: 'Sending your message...',
      success: 'Message sent! I will get back to you soon.',
      error: 'Something went wrong. Please try again.',
    }).then(() => {
      setFormState({ name: '', email: '', message: '' });
      setStatus('');
    });
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
       {/* Decorative Circle */}
       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-blue-500 font-mono text-lg mb-4">04. What&apos;s Next?</h2>
          <h3 className="text-4xl md:text-6xl font-bold text-white mb-6">Get In Touch</h3>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            I&apos;m currently looking for new opportunities. Whether you have a question, a project idea, or just want to say hi, my inbox is always open!
          </p>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-gray-700 shadow-xl"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                        <input 
                            type="text" 
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-900/50 border border-gray-600 text-white px-4 py-4 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all peer placeholder-transparent"
                            placeholder="Name"
                        />
                        <label className="absolute left-4 top-4 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-blue-400 peer-focus:text-xs peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-blue-400 bg-gray-900 px-1 rounded">
                            Your Name
                        </label>
                    </div>
                    <div className="relative">
                        <input 
                            type="email" 
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-900/50 border border-gray-600 text-white px-4 py-4 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all peer placeholder-transparent"
                            placeholder="Email"
                        />
                        <label className="absolute left-4 top-4 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-blue-400 peer-focus:text-xs peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-blue-400 bg-gray-900 px-1 rounded">
                            Your Email
                        </label>
                    </div>
                </div>
                
                <div className="relative">
                    <textarea 
                        name="message"
                        rows="5"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-900/50 border border-gray-600 text-white px-4 py-4 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all peer placeholder-transparent resize-none"
                        placeholder="Message"
                    ></textarea>
                    <label className="absolute left-4 top-4 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-blue-400 peer-focus:text-xs peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-blue-400 bg-gray-900 px-1 rounded">
                        Your Message
                    </label>
                </div>

                <div className="text-center">
                    <button 
                        type="submit" 
                        disabled={status === 'sending'}
                        className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/25"
                    >
                        {status === 'sending' ? (
                           <span className="flex items-center">
                               <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                               </svg>
                               Sending...
                           </span>
                        ) : (
                           "Send Message"
                        )}
                    </button>
                </div>
            </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;