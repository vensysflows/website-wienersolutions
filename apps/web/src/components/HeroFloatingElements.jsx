import React from 'react';
import { motion } from 'framer-motion';

const elements = [
  {
    id: 1,
    type: 'image',
    src: 'https://horizons-cdn.hostinger.com/2314c244-5eaf-486e-830c-fb369cb94cbd/84ccb6d9b52a5a4a567a66fc60f6667b.png',
    alt: 'n8n logo',
    position: 'top-[8%] left-[5%] md:top-[15%] md:left-[10%]',
    delay: 0,
    duration: 5
  },
  {
    id: 2,
    type: 'text',
    text: 'Sichere KI garantiert ✅',
    position: 'top-[12%] right-[5%] md:top-[25%] md:right-[10%]',
    delay: 1.5,
    duration: 6
  },
  {
    id: 3,
    type: 'text',
    text: 'DSGVO konform 🔒',
    position: 'bottom-[15%] left-[5%] md:bottom-[25%] md:left-[15%]',
    delay: 0.8,
    duration: 5.5
  }
];

const HeroFloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {elements.map((el) => {
        return (
          <motion.div
            key={el.id}
            className={`absolute ${el.position} w-max`}
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: el.delay
            }}
          >
            <div className="glass-panel px-3 py-2 md:px-4 md:py-3 rounded-2xl flex items-center space-x-3 pointer-events-auto hover:bg-white/10 transition-colors cursor-default shadow-lg scale-90 md:scale-100">
              {el.type === 'image' ? (
                <img 
                  src={el.src} 
                  alt={el.alt} 
                  className="h-5 md:h-6 w-auto object-contain"
                />
              ) : (
                <span className="font-medium text-xs md:text-sm text-foreground/90 whitespace-nowrap">
                  {el.text}
                </span>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default HeroFloatingElements;