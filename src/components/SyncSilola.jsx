import React, { useState } from "react";
import { BASE_URL } from "../utils/api";

const SyncSilola = () => {
  const [loading, setLoading] = useState(false);
  const [progressMsg, setProgressMsg] = useState("");
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [realTimeProgress, setRealTimeProgress] = useState(null);

  const handleSync = async () => {
    setLoading(true);
    setResult(null);
    setRealTimeProgress(null);
    setShowModal(true);
    setProgressMsg("Memulai sinkronisasi dengan SILOLA...");

    try {
      const response = await fetch(`${BASE_URL}/web/fetch-silola-stream`, {
        // Gunakan endpoint streaming yang baru
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      // Untuk demo, kita buat progress simulasi
      simulateProgress();
      
      // Panggil endpoint biasa (non-streaming) sebagai fallback
      const data = await fetchRegularEndpoint();
      setResult(data);
      setProgressMsg("Sinkronisasi selesai ✅");
      
    } catch (error) {
      setResult({ error: error.message || "Gagal fetch data" });
      setProgressMsg("Sinkronisasi gagal ❌");
    } finally {
      setLoading(false);
    }
  };

  // Simulasi progress (hapus ini jika sudah implementasi streaming)
  const simulateProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      
      setRealTimeProgress({
        progress: Math.min(progress, 100),
        currentPage: Math.floor(progress / 10) + 1,
        totalPages: 10,
        itemsFetched: Math.floor(progress * 250),
        status: progress === 100 ? "completed" : "fetching"
      });
      
      setProgressMsg(`Memproses halaman ${Math.floor(progress / 10) + 1}/10...`);
    }, 1000);
  };

  // Fallback ke endpoint biasa
  const fetchRegularEndpoint = async () => {
    const response = await fetch(`${BASE_URL}/web/fetch-silola`);
    return await response.json();
  };

  const closeModal = () => {
    setShowModal(false);
    setRealTimeProgress(null);
  };

  return (
    <div className="p-6">
      {/* Tombol Sync */}
      <button
        onClick={handleSync}
        disabled={loading}
        className="px-3 py-2 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 disabled:opacity-50 transition-all duration-300 font-medium"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin text-xs"></div>
            Harap menunggu, sedang Sinkronisasi...
          </div>
        ) : (
          <span className="text-xs">
            Sync Data SILOLA
          </span>
        )}
      </button>

      {/* Modal Progress */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 pb-4 border-b">
              <h2 className="text-xl font-bold text-gray-800">
                Sinkronisasi Data SILOLA
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800 text-lg font-bold p-1 rounded-full hover:bg-gray-100 w-8 h-8 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Progress Bar Utama */}
              {(loading || realTimeProgress) && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>
                      {realTimeProgress ? `${Math.round(realTimeProgress.progress)}%` : "0%"}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-green-500 h-3 transition-all duration-500 ease-out"
                      style={{ 
                        width: realTimeProgress ? `${realTimeProgress.progress}%` : "0%" 
                      }}
                    ></div>
                  </div>
                  
                  {/* Status Detail */}
                  {realTimeProgress && (
                    <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {realTimeProgress.currentPage}
                        </div>
                        <div className="text-gray-600">Halaman Saat Ini</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {realTimeProgress.itemsFetched?.toLocaleString()}
                        </div>
                        <div className="text-gray-600">Data Terambil</div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Pesan Progress */}
              <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2">
                  {loading ? (
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  ) : result?.error ? (
                    <div className="text-red-500">❌</div>
                  ) : (
                    <div className="text-green-500">✅</div>
                  )}
                  <span className={`font-medium ${
                    result?.error ? 'text-red-700' : 'text-blue-700'
                  }`}>
                    {progressMsg}
                  </span>
                </div>
              </div>

              {/* Hasil Akhir */}
              {result && !loading && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                  <h3 className="font-bold text-lg mb-3 text-gray-800">
                    Hasil Sinkronisasi
                  </h3>
                  
                  {result.error ? (
                    <div className="text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                      <strong>Error:</strong> {result.error}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-white rounded-lg border">
                          <div className="text-2xl font-bold text-green-600">
                            {result.jumlah_data?.toLocaleString()}
                          </div>
                          <div className="text-gray-600 text-sm">Total Data</div>
                        </div>
                        <div className="p-3 bg-white rounded-lg border">
                          <div className="text-2xl font-bold text-blue-600">
                            {result.progress?.length || 0}
                          </div>
                          <div className="text-gray-600 text-sm">Total Halaman</div>
                        </div>
                      </div>

                      {/* Tabel Progress Detail */}
                      {result.progress && result.progress.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-semibold mb-2 text-gray-700">
                            Detail Progress per Halaman
                          </h4>
                          <div className="overflow-x-auto max-h-64 overflow-y-auto border rounded-lg">
                            <table className="min-w-full text-sm">
                              <thead className="bg-gray-100 sticky top-0">
                                <tr>
                                  <th className="px-4 py-2 border text-left">Halaman</th>
                                  <th className="px-4 py-2 border text-left">Progress</th>
                                  <th className="px-4 py-2 border text-left">Item</th>
                                </tr>
                              </thead>
                              <tbody>
                                {result.progress.map((row, idx) => (
                                  <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border font-medium">
                                      {row.page}
                                    </td>
                                    <td className="px-4 py-2 border w-48">
                                      <div className="flex items-center gap-2">
                                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden flex-1">
                                          <div
                                            className="bg-green-500 h-2 transition-all duration-300"
                                            style={{ width: row.progress }}
                                          ></div>
                                        </div>
                                        <span className="text-xs text-gray-600 min-w-[35px]">
                                          {row.progress}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="px-4 py-2 border">
                                      {row.items_fetched?.toLocaleString()}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t mt-4">
              <button
                onClick={closeModal}
                className="w-full py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SyncSilola;