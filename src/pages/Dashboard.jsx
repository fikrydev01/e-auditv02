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
import { ButtonSpinner, ButtonSubmit, Ladong } from "../components/ButtonComp";
import { userDetail } from "../utils/api";

import UsersDashboard from "./dashboard/UsersDashboard";
import AdminDashboard from "./dashboard/AdminDashboard";
import SpiDashboard from "./dashboard/SpiDashboard";


const Dashboard = () => {

  const role = userDetail?.role
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
    <section className="section-container">
      
                {/* Welcome Section */}
<div className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-3xl p-10 text-white shadow-lg flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
  {/* Left Content */}
  <div className="max-w-lg z-10">
    <h2 className="text-4xl font-bold mb-3 drop-shadow-sm">
      Welcome back, {userDetail.name}!
    </h2>
    <p className="opacity-90 text-lg leading-relaxed">
      Here's what's happening with your dashboard today.
    </p>
  </div>

  {/* Right Image */}
  <div className="mt-6 md:mt-0 md:ml-8">
    <img
      alt="welcome"
      src="/assets/images/welcome.png"
      className="w-60 md:w-72 lg:w-80 drop-shadow-xl animate-pulse"
    />
  </div>

  {/* Decorative circles */}
  <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
  <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-white/10 rounded-full blur-2xl"></div>
</div>

{role === 'user' ? 
          <UsersDashboard /> :

  role === 'spi' ?
  <div className="flex flex-col">
    <AdminDashboard />
    <SpiDashboard />

  </div>
  : 
  <AdminDashboard />
}


    </section>
  )
}

export default Dashboard