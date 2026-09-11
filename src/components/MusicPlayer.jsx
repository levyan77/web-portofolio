import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MusicPlayer = ({ mode = 'professional' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [showVolume, setShowVolume] = useState(false);
  const audioRef = useRef(null);
  const hasAutoPlayed = useRef(false);

  // Sync mode changes to the audio element and volume
  useEffect(() => {
    if (audioRef.current) {
      if (mode === 'hobby') {
        audioRef.current.src = "./bgm_hobby.mp3";
        audioRef.current.volume = 0.3;
        setVolume(0.3);
      } else if (mode === 'metaverse') {
        audioRef.current.src = "./bgm_metaverse.mp3";
        audioRef.current.volume = 0.5;
        setVolume(0.5);
      } else {
        audioRef.current.src = "./bgm.mp3";
        audioRef.current.volume = 1.0;
        setVolume(1.0);
      }

      if (isPlaying) {
        audioRef.current.play().catch(e => console.log('Audio play blocked:', e));
      }
    }
  }, [mode]);

  // Attempt autoplay on first user interaction
  useEffect(() => {
    const handleInteraction = () => {
      if (!hasAutoPlayed.current && audioRef.current && !isPlaying) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            hasAutoPlayed.current = true;
          })
          .catch(err => console.log("Autoplay blocked:", err));
      }
    };
    
    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);
    
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  const togglePlay = (e) => {
    e.stopPropagation(); // Prevent event leak
    
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
      hasAutoPlayed.current = true; 
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  const MarqueeText = () => {
    let modeText = 'ACHMAD PAHLEVY PORTFOLIO';
    let trackText = 'BGM.MP3';
    
    if (mode === 'hobby') {
      modeText = 'ME TIME ARCHIVE';
      trackText = 'BGM_HOBBY.MP3';
    } else if (mode === 'metaverse') {
      modeText = 'PHANTOM THIEVES ARCHIVE';
      trackText = 'BGM_METAVERSE.MP3';
    }

    return (
      <div className="flex gap-16 px-8 whitespace-nowrap font-black text-black text-xl tracking-[0.2em] uppercase">
        <span>{isPlaying ? '🎵 NOW PLAYING' : '⏸️ PAUSED'}</span>
        <span>{modeText}</span>
        <span>🎵 {trackText} 🎵</span>
        <span>KLIK UNTUK {isPlaying ? 'PAUSE' : 'PLAY'}</span>
      </div>
    );
  };

  // Dynamic styling based on mode
  let bgClass, accentColor;
  if (mode === 'professional') {
    bgClass = "bg-[var(--color-persona-yellow)] hover:bg-[var(--color-persona-orange)]";
    accentColor = "var(--color-persona-yellow)";
  } else if (mode === 'hobby') {
    bgClass = "bg-[#00A8E8] hover:bg-white";
    accentColor = "#00A8E8";
  } else if (mode === 'metaverse') {
    bgClass = "bg-[#e50000] hover:bg-white";
    accentColor = "#e50000";
  }

  return (
    <div className="fixed top-0 left-0 w-full z-50 group">
      {/* The Angled Background Container */}
      <div 
        className={`${bgClass} border-b-4 border-black shadow-[0_5px_0px_rgba(0,0,0,1)] transform -skew-x-12 scale-110 -ml-4 w-[110%] py-2 transition-colors duration-300 cursor-pointer overflow-hidden relative`}
        onClick={togglePlay}
      >
        {/* Scrolling Content */}
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="flex w-max"
        >
          <MarqueeText />
          <MarqueeText />
        </motion.div>
      </div>

      {/* Volume Control */}
      <div 
        className="absolute right-8 top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 bg-black border-4 border-white p-2 flex items-center gap-2"
        onMouseEnter={() => setShowVolume(true)}
        onMouseLeave={() => setShowVolume(false)}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-white font-black italic">VOL</span>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 cursor-pointer accent-white"
          style={{ accentColor: accentColor }}
        />
      </div>

      <audio 
        ref={audioRef}
        loop 
        preload="auto"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default MusicPlayer;
