import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AiLoading = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  const loadingTexts = [
    "Read trained model ...",
    "Read module external ...",
    "Processing data ...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 1500); // Ganti text setiap 1.5 detik

    return () => clearInterval(interval);
  }, [loadingTexts.length]);

  return (
    <div className="">
      <div className="bg-orange-200 dark:bg-gray-800 rounded-2xl shadow-2xl w-full px-2 py-2">
        {/* Spinner */}


        {/* Text Container */}
        <div className="h-fit flex items-center w-full justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTextIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-center"
            >
              <p className="text-gray-700 dark:text-gray-300 text-sm font-semibold">
                {loadingTexts[currentTextIndex]}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AiLoading;