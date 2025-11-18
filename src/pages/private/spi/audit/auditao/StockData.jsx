import { useEffect, useState } from "react";
import { postData } from "../../../../../utils/api";
import { Trash2Icon } from "lucide-react";

const StockData = ({ dstock, data, utp }) => {
  const [animate, setAnimate] = useState(false);
  const [rows, setRows] = useState([]);
  const [editingCell, setEditingCell] = useState({ row: null, field: null });

  const [formData, setFormData] = useState({
    audit_id: data?.id || "",
    periode_audit: data?.periode_audit || "",
    kode_unit: utp || "",
    catatan_atas_selisih: "",
    nama_audit01: "",
    nama_audit02: "",
    nama_unit1: "",
    nama_unit2: "",
  });

  /** 🔹 Inisialisasi data awal dari dstock */
  useEffect(() => {
    if (dstock) {
      setFormData((prev) => ({
        ...prev,
        catatan_atas_selisih: dstock.catatan_atas_selisih || "",
        nama_audit01: dstock.nama_audit01 || "",
        nama_audit02: dstock.nama_audit02 || "",
        nama_unit1: dstock.nama_unit1 || "",
        nama_unit2: dstock.nama_unit2 || "",
      }));

      if (Array.isArray(dstock.list_barang) && dstock.list_barang.length > 0) {
        const withIds = dstock.list_barang.map((item, index) => ({
          id: index + 1,
          ...item,
        }));
        setRows(withIds);
      } else {
        setRows([]);
      }
    }
  }, [dstock, utp]);

  /** 🔹 Ubah data sel tabel */
  const handleChange = (index, field, value) => {
    if (typeof index === "number" && field) {
      const newRows = [...rows];
      newRows[index][field] = value;

      // hitung selisih otomatis
      if (
        field === "kuantitas_laporan" ||
        field === "kuantitas_opname" ||
        field === "selisih"
      ) {
        const laporan = parseInt(newRows[index].kuantitas_laporan || 0, 10);
        const opname = parseInt(newRows[index].kuantitas_opname || 0, 10);
        newRows[index].selisih = opname - laporan;
      }

      setRows(newRows);
    } else {
      // handle perubahan untuk input form bawah
      const { name, value: val } = index.target;
      setFormData((prev) => ({ ...prev, [name]: val }));
    }
  };

  /** 🔹 Saat blur dari input tabel */
  const handleBlur = (rowIndex, field, value) => {
    setEditingCell({ row: null, field: null });

    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[rowIndex] = {
        ...updatedRows[rowIndex],
        [field]: value,
      };
      return updatedRows;
    });
  };

  /** 🔹 Simpan seluruh form (semua rows + catatan + penandatangan) */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // pastikan keluar dari mode editing dulu
    setEditingCell({ row: null, field: null });

    // buat payload dengan data terbaru
    const payload = {
      ...formData,
      list_barang: rows, // menggunakan state rows yang sudah ter-update
    };

    console.log("🟢 Submitting payload:", payload);

    // panggil API
    postData("/spi/audit_bhp_store", payload, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log("✅ Submit Success:", res);
        // alert("Data berhasil disimpan!");
      },
      onError: (err) => {
        console.error("❌ Submit Error:", err?.response?.data?.detail);
        alert("Terjadi kesalahan saat menyimpan data.");
      },
    });
  };


  const handleDeleteRow = (index) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus baris ini?")) {
      const newRows = rows.filter((_, rowIndex) => rowIndex !== index);
      setRows(newRows);
    }
  }

  /** 🔹 Cell editable */
  const renderCell = (row, rowIndex, field) => {
    const isEditing = editingCell.row === rowIndex && editingCell.field === field;

    if (isEditing) {
      return (
        <input
          type={field.includes("kuantitas") ? "number" : "text"}
          value={row[field] || ""}
          autoFocus
          onChange={(e) => handleChange(rowIndex, field, e.target.value)}
          onBlur={(e) => handleBlur(rowIndex, field, e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && handleBlur(rowIndex, field, e.target.value)
          }
          className="w-full border rounded px-1 py-0.5 focus:ring focus:ring-blue-300"
        />
      );
    }

    return (
      <span
        onClick={() => setEditingCell({ row: rowIndex, field })}
        className="cursor-pointer hover:bg-yellow-50 block px-1 py-0.5"
      >
        {row[field] || "-"}
      </span>
    );
  };

  return (
    <div className="section-body">
      <h1 className="text_h1 mb-4">Data Stock Opname</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 🧾 TABEL DATA */}
        <div className="overflow-x-auto border rounded-xl shadow-sm">
          <table className="table-auto w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 py-1 border">No</th>
                <th className="px-2 py-1 border">Kode Inti</th>
                <th className="px-2 py-1 border">Kode Barang</th>
                <th className="px-2 py-1 border">Uraian</th>
                <th className="px-2 py-1 border">Satuan</th>
                <th className="px-2 py-1 border">Kuantitas Laporan</th>
                <th className="px-2 py-1 border">Kuantitas Opname</th>
                <th className="px-2 py-1 border">Selisih</th>
                <th className="px-2 py-1 border"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={row.id || idx} className="hover:bg-gray-50">
                  <td className="border px-2 py-1 text-center">{idx + 1}</td>
                  <td className="border px-2 py-1">{renderCell(row, idx, "kode_inti")}</td>
                  <td className="border px-2 py-1">{renderCell(row, idx, "kode_barang")}</td>
                  <td className="border px-2 py-1">{renderCell(row, idx, "uraian")}</td>
                  <td className="border px-2 py-1">{renderCell(row, idx, "satuan")}</td>
                  <td className="border px-2 py-1">{renderCell(row, idx, "kuantitas_laporan")}</td>
                  <td className="border px-2 py-1">{renderCell(row, idx, "kuantitas_opname")}</td>
                  <td className="border px-2 py-1 text-center font-semibold text-blue-600">
                    {row.selisih}
                  </td>
                  <td className="border px-2 py-1 text-center font-semibold text-blue-600">
                    <button
                    className="bg-red-500 p-2 rounded text-white"
                    onClick={()=>handleDeleteRow(idx)}
                    >
                      <Trash2Icon size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✍️ CATATAN ATAS SELISIH */}
        <section>
          <h2 className="text-lg font-semibold text-blue-700 mb-2">
            Catatan Auditor
          </h2>
          <textarea
            name="catatan_atas_selisih"
            placeholder="Catatan mengenai selisih kas (jika ada)"
            value={formData.catatan_atas_selisih}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 h-24 resize-none focus:ring-2 focus:ring-blue-400"
          />
        </section>

        {/* 🖋️ PENANDATANGAN */}
        <section>
          <h2 className="text-lg font-semibold text-blue-700 mb-2">
            Penandatangan
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Tim Audit</label>
              <input
                type="text"
                name="nama_audit01"
                placeholder="Nama Tim Audit 1"
                value={formData.nama_audit01}
                onChange={handleChange}
                className="w-full border rounded px-3 py-1 mb-2"
              />
              <input
                type="text"
                name="nama_audit02"
                placeholder="Nama Tim Audit 2"
                value={formData.nama_audit02}
                onChange={handleChange}
                className="w-full border rounded px-3 py-1"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Unit / Fakultas</label>
              <input
                type="text"
                name="nama_unit1"
                placeholder="Nama Perwakilan Unit / Fakultas 1"
                value={formData.nama_unit1}
                onChange={handleChange}
                className="w-full border rounded px-3 py-1 mb-2"
              />
              <input
                type="text"
                name="nama_unit2"
                placeholder="Nama Perwakilan Unit / Fakultas 2"
                value={formData.nama_unit2}
                onChange={handleChange}
                className="w-full border rounded px-3 py-1"
              />
            </div>
          </div>
        </section>

        {/* 🔘 SUBMIT BUTTON */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={animate}
            className={`px-6 py-2 rounded-xl text-white shadow font-semibold transition ${
              animate ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {animate ? "Menyimpan..." : "💾 Simpan Data"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StockData;