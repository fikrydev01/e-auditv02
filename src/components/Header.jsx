import React, { useState } from "react";
import { Menu, Bell, Sun, Moon, Search, User, Settings, LogOut, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { logout, userDetail } from "../utils/api";

const Header = ({ scrolled, setSidebarOpen, darkMode, handleDark }) => {
  const [open, setOpen] = useState(false);
  const user = userDetail
  return (
    <header
      className={`
        sticky top-0 z-30 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl 
        border-b border-pink-200/50 dark:border-gray-700/50 transition-all duration-300
        ${scrolled ? "shadow-lg shadow-pink-100 dark:shadow-gray-900/50" : ""}
      `}
    >
      <div className="flex items-center justify-between px-4 py-4">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-pink-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Menu size={20} className={darkMode ? "text-white" : "text-gray-800"} />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              // src="./assets/image/uinjkt_spi_blu_logo.png" // ganti dengan path logo kamu
              src="/assets/images/logo-uinjkt.png"
              alt="Logo"
              className=" h-10 rounded-lg shadow-sm"
            />
            <h1 className="text-xl font-bold text-gray-800 dark:text-white capitalize">
              {userDetail?.role} Panel
            </h1>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 relative">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-pink-100/50 dark:bg-gray-700/50 rounded-2xl">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-sm text-gray-600 dark:text-gray-300"
            />
          </div>

          {/* Notifications */}
          {/* <button className="p-2 rounded-lg hover:bg-pink-100 dark:hover:bg-gray-700 transition-colors relative">
            <Bell size={20} className={darkMode ? "text-white" : "text-gray-800"} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
          </button> */}

          {/* Dark Mode Toggle */}
          <button
            onClick={handleDark}
            className="p-2 rounded-lg hover:bg-pink-100 dark:hover:bg-gray-700 transition-colors"
          >
            {darkMode ? (
              <Sun size={20} className="text-white" />
            ) : (
              <Moon size={20} className="text-gray-800" />
            )}
          </button>

          {/* User Dropdown (Hover) */}
          <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-pink-100 dark:bg-gray-700 hover:bg-pink-200 dark:hover:bg-gray-600 transition"
            >
              <User className="w-5 h-5 text-pink-500 dark:text-gray-200" />
              <ChevronDown
                className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                    {user?.role !="user" && 
                    
                    <li>
                      <a
                        href="/u/profil"
                        className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-pink-50 dark:hover:bg-gray-700 transition"
                      >
                        <User className="w-4 h-4" /> Profile
                      </a>
                    </li>
                    
                    }
                    {/* <li>
                      <a
                        href="#settings"
                        className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-pink-50 dark:hover:bg-gray-700 transition"
                      >
                        <Settings className="w-4 h-4" /> Settings
                      </a>
                    </li> */}
                    <li>
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-gray-700 transition"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
