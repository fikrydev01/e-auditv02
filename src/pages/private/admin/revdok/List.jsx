import { useEffect, useState, useMemo } from "react";
import {
  FILTER_ALUR_REVDOK_SPI,
  FORMAT_DATE_HOUR_IND,
} from "../../../../constant/data";
import { fetchData } from "../../../../utils/api";
import CardAlurRevdok from "../CardAlurRevdok";
import { ActionButton } from "../../../../components/ButtonComp";
import { Eye } from "lucide-react";
import DetailRevdok from "./DetailRevdok";

const List = ({ setMod }) => {
  const [animate, setAnimate] = useState(false);
  const [rld, setRld] = useState(false);
  const [err, setErr] = useState("");
  const [datas, setDatas] = useState([]);
  const [dtp, setDtp] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const perPage = 5; // ✅ jumlah maksimal per halaman

  const reload = () => setRld(!rld);

  const getDatas = () => {
    fetchData(`/adm/revdok`, {
      setLoading: setAnimate,
      onSuccess: (res) => setDatas(res?.data || []),
      onError: (err) => setErr(err?.detail || "Something went wrong!"),
    });
  };

  useEffect(() => {
    getDatas();
  }, [rld]);

  const pilih = (id) => {
    const n = datas.find((d) => d.id === id);
    if (n) setDtp(n);
  };

  const kembali = () => {
    setDtp(null);
    reload();
  };

  // 🔍 Filter data berdasarkan search term
  const filteredData = useMemo(() => {
    return datas.filter(
      (r) =>
        r.pemilik?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.tugas?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [datas, searchTerm]);

  // 🔢 Pagination
  const totalPages = Math.ceil(filteredData.length / perPage);
  const currentData = filteredData.slice((page - 1) * perPage, page * perPage);

  const nextPage = () => setPage((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setPage((p) => Math.max(p - 1, 1));

  useEffect(() => {
    setPage(1); // reset ke halaman 1 saat search berubah
  }, [searchTerm]);

  return (
    <>
      {dtp ? (
        <DetailRevdok dtp={dtp} kembali={kembali} />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setMod("add")}
              className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
            >
              Tambah Data
            </button>

            {/* 🔍 Search Input */}
            <input
              type="text"
              placeholder="Cari pemilik atau catatan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm w-64 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <CardAlurRevdok />

          <div className="section-body">
            <div className="flex flex-col gap-4">
              <h1 className="text_h1 text-gray-700 dark:text-gray-200">
                List Review Dokumen
              </h1>

              <div className="relative overflow-x-auto rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-pink-200 text-gray-700 dark:bg-pink-400/30 dark:text-gray-100">
                    <tr>
                      <th className="px-6 py-3">Aksi</th>
                      <th className="px-6 py-3">Pemilik</th>
                      <th className="px-6 py-3">Catatan</th>
                      <th className="px-6 py-3">URL Surat</th>
                      <th className="px-6 py-3">URL Dokumen</th>
                      <th className="px-6 py-3">TGL Ajuan</th>
                      <th className="px-6 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.length > 0 ? (
                      currentData.map((r, i) => (
                        <tr
                          key={i}
                          className={`transition-colors ${
                            i % 2 === 0
                              ? "bg-blue-50 dark:bg-blue-900/20"
                              : "bg-purple-50 dark:bg-purple-900/20"
                          } hover:bg-pink-100 dark:hover:bg-pink-800/30`}
                        >
                          <td className="px-6 py-4">
                            <ActionButton
                              onClick={() => pilih(r.id)}
                              icon={Eye}
                              label="Detail"
                              color="blue"
                            />
                          </td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-200">
                            {r.pemilik}
                          </td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-200">
                            {r?.tugas}
                          </td>
                          <td className="px-6 py-4">
                            <a
                              href={r?.surat_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              Surat Url
                            </a>
                          </td>
                          <td className="px-6 py-4">
                            <a
                              href={r?.dokumen_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              Dokumen Url
                            </a>
                          </td>
                          <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                            {FORMAT_DATE_HOUR_IND(r?.created_at)}
                          </td>
                          <td className="px-6 py-4 font-semibold text-purple-600 dark:text-purple-300">
                            {FILTER_ALUR_REVDOK_SPI(r.status_id)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="7"
                          className="text-center py-6 text-gray-500 dark:text-gray-400"
                        >
                          Tidak ada data ditemukan
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* 🔢 Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-4">
                  <button
                    onClick={prevPage}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                      page === 1
                        ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                  >
                    Prev
                  </button>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Halaman {page} dari {totalPages}
                  </span>
                  <button
                    onClick={nextPage}
                    disabled={page === totalPages}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                      page === totalPages
                        ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default List;
