import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

const dummyData = {
  Survei: { total: 54, score: [{ name: "80-100", value: 18 }, { name: "51-79", value: 12 }, { name: "10-50", value: 7 }] },
  Review: { total: 52, stages: [
      { name: "Prospects", value: 18 }, { name: "POC", value: 18 }, { name: "Lead", value: 6 },
      { name: "Pricing", value: 6 }, { name: "Presentation", value: 3 }, { name: "Approved", value: 3 }, { name: "Closed", value: 3 }
    ] 
  },
  Laporan: { total: 21, priority: [
      { name: "Urgent", value: 6 }, { name: "High", value: 23 }, { name: "Normal", value: 12 }, { name: "Low", value: 11 }, { name: "None", value: 2 }
    ] 
  },
  Konsultasi: { weighted: 45, forecast: "56M", pipeline: "16M" }
};

const COLORS = ["#FF8042", "#00C49F", "#FFBB28", "#0088FE", "#AA336A", "#8884D8", "#FF6699"];

const DashboardCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 dark:text-slate-100">
      
      {/* Konsultasi / Summary */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-5 flex flex-col gap-4">
        <h3 className="font-semibold text-gray-700 dark:text-gray-200">Konsultasi</h3>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-200">Weighted pipeline value</span>
            <span className="font-bold">{dummyData.Konsultasi.weighted}</span>
          </div>
          <div className="flex justify-between">
             <span className="text-xs text-slate-500 dark:text-slate-200">Forecasted value</span>
            <span className="font-bold">{dummyData.Konsultasi.forecast}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-200">Pipeline value</span>
            <span className="font-bold">{dummyData.Konsultasi.pipeline}</span>
          </div>
        </div>
      </div>

      {/* Survei / Score */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-5 flex flex-col items-center">
        <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Survei</h3>
        <PieChart width={170} height={170}>
          <Pie
            data={dummyData.Survei.score}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={30}
            outerRadius={50}
            paddingAngle={2}
          >
            {dummyData.Survei.score.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        <span className="font-bold mt-2">{dummyData.Survei.total} Total</span>
      </div>

      {/* Review Dokumen / Stages */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-5 flex flex-col items-center">
        <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Review Dokumen</h3>
        <PieChart width={170} height={170}>
          <Pie
            data={dummyData.Review.stages}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={30}
            outerRadius={50}
            paddingAngle={2}
          >
            {dummyData.Review.stages.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        <span className="font-bold mt-2">{dummyData.Review.total} Total</span>
      </div>

      {/* Laporan / Priority */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-5 flex flex-col items-center">
        <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Laporan</h3>
        <PieChart width={170} height={170}>
          <Pie
            data={dummyData.Laporan.priority}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={30}
            outerRadius={50}
            paddingAngle={2}
          >
            {dummyData.Laporan.priority.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        <span className="font-bold mt-2">{dummyData.Laporan.total} Total</span>
      </div>

    </div>
  );
};

export default DashboardCards;
