import React, { useState, useEffect } from "react";
import { Edit3, Save, X, PlusCircle } from "lucide-react";
import { fetchData, postData } from "../../../../../utils/api";
// import { fetchData, postData } from "../../utils/api";


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

const CashData = ({dcash, data, utp, reload}) => {
    const [animate, setAnimate] = useState(false)
  const [datas, setDatas] = useState(dcash);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [isAdding, setIsAdding] = useState(false);
    useEffect(() => {
        setDatas(dcash)
    },[dcash])
  // 🔹 Fetch data awal
//   useEffect(() => {
//     fetchData("/spi/audit_cash", {
//       onSuccess: (res) => setDatas(res?.data || []),
//       onError: (err) => console.error(err),
//     });
//   }, []);

  // 🔹 Mulai edit
  const handleEdit = (row) => {
    setEditingId(row.id);
    setFormData({ ...row });
  };


  // 🔹 Simpan perubahan
//   const handleSave = async (id) => {
//     await postData(`/spi/audit_cash_store`, formData, {
//       onSuccess: (res) => {
//         setDatas((prev) =>
//           prev.map((item) => (item.id === id ? formData : item))
//         );
//         setEditingId(null);
//         setIsAdding(false);
//       },
//     });
//   };

    const handleSave = async () => {

      await postData("/spi/audit_kas_store", formData, {
        setLoading: setAnimate,
        onSuccess: (res) => {
          console.log("Successasda!", res);
        //   setRld(!rld)
        reload()
        },
        onError: (err) => {
          setErr(err?.response?.data?.detail || "Something went wrong!");
        },
      });
    };

  // 🔹 Batal edit
  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
  };

  // 🔹 Tambah data baru
  const handleAddNew = () => {
    const newRow = {
      id: null,
      periode_audit: "",
      kode_unit: "",
      tipe_kas: "kertas",
      pecahan: 0,
      jumlah: 0,
      nilai: 0,
      bank: "",
      nomor_bank: "",
      tanggal_bank: "",
      diterima_bank: "",
      uraian: "",
      catatan_opname: "",
    };
    setFormData(newRow);
    setEditingId("new");
    setIsAdding(true);
  };

  const handleChange = (e, key) => {
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const calculateNilai = () => {
    setFormData((prev) => ({
      ...prev,
      nilai: (prev.pecahan || 0) * (prev.jumlah || 0),
    }));
  };

  useEffect(() => {
    calculateNilai();
  }, [formData.pecahan, formData.jumlah]);

  return (
    <div className="section-body">
      <div className="flex justify-between items-center">
        <h1 className="text_h1 font-semibold text-gray-800 dark:text-gray-100">
          Audit Kas & Opname {utp}
        </h1>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
            <tr>
              {/* <th className="px-4 py-3 text-left">Periode</th>
              <th className="px-4 py-3 text-left">Kode Unit</th> */}
              <th className="px-4 py-3 text-left">No</th>
              <th className="px-4 py-3 text-left">Tipe Kas</th>
              <th className="px-4 py-3 text-right">Pecahan</th>
              <th className="px-4 py-3 text-right">Jumlah</th>
              <th className="px-4 py-3 text-right">Nilai</th>
              <th className="px-4 py-3 text-left">Bank</th>
              <th className="px-4 py-3 text-left">noBank</th>
              <th className="px-4 py-3 text-left">tgBank</th>
              <th className="px-4 py-3 text-left">ditBank</th>
              <th className="px-4 py-3 text-right">Selisih</th>
              <th className="px-4 py-3 text-left">Uraian</th>
              <th className="px-4 py-3 text-left">Catatan</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {isAdding && (
              <EditableRow
                row={formData}
                handleChange={handleChange}
                handleSave={() => handleSave("new")}
                handleCancel={handleCancel}
              />
            )}

            {datas && datas.map((row, i) =>
              editingId === row.id ? (
                <EditableRow
                  key={row.id}
                  row={formData}
                  handleChange={handleChange}
                  handleSave={() => handleSave(row.id)}
                  handleCancel={handleCancel}
                />
              ) : (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
                >
                  {/* <td className="px-4 py-3">{row.periode_audit}</td>
                  <td className="px-4 py-3">{row.kode_unit}</td> */}
                  <td className="px-4 py-3">{i+1}</td>
                  <td className="px-4 py-3">{row.tipe_kas}</td>
                  <td className="px-4 py-3 text-right">{row.pecahan}</td>
                  <td className="px-4 py-3 text-right">{row.jumlah}</td>
                  <td className="px-4 py-3 text-right">
                    Rp {Number(row.nilai).toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-3">{row.bank}</td>
                  <td className="px-4 py-3">{row.nomor_bank}</td>
                  <td className="px-4 py-3">{row.tanggal_bank}</td>
                  <td className="px-4 py-3">{row.diterima_bank}</td>
                  <td className="px-4 py-3">{Number(row.selisish || 0).toLocaleString("id-ID")}</td>
                  <td className="px-4 py-3 truncate max-w-xs">
                    {row.uraian || "-"}
                  </td>
                  <td className="px-4 py-3 truncate max-w-xs">
                    {row.catatan_opname || "-"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleEdit(row)}
                      className="text-indigo-500 hover:text-indigo-700 transition"
                    >
                      <Edit3 size={18} />
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 🔹 Editable Row Component
const EditableRow = ({ row, handleChange, handleSave, handleCancel }) => (
  <tr className="bg-indigo-50/50 dark:bg-gray-800/40">

    <td className="px-3 py-2">
        </td>
    <td className="px-3 py-2">
      <select
        value={row.tipe_kas || ""}
        onChange={(e) => handleChange(e, "tipe_kas")}
        className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-900 text-sm"
      >
        <option value="kertas">Kertas</option>
        <option value="logam">Logam</option>
        <option value="giro">Giro</option>
        <option value="pembayaran">Pembayaran</option>
        <option value="penerimaan">Penerimaan</option>
        <option value="lain">Lain</option>
      </select>
    </td>
    <td className="px-3 py-2">
      <select
        type="number"
        value={row.pecahan || ""}
        onChange={(e) => handleChange(e, "pecahan")}
        className="w-24 text-right p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-900 text-sm"
      >
        <option value="">Pilih</option>
        {pecahanOptions.map((r, i) => (
            <option key={i} value={r.value}>{r.label}</option>

        ))}
        
        </select>
    </td>
    <td className="px-3 py-2">
      <input
        type="number"
        value={row.jumlah || ""}
        onChange={(e) => handleChange(e, "jumlah")}
        className="w-24 text-right p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-900 text-sm"
      />
    </td>
    {/* <td className="px-3 py-2 text-right text-indigo-700 dark:text-indigo-400 font-semibold">
      Rp {Number(row.nilai || 0).toLocaleString("id-ID")}
    </td> */}
    <td className="px-3 py-2 text-right text-indigo-700 dark:text-indigo-400 font-semibold">
        Rp {Number(row.nilai || 0).toLocaleString("id-ID")}
          <input
        type="number"
        value={row.nilai || 0}
        onChange={(e) => handleChange(e, "nilai")}
        className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-900 text-sm"
      />
    </td>
  
    <td className="px-3 py-2">
      <input
        type="text"
        value={row.bank || ""}
        onChange={(e) => handleChange(e, "bank")}
        className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-900 text-sm"
      />
    </td>
    <td className="px-3 py-2">
      <input
        type="text"
        value={row.nomor_bank || ""}
        onChange={(e) => handleChange(e, "nomor_bank")}
        className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-900 text-sm"
      />
    </td>
    <td className="px-3 py-2">
      <input
        type="date"
        value={row.tanggal_bank || ""}
        onChange={(e) => handleChange(e, "tanggal_bank")}
        className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-900 text-sm"
      />
    </td>
    <td className="px-3 py-2">
      <input
        type="text"
        value={row.diterima_bank || ""}
        onChange={(e) => handleChange(e, "diterima_bank")}
        className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-900 text-sm"
      />
    </td>
      <td className="px-3 py-2 text-right text-indigo-700 dark:text-indigo-400 font-semibold">
      Rp {Number(row.selisih || 0).toLocaleString("id-ID")}
          <input
        type="number"
        value={row.selisih || 0}
        onChange={(e) => handleChange(e, "selisih")}
        className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-900 text-sm"
      />
    </td>
    <td className="px-3 py-2">
      <input
        type="text"
        value={row.uraian || ""}
        onChange={(e) => handleChange(e, "uraian")}
        className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-900 text-sm"
      />
    </td>
    <td className="px-3 py-2">
      <input
        type="text"
        value={row.catatan_opname || ""}
        onChange={(e) => handleChange(e, "catatan_opname")}
        className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-900 text-sm"
      />
    </td>
    <td className="px-3 py-2 text-center flex justify-center gap-2">
      <button
        onClick={handleSave}
        className="p-1.5 bg-green-500 hover:bg-green-600 text-white rounded-md"
      >
        <Save size={16} />
      </button>
      <button
        onClick={handleCancel}
        className="p-1.5 bg-gray-400 hover:bg-gray-500 text-white rounded-md"
      >
        <X size={16} />
      </button>
    </td>
  </tr>
);

export default CashData;
