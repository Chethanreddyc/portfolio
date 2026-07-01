import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const words = [
  "Hello",       // English
  "Hola",        // Spanish
  "Bonjour",     // French
  "Ciao",        // Italian
  "こんにちは",   // Japanese
  "Hallo",       // German
  "你好",        // Chinese
  "नमस्ते",       // Hindi
  "Olá",         // Portuguese
  "안녕",        // Korean
  "Hello"        // Final Hello
];

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index === words.length - 1) {
      // Pause on the final "Hello" to let it be readable, then complete
      const timeout = setTimeout(() => {
        onComplete();
      }, 650);
      return () => clearTimeout(timeout);
    }

    const interval = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 500); // 280ms between languages allows reading them clearly

    return () => clearTimeout(interval);
  }, [index, onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center">
        {/* Apple style centered typography greeting screen */}
        <div className="h-24 w-[300px] sm:w-[400px] flex items-center justify-center relative">
          <AnimatePresence>
            <motion.h1
              key={words[index]}
              initial={{ y: 35, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -35, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.215, 0.61, 0.355, 1] }}
              className="absolute text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight font-sans flex items-center gap-3 select-none text-center whitespace-nowrap"
            >
              {/* Sleek animating pulsing indicator dot */}
              <span className="inline-block w-3 h-3 rounded-full bg-[#B497CF] shadow-[0_0_12px_#B497CF] animate-pulse self-center" />
              {words[index]}
            </motion.h1>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
