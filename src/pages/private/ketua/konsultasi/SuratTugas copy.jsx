import React, { useEffect, useState } from "react";
import HugeRte from "../../../../components/HugeRte";
import { TEMPLATE_SURTUG } from "../../../../utils/spi";
import { ButtonSubmit } from "../../../../components/ButtonComp";
import { useAnggotaSpi } from "../../../../hooks/useAnggotaSpi";
import { fetchData, postData } from "../../../../utils/api";

const SuratTugas = ({ dtp }) => {
  const [animate, setAnimate] = useState(false);
  const [rld, setRld] = useState(false)
  const [content, setContent] = useState("");
  const copyTemplateSurtug = () => setContent(TEMPLATE_SURTUG);

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
      setContent(res?.data?.body || "");

      console.log("in", input)
    },
    onError: (err) => {
      console.log("err", err);
    },
  });
};

  console.log("input", input)
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

  console.log("contnete", content)
  return (
    <div className="flex-1 bg-white dark:bg-gray-800 shadow rounded-xl p-6 transition">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            Surat Tugas
          </h2>
        </div>

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

          <div>
            <label className="text-dark">TTD Secara otomatis akan oleh KETUA SPI</label>
          </div>

          {/* Rich Text Editor */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Isi Surat
            </label>
            <HugeRte content={content} setContent={setContent} />
          </div>

          {/* Submit */}
          {/* <ButtonSubmit animate={animate}>Simpan</ButtonSubmit> */}
        </form>
      </div>
    </div>
  );
};

export default SuratTugas;
