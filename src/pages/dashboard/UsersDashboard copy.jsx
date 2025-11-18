import React from "react";
import {
  FileText,
  PlusCircle,
  MessageCircle,
  DownloadCloud,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SliderComp from "../../components/SliderComp";
import DashboardCards from "../../components/DashboardCard";
import Chatbot from "../../components/ChatBot";

const UsersDashboard = () => {
  const cards = [
    // Laporan
    {
      title: "Tambah Dumas",
      description: "Laporkan permasalahan yang Anda alami dengan cepat dan.",
      icon: <PlusCircle className="w-8 h-8 text-green-500" />,
      href: "/u/act/lap/add",
      bg: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Status Dumas",
      description: "Lihat semua laporan yang telah Anda buat.",
      icon: <FileText className="w-8 h-8 text-green-500" />,
      href: "/u/act/lap/list",
      bg: "bg-green-50 dark:bg-green-900/20",
    },

    // Konsultasi
    {
      title: "Tambah Konsultasi",
      description: "Ajukan konsultasi untuk permasalahan tertentu.",
      icon: <PlusCircle className="w-8 h-8 text-purple-500" />,
      href: "/u/act/kons/add",
      bg: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      title: "Status Konsultasi",
      description: "Pantau riwayat konsultasi yang pernah Anda ajukan.",
      icon: <MessageCircle className="w-8 h-8 text-purple-500" />,
      href: "/u/act/kons/list",
      bg: "bg-purple-50 dark:bg-purple-900/20",
    },

    // Review Dokumen
    {
      title: "Permohonan Review Dokumen",
      description: "Ajukan dokumen untuk direview oleh tim.",
      icon: <PlusCircle className="w-8 h-8 text-pink-500" />,
      href: "/u/act/revdok/add",
      bg: "bg-pink-50 dark:bg-pink-900/20",
    },
    {
      title: "Status Review Dokumen",
      description: "Lihat daftar permohonan review dokumen Anda.",
      icon: <DownloadCloud className="w-8 h-8 text-pink-500" />,
      href: "/u/act/revdok/list",
      bg: "bg-pink-50 dark:bg-pink-900/20",
    },
  ];

  return (
    <section className="section-container">


  <div className="section-body flex flex-col lg:flex-row gap-8">
    
    {/* Left: Cards */}
    <div className="flex flex-row lg:flex-col gap-6 lg:gap-8 w-full lg:w-2/3">
    <SliderComp />
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
      {cards.map((card, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <Link
            to={card.href}
            className={`flex flex-col justify-between h-full rounded-3xl border border-gray-200 dark:border-gray-700 p-6 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ${card.bg}`}
          >
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-white dark:bg-gray-800 shadow-sm group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {card.title}
                </h2>
                {/* <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {card.description}
                </p> */}
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>

    </div>

    {/* Right: Slider */}
    <div className="flex flex-col gap-4 w-full lg:w-1/3">
      {/* <SliderComp /> */}
      {/* <DashboardCards /> */}
      <Chatbot />
    </div>

  </div>


    </section>
  );
};

export default UsersDashboard;
