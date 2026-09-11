import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ModeTransition({ isTriggered, onComplete, targetMode }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isTriggered) {
      setShow(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 800); 

      setTimeout(() => {
        setShow(false);
      }, 1600);
    }
  }, [isTriggered, onComplete, targetMode]);

  // Determine transition colors based on the mode we are transitioning TO
  let primaryColor, secondaryColor, accentColor, typography;
  
  if (targetMode === 'hobby') { // P3 Style
    primaryColor = '#00A8E8'; // Blue
    secondaryColor = '#ffffff';
    accentColor = 'black';
    typography = "ME TIME ✦ ME TIME";
  } else if (targetMode === 'metaverse') { // P5 Style
    primaryColor = '#e50000'; // Red
    secondaryColor = '#000000';
    accentColor = 'white';
    typography = "TAKE YOUR HEART";
  } else { // P4 / Pro Style
    primaryColor = '#facc15'; // Yellow
    secondaryColor = '#000000';
    accentColor = 'white';
    typography = "MAYONAKA TV";
  }

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
          {/* Base Layer */}
          <motion.div
            initial={{ x: '-100%', skewX: -20 }}
            animate={{ x: '0%', skewX: 0 }}
            exit={{ x: '100%', skewX: 20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-[-10%] w-[120%] h-[120%] bg-black flex items-center justify-center overflow-hidden"
          >
             <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,#fff_20px,#fff_40px)]"></div>
          </motion.div>

          {/* SHATTERED GLASS EFFECT FOR METAVERSE */}
          {targetMode === 'metaverse' && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
               {/* Impact Flash */}
               <motion.div 
                 initial={{ scale: 0, opacity: 1 }} 
                 animate={{ scale: 20, opacity: 0 }} 
                 transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }} 
                 className="absolute w-10 h-10 bg-white rounded-full"
               />
               
               {/* Shards */}
               {[
                 { clip: 'polygon(50% 50%, 0 0, 100% 0)', x: 0, y: -800, r: 45 },
                 { clip: 'polygon(50% 50%, 100% 0, 100% 100%)', x: 800, y: 0, r: 90 },
                 { clip: 'polygon(50% 50%, 100% 100%, 0 100%)', x: 0, y: 800, r: 135 },
                 { clip: 'polygon(50% 50%, 0 100%, 0 0)', x: -800, y: 0, r: -90 },
                 { clip: 'polygon(50% 50%, 20% 0, 0 30%)', x: -600, y: -600, r: -45 },
                 { clip: 'polygon(50% 50%, 100% 30%, 80% 100%)', x: 600, y: 600, r: 120 }
               ].map((shard, i) => (
                 <motion.div 
                   key={i}
                   initial={{ x: 0, y: 0, rotate: 0, opacity: 0.8 }}
                   animate={{ x: shard.x, y: shard.y, rotate: shard.r, opacity: 0 }}
                   transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                   className="absolute inset-[-20%] w-[140%] h-[140%] bg-white"
                   style={{ clipPath: shard.clip }}
                 />
               ))}
            </div>
          )}
          
          {/* Primary Color Layer */}
          <motion.div
            initial={{ x: '-100%', skewX: targetMode === 'metaverse' ? -40 : -30 }}
            animate={{ x: '0%', skewX: 0 }}
            exit={{ x: '100%', skewX: targetMode === 'metaverse' ? 40 : 30 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute inset-[-10%] w-[120%] h-[120%] flex items-center justify-center overflow-hidden border-r-[20px]`}
            style={{ backgroundColor: primaryColor, borderColor: accentColor }}
          >
             <motion.div 
               initial={{ rotate: targetMode === 'metaverse' ? -15 : -5, scale: 1.2 }}
               animate={{ rotate: targetMode === 'metaverse' ? -15 : -5, scale: 1 }}
               exit={{ scale: 1.5, opacity: 0 }}
               transition={{ duration: 1.2 }}
               className="text-[12vw] md:text-[8vw] font-black italic whitespace-nowrap leading-none flex flex-col items-center"
               style={{ color: secondaryColor, opacity: targetMode === 'metaverse' ? 1 : 0.2, mixBlendMode: targetMode === 'metaverse' ? 'overlay' : 'normal' }}
             >
                <span>{typography}</span>
                <span className="ml-24">SYSTEM OVERRIDE</span>
                <span>{typography}</span>
             </motion.div>
          </motion.div>
          
          {/* Accent Color Layer */}
          <motion.div
            initial={{ x: '-100%', skewX: -40 }}
            animate={{ x: '0%', skewX: 0 }}
            exit={{ x: '100%', skewX: 40 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute inset-[-10%] w-[120%] h-[120%] border-r-[10px]`}
            style={{ backgroundColor: secondaryColor, borderColor: primaryColor }}
          />

          {/* Reveal Black Layer */}
          <motion.div
            initial={{ x: '-100%', skewX: -10 }}
            animate={{ x: '0%', skewX: 0 }}
            exit={{ x: '100%', skewX: 10 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-[-10%] w-[120%] h-[120%] bg-[#050505] flex flex-col justify-between py-10"
          >
            <div className="w-full h-4 animate-pulse" style={{ backgroundColor: primaryColor, opacity: 0.2 }}></div>
            <div className="w-full h-4 animate-pulse delay-150" style={{ backgroundColor: primaryColor, opacity: 0.2 }}></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
