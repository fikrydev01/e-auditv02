import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  MessageCircle,
  Shield,
  BarChart3,
  Book,
  ChevronDown,
  User,
  X,
  LayoutDashboard,
  UserSearch,
  LandPlot,
  Archive,
} from "lucide-react";
import { app_version, userDetail } from "../utils/api";
import SidebarHeader from "./SidebarHeader";

const SidebarUser = ({ darkMode, sidebarOpen, setSidebarOpen }) => {
  const [openGroup, setOpenGroup] = useState(null);
  const [hovered, setHovered] = useState(false);
  const role = userDetail?.role;
  const { pathname } = useLocation();


  useEffect(() => {
    setSidebarOpen(hovered)
  }, [hovered])



  const toggleGroup = (title) => setOpenGroup(openGroup === title ? null : title);
  return (
    <motion.aside
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{ width: hovered ? 250 : 72 }}
      className={`fixed top-0 left-0 z-50 h-full 
        bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl 
        border-r border-slate-200 dark:border-gray-800 
        shadow-lg shadow-purple-100/10 
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 flex flex-col`}
    >


      <SidebarHeader hovered={hovered} setSidebarOpen={setSidebarOpen} />

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2">
        <Link
          to="/u/d"
          className={`flex items-center gap-3 py-2 px-3 rounded-md mb-1 transition ${
            pathname === "/u/d"
              ? "bg-purple-100/60 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
              : "hover:bg-slate-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300"
          }`}
        >
          <LayoutDashboard size={22} className="text-pink-500" />
          {hovered && <span className="text-sm font-semibold">Dashboard</span>}
        </Link>
        <Link
          to="/u/survei"
          className={`flex items-center gap-3 py-2 px-3 rounded-md mb-1 transition ${
            pathname === "/u/survei"
              ? "bg-purple-100/60 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
              : "hover:bg-slate-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300"
          }`}
        >
          <LandPlot size={22} className="text-pink-500" />
          {hovered && <span className="text-sm font-semibold">Survei</span>}
        </Link>
        <Link
          to="/u/wiki"
          className={`flex items-center gap-3 py-2 px-3 rounded-md mb-1 transition ${
            pathname === "/u/wiki"
              ? "bg-purple-100/60 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
              : "hover:bg-slate-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300"
          }`}
        >
          <Archive size={22} className="text-pink-500" />
          {hovered && <span className="text-sm font-semibold">Arsip SPI</span>}
        </Link>

        {/* {filteredMenuSpi.map((group) => (
          <div key={group.title} className="mb-2">
            <button
              onClick={() => toggleGroup(group.title)}
              className="flex justify-between items-center w-full py-2 px-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <div className="flex items-center  gap-3">
                {group.icon}
                {hovered && (
                  <span className="text-sm font-semibold text-slate-700 text-left dark:text-slate-200">
                    {group.title}
                  </span>
                )}
              </div>
              {hovered && (
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    openGroup === group.title ? "rotate-180" : ""
                  } text-gray-500 dark:text-gray-400`}
                />
              )}
            </button>

            <AnimatePresence>
              {openGroup === group.title && hovered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-9 mt-1 space-y-1"
                >
                  {group.items.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`block px-2 py-1.5 text-sm rounded-md text-left ${
                          isActive
                            ? "bg-purple-100 dark:bg-purple-800/40 text-purple-700 dark:text-purple-300 font-semibold"
                            : "text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-gray-100/40 dark:hover:bg-gray-800/30"
                        }`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))} */}

      </nav>

      {/* User Info */}
      <div className="p-3 border-t border-gray-200/50 dark:border-gray-700/50 flex items-center gap-3">
        <User className="w-9 h-9 text-pink-500 bg-pink-100 dark:bg-pink-900/40 rounded-full p-2" />
        {hovered && (
          <div className="flex flex-col text-xs">
            <span className="font-semibold text-gray-800 dark:text-gray-100">
              {userDetail?.name || "Guest User"}
            </span>
            <span className="text-gray-500 dark:text-gray-400 capitalize">
              {userDetail?.role || "SPI"}
            </span>
          </div>
        )}
      </div>
    </motion.aside>
  );
};

export default SidebarUser;
