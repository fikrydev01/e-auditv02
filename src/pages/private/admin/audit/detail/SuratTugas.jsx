import React, { useEffect, useState } from "react";
import HugeRte from "../../../../../components/HugeRte";
import { TEMPLATE_SURTUG } from "../../../../../utils/spi";
import { ButtonSubmit } from "../../../../../components/ButtonComp";

import { useAnggotaSpi } from "../../../../../hooks/useAnggotaSpi";
import { fetchData, postData } from "../../../../../utils/api";
import BtnPrintSurtugAudit from "../../../../../components/BtnPrintSurtugAudit";
import BtnPrintSurtugAuditTteKemenag from "../../../../../components/BtnPrintSurtugAuditTteKemenag";
const SuratTugas = ({ dtp }) => {
  const [animate, setAnimate] = useState(false);
  const [rld, setRld] = useState(false)
  const [content, setContent] = useState("");
  const copyTemplateSurtug = () => setContent(TEMPLATE_SURTUG);

  const { userSpi, loading, error, refetch } = useAnggotaSpi();
  const [input, setInput] = useState({
    audit_id : dtp?.id,
    nosur: "",
    jenis: "surtug",
    perihal: "",
    lampiran: "",
    body: "",
    tte_kemenag: "",
    // ttd_name: "",
    // ttd_nip: "",
    // ttd_id : ""
  });

  // console.log("content", content)

  // Update body kalau content berubah
  useEffect(() => {
    setInput((prev) => ({
      ...prev,
      body: content,
    }));
  }, [content]);

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
  fetchData(`/adm/audit_surtug?audit_id=${dtp?.id}`, {
    setLoading: setAnimate,
    onSuccess: (res) => {
      setInput((prev) => ({
        ...prev,
        audit_id: dtp?.id,
        jenis : "surtug",
        uuid: res?.data?.uuid || "",
        nosur: res?.data?.nosur || "",
        perihal: res?.data?.perihal || "",
        lampiran: res?.data?.lampiran || "",
        body: res?.data?.body || "",
        ttd_id: res?.data?.ttd_id || "",
        ttd_name: res?.data?.ttd_name || "",
        ttd_nip: res?.data?.ttd_nip || "",
        tte_kemenag: res?.data?.tte_kemenag || "",
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
  const handleSubmit = async (e) => {
    e.preventDefault();

        await postData('/adm/audit_surtug_store', input, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log("Success!", res);
        getSurtug()
      },
      onError: (err) => {
        console.log("Err", err)
        // setErr(err?.response?.data?.detail || "Something went wrong!");
      }
    });
  }

  return (
    <div className="flex-1 bg-white dark:bg-gray-800 shadow rounded-xl p-6 transition">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text_h1">
            Surat Tugas
          </h2>  
          {/* <p className="text-sm text-red-500 dark:text-red-400 mt-1">
            Silakan isi form atau klik tombol untuk menyalin draf Surat Tugas.
            (Aktif jika Status ID = 3)
          </p> */}
          <div className="flex flex-row gap-2">
          <BtnPrintSurtugAudit audit={dtp} surtug={input} stte={true}/>
          <BtnPrintSurtugAudit audit={dtp} surtug={input} stte={false}/>
            
          <BtnPrintSurtugAuditTteKemenag surtug={input}/>
          </div>
        </div>

        {/* Copy Template Button */}
 

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={(e)=>handleSubmit(e)}>
          {/* Nomor Surat */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Nomor Surat <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nosur"
              required
              value={input.nosur}
              onChange={(e) => setInput({ ...input, nosur: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 
                focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 outline-none transition"
            />
          </div>

          {/* Perihal */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Perihal
            </label>
            <input
              type="text"
              name="perihal"
              required
              value={input.perihal}
              onChange={(e) => setInput({ ...input, perihal: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 
                focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 outline-none transition"
            />
          </div>

          {/* Lampiran */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Lampiran
            </label>
            <input
              type="text"
              name="lampiran"
              required
              value={input.lampiran}
              onChange={(e) => setInput({ ...input, lampiran: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 
                focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 outline-none transition"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              URL TTE KEMENAG (GDRIVE)
            </label>
            <input
              type="text"
              name="tte_kemenag"
              required
              value={input.tte_kemenag}
              onChange={(e) => setInput({ ...input, tte_kemenag: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 
                focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 outline-none transition"
            />
          </div>



          <div className="flex items-center justify-between">
            <h3 className="text-md font-semibold">Draf Surat Tugas</h3>
       <button
          onClick={copyTemplateSurtug}
          className="self-start bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600 text-white text-sm px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
        >
          Copy dari Template
        </button>

          </div>



          <div className="flex flex-col gap-1">
            

              
            <HugeRte content={content} setContent={setContent} />
          </div>

          {/* Submit */}
          <ButtonSubmit animate={animate}>Simpan</ButtonSubmit>
        </form>
      </div>
    </div>
  );
};

export default SuratTugas;
