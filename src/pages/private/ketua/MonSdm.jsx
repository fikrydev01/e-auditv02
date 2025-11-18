import { useState } from 'react';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { BarChart, Table, Info } from 'lucide-react';

const MonSdm = () => {
  const url_general =
    "https://lookerstudio.google.com/embed/u/0/reporting/de0b4ea7-dcd7-4fe7-b35e-3e879a8d09c3/page/nZMFE";
  const url_data =
    "https://lookerstudio.google.com/embed/u/0/reporting/6ebd7b29-6f0c-4090-9b3f-f627d47ce0c3/page/p_9gbjtn6gmd";

  const [mod, setMod] = useState('data');
  const [loading, setLoading] = useState(true);

  const buttons = [
    { key: 'general', label: 'General', icon: <BarChart size={18} /> },
    { key: 'data', label: 'Data', icon: <Table size={18} /> },
  ];

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <section className="section-container">
      <Breadcrumbs title="Monev SDM" />
  

      {/* Filter Mode */}
      <div className="flex gap-3">
        {buttons.map(btn => (
          <button
            key={btn.key}
            onClick={() => {
              setMod(btn.key);
              setLoading(true);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-sm
              ${
                mod === btn.key
                  ? 'bg-pink-200 text-pink-900 shadow-md'
                  : 'bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-800 dark:text-purple-100 dark:hover:bg-purple-700'
              }`}
          >
            {btn.icon}
            {btn.label}
          </button>
        ))}
      </div>

        <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 shadow-md border border-blue-200 dark:border-blue-700 w-full">
      <Info size={24} className="flex-shrink-0" />
      <p className="text-sm">
        Data ini secara otomatis disinkronkan dengan sistem <span className="font-semibold">sdmuinjkt.id</span>.
      </p>
    </div>

      {/* Iframe with loading animation */}
      <div className="relative w-full h-screen border rounded-lg overflow-hidden shadow-lg">
        {loading && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center animate-pulse z-10">
            <span className="text-gray-500 dark:text-gray-300 font-semibold">Loading...</span>
          </div>
        )}
        <iframe
          src={mod === 'general' ? url_general : url_data}
          className="w-full h-full"
          frameBorder="0"
          allowFullScreen
          title="Monev SDM"
          onLoad={handleLoad}
        ></iframe>
      </div>
    </section>
  );
};

export default MonSdm;
