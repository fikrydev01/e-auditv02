import { motion } from "framer-motion";
import { ShieldCheck, FileText, CheckCircle, Send } from "lucide-react";
import { useState } from "react";

export default function Features() {
  const features = [
    {
      title: "Kerahasiaan Terjaga",
      desc: "Identitas pelapor dilindungi. Laporan diproses secara profesional dan beretika.",
      icon: ShieldCheck,
      color: "bg-pink-100 text-pink-600",
    },
    {
      title: "Mudah & Terstruktur",
      desc: "Formulir laporan sederhana dengan panduan kronologi dan lampiran bukti.",
      icon: FileText,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Tindak Lanjut Jelas",
      desc: "Proses verifikasi, investigasi, dan umpan balik terukur sesuai kebijakan.",
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <section id="features" className="max-w-screen-2xl mx-auto px-6 py-24">
      <h3 className="text-3xl font-bold text-center mb-14">Fitur Utama</h3>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full">
        
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {features.map((f, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: idx * 0.12 }}
            className="rounded-2xl bg-white shadow-md border border-gray-100 p-8 hover:shadow-lg hover:-translate-y-1.5 transition group"
          >
            {/* Icon */}
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${f.color} group-hover:scale-110 transition`}
            >
              <f.icon className="w-7 h-7" />
            </div>
            {/* Title */}
            <h4 className="text-xl font-semibold mb-3 text-gray-800">
              {f.title}
            </h4>
            {/* Description */}
            <p className="text-gray-600 leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
        
        </div>
      
      </div>
    </section>
  );
}
