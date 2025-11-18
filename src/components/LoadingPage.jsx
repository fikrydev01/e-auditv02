import { motion } from "framer-motion";

export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      {/* Spinner */}
      <motion.div
        className="relative w-20 h-20"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 1.2,
        }}
      >
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-r-transparent border-blue-500" />
        {/* Inner Ring */}
        <div className="absolute inset-2 rounded-full border-4 border-b-transparent border-l-transparent border-purple-500" />
      </motion.div>

      {/* Loading Text */}
      <motion.p
        className="mt-6 text-xl font-bold text-gray-700 tracking-wide"
        initial={{ y: 0, opacity: 0.6 }}
        animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.6] }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
        }}
      >
        Loading...
      </motion.p>
    </div>
  );
}
