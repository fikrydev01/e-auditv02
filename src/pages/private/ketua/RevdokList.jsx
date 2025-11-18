import { useEffect, useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { fetchData } from "../../../utils/api";
import CardAlurRevdok from "../admin/CardAlurRevdok";
import { ActionButton } from "../../../components/ButtonComp";
import { ArrowBigRightIcon, ArrowLeftCircle, ArrowRightCircle, Eye } from "lucide-react";
import {
  FILTER_ALUR_REVDOK_SPI,
  FORMAT_DATE_HOUR_IND,
} from "../../../constant/data";
import Detail from "./revdok/Detail";

const RevdokList = () => {
  const [animate, setAnimate] = useState(false);
  const [rld, setRld] = useState(false);
  const [err, setErr] = useState("");
  const [datas, setDatas] = useState([]);
  const [dtp, setDtp] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const reload = () => setRld(!rld);

  const getDatas = () => {
    fetchData(`/adm/revdok`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        const sorted = (res?.data || []).sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setDatas(sorted);
      },
      onError: (err) => {
        setErr(err?.detail || "Something went wrong!");
      },
    });
  };

  useEffect(() => {
    getDatas();
  }, [rld]);

  const pilih = (id) => {
    setDtp(datas.find((d) => d.id === id));
  };

  const kembali = () => {
    setDtp(null);
  };

  // === Pagination Logic ===
  const totalPages = Math.ceil(datas.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = datas.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  console.log("datas", datas)

  return (
    <section className="section-container">
      <Breadcrumbs title="Ajuan Reviu Dokumen" />

      {dtp ? (
        <Detail dtp={dtp} kembali={kembali} />
      ) : (
        <div className="flex flex-col gap-6">
          <CardAlurRevdok />

          <div className="section-body">
            <h1 className="text_h1 text-gray-800 dark:text-gray-100">
              List Review Dokumen
            </h1>

            {/* Table */}
            <div className="relative overflow-x-auto rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-gradient-to-r from-pink-400 to-pink-500 text-white dark:from-pink-700 dark:to-pink-800">
                  <tr>
                    <th className="px-6 py-3">Aksi</th>
                    <th className="px-6 py-3">Pemilik</th>
                    <th className="px-6 py-3">Catatan</th>
                    <th className="px-6 py-3">Kategori</th>
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
                            ? "bg-gray-50 dark:bg-gray-900/40"
                            : "bg-white dark:bg-gray-800/40"
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
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-200 uppercase">
                          {r?.kategori}
                        </td>
                        <td className="px-6 py-4">
                          {r?.surat_url ? (
                            <a
                              href={r.surat_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              Surat
                            </a>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {r?.dokumen_url ? (
                            <a
                              href={r.dokumen_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              Dokumen
                            </a>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
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
                        Tidak ada data ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Halaman {currentPage} dari {totalPages} (
                {datas.length} data)
              </p>
              <div className="flex gap-2">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed"
                      : "bg-pink-500 hover:bg-pink-600 text-white"
                  }`}
                >
                  <ArrowLeftCircle size={14} />
                </button>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed"
                      : "bg-pink-500 hover:bg-pink-600 text-white"
                  }`}
                >
                  <ArrowRightCircle size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RevdokList;
