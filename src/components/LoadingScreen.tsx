import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#020617]">
      
      {/* Glow */}
      <div className="absolute h-72 w-72 rounded-full bg-[#0A84FF]/20 blur-3xl" />

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Ícone */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="mb-6 rounded-3xl border border-[#0A84FF]/20 bg-[#0A84FF]/10 p-6 text-[#0A84FF]"
        >
          <Cpu size={50} />
        </motion.div>

        {/* Nome */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-black tracking-wide text-white"
        >
          Ford Experience
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{
            delay: 0.5,
            duration: 1,
          }}
          className="mt-4 text-sm tracking-[0.3em] text-slate-400"
        >
          POWERED BY AUTOPULSE AI
        </motion.p>

        {/* Barra */}
        <div className="mt-10 h-1 w-64 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="h-full w-1/2 bg-[#0A84FF]"
          />
        </div>
      </div>
    </div>
  );
}