import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import SidebarSpi from "../components/SidebarSpi";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CredentialCheck from "./CredentialCheck";
import { Outlet } from "react-router";
import { userDetail } from "../utils/api";
import SidebarUser from "../components/SidebarUser";

const PrivateLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const user = userDetail;
  const role = user?.role;

  // Set dark mode
  useEffect(() => {
    const theme = localStorage.theme;
    const html = document.documentElement;
    if (theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
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

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <CredentialCheck>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-orange-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 flex">
        {/* Sidebar Overlay (Mobile) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        {role === "user" ? (
          <SidebarUser
            darkMode={darkMode}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        ) : (
          <SidebarSpi
            darkMode={darkMode}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        )}

        {/* Main Content Area */}
        <div
          className={`flex-1 transition-all duration-500 ease-in-out 
            ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"} `}
        >
          <Header
            scrolled={scrolled}
            setSidebarOpen={setSidebarOpen}
            darkMode={darkMode}
            handleDark={handleDark}
          />

          <main
            className={`px-4 py-6 w-full transition-all duration-500 ease-in-out
              ${sidebarOpen ? "translate-x-4" : "translate-x-0"}
            `}
          >
            <Outlet />
          </main>

          <Footer />
        </div>
      </div>
    </CredentialCheck>
  );
};

export default PrivateLayout;
