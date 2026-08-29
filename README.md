# 🎮 Achmad Pahlevy's Interactive Portfolio

A highly interactive, mobile-responsive personal portfolio website themed after the iconic UI of **Persona 4**. This project pushes the boundaries of a standard web resume by blending standard web technologies with **3D WebGL** environments, fluid animations, and a unique broadcast/investigation aesthetic.

![Achmad Pahlevy Portfolio Preview](https://img.shields.io/badge/Theme-Persona_4_Revival-ffe400?style=for-the-badge&labelColor=111111)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Key Features

- **3D Project Gallery (FPS & Orbit Mode)**
  Explore projects inside a 3D WebGL room built with @react-three/fiber. On desktop, navigate using classic **W A S D** FPS controls. On mobile/touch devices, the system intelligently falls back to **Orbit Controls** allowing users to swipe to look around and tap to interact.
- **Dynamic Mobile Responsiveness**
  Every component is strictly optimized for smartphones. Features include an Auto-Fit Bottom Navbar, flex-wrapping skewed boxes, and a smart **Auto-Hide Side Navigation** in the History tab that disappears when scrolling and elegantly slides back when idle.
- **Rich Thematic UI & Animations**
  Powered by ramer-motion and custom CSS, the UI heavily utilizes skewed containers (	ransform skew), CRT scanline overlays, moving marquees, and dramatic high-contrast color palettes (Black, Yellow, Orange) inspired by Persona 4.
- **Interactive Data Visualization**
  The "Stats" menu utilizes echarts to render a dynamic Radar/Spider chart visualizing core technical competencies (Software QA, Front-end, DB, etc.).

## 🛠️ Tech Stack

- **Framework:** React.js (Vite)
- **3D Rendering:** Three.js, React Three Fiber, Drei
- **Styling:** Tailwind CSS, Custom CSS Variables
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Icons:** React Icons

## 🚀 Getting Started

To run this project locally, make sure you have Node.js installed.

1. **Clone the repository:**
   `ash
   git clone https://github.com/levyan77/web-portofolio.git
   cd web-portofolio
   `

2. **Install dependencies:**
   `ash
   npm install
   `

3. **Start the development server:**
   `ash
   npm run dev
   `
   Open http://localhost:5173 (or the provided port) in your browser.

## 🏗️ Deployment

This project is configured to be easily deployed. To build the production files:
`ash
npm run build
`
You can deploy the resulting dist folder to GitHub Pages, Vercel, or Firebase Hosting. 

---
*Broadcasting Digital Solutions. Built with ☕ and passion by Achmad Pahlevy.*
