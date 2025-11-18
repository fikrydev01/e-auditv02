import { useState, useEffect } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { fetchData } from "../../../utils/api";
import {
  FILTER_ALUR_DUMAS_SPI,
  FORMAT_DATE_IND,
  SHORT_TEXT,
} from "../../../constant/data";
import { filterPelaporKategori } from "../../../utils/spi";
import { ActionButton } from "../../../components/ButtonComp";
import { Eye } from "lucide-react";
import DetailDumas from "./konsultasi/DetailDumas";
import CardAlurDumas from "./CardAlurDumas";

const Laporan = () => {
  const [err, setErr] = useState("");
  const [animate, setAnimate] = useState(false);
  const [rld, setRld] = useState(false);
  const [datas, setDatas] = useState([]);
  const [dtp, setDtp] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [search, setSearch] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const jenis = "laporan";

  const getDatas = () => {
    fetchData(`/adm/konslap`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        setDatas(res.data || []);
      },
      onError: (err) => {
        setErr(err?.detail || "Something went wrong!");
      },
    });
  };

  useEffect(() => {
    getDatas();
  }, [rld]);

  const kembali = () => {
    setDtp("");
    setRld(!rld);
  };

  const pilih = (id) => {
    const n = datas.find((it) => it.id === id);
    setDtp(n);
  };

  // --- Filter dan Search ---
  const filteredData = datas
    .filter((it) => it.jenis === jenis)
    .filter((it) => {
      if (!dateFilter) return true;
      const createdDate = new Date(it.created_at).toISOString().split("T")[0];
      return createdDate === dateFilter;
    })
    .filter((it) =>
      search
        ? it.nama_pelapor?.toLowerCase().includes(search.toLowerCase()) ||
          it.judul?.toLowerCase().includes(search.toLowerCase()) ||
          it.deskripsi?.toLowerCase().includes(search.toLowerCase())
        : true
    );

  // --- Pagination logic ---
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <section className="section-container">
      <Breadcrumbs title="Dumas" />

      {dtp ? (
        <DetailDumas dtp={dtp} type="laporan" title="Dumas" kembali={kembali} />
      ) : (
        <div className="flex flex-col gap-4">
          <CardAlurDumas />
        <div className="section-body">
          {/* Filter & Search */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700">
                Filter Tanggal:
              </label>
              <input
                type="date"
                className="border rounded-lg px-3 py-2 text-sm focus:ring focus:ring-blue-200 focus:border-blue-400"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
              {dateFilter && (
                <button
                  onClick={() => setDateFilter("")}
                  className="text-xs px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Reset
                </button>
              )}
            </div>

            <input
              type="text"
              placeholder="Cari nama, judul, atau deskripsi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm w-full md:w-1/3 focus:ring focus:ring-blue-200 focus:border-blue-400"
            />
          </div>

          {/* Tabel */}
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-200">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-100 uppercase bg-gradient-to-r from-blue-500 to-blue-600">
                <tr>
                  <th className="px-6 py-3">Aksi</th>
                  <th className="px-6 py-3">Nama Pelapor</th>
                  <th className="px-6 py-3">No WA</th>
                  <th className="px-6 py-3">Tertolak</th>
                  <th className="px-6 py-3">Judul</th>
                  <th className="px-6 py-3">Uraian</th>
                  <th className="px-6 py-3">Kategori</th>
                  <th className="px-6 py-3">Unit</th>
                  <th className="px-6 py-3">Tgl Dumas</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((r, i) => (
                    <tr
                      key={i}
                      className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        <ActionButton
                          onClick={() => pilih(r.id)}
                          icon={Eye}
                          label="Detail"
                          color="blue"
                        />
                      </td>
                      <td className="px-6 py-4">{r.nama_pelapor}</td>
                      <td className="px-6 py-4">{r?.userdetail?.no_hp || "-"}</td>
                      <td
                        className={`px-6 py-4 font-semibold text-gray-800 ${
                          r?.status === "tolak" ? "bg-red-500 text-white" : ""
                        }`}
                      >
                        {r.status === "tolak" ? "Ya" : ""}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-800">
                        {r.judul}
                      </td>
                      <td
                        className="px-6 py-4 max-w-xs truncate"
                        title={r.deskripsi}
                      >
                        {SHORT_TEXT(r.deskripsi)}
                      </td>
                      <td className="px-6 py-4 capitalize">
                        {filterPelaporKategori(r?.pelapor_kategori)}
                      </td>
                      <td className="px-6 py-4">{r.unit_pelapor}</td>
                      <td className="px-6 py-4">{FORMAT_DATE_IND(r.created_at)}</td>
                      <td className="px-6 py-4">
                        {FILTER_ALUR_DUMAS_SPI(r.status_id)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center py-6 text-gray-500">
                      Tidak ada data ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Tampilkan:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border rounded-lg px-2 py-1 text-sm"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
              </select>
              <span className="text-sm text-gray-600">per halaman</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-100 disabled:opacity-50"
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span className="text-sm">
                Halaman {currentPage} dari {totalPages || 1}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-100 disabled:opacity-50"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
          </div>
      )}
    </section>
  );
};

export default Laporan;
