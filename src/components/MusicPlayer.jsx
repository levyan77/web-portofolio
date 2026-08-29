import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const hasAutoPlayed = useRef(false);

  // Auto-play workaround: Browsers block autoplay until user interacts
  useEffect(() => {
    const handleInteraction = () => {
      if (!hasAutoPlayed.current && audioRef.current) {
        hasAutoPlayed.current = true;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Autoplay was prevented
        });
      }
      
      // Clean up listeners after first interaction
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
    
    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);
    
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  const togglePlay = (e) => {
    e.stopPropagation(); // Mencegah event bocor ke document listener
    
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
      // Jika user ngeklik manual, anggap sudah autoplay agar tidak nyala dua kali
      hasAutoPlayed.current = true; 
    }
  };

  // Repeated text for continuous marquee effect
  const MarqueeText = () => (
    <div className="flex gap-16 px-8 whitespace-nowrap font-black text-black text-xl tracking-[0.2em] uppercase">
      <span>{isPlaying ? '▶ NOW PLAYING' : '⏸ PAUSED'}</span>
      <span>PERSONA 4 REVIVAL PORTFOLIO</span>
      <span>🎵 BGM.MP3 🎵</span>
      <span>KLIK UNTUK {isPlaying ? 'PAUSE' : 'PLAY'}</span>
    </div>
  );

  return (
    <div 
      className="fixed top-0 left-0 w-full z-50 overflow-hidden cursor-pointer group" 
      onClick={togglePlay}
    >
      {/* The Angled Background Container */}
      <div className="bg-[var(--color-persona-yellow)] border-b-4 border-black shadow-[0_5px_0px_rgba(0,0,0,1)] transform -skew-x-12 scale-110 -ml-4 w-[110%] py-2 transition-colors duration-300 group-hover:bg-[var(--color-persona-orange)]">
        
        {/* Scrolling Content */}
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="flex w-max"
        >
          {/* We render it twice so it loops seamlessly */}
          <MarqueeText />
          <MarqueeText />
        </motion.div>
      </div>

      <audio 
        ref={audioRef}
        loop 
        src="./bgm.mp3"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default MusicPlayer;
