import { useEffect, useState } from "react";
import { KATEGORIPELAPORAN, UINJKTUNIT } from "../../../../utils/spi";
import { ButtonSubmit } from "../../../../components/ButtonComp";
import { postData } from "../../../../utils/api";
import { useParams } from "react-router-dom";

const DetailUpdateKonsultasi = ({ data, reload}) => {
  const [animate, setAnimate] = useState(false);
  const [err, setErr] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [otherCategory, setOtherCategory] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [input, setInput] = useState({
    kategori_laporan: "",
    judul: "",
    deskripsi: "",
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
          Detail Konsultasi
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
              Deskripsi
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


          {data?.status_id <=2 ? 
          
          <ButtonSubmit loading={animate} />
          
          : null}


        </form>
      </div>
    </div>
  );
};

export default DetailUpdateKonsultasi;
