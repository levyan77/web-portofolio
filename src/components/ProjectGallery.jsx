import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float, ContactShadows, Environment, Html, useTexture } from '@react-three/drei';

import * as THREE from 'three';

// Mengabaikan warning deprecation internal dari pustaka React Three Fiber yang belum update ke r160+
const originalWarn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === 'string' && (
    args[0].includes('THREE.Clock') || 
    args[0].includes('PCFSoftShadowMap') ||
    args[0].includes('cannot be represented accurately in double precision')
  )) {
    return;
  }
  originalWarn(...args);
};

const projectsData = [
  {
    id: 1,
    title: "Mini Project Alta",
    description: (
      <>
        Proyek front-end yang dibuat menggunakan <span className="text-black bg-[var(--color-persona-yellow)] px-1">Nuxt.js</span> (Vue.js framework) untuk <span className="text-[var(--color-persona-orange)] uppercase font-black">Alterra Academy</span>. Menggunakan <span className="text-white bg-blue-600 px-1 rounded-sm">Hasura GraphQL</span> dan NewsAPI untuk mengambil data berita gaming dan statistik karakter.
      </>
    ),
    link: "https://github.com/levyan77/miniProjectAlta",
    demo: "https://miniprojectalta.vercel.app",
    image: "./alta-preview.png",
    color: "#dc2626", // Red
  },
  {
    id: 2,
    title: "Hospital Management",
    description: (
      <>
        Front-End Web untuk <span className="text-black bg-[var(--color-persona-yellow)] px-1">Sistem Manajemen Rumah Sakit</span> (Group 34). Dibangun untuk menangani pendaftaran pasien, jadwal dokter, dan <span className="text-[var(--color-persona-blue)] font-black">rekam medis</span>.
      </>
    ),
    link: "https://github.com/Hospital-Management-System-Group-34/FE-Web",
    demo: "https://hospital-management-demo.vercel.app",
    color: "#2563eb", // Blue
  },
  {
    id: 3,
    title: "TemanPintar-SPI",
    description: (
      <>
        Sistem Informasi Enterprise untuk digitalisasi manajemen audit internal di <span className="text-white bg-[#00529C] px-1 rounded-sm">PT PAL Indonesia</span>. Dibangun dengan <span className="text-black bg-[var(--color-persona-yellow)] px-1">Laravel, Livewire, & Alpine.js</span>. Dilengkapi fitur Papan Kanban interaktif, integrasi <span className="text-[var(--color-persona-blue)] font-black">Telegram Webhook</span>, dan Asisten <span className="text-[var(--color-persona-orange)] uppercase font-black">AI Gemini</span>.
      </>
    ),
    link: "https://github.com/levyan77/temanpintar-spi",
    demo: "https://temanpintar-demo.vercel.app",
    color: "#16a34a", // Green
  },
  {
    id: 4,
    title: "Ninja Kita Levy",
    description: (
      <>
        Proyek interaktif / game berbasis web atau aplikasi profil bertema <span className="text-[var(--color-persona-orange)] uppercase font-black">Ninja</span>. Menampilkan kemampuan styling dan interaksi DOM dasar.
      </>
    ),
    link: "https://github.com/levyan77/NinjaKitaLevy",
    demo: "https://ninjakita-levy.vercel.app",
    color: "#9333ea", // Purple
  },
  {
    id: 5,
    title: "Word Generator",
    description: (
      <>
        Aplikasi web sederhana untuk men-generate <span className="text-[var(--color-persona-blue)] font-black">kata sandi</span>, lorem ipsum, atau kata acak. Sangat berguna untuk kebutuhan <span className="text-black bg-[var(--color-persona-yellow)] px-1">testing</span> atau utilitas harian.
      </>
    ),
    link: "https://github.com/levyan77/wordGenerator",
    demo: "https://word-generator-levy.vercel.app",
    color: "#ea580c", // Orange
  },
  {
    id: 6,
    title: "BudgetKu",
    description: (
      <>
        Aplikasi <span className="text-black bg-[var(--color-persona-yellow)] px-1">PWA</span> pencatatan keuangan pribadi dengan UI <span className="text-[var(--color-persona-blue)] font-black">Glassmorphism</span>. Dilengkapi fitur <span className="text-[var(--color-persona-orange)] uppercase font-black">Voice/NLP</span> untuk pencatatan cerdas, sistem keamanan ganda (Google Auth & PIN), serta manajemen multi-rekening. Dibangun dengan <span className="text-black bg-white px-1 border-2 border-black font-black">Vanilla JS</span> dan Firebase Firestore.
      </>
    ),
    link: "#",
    demo: "https://akunting-fd7b4.web.app/",
    image: "./budgetku-preview.png",
    color: "#ca8a04", // Yellow
  }
];

