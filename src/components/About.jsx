import React from 'react';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

const statsData = [
  { subject: 'FRONT-END', A: 95, fullMark: 100 },
  { subject: 'BACK-END', A: 90, fullMark: 100 },
  { subject: 'DATABASE', A: 85, fullMark: 100 },
  { subject: 'INTEGRASI API', A: 95, fullMark: 100 },
  { subject: 'ARSITEKTUR', A: 90, fullMark: 100 },
];

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="py-10 flex flex-col md:flex-row gap-10 items-center justify-start min-h-[70vh]"
    >
      <div className="w-full md:w-1/2 flex justify-center relative">
        {/* Decorative background behind radar */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-orange-500 rounded-full blur-3xl opacity-50 -z-10"></div>
        
        <div className="bg-black text-white p-6 md:p-10 border-4 border-white shadow-[15px_15px_0px_var(--color-persona-blue)] transform rotate-1 w-full max-w-md">
          <h2 className="font-serif-p4 text-5xl mb-6 text-center text-[var(--color-persona-yellow)]">Social Stats</h2>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={statsData}>
                <PolarGrid stroke="#666" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'white', fontSize: 12, fontWeight: 'bold' }} />
                <Radar name="You" dataKey="A" stroke="var(--color-persona-yellow)" fill="var(--color-persona-orange)" fillOpacity={0.8} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 p-8 bg-white border-4 border-black transform -rotate-1 shadow-[15px_15px_0px_black] relative z-10">
        <h2 className="font-black text-4xl mb-4 uppercase text-black">Profile Overview</h2>
        <div className="w-20 h-3 bg-black mb-6 transform -skew-x-12"></div>
        <p className="font-bold text-xl leading-relaxed mb-4 text-gray-800">
          Halo! Saya adalah seorang <span className="text-[var(--color-persona-orange)] uppercase font-black">Full-Stack Web Developer</span> yang berpengalaman merancang sistem dari skala *mini-project* hingga level *enterprise*.
        </p>
        <p className="font-bold text-xl leading-relaxed mb-4 text-gray-800">
          Senjata utama saya mencakup ekosistem <span className="text-black bg-[var(--color-persona-yellow)] px-1">PHP (Laravel, Livewire)</span>, framework modern <span className="text-black bg-[var(--color-persona-yellow)] px-1">JavaScript (Nuxt.js, Alpine.js)</span>, serta infrastruktur cloud & API (Firebase, Hasura GraphQL, AI Gemini).
        </p>
        <p className="font-bold text-xl leading-relaxed text-gray-800">
          Mulai dari mendigitalisasi siklus audit di BUMN, meracik front-end rumah sakit, hingga membuat bot interaktif — saya selalu siap mengeksekusi misi selanjutnya!
        </p>
      </div>
    </motion.div>
  );
};

export default About;
