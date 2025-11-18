import React from "react";
import * as LucideIcons from "lucide-react";
import { menuItem } from "../utils/menu";
import { app_version, userDetail } from "../utils/api";
import { useLocation, Link } from "react-router-dom";

const role = userDetail?.role || "";


const Sidebar = ({ darkMode, sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
const menuuser = menuItem.filter((it) =>
  it.role
    .toLowerCase()
    .split(",")
    .map(r => r.trim())   // hapus spasi ekstra
    .includes(role.toLowerCase())
);

  return (
    <aside
      className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white/80 dark:bg-gray-800/80 
        backdrop-blur-xl border-r border-pink-200/50 dark:border-gray-700/50
        transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center justify-between w-full">
          <h2 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            E-Audit SPI
          </h2>
             <span className="bg-orange-500 text-xs text-white p-1 rounded-md">
                      V.{app_version}
          
                    </span>

          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-pink-100 dark:hover:bg-gray-700 transition-colors"
          >
            <LucideIcons.X size={20} className={darkMode ? "text-white" : "text-gray-800"} />
          </button>
        </div>

        {/* Navigation Menu (scrollable) */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scroll">
          {menuuser.map((item, index) => {
            const Icon = LucideIcons[item.icon];
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={index}
                to={item.path}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200
                  ${
                    isActive
                      ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-200 shadow-md"
                      : "text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-gray-700 hover:text-red-600 dark:hover:text-red-400"
                  }
                `}
              >
                {Icon && <Icon size={20} />}
                <span className="font-medium">{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Slider */}
        {/* Bottom User Info */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            {/* User Icon */}
            <LucideIcons.User className="w-10 h-10 text-pink-500 bg-pink-100 dark:bg-pink-900/40 dark:text-pink-300 rounded-full p-2" />

            {/* User Details */}
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                {userDetail?.name || "Guest User"}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {userDetail?.role || "No Role"}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500 truncate max-w-[150px]">
                {userDetail?.email || "no-email@example.com"}
              </span>
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;
