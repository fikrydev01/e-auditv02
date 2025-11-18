import { useState, useEffect } from "react";
import { ButtonKembali } from "../../../../components/ButtonComp";
import KonslapLogs from "../logs/KonslapLogs";
import {
  FILTER_ALUR_DUMAS_USER,
  FILTER_ALURKONSLAP_USER,
} from "../../../../constant/data";
import {
  API_URL,
  deleteData,
  fetchData,
  postData,
} from "../../../../utils/api";
import DokumenPendukung from "../../../../components/DokumenPendukung";
import DetailUpdateLaporan from "./DetailUpdateLaporan";
import DumasLog from "../logs/DumasLog";

const Detail = ({ dtp, kembali }) => {
  const [datas, setDatas] = useState("");
  const [animate, setAnimate] = useState(false);
  const [err, setErr] = useState("");
  const [rld, setRld] = useState(false);
  const reload = () => setRld(!rld);
  const getDatas = () => {
    fetchData(`/usr/konslap_detail?id=${dtp?.id}`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        // console.log("Success! detail", res);
        setDatas(res?.data || "");
      },
      onError: (err) => {
        setErr(err?.detail || "Something went wrong!");
      },
    });
  };
  useEffect(() => {
    getDatas();
  }, [dtp, rld]);

  const [formData, setFormData] = useState({
    nama_pelapor: dtp?.nama_pelapor || "",
    kategori_laporan: dtp?.kategori_laporan || "",
    deskripsi: dtp?.deskripsi || "",
    unit_terlapor: dtp?.unit_terlapor || "",
    tgl_kejadian: dtp?.tgl_kejadian || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(formData);
  };

  console.log("Datas", datas);

  const hapusDokumen = (id) => {
    deleteData(`/usr/konslap/delete_dokumen?id=${id}`, {
      onSuccess: () => {
        console.log("Dokumen berhasil dihapus");
        setRld(!rld);
      },
      onError: (error) => {
        console.error("Gagal menghapus dokumen:", error);
      },
    });
  };
  const handleUpload = (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("konslap_id", datas?.id); // ambil dari detail konslap
    formData.append("files", file);

    postData("/usr/konslap/upload_dokumen", formData, {
      onSuccess: (res) => {
        console.log("Dokumen berhasil diunggah", res);
        setRld(!rld);
      },
      onError: (error) => {
        console.error("Gagal mengunggah dokumen:", error);
        alert("Upload gagal!");
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Tombol Kembali */}
      <div>
        <ButtonKembali onClick={kembali} />
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-6">
        {/* Bagian Detail */}
        <div className="w-full lg:w-8/12 flex flex-col gap-4">
          <h2 className="text_h2">Detail Dumas</h2>
          {datas?.status === "tolak" && (
            <div className="bg-white dark:bg-gray-800 border-l-4 border-red-500 rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-red-600 dark:text-red-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-red-700 dark:text-red-300 font-bold text-base">
                        Dumas Ditolak
                      </h3>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="text-gray-700 dark:text-gray-300 font-semibold text-sm mb-2">
                      Alasan Penolakan:
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {datas?.tolak_alasan || "Tidak ada alasan yang diberikan"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {datas?.status === "tolak" ? null : (
            <div className="text-sm">
              <span className="font-semibold text-dark">
                Status Laporan Anda:
              </span>{" "}
              <span className="px-3 py-1 rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                {FILTER_ALUR_DUMAS_USER(datas?.status_id)}
              </span>
            </div>
          )}

          <DetailUpdateLaporan data={datas} reload={reload} />

          <DokumenPendukung
            dokumen={datas?.dokumen}
            apiUrl={API_URL}
            //   onDelete={(doc) => console.log("Hapus dokumen:", doc?.id)}
            onDelete={(doc) => hapusDokumen(doc?.id)}
            onAdd={() => console.log("Tambah dokumen")}
            onUpload={handleUpload}
          />
        </div>

        {/* Bagian Log */}
        <div className="w-full lg:w-4/12">
          {/* <KonslapLogs data={dtp} /> */}
          <DumasLog data={dtp} />
        </div>
      </div>
    </div>
  );
};

export default Detail;
