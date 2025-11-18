import React from 'react';
import { BarChart3, Activity, FileText } from 'lucide-react';

const statsCards = [
  { title: 'Total Users', value: '12,345', change: '+12%', color: 'from-pink-400 to-purple-400' },
  { title: 'Revenue', value: '$45,678', change: '+8%', color: 'from-blue-400 to-cyan-400' },
  { title: 'Orders', value: '1,234', change: '+23%', color: 'from-green-400 to-teal-400' },
  { title: 'Growth', value: '89%', change: '+5%', color: 'from-orange-400 to-pink-400' },
];

const MainContent = () => (
  <main className="max-w-screen-2xl mx-auto px-4 py-6 space-y-6">
    {/* Welcome Section */}
    <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-2xl p-8 text-white">
      <h2 className="text-3xl font-bold mb-2">Welcome back, Admin!</h2>
      <p className="opacity-90">Here's what's happening with your dashboard today.</p>
    </div>
    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsCards.map((card, index) => (
        <div
          key={index}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-200/30 dark:border-gray-700/30"
        >
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${card.color} mb-4 flex items-center justify-center`}>
            <BarChart3 size={24} className="text-white" />
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{card.title}</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{card.value}</p>
          <span className="text-sm text-green-600 dark:text-green-400">{card.change}</span>
        </div>
      ))}
    </div>
    {/* ...existing code for grid, activity, reports, quick actions, etc... */}
  </main>
);

export default MainContent;
