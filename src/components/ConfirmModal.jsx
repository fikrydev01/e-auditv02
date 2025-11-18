// components/ConfirmModal.jsx
import { useState } from "react";
import ReactDOM from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export function showConfirm(message = "Apakah anda yakin?", yesText = "Ya", noText = "Tidak") {
  return new Promise((resolve) => {
    const modalRoot = document.createElement("div");
    document.body.appendChild(modalRoot);
    const root = ReactDOM.createRoot(modalRoot);

    const ConfirmModal = () => {
      const [open, setOpen] = useState(true);

      const cleanup = () => {
        setTimeout(() => {
          root.unmount();
          document.body.removeChild(modalRoot);
        }, 300);
      };

      const handleYes = () => {
        setOpen(false);
        resolve(true);
        cleanup();
      };

      const handleNo = () => {
        setOpen(false);
        resolve(false);
        cleanup();
      };

      return (
        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl max-w-xl text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <motion.div
                  className="flex justify-center mb-4"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                >
                  <AlertTriangle size={60} className="text-red-500" />
                </motion.div>
                <p className="text-gray-800 dark:text-gray-100 mb-4 font-semibold">
                  {message}
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                    onClick={handleYes}
                  >
                    {yesText}
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 dark:text-white hover:bg-gray-400"
                    onClick={handleNo}
                  >
                    {noText}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      );
    };

    root.render(<ConfirmModal />);
  });
}
