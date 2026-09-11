import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectGallery from './components/ProjectGallery';
import About from './components/About';
import Experience from './components/Experience';
import MusicPlayer from './components/MusicPlayer';
import P3Transition from './components/P3Transition';
import HobbyMode from './pages/HobbyMode';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [mode, setMode] = useState('professional'); // 'professional' | 'hobby'
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingMode, setPendingMode] = useState(null);
  const sfxRef = React.useRef(null);

  const switchMode = (newMode) => {
    if (newMode === mode || isTransitioning) return;
    
    if (sfxRef.current) {
      sfxRef.current.currentTime = 0;
      sfxRef.current.play().catch(e => console.log('SFX block', e));
    }

    setPendingMode(newMode);
    setIsTransitioning(true);
  };

  const onTransitionHalfway = () => {
    setMode(pendingMode);
    if (pendingMode === 'hobby') {
      document.body.style.backgroundColor = '#050505'; // Darker for P3
    } else {
      document.body.style.backgroundColor = '#000000';
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-1000 ${mode === 'hobby' ? 'bg-[#050505]' : 'bg-black'}`}>
      
      <P3Transition 
        isTriggered={isTransitioning} 
        onComplete={onTransitionHalfway} 
      />

      {/* Button Switch Mode */}
      <div className="fixed bottom-24 right-0 md:bottom-12 md:right-12 z-50">
        <button 
          onClick={() => switchMode(mode === 'professional' ? 'hobby' : 'professional')}
          className={`flex items-center gap-2 pl-3 pr-5 py-3 md:px-6 md:py-4 font-black italic uppercase tracking-wider border-2 border-r-0 md:border-r-2 transition-transform duration-500 ease-out translate-x-[calc(100%-3rem)] hover:translate-x-0 active:translate-x-0 md:translate-x-0 rounded-l-xl md:rounded-none ${
            mode === 'professional' 
              ? 'bg-yellow-400 text-black border-black hover:bg-black hover:text-yellow-400 shadow-[-4px_4px_0_#fff] md:shadow-[4px_4px_0_#fff]' 
              : 'bg-[#00A8E8] text-white border-white hover:bg-white hover:text-[#00A8E8] shadow-[-4px_4px_0_#00A8E8] md:shadow-[4px_4px_0_#00A8E8]'
          }`}
        >
          <span className="text-lg md:hidden">◀</span>
          <span className="whitespace-nowrap">{mode === 'professional' ? 'SWITCH TO ME TIME' : 'SWITCH TO PRO MODE'}</span>
        </button>
      </div>

      {/* Music Player handles its own mode styling now */}
      <MusicPlayer mode={mode} />

      {mode === 'professional' ? (
        <>
          {/* Sunburst background */}
          <div className="bg-sunburst"></div>
          
          {/* Global CRT Overlay */}
          <div className="crt-overlay"></div>

          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

          <main className="pt-10 md:pt-20 px-4 md:pl-12 w-full md:pr-[300px] lg:pr-[450px] relative z-10 pb-32 md:pb-20">
            {activeTab === 'home' && <Hero />}
            
            {/* Canvas 3D dibiarkan hidup di background (hanya disembunyikan) agar tidak perlu loading ulang yang bikin patah-patah */}
            <div className={activeTab === 'projects' ? 'block' : 'hidden'}>
              <ProjectGallery isActive={activeTab === 'projects'} />
            </div>
            
            {activeTab === 'about' && <About />}
            {activeTab === 'history' && <Experience />}
          </main>

          {/* Decorative background elements */}
          <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
            <div className="absolute top-1/4 left-[-10%] w-[120%] h-32 bg-black opacity-10 transform -rotate-12 blur-3xl"></div>
            <div className="absolute bottom-1/4 left-[-10%] w-[120%] h-64 bg-white opacity-20 transform rotate-6 blur-2xl"></div>
          </div>
        </>
      ) : (
        <HobbyMode />
      )}

      {/* Reset transitioning state after animation completes */}
      {isTransitioning && setTimeout(() => setIsTransitioning(false), 1600) && null}

      {/* SFX Audio */}
      <audio ref={sfxRef} src="./transition-sfx.mp3" style={{ display: 'none' }} />
    </div>
  );
}

export default App;
