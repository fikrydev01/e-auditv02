import { useEffect, useState, useCallback } from "react";
import { useAnggotaSpi } from "../../../../hooks/useAnggotaSpi";
import HugeRte from "../../../../components/HugeRte";
import { AUDIT_AO_TEMPLATE } from "../../../../constant/data";
AUDIT_AO_TEMPLATE
import { ButtonSubmit } from "../../../../components/ButtonComp";
import { fetchData, postData } from "../../../../utils/api";
import CatatanKerja from "../../ketua/audit/CatatanKerja";

const Laporan = ({ data }) => {
  const { userSpi } = useAnggotaSpi();
  const [animate, setAnimate] = useState(false);
  const [content, setContent] = useState("");

  const [input, setInput] = useState({
    audit_id: "",
    tipe_audit: "",
    periode_audit : "",
    body: "",
  });

  /** 🔹 Update input saat data audit berubah */
  useEffect(() => {
    if (!data) return;
    setInput((prev) => ({
      ...prev,
      audit_id: data.id,
      kode_unit: data.kode_unit,
      tipe_audit: data.tipe_audit,
      periode_audit: data.periode_audit,
    }));
  }, [data]);

  /** 🔹 Ambil laporan dari server */
  const getLaporan = useCallback(() => {
    if (!data?.id) return;
    fetchData(`/spi/audit_laporan?audit_id=${data.id}`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        const laporan = res?.data || {};
        setContent(laporan.body || "");
        setInput((prev) => ({ ...prev, body: laporan.body || "" }));
      },
      onError: (err) => {
        console.error("Gagal memuat laporan:", err);
      },
    });
  }, [data]);

  /** Jalankan hanya sekali saat data.id berubah */
  useEffect(() => {
    getLaporan();
  }, [getLaporan]);

  /** 🔹 Sinkronkan body dengan content editor */
  useEffect(() => {
    setInput((prev) => ({ ...prev, body: content }));
  }, [content]);

  /** 🔹 Simpan laporan ke server */


  // console.log("input", input)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await postData("/spi/audit_laporan_store", input, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log("✅ Laporan berhasil disimpan!", res);
      },
      onError: (err) => {
        console.error("❌ Gagal menyimpan laporan:", err);
      },
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="w-full lg:w-9/12">
        <div className="section-body">
          {/* <button>BUtton PRINT LAPORAN</button> */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Header */}
            <div>
              <h1 className="text-xl font-bold text-slate-700 dark:text-slate-100">
                Konsep Laporan Kegiatan Audit
              </h1>
            </div>

            {/* Tombol Template */}
            <div className="flex items-center justify-between mb-2">
              <button
                type="button"
                onClick={() => setContent(AUDIT_AO_TEMPLATE)}
                className="px-3 py-1 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 
                          dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Template AUDIT
              </button>
            </div>

            {/* Editor */}
            <HugeRte content={content} setContent={setContent} />

            {/* Tombol Simpan */}
            <ButtonSubmit animate={animate} />
          </form>
        </div>
      </div>
      <div className="w-full lg:w-3/12">
      <div className="section-body">
      <CatatanKerja audit={data}/>

      </div>
      </div>
    </div>
  );
};

export default Laporan;
