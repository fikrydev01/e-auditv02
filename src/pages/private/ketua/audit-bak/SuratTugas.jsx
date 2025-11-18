import React, { useEffect, useState } from "react";
import { APP_MAIN_URL, fetchData } from "../../../../utils/api";
import QrcodeComp from "../../../../components/QrcodeComp";
import { FORMAT_DATE_IND } from "../../../../constant/data";
import KopSurat from "../../../../components/KopSurat";
import { Printer } from "lucide-react";
import NoDataFound from "../../../../components/NoDataFound";

// import HugeRte from "../../../../../components/HugeRte";
// import { TEMPLATE_SURTUG } from "../../../../../utils/spi";


// import { useAnggotaSpi } from "../../../../../hooks/useAnggotaSpi";

const SuratTugas = ({ dtp }) => {
  const [animate, setAnimate] = useState(false);
  const [rld, setRld] = useState(false)
  const [content, setContent] = useState("");
  const [input, setInput] = useState('')

  console.log("dtp", dtp)

let path = APP_MAIN_URL + `/val/surat/surtug?uuid=${input?.uuid || ""}`


  const getSurtug = () => {
  fetchData(`/adm/audit_surtug?audit_id=${dtp?.id}`, {
    setLoading: setAnimate,
    onSuccess: (res) => {
      setInput((prev) => ({
        ...prev,
        audit_id: dtp?.id,
        jenis : "surtug",
        uuid: res?.data?.uuid || "",
        tgl_surat: res?.data?.tgl_surat || "",
        nosur: res?.data?.nosur || "",
        perihal: res?.data?.perihal || "",
        lampiran: res?.data?.lampiran || "",
        body: res?.data?.body || "",
        ttd_id: res?.data?.ttd_id || "",
        ttd_name: res?.data?.ttd_name || "",
        ttd_nip: res?.data?.ttd_nip || "",
      }));
      setContent(res?.data?.body || "")
    },
    onError: (err) => {
      console.log("err", err);
    },
  });
};

  useEffect(() => {
    getSurtug()
  },[rld])
  
    if (dtp?.status_id <= 2) {
  return <NoDataFound desc="Surat Tugas" />;
}

  return (
    <div className=" bg-white dark:bg-gray-800 shadow rounded-xl p-6 transition text-dark">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <a
        href={path}
        target="__blank"
        className="bg-emerald-600 px-3 py-1 rounded-md w-fit flex items-center gap-2 text-white"
        >
            <Printer size={14} /> Print
        </a>
        <div>

          {/* <p className="text-sm text-red-500 dark:text-red-400 mt-1">
            Silakan isi form atau klik tombol untuk menyalin draf Surat Tugas.
            (Aktif jika Status ID = 3)
          </p> */}
        </div>

<KopSurat />

      {/* Judul */}
      <div className="my-8 text-[15px]">
        {/* <h2 className="text-xl font-bold underline uppercase">Surat Tugas</h2> */}
        <p className="">Nomor : {input?.nosur}</p>
        <p className="">Lapiran : {input?.lampiran}</p>
        <p className="">Perihal : {input?.perihal}</p>
      </div>

      <div className="text-justify text-[15px] ml-[100px] leading-relaxed text-dark">
                              <div dangerouslySetInnerHTML={{ __html: content }} />

      </div>

      <div className="flex justify-end mt-12">
  <div className="text-center">
    <p className="mb-1">Jakarta, {FORMAT_DATE_IND(input?.tgl_surat) || ""}</p>
    <p className="mb-1 font-semibold">Kepala Satuan Pengawasan Internal</p>

    {/* QRCode di tengah area tanda tangan */}
    <div className="flex flex-col items-center justify-center mt-4 mb-4">
      {/* {path} */}
      <QrcodeComp path={path} />
    </div>

    {/* Nama & NIP */}
    <p className="font-bold underline mt-2">{input?.ttd_name}</p>
    <p>NIP. {input?.ttd_nip}</p>
  </div>
</div>

      </div>
    </div>
  );
};

export default SuratTugas;
