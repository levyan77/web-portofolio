import React from 'react';
import { motion } from 'framer-motion';

const Navbar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'Stats' }
  ];

  return (
    <nav className="fixed bottom-0 md:bottom-auto md:top-1/4 left-0 md:left-auto md:right-0 w-full md:w-auto z-50 p-4 md:p-8 flex flex-row md:flex-col gap-2 md:gap-4 justify-center md:items-end pointer-events-none bg-gradient-to-t from-black/80 to-transparent md:bg-none">
      {tabs.map((tab, i) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="pointer-events-auto relative group flex items-center justify-center md:justify-end md:w-[300px]"
          >
            {/* The Revival Style Menu Item */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.1, x: -10, rotateZ: -2 }}
              className={`
                relative px-3 md:px-6 py-2 transition-colors duration-300 transform -skew-x-12
                ${isActive ? 'text-black' : 'text-white md:drop-shadow-[2px_2px_0px_#111] drop-shadow-[1px_1px_0px_#111] hover:text-[var(--color-persona-yellow)]'}
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="activeMenuBg"
                  className="absolute inset-0 bg-white border-2 border-black z-[-1] shadow-[4px_4px_0px_var(--color-persona-orange)] md:shadow-[8px_8px_0px_var(--color-persona-orange)]"
                  style={{ transform: "skewX(-10deg)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <span className="font-serif-p4 text-2xl md:text-4xl lg:text-5xl xl:text-6xl tracking-widest uppercase block skew-x-12">
                {tab.label}
              </span>
            </motion.div>
          </button>
        );
      })}
    </nav>
  );
};

export default Navbar;
