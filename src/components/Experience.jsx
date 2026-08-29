import React from 'react';
import { motion } from 'framer-motion';

const workData = [
  {
    company: 'PT PAL Indonesia',
    location: 'Surabaya, Indonesia',
    role: 'Auditor I (PKWT) - IT Support (SPI)',
    date: 'Jun 2025',
    desc: 'Auditor and IT Support at PT PAL Indonesia, within the Internal Audit Unit (SPI) division.'
  },
  {
    company: 'PT Bank Rakyat Indonesia (Persero) Tbk',
    location: 'Jakarta, Indonesia',
    role: 'Associate IT Project Officer',
    date: 'May 2024 - May 2025',
    desc: 'Product Tester for Core Banking.'
  },
  {
    company: 'PT Bank Rakyat Indonesia (Persero) Tbk',
    location: 'Jakarta, Indonesia',
    role: 'Internship',
    date: 'Mar 2024 - May 2024',
    desc: 'Conducting Testing Activities (SIT, UAT) on SDLC Projects. Updating Progress on SDLC Projects. Creating and Managing Test Documentation.'
  },
  {
    company: 'PT. Pertamina Gas OEJA',
    location: 'Surabaya, Indonesia',
    role: 'Internship',
    date: 'May 2021 - Jul 2021',
    desc: 'A 2-month mandatory internship program to help Maintenance Department create data processing tools.'
  }
];

const eduData = [
  {
    school: 'Institut Teknologi Sepuluh Nopember',
    degree: 'Bachelor of Computer Engineering',
    date: 'Jul 2018 - Mar 2023',
    score: 'GPA: 3.44/4.00'
  },
  {
    school: 'Alterra Academy',
    degree: 'Certificate in Frontend Fundamental (Vue.js)',
    date: 'Feb 2022 - Jul 2022',
    score: 'Score: 89.00/100.00'
  }
];

const orgData = [
  {
    org: 'Multimedia And Game Event (MAGE) ITS 5',
    role: 'Staff of Fundraising, Equipment & Logistic',
    date: 'Dec 2019 - Dec 2020',
    desc: 'Maintain relationships with sponsors and donors to secure funding. Providing and maintaining equipment/logistic.'
  },
  {
    org: 'ELECTICS Student Legislative',
    role: 'Staff',
    date: 'Feb 2020 - Feb 2021',
    desc: 'Overseeing ELECTICS Student Executive performance and capture student aspirations.'
  }
];

const SectionTitle = ({ title }) => (
  <div className="relative mb-8 mt-12 inline-block">
    <div className="bg-black text-white px-6 py-2 transform -skew-x-12 border-4 border-white shadow-[8px_8px_0px_var(--color-persona-yellow)] z-10 relative">
      <h2 className="p4-title text-3xl skew-x-12 uppercase">{title}</h2>
    </div>
  </div>
);

const TimelineItem = ({ item, isLeft }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`mb-10 w-full flex flex-col md:flex-row ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
    >
      <div className="w-full md:w-[45%] bg-white p-5 border-4 border-black shadow-[8px_8px_0px_black] transform transition-transform hover:scale-105 hover:-rotate-1 relative group cursor-default">
        {/* Decorative corner accent */}
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-[var(--color-persona-yellow)] border-2 border-black transform rotate-45 group-hover:bg-red-500 transition-colors"></div>

        <h3 className="font-black text-xl text-black uppercase border-b-4 border-black pb-2 mb-2">
          {item.company || item.school || item.org}
        </h3>
        <p className="font-bold text-[var(--color-persona-blue)] mb-1 text-sm">{item.date}</p>
        <p className="font-bold text-gray-800 mb-2">{item.role || item.degree}</p>
        
        {item.score && <span className="inline-block bg-[var(--color-persona-yellow)] text-black px-2 py-1 text-xs font-black mb-2 transform -skew-x-12"><div className="skew-x-12">{item.score}</div></span>}
        
        {item.desc && <p className="text-sm font-bold text-gray-700 leading-relaxed border-l-4 border-[var(--color-persona-orange)] pl-3">{item.desc}</p>}
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-4 md:px-8 relative z-10 min-h-screen">
      
      {/* Central Line for Desktop */}
      <div className="hidden md:block absolute left-1/2 top-24 bottom-10 w-2 bg-black transform -translate-x-1/2"></div>
      
      {/* Work Experience */}
      <div className="text-center md:text-left">
        <SectionTitle title="Career History" />
      </div>
      <div className="flex flex-col relative w-full">
        {workData.map((item, index) => (
          <TimelineItem key={`work-${index}`} item={item} isLeft={index % 2 === 0} />
        ))}
      </div>

      {/* Education */}
      <div className="text-center md:text-right mt-10">
        <SectionTitle title="Education" />
      </div>
      <div className="flex flex-col relative w-full">
        {eduData.map((item, index) => (
          <TimelineItem key={`edu-${index}`} item={item} isLeft={index % 2 !== 0} />
        ))}
      </div>

      {/* Organizations */}
      <div className="text-center md:text-left mt-10">
        <SectionTitle title="Organizations" />
      </div>
      <div className="flex flex-col relative w-full">
        {orgData.map((item, index) => (
          <TimelineItem key={`org-${index}`} item={item} isLeft={index % 2 === 0} />
        ))}
      </div>

    </div>
  );
};

export default Experience;
