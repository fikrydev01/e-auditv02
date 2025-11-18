import React from "react";
import { useState } from "react";
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
  Users2Icon,
  UserSearch,
} from "lucide-react";
import { app_version, userDetail } from "../utils/api";

const SidebarSpi = ({ darkMode, sidebarOpen, setSidebarOpen }) => {
  const [openGroup, setOpenGroup] = useState(null);
  const role = userDetail?.role;
  const { pathname } = useLocation();

//   const role = 'spi';

  const menuSpi = [
    {
      title: "Consulting",
      icon: <MessageCircle size={24} className="text-purple-600" />,
      items: [
        { name: "Konsultasi", path: "/a/kons", role: "admin" },
        { name: "Konsultasi", path: "/k/kons", role: "ketua,sekretaris" },
        { name: "Kosultasi", path: "/s/konsrev", role: "spi" },
        { name: "Dumas", path: "/s/dumas", role: "spi" },
        { name: "Dumas", path: "/a/lap", role: "admin" },
        { name: "Dumas", path: "/k/lap", role: "ketua,sekretaris" },
      ],
    },
    {
      title: "Assurance",
      icon: <Shield size={24} className="text-blue-600" />,
      items: [
        { name: "Review Dokumen", path: "/a/revdok", role: "admin" },
        { name: "Review Dokumen", path: "/k/revdok", role: "ketua,sekretaris" },
        { name: "Review Dokumen", path: "/s/revdok", role: "spi" },
        { name: "Audit AO", path: "/a/audit", role: "admin" },
        { name: "Audit AO", path: "/k/audit", role: "ketua,sekretaris" },
        { name: "Audit AO", path: "/s/audit", role: "spi" },
        // { name: "Audit Barjas", path: "#", role: "admin" },
        // { name: "Audit Barjas", path: "#", role: "ketua,sekretaris" },
        // { name: "Audit Barjas", path: "#", role: "spi" },
        // { name: "Audit PDTT", path: "#", role: "admin" },
        // { name: "Audit PDTT", path: "#", role: "ketua,sekretaris" },
        // { name: "Audit PDTT", path: "#", role: "spi" },

        // { name: "Audit PDTT", path: "/a/audit-pdtt", role: "admin,spi" },
      ],
    },
    {
      title: "Monitoring & Evaluation",
      icon: <BarChart3 size={24} className="text-indigo-600" />,
      items: [
        // { name: "BMN", path: "/a/m-bmn", role: "admin,ketua,sekretaris" },
        { name: "SDM", path: "/a/msdm", role: "admin" },
        { name: "SDM", path: "/k/msdm", role: "ketua,sekretaris" },
        { name: "SDM", path: "/s/msdm", role: "spi" },
        { name: "Pengawasn", path: "/a/peng", role: "admin,ketua,sekretaris,spi" },
        { name: "Monev Keuangan", path: "/a/mkeu", role: "admin,ketua,sekretaris,spi" },
      ],
    },
    {
      title: "Internal Audit Management",
      icon: <Book size={24} className="text-orange-600" />,
      items: [
        { name: "PKPT", path: "/a/pkpt", role: "admin,ketua,sekretaris" },
        { name: "MR", path: "/a/mr", role: "admin,ketua,sekretaris" },
        { name: "Manajemen Resiko", path: "/a/mr", role: "admin" },
        { name: "Manajemen Resiko", path: "/k/mr", role: "ketua,sekretaris" },
        { name: "Manajemen Resiko", path: "/s/mr", role: "spi" },
        { name: "Manajemen No-Akademik", path: "/a/menoak", role: "admin" },
        { name: "Manajemen No-Akademik", path: "/k/menoak", role: "ketua,sekretaris" },
        { name: "Manajemen No-Akademik", path: "/s/menoak", role: "spi" },
      ],
    },
    // {
    //   title: "Administrator",
    //   icon: <Book size={24} className="text-orange-600" />,
    //   items: [
    //     { name: "PKPT", path: "/a/pkpt", role: "admin,ketua,sekeretaris" },
    //     { name: "MR", path: "/a/mr", role: "admin,ketua,sekeretaris" },
    //     { name: "Manajemen Resiko", path: "/a/mr", role: "admin" },
    //     { name: "Manajemen Resiko", path: "/k/mr", role: "ketua,sekeretaris" },
    //     { name: "Manajemen Resiko", path: "/s/mr", role: "spi" },
    //   ],
    // },
  ];

  // Filter menu berdasarkan role user
  const filteredMenuSpi = menuSpi.map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.role
        .toLowerCase()
        .split(",")
        .map(r => r.trim())
        .includes(role?.toLowerCase() || "")
    )
  })).filter(section => section.items.length > 0); // Hanya tampilkan section yang memiliki items

  const toggleGroup = (title) => {
    setOpenGroup(openGroup === title ? null : title);
  };

  return (
 <aside
      className={`fixed top-0 left-0 z-50 h-full w-64 
      bg-white/70 dark:bg-gray-900/80 
      backdrop-blur-2xl border-r border-slate-200 dark:border-gray-800
      shadow-lg shadow-purple-100/10
      transform transition-transform duration-300 ease-in-out lg:translate-x-0
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    `}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200/50 dark:border-gray-700/50">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent tracking-tight"
          >
            E-Audit SPI
          </motion.h2>
          <span className="bg-orange-500 text-xs text-white p-1 rounded-md">
            V.{app_version}

          </span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-pink-100/40 dark:hover:bg-gray-700 transition"
          >
            <X size={20} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-3">
          {/* Dashboard */}
          <Link
            to="/u/d"
            className={`flex items-center gap-3 py-2 px-3 rounded-lg text-sm font-semibold mb-2 transition-all duration-150 ${
              pathname === "/u/d"
                ? "bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 text-purple-700 dark:text-purple-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <LayoutDashboard className="text-red-500" />
            Dashboard
          </Link>

          {/* Groups */}
          {filteredMenuSpi.map((group) => (
            <div key={group.title} className="mb-3">
              <button
                onClick={() => toggleGroup(group.title)}
                className="flex justify-between items-center w-full py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-all"
              >
                <div className="flex items-center gap-2">
                  <motion.div whileHover={{ scale: 1.1 }}>
                    {group.icon}
                  </motion.div>
                  <span className="font-semibold text-slate-700 dark:text-slate-100 text-sm text-left">
                    {group.title}
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    openGroup === group.title ? "rotate-180" : ""
                  } text-gray-500 dark:text-gray-400`}
                />
              </button>

              {/* Dropdown */}
              <AnimatePresence>
                {openGroup === group.title && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-8 mt-2 space-y-1"
                  >
                    {group.items.map((item) => {
                      const isActive = pathname === item.path;
                      return (
                        <motion.div
                          key={item.path}
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Link
                            to={item.path}
                            className={`block px-2 py-1.5 text-sm rounded-md ${
                              isActive
                                ? "bg-purple-100 dark:bg-purple-800/40 text-purple-700 dark:text-purple-300 font-semibold"
                                : "text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/40"
                            }`}
                          >
                            {item.name}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
            {role === 'admin' && 
            
             <Link
            to="/a/users"
            className={`flex items-center gap-3 py-2 px-3 rounded-lg text-sm font-semibold mb-2 transition-all duration-150 ${
              pathname === "/u/d"
                ? "bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 text-purple-700 dark:text-purple-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <UserSearch className="text-red-500" />
            Manajemen User
          </Link>
            }
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-pink-50/40 to-purple-50/40 dark:from-gray-900/50 dark:to-gray-800/50">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <User className="w-10 h-10 text-pink-500 bg-pink-100 dark:bg-pink-900/40 dark:text-pink-300 rounded-full p-2" />
              <motion.span
                className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-900 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                {userDetail?.name || "Guest User"}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {userDetail?.role || "SPI"}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500 truncate">
                {userDetail?.email || "no-email@example.com"}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarSpi;