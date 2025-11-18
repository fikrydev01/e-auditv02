import { useState, useEffect } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { fetchData } from "../../../utils/api";
import { ActionButton } from "../../../components/ButtonComp";
import { Eye } from "lucide-react";
import {
  FILTER_ALUR_KONSULTASI_SPI,
  FORMAT_DATE_IND,
  SHORT_TEXT,
} from "../../../constant/data";
import { filterPelaporKategori } from "../../../utils/spi";
import DetailKonsultasi from "./konsultasi/DetailKonsultasi";
import CardAlurKonslap from "../admin/CardAlurKonsultasi";

const KonsultasiList = () => {
  const [datas, setDatas] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [dtp, setDtp] = useState("");

  const getDatas = () => {
    fetchData(`/adm/konslap`, {
      onSuccess: (res) => setDatas(res?.data || []),
      onError: () => setDatas([]),
    });
  };

  useEffect(() => {
    getDatas();
  }, []);

  const pilih = (id) => {
    let n = datas.find((it) => it.id == id);
    setDtp(n);
  };

  const kembali = () => setDtp("");

  const jenis = "konsultasi";

  // Filter data
  const filterData = datas.filter((it) => {
    if (it.jenis !== jenis) return false;
    const matchTitle = it.judul
      ?.toLowerCase()
      .includes(searchTitle.toLowerCase());
    if (searchTitle && !matchTitle) return false;

    if (!dateFilter) return true;
    const createdDate = new Date(it.created_at).toISOString().split("T")[0];
    return createdDate === dateFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filterData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filterData.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <section className="section-container">
      <Breadcrumbs title="Konsultasi" />

      {dtp ? (
        <DetailKonsultasi dtp={dtp} kembali={kembali} />
      ) : (
        <div className="flex flex-col gap-4">
                    <CardAlurKonslap />
        <div className="section-body">

          {/* Filter Area */}
          <div className="flex flex-wrap gap-3 items-center mb-4">
            <label className="text-sm font-medium text-gray-700">
              Tanggal:
            </label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm focus:ring focus:ring-blue-200 focus:border-blue-400"
            />
            <input
              type="text"
              placeholder="Cari judul laporan..."
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm flex-1 focus:ring focus:ring-blue-200 focus:border-blue-400"
            />
          </div>


          {/* Table */}
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs text-white uppercase bg-gradient-to-r from-blue-500 to-blue-600">
                <tr>
                  <th className="px-6 py-3">AKSI</th>
                  <th className="px-6 py-3">NAMA PELAPOR</th>
                  <th className="px-6 py-3">NO WA</th>
                  <th className="px-6 py-3">JUDUL</th>
                  <th className="px-6 py-3">URAIAN</th>
                  <th className="px-6 py-3">KATEGORI</th>
                  <th className="px-6 py-3">UNIT</th>
                  <th className="px-6 py-3">TGL KONSULTASI</th>
                  <th className="px-6 py-3">STATUS ID</th>
                </tr>
              </thead>
              <tbody>
                {currentData.length > 0 ? (
                  currentData.map((r, i) => (
                    <tr
                      key={i}
                      className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition"
                    >
                      <td className="px-6 py-4">
                        <ActionButton
                          onClick={() => pilih(r.id)}
                          icon={Eye}
                          label="Detail"
                          color="blue"
                        />
                      </td>
                      <td className="px-6 py-4">{r.nama_pelapor}</td>
                      <td className="px-6 py-4">{r?.userdetail?.no_hp || "-"}</td>
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
                      <td className="px-6 py-4">
                        {FORMAT_DATE_IND(r.created_at)}
                      </td>
                      <td className="px-6 py-4">
                        {FILTER_ALUR_KONSULTASI_SPI(r.status_id)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="text-center py-4 text-gray-500 italic"
                    >
                      Tidak ada data ditemukan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap justify-between items-center mt-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-700">Tampilkan:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border rounded px-2 py-1 text-sm focus:ring focus:ring-blue-200 focus:border-blue-400"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
              </select>
              <span className="text-gray-700">per halaman</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`px-3 py-1.5 rounded-lg border ${
                  currentPage === 1
                    ? "text-gray-400 border-gray-200 cursor-not-allowed"
                    : "text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                Prev
              </button>
              <span className="text-gray-600">
                Halaman <strong>{currentPage}</strong> dari{" "}
                <strong>{totalPages}</strong>
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-3 py-1.5 rounded-lg border ${
                  currentPage === totalPages
                    ? "text-gray-400 border-gray-200 cursor-not-allowed"
                    : "text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
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

export default KonsultasiList;
