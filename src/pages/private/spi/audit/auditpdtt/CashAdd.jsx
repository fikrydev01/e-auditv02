import { useEffect, useState } from "react";
import { FORMAT_RUPIAH } from "../../../../../constant/data";
import { postData } from "../../../../../utils/api";

const CashAdd = ({ data, utp, reload }) => {

    const [animate, setAnimate] = useState(false)
  const [form, setForm] = useState({
    id: null,
    audit_id: data?.id,
    periode_audit: data?.periode_audit,
    kode_unit: utp,
    tipe_kas: "",
    pecahan: "",
    jumlah: "",
    nilai: 0,
    selisih_jumlah: 0,
    bank: "",
    nomor_bank: "",
    tanggal_bank: "",
    diterima_bank: "",
    uraian: "",
    catatan_opname: "",
  });

  useState(() => {
      setForm((prev) => ({ ...prev, kode_unit: utp }));
  },[utp])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
console.log("utp", utp)


  const handleReset = () => {
    setForm({

      tipe_kas: "",
      pecahan: "",
      jumlah: "",
      nilai: "",
      selisih_jumlah: "",
      bank: "",
      nomor_bank: "",
      tanggal_bank: "",
      diterima_bank: "",
      uraian: "",
      catatan_opname: "",
    });
  };

  const tipeKasOptions = [
    { value: "kertas", label: "Kertas" },
    { value: "logam", label: "Logam" },
    { value: "giro", label: "Giro" },
    { value: "pembayaran", label: "Pembayaran" },
    { value: "penerimaan", label: "Penerimaan" },
    { value: "lain", label: "Lain-lain" },
  ];

  const pecahanOptions = [
    { value: 100000, label: "100.000" },
    { value: 50000, label: "50.000" },
    { value: 20000, label: "20.000" },
    { value: 10000, label: "10.000" },
    { value: 5000, label: "5.000" },
    { value: 2000, label: "2.000" },
    { value: 1000, label: "1.000" },
    { value: 500, label: "500" },
    { value: 200, label: "200" },
    { value: 100, label: "100" },
  ];

  const pecahan = form?.pecahan
  const jumlah = form?.jumlah

  const kalkulasiNilai = () => {
    const nilai = pecahan * jumlah
    setForm((prev) => ({
        ...prev,
        nilai: nilai,
    }));
}

  useEffect(() => {
    if(pecahan && jumlah){
        kalkulasiNilai()
    }
    
  },[pecahan, jumlah])


      const handleSubmit = async (e) => {
      e.preventDefault();

      await postData("/spi/audit_kas_store", form, {
        setLoading: setAnimate,
        onSuccess: (res) => {
          console.log("Successasda!", res);
          reload()
        //   setRld(!rld)
        },
        onError: (err) => {
          setErr(err?.response?.data?.detail || "Something went wrong!");
        },
      });
    };

  return (
    <div className="p-6 bg-white dark:bg-slate-900 shadow-lg rounded-xl border border-slate-200 dark:border-slate-700">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          Form Audit Cash
        </h2>
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          Reset Form
        </button>
      </div>
<div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mt-4 mb-4">
  <div className="flex items-start space-x-3">
    <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center mt-0.5">
      <span className="text-white text-xs font-bold">!</span>
    </div>
    <div>
      <p className="text-sm font-medium text-yellow-800 mb-1">
        Perhatian
      </p>
      <p className="text-xs text-yellow-700">
        Tipe kas <strong>Kertas/Logam</strong> wajib memilih pecahan dan jumlah. 
        Tipe kas lainnya langsung input nilai manual.
      </p>
    </div>
  </div>
</div>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Informasi Kas */}
        <h2>Informasi Kas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Tipe Kas</label>
            <select
              name="tipe_kas"
              value={form.tipe_kas}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Pilih tipe kas</option>
              {tipeKasOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Pecahan</label>
            <select
              name="pecahan"
              value={form.pecahan}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Pilih pecahan</option>
              {pecahanOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Jumlah</label>
            <input
              type="number"
              name="jumlah"
              value={form.jumlah}
              onChange={handleChange}
              className="form-input"
              min="0"
              placeholder="0"
            />
          </div>

          <div>
            <label className="form-label">Nilai (Rp)
                {FORMAT_RUPIAH(form?.nilai)}
            </label>
            <input
              type="number"
              name="nilai"
              step="0.01"
              value={form.nilai}
              onChange={handleChange}
              className="form-input"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Informasi Bank */}
                <h2>Informasi Bank</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <div>
            <label className="form-label">Bank</label>
            <input
              type="text"
              name="bank"
              value={form.bank}
              onChange={handleChange}
              className="form-input"
              placeholder="Nama Bank"
            />
          </div>

          <div>
            <label className="form-label">Nomor Bank</label>
            <input
              type="text"
              name="nomor_bank"
              value={form.nomor_bank}
              onChange={handleChange}
              className="form-input"
              placeholder="Nomor rekening"
            />
          </div>

          <div>
            <label className="form-label">Tanggal Bank</label>
            <input
              type="date"
              name="tanggal_bank"
              value={form.tanggal_bank}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div>
            <label className="form-label">Diterima Oleh</label>
            <input
              type="text"
              name="diterima_bank"
              value={form.diterima_bank}
              onChange={handleChange}
              className="form-input"
              placeholder="Nama penerima"
            />
          </div>
        </div>

        {/* Selisih */}
                <h2>Catatan Opname</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Selisih Jumlah. 
                                {FORMAT_RUPIAH(form?.selisih_jumlah)}

            </label>
            <input
              type="number"
              name="selisih_jumlah"
              step="0.01"
              value={form.selisih_jumlah}
              onChange={handleChange}
              className="form-input"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Text Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Uraian</label>
            <textarea
              name="uraian"
              value={form.uraian}
              onChange={handleChange}
              rows="3"
              className="form-input"
              placeholder="Masukkan uraian singkat"
            />
          </div>

          <div>
            <label className="form-label">Catatan Opname</label>
            <textarea
              name="catatan_opname"
              value={form.catatan_opname}
              onChange={handleChange}
              rows="3"
              className="form-input"
              placeholder="Masukkan catatan tambahan"
            />
          </div>
        </div>

        {/* Tombol */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2.5 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors flex items-center space-x-2"
          >
            <span>Simpan Data</span>
          </button>
        </div>
      </form>

      <style jsx>{`
        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #374151;
          font-size: 0.875rem;
        }
        
        .dark .form-label {
          color: #d1d5db;
        }
        
        .form-input {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          background-color: white;
          color: #374151;
          font-size: 0.875rem;
          transition: all 0.2s;
        }
        
        .dark .form-input {
          background-color: #1f2937;
          border-color: #4b5563;
          color: #f9fafb;
        }
        
        .form-input:focus {
          outline: none;
          ring: 2px;
          ring-color: #3b82f6;
          border-color: #3b82f6;
        }
        
        .form-input::placeholder {
          color: #9ca3af;
        }
        
        .dark .form-input::placeholder {
          color: #6b7280;
        }
        
        .form-input:disabled {
          background-color: #f9fafb;
          color: #6b7280;
          cursor: not-allowed;
        }
        
        .dark .form-input:disabled {
          background-color: #374151;
          color: #9ca3af;
        }
      `}</style>
    </div>
  );
};

export default CashAdd;