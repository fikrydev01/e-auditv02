import { BriefcaseBusinessIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const TablePenugasan = () => {
  const [data, setData] = useState([]);
  const [tahun, setTahun] = useState(2025);
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // ✅ jumlah data per halaman

  useEffect(() => {
    fetch("/data/penugasan.json")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setFilteredData(json);
      })
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  const handleFilter = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);

    const filtered = data.filter(
      (item) =>
        item.pemilik.toLowerCase().includes(value) ||
        item.status.toLowerCase().includes(value) ||
        item.tahap.toLowerCase().includes(value) ||
        item.deskripsi.toLowerCase().includes(value)
    );

    setFilteredData(filtered);
    setCurrentPage(1); // reset ke halaman pertama setelah filter
  };

  // === Filter Tahun ===
  const filteredByYear = filteredData.filter((it) => it.tahun == tahun);

  // === Group by Status ===
  const groupByStatus = filteredByYear.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {});

  // === Group by Tahap ===
  const groupByTahap = filteredByYear.reduce((acc, curr) => {
    acc[curr.tahap] = (acc[curr.tahap] || 0) + 1;
    return acc;
  }, {});

  // === Pagination Logic ===
  const totalItems = filteredByYear.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredByYear.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const nextPage = () =>
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const prevPage = () =>
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const goToPage = (page) => setCurrentPage(page);

  return (
    <div className="section-container">
      <div className="section-body">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2 flex items-center gap-2">
        <BriefcaseBusinessIcon />
         Daftar Penugasan Tahun {tahun}
        </h2>

        {/* Filter */}
        <div className="flex justify-between items-center mb-4 gap-4">
          <input
            type="text"
            placeholder="Cari berdasarkan pemilik, status, atau tahap..."
            value={filter}
            onChange={handleFilter}
            className="w-full md:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={tahun}
            onChange={(e) => {
              setTahun(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-1/3 px-4 h-10 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={2025}>2025</option>
            <option value={2024}>2024</option>
          </select>
        </div>

        {/* === Card Group by Status === */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">
            Ringkasan Berdasarkan Status
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(groupByStatus).map(([status, count]) => (
              <div
                key={status}
                className="bg-gradient-to-r from-blue-500 to-blue-400 text-white p-4 rounded-xl shadow hover:shadow-md transition"
              >
                <p className="text-sm uppercase opacity-80">{status}</p>
                <p className="text-2xl font-bold">{count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* === Card Group by Tahap === */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">
            Ringkasan Berdasarkan Tahap
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Object.entries(groupByTahap).map(([tahap, count]) => (
              <div
                key={tahap}
                className="bg-gradient-to-r from-emerald-500 to-teal-400 text-white p-4 rounded-xl shadow hover:shadow-md transition"
              >
                <p className="text-sm font-medium truncate">{tahap}</p>
                <p className="text-2xl font-bold">{count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* === Tabel Data === */}
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">No Surat</th>
                <th className="px-4 py-3">Pemilik</th>
                <th className="px-4 py-3">Deskripsi</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Tahap</th>
                <th className="px-4 py-3">Dokumen Via EKA</th>
                <th className="px-4 py-3">Keterangan</th>
                <th className="px-4 py-3">TGL DOK Selesai</th>
                <th className="px-4 py-3">Catatan Penerima</th>
                <th className="px-4 py-3">Link</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`border-b hover:bg-blue-50 transition-colors ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium text-gray-600">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-4 py-3 text-blue-700 font-semibold">
                      {item.nosur}
                    </td>
                    <td className="px-4 py-3">{item.pemilik}</td>
                    <td className="px-4 py-3">{item.deskripsi}</td>
                    <td
                      className={`px-4 py-3 font-semibold ${
                        item.status === "On Proses"
                          ? "text-orange-600"
                          : "text-green-600"
                      }`}
                    >
                      {item.status}
                    </td>
                    <td className="px-4 py-3">{item.tahap}</td>
                    <td className="px-4 py-3">{item.dokumen_via_eka}</td>
                    <td className="px-4 py-3">{item.keterangan}</td>
                    <td className="px-4 py-3">{item.tgl_dok_selesai}</td>
                    <td className="px-4 py-3">{item.catatan_penerima_dokumen}</td>
                    <td className="px-4 py-3">
                      {item.link_lhr && item.link_lhr.includes("http") ? (
                        <a
                          href={item.link_lhr}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Link
                        </a>
                      ) : (
                        <span className="text-gray-400">{item?.link_lhr}</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center py-6 text-gray-500">
                    Tidak ada data ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* === Pagination === */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md border text-sm bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              ← Prev
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-1 rounded-md border text-sm ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md border text-sm bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        )}

        <p className="text-xs text-gray-400 mt-4">
          Total Data: {totalItems} | Halaman {currentPage} dari {totalPages}
        </p>
      </div>
    </div>
  );
};

export default TablePenugasan;
