
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-paper flex flex-col overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 z-[1] grain-overlay" aria-hidden="true" />
      <Navbar />
      <main className="flex-grow relative z-[2]">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
