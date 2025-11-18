import { useEffect, useState } from "react";
import { UINJKTUNIT } from "../../../../utils/spi";
import { ButtonKembali, ButtonSubmit } from "../../../../components/ButtonComp";
import { postData } from "../../../../utils/api";

const AuditAdd = ({ dtp, kembali }) => {
  const [animate, setAnimate] = useState(false);
  const [err, setErr] = useState("");
  const [input, setInput] = useState({
    id: dtp?.id || "",
    periode_audit: dtp?.periode_audit || "",
    tipe_audit: dtp?.tipe_audit || "stock",
    kode_unit: dtp?.kode_unit || "",
    catatan: dtp?.catatan || "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    await postData("/adm/audit_store", input, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log("Success!", res);
      },
      onError: (err) => {
        setErr(err?.response?.data?.detail || "Terjadi kesalahan saat menyimpan data!");
      },
    });
  };

  return (
    <section className="w-full section-body">
      <ButtonKembali onClick={kembali} />
      <h3 className="text_h3">
        Penambahan Audit
      </h3>


      {err && (
        <div className="p-3 mb-4 text-sm rounded-lg bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200">
          ⚠️ {err}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Jenis Audit */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
            Jenis Audit *
          </label>
          <select
            name="tipe_audit"
            value={input?.tipe_audit}
            onChange={handleChange}
            className="rounded-lg border border-slate-300 dark:border-slate-600 
                       bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 
                       px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="stock">Stock</option>
            <option value="cash">Cash</option>
          </select>
        </div>

        {/* Periode Audit */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
            Periode Audit *
          </label>
          <input
            type="text"
            name="periode_audit"
            value={input?.periode_audit}
            onChange={handleChange}
            placeholder="Contoh: Semester Genap 2025"
            className="rounded-lg border border-slate-300 dark:border-slate-600 
                       bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 
                       px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Unit Teraudit */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
            Unit Teraudit *
          </label>
          <select
            name="kode_unit"
            value={input?.kode_unit}
            onChange={handleChange}
            className="rounded-lg border border-slate-300 dark:border-slate-600 
                       bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 
                       px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Pilih Unit --</option>
            {UINJKTUNIT?.map((dt) => (
              <option key={dt?.id} value={dt?.kode}>
                {dt?.unit}
              </option>
            ))}
          </select>
        </div>

        {/* Catatan */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
            Catatan
          </label>
          <textarea
            name="catatan"
            rows={4}
            value={input?.catatan}
            onChange={handleChange}
            placeholder="Tambahkan catatan terkait audit (opsional)"
            className="rounded-lg border border-slate-300 dark:border-slate-600 
                       bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 
                       px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tombol Submit */}
        <div className="pt-2">
          <ButtonSubmit title="Simpan" animate={animate} />
        </div>
      </form>
    </section>
  );
};

export default AuditAdd;
