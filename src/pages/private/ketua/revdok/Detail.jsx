import { useEffect, useState } from "react";
import { ButtonKembali } from "../../../../components/ButtonComp";

import { fetchData } from "../../../../utils/api";
import {
  FileText,
  Calendar,
  User,
  CheckCircle,
  Link as LinkIcon,
  FileCheck,
  Contact2,
} from "lucide-react";
import Disposisi from "./Disposisi";
import Reviewer from "./Reviewer";
import DrafSurat from "./DrafSurat";
import SPIChatRevdok from "../../SPIChatRevdok";
import CatatanKerja from "../../spi/revdok/CatatanKerja";
import NoDataFound from "../../../../components/NoDataFound";
const DetailRevdok = ({ dtp, kembali }) => {
  const [animate, setAnimate] = useState(false);
  const [data, setData] = useState("");
  const [rld, setRld] = useState(false);
  const reload = () => setRld((prev) => !prev);
  const [mod, setMod] = useState("disposisi");

  const [revdok, setRevdok] = useState("");
  const [surat, setSurat] = useState("");

  useEffect(() => {
    getData();
  }, [dtp]);

  const getData = () => {
    fetchData(`/adm/revdok_detail?id=${dtp?.id}`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log("refdoemk! oke", res?.data);
        setRevdok(res?.data?.revdok);
        setSurat(res?.data?.surat);
        // setData(res.data || []);
      },
      onError: (err) => {
        setErr(err?.detail || "Something went wrong!");
      },
    });
  };
  useEffect(() => {
    getData();
  }, [dtp, rld]);

  const [kmod, setKmod] = useState("disposisi");


  return (
    <div className="flex flex-col gap-4">
      <div className="">
        <ButtonKembali onClick={kembali} />
      </div>
      <div className="flex flex-col lg:flex-row  gap-6">
        <div className="w-full lg:w-9/12">
        <div className="section-body w-full">
          <h2 className="text_h1">Detail Review Dokumen</h2>

          <div
            className="p-6 rounded-2xl shadow-md border 
    bg-gradient-to-br from-pink-50 to-blue-50 
    dark:from-slate-800 dark:to-slate-900 dark:border-slate-700 transition-colors"
          >
            <h1
              className="text-lg font-semibold mb-4  flex items-center gap-2 uppercase
      text-slate-700 dark:text-slate-200"
            >
              <Contact2 />
              Identitas Pemohon
            </h1>

            <div className="space-y-3 text-slate-600 dark:text-slate-300">
              <div className="flex items-center justify-between bg-white/60 dark:bg-slate-800/50 px-4 py-2 rounded-xl">
                <span className="font-medium">Nama</span>
                <span className="text-sm">{revdok?.user?.name}</span>
              </div>

              <div className="flex items-center justify-between bg-white/60 dark:bg-slate-800/50 px-4 py-2 rounded-xl">
                <span className="font-medium">Email</span>
                <span className="text-sm">{revdok?.user?.email}</span>
              </div>

              <div className="flex items-center justify-between bg-white/60 dark:bg-slate-800/50 px-4 py-2 rounded-xl">
                <span className="font-medium">No HP</span>
                <span className="text-sm">
                  {revdok?.user?.no_hp || "+62 XXXX"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Kiri */}
            <div className="flex flex-col gap-4">
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
                    {new Date(revdok?.created_at).toLocaleDateString("id-ID")}
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
            </div>

            {/* Kanan */}
            <div className="flex flex-col gap-4">
              <div className="p-4 bg-white rounded-xl shadow-sm border">
                <p className="text-sm text-gray-500">Kategori</p>
                <p className="font-semibold text-gray-800">
                  {revdok?.kategori}
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl shadow-sm border">
                <p className="text-sm text-gray-500">Tugas</p>
                <p className="font-semibold text-gray-800">{revdok?.tugas}</p>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border">
                <CheckCircle className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-semibold capitalize text-gray-800">
                    {revdok?.status} (ID: {revdok?.status_id})
                  </p>
                </div>
              </div>

              {/* <div className="p-4 bg-white rounded-xl shadow-sm border">
                  <p className="text-sm text-gray-500">Jenis</p>
                  <p className="font-semibold text-gray-800">
                    {revdok?.jenis || "-"}
                  </p>
                </div> */}
            </div>
          </div>

          {/* Link Dokumen */}
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
        <div className="w-full lg:w-3/12">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setKmod("disposisi")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition 
        ${
          kmod === "disposisi"
            ? "bg-blue-500 text-white dark:bg-blue-600"
            : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
        }`}
              >
                Disposisi
              </button>

              <button
                onClick={() => setKmod("pic")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition 
        ${
          kmod === "pic"
            ? "bg-blue-500 text-white dark:bg-blue-600"
            : "bg-slate-100 text-slate-700 hover:bg-slate-200  dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
        }`}
              >
                Reviewer / PIC
              </button>
            </div>

            {kmod === "disposisi" && (
              <Disposisi data={revdok} reload={reload} />
            )}
            {kmod === "pic" && <Reviewer data={revdok} reload={reload} />}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="section-body h-fit">
            {surat ? 
            <DrafSurat revdok={revdok} data={surat} />
            : 
           <NoDataFound desc={'Surat'} />
            }

        </div>
        <div className="section-body h-fit">
            <CatatanKerja revdok={revdok} />
            <SPIChatRevdok data={revdok} />
          </div>
        <div className="w-full">
        <div className="w-full flex flex-col">

        </div>
        </div>
        <div className="w-full lg:w-3/12">
          <div className="flex flex-col gap-4">
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailRevdok;
