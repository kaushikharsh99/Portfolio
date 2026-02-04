import React from 'react';
import Hero from '../components/Hero';
import TechStack from '../components/TechStack';
import About from '../components/About';
import Stats from '../components/Stats';
import Services from '../components/Services';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <>
      <Hero />
      <TechStack />
      <About />
      <Stats />
      <Services />
      <Experience />
      {/* Show only 3 projects on the home page */}
      <Projects limit={3} />
      <Testimonials />
      <CTA />
      <Contact />
    </>
  );
};

export default Home;
