import { useState, useEffect } from "react";
import { ClipboardList, Users } from "lucide-react";
import {
  FILTER_ALURKONSLAP_SPI,
  FORMAT_DATE_HOUR_IND,
} from "../../../../constant/data";
import { ButtonKembali } from "../../../../components/ButtonComp";
import { fetchData, userDetail } from "../../../../utils/api";

// import Reviewer from "./Reviewer";
import DisposisiKonsultasi from "./DisposisiKonsultasi";
import Reviewer from "./Reviewer";
import SuratTugas from "./SuratTugas";
import SPIChat from "../../SPIChat";
import Response from "./Response";

const DetailKonsultasi = ({ dtp, kembali }) => {
  const [animate, setAnimate] = useState(false);
  const [data, setData] = useState("");
  const [rld, setRld] = useState(false);
  const reload = () => setRld((prev) => !prev);

  useEffect(() => {
    getData();
  }, [dtp]);
  const getData = () => {
    fetchData(`/spi/konslap/detail?id=${dtp.id}`, {
      setLoading: animate,
      onSuccess: (res) => {
        setData(res?.data || []);
        console.log("coba disiniapa", res)
      },
      onError: (err) => {
        setErr(err?.detail || "Something went wrong!");
      },
    });
  };
  // const getData = () => {
  //   fetchData(`/adm/konslap_detail?id=${dtp?.id}`, {
  //     setLoading: setAnimate,
  //     onSuccess: (res) => {
  //       console.log("Success! dinis", res);
  //       setData(res.data || []);
  //     },
  //     onError: (err) => {
  //       setErr(err?.detail || "Something went wrong!");
  //     },
  //   });
  // };
  useEffect(() => {
    getData();
  }, [dtp, rld]);
  const [mod, setMod] = useState("disposisi");

  return (
    <div className="section-container">
      <div className="">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex flex-col items-start gap-2 mb-4">
            <h1 className="text_h1">Detail Konsultasi</h1>
            <ButtonKembali onClick={kembali} />
          </div>


          <div className="flex flex-col lg:flex-row gap-2 lg:gap-6">
            {/* Info Konsultasi */}
            <div className="flex-1 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <div className="flex flex-col gap-4">
                {[
                  { label: "Nama Pelapor", value: dtp?.nama_pelapor },
                  {
                    label: "Email Pelapor",
                    value: dtp?.userdetail?.email || "-",
                  },
                  { label: "No WA", value: dtp?.userdetail?.no_hp || "-" },
                  { label: "Judul", value: data?.judul },
                  { label: "Uraian", value: data?.deskripsi },
                  {
                    label: "Kategori Pelaporan",
                    value: data?.kategori_pelaporan,
                  },
                  { label: "Unit Pelapor", value: data?.unit_pelapor },
                  {
                    label: "TGL Konsultasi",
                    value: FORMAT_DATE_HOUR_IND(data?.created_at),
                  },
                  {
                    label: "Status",
                    value: FILTER_ALURKONSLAP_SPI(data?.status_id),
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold">
                      {item.label}:
                    </span>
                    <span className="text-gray-800 dark:text-gray-100">
                      {item.value}
                    </span>
                  </div>
                ))}

                <div className="flex flex-col mt-4">
                  <h2 className="text_h2">Dokumen</h2>
                  {dtp?.dokumen && dtp?.dokumen.map((r, i) => (
                    <a
                      key={i}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline break-all"
                    >
                      {r.nama_dokumen}
                    </a>
                  ))}
                  {dtp?.dokumen && dtp?.dokumen.length === 0 && (
                    <span className="text-gray-500 dark:text-gray-400">
                      Tidak ada dokumen
                    </span>
                  )}
                  </div>
              </div>
            </div>

            {/* Reviewer */}
            <div className="w-full lg:w-1/3">
              <div className="flex flex-col gap-2">
                {/* Tab buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMod("disposisi")}
                    className={`
          flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm
          ${
            mod === "disposisi"
              ? "bg-blue-100 text-blue-700 dark:bg-blue-600 dark:text-white"
              : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }
        `}
                  >
                    <ClipboardList size={16} />
                    Disposisi
                  </button>

                  <button
                    onClick={() => setMod("pic")}
                    className={`
          flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm
          ${
            mod === "pic"
              ? "bg-pink-100 text-pink-700 dark:bg-pink-600 dark:text-white"
              : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }
        `}
                  >
                    <Users size={16} />
                    Reviewer / PIC
                  </button>
                </div>
                {mod === "disposisi" && (
                  <DisposisiKonsultasi
                    data={data}
                    reload={reload}
                    role={userDetail?.role}
                  />
                )}
                {mod === "pic" && <Reviewer dtp={dtp} />}
              </div>
            </div>
          </div>


          <div className="flex flex-col lg:flex-row gap-2 lg:gap-6">
            <div className="w-full">
                  <Response data={data} />
                      <SPIChat data={dtp} />

            </div>
   

          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailKonsultasi;
