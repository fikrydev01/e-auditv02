import { useState, useEffect } from "react";
import { ClipboardList, Logs, Users } from "lucide-react";
import {
  FILTER_ALURKONSLAP_SPI,
  FORMAT_DATE_HOUR_IND,
} from "../../../../constant/data";
import Reviewer from "./Reviewer";
import { ButtonKembali } from "../../../../components/ButtonComp";

import Disposisi from "./Disposisi";
import { API_URL, fetchData } from "../../../../utils/api";
import SuratTugas from "./SuratTugas";
import KonslapLog from "../../../../components/KonslapLog";
import CardAlurKonslap from "../CardAlurKonsultasi";
import CardAlurDumas from "../CardAlurDumas";
import DisposisiDumas from "./DisposisiDumas";
import DokumenPendukung from "../../../../components/DokumenPendukung";
import ListDokumen from "../../../../components/ListDokumen";



const DetailDumas = ({ dtp, kembali, title }) => {
  const [animate, setAnimate] = useState(false);
  const [data, setData] = useState("");
  const [rld, setRld] = useState(false);
  const reload = () => setRld((prev) => !prev);
  const [mod, setMod] = useState("disposisi");


  useEffect(() => {
    getData();
  }, [dtp]);

  const getData = () => {
    fetchData(`/adm/konslap_detail?id=${dtp?.id}`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log("Success! oke", res);
        setData(res.data || []);
      },
      onError: (err) => {
        setErr(err?.detail || "Something went wrong!");
      },
    });
  };
  useEffect(() => {
    getData();
  }, [dtp, rld]);

  console.log("data", data)

  const [dmod, setDmod] = useState("info");
  return (
    <div className="section-container">
      <div className="">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex flex-col items-start gap-2 mb-4">
            <h1 className="text_h1 capitalize">Detail {title}</h1>
            <ButtonKembali onClick={kembali} />
          </div>
          <CardAlurDumas />

            <div className="flex items-center gap-2">
              <button
                onClick={() => setDmod("info")}
                className={`
          flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm
          ${
            dmod === "info"
              ? "bg-blue-100 text-blue-700 dark:bg-blue-600 dark:text-white"
              : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }
        `}
              >
                <ClipboardList size={16} />
                Info Detail
              </button>

              <button
                onClick={() => setDmod("surtug")}
                className={`
          flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm
          ${
            dmod === "surtug"
              ? "bg-pink-100 text-pink-700 dark:bg-pink-600 dark:text-white"
              : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }
        `}
              >
                <Users size={16} />
                Surat Tugas
              </button>
            </div>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Info Konsultasi */}

            {dmod === "info" && (
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
                </div>
                <ListDokumen 
                dokumen={data?.dokumen}
                            apiUrl={API_URL}
                />
              </div>
            )}
            {dmod === "surtug" && <SuratTugas dtp={dtp} />}

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
                  <button
                    onClick={() => setMod("log")}
                    className={`
          flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm
          ${
            mod === "log"
              ? "bg-pink-100 text-pink-700 dark:bg-pink-600 dark:text-white"
              : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }
        `}
                  >
                    <Logs size={16} />
                    Log
                  </button>
                </div>
                {mod === "disposisi" && (
                  <DisposisiDumas data={data} reload={reload} role="ketua" />
                )}
                {mod === "pic" && <Reviewer dtp={dtp} />}
                {mod === "log" && <KonslapLog data={dtp}/>}
              </div>
            </div>
          </div>

          {/* SURAT TUGAS */}
        </div>
      </div>
    </div>
  );
};

export default DetailDumas;
