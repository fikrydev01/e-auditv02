import { useState, useEffect } from "react";
import { postData, fetchData } from "../../../../../utils/api";

export default function DataKas({ audit }) {
  const [datas, setDatas] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const TIPE_KAS_OPTIONS = [
    "kertas",
    "logam",
    "giro",
    "pembayaran",
    "penerimaan",
    "lain",
  ];

  // --- Helper Functions ---
  const calculateNilai = (pecahan, jumlah) => {
    if (!pecahan) return 0;
    return (pecahan || 0) * (jumlah || 0);
  };

  const formatDisplay = (value) => {
    const num = parseFloat(value);
    if (isNaN(num)) return "";
    return num.toLocaleString("id-ID"); // tampil 39.000.000
  };

  const formatSave = (value) => {
    if (!value) return 0;
    return parseInt(String(value).replace(/\./g, ""), 10);
  };

  const formatDateToDB = (value) => {
    if (!value) return null;
    const date = new Date(value);
    if (isNaN(date)) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const headers = [
    "tipe_kas",
    "pecahan",
    "jumlah",
    "nilai",
    "bank",
    "nomor_bank",
    "tanggal_bank",
    "diterima_bank",
    "uraian",
    // "periode_audit",
    // "kode_unit",
    "selisih_jumlah",
    "catatan_opname",
  ];

  // --- Edit Handlers ---
  const startEdit = (idx) => setEditingRow(idx);
  const cancelEdit = () => setEditingRow(null);

  const saveEdit = (idx, newRow) => {
    if (newRow.tipe_kas === "lain") {
      newRow.pecahan = null;
      newRow.jumlah = null;
    } else {
        newRow.pecahan = formatSave(newRow.pecahan);
        newRow.nilai = calculateNilai(newRow.pecahan, newRow.jumlah);
        newRow.jumlah = formatSave(newRow.jumlah);
    }

    newRow.selisih_jumlah = formatSave(newRow.selisih_jumlah);
    newRow.tanggal_bank = formatDateToDB(newRow.tanggal_bank);

    const updated = [...datas];
    updated[idx] = newRow;
    setDatas(updated);
    setEditingRow(null);
  };

  // --- Fetch Data ---
  const getDatas = () => {
    fetchData(
      `/spi/audit_kas?audit_id=${audit.id}&kode_unit=${audit?.kode_unit}`,
      {
        setLoading: setLoading,
        onSuccess: (res) => setDatas(res.data || []),
        onError: (err) =>
          setError(err?.detail || "Terjadi kesalahan saat fetch data!"),
      }
    );
  };

  useEffect(() => {
    if (audit?.id) getDatas();
  }, [audit]);

  // --- Upload Handler ---
  const handleUpload = async () => {
    if (!datas.length) return alert("Tidak ada data untuk diupload");

    // const cleanedRows = datas.map((row) => ({
    //   ...row,
    //   pecahan: row.tipe_kas === "lain" ? null : formatSave(row.pecahan),
    //   jumlah: formatSave(row.jumlah),
    //   nilai: calculateNilai(row.pecahan, row.jumlah),
    //   selisih_jumlah: formatSave(row.selisih_jumlah),
    //   tanggal_bank: formatDateToDB(row.tanggal_bank),
    //   tipe_kas: row.tipe_kas || null,
    //   bank: row.bank || null,
    //   nomor_bank: row.nomor_bank || null,
    //   diterima_bank: row.diterima_bank || null,
    //   uraian: row.uraian || null,
    //   catatan_opname: row.catatan_opname || null,
    // }));

    const payload = {
      audit_id: audit?.id,
      periode_audit: audit?.periode_audit,
      kode_unit: audit?.kode_unit,
      rows: datas,
    };


    await postData("/spi/audit_kas_update", payload, {
      setLoading,
      onSuccess: (res) => console.log("Upload berhasil:", res),
      onError: (err) =>
        setError(err?.response?.data?.detail || "Terjadi kesalahan!"),
    });
  };

  return (
      <div className="section-body flex flex-col">
        <h2 className="text-2xl font-semibold">Data Kas Opname</h2>
      {datas.length > 0 && (
          <div className="overflow-auto border rounded-xl">
          <table className="min-w-[900px] w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 border">#</th>
                {headers.map((h) => (
                  <th
                    key={h}
                    className="px-3 py-2 border text-left capitalize"
                  >
                    {h.replace(/_/g, " ")}
                  </th>
                ))}
                <th className="px-3 py-2 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((row, idx) => {
                const isEditing = editingRow === idx;
                return (
                  <tr key={idx} className={isEditing ? "bg-yellow-50" : ""}>
                    <td className="border px-3 py-2">{idx + 1}</td>
                    {headers.map((h) => (
                      <td key={h} className="border px-3 py-1">
                        {isEditing ? (
                          h === "tipe_kas" ? (
                            <select
                              defaultValue={row[h] || ""}
                              onChange={(e) => {
                                row[h] = e.target.value;
                                if (e.target.value === "lain") {
                                  row.pecahan = null;
                                  row.nilai = calculateNilai(row.pecahan, row.jumlah);
                                } else {
                                  if (!row.pecahan) row.pecahan = 1000;
                                  row.nilai = calculateNilai(row.pecahan, row.jumlah);
                                }
                              }}
                              className="border rounded px-2 py-1 w-full"
                            >
                              <option value="">-- Pilih --</option>
                              {TIPE_KAS_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={
                                h === "tanggal_bank"
                                  ? "date"
                                  : ["pecahan", "jumlah", "nilai", "selisih_jumlah"].includes(h)
                                  ? "text"
                                  : "text"
                              }
                              defaultValue={
                                ["pecahan", "jumlah", "nilai", "selisih_jumlah"].includes(h)
                                  ? formatDisplay(row[h])
                                  : row[h] || ""
                              }
                              onChange={(e) => {
                                if (["pecahan", "jumlah", "selisih_jumlah"].includes(h)) {
                                  row[h] = formatSave(e.target.value);
                                  if (h === "pecahan" || h === "jumlah") {
                                    row.nilai = calculateNilai(row.pecahan, row.jumlah);
                                  }
                                } else if (h === "nilai") {
                                  row[h] = formatSave(e.target.value);
                                } else {
                                  row[h] = e.target.value;
                                }
                              }}
                              className="w-full border rounded px-1 py-0.5"
                            />
                          )
                        ) : ["pecahan", "jumlah", "nilai", "selisih_jumlah"].includes(h) ? (
                          <b>{formatDisplay(row[h])}</b>
                        ) : row[h] || row[h] === 0 ? (
                          row[h]
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    ))}
                    <td className="border px-3 py-2">
                      {isEditing ? (
                        <div className="flex gap-1">
                          <button
                            onClick={() => saveEdit(idx, row)}
                            className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                          >
                            Simpan
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="bg-gray-400 text-white px-2 py-1 rounded text-xs"
                          >
                            Batal
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEdit(idx)}
                          className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {datas.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-xs"
          >
            {loading ? "Mengupload..." : "Simpan Opname"}
          </button>
        </div>
      )}

      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
