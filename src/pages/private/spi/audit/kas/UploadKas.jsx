import { useState } from "react";
import * as XLSX from "xlsx";
import { postData } from "../../../../../utils/api";

export default function UploadKas({ audit }) {
  const [rows, setRows] = useState([]);
  const [headers, setHeaders] = useState([]);
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

  // Normalisasi nama kolom
  const normalizeKey = (key) =>
    key.trim().toLowerCase().replace(/\s+/g, "_");

  // Format tanggal jadi DD/MM/YYYY
  const formatDate = (value) => {
    if (!value) return "";
    try {
      const date = new Date(value);
      if (isNaN(date)) return value;
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch {
      return value;
    }
  };

  // Hitung nilai otomatis
  const calculateNilai = (pecahan, jumlah) => {
    const p = parseFloat(pecahan) || 0;
    const j = parseFloat(jumlah) || 0;
    return p * j;
  };

  // Baca file Excel
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onload = (evt) => {
      const wb = XLSX.read(evt.target.result, { type: "binary" });
      const ws = wb.Sheets[wb.SheetNames[0]];

      let data = XLSX.utils.sheet_to_json(ws, { defval: "", range: 3 });

      data = data.map((row) => {
        const limitedRow = Object.entries(row)
          .slice(0, 10)
          .reduce((acc, [key, value]) => {
            const newKey = normalizeKey(key);
            let val = value;

            if (newKey === "tanggal_bank") val = formatDate(value);
            acc[newKey] = val;
            return acc;
          }, {});

        // Tambahkan nilai otomatis
        limitedRow.nilai = calculateNilai(
          limitedRow.pecahan,
          limitedRow.jumlah
        );

        return limitedRow;
      });

      // Hapus baris kosong
      data = data.filter((row) =>
        Object.values(row).some(
          (v) => v !== "" && v !== null && v !== undefined
        )
      );

      setHeaders(Object.keys(data[0] || {}));
      setRows(data);
    };

    reader.readAsBinaryString(file);
  };

  const startEdit = (idx) => setEditingRow(idx);
  const cancelEdit = () => setEditingRow(null);

  const saveEdit = (idx, newRow) => {
    // Recalculate nilai sebelum simpan
    newRow.nilai = calculateNilai(newRow.pecahan, newRow.jumlah);
    if (newRow.tanggal_bank)
      newRow.tanggal_bank = formatDate(newRow.tanggal_bank);

    const updated = [...rows];
    updated[idx] = newRow;
    setRows(updated);
    setEditingRow(null);
  };

  const handleUpload = async () => {
    if (rows.length === 0) return alert("Tidak ada data untuk diupload");

    const cleanedRows = rows
      .filter((row) =>
        Object.values(row).some(
          (v) => v !== "" && v !== null && v !== undefined
        )
      )
      .map((r) => ({
        ...r,
        nilai: calculateNilai(r.pecahan, r.jumlah),
      }));

    const payload = {
      audit_id: audit?.id,
      periode_audit: audit?.periode_audit,
      kode_unit: audit?.kode_unit,
      rows: cleanedRows,
    };

    await postData("/spi/audit_kas_store", payload, {
      setLoading,
      onSuccess: (res) => (
         console.log('res', res)
      ),
      onError: (err) =>
        setError(err?.response?.data?.detail || "Terjadi kesalahan!"),
    });
  };

  return (
    <div className="p-4 section-body">
      <h2 className="text-lg font-semibold mb-3">
        Upload Data Kas UNIT
      </h2>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFile}
        className="border p-2 rounded mb-4"
      />

      {rows.length > 0 && (
        <div className="overflow-auto border rounded-xl">
          <table className="min-w-[900px] w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 border">#</th>
                {headers.map((h) => (
                  <th key={h} className="px-3 py-2 border text-left capitalize">
                    {h.replace(/_/g, " ")}
                  </th>
                ))}
                <th className="px-3 py-2 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => {
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
                              onChange={(e) => (row[h] = e.target.value)}
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
                                  : ["pecahan", "jumlah", "nilai"].includes(h)
                                  ? "number"
                                  : "text"
                              }
                              defaultValue={row[h]}
                              onChange={(e) => {
                                row[h] = e.target.value;

                                // Update nilai realtime jika pecahan/jumlah berubah
                                if (["pecahan", "jumlah"].includes(h)) {
                                  row.nilai = calculateNilai(
                                    h === "pecahan"
                                      ? e.target.value
                                      : row.pecahan,
                                    h === "jumlah" ? e.target.value : row.jumlah
                                  );
                                }
                              }}
                              className="w-full border rounded px-1 py-0.5"
                            />
                          )
                        ) : h === "nilai" ? (
                          <b>{row[h]}</b>
                        ) : (
                          row[h] || <span className="text-gray-400">—</span>
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

      {rows.length > 0 && (
        <div className="flex justify-end mt-4">
          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-pink-600 hover:bg-pink-700 text-white text-xs px-4 py-2 rounded-lg"
          >
            {loading ? "Mengupload..." : "Upload ke Database"}
          </button>
        </div>
      )}

      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
