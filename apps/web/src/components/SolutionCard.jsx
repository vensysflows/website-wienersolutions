import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SolutionCard = ({ title, beforeContent, afterContent, delay = 0 }) => {
  const [isAutomated, setIsAutomated] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className="glass-card rounded-2xl flex flex-col h-full overflow-hidden relative group"
    >
      {/* Subtle background glow based on state */}
      <div 
        className={`absolute inset-0 opacity-10 transition-colors duration-500 pointer-events-none ${
          isAutomated ? 'bg-green-500' : 'bg-orange-500'
        }`}
      />

      <div className="p-6 md:p-8 flex-grow flex flex-col relative z-10">
        <h3 className="text-xl md:text-2xl font-bold mb-6 text-foreground">{title}</h3>

        {/* Custom Toggle Switch */}
        <div className="flex items-center justify-center bg-black/40 p-1.5 rounded-xl mb-8 border border-white/10">
          <button
            onClick={() => setIsAutomated(false)}
            className={`relative flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              !isAutomated ? 'text-white' : 'text-muted-foreground hover:text-white/80'
            }`}
          >
            {!isAutomated && (
              <motion.div
                layoutId={`active-bg-${title}`}
                className="absolute inset-0 bg-orange-500/20 border border-orange-500/50 rounded-lg"
                initial={false}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <span className="text-xs">🔴</span> Manuell
            </span>
          </button>
          <button
            onClick={() => setIsAutomated(true)}
            className={`relative flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              isAutomated ? 'text-white' : 'text-muted-foreground hover:text-white/80'
            }`}
          >
            {isAutomated && (
              <motion.div
                layoutId={`active-bg-${title}`}
                className="absolute inset-0 bg-green-500/20 border border-green-500/50 rounded-lg"
                initial={false}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <span className="text-xs">🟢</span> Automatisiert
            </span>
          </button>
        </div>

        {/* Content Area */}
        <div className="relative flex-grow">
          <AnimatePresence mode="wait">
            {!isAutomated ? (
              <motion.div
                key="manual"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <ul className="space-y-4">
                  {beforeContent.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                      <XCircle className="w-5 h-5 text-orange-500/70 shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : (
              <motion.div
                key="automated"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <ul className="space-y-4">
                  {afterContent.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-foreground/90">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default SolutionCard;