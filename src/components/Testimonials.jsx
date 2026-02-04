import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "VP of Engineering at TechFlow",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    content: "Harsh's churn prediction model was a game changer. We reduced customer attrition by 15% in the first quarter alone. His ability to translate data into strategy is rare.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Head of Data at DataDrive",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    content: "The RAG pipeline Harsh architected allows our support team to answer queries instantly with 99% accuracy. He truly understands the nuances of LLM deployment.",
    rating: 5
  },
  {
    name: "Emily Davis",
    role: "CTO at StartupX",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    content: "I was impressed by his deep understanding of computer vision. The defect detection system he built saved us thousands of manual inspection hours.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4"><span className="text-blue-500">05.</span> Testimonials</h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testi, index) => (
            <motion.div
              key={testi.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="bg-gray-800 p-8 rounded-2xl border border-gray-700 relative"
            >
              <FaQuoteLeft className="text-4xl text-blue-500/20 absolute top-6 right-6" />
              
              <div className="flex items-center mb-6">
                <img 
                  src={testi.image} 
                  alt={testi.name} 
                  className="w-14 h-14 rounded-full border-2 border-blue-500 mr-4 object-cover"
                />
                <div>
                  <h3 className="text-white font-bold">{testi.name}</h3>
                  <p className="text-blue-400 text-sm">{testi.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testi.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>

              <p className="text-gray-300 leading-relaxed italic">
                &quot;{testi.content}&quot;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
