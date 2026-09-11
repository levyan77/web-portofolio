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
            className="absolute inset-[-10%] w-[120%] h-[120%] bg-black"
          />
          
          {/* Persona 3 Blue Layer */}
          <motion.div
            initial={{ x: '-100%', skewX: -30 }}
            animate={{ x: '0%', skewX: 0 }}
            exit={{ x: '100%', skewX: 30 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-[-10%] w-[120%] h-[120%] bg-[#00A8E8]"
          />
          
          {/* White Accent Layer */}
          <motion.div
            initial={{ x: '-100%', skewX: -40 }}
            animate={{ x: '0%', skewX: 0 }}
            exit={{ x: '100%', skewX: 40 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-[-10%] w-[120%] h-[120%] bg-white"
          />

          {/* Another Black Layer to reveal the new screen smoothly */}
          <motion.div
            initial={{ x: '-100%', skewX: -10 }}
            animate={{ x: '0%', skewX: 0 }}
            exit={{ x: '100%', skewX: 10 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-[-10%] w-[120%] h-[120%] bg-black"
          />
        </div>
      )}
    </AnimatePresence>
  );
}
