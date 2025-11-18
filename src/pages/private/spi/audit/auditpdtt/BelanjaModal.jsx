import { useState, useEffect } from "react";
import { UINJKTUNIT } from "../../../../../utils/spi";
import { fetchData, postData } from "../../../../../utils/api";
import { FORMAT_RUPIAH } from "../../../../../constant/data";
import TableBelanja from "./TableBelanja";

import KopSurat from "../../../../../components/KopSurat";
import AuditBarjasInvoiceHeader from "../../../../../components/audit/AuditBarjasInvoiceHeader";
import KopSuratSpi from "../../../../../components/KopSuratSpi";
import CekHargaBarangElektronik from "../auditbarjas/CekHargaBarangElektronik";
import { Eye } from "lucide-react";

const BelanjaModal = ({ data }) => {
  const [animate, setAnimate] = useState(false);
  const [utp, setUtp] = useState("");
  const [invtp, setInvtp] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [barang, setBarang] = useState([]);
  const [editingId, setEditingId] = useState(null);


      useEffect(() => {
      setUtp(data?.kode_unit);
    }, [data]);

  // ==================== FORM ====================
  const [form, setForm] = useState({
    id: "",
    invoice_id: "",
    audit_id: data?.id || "",
    periode_audit: data?.periode_audit || "",
    kode_unit: "",
    inv_spesifikasi: "",
    inv_kuantitas: "",
    inv_satuan: "",
    inv_stock_opname: "",
    inv_selisih: "",
    inv_harga_satuan: "",
    inv_jumlah_kurang: "",
    inv_total_kontrak: "",
    hp_harga_pasar: "",
    hp_harga_maksimal: "",
    hp_selisih: "",
    hp_total_selisih: "",
    hp_sumber: "",
    hp_tgl_sumber: "",
    hp_alamat_sumber: "",
  });

  // ==================== FETCH INVOICE ====================
  const getDatas = () => {
    if (!utp) return;
    fetchData(
      `/spi/audit_barjas_invoice?audit_id=${data.id}&kode_unit=${utp}&periode_audit=${data?.periode_audit}`,
      {
        setLoading: setAnimate,
        onSuccess: (res) => setInvoices(res.data || []),
        onError: (err) => console.error("Error fetch:", err),
      }
    );
  };

    const getBarang = () => {
    fetchData(`/spi/audit_barjas_belanja?audit_id=${data.id}&kode_unit=${utp}&periode_audit=${data?.periode_audit}&invoice_id=${invtp}`, {
      setLoading: setAnimate,
      onSuccess: (res) => setBarang(res.data || []),
      onError: (err) =>
        console.log('err', err)
        // setError(err?.detail || "Terjadi kesalahan saat fetch data!"),
    });
  };

  useEffect(() => {
    getDatas()
  }, [utp]);
  useEffect(() => {
    getBarang()
  }, [invtp]);

  // console.log("barang", barang)
  // ==================== UPDATE FORM SAAT UNIT / INVOICE DIPILIH ====================
  useEffect(() => {
    if (!utp && !invtp) return;
    setForm((prev) => ({
      ...prev,
      audit_id: data?.id,
      periode_audit: data?.periode_audit,
      kode_unit: utp,
      invoice_id: invtp,
    }));
  }, [utp, invtp, data?.id, data?.periode_audit]);

  // ==================== HITUNG OTOMATIS ====================
  const hitungInvSelisih = () => {
    const toNum = (v) => Number(v) || 0;
    const b = toNum(form.inv_kuantitas);
    const a = toNum(form.inv_stock_opname);
    const c = toNum(form.inv_harga_satuan);
    const d = toNum(form.hp_harga_pasar);

    const selisih = b - a;
    const jumlah_kurang = selisih * c;
    const total_kontrak = b * c;

    const keuntungan = d * 0.25;
    const harga_maksimal = d + keuntungan;

    const hp_selisih_mahal_murah = harga_maksimal - c;
    const hp_total_sm = b * hp_selisih_mahal_murah;

    setForm((prev) => ({
      ...prev,
      inv_selisih: selisih || 0,
      inv_jumlah_kurang: jumlah_kurang || 0,
      inv_total_kontrak: total_kontrak || 0,
      hp_harga_maksimal: harga_maksimal || 0,
      hp_selisih: hp_selisih_mahal_murah || 0,
      hp_total_selisih: hp_total_sm || 0,
    }));
  };

  // Jalankan hanya jika nilai input tertentu berubah
  useEffect(() => {
    hitungInvSelisih();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    form.inv_kuantitas,
    form.inv_stock_opname,
    form.inv_harga_satuan,
    form.hp_harga_pasar,
  ]);

  // ==================== HANDLER ====================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postData("/spi/audit_barjas_belanja_store", form, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log("Res", res)
        alert("✅ Data berhasil disimpan");
        // getDatas();
        getBarang()
      },
      onError: (err) => {
        console.error("Error submit:", err);
        alert("❌ Gagal menyimpan data");
      },
    });
  };

  const numericFields = [
    "inv_kuantitas",
    "inv_selisih",
    "inv_harga_satuan",
    "inv_jumlah_kurang",
    "inv_total_kontrak",
    "hp_harga_pasar",
    "hp_harga_maksimal",
    "hp_selisih",
    "hp_total_selisih",
  ];


  const [showform, setShowform] = useState(false)
  const [invoice, setInvoice] = useState('')

  
  useEffect(() => {
    if(!invtp) return
    const n = invoices.find(it => it.id === parseInt(invtp))
    setInvoice(n)
  },[invtp])

  // console.log("in", invtp)
  // console.log("inv", invoice)

  // ==================== RENDER ====================
  return (
    <div className="flex flex-col">
      {/* PILIH UNIT & INVOICE */}
      <div className="section-body">
        <div>
          <h3 className="text_h3">Filter Data</h3>
        </div>
        <div className="flex items-center gap-4">


        <select
          className="border rounded-md h-10 px-2 w-full"
          value={invtp}
          onChange={(e) => setInvtp(e.target.value)}
        >
          <option value="">Pilih Invoice</option>
          {invoices.map((r) => (
            <option key={r.id} value={r.id}>
              {r.judul_pengadaan}
            </option>
          ))}
        </select>

        </div>
      </div>

      {!invtp ? (
        <p className="text-gray-500 italic mt-4">
          📄 Silakan pilih invoice terlebih dahulu.
        </p>
      ) : (
        <div className="flex flex-col mt-12">
          <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Belanja Modal Berdasarkan Invoice
          </h2>
            <button 
            
            className={`text-xs text-white ${showform ?`bg-red-500` : `bg-emerald-500`} px-3 py-2 rounded-md flex items-center gap-2`}
            
            onClick={()=>setShowform(!showform)}>
              <Eye size={16}/>
              
              {showform ? `Tutup` : `Tampilkan`} Form Data</button>

          </div>

          {showform ? 
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-6 mb-8 bg-white shadow p-6 rounded-xl border"
            >
              {/* Bagian Invoice */}
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-bold text-blue-700 mb-2 border-b pb-1">
                Form Data Invoice
                </h3>
                  <div className="flex flex-col">
                        <label className="text-xs font-semibold text-gray-600 mb-1 capitalize">
                          1. Spesifikasi / Deskripsi Barang *
                        </label>
                        <input
                        type="text"
                          name="inv_spesifikasi"
                          value={form?.inv_spesifikasi}
                          onChange={handleChange}
                          className="border rounded-md p-2 text-sm"
                        />
                      </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="flex flex-col">
                        <label className="text-xs font-semibold text-gray-600 mb-1 capitalize">
                          2. Kuantitas *
                          gunakan titik untuk koma 29.50
                        </label>
                        <input
                        type="number"
                          name="inv_kuantitas"
                          value={form?.inv_kuantitas}
                          onChange={handleChange}
                          className="border rounded-md p-2 text-sm"
                        />
                      </div>
                  <div className="flex flex-col">
                        <label className="text-xs font-semibold text-gray-600 mb-1 capitalize">
                          3. Satuan *
                          contoh : unit, pcs, mt2
                        </label>
                        <input
                        type="text"
                          name="inv_satuan"
                          value={form?.inv_satuan}
                          onChange={handleChange}
                          className="border rounded-md p-2 text-sm"
                        />
                      </div>
                  <div className="flex flex-col">
                        <label className="text-xs font-semibold text-gray-600 mb-1 capitalize">
                          4. Stock Opname *
                        </label>
                        <input
                        type="text"
                          name="inv_stock_opname"
                          value={form?.inv_stock_opname}
                          onChange={handleChange}
                          className="border rounded-md p-2 text-sm"
                        />
                      </div>
                  <div className="flex flex-col">
                        <label className="text-xs font-semibold text-gray-600 mb-1 capitalize">
                          5. Harga Satuan (Invoice) *. {FORMAT_RUPIAH(form?.inv_harga_satuan || 0)}
                        </label>
                        <input
                        type="number"
                          name="inv_harga_satuan"
                          value={form?.inv_harga_satuan}
                          onChange={handleChange}
                          className="border rounded-md p-2 text-sm"
                        />
                      </div>

                  {/* {Object.keys(form)
                    .filter((key) => key.startsWith("inv_"))
                    .map((key) => (
                      <div key={key} className="flex flex-col">
                        <label className="text-xs font-semibold text-gray-600 mb-1 capitalize">
                          {key.replace(/_/g, " ")}
                          {[
                            "inv_harga_satuan",
                            "inv_jumlah_kurang",
                            "inv_total_kontrak",
                          ].includes(key) && (
                            <span className="ml-2 text-green-700">
                              {FORMAT_RUPIAH(form[key])}
                            </span>
                          )}
                        </label>
                        <input
                          type={numericFields.includes(key) ? "number" : "text"}
                          name={key}
                          value={form[key] || ""}
                          onChange={handleChange}
                          className="border rounded-md p-2 text-sm"
                        />
                      </div>
                    ))} */}
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-lg font-semibold">Analisa Input Invoice</h4>

                  <div>
                    <h4>Selisih : {form?.inv_selisih || 0}</h4>
                  </div>
                  <div>
                    <h4>Jumlah Kurang : {FORMAT_RUPIAH(form?.inv_jumlah_kurang || 0)}</h4>
                  </div>
                  <div>
                    <h4>Total Kontrak {FORMAT_RUPIAH(form?.inv_total_kontrak || 0)}</h4>
                  </div>
                </div>
              </div>

              {/* Bagian Harga Pasar */}
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-bold text-amber-700 mb-2 border-b pb-1">
                  Harga Pasar & Analisa
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
    

                      <div className="flex flex-col">
                        <label className="text-xs font-semibold text-gray-600 mb-1 capitalize">
                          1. Harga Pasar Satuan * {FORMAT_RUPIAH(form?.hp_harga_pasar || 0)}
                        </label>
                        <input
                        type="text"
                          name="hp_harga_pasar"
                          value={form?.hp_harga_pasar}
                          onChange={handleChange}
                          className="border rounded-md p-2 text-sm"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-xs font-semibold text-gray-600 mb-1 capitalize">
                          2. Sumber Harga Pasar *
                        </label>
                        <input
                        type="text"
                          name="hp_sumber"
                          value={form?.hp_sumber}
                          onChange={handleChange}
                          className="border rounded-md p-2 text-sm"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-xs font-semibold text-gray-600 mb-1 capitalize">
                          3. Tgl sumber Harga Pasar *
                        </label>
                        <input
                        type="date"
                          name="hp_tgl_sumber"
                          value={form?.hp_tgl_sumber}
                          onChange={handleChange}
                          className="border rounded-md p-2 text-sm"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-xs font-semibold text-gray-600 mb-1 capitalize">
                          4. Alamat sumber Harga Pasar *
                        </label>
                        <input
                        type="text"
                          name="hp_alamat_sumber"
                          value={form?.hp_alamat_sumber}
                          onChange={handleChange}
                          className="border rounded-md p-2 text-sm"
                        />
                      </div>
                </div>

                      <div className="flex flex-col gap-2">
                    <h4 className="text-lg font-semibold">Kalkulasi & Analisa Harga Pasar & Invoice</h4>

                  <div>
                    <h4>Harga Pasar (HP) : {FORMAT_RUPIAH(form?.hp_harga_pasar || 0)}</h4>
                  </div>
                  <div>
                    <h4>Harga Maksimal (25%) Keuntungan (HMK) : {FORMAT_RUPIAH(form?.hp_harga_maksimal || 0)}</h4>
                    <small className="italic text-red-500">HMK x HP</small>
                  </div>
                  <div>
                    <h4>Selisih Mahal/Murah (SMM) : {FORMAT_RUPIAH(form?.hp_selisih || 0)}</h4>
                  </div>
                  <div>
                    <h4>Total Selisih (SMM x Q) : {FORMAT_RUPIAH(form?.hp_total_selisih || 0)}</h4>
                  </div>
            
                </div>
              </div>

  {/* 
              <div>
                <CekHargaBarangElektronik produk={form?.inv_spesifikasi} />
              </div> */}


              <button
                type="submit"
                className="col-span-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
              >
                Simpan Data
              </button>
            </form>
          
          
          :
          <div className="section-body">
            <KopSuratSpi />

            <AuditBarjasInvoiceHeader invoice={invoice} />
            
            <TableBelanja barang={barang} refreshData={getBarang} />

          </div>
          
          }


        </div>
      )}




       {/* Tabel Editable */}
      {/* <div className="overflow-x-auto bg-white rounded-xl shadow border">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th></th>
              <th colSpan={8} className="bg-red-200 text-center">Invoice</th>
              <th colSpan={7} className="bg-emerald-200 text-center">Harga Pasar (HP)</th>
              <th></th>
            </tr>
            <tr>
              <th className="p-2 border">No</th>
              <th className="p-2 border">I.Spesifikasi</th>
              <th className="p-2 border">I.Kuantitas</th>
              <th className="p-2 border">I.Satuan</th>
              <th className="p-2 border">I.Stock Op</th>
              <th className="p-2 border">I.Selisih</th>
              <th className="p-2 border">I.Harga Satuan</th>
              <th className="p-2 border">I.Jumlah Kurang</th>
              <th className="p-2 border">I.Total Kontrak</th>
              
              
              <th className="p-2 border">HP.Harga Pasar</th>
              <th className="p-2 border">HP. HPS Maksimal, RMS</th>
              <th className="p-2 border">HP. Selisih, RMS</th>
              <th className="p-2 border">HP. Total Selisih, RMS</th>
              <th className="p-2 border">HP. Sumber</th>
              <th className="p-2 border">HP. Tgl Sumber</th>
              <th className="p-2 border">HP. Alamat Sumber</th>

      
              <th className="p-2 border text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {barang.map((row, i) => (
              <tr key={row.id} className="border hover:bg-gray-50">
                <td className="p-2 border text-center">{i + 1}</td>
                <td className="p-2 border text-left">{row?.inv_spesifikasi}</td>
                <td className="p-2 border text-center">{row?.inv_kuantitas}</td>
                <td className="p-2 border text-center uppercase">{row?.inv_satuan}</td>
                <td className="p-2 border text-center uppercase">{row?.inv_stock_opname}</td>
                <td className="p-2 border text-center uppercase">{row?.inv_selisih}</td>
                <td className="p-2 border text-center uppercase">{FORMAT_RUPIAH(row?.inv_harga_satuan || 0)}</td>
                <td className="p-2 border text-center uppercase">{row?.inv_jumlah_kurang}</td>
                <td className="p-2 border text-center uppercase">{FORMAT_RUPIAH(row?.inv_total_kontrak || 0)}</td>
                <td className="p-2 border text-center uppercase">{FORMAT_RUPIAH(row?.hp_harga_pasar || 0)}</td>
                <td className="p-2 border text-center uppercase">{FORMAT_RUPIAH(row?.hp_harga_maksimal || 0)}</td>
                <td className="p-2 border text-center uppercase">{FORMAT_RUPIAH(row?.hp_selisih || 0)}</td>
                <td className="p-2 border text-center uppercase">{FORMAT_RUPIAH(row?.hp_total_selisih || 0)}</td>
                <td className="p-2 border text-center uppercase">{row?.hp_sumber}</td>
                <td className="p-2 border text-center uppercase">{row?.hp_tgl_sumber}</td>
                <td className="p-2 border text-center">{row?.hp_alamat_sumber}</td>
                
                <td className="p-2 border text-center">
                  {editingId === row.id ? (
                    <button
                      onClick={() => handleSave(row.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      💾
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingId(row.id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      ✏️
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {barang.length === 0 && (
              <tr>
                <td
                  colSpan="18"
                  className="text-center py-4 text-gray-500 italic"
                >
                  Tidak ada data belanja modal.
                </td>
              </tr>
            )}
            
          </tbody>
        </table>
      </div> */}

    </div>
  );
};

export default BelanjaModal;
