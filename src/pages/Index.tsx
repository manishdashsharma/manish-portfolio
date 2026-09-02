
import React from 'react';
import MainLayout from '../layouts/MainLayout';
import Hero from '../components/Hero';
import FeaturedProduct from '../components/FeaturedProduct';
import Projects from '../components/Projects';
import About from '../components/About';
import Contact from '../components/Contact';

const Index: React.FC = () => {
  return (
    <MainLayout>
      <Hero />
      <FeaturedProduct />
      <Projects />
      <About />
      <Contact />
    </MainLayout>
  );
};

export default Index;
