import { useEffect, useState } from "react";
import { KATEGORIPELAPORAN, UINJKTUNIT } from "../../../../utils/spi";
import { ButtonSubmit } from "../../../../components/ButtonComp";
import { postData } from "../../../../utils/api";
import { useParams } from "react-router-dom";

const DetailUpdateLaporan = ({ data, reload}) => {
  const [animate, setAnimate] = useState(false);
  const [err, setErr] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [otherCategory, setOtherCategory] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [input, setInput] = useState({
    jenis: "laporan",
    kategori_laporan: "",
    judul: "",
    deskripsi: "",
    pihak_terlapor: "",
    tgl_kejadian: "",
    unit_terlapor: "",
  });

  // inisialisasi input dari props data
  useEffect(() => {
    if (data) {
      setInput(data);

      // cek apakah kategori dari data termasuk list atau "Other"
      if (KATEGORIPELAPORAN.includes(data.kategori_laporan)) {
        setSelectedCategory(data.kategori_laporan);
        setOtherCategory("");
      } else if (data.kategori_laporan) {
        setSelectedCategory("Other");
        setOtherCategory(data.kategori_laporan);
      }
    }
  }, [data]);

  // sinkronisasi kategori_laporan di input
  useEffect(() => {
    if (selectedCategory === "Other") {
      setInput((prev) => ({ ...prev, kategori_laporan: otherCategory }));
    } else if (selectedCategory) {
      setInput((prev) => ({ ...prev, kategori_laporan: selectedCategory }));
    }
  }, [selectedCategory, otherCategory]);

  // handle input umum
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  // handle submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in input) {
      formData.append(key, input[key]);
    }

    postData(`/usr/laporan_update_store?id=${data?.id}`, formData, {
      setLoading: setAnimate,
      requireConfirm: false,
      onSuccess: (res) => {
        console.log("Update success!", res);
        reload()
      },
      onError: (err) => {
        console.error("Error saat update:", err);
        setErr(
          err?.response?.data?.detail ||
            "Terjadi kesalahan saat mengupdate laporan!"
        );
      },
    });
  };


  return (
    <div className="section-body">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8">
          Update Dumas
        </h1>

        {err && (
          <p className="text-sm text-red-500 mb-4 bg-red-100 dark:bg-red-900 dark:text-red-200 p-2 rounded">
            {err}
          </p>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Judul */}
          <div>
            <label
              htmlFor="judul"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 uppercase mb-1"
            >
              Judul / Subyek / Permasalahan
            </label>
            <input
              type="text"
              id="judul"
              name="judul"
              required
              value={input.judul}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-sm dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label
              htmlFor="deskripsi"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 uppercase mb-1"
            >
              Uraian Kejadian
            </label>
            <textarea
              id="deskripsi"
              name="deskripsi"
              rows="4"
              required
              value={input.deskripsi}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-sm dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Pihak Terlapor */}
          <div>
            <label
              htmlFor="pihak_terlapor"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 uppercase mb-1"
            >
              Pihak Terlapor *
            </label>
            <textarea
              id="pihak_terlapor"
              name="pihak_terlapor"
              rows="3"
              required
              value={input.pihak_terlapor}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-sm dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Tgl Kejadian */}
          <div>
            <label
              htmlFor="tgl_kejadian"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 uppercase mb-1"
            >
              Tgl Kejadian *
            </label>
            <input
              id="tgl_kejadian"
              name="tgl_kejadian"
              type="date"
              required
              value={input.tgl_kejadian}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-sm dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Kategori Pelaporan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 uppercase mb-2">
              Kategori Pelaporan *
            </label>
            <div className="space-y-2">
              {KATEGORIPELAPORAN.map((category, index) => (
                <label
                  key={index}
                  htmlFor={category}
                  className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200"
                >
                  <input
                    type="radio"
                    id={category}
                    name="reportCategory"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="text-blue-500 focus:ring-blue-400"
                  />
                  <span className="uppercase">{category}</span>
                </label>
              ))}
              {/* Other */}
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="other"
                  name="reportCategory"
                  value="Other"
                  checked={selectedCategory === "Other"}
                  onChange={() => setSelectedCategory("Other")}
                  className="text-blue-500 focus:ring-blue-400"
                />
                <label
                  htmlFor="other"
                  className="text-sm text-gray-800 dark:text-gray-200"
                >
                  Lainnya:
                </label>
                <input
                  type="text"
                  value={otherCategory}
                  onChange={(e) => setOtherCategory(e.target.value)}
                  disabled={selectedCategory !== "Other"}
                  className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Tuliskan kategori lainnya"
                />
              </div>
            </div>
          </div>

          {/* Unit */}
          <div>
            <label
              htmlFor="unit_terlapor"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 uppercase mb-1"
            >
              Unit Terlapor (kosongkan jika anda luar UINJKT)
            </label>
            <select
              id="unit_terlapor"
              name="unit_terlapor"
              value={input.unit_terlapor}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-sm uppercase dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">Pilih Unit</option>
              {UINJKTUNIT.map((item, i) => (
                <option key={i} value={item.kode}>
                  {item.unit}
                </option>
              ))}
            </select>
          </div>
          {data?.status_id <= 6 &&
          <ButtonSubmit loading={animate} />
          }
        </form>
      </div>
    </div>
  );
};

export default DetailUpdateLaporan;
