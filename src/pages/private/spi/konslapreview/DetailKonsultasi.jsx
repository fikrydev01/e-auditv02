import { useState, useEffect } from "react";
import { ButtonKembali } from "../../../../components/ButtonComp";
import { fetchData } from "../../../../utils/api";

import {
  FILTER_ALUR_KONSULTASI_SPI,
  FILTER_ALURKONSLAP_SPI,
  FORMAT_DATE_HOUR_IND,
} from "../../../../constant/data";
import Review from "./Review";
import SPIChat from "../../SPIChat";
import SuratTugas from "./SuratTugas";
import { FileText, FileWarning, ClipboardList, FileCheck } from "lucide-react";
import ReviewKonsultasi from "./ReviewKonsultasi";

const DetailKonsultasi = ({ dtp, kembali }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [rld, setRld] = useState(false);
  const [mmod, setmmod] = useState("detail");

  const reload = () => setRld(!rld);

  const getDatas = () => {
    fetchData(`/spi/konslap/detail?id=${dtp.id}`, {
      setLoading: setLoading,
      onSuccess: (res) => {
        setData(res?.data || []);
        console.log("coba disiniapa", res)
      },
      onError: (err) => {
        setErr(err?.detail || "Something went wrong!");
      },
    });
  };

  useEffect(() => {
    getDatas();
  }, [dtp, rld]);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Tombol kembali */}
      <div className="w-fit">
        <ButtonKembali onClick={kembali} />
      </div>

      {/* Header Detail */}
      <div className="section-body">
        <h1 className="text_h1 font-bold flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-blue-600" />
          Detail Konsultasi Anggota SPI
        </h1>
      </div>

      {/* Grid utama */}
      <div className="w-full flex flex-col lg:flex-row gap-4">
        {/* Informasi Pelapor */}
        <div className="section-body w-full lg:w-4/6">
          <div className="flex flex-col gap-4">
            {[
              { label: "Nama Pelapor", value: dtp?.nama_pelapor },
              { label: "Email Pelapor", value: dtp?.userdetail?.email || "-" },
              { label: "No WA", value: dtp?.userdetail?.no_hp || "-" },
              { label: "Judul", value: data?.judul },
              { label: "Uraian", value: data?.deskripsi },
              { label: "Kategori Pelaporan", value: data?.kategori_pelaporan },
              { label: "Unit Pelapor", value: data?.unit_pelapor },
              {
                label: "TGL Konsultasi",
                value: FORMAT_DATE_HOUR_IND(data?.created_at),
              },
              {
                label: "Status",
                value: FILTER_ALUR_KONSULTASI_SPI(data?.status_id),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col border-b border-gray-200 dark:border-gray-700 pb-2"
              >
                <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold">
                  {item.label}
                </span>
                <span className="text-gray-800 dark:text-gray-100">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Dokumen */}
        <div className="w-full lg:w-2/6">
          <div className="section-body">
            <h2 className="text_h2 font-semibold flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-green-600" />
              Dokumen
            </h2>
            <ul className="space-y-1">
              {Array.isArray(data?.dokumen) && data.dokumen.length > 0 ? (
                data.dokumen.map((item, index) => (
                  <li
                    key={index}
                    className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-800 dark:text-gray-100">
                      {item}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-gray-400 italic flex items-center gap-2">
                  <FileWarning className="w-4 h-4" /> Dokumen tidak tersedia
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Tab Detail / Surat Tugas */}
      <div className="w-full flex flex-col lg:flex-row gap-4">

        <div className="w-full">
          <div className="section-body">
                    {mmod === "detail" && <ReviewKonsultasi data={data} reload={reload} />}
          <div className="flex gap-2">
  {/* <button
    onClick={() => setmmod("detail")}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
      mmod === "detail"
        ? "bg-blue-600 text-white shadow"
        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
    }`}
  >
    <FileText className="w-5 h-5" />
    Detail Pengajuan
  </button> */}

  {/* <button
    onClick={() => setmmod("surtug")}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
      mmod === "surtug"
        ? "bg-blue-600 text-white shadow"
        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
    }`}
  >
    <FileCheck className="w-5 h-5" />
    Surat Tugas
  </button> */}
</div>

            {/* Content Tab */}
            {/* {mmod === "surtug" && <SuratTugas data={data} />} */}
          </div>
        </div>

          <SPIChat data={data} />
      </div>
    </div>
  );
};

export default DetailKonsultasi;
