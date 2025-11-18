import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  Users,
  Settings,
  BarChart3,
  Activity,
  FileText,
  Moon,
  Sun,
  Bell,
  Search,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PrivateLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Set dark mode on mount from localStorage
  useEffect(() => {
    const theme = localStorage.theme;
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
      setDarkMode(true);
    } else if (theme === "light") {
      html.classList.remove("dark");
      setDarkMode(false);
    } else if (
      !theme &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      html.classList.add("dark");
      setDarkMode(true);
    } else {
      html.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);
  // Toggle dark mode
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
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { icon: Home, label: "Home", active: true },
    { icon: Users, label: "Users" },
    { icon: BarChart3, label: "Analytics" },
    { icon: Activity, label: "Activity" },
    { icon: FileText, label: "Reports" },
    { icon: Settings, label: "Settings" },
  ];

  const statsCards = [
    {
      title: "Total Users",
      value: "12,345",
      change: "+12%",
      color: "from-pink-400 to-purple-400",
    },
    {
      title: "Revenue",
      value: "$45,678",
      change: "+8%",
      color: "from-blue-400 to-cyan-400",
    },
    {
      title: "Orders",
      value: "1,234",
      change: "+23%",
      color: "from-green-400 to-teal-400",
    },
    {
      title: "Growth",
      value: "89%",
      change: "+5%",
      color: "from-orange-400 to-pink-400",
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        darkMode={darkMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <Header
          scrolled={scrolled}
          setSidebarOpen={setSidebarOpen}
          darkMode={darkMode}
          handleDark={handleDark}
        />

        {/* Main Content Area */}
        <main className=" mx-auto px-4 py-6 space-y-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-2">Welcome back, Admin!</h2>
            <p className="opacity-90">
              Here's what's happening with your dashboard today.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsCards.map((card, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-200/30 dark:border-gray-700/30"
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${card.color} mb-4 flex items-center justify-center`}
                >
                  <BarChart3 size={24} className="text-white" />
                </div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {card.title}
                </h3>
                <p className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                  {card.value}
                </p>
                <span className="text-sm text-green-600 dark:text-green-400">
                  {card.change}
                </span>
              </div>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Activity Chart */}
            <div className="lg:col-span-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-pink-200/30 dark:border-gray-700/30">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Activity Overview
                </h3>
                <Activity className="text-purple-500" size={24} />
              </div>
              <div className="h-64 bg-gradient-to-t from-pink-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Chart Placeholder
                </p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-pink-200/30 dark:border-gray-700/30">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 p-3 rounded-xl bg-pink-50/50 dark:bg-gray-700/50"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-400"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800 dark:text-white">
                        User Action {item}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        2 minutes ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-pink-200/30 dark:border-gray-700/30">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Reports
              </h3>
              <div className="space-y-3">
                {["Monthly Report", "User Analytics", "Sales Summary"].map(
                  (report, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-xl bg-pink-50/50 dark:bg-gray-700/50 hover:bg-pink-100/50 dark:hover:bg-gray-600/50 transition-colors cursor-pointer"
                    >
                      <span className="text-gray-700 dark:text-gray-300">
                        {report}
                      </span>
                      <FileText size={16} className="text-purple-500" />
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    icon: Users,
                    label: "Add User",
                    color: "from-blue-400 to-cyan-400",
                  },
                  {
                    icon: FileText,
                    label: "New Report",
                    color: "from-green-400 to-teal-400",
                  },
                  {
                    icon: Settings,
                    label: "Settings",
                    color: "from-purple-400 to-pink-400",
                  },
                  {
                    icon: BarChart3,
                    label: "Analytics",
                    color: "from-orange-400 to-red-400",
                  },
                ].map((action, index) => (
                  <button
                    key={index}
                    className={`p-4 rounded-2xl bg-gradient-to-r ${action.color} text-white hover:scale-105 transition-transform duration-200 shadow-lg`}
                  >
                    <action.icon size={20} className="mx-auto mb-2" />
                    <p className="text-sm font-medium">{action.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Extra content for scrolling demonstration */}
          <div className="h-96 card-green p-8 rounded-xl">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Extended Content
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              This section demonstrates the scrollable content area. The header
              will show shadow effect when you scroll down. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div className="card-default">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              User Table
            </h3>

            <div className="overflow-x-auto">
              <table className="table-default">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Amanda Lee</td>
                    <td>amanda@example.com</td>
                    <td>Admin</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>John Doe</td>
                    <td>john@example.com</td>
                    <td>User</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Maria Smith</td>
                    <td>maria@example.com</td>
                    <td>Editor</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* Footer */}
    <Footer />
      </div>
    </div>
  );
};

export default PrivateLayout;
