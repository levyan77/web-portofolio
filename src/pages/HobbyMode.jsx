import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function HobbyMode() {
  const [ghData, setGhData] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/users/levyan77')
      .then(res => res.json())
      .then(data => setGhData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="w-full text-white min-h-screen relative z-20 px-4 pt-24 pb-24 md:p-8 md:pt-24">
      {/* Dynamic P3 Background Water/Dots Effect */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#050505]">
        {/* Diagonal scanlines */}
        <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,#00A8E8,#00A8E8_2px,transparent_2px,transparent_15px)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(0,168,232,0.2)_0%,_transparent_60%)]"></div>
        
        {/* Persona shapes */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -right-32 w-[600px] h-[600px] border-[60px] border-[#00A8E8]/10 rounded-full"
        />
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-10 text-[10rem] text-[#00A8E8]/5 font-black italic select-none leading-none -rotate-12"
        >
          RELOAD
        </motion.div>
        
        {/* Floating crosshairs */}
        <div className="absolute top-1/4 left-[10%] text-[#00A8E8]/30 font-mono tracking-[1em] text-xl">+ + +</div>
        <div className="absolute bottom-1/3 right-[10%] text-[#00A8E8]/30 font-mono tracking-[1em] text-xl">+ + +</div>
      </div>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-8 max-w-6xl mx-auto"
      >
        <div className="relative pl-6 md:pl-8 py-4 mb-8">
           {/* Angled vertical bar */}
           <div className="absolute top-0 left-0 w-3 md:w-4 h-full bg-[#00A8E8] transform skew-x-[-15deg]"></div>
           <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase text-white drop-shadow-[5px_5px_0_#00A8E8] relative z-10">
             ME TIME
           </h1>
           {/* Horizontal underline fade */}
           <div className="absolute bottom-2 left-6 md:left-8 w-2/3 h-[3px] bg-gradient-to-r from-[#00A8E8] to-transparent"></div>
           <p className="text-[#00A8E8] font-bold tracking-widest uppercase mt-3 transform skew-x-[-10deg] ml-2 md:text-xl">
             ► Gaming & Hobbies
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Steam Card */}
          <motion.div whileHover={{ scale: 1.02 }} 
            className="lg:col-span-2 bg-gradient-to-br from-[#1b2838] to-[#2a475e] border-2 border-[#66c0f4]/50 p-6 md:p-8 relative overflow-hidden group shadow-[5px_5px_0_rgba(102,192,244,0.3)] flex flex-col md:flex-row gap-6 items-center md:items-start"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)' }}
          >
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#171a21]/50 rounded-full group-hover:bg-[#66c0f4]/10 transition-all duration-500 scale-150 group-hover:scale-100"></div>
            
            {/* Avatar & Header */}
            <div className="flex flex-col items-center gap-3 shrink-0 relative z-10">
               <div className="w-32 h-32 md:w-40 md:h-40 border-4 border-[#66c0f4] p-1 bg-[#171a21] shadow-[4px_4px_0_#66c0f4] transform -skew-x-6 group-hover:skew-x-0 transition-transform duration-300">
                  <img src="./steam-avatar.png" alt="Nizama Avatar" className="w-full h-full object-cover transform skew-x-6 group-hover:skew-x-0 transition-transform duration-300" />
               </div>
               <div className="text-center mt-2">
                  <h2 className="text-2xl md:text-3xl font-black italic text-white flex items-center justify-center gap-2 drop-shadow-[2px_2px_0_#66c0f4]">Nizama</h2>
                  <p className="text-sm font-bold text-[#66c0f4] tracking-widest uppercase mt-1">Lev 🇮🇩 Indonesia</p>
               </div>
            </div>

            {/* Stats */}
            <div className="flex-1 w-full flex flex-col gap-4 z-10 justify-center h-full mt-4 md:mt-0">
               <div className="flex justify-between items-center bg-[#171a21] p-3 md:p-4 border-l-4 border-[#66c0f4] shadow-[4px_4px_0_rgba(0,0,0,0.5)] transform skew-x-[-5deg]">
                  <span className="font-bold text-white uppercase tracking-wider skew-x-[5deg]">Steam Level</span>
                  <div className="w-12 h-12 border-2 border-[#66c0f4] rounded-full flex items-center justify-center font-black text-xl text-white skew-x-[5deg] shadow-[0_0_10px_#66c0f4]">28</div>
               </div>

               <div className="grid grid-cols-2 gap-3 text-sm text-gray-300 mt-2">
                  <div className="bg-[#171a21]/80 p-3 border-b-2 border-white/10 flex flex-col items-center justify-center">
                    <span className="text-xs uppercase tracking-widest text-[#66c0f4]">Badges</span>
                    <span className="text-2xl text-white font-black italic">25</span>
                  </div>
                  <div className="bg-[#171a21]/80 p-3 border-b-2 border-white/10 flex flex-col items-center justify-center">
                    <span className="text-xs uppercase tracking-widest text-[#66c0f4]">Games</span>
                    <span className="text-2xl text-white font-black italic">142</span>
                  </div>
               </div>

               <div className="bg-gradient-to-r from-[#8b0000] to-[#4a0000] p-4 rounded border border-red-500/30">
                  <p className="text-xs text-white/70 mb-1 font-bold">Steam Replay 2025</p>
                  <div className="flex justify-between items-end">
                     <div>
                        <span className="text-3xl font-black text-white">118</span><span className="text-sm text-white/80 ml-1">Sessions</span>
                     </div>
                     <div>
                        <span className="text-3xl font-black text-white">36</span><span className="text-sm text-white/80 ml-1">Achievements</span>
                     </div>
                  </div>
               </div>
               
               <a href="https://steamcommunity.com/id/nizama/" target="_blank" rel="noreferrer" className="block mt-2 text-center bg-[#2a475e] text-white font-bold py-2 hover:bg-[#66c0f4] transition-colors uppercase text-sm">View Full Profile</a>
            </div>
          </motion.div>

          {/* Discord Card */}
          <motion.div whileHover={{ scale: 1.02 }} 
            className="bg-[#1e1f22] p-6 md:p-8 border-t-4 border-[#5865F2] shadow-[-5px_5px_0_rgba(88,101,242,0.3)] flex flex-col gap-6 relative group"
            style={{ clipPath: 'polygon(30px 0, 100% 0, 100% 100%, 0 100%, 0 30px)' }}
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#5865F2]/5 rounded-bl-full pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>

            {/* Profile Section */}
            <div className="flex items-center gap-4 relative z-10">
              <div className="relative">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-[#5865F2] shadow-[0_0_10px_#5865F2]">
                  <img src="./discord-avatar.png" alt="Discord Avatar" className="w-full h-full object-cover" />
                </div>
                {/* Status indicator */}
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-[#1e1f22] rounded-full shadow-[0_0_5px_#22c55e]"></div>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-black italic text-white drop-shadow-[2px_2px_0_#5865F2]">levy77</h2>
                <div className="flex gap-2 mt-2">
                  <span className="bg-[#2b2d31] text-[#dbdee1] text-[10px] md:text-xs px-2 py-1 uppercase tracking-widest font-bold border-l-2 border-[#5865F2]">Active</span>
                  <span className="bg-[#2b2d31] text-[#dbdee1] text-[10px] md:text-xs px-2 py-1 uppercase tracking-widest font-bold">Since May 2016</span>
                </div>
              </div>
            </div>

            <hr className="border-[#2b2d31]" />

            {/* Connections */}
            <div className="relative z-10">
              <h3 className="text-xs uppercase tracking-widest font-bold text-[#b5bac1] mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#5865F2] inline-block transform rotate-45"></span>
                Connections
              </h3>
              <div className="flex flex-col gap-3">
                 <div className="flex items-center justify-between bg-[#2b2d31] p-3 border-l-2 border-white group-hover:border-[#5865F2] transition-colors">
                    <div className="flex items-center gap-3">
                       <span className="text-xl">🐙</span>
                       <span className="font-bold text-[#dbdee1]">GitHub</span>
                    </div>
                    <span className="text-sm text-[#949ba4] font-medium">levyan77</span>
                 </div>
                 <div className="flex items-center justify-between bg-[#2b2d31] p-3 border-l-2 border-[#66c0f4] group-hover:border-[#5865F2] transition-colors">
                    <div className="flex items-center gap-3">
                       <span className="text-xl">🎮</span>
                       <span className="font-bold text-[#dbdee1]">Steam</span>
                    </div>
                    <span className="text-sm text-[#949ba4] font-medium">Nizama</span>
                 </div>
                 <div className="flex items-center justify-between bg-[#2b2d31] p-3 border-l-2 border-[#107c10] group-hover:border-[#5865F2] transition-colors">
                    <div className="flex items-center gap-3">
                       <span className="text-xl">❌</span>
                       <span className="font-bold text-[#dbdee1]">Xbox</span>
                    </div>
                    <span className="text-sm text-[#949ba4] font-medium">n1zama</span>
                 </div>
                 <div className="flex items-center justify-between bg-[#2b2d31] p-3 border-l-2 border-[#ff0000] group-hover:border-[#5865F2] transition-colors">
                    <div className="flex items-center gap-3">
                       <span className="text-xl">▶️</span>
                       <span className="font-bold text-[#dbdee1]">YouTube</span>
                    </div>
                    <span className="text-sm text-[#949ba4] font-medium">nizeboi gudboi</span>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* YouTube Card */}
          <motion.div whileHover={{ scale: 1.02 }} className="bg-[#0f0f0f] border-2 border-[#272727] p-6 relative overflow-hidden shadow-[0_0_15px_rgba(255,0,0,0.1)] rounded-xl">
            <h2 className="text-lg font-bold text-gray-300 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-red-600 rounded-full"></span> YouTube
            </h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center overflow-hidden border border-gray-600">
                <span className="text-3xl">📎</span>
              </div>
              <div>
                <p className="font-bold text-lg text-white">nizeboi gudboi</p>
                <p className="text-xs text-gray-400">@nizeboigudboi1893 • 1 sub</p>
              </div>
            </div>
            
            <div className="bg-[#272727] rounded-lg overflow-hidden">
               <div className="aspect-video bg-gray-800 relative flex items-center justify-center group-hover:bg-gray-700 transition overflow-hidden">
                  <img src="https://img.youtube.com/vi/4d6x1CIgLSc/hqdefault.jpg" alt="Video Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" />
                  <span className="text-white text-4xl opacity-80 z-10 drop-shadow-lg">▶</span>
                  <div className="absolute bottom-1 right-1 bg-black/80 px-1 text-xs text-white z-10">0:57</div>
               </div>
               <div className="p-3">
                  <p className="text-sm font-bold text-white truncate">winnable</p>
                  <p className="text-xs text-gray-400">65 views • 4 years ago</p>
               </div>
            </div>
          </motion.div>

          {/* GitHub Card (Auto-Fetched) */}
          <motion.div whileHover={{ scale: 1.02 }} className="md:col-span-2 lg:col-span-2 bg-[#0d1117] border-2 border-[#30363d] p-6 relative overflow-hidden rounded-xl">
            <h2 className="text-lg font-bold text-gray-300 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-white rounded-full"></span> GitHub
            </h2>
            {ghData ? (
              <div className="flex items-center gap-6">
                <img src={ghData.avatar_url} alt="GitHub" className="w-20 h-20 rounded-full border border-[#30363d]" />
                <div className="flex-1">
                  <p className="font-bold text-2xl text-white">{ghData.login}</p>
                  <p className="text-sm text-gray-400 mb-3">{ghData.bio || 'Software Developer'}</p>
                  <div className="flex gap-4 text-sm text-gray-300">
                     <span><strong className="text-white">{ghData.public_repos}</strong> Repositories</span>
                     <span><strong className="text-white">{ghData.followers}</strong> Followers</span>
                  </div>
                </div>
                <a href="https://github.com/levyan77" target="_blank" rel="noreferrer" className="hidden md:block bg-[#238636] text-white px-4 py-2 rounded-md font-bold hover:bg-[#2ea043] transition">Follow</a>
              </div>
            ) : (
              <p className="animate-pulse text-gray-400">Loading Data...</p>
            )}
          </motion.div>
        </div>

        {/* --- GAME LIBRARY SECTION --- */}
        <div className="mt-12">
          <div className="mt-12 mb-6">
            <div className="relative inline-block pl-6 md:pl-8 py-2">
              <div className="absolute top-0 left-0 w-3 h-full bg-red-600 transform skew-x-[-15deg]"></div>
              <h3 className="text-3xl md:text-4xl font-black italic text-white drop-shadow-[3px_3px_0_#dc2626] uppercase">
                Game Activity & Library
              </h3>
              <div className="absolute bottom-0 left-6 md:left-8 w-full h-[2px] bg-gradient-to-r from-red-600 to-transparent"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: 'Dota 2', stat: '37% Playtime • 5d ago', tag: 'Favorite Game', color: 'from-red-900/90 to-black', border: 'border-red-500', image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570/header.jpg' },
              { name: 'Ys IX: Monstrum Nox', stat: 'Favorite', tag: 'Steam Favorite', color: 'from-purple-900/90 to-black', border: 'border-purple-500', image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1351630/header.jpg' },
              { name: 'Arknights', stat: '5d ago', tag: 'In Rotation', color: 'from-blue-900/90 to-black', border: 'border-blue-500', image: './games/arknights.jpg' },
              { name: 'ARKNIGHTS: ENDFIELD', stat: '4w ago', tag: 'In Rotation', color: 'from-gray-700/90 to-black', border: 'border-gray-400', image: './games/endfield.jpg' },
              { name: 'Honkai: Star Rail', stat: '6d ago', tag: 'In Rotation', color: 'from-pink-900/90 to-black', border: 'border-pink-500', image: './games/hsr.jpg' },
              { name: 'Genshin Impact', stat: '2w ago', tag: 'In Rotation', color: 'from-emerald-900/90 to-black', border: 'border-emerald-500', image: './games/genshin.jpg' },
              { name: 'Zenless Zone Zero', stat: '6d ago', tag: 'In Rotation', color: 'from-yellow-600/90 to-black', border: 'border-yellow-500', image: './games/zzz.jpg' },
              { name: 'Uma Musume Pretty Derby', stat: '24% Playtime', tag: 'Steam Replay', color: 'from-green-600/90 to-black', border: 'border-green-500', image: './games/uma.jpg' },
              { name: 'Marvel Rivals', stat: '24% Playtime', tag: 'Steam Replay', color: 'from-blue-600/90 to-black', border: 'border-blue-400', image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2767030/header.jpg' },
              { name: 'DRAGON BALL: Sparking! ZERO', stat: '8% Playtime', tag: 'Steam Replay', color: 'from-orange-600/90 to-black', border: 'border-orange-500', image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1790600/header.jpg' },
              { name: 'Counter-Strike', stat: '3% Playtime', tag: 'Steam Replay', color: 'from-yellow-800/90 to-black', border: 'border-yellow-600', image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/10/header.jpg' },
            ].map((game, i) => (
               <motion.div 
                 key={i} 
                 whileHover={{ y: -5, scale: 1.03 }}
                 className={`relative group cursor-pointer aspect-[4/5] md:aspect-video flex flex-col justify-end p-4 shadow-xl transition-all duration-300`}
                 style={{
                   clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' // P3 corner cut
                 }}
               >
                 {/* Outer Border Layer */}
                 <div className={`absolute inset-0 border-2 ${game.border} opacity-50 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none`}
                      style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' }}
                 ></div>
                 
                 {/* Image Background */}
                 <div className="absolute inset-0 z-0 bg-black">
                   <img src={game.image} alt={game.name} className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out" />
                   {/* Gradient Overlay for text readability */}
                   <div className={`absolute inset-0 bg-gradient-to-t ${game.color} opacity-90 group-hover:opacity-50 transition-opacity duration-300`}></div>
                 </div>
                 
                 {/* Content */}
                 <div className="relative z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                   <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider bg-white text-black px-2 py-1 transform -skew-x-12 inline-block mb-2 shadow-[2px_2px_0_#00A8E8] group-hover:shadow-[2px_2px_0_#fff]">
                     {game.tag}
                   </span>
                   <h4 className="font-black italic text-white leading-tight drop-shadow-md text-base md:text-lg">{game.name}</h4>
                   <p className="text-xs text-[#00A8E8] mt-1 drop-shadow font-semibold tracking-widest uppercase">{game.stat}</p>
                 </div>
                 
                 {/* Diagonal scanline overlay on hover */}
                 <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,#fff_2px,#fff_4px)] transition-opacity duration-300 pointer-events-none"></div>
               </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
