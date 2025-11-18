import { useEffect, useState } from "react";
import { postData } from "../../../../../../utils/api";

const TableBhp = ({ datas, onSave }) => {
    const [animate, setAnimate] = useState(false)
  const [rows, setRows] = useState(datas);
  const [editingCell, setEditingCell] = useState({ row: null, field: null });

  useEffect(() => {
    setRows(datas)
  },[datas])

  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;

    // hitung selisih otomatis
    if (field === "kuantitas_laporan" || field === "kuantitas_opname") {
      const laporan = parseInt(newRows[index].kuantitas_laporan || 0, 10);
      const opname = parseInt(newRows[index].kuantitas_opname || 0, 10);
      newRows[index].selisih = opname - laporan;
    }

    setRows(newRows);
  };

    const handleUpdate = async (data) => {

        console.log("Data", data)
   await postData("/spi/audit_bhp_update", data, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log("Success!", res);
      },
      onError: (err) => {
        setErr(err?.response?.data?.detail || "Something went wrong!");
      },
    });
    };

  const handleBlur = (rowIndex) => {
    setEditingCell({ row: null, field: null });

    const data = rows[rowIndex]
    handleUpdate(data)
    // console.log("first", data)
    // if (onSave) {
    //   // hanya kirim row yang diedit
    //   onSave(rows[rowIndex]);
    // }
  };

  const renderCell = (row, rowIndex, field) => {
    const isEditing =
      editingCell.row === rowIndex && editingCell.field === field;

    if (isEditing) {
      return (
        <input
          type={field.includes("kuantitas") ? "number" : "text"}
          value={row[field] || ""}
          autoFocus
          onChange={(e) => handleChange(rowIndex, field, e.target.value)}
          onBlur={() => handleBlur(rowIndex)}
          onKeyDown={(e) => e.key === "Enter" && handleBlur(rowIndex)}
          className="w-full border rounded px-1 py-0.5"
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
    <div className="overflow-x-auto">
      <table className="table-auto w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-1 border">No</th>
            <th className="px-2 py-1 border">Kode Inti</th>
            <th className="px-2 py-1 border">Kode Barang</th>
            <th className="px-2 py-1 border">Uraian</th>
            <th className="px-2 py-1 border">Satuan ?</th>
            <th className="px-2 py-1 border">Kuantitas Laporan ?</th>
            <th className="px-2 py-1 border">Kuantitas Opname ?</th>
            <th className="px-2 py-1 border">Selisih</th>
            <th className="px-2 py-1 border">Keterangan ?</th>
          </tr>
        </thead>
        <tbody>
          {rows &&
            rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{idx + 1}</td>
                <td className="border px-2 py-1">{row.kode_inti}</td>
                <td className="border px-2 py-1">{row.kode_barang}</td>
                {/* <td className="border px-2 py-1">{row.nama_barang}</td> */}

                <td className="border px-2 py-1">
                  {renderCell(row, idx, "nama_barang")}
                </td>

                <td className="border px-2 py-1">
                  {renderCell(row, idx, "satuan")}
                </td>
                <td className="border px-2 py-1">
                  {renderCell(row, idx, "kuantitas_laporan")}
                </td>
                <td className="border px-2 py-1">
                  {renderCell(row, idx, "kuantitas_opname")}
                </td>
                <td className="border px-2 py-1 text-center">{row.selisih}</td>
                <td className="border px-2 py-1 max-w-md">
                  {renderCell(row, idx, "keterangan")}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableBhp;
