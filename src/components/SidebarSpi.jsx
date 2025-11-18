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
} from "lucide-react";
import { app_version, userDetail } from "../utils/api";
import SidebarHeader from "./SidebarHeader";

const SidebarSpi = ({ darkMode, sidebarOpen, setSidebarOpen }) => {
  const [openGroup, setOpenGroup] = useState(null);
  const [hovered, setHovered] = useState(false);
  const role = userDetail?.role;
  const { pathname } = useLocation();


  useEffect(() => {
    setSidebarOpen(hovered)
  }, [hovered])

  const menuSpi = [
    {
      title: "Consulting",
      icon: <MessageCircle size={22} className="text-purple-600" />,
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
      icon: <Shield size={22} className="text-blue-600" />,
      items: [
        { name: "Review Dokumen", path: "/a/revdok", role: "admin" },
        { name: "Review Dokumen", path: "/k/revdok", role: "ketua,sekretaris" },
        { name: "Review Dokumen", path: "/s/revdok", role: "spi" },
        { name: "Audit Internal", path: "/a/audit", role: "admin" },
        { name: "Auditor", path: "/s/audit", role: "spi" },
        { name: "Audit AO", path: "/k/auditao", role: "ketua,sekretaris" },
        { name: "Audit BARJAS", path: "/k/auditbarjas", role: "ketua,sekretaris" },
        { name: "Audit PDTT", path: "/k/auditpdtt", role: "ketua,sekretaris" },
      ],
    },
    {
      title: "Monitoring & Evaluation",
      icon: <BarChart3 size={22} className="text-indigo-600" />,
      items: [
        { name: "SDM", path: "/a/msdm", role: "admin" },
        { name: "SDM", path: "/k/msdm", role: "ketua,sekretaris" },
        { name: "SDM", path: "/s/msdm", role: "spi" },
        { name: "Pengawasan", path: "/a/peng", role: "admin,ketua,sekretaris,spi" },
        { name: "Monev Keuangan", path: "/a/mkeu", role: "admin,ketua,sekretaris,spi" },
      ],
    },
    {
      title: "Internal Audit Management",
      icon: <Book size={22} className="text-orange-600" />,
      items: [
        { name: "PKPT", path: "/a/pkpt", role: "admin,ketua,sekretaris" },
        // { name: "Manajemen Resiko", path: "/s/mr", role: "spi" },
        // { name: "Manajemen No-Akademik", path: "/s/menoak", role: "spi" },
        // { name: "MR", path: "/a/mr", role: "admin,ketua,sekretaris" },
        { name: "Manajemen Resiko", path: "/a/mr", role: "admin" },
        { name: "Manajemen Resiko", path: "/k/mr", role: "ketua,sekretaris" },
        { name: "Manajemen Resiko", path: "/s/mr", role: "spi" },
        { name: "Manajemen No-Akademik", path: "/a/menoak", role: "admin" },
        { name: "Manajemen No-Akademik", path: "/k/menoak", role: "ketua,sekretaris" },
        { name: "Manajemen No-Akademik", path: "/s/menoak", role: "spi" },
      ],
    },
  ];

  const filteredMenuSpi = menuSpi
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        item.role
          .toLowerCase()
          .split(",")
          .map((r) => r.trim())
          .includes(role?.toLowerCase() || "")
      ),
    }))
    .filter((section) => section.items.length > 0);

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
      {/* Header */}
      {/* <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-700/50">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          className="text-xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent"
        >
          E-Audit SPI
        </motion.h2>
        <X
          size={20}
          className={`text-gray-600 dark:text-gray-300 cursor-pointer lg:hidden ${
            !hovered ? "hidden" : "block"
          }`}
          onClick={() => setSidebarOpen(false)}
        />
      </div> */}

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

        {filteredMenuSpi.map((group) => (
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
        ))}

        {role === "admin" && (
          <Link
            to="/a/users"
            className={`flex items-center gap-3 py-2 px-3 rounded-md mb-1 transition ${
              pathname === "/a/users"
                ? "bg-purple-100/60 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                : "hover:bg-slate-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300"
            }`}
          >
            <UserSearch size={22} className="text-red-500" />
            {hovered && <span className="text-sm font-semibold">Manajemen User</span>}
          </Link>
        )}
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

export default SidebarSpi;
