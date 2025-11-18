import { useState, useEffect } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { fetchData } from "../../../utils/api";
import { ActionButton } from "../../../components/ButtonComp";
import { Eye } from "lucide-react";
import {
  FILTER_ALUR_DUMAS_SPI,
  FORMAT_DATE_IND,
  SHORT_TEXT,
} from "../../../constant/data";
import { filterPelaporKategori } from "../../../utils/spi";
import DetailDumas from "./konsultasi/DetailDumas";
import CardAlurDumas from "../admin/CardAlurDumas";

const LaporanList = () => {
  const [err, setErr] = useState("");
  const [animate, setAnimate] = useState(false);
  const [rld, setRld] = useState(false);
  const [datas, setDatas] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [kategoriFilter, setKategoriFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  let jenis = "laporan";

  const getDatas = () => {
    fetchData(`/adm/konslap`, {
      setLoading: setAnimate,
      onSuccess: (res) => setDatas(res?.data || []),
      onError: (err) => setErr(err?.detail || "Something went wrong!"),
    });
  };

  useEffect(() => {
    getDatas();
  }, [rld]);

  const [dtp, setDtp] = useState("");
  const kembali = () => {
    setDtp("");
    setRld(!rld);
  };

  const pilih = (id) => {
    let n = datas && datas.find((it) => it.id == id);
    setDtp(n);
  };

  // 🔍 Filter + search
  const filteredData =
    datas &&
    datas.filter((it) => {
      if (it.jenis !== jenis) return false;

      if (dateFilter) {
        const createdDate = new Date(it.created_at).toISOString().split("T")[0];
        if (createdDate !== dateFilter) return false;
      }


      if (
        searchTerm &&
        !it.judul?.toLowerCase().includes(searchTerm.toLowerCase())
      )
        return false;

      return true;
    });

  // 📄 Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="section-container">
      <Breadcrumbs title="DUMAS" />
      {dtp ? (
        <DetailDumas dtp={dtp} kembali={kembali} />
      ) : (
        <div className="flex flex-col gap-4">
          <CardAlurDumas />
        <div className="section-body">

          {/* 🔹 Filter dan Search */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700 mr-2">
                Tanggal:
              </label>
              <input
                type="date"
                className="border rounded-lg px-3 py-2 text-sm focus:ring focus:ring-blue-200 focus:border-blue-400"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>

          

            {/* 🔎 Search Judul */}
            <div className="flex items-center border rounded-lg px-3 py-1">
              <input
                type="text"
                placeholder="Cari judul laporan..."
                className="text-sm focus:outline-none"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            {(dateFilter || statusFilter || kategoriFilter || searchTerm) && (
              <button
                onClick={() => {
                  setDateFilter("");
                  setStatusFilter("");
                  setKategoriFilter("");
                  setSearchTerm("");
                }}
                className="text-xs px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Reset
              </button>
            )}
          </div>

          {/* 📊 Tabel */}
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
                  <th className="px-6 py-3">Tgl Konsultasi</th>
                  <th className="px-6 py-3">Status ID</th>
                </tr>
              </thead>

              <tbody>
                {currentItems && currentItems.length > 0 ? (
                  currentItems.map((r, i) => (
                    <tr
                      key={i}
                      className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors"
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
                      <td
                        className={`px-6 py-4 font-semibold ${
                          r?.status == "tolak" ? "text-red-600" : ""
                        }`}
                      >
                        {r.status === "tolak" ? "Ya" : ""}
                      </td>
                      <td className="px-6 py-4 font-semibold">{r.judul}</td>
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
                        {FILTER_ALUR_DUMAS_SPI(r.status_id)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center py-6 text-gray-500">
                      Tidak ada data ditemukan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 🔢 Pagination */}
          {filteredData.length > itemsPerPage && (
            <div className="flex justify-between items-center mt-4 text-sm">
              <div>
                <span>Tampilkan:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border rounded-md px-2 py-1 ml-2"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                </select>
                <span> per halaman</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="px-3 py-1 bg-gray-100 rounded-md disabled:opacity-50"
                >
                  Prev
                </button>
                <span>
                  Halaman {currentPage} dari {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="px-3 py-1 bg-gray-100 rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
          </div>
      )}
    </section>
  );
};

export default LaporanList;
