import React, { useEffect, useState } from "react";
import { FORMAT_RUPIAH } from "../../../../../constant/data";
import { postData } from "../../../../../utils/api";
import KopSurat from "../../../../../components/KopSurat";
import KopSuratSpi from "../../../../../components/KopSuratSpi";

export default function CashAdd({ data, utp, reload, dcash }) {
  const [animate, setAnimate] = useState(false);
  const [err, setErr] = useState(""); // Added missing error state

  // Initialize form data dengan nilai default
  const [formData, setFormData] = useState({
    // --- Informasi Bank ---
    audit_id: data?.id || "",
    periode_audit: data?.periode_audit || "",
    kode_unit: utp || "",
    nama_bank: "",
    norek: "",
    tgl_saldo: "",
    saldo_bank: "",

    // --- Uang Kertas ---
    uang_kertas_100: 0,
    uang_kertas_50: 0,
    uang_kertas_20: 0,
    uang_kertas_10: 0,
    uang_kertas_5: 0,
    uang_kertas_2: 0,
    uang_kertas_1: 0,

    // --- Uang Logam ---
    uang_logam_1000: 0,
    uang_logam_500: 0,
    uang_logam_200: 0,
    uang_logam_100: 0,

    // --- Penyesuaian ---
    bukti_pembayaran_belum_buku: 0,
    bukti_penerimaan_belum_buku: 0,
    saldo_menurut_kas: 0,

    // --- Catatan ---
    catatan_atas_selisih: "",

    // --- Penandatangan ---
    nama_audit01: "",
    nama_audit02: "",
    nama_unit1: "",
    nama_unit2: "",
  });

  // Effect untuk update form data ketika dcash berubah
  useEffect(() => {
    if(dcash){
      setFormData(dcash)
    }else{
      setFormData({audit_id: data?.id || "",
    periode_audit: data?.periode_audit || "",
    kode_unit: utp || "",
    nama_bank: "",
    norek: "",
    tgl_saldo: "",
    saldo_bank: "",

    // --- Uang Kertas ---
    uang_kertas_100: 0,
    uang_kertas_50: 0,
    uang_kertas_20: 0,
    uang_kertas_10: 0,
    uang_kertas_5: 0,
    uang_kertas_2: 0,
    uang_kertas_1: 0,

    // --- Uang Logam ---
    uang_logam_1000: 0,
    uang_logam_500: 0,
    uang_logam_200: 0,
    uang_logam_100: 0,

    // --- Penyesuaian ---
    bukti_pembayaran_belum_buku: 0,
    bukti_penerimaan_belum_buku: 0,
    saldo_menurut_kas: 0,

    // --- Catatan ---
    catatan_atas_selisih: "",

    // --- Penandatangan ---
    nama_audit01: "",
    nama_audit02: "",
    nama_unit1: "",
    nama_unit2: "",})
    }
  }, [dcash, utp]); // Hanya depend on dcash

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: name.includes('uang_') || name.includes('bukti_') || name.includes('saldo_') 
        ? Number(value) || 0 
        : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postData("/spi/audit_kas_store", formData, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log("Success!", res);
        if (reload) reload();
      },
      onError: (err) => {
        setErr(err?.response?.data?.detail || "Something went wrong!");
      },
    });
  };

  return (
    <div className="w-full mx-auto bg-white dark:bg-gray-900 p-8 shadow-md  border border-gray-200 dark:border-gray-700">
      {/* Tampilkan error jika ada */}
      {err && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {err}
        </div>
      )}
      <KopSuratSpi />
      <form onSubmit={handleSubmit} className="space-y-10">
        {/* --- INFORMASI BANK --- */}
        <section>
          <h2 className="text-lg font-semibold text-blue-700 mb-4">Informasi Bank</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <input 
              type="text" 
              name="nama_bank" 
              placeholder="Nama Bank"
              value={formData?.nama_bank} 
              onChange={handleChange}
              className="input" 
            />
            <input 
              type="text" 
              name="norek" 
              placeholder="Nomor Rekening"
              value={formData.norek} 
              onChange={handleChange}
              className="input" 
            />
            <input 
              type="date" 
              name="tgl_saldo"
              value={formData.tgl_saldo} 
              onChange={handleChange}
              className="input" 
            />
          </div>
          <div className="mt-3 flex flex-col">
            <label className="text-sm text-gray-600">
              Saldo Bank (Rp) {FORMAT_RUPIAH(formData.saldo_bank)}
            </label>
            <input 
              type="number" 
              name="saldo_bank"
              value={formData.saldo_bank} 
              onChange={handleChange}
              className="input w-64 mt-1" 
            />
          </div>
        </section>


        {/* --- UANG KERTAS --- */}
        <section>
          <h2 className="text-lg font-semibold text-blue-700 mb-4">Uang Kertas</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
            {[
              ["uang_kertas_100", "Pecahan Rp 100.000", 100000],
              ["uang_kertas_50", "Pecahan Rp 50.000", 50000],
              ["uang_kertas_20", "Pecahan Rp 20.000", 20000],
              ["uang_kertas_10", "Pecahan Rp 10.000", 10000],
              ["uang_kertas_5", "Pecahan Rp 5.000",5000],
              ["uang_kertas_2", "Pecahan Rp 2.000",2000],
              ["uang_kertas_1", "Pecahan Rp 1.000", 1000],
            ].map(([key, label, nominal]) => (
              <div key={key}>
                <label className="text-sm text-gray-500">{label}, Total {FORMAT_RUPIAH(formData[key]* nominal || 0)}</label>
                <input type="number" name={key} value={formData[key]} onChange={handleChange} className="input" />
              </div>
            ))}
          </div>
        </section>

        {/* --- UANG LOGAM --- */}
        <section>
          <h2 className="text-lg font-semibold text-blue-700 mb-4">Uang Logam</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
            {[
              ["uang_logam_1000", "Uang Logam Pecahan Rp 1.000", 1000],
              ["uang_logam_500", "Uang Logam Pecahan Rp 500", 500],
              ["uang_logam_200", "Uang Logam Pecahan Rp 200", 200],
              ["uang_logam_100", "Uang Logam Pecahan Rp 100", 100],
            ].map(([key, label, nominal]) => (
              <div key={key}>
                <label className="text-sm text-gray-500">{label}, Total {FORMAT_RUPIAH(formData[key]* nominal || 0)}</label>
                <input type="number" name={key} value={formData[key]} onChange={handleChange} className="input" />
              </div>
            ))}
          </div>
        </section>

        {/* --- PENYESUAIAN --- */}
        <section>
          <h2 className="text-lg font-semibold text-blue-700 mb-4">Penyesuaian</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-600">Bukti Pembayaran Belum Dibukukan, {FORMAT_RUPIAH(formData?.bukti_pembayaran_belum_buku)}</label>
              <input type="number" name="bukti_pembayaran_belum_buku"
                value={formData.bukti_pembayaran_belum_buku} onChange={handleChange} className="input mt-1" />
            </div>
            <div>
              <label className="text-sm text-gray-600">Bukti Penerimaan Belum Dibukukan,  {FORMAT_RUPIAH(formData?.bukti_penerimaan_belum_buku)}</label>
              <input type="number" name="bukti_penerimaan_belum_buku"
                value={formData.bukti_penerimaan_belum_buku} onChange={handleChange} className="input mt-1" />
            </div>
            <div>
              <label className="text-sm text-gray-600">Saldo Menurut Buku Kas,{FORMAT_RUPIAH(formData?.saldo_menurut_kas)}</label>
              <input type="number" name="saldo_menurut_kas"
                value={formData.saldo_menurut_kas} onChange={handleChange} className="input mt-1" />
            </div>
          </div>
        </section>

        {/* --- CATATAN --- */}
        <section>
          <h2 className="text-lg font-semibold text-blue-700 mb-4">Catatan Atas Selisih</h2>
          <textarea
            name="catatan_atas_selisih"
            placeholder="Catatan mengenai selisih kas (jika ada)"
            value={formData.catatan_atas_selisih}
            onChange={handleChange}
            className="input h-24 resize-none"
          />
        </section>

        {/* --- PENANDATANGAN --- */}
        <section>
          <h2 className="text-lg font-semibold text-blue-700 mb-4">Penandatangan</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Tim Audit</label>
              <input type="text" name="nama_audit01" placeholder="Nama Tim Audit 1"
                value={formData.nama_audit01} onChange={handleChange} className="input mb-2" />
              <input type="text" name="nama_audit02" placeholder="Nama Tim Audit 2"
                value={formData.nama_audit02} onChange={handleChange} className="input" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Unit / Fakultas</label>
              <input type="text" name="nama_unit1" placeholder="Nama Perwakilan Unit / Fakultas 1"
                value={formData.nama_unit1} onChange={handleChange} className="input mb-2" />
              <input type="text" name="nama_unit2" placeholder="Nama Perwakilan Unit / Fakultas 2"
                value={formData.nama_unit2} onChange={handleChange} className="input" />
            </div>
          </div>
        </section>

        {/* --- TOMBOL SIMPAN --- */}
        <div className="flex justify-end">
          <button type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-lg shadow">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
