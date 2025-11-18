import React, { useEffect, useState } from "react";
import HugeRte from "../../../../components/HugeRte";
import { TEMPLATE_SURTUG } from "../../../../utils/spi";
import { ButtonSubmit } from "../../../../components/ButtonComp";
import { useAnggotaSpi } from "../../../../hooks/useAnggotaSpi";
import { fetchData, postData } from "../../../../utils/api";
import KopSurat from "../../../../components/KopSurat";
import { FORMAT_DATE_IND } from "../../../../constant/data";
import QrcodeComp from "../../../../components/QrcodeComp";

const SuratTugas = ({ dtp }) => {
  const [animate, setAnimate] = useState(false);
  const [rld, setRld] = useState(false)
  const [content, setContent] = useState("");
  const copyTemplateSurtug = () => setContent(TEMPLATE_SURTUG);
  const [datas, setDatas] = useState('')

  const path = ""

  const { userSpi, loading, error, refetch } = useAnggotaSpi();
  const [input, setInput] = useState({
    konslap_id: dtp?.id,
    nosur: "",
    jenis: "surtug",
    perihal: "",
    lampiran: "",
    body: "",
    ttd_name: "",
    ttd_nip: "",
    ttd_id : ""
  });

  // Update body kalau content berubah
  useEffect(() => {
    setInput((prev) => ({
      ...prev,
      body: content,
    }));
  }, [content]);


  // console.log("dtp srutug", datas)

  // Handler pilih TTD (set name + nip)
  const handleSelectTtd = (e) => {
    e.preventDefault();
    const id = e.target.value;
    const n = userSpi.find((it) => it.id == id);
    if (n) {
      setInput((prev) => ({
        ...prev,
        ttd_id: n.id,
        ttd_name: n.name,
        ttd_nip: n.nip,
      }));
    }
  };


  const getSurtug = () => {
  fetchData(`/adm/konslap_surtug?konslap_id=${dtp?.id}`, {
    setLoading: setAnimate,
    onSuccess: (res) => {
      setInput((prev) => ({
        ...prev,
        konslap_id: dtp?.id,
        jenis : "surtug",
        nosur: res?.data?.nosur || "",
        perihal: res?.data?.perihal || "",
        lampiran: res?.data?.lampiran || "",
        body: res?.data?.body || "",
        ttd_id: res?.data?.ttd_id || "",
        ttd_name: res?.data?.ttd_name || "",
        ttd_nip: res?.data?.ttd_nip || "",
      }));

      setDatas(res?.data)

      console.log("Res", res)
      setContent(res?.data?.body || "");

      console.log("in", input)
    },
    onError: (err) => {
      console.log("err", err);
    },
  });
};

  // console.log("input", input)
  useEffect(() => {
    getSurtug()
  },[rld])
  const handleSubmit = async (e) => {
    e.preventDefault();

        await postData('/adm/konslap_surtug_store', input, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log("Success!", res);
      },
      onError: (err) => {
        setErr(err?.response?.data?.detail || "Something went wrong!");
      }
    });
  }

  // console.log("contnete", content)
  return (
    <div className="flex-1 bg-white dark:bg-gray-800 shadow rounded-xl p-6 transition">
      <div className="flex flex-col gap-6">
        <h1 className="text_h1">Detail Surat Tugas</h1>
        {/* Header */}
 <div className="w-full mx-auto bg-white shadow-lg p-12 border border-gray-300">
      {/* Kop Surat */}
    <KopSurat />

      {/* Judul */}
      <div className="text-left my-8 text-[11pt]">
        <p className="">Nomor: {datas?.nosur}</p>
        <p className="">Lampiran: {datas?.lmpiran}</p>
        <p className="">Perihal: {datas?.perihal}</p>
      </div>

      {/* Isi Surat */}
      <div className="text-justify text-[15px] leading-relaxed">
                              <div dangerouslySetInnerHTML={{ __html: datas?.body }} />

      </div>

      {/* Tanda Tangan */}
<div className="flex justify-end mt-12">
  <div className="text-center">
    <p className="mb-1">Jakarta, {FORMAT_DATE_IND(datas?.created_at) || ""}</p>
    <p className="mb-1 font-semibold">Kepala Satuan Pengawasan Internal</p>

    {/* QRCode di tengah area tanda tangan */}
    <div className="flex flex-col items-center justify-center mt-4 mb-[3.5cm]">
      {/* {path} */}
      {/* <QrcodeComp path={path} /> */}
      {/* <br />
      <br />
      <br />
      <br />
      <br /> */}
    </div>

    {/* Nama & NIP */}
    <p className="font-bold underline mt-2">{datas?.ketua_ttd_name}</p>
    <p>NIP. {datas?.ketua_ttd_nip}</p>
  </div>
</div>
    </div>
      </div>
    </div>
  );
};

export default SuratTugas;