// Reusable 3D Card Component
const ProjectCard3D = ({ project, index, total, onClick, isMobile }) => {
  const meshRef = useRef();
  // Arrange items in a circle
  const radius = 5;
  const angle = (index / total) * Math.PI * 2;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  useFrame((state) => {
    // Optional: make them slowly rotate or bob if Float isn't enough
  });

  return (
    <group position={[x, 0, z]} rotation={[0, angle, 0]}>
      <Float speed={2.5} rotationIntensity={0.2} floatIntensity={1.5} floatingRange={[-0.2, 0.2]}>
        <mesh 
          ref={meshRef}
          onClick={(e) => { 
            e.stopPropagation(); 
            // Mencegah klik ganda: Buka detail jika kursor sedang terkunci (FPS) ATAU jika pengguna menggunakan layar sentuh (Mobile)
            if (document.pointerLockElement || isMobile) {
              onClick(project); 
            }
          }}
          onPointerOver={() => document.body.style.cursor = 'pointer'}
          onPointerOut={() => document.body.style.cursor = 'auto'}
          castShadow
          position={[0, 1.5, 0]}
        >
          {/* A Box resembling a TV / Screen */}
          <boxGeometry args={project.size || [3.8, 2.4, 0.2]} />
          {/* Persona style bright materials */}
          <meshStandardMaterial color={project.color} roughness={0.2} metalness={0.5} />
          
          {/* Layar Hitam Dasar (DEPAN) */}
          <mesh position={[0, 0, 0.1]}>
            <planeGeometry args={project.screenSize || [3.6, 2.2]} />
            <meshBasicMaterial color="#111" />
          </mesh>
          {/* Layar Hitam Dasar (BELAKANG) */}
          <mesh position={[0, 0, -0.1]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={project.screenSize || [3.6, 2.2]} />
            <meshBasicMaterial color="#111" />
          </mesh>

          {/* Jika ada gambar preview, tampilkan sebagai layar TV (DEPAN & BELAKANG) */}
          {project.image ? (
            <>
              <mesh position={[0, 0, 0.11]}>
                <planeGeometry args={project.screenSize || [3.6, 2.2]} />
                <meshBasicMaterial map={useTexture(project.image)} />
              </mesh>
              <mesh position={[0, 0, -0.11]} rotation={[0, Math.PI, 0]}>
                <planeGeometry args={project.screenSize || [3.6, 2.2]} />
                <meshBasicMaterial map={useTexture(project.image)} />
              </mesh>
            </>
          ) : null}

          {/* Nameplate Base (Papan nama hitam di atas TV) */}
          <mesh position={[0, 1.5, 0]}>
            <boxGeometry args={[3.6, 0.4, 0.1]} />
            <meshBasicMaterial color="#111" />
          </mesh>

          {/* Title Text (DEPAN) */}
          <Text
            position={[0, 1.5, 0.06]}
            fontSize={0.25}
            color="white"
            anchorX="center"
            anchorY="middle"
            maxWidth={3.5}
            textAlign="center"
          >
            {project.title.toUpperCase()}
          </Text>

          {/* Title Text (BELAKANG) */}
          <Text
            position={[0, 1.5, -0.06]}
            rotation={[0, Math.PI, 0]}
            fontSize={0.25}
            color="white"
            anchorX="center"
            anchorY="middle"
            maxWidth={3.5}
            textAlign="center"
          >
            {project.title.toUpperCase()}
          </Text>
        </mesh>
      </Float>

      {/* Base/Pedestal */}
      <mesh position={[0, -0.4, 0]} receiveShadow>
        <cylinderGeometry args={[0.8, 1, 0.5, 32]} />
        <meshStandardMaterial color="#2d2d2d" />
      </mesh>
    </group>
  );
};

// 3D Scene Assembly
const Scene = ({ setActiveProject, isMobile }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffe400" />

      {/* Projects */}
      {projectsData.map((project, i) => (
        <ProjectCard3D 
          key={project.id} 
          project={project} 
          index={i} 
          total={projectsData.length} 
          onClick={setActiveProject}
          isMobile={isMobile}
        />
      ))}

      {/* Lighting sebagai pengganti Environment agar tidak bergantung pada koneksi luar */}
      <ambientLight intensity={0.8} />

      {/* Floor with shadows */}
      <ContactShadows position={[0, -0.6, 0]} opacity={0.5} scale={20} blur={2} far={4} />
      <mesh position={[0, -0.65, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#ffe400" roughness={0.8} />
      </mesh>
    </>
  );
};


// WASD Controls Hook
const usePlayerControls = () => {
  const [movement, setMovement] = useState({ forward: false, backward: false, left: false, right: false });
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Allow Alt key to exit pointer lock
      if (e.key === 'Alt') {
        e.preventDefault();
        document.exitPointerLock();
        return;
      }

      switch(e.code) {
        case 'KeyW': case 'ArrowUp': setMovement(m => ({...m, forward: true})); break;
        case 'KeyS': case 'ArrowDown': setMovement(m => ({...m, backward: true})); break;
        case 'KeyA': case 'ArrowLeft': setMovement(m => ({...m, left: true})); break;
        case 'KeyD': case 'ArrowRight': setMovement(m => ({...m, right: true})); break;
        default: break;
      }
    };
    const handleKeyUp = (e) => {
      switch(e.code) {
        case 'KeyW': case 'ArrowUp': setMovement(m => ({...m, forward: false})); break;
        case 'KeyS': case 'ArrowDown': setMovement(m => ({...m, backward: false})); break;
        case 'KeyA': case 'ArrowLeft': setMovement(m => ({...m, left: false})); break;
        case 'KeyD': case 'ArrowRight': setMovement(m => ({...m, right: false})); break;
        default: break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  
  return movement;
};

// Doom First-Person Player
import { PointerLockControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

const DoomPlayer = ({ isPaused }) => {
  const { forward, backward, left, right } = usePlayerControls();
  const { camera } = useThree();
  const speed = 0.15;
  const direction = new THREE.Vector3();
  const frontVector = new THREE.Vector3();
  const sideVector = new THREE.Vector3();

  // Reset camera height for 1st person
  useEffect(() => {
    camera.position.set(0, 1.5, 5);
  }, [camera]);

  useFrame(() => {
    if (isPaused) return; // Hentikan pergerakan WASD jika game sedang di-pause (modal terbuka)

    frontVector.set(0, 0, (backward ? 1 : 0) - (forward ? 1 : 0));
    sideVector.set((left ? 1 : 0) - (right ? 1 : 0), 0, 0);
    
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(speed);
    direction.applyEuler(camera.rotation);
    
    camera.position.x += direction.x;
    camera.position.z += direction.z;
    // Keep camera at fixed eye level
    camera.position.y = 1.5; 
  });

  // Jika sedang di-pause (modal terbuka), cabut kontrol kamera agar mouse bisa bergerak bebas
  return !isPaused ? <PointerLockControls /> : null;
};

const ProjectGallery = ({ isActive }) => {
  const [activeProject, setActiveProject] = useState(null);

  // Deteksi Mobile / Layar Sentuh
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
    };
    setIsMobile(checkMobile());
  }, []);

  // Paksa kursor muncul saat modal terbuka
  useEffect(() => {
    if (activeProject) {
      if (document.pointerLockElement) {
        document.exitPointerLock();
      }
      document.body.style.cursor = 'default';
    }
  }, [activeProject]);

  return (
    <div className="py-10 flex flex-col items-center w-full relative h-[80vh] min-h-[600px]">
      
      {/* Header Overlay */}
      <div className="absolute top-0 left-4 md:left-10 z-10 pointer-events-none">
        <div className="inline-block bg-black text-white px-8 py-3 transform -skew-x-12 border-4 border-white shadow-[8px_8px_0px_#ff7b00] mt-10">
          <h2 className="p4-title text-2xl md:text-4xl skew-x-12">PROJECT SHOWCASE</h2>
        </div>
        <div className="mt-4 flex flex-col gap-2 pointer-events-auto items-start">
          <div className="bg-white border-2 border-black px-4 py-1 text-xs md:text-sm font-bold shadow-[4px_4px_0px_#000]">
            {isMobile ? "Usap layar (Swipe) untuk melihat sekeliling." : "Gunakan W A S D untuk berjalan. Klik layar untuk mengunci kamera."}
          </div>
          {!isMobile && (
            <div className="bg-white border-2 border-black px-4 py-1 text-xs md:text-sm font-bold shadow-[4px_4px_0px_#000]">
              Tekan ALT (kiri spasi) atau ESC untuk memunculkan kursor.
            </div>
          )}
        </div>
      </div>

      {/* Crosshair */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-2xl z-20 pointer-events-none">
        +
      </div>

      {/* 3D Canvas */}
      <div className="w-full h-full border-8 border-black shadow-[15px_15px_0px_#0088cc] rounded-xl overflow-hidden cursor-move relative z-0">
        <Canvas shadows={{ type: THREE.PCFShadowMap }} camera={{ position: [0, 2, 10], fov: 60 }}>
          <Suspense fallback={null}>
            <Scene setActiveProject={setActiveProject} isMobile={isMobile} />
          </Suspense>
          {isActive && !isMobile && <DoomPlayer isPaused={!!activeProject} />}
          {isActive && isMobile && <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2 + 0.1} minPolarAngle={Math.PI / 3} target={[0, 1.5, 0]} />}
        </Canvas>
      </div>

      {/* Project Detail Modal Overlay */}
      <AnimatePresence>
        {activeProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 z-40 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 20 }}
              className="w-full max-w-2xl bg-white border-4 border-black shadow-[10px_10px_0px_#ffe400] p-1 pointer-events-auto"
            >
            <div className="border-4 border-double border-black p-6 flex flex-col md:flex-row gap-6 h-full relative">
              <button 
                onClick={() => setActiveProject(null)}
                className="absolute -top-5 -right-5 bg-red-600 text-white w-12 h-12 text-xl font-bold border-4 border-black hover:bg-red-700 rounded-full z-50 transform hover:scale-110 transition-transform"
              >
                X
              </button>
              
                <div className="flex-1 flex flex-col">
                  <h3 className="font-serif-p4 text-2xl md:text-3xl uppercase mb-3 leading-tight">
                    <span className="bg-black text-[#ffe400] px-2 mr-2 inline-block mb-1 md:mb-0">PROJECT:</span> 
                    {activeProject.title}
                  </h3>
                  <p className="font-bold text-lg md:text-xl leading-relaxed mb-8 text-gray-800 flex-grow">
                    {activeProject.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                    <a href={activeProject.link} target="_blank" rel="noreferrer" className="bg-black text-white font-bold py-3 sm:py-2 px-2 md:px-6 hover:bg-[#ff7b00] transition-colors border-2 border-black uppercase text-sm transform -skew-x-12 w-full text-center">
                      <div className="skew-x-12">View Source</div>
                    </a>
                    <a href={activeProject.demo} target="_blank" rel="noreferrer" className="bg-black text-[#ffe400] font-bold py-3 sm:py-2 px-2 md:px-6 hover:bg-[#ff7b00] hover:text-white transition-colors border-2 border-black uppercase text-sm transform -skew-x-12 w-full text-center">
                      <div className="skew-x-12">Live Demo</div>
                    </a>
                  </div>
                </div></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectGallery;
