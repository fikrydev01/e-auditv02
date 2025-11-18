import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function SidebarHeader({ hovered, setSidebarOpen }) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-700/50">
      <AnimatePresence mode="wait">
        {hovered ? (
          <motion.h2
            key="full"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            className="text-xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent"
          >
            E-Audit SPI
          </motion.h2>
        ) : (
          <motion.div
            key="short"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="px-3 py-2 text-xs rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold shadow-md"
          >
            EAudit
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tombol close (hanya muncul jika hover true) */}
      <X
        size={20}
        className={`text-gray-600 dark:text-gray-300 cursor-pointer lg:hidden transition-opacity duration-300 ${
          hovered ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />
    </div>
  );
}
