import { useEffect, useState } from "react";
import { updateData } from "../../../../utils/api"; // pastikan sesuai path

const KategoriSelect = ({ revdok, reload }) => {
  const [value, setValue] = useState(revdok?.kategori || "");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

useEffect(() => {
  setValue(revdok?.kategori || "");
},[revdok])
  const handleChange = async (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    setErr('')
    try {
      await updateData(`/spi/revdok/detail/kategori_update?id=${revdok.id}&kategori=${newValue}`, {
        setLoading,
        onSuccess: () => {
          if (reload) reload(); // refresh parent data
        },
        onError: (err) => {
          setErr(err?.response?.data?.detail || "Gagal update kategori");
        }
      });
    } catch (error) {
      setErr("Error update kategori");
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm border">
      <p className="text-sm text-gray-500">Kategori (Update)</p>
      
      {loading ? (
        <p className="text-xs text-gray-400 animate-pulse">Updating...</p>
      ) : (
        <select
          value={value}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-400 focus:ring focus:ring-pink-200 focus:ring-opacity-50 text-sm"
        >
          <option value="">-- Pilih --</option>
          <option value="lhr">Laporan Hasil Reviu LHR</option>
          <option value="pl">Penugasan Lainnya PL</option>
        </select>
      )}

      {err && <p className="text-xs text-red-500 mt-2">{err}</p>}
    </div>
  );
};

export default KategoriSelect;
