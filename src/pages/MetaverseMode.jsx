import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MetaverseMode() {
  const [gameState, setGameState] = useState('start'); // start, playing, won, lost
  const [level, setLevel] = useState(1);
  const [cursorPos, setCursorPos] = useState(50);
  const [direction, setDirection] = useState(1);
  
  const requestRef = useRef(null);
  
  // Game config based on level
  const speed = level === 1 ? 1.5 : level === 2 ? 2.5 : 4.0;
  const targetWidth = level === 1 ? 20 : level === 2 ? 12 : 6;
  const targetStart = 50 - (targetWidth / 2);
  const targetEnd = 50 + (targetWidth / 2);

  const animate = () => {
    setCursorPos(prev => {
      let nextPos = prev + (speed * direction);
      if (nextPos >= 100) {
        nextPos = 100;
        setDirection(-1);
      } else if (nextPos <= 0) {
        nextPos = 0;
        setDirection(1);
      }
      return nextPos;
    });
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (gameState === 'playing') {
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameState, direction, speed]);

  const handleAction = () => {
    if (gameState === 'start') {
      setGameState('playing');
      setLevel(1);
    } else if (gameState === 'playing') {
      if (cursorPos >= targetStart && cursorPos <= targetEnd) {
        if (level === 3) {
          setGameState('won');
        } else {
          setLevel(level + 1);
        }
      } else {
        setGameState('lost');
      }
    } else if (gameState === 'lost' || gameState === 'won') {
      setGameState('start');
      setLevel(1);
    }
  };

  return (
    <div className="w-full text-white min-h-screen relative z-20 px-4 pt-24 pb-24 md:p-8 md:pt-24 overflow-hidden bg-[#a30000]">
      {/* Background Graphic Elements */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        {/* Halftone dots overlay */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '10px 10px' }}></div>
        {/* Large red angled block */}
        <div className="absolute -top-1/4 -right-1/4 w-[150%] h-[150%] bg-[#cc0000] transform rotate-12 -z-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"></div>
        {/* Black jagged shape */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-black" style={{ clipPath: 'polygon(0 40%, 20% 0, 40% 60%, 70% 20%, 100% 70%, 100% 100%, 0 100%)' }}></div>
        
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -left-20 w-[40rem] h-[40rem] border-[40px] border-black/10 rounded-full border-dashed"
        />
        
        {/* Floating Stars */}
        <motion.div animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-20 right-20 text-6xl text-white/30 font-black">★</motion.div>
        <motion.div animate={{ y: [0, 20, 0], rotate: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute bottom-40 right-1/4 text-8xl text-black/20 font-black">★</motion.div>
      </div>

      <motion.div 
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="flex flex-col items-center gap-10 max-w-4xl mx-auto mt-10"
      >
        <div className="relative inline-block rotate-[-3deg] transform-gpu">
          <div className="absolute -inset-4 bg-black transform rotate-2"></div>
          <div className="absolute -inset-4 bg-white transform -rotate-1"></div>
          <h1 className="text-5xl md:text-8xl font-black uppercase text-black relative z-10 px-4 py-2" style={{ fontFamily: 'Impact, sans-serif' }}>
            METAVERSE
          </h1>
          <div className="absolute -bottom-10 right-0 bg-[#e50000] text-white px-4 py-1 text-2xl font-black italic shadow-[-5px_5px_0_black] transform rotate-6 border-4 border-black">
            LAB & EXPERIMENTS
          </div>
        </div>

        <div className="mt-20 w-full max-w-2xl bg-black border-4 border-white p-6 shadow-[10px_10px_0_#e50000] transform skew-x-[-2deg] relative">
          <div className="absolute -top-6 -left-6 bg-white text-black font-black text-xl px-4 py-1 border-4 border-black transform -rotate-6">
            PHANTOM LOCKPICKER
          </div>

          <div className="text-center mt-6 mb-8 text-white">
            {gameState === 'start' && <p className="text-xl italic font-bold">Infiltrate the Palace. Tap when inside the red zone!</p>}
            {gameState === 'playing' && <p className="text-2xl font-black">SECURITY LEVEL: {level}</p>}
            {gameState === 'won' && <p className="text-2xl font-black text-[#e50000] animate-pulse">HEART STOLEN!</p>}
            {gameState === 'lost' && <p className="text-2xl font-black text-gray-400">AMBUSHED!</p>}
          </div>

          {/* Game Bar */}
          <div className="w-full h-12 bg-white/20 border-2 border-white relative overflow-hidden my-8 rounded-full shadow-inner">
            {/* Target Zone */}
            <div 
              className="absolute h-full bg-[#e50000] border-x-4 border-black"
              style={{ left: `${targetStart}%`, width: `${targetWidth}%` }}
            >
              <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,black_5px,black_10px)] opacity-30"></div>
            </div>
            
            {/* Cursor */}
            <div 
              className="absolute h-full w-2 bg-white shadow-[0_0_15px_white] z-10"
              style={{ left: `${cursorPos}%`, transform: 'translateX(-50%)' }}
            ></div>
          </div>

          <div className="flex justify-center mt-8">
            <button 
              onClick={handleAction}
              className="bg-white text-black text-3xl font-black italic px-8 py-3 transform rotate-2 hover:rotate-0 hover:bg-[#e50000] hover:text-white transition-all border-4 border-black shadow-[5px_5px_0_black]"
            >
              {gameState === 'start' ? 'START HEIST' : gameState === 'playing' ? 'PICK LOCK!' : 'TRY AGAIN'}
            </button>
          </div>
          
          <AnimatePresence>
            {gameState === 'won' && (
               <motion.div 
                 initial={{ opacity: 0, y: 50, rotate: 10 }}
                 animate={{ opacity: 1, y: 0, rotate: -2 }}
                 className="absolute inset-0 bg-black border-4 border-white p-6 z-50 flex flex-col items-center justify-center text-center"
               >
                 <h2 className="text-4xl md:text-6xl font-black text-[#e50000] mb-4 drop-shadow-[2px_2px_0_white]">MISSION ACCOMPLISHED</h2>
                 <p className="text-white text-lg mb-6 max-w-md">You've successfully cracked the lock! Stay tuned for more interactive experiments and web dev illusions.</p>
                 <button onClick={() => setGameState('start')} className="bg-[#e50000] text-white px-6 py-2 font-bold italic border-2 border-white hover:scale-105">RETURN TO SHADOWS</button>
               </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
