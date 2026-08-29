import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MusicPlayer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Auto-play workaround: Browsers block autoplay until user interacts with the page
  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
      }
    };
    
    // Listen for any click or key press on the website to trigger the music
    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);
    
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, [hasInteracted]);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 bg-black p-4 border-2 border-white shadow-[5px_5px_0px_var(--color-persona-yellow)] text-white w-72"
          >
            <h3 className="font-bold text-[var(--color-persona-yellow)] mb-2 uppercase border-b border-gray-600 pb-1">
              Cassette Player
            </h3>
            <p className="text-xs mb-3 text-gray-300 font-bold">
              Untuk memutar lagu tanpa diblokir oleh pihak label musik (SME), masukkan file lagu berformat .mp3 Anda ke dalam folder <b>public/</b> lalu beri nama <b>bgm.mp3</b>.
            </p>
            
            <audio 
              controls 
              autoPlay={hasInteracted} 
              loop 
              className="w-full h-8"
              src="/bgm.mp3"
            >
              Browser Anda tidak mendukung elemen audio.
            </audio>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => {
          setIsOpen(!isOpen);
          setHasInteracted(true);
        }}
        className="bg-[var(--color-persona-yellow)] text-black font-black px-4 py-3 border-2 border-black shadow-[4px_4px_0px_black] hover:bg-[var(--color-persona-orange)] hover:text-white transition-colors flex items-center gap-2 transform skew-x-12"
      >
        <div className="-skew-x-12 flex items-center gap-2">
          <span className="text-xl">🎵</span> 
          <span>{isOpen ? 'CLOSE PLAYER' : 'PLAY BGM'}</span>
        </div>
      </button>

      {/* Hidden audio element for background autoplay */}
      {hasInteracted && !isOpen && (
        <audio 
          autoPlay 
          loop 
          src="/bgm.mp3"
          style={{ display: 'none' }}
        />
      )}
    </div>
  );
};

export default MusicPlayer;
