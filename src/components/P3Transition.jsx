import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function P3Transition({ isTriggered, onComplete }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isTriggered) {
      setShow(true);
      // Let the animation play, then call onComplete to switch the actual DOM behind the scenes
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 800); // 800ms is exactly when the screen is fully covered

      // Then hide the transition overlay
      setTimeout(() => {
        setShow(false);
      }, 1600);
    }
  }, [isTriggered, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
          {/* Base Black Layer */}
          <motion.div
            initial={{ x: '-100%', skewX: -20 }}
            animate={{ x: '0%', skewX: 0 }}
            exit={{ x: '100%', skewX: 20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-[-10%] w-[120%] h-[120%] bg-black flex items-center justify-center overflow-hidden"
          >
             {/* Diagonal stripe pattern */}
             <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,#fff_20px,#fff_40px)]"></div>
          </motion.div>
          
          {/* Persona 3 Blue Layer */}
          <motion.div
            initial={{ x: '-100%', skewX: -30 }}
            animate={{ x: '0%', skewX: 0 }}
            exit={{ x: '100%', skewX: 30 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-[-10%] w-[120%] h-[120%] bg-[#00A8E8] flex items-center justify-center overflow-hidden border-r-[20px] border-black"
          >
             <motion.div 
               initial={{ rotate: -5, scale: 1.2 }}
               animate={{ rotate: -5, scale: 1 }}
               exit={{ scale: 1.5, opacity: 0 }}
               transition={{ duration: 1.2 }}
               className="text-[12vw] md:text-[8vw] font-black italic text-black/20 whitespace-nowrap leading-none flex flex-col items-center"
             >
                <span>ME TIME ✦ ME TIME ✦ ME TIME</span>
                <span className="text-white/30 ml-24">SYSTEM OVERRIDE</span>
                <span>ME TIME ✦ ME TIME ✦ ME TIME</span>
             </motion.div>
          </motion.div>
          
          {/* White Accent Layer */}
          <motion.div
            initial={{ x: '-100%', skewX: -40 }}
            animate={{ x: '0%', skewX: 0 }}
            exit={{ x: '100%', skewX: 40 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-[-10%] w-[120%] h-[120%] bg-white border-r-[10px] border-[#00A8E8]"
          />

          {/* Another Black Layer to reveal the new screen smoothly */}
          <motion.div
            initial={{ x: '-100%', skewX: -10 }}
            animate={{ x: '0%', skewX: 0 }}
            exit={{ x: '100%', skewX: 10 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-[-10%] w-[120%] h-[120%] bg-[#050505] flex flex-col justify-between py-10"
          >
            <div className="w-full h-4 bg-[#00A8E8]/20 animate-pulse"></div>
            <div className="w-full h-4 bg-[#00A8E8]/20 animate-pulse delay-150"></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
