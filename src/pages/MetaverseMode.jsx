import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MetaverseMode() {
  const [gameState, setGameState] = useState('start'); // start, playing, won, lost
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5.0); // 5 seconds
  
  const timerRef = useRef(null);

  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0.1) {
            clearInterval(timerRef.current);
            if (score >= 100) {
              setGameState('won');
            } else {
              setGameState('lost');
            }
            return 0;
          }
          return +(prev - 0.1).toFixed(1);
        });
      }, 100);
    }
    return () => clearInterval(timerRef.current);
  }, [gameState, score]);

  // Win condition during play
  useEffect(() => {
    if (gameState === 'playing' && score >= 100) {
      clearInterval(timerRef.current);
      setGameState('won');
    }
  }, [score, gameState]);

  // Keyboard support for mashing
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && gameState === 'playing') {
        e.preventDefault(); // prevent scrolling
        hit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(5.0);
    setGameState('playing');
  };

  const hit = () => {
    if (gameState === 'playing') {
      setScore(s => Math.min(s + 5, 100)); // Need 20 clicks in 5 seconds
    }
  };

  return (
    <div className="w-full text-white min-h-screen relative z-20 px-4 pt-24 pb-24 md:p-8 md:pt-24 overflow-hidden bg-[#a30000] flex flex-col items-center">
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
        className="flex flex-col items-center gap-10 max-w-4xl w-full mx-auto mt-10"
      >
        <div className="relative inline-block rotate-[-3deg] transform-gpu">
          <div className="absolute -inset-4 bg-black transform rotate-2"></div>
          <div className="absolute -inset-4 bg-white transform -rotate-1"></div>
          <h1 className="text-5xl md:text-8xl font-black uppercase text-black relative z-10 px-4 py-2" style={{ fontFamily: 'Impact, sans-serif' }}>
            METAVERSE
          </h1>
          <div className="absolute -bottom-10 right-0 bg-[#e50000] text-white px-4 py-1 text-2xl font-black italic shadow-[-5px_5px_0_black] transform rotate-6 border-4 border-black">
            ALL-OUT ATTACK
          </div>
        </div>

        <div className="mt-20 w-full max-w-2xl bg-black border-4 border-white p-8 shadow-[10px_10px_0_#e50000] transform skew-x-[-2deg] relative z-10">
          <div className="absolute -top-6 -left-6 bg-white text-black font-black text-xl px-4 py-1 border-4 border-black transform -rotate-6">
            COMBAT SIMULATOR
          </div>

          <div className="text-center mt-6 mb-8 text-white">
            {gameState === 'start' && <p className="text-xl italic font-bold">The enemy is vulnerable! Mash Spacebar or Click rapidly!</p>}
            {gameState === 'playing' && (
              <div className="flex flex-col items-center gap-2">
                <p className="text-4xl font-black text-white">{timeLeft}s</p>
                <p className="text-lg text-gray-400 uppercase tracking-widest font-bold">Time Remaining</p>
              </div>
            )}
            {gameState === 'won' && <p className="text-2xl font-black text-[#e50000] animate-pulse">ENEMY DEFEATED!</p>}
            {gameState === 'lost' && <p className="text-2xl font-black text-gray-400">NOT ENOUGH DAMAGE!</p>}
          </div>

          {/* Progress Bar */}
          <div className="w-full h-12 bg-white/10 border-2 border-white relative overflow-hidden my-8 shadow-inner transform skew-x-[-10deg]">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-[#e50000]"
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ type: "tween", duration: 0.1 }}
            >
               <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,black_10px,black_20px)] opacity-20"></div>
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center mix-blend-difference text-white font-black text-2xl z-10">
              {score}%
            </div>
          </div>

          <div className="flex justify-center mt-8">
            {gameState === 'start' || gameState === 'lost' || gameState === 'won' ? (
              <button 
                onClick={startGame}
                className="bg-white text-black text-3xl font-black italic px-10 py-4 transform rotate-2 hover:rotate-0 hover:bg-[#e50000] hover:text-white transition-all border-4 border-black shadow-[5px_5px_0_black]"
              >
                {gameState === 'start' ? 'INITIATE ATTACK' : 'TRY AGAIN'}
              </button>
            ) : (
              <motion.button 
                whileTap={{ scale: 0.9, rotate: Math.random() * 10 - 5 }}
                onClick={hit}
                className="bg-[#e50000] text-white text-5xl font-black italic px-16 py-8 border-8 border-white shadow-[10px_10px_0_black] select-none touch-manipulation"
              >
                MASH!
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Epic Win Screen Overlay */}
      <AnimatePresence>
        {gameState === 'won' && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
           >
             {/* Blood splash background */}
             <motion.div 
               initial={{ scale: 0 }}
               animate={{ scale: 100 }}
               transition={{ duration: 0.5, ease: "easeIn" }}
               className="absolute w-10 h-10 bg-[#a30000] rounded-full"
             />
             
             {/* Cool Text */}
             <motion.div 
               initial={{ x: -1000, skewX: -30 }}
               animate={{ x: 0, skewX: -10 }}
               transition={{ type: "spring", damping: 12, delay: 0.3 }}
               className="relative z-10 bg-black text-white px-12 py-6 border-y-8 border-white shadow-[20px_20px_0_rgba(0,0,0,0.5)] flex flex-col items-center"
             >
                <h2 className="text-6xl md:text-8xl font-black italic mb-2 tracking-tighter">THE SHOW'S OVER</h2>
                <div className="w-full h-2 bg-[#e50000] mb-4"></div>
                <p className="text-xl font-bold tracking-widest text-gray-400">FATAL STRIKE SUCCESSFUL</p>
             </motion.div>

             {/* Stars */}
             {[...Array(5)].map((_, i) => (
                <motion.div 
                  key={i}
                  initial={{ scale: 0, x: 0, y: 0, rotate: 0 }}
                  animate={{ 
                    scale: [0, 2, 0], 
                    x: (Math.random() - 0.5) * 1000, 
                    y: (Math.random() - 0.5) * 1000,
                    rotate: 360 
                  }}
                  transition={{ duration: 1, delay: 0.4 + (i * 0.1) }}
                  className="absolute text-[#facc15] text-8xl z-10 drop-shadow-[0_0_20px_#facc15]"
                >
                  ★
                </motion.div>
             ))}
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
