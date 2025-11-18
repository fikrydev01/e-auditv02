import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const AdminDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);

  // === DUMMY DATA ===
  const revdokData = [
    { year: 2023, status_1: 10, status_2: 5, status_3: 3 },
    { year: 2024, status_1: 15, status_2: 8, status_3: 4 },
    { year: 2025, status_1: 20, status_2: 12, status_3: 6 },
  ];

  const konsultasiData = [
    { year: 2023, status_1: 8, status_2: 3, status_3: 2 },
    { year: 2024, status_1: 14, status_2: 6, status_3: 3 },
    { year: 2025, status_1: 18, status_2: 10, status_3: 5 },
  ];

  const dumasData = [
    { year: 2023, status_1: 12, status_2: 4, status_3: 1 },
    { year: 2024, status_1: 16, status_2: 7, status_3: 3 },
    { year: 2025, status_1: 22, status_2: 9, status_3: 4 },
  ];

  // === Tambahan: AUDIT ===
  const auditLHRData = [
    { year: 2023, status_1: 5, status_2: 3, status_3: 1 },
    { year: 2024, status_1: 9, status_2: 5, status_3: 2 },
    { year: 2025, status_1: 13, status_2: 7, status_3: 3 },
  ];

  const auditPLData = [
    { year: 2023, status_1: 7, status_2: 2, status_3: 2 },
    { year: 2024, status_1: 11, status_2: 4, status_3: 3 },
    { year: 2025, status_1: 15, status_2: 6, status_3: 4 },
  ];

  const ChartBox = ({ title, dataset, color1, color2, color3 }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-4">
        {title}
      </h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dataset}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="year" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#1f2937" : "#fff",
                borderRadius: "10px",
                border: "none",
              }}
              labelStyle={{ color: darkMode ? "#f3f4f6" : "#111827" }}
            />
            <Legend />
            <Bar dataKey="status_1" fill={color1} name="Status 1" />
            <Bar dataKey="status_2" fill={color2} name="Status 2" />
            <Bar dataKey="status_3" fill={color3} name="Status 3" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const total = (data) =>
    data.reduce((sum, d) => sum + d.status_1 + d.status_2 + d.status_3, 0);

  return (
    <div
      className={` transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >

      {/* Statistik Ringkas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { title: "Review Dokumen", total: total(revdokData), color: "bg-blue-500" },
          { title: "Konsultasi", total: total(konsultasiData), color: "bg-green-500" },
          { title: "Dumas", total: total(dumasData), color: "bg-yellow-500" },
          { title: "Audit (LHR + PL)", total: total(auditLHRData) + total(auditPLData), color: "bg-purple-500" },
        ].map((item, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-2xl text-white font-semibold ${item.color} shadow-md hover:shadow-lg transition`}
          >
            <div className="text-sm">{item.title}</div>
            <div className="text-2xl">{item.total}</div>
          </div>
        ))}
      </div>

      {/* Chart Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <ChartBox
          title="Total Review Dokumen per Tahun"
          dataset={revdokData}
          color1="#3b82f6"
          color2="#60a5fa"
          color3="#93c5fd"
        />
        <ChartBox
          title="Total Konsultasi per Tahun"
          dataset={konsultasiData}
          color1="#10b981"
          color2="#34d399"
          color3="#6ee7b7"
        />
        <ChartBox
          title="Total Dumas per Tahun"
          dataset={dumasData}
          color1="#f59e0b"
          color2="#fbbf24"
          color3="#fcd34d"
        />
        <ChartBox
          title="Audit Laporan Hasil Reviu (LHR)"
          dataset={auditLHRData}
          color1="#8b5cf6"
          color2="#a78bfa"
          color3="#c4b5fd"
        />
        <ChartBox
          title="Audit Pengawasan Lapangan (PL)"
          dataset={auditPLData}
          color1="#ec4899"
          color2="#f472b6"
          color3="#f9a8d4"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
