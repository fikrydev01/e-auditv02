import { useState } from "react";
import { ArrowBigLeftDashIcon } from "lucide-react";
import { pelaporKategori, UINJKTUNIT } from "../../../utils/spi";
import { postData } from "../../../utils/api";
import { ButtonKembaliDashboard, ButtonSubmit } from "../../../components/ButtonComp";

const KonsultasiAdd = () => {
  const [animate, setAnimate] = useState(false);
  const [err, setErr] = useState(null);
  const [input, setInput] = useState({
    jenis: "konsultasi",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    postData("/usr/konsultasi_store", input, {
      setLoading: setAnimate,
      requireConfirm: true,
      onSuccess: (res) => {
        console.log("Success!", res);
        if (res.data?.status === 200) {
          window.location.href = "/u/input_success";
        }
      },
      onError: (err) => {
        setErr(err?.response?.data?.detail || "Something went wrong!");
      },
    });
  };

  return (
    <div className="section-body">
      {/* Kembali Button */}
<ButtonKembaliDashboard />

      {/* Judul Form */}
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Form Tambah Konsultasi
      </h1>

      {/* Error */}
      {err && (
        <div className="p-3 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 rounded-md">
          {err}
        </div>
      )}

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Judul / Subyek */}
        <div className="flex flex-col gap-1">
          <label className="uppercase font-medium text-gray-700 dark:text-gray-300">
            Judul / Subyek / Permasalahan
          </label>
          <input
            type="text"
            name="judul"
            required
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Deskripsi Masalah */}
        <div className="flex flex-col gap-1">
          <label className="uppercase font-medium text-gray-700 dark:text-gray-300">
            Deskripsi Masalah
          </label>
          <textarea
            name="deskripsi"
            required
            onChange={handleChange}
            rows={5}
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Kategori Pelapor */}
        <div className="flex flex-col gap-1">
          <label className="uppercase font-medium text-gray-700 dark:text-gray-300">
            Kategori Pelapor
          </label>
          <select
            name="pelapor_kategori"
            required
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Pilih Jenis</option>
            {pelaporKategori.map((item, i) => (
              <option key={i} value={item.kode}>
                {item.deskripsi}
              </option>
            ))}
          </select>
        </div>

        {/* Unit Kerja Pelapor */}
        <div className="flex flex-col gap-1">
          <label className="uppercase font-medium text-gray-700 dark:text-gray-300">
            Unit Kerja Pelapor (kosongkan jika di luar UINJKT)
          </label>
          <select
            name="unit_pelapor"
            onChange={handleChange}
            className="p-3 uppercase rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Pilih Unit</option>
            {UINJKTUNIT.map((item, i) => (
              <option key={i} value={item.kode}>
                {item.unit}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <ButtonSubmit animate={animate} />
      </form>
    </div>
  );
};

export default KonsultasiAdd;
