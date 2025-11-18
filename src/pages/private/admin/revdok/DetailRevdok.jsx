import { useEffect, useState } from "react";
import { ButtonKembali } from "../../../../components/ButtonComp";
import Disposisi from "./detail/Disposisi";
import { fetchData, postData } from "../../../../utils/api";

import {
  FileText,
  Calendar,
  User,
  CheckCircle,
  Link as LinkIcon,
  Printer,
  FileCheck,
} from "lucide-react";
import { ClipboardList, Logs, Users } from "lucide-react";

import RevdokLog from "../../../../components/RevdokLog";
import SuratResponse from "./SuratResponse";
import Reviewer from "./detail/Reviewer";
import DetailSuratEditable from "./detail/DetailSuratEditable";
const DetailRevdok = ({ dtp, kembali }) => {
  const [animate, setAnimate] = useState(false);
  const [data, setData] = useState("");
  const [rld, setRld] = useState(false);
  const reload = () => setRld((prev) => !prev);
  const [mod, setMod] = useState("disposisi");

  const [revdok, setRevdok] = useState("");

  useEffect(() => {
    getData();
  }, [dtp]);

  // console.log("Dtpasdfasd", dtp)

  const getData = () => {
    fetchData(`/adm/revdok_detail?id=${dtp?.id}`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        // console.log("refdoemk! oke", res);
        setRevdok(res?.data?.revdok);
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "created_at" && value) {
      // Ambil tanggal dari input (misal: 2025-06-18)
      const datePart = value;

      // Ambil waktu sekarang dalam jam, menit, detik
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      // Gabungkan ke format MySQL datetime
      const formattedDateTime = `${datePart} ${hours}:${minutes}:${seconds}`;

      // Update state
      setRevdok((prev) => ({
        ...prev,
        created_at: formattedDateTime,
      }));
    } else {
      // Field lain update normal
      setRevdok((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };


  const updateRevdok = (e) => {
    e.preventDefault();

    postData("/adm/revdok/update_store", revdok, {
      setLoading: setAnimate,
      requireConfirm: false,
      onSuccess: (res) => {
        console.log("Success!, dasfasd", res);
      },
      onError: (err) => {
        setErr(err?.response?.data?.detail || "Something went wrong!");
      },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text_h1">Detail Review Dokumen</h1>
      <div className="">
        <ButtonKembali onClick={kembali} />
      </div>
      <div className="flex flex-col lg:flex-row  gap-6">
        {/* <a
  target="_blank"
  rel="noopener noreferrer"
  href={`http://localhost:5173/val/surat/revdok?uuid=${revdok?.uuid}`}
  className="bg-emerald-600 px-2 py-1 w-fit rounded-md text-xs flex items-center gap-2 text-white z-50 relative pointer-events-auto"
  style={{ position: "", zIndex: 9999 }}
>
  Print <Printer className="text-white w-3 h-3" />
</a> */}
        <div className="w-full flex flex-col gap-6">
          <section className="section-body w-full">
            <h2 className="text_h1">📑 Detail Review Dokumen</h2>
            {/* <DetailSuratEditable revdok={revdok}
              onSave={(data) => console.log("Data baru:", data)}

            /> */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border">
                  <FileText className="w-5 h-5 text-pink-500" />
                  <div className="w-full">
                    <p className="text-sm text-gray-500">Nomor Surat *</p>
                    {/* <p className="font-semibold text-gray-800">
                      {revdok?.nosur || "-"}
                    </p> */}
                    <input
                      className="w-full bg-red-50 rounded-md px-2 py-1"
                      onChange={(e) => handleChange(e)}
                      name="nosur"
                      value={revdok?.nosur}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border">
                  <User className="w-5 h-5 text-blue-500" />
                  <div className="w-full">
                    <p className="text-sm text-gray-500">Pemilik *</p>
                    {/* <p className="font-semibold text-gray-800">
                      {revdok?.pemilik || "-"}
                    </p> */}
                    <input
                      className="w-full bg-red-50 rounded-md px-2 py-1"
                      onChange={(e) => handleChange(e)}
                      name="pemilik"
                      value={revdok?.pemilik}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border">
                  <Calendar className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500">Dibuat *</p>
                    {/* <p className="font-semibold text-gray-800">
                      {new Date(revdok?.created_at).toLocaleDateString("id-ID")}
                    </p> */}
                    <input
                      type="date"
                      className="w-full bg-red-50 rounded-md px-2 py-1"
                      onChange={handleChange}
                      name="created_at"
                      value={
                        revdok?.created_at
                          ? revdok.created_at.split(" ")[0]
                          : ""
                      }
                    />
                    <small>Pukul akan mengikuti waktu pc saat ini</small>
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

              <div className="flex flex-col gap-4">
                <div className="p-4 bg-white rounded-xl shadow-sm border">
                  <p className="text-sm text-gray-500">Kategori *</p>
                  {/* <p className="font-semibold text-gray-800">
                    {revdok?.kategori}
                  </p> */}
                  <select
                    value={revdok?.kategori}
                    onChange={(e) => handleChange(e)}
                    name="kategori"
                    className="w-full bg-red-50 rounded-md px-2 py-1"
                  >
                    <option value="">Pilih</option>
                    <option value="lhr">Laporan Hasil Reviu</option>
                    <option value="pl">Pelaporan Lainnnya</option>
                  </select>
                </div>

                <div className="p-4 bg-white rounded-xl shadow-sm border">
                  <p className="text-sm text-gray-500">Tugas *</p>
                  {/* <p className="font-semibold text-gray-800">{revdok?.tugas}</p> */}
                  <input
                    className="w-full bg-red-50 rounded-md px-2 py-1"
                    onChange={(e) => handleChange(e)}
                    name="tugas"
                    value={revdok?.tugas}
                  />
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
              </div>

              <button
                onClick={updateRevdok}
                className="bg-emerald-600 text-sm text-white px-4 py-2 rounded-md"
              >
                Simpan Peruahan
              </button>
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
          </section>

          <SuratResponse data={dtp} />
        </div>
        <div className="w-full lg:w-5/12 flex flex-col gap-2">
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
              ? "bg-blue-100 text-blue-700 dark:bg-blue-600 dark:text-white"
              : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }
        `}
            >
              <Users size={16} />
              PIC
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
          {mod === "disposisi" && <Disposisi data={revdok} reload={reload} />}
          {mod === "log" && <RevdokLog data={revdok} />}
          {mod === "pic" && <Reviewer data={revdok} />}
        </div>
      </div>
    </div>
  );
};

export default DetailRevdok;
