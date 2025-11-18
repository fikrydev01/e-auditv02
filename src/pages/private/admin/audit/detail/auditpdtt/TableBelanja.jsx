import React, { useEffect, useState } from "react";
// import { FORMAT_RUPIAH } from "../../../../../constant/data";

// import { postData } from "../../../../../utils/api";
import { PencilIcon, SaveIcon } from "lucide-react";
import { FORMAT_RUPIAH } from "../../../../../../constant/data";
import { postData } from "../../../../../../utils/api";

export default function TableBelanja({ barang, refreshData }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const [brg, setBrg] = useState(barang || [])

  useEffect(() => {
    setBrg(barang)
  },[barang])

  const handleEdit = (row) => {
    setEditingId(row.id);
    setEditData({ ...row });
  };

  const handleChange = (field, value) => {
    const updated = { ...editData, [field]: value };

    // Kalkulasi otomatis seperti di BelanjaModal
    const toNum = (v) => Number(v) || 0;
    const b = toNum(updated.inv_kuantitas);
    const a = toNum(updated.inv_stock_opname);
    const c = toNum(updated.inv_harga_satuan);
    const d = toNum(updated.hp_harga_pasar);

    const selisih = b - a;
    const jumlah_kurang = selisih * c;
    const total_kontrak = b * c;

    const keuntungan = d * 0.25;
    const harga_maksimal = d + keuntungan;

    const hp_selisih_mahal_murah = harga_maksimal - c;
    const hp_total_sm = b * hp_selisih_mahal_murah;

    setEditData({
      ...updated,
      inv_selisih: selisih,
      inv_jumlah_kurang: jumlah_kurang,
      inv_total_kontrak: total_kontrak,
      hp_harga_maksimal: harga_maksimal,
      hp_selisih: hp_selisih_mahal_murah,
      hp_total_selisih: hp_total_sm,
    });
  };

  const handleSave = async () => {

    await postData("/spi/audit_barjas_belanja_store", editData, {
      onSuccess: () => {
        // alert("✅ Data berhasil diperbarui");
        refreshData(); // ambil ulang data dari parent
        setEditingId(null);
      },
      onError: (err) => {
        console.error("Gagal simpan:", err);
        // alert("❌ Gagal menyimpan perubahan");
      },
    });
  };

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow border mt-6">
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-gray-100">
          <tr>
            <th></th>
            <th colSpan={8} className="bg-red-200 text-center">Invoice</th>
            <th colSpan={7} className="bg-emerald-200 text-center">Harga Pasar (HP)</th>
            <th></th>
          </tr>
          <tr>
            {[
              "No",
              "I.Spesifikasi",
              "I.Kuantitas",
              "I.Satuan",
              "I.Stock Op",
              "I.Selisih R",
              "I.Harga Satuan",
              "I.Jumlah Kurang R",
              "I.Total Kontrak. R",
              "HP.Harga Pasar",
              "HP.HPS Maksimal R",
              "HP.Selisih R",
              "HP.Total Selisih R",
              "HP.Sumber",
              "HP.Tgl Sumber",
              "HP.Alamat Sumber",
            ].map((h) => (
              <th key={h} className="p-2 border text-center">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {brg && brg.map((row, i) => {
            const isEditing = editingId === row.id;
            const data = isEditing ? editData : row;

            return (
              <tr key={row.id} className="border hover:bg-gray-50">
                <td className="p-2 border text-center">{i + 1}</td>

                {[
                  "inv_spesifikasi",
                  "inv_kuantitas",
                  "inv_satuan",
                  "inv_stock_opname",
                  "inv_selisih",
                  "inv_harga_satuan",
                  "inv_jumlah_kurang",
                  "inv_total_kontrak",
                  "hp_harga_pasar",
                  "hp_harga_maksimal",
                  "hp_selisih",
                  "hp_total_selisih",
                  "hp_sumber",
                  "hp_tgl_sumber",
                  "hp_alamat_sumber",
                ].map((field) => (
                  <td key={field} className="p-2 border text-center">
                    {isEditing ? (
                        <div>
                           {["inv_harga_satuan", "inv_jumlah_kurang", "inv_total_kontrak", "hp_harga_pasar", "hp_harga_maksimal", "hp_selisih", "hp_total_selisih"].includes(field)
  ? <label>{FORMAT_RUPIAH(data[field] || 0)}</label>
  : null
}
                           {["inv_jumlah_kurang", "inv_total_kontrak", "hp_harga_maksimal", "hp_selisih", "hp_total_selisih"].includes(field) 
                           ? null: 
                           
                                                       <input
                                                         type={
                                                           field.includes("harga") ||
                                                           field.includes("jumlah") ||
                                                           field.includes("total") ||
                                                           field.includes("selisih") ||
                                                           field.includes("kuantitas")
                                                             ? "number"
                                                             : field.includes("tgl")
                                                             ? "date"
                                                             : "text"
                                                         }
                                                         value={data[field] || ""}
                                                         onChange={(e) =>
                                                           handleChange(field, e.target.value)
                                                         }
                                                         className="w-full border rounded px-1 py-0.5 text-sm"
                                                       />
                           
                           
                           }
                        </div>
                    ) : field.includes("harga") ||
                      field.includes("total") ? (
                      FORMAT_RUPIAH(data[field])
                    ) : (
                      data[field]
                    )}
                  </td>
                ))}

                {/* <td className="p-2 border text-center">
                  {isEditing ? (
                    <button
                      onClick={handleSave}
                      className="bg-green-600 text-white px-3 py-2 rounded"
                    >
                      <SaveIcon size={14}/>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(row)}
                      className="bg-orange-500 text-white px-3 py-2 rounded"
                    >
                      <PencilIcon size={14} />
                    </button>
                  )}
                </td> */}
              </tr>
            );
          })}

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
    </div>
  );
}
