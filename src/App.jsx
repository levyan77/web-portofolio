import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectGallery from './components/ProjectGallery';
import About from './components/About';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Sunburst background */}
      <div className="bg-sunburst"></div>
      
      {/* Global CRT Overlay */}
      <div className="crt-overlay"></div>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="pt-10 md:pt-20 px-4 md:pl-12 w-full md:pr-[300px] lg:pr-[450px] relative z-10 pb-32 md:pb-20">
        {activeTab === 'home' && <Hero />}
        {activeTab === 'projects' && <ProjectGallery />}
        {activeTab === 'about' && <About />}
      </main>

      {/* Decorative background elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-[-10%] w-[120%] h-32 bg-black opacity-10 transform -rotate-12 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-[-10%] w-[120%] h-64 bg-white opacity-20 transform rotate-6 blur-2xl"></div>
      </div>
    </div>
  );
}

export default App;
