import React from "react";
import { FileText, PlusCircle, MessageCircle, DownloadCloud } from "lucide-react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import SliderComp from "../../../components/SliderComp";
import ListAktifitas from "./aktifitas/ListAktifitas";

const Aktifitas = () => {
  const cards = [
  // Laporan
  {
    title: "Tambah Laporan",
    description: "Laporkan permasalahan yang Anda alami dengan cepat.",
    icon: <PlusCircle className="w-8 h-8 text-green-500" />,
    href: "/u/act/lap/add",
    bg: "bg-green-50 dark:bg-green-900/20",
  },
  {
    title: "Daftar Laporan",
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
    title: "Daftar Konsultasi",
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
    title: "Daftar Review Dokumen",
    description: "Lihat daftar permohonan review dokumen Anda.",
    icon: <DownloadCloud className="w-8 h-8 text-pink-500" />,
    href: "/u/act/revdok/list",
    bg: "bg-pink-50 dark:bg-pink-900/20",
  },
];


  return (
    <section className="section-container">
      <Breadcrumbs title="Aktifitas Users" />
      <SliderComp />
      <div className="section-body">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {cards.map((card, idx) => (
          <Link
            key={idx}
            to={card.href}
            className={`group rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-all duration-300 ${card.bg}`}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-sm group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 group-hover:text-pink-600 dark:group-hover:text-pink-400">
                  {card.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {card.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      </div>

    </section>
  );
};

export default Aktifitas;
