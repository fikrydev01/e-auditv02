import React, { useState, useEffect } from "react";
import { ButtonKembali } from "../../../../components/ButtonComp";
import { fetchData } from "../../../../utils/api";
import {
  FileText,
  Calendar,
  User,
  CheckCircle,
  Link as LinkIcon,
  FileCheck,
} from "lucide-react";
import KategoriSelect from "./KategoriSelect";
import {
  FILTER_ALUR_REVDOK_SPI,
  FORMAT_DATE_HOUR_IND,
} from "../../../../constant/data";
import Response from "./Response";
import CardAlurRevdok from "../../admin/CardAlurRevdok";
const Detail = ({ dtp, kembali }) => {
  const [revdok, setRevdok] = useState(null);
  const [aminate, setAnimate] = useState(false);
  const [rld, setRld] = useState(false);
  const reload = () => setRld(!rld);
  const getDatas = () => {
    fetchData(`/spi/revdok/detail?id=${dtp?.revdok_id}`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log("datas da!", res);
        setRevdok(res?.data || []);
      },
      onError: (err) => {
        console.log("err", err);
        // setErr(err?.detail || "Something went wrong!");
      },
    });
  };
  useEffect(() => {
    getDatas();
  }, [rld]);

  console.log("dtp", dtp);
  return (
    <div className="flex flex-col gap-4">
      <div>
        <ButtonKembali onClick={kembali} />
      </div>

      <div className="flex flex-col lg:flex-row  gap-6">
        <section className="section-body w-full">
          <h2 className="text_h1">📑 Detail Review Dokumen</h2>

          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="w-full md:w-4/12">
              <div className="flex flex-col gap-4">
                <div
                  className="p-6 rounded-2xl shadow-md border 
    bg-gradient-to-br from-pink-50 to-blue-50 
    dark:from-slate-800 dark:to-slate-900 dark:border-slate-700 transition-colors"
                >
                  <h1
                    className="text-lg font-semibold mb-4 
      text-slate-700 dark:text-slate-200"
                  >
                    Identitas Pemohon
                  </h1>

                  <div className="space-y-3 text-slate-600 dark:text-slate-300">
                    <div className="flex items-center justify-between bg-white/60 dark:bg-slate-800/50 px-4 py-2 rounded-xl">
                      <span className="font-medium">Nama</span>
                      <span className="text-sm">{dtp?.user?.name}</span>
                    </div>

                    <div className="flex items-center justify-between bg-white/60 dark:bg-slate-800/50 px-4 py-2 rounded-xl">
                      <span className="font-medium">Email</span>
                      <span className="text-sm">{dtp?.user?.email}</span>
                    </div>

                    <div className="flex items-center justify-between bg-white/60 dark:bg-slate-800/50 px-4 py-2 rounded-xl">
                      <span className="font-medium">No HP</span>
                      <span className="text-sm">
                        {dtp?.user?.no_hp || "+62 XXXX"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border">
                  <FileText className="w-5 h-5 text-pink-500" />
                  <div>
                    <p className="text-sm text-gray-500">Nomor Surat</p>
                    <p className="font-semibold text-gray-800">
                      {revdok?.nosur || "-"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border">
                  <User className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Pemilik</p>
                    <p className="font-semibold text-gray-800">
                      {revdok?.pemilik || "-"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border">
                  <Calendar className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500">Dibuat</p>
                    <p className="font-semibold text-gray-800">
                      {/* {new Date(revdok?.created_at).toLocaleDateString("id-ID")} */}

                      {FORMAT_DATE_HOUR_IND(revdok?.created_at)}
                    </p>
                  </div>
                </div>

                {revdok?.batas_waktu && (
                  <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border">
                    <Calendar className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="text-sm text-gray-500">Batas Waktu</p>
                      <p className="font-semibold text-gray-800">
                        {new Date(revdok?.batas_waktu).toLocaleDateString(
                          "id-ID"
                        )}
                      </p>
                    </div>
                  </div>
                )}
                <KategoriSelect revdok={revdok} reload={reload} />

                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border">
                  <CheckCircle className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-semibold capitalize text-gray-800">
                      {revdok?.status} (ID: {revdok?.status_id}) <br />
                      {FILTER_ALUR_REVDOK_SPI(revdok?.status_id)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-8/12">
              <div className="p-4 bg-white rounded-xl shadow-sm border">
                <p className="text-sm text-gray-500">Tugas</p>
                <p className="font-semibold text-gray-800">{revdok?.tugas}</p>
              </div>

              <div className="mt-8 flex flex-col gap-2">
                <div className="p-4 bg-white rounded-xl shadow-sm border flex items-center gap-3">
                  <LinkIcon className="w-5 h-5 text-indigo-500" />
                  <div>
                    <p className="text-sm text-gray-500">Dokumen URL</p>
                    <a
                      href={revdok?.dokumen_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline hover:text-blue-800 text-sm"
                    >
                      {revdok?.dokumen_url}
                    </a>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl shadow-sm border flex items-center gap-3">
                  <FileCheck className="w-5 h-5 text-teal-500" />
                  <div>
                    <p className="text-sm text-gray-500">Surat URL</p>
                    <a
                      href={revdok?.surat_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline hover:text-blue-800 text-sm"
                    >
                      {revdok?.surat_url}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div>
        <CardAlurRevdok />
      </div>

      <Response revdok={revdok} reload={reload} />
    </div>
  );
};

export default Detail;
