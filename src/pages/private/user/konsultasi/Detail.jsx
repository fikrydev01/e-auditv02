import { useState, useEffect } from "react";
import { ButtonKembali } from "../../../../components/ButtonComp";
import KonslapLogs from "../logs/KonslapLogs";
import { FILTER_ALURKONSLAP_USER } from "../../../../constant/data";
import {
  API_URL,
  deleteData,
  fetchData,
  postData,
} from "../../../../utils/api";
import DokumenPendukung from "../../../../components/DokumenPendukung";
import DetailUpdateLaporan from "./DetailUpdateKonsultasi";

const Detail = ({ dtp, kembali }) => {
  const [datas, setDatas] = useState("");
  const [animate, setAnimate] = useState(false);
  const [err, setErr] = useState("");
  const [rld, setRld] = useState(false);
  const reload = () => setRld(!rld)
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


  return (
    <div className="flex flex-col gap-6">
      {/* Tombol Kembali */}
      <div>
        <ButtonKembali onClick={kembali} />
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-6">
        {/* Bagian Detail */}
        <div className="w-full lg:w-8/12 flex flex-col gap-4">
          <h2 className="text_h2">Detail Konsultasi</h2>

          <div className="text-sm">
            <span className="font-semibold text-dark">
              Status Laporan Anda:
            </span>{" "}
            <span className="px-3 py-1 rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              {FILTER_ALURKONSLAP_USER(datas?.status_id)}
            </span>
          </div>

            <DetailUpdateLaporan data={datas} reload={reload} />
{/* 
          <DokumenPendukung
            dokumen={datas?.dokumen}
            apiUrl={API_URL}
            //   onDelete={(doc) => console.log("Hapus dokumen:", doc?.id)}
            onDelete={(doc) => hapusDokumen(doc?.id)}
            onAdd={() => console.log("Tambah dokumen")}
            onUpload={handleUpload}
          /> */}
        </div>

        {/* Bagian Log */}
        <div className="w-full lg:w-4/12">
          <KonslapLogs data={dtp} />
        </div>
      </div>
    </div>
  );
};

export default Detail;
