import { Moon, Sun, Menu, X, Home, Info, Book, HelpCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WebHeader = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const theme = localStorage.theme;
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
      setDarkMode(true);
    } else if (theme === "light") {
      html.classList.remove("dark");
      setDarkMode(false);
    } else if (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      html.classList.add("dark");
      setDarkMode(true);
    } else {
      html.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  function handleDark() {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.remove("dark");
      localStorage.theme = "light";
      setDarkMode(false);
    } else {
      html.classList.add("dark");
      localStorage.theme = "dark";
      setDarkMode(true);
    }
  }

  return (
    <header className="sticky top-0 bg-white/80 dark:bg-gray-800 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 z-50">
      <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex gap-2 items-center">
          <img alt="logo" src="/assets/images/uinjkt_spi_blu_logo.png" width={70} />
          <a
            href="/"
            className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          >
            E-Audit
          </a>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-200">
          <a href="/" className="hover:text-indigo-600">
            Beranda
          </a>
          <a href="/tentang" className="hover:text-indigo-600">
            Tentang
          </a>
          <a href="#news" className="hover:text-indigo-600">
            Edukasi
          </a>
          <a href="#faq" className="hover:text-indigo-600">
            FAQ
          </a>
        </nav>

        {/* Action buttons */}
<div className="flex items-center gap-2">
      {/* Dark Mode Toggle */}
      <button
        onClick={handleDark}
        className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors"
      >
        {darkMode ? (
          <Sun size={20} className="text-yellow-400" />
        ) : (
          <Moon size={20} className="text-gray-800 dark:text-gray-100" />
        )}
      </button>

      {/* Login Button (desktop only) */}
      <a
        href="/auth/login"
        className="hidden md:flex px-3 py-2 rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-gray-700 duration-200 items-center font-medium shadow gap-2"
      >
        <img
          src="/assets/images/login-icon.png"
          alt="Login"
          className="w-5 h-5"
        />
        Login
      </a>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} className="text-gray-800 dark:text-gray-100" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={22} className="text-gray-800 dark:text-gray-100" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-4 absolute w-full min-h-screen"
          >
            <div className="flex flex-col gap-8 text-gray-700 dark:text-gray-200">
              <a href="/" className="flex items-center gap-2 hover:text-indigo-600">
                <Home size={18} /> Beranda
              </a>
              <a href="/tentang" className="flex items-center gap-2 hover:text-indigo-600">
                <Info size={18} /> Tentang
              </a>
              <a href="#news" className="flex items-center gap-2 hover:text-indigo-600">
                <Book size={18} /> Edukasi
              </a>
              <a href="#faq" className="flex items-center gap-2 hover:text-indigo-600">
                <HelpCircle size={18} /> FAQ
              </a>
              <a
                href="/auth/login"
                className="mt-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-center"
              >
                Login
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default WebHeader;
