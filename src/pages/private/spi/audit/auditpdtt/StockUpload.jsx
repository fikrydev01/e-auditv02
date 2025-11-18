import { useState } from "react";
import * as XLSX from "xlsx";
import { postData } from "../../../../../utils/api";



export default function StockUpload({data, utp}) {
    const [animate, setAnimate] = useState(false)
  const [rows, setRows] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [editingRow, setEditingRow] = useState(null);

    console.log("data", data)
  const inputData = {
    audit_id : data?.id,
    periode_audit : data?.periode_audit,
    kode_unit : utp,
    rows : rows,

  }

  const normalizeKey = (key) => {
  return key
    .trim()                // hapus spasi depan-belakang
    .toLowerCase()         // huruf kecil semua
    .replace(/\s+/g, "_"); // spasi jadi underscore
};
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const wb = XLSX.read(evt.target.result, { type: "binary" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      let data = XLSX.utils.sheet_to_json(ws, { defval: "", range: 3 });
    //   data = data.filter((r) => Object.values(r).some((v) => v !== ""));
    data = data.map((row) => {
  const newRow = {};
  Object.keys(row).forEach((key) => {
    newRow[normalizeKey(key)] = row[key];
  });
  return newRow;
});
      setHeaders(Object.keys(data[0] || {}));
      setRows(data);
    };
    reader.readAsBinaryString(file);
  };

  console.log("row",rows)

  const startEdit = (idx) => setEditingRow(idx);
  const cancelEdit = () => setEditingRow(null);

  const saveEdit = (idx, newRow) => {
    const newRows = [...rows];
    newRows[idx] = newRow;
    setRows(newRows);
    setEditingRow(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault()
    // alert('upload')
    await postData("/spi/audit_bhp_store", inputData, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log("Success!", res);
      },
      onError: (err) => {
        setErr(err?.response?.data?.detail || "Something went wrong!");
      },
    });
  };

  return (
    <div className="section-body">
      <h3 className="text_h2 mb-2">Upload & Edit Excel</h3>
      <input type="file" accept=".xlsx,.xls" onChange={handleFile} className="mb-4 form-input" />

      <div className="overflow-auto border rounded-xl">
        <table className="table-default min-w-[800px]">
          <thead>
            <tr>
              <th className="px-4 py-2">#</th>
              {headers.map((h) => (
                <th key={h} className="px-4 py-2">{h}</th>
              ))}
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => {
              const isEditing = editingRow === idx;
              return (
                <tr key={idx} className={isEditing ? "bg-yellow-50" : "hover:bg-pink-50/60"}>
                  <td className="px-4 py-2">{idx + 4}</td>
                  {headers.map((h) => (
                    <td key={h} className="px-4 py-2">
                      {isEditing ? (
                        <input
                          type="text"
                          defaultValue={row[h]}
                          onChange={(e) => (row[h] = e.target.value)}
                          className="border rounded px-2 py-1 w-full"
                        />
                      ) : (
                        row[h] || <span className="text-gray-400">—</span>
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-2">
                    {isEditing ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveEdit(idx, row)}
                          className="px-3 py-1 bg-green-500 text-white rounded text-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="px-3 py-1 bg-gray-400 text-white rounded text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEdit(idx)}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={headers.length + 2} className="px-4 py-6 text-center text-gray-500">
                  Belum ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {rows.length > 0 && (
        <div className="flex justify-end mt-4">
          <button
            onClick={(e) => handleUpload(e)}
            className="px-4 py-2 bg-pink-500 text-white rounded-xl shadow hover:bg-pink-600"
          >
            Upload to Backend
          </button>
        </div>
      )}
    </div>
  );
}
