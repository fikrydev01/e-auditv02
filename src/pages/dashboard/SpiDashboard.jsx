import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { CircleDashed } from "lucide-react";
import TablePenugasan from "../private/admin/pengawasan/TablePenugasan";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function SpiDashboard() {
  const [tugas, setTugas] = useState([
    { id: 1, judul: "Laporan dumas", status: "Selesai" },
    // tambahkan data lain jika perlu
  ]);

  const total = tugas.length;
  const selesai = tugas.filter((t) => t.status === "Selesai").length;
  const proses = tugas.filter((t) => t.status === "Proses").length;
  const menunggu = tugas.filter((t) => t.status === "Menunggu").length;

  const chartData = {
    labels: ["Selesai", "Proses", "Menunggu"],
    datasets: [
      {
        label: "Status Tugas",
        data: [selesai, proses, menunggu],
        backgroundColor: ["#22c55e", "#facc15", "#f87171"],
        borderRadius: 10,
      },
    ],
  };

  const chartOptions = {
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

  return (
    <div className="p-6 space-y-6 bg-white rounded-2xl">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold text-slate-800"
      >
        <div className="flex items-center gap-3">
      <CircleDashed size={24} />
      
       Dashboard Tugas

        </div>
      </motion.h1>

      {/* Statistik */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {[
          {
            label: "Total Tugas",
            value: total,
            icon: "📚",
            color: "border-slate-200",
          },
          {
            label: "Selesai",
            value: selesai,
            icon: "✅",
            color: "border-green-300",
          },
          {
            label: "Dalam Proses",
            value: proses,
            icon: "⏳",
            color: "border-yellow-300",
          },
          {
            label: "Menunggu",
            value: menunggu,
            icon: "⏰",
            color: "border-pink-300",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            className={`p-4 bg-white rounded-xl shadow border ${item.color}`}
            whileHover={{ scale: 1.03 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl">{item.icon}</span>
              <div className="text-right">
                <p className="text-sm text-slate-500">{item.label}</p>
                <p className="text-2xl font-semibold text-slate-800">
                  {item.value}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Grafik dan Tugas Terbaru */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grafik */}
        <motion.div
          className="bg-white rounded-xl p-6 shadow border border-slate-200"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-lg font-semibold mb-4 text-slate-700">
            Status Tugas
          </h2>
          <Bar data={chartData} options={chartOptions} />
        </motion.div>

        {/* Tugas Terbaru */}
        <motion.div
          className="bg-white rounded-xl p-6 shadow border border-slate-200"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-700">
              Tugas Terbaru
            </h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1.5 rounded-lg">
              Tambah Tugas
            </button>
          </div>

          <table className="w-full text-sm border-t border-slate-100">
            <thead>
              <tr className="text-left text-slate-500 border-b">
                <th className="py-2">JUDUL</th>
                <th className="py-2">STATUS</th>
                <th className="py-2">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {tugas.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-slate-50 transition-all"
                >
                  <td className="py-2 font-medium text-slate-700">
                    {item.judul}
                  </td>
                  <td>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        item.status === "Selesai"
                          ? "bg-green-100 text-green-800"
                          : item.status === "Proses"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-pink-100 text-pink-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="text-sm space-x-3">
                    <button className="text-blue-600 hover:underline">
                      Batal
                    </button>
                    <button className="text-red-600 hover:underline">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>

      <TablePenugasan />
    </div>
  );
}
