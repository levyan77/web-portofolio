import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="min-h-[80vh] flex flex-col justify-center items-start relative mt-10"
    >
      <div className="absolute top-10 right-10 opacity-10 pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 100 100" className="animate-[spin_20s_linear_infinite]">
          <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="black" />
        </svg>
      </div>

      <motion.div 
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
        className="bg-black text-white p-6 md:p-10 border-8 border-white shadow-[15px_15px_0px_var(--color-persona-orange)] transform -rotate-2 relative z-10"
      >
        <h1 className="p4-title text-5xl md:text-8xl font-black mb-2 tracking-tighter leading-none">
          ACHMAD PAHLEVY'S <br/>
          <span className="text-[var(--color-persona-yellow)]">PORTFOLIO</span>
        </h1>
        <p className="font-bold text-xl md:text-2xl uppercase tracking-widest mt-4">
          BROADCASTING DIGITAL SOLUTIONS
        </p>
      </motion.div>
      
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 ml-4 md:ml-12 flex flex-col gap-6"
      >
        <div className="bg-white text-black p-4 inline-block font-black text-xl md:text-2xl transform skew-x-[-15deg] shadow-[5px_5px_0px_black] border-2 border-black w-max">
          <div className="skew-x-[15deg]">
            IT PROJECT OFFICER // QUALITY ASSURANCE // AUDITOR
          </div>
        </div>

        <div className="flex gap-4">
          <a href="https://www.linkedin.com/in/achmad-pahlevy/" target="_blank" rel="noreferrer" className="bg-black text-white p-2 md:px-6 font-bold uppercase transform -skew-x-12 border-2 border-white hover:bg-[#0a66c2] transition-colors shadow-[3px_3px_0px_var(--color-persona-blue)]">
            <div className="skew-x-12">LinkedIn</div>
          </a>
          <a href="mailto:pahlevyan@gmail.com" className="bg-[var(--color-persona-yellow)] text-black p-2 md:px-6 font-bold uppercase transform -skew-x-12 border-2 border-black hover:bg-white transition-colors shadow-[3px_3px_0px_black]">
            <div className="skew-x-12">Email Me</div>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
