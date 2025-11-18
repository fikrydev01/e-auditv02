import { useState, useEffect } from "react";

// import { fetchData, postData } from "../../../../../utils/api";

// import { FORMAT_RUPIAH } from "../../../../../constant/data";
import TableBelanja from "./TableBelanja";
// import CekHargaBarangElektronik from "./CekHargaBarangElektronik";
import { UINJKTUNIT } from "../../../../../../utils/spi";
import { fetchData, postData } from "../../../../../../utils/api";
import { FORMAT_RUPIAH } from "../../../../../../constant/data";
import KopSuratSpi from "../../../../../../components/KopSuratSpi";
import AuditBarjasInvoiceHeader from "../../../../../../components/audit/AuditBarjasInvoiceHeader";


const BelanjaModal = ({ data }) => {
  const [animate, setAnimate] = useState(false);
  const [utp, setUtp] = useState("");
  const [invtp, setInvtp] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [barang, setBarang] = useState([]);
  const [editingId, setEditingId] = useState(null);

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
    const n = invoices.find(it  => it.id == parseInt(invtp))
    setInvoice(n)
  },[invtp])

  // ==================== RENDER ====================
  return (
    <div className="flex flex-col">
      {/* PILIH UNIT & INVOICE */}
      <div className="section-body mb-4">
        <div>
          <h3 className="text_h3">Filter Data</h3>
        </div>
        <div className="flex items-center gap-4">
        <select
          className="border rounded-md h-10 px-2 w-full"
          value={utp}
          onChange={(e) => setUtp(e.target.value)}
        >
          <option value="">Pilih Unit</option>
          {UINJKTUNIT.map((r) => (
            <option key={r.kode} value={r.kode}>
              {r.unit}
            </option>
          ))}
        </select>

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
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Belanja Modal Berdasarkan Invoice
          </h2>



        <div className="section-body">

          <KopSuratSpi />
          <AuditBarjasInvoiceHeader invoice={invoice} />
        <TableBelanja barang={barang} refreshData={getBarang} />

        </div>





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
