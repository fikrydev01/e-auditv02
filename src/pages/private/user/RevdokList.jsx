import { useEffect, useState } from "react";
import { fetchData, deleteData } from "../../../utils/api";
import { FILTER_ALUR_REVDOK_USER, FORMAT_DATE_HOUR_IND } from "../../../constant/data";
import { Trash2, Eye } from "lucide-react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import RevdokDetail from "./RevdokDetail";

const RevdokList = () => {
  const [animate, setAnimate] = useState(false);
  const [rld, setRld] = useState(false);
  const [err, setErr] = useState("");
  const [datas, setDatas] = useState([]);
  const [dtp, setDtp] = useState("");

  const reload = () => setRld(!rld);

  const getDatas = () => {
    fetchData(`/usr/revdok`, {
      setLoading: setAnimate,
      onSuccess: (res) => setDatas(res?.data || []),
      onError: (err) => setErr(err?.detail || "Something went wrong!"),
    });
  };

  useEffect(() => {
    getDatas();
  }, [rld]);

  const kembali = () => setDtp("");

  const pilih = (id) => {
    let n = datas.find((it) => it.id === id);
    setDtp(n);
  };

  const hapus = (id) => {
    // if (!window.confirm("Apakah anda yakin ingin menghapus data ini?")) return;
    deleteData(`/usr/revdok_destroy?id=${id}`, {}, {
      setLoading: setAnimate,
      onSuccess: () => reload(),
      onError: (err) => console.log(err),
    });
  };

  if (dtp) {
    return <RevdokDetail dtp={dtp} kembali={kembali} />;
  }


  console.log("Datas", datas)
  return (
    <div className="section-container">
        <Breadcrumbs title="List Review Dokumen" />

    <div className="flex flex-col section-body">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        List Review Dokumen
      </h1>

      {err && (
        <div className="p-3 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 rounded-md">
          {err}
        </div>
      )}

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
          <thead className="text-xs text-white bg-gray-600 dark:bg-gray-700 uppercase">
            <tr>
              <th className="px-6 py-3">Aksi</th>
              <th className="px-6 py-3">Pemilik</th>
              <th className="px-6 py-3">Catatan</th>
              <th className="px-6 py-3">URL Surat</th>
              <th className="px-6 py-3">URL Dokumen</th>
              <th className="px-6 py-3">TGL Ajuan</th>
              <th className="px-6 py-3">Tolak</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {datas.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  Tidak ada data tersedia
                </td>
              </tr>
            ) : (
              datas.map((r, i) => (
                <tr
                  key={i}
                  className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-6 py-3 flex gap-2">
                    <button
                      onClick={() => pilih(r.id)}
                      className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 text-xs"
                    >
                      <Eye size={16} /> Detail
                    </button>
                    <button
                      onClick={() => hapus(r.id)}
                      className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white flex items-center gap-2 text-xs"
                    >
                      <Trash2 size={16} /> Hapus
                    </button>
                  </td>
                  <td className="px-6 py-3">{r.pemilik}</td>
                  <td className="px-6 py-3">{r?.tugas}</td>
                  <td className="px-6 py-3">
                    <a
                      href={r?.surat_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Surat
                    </a>
                  </td>
                  <td className="px-6 py-3">
                    <a
                      href={r?.dokumen_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Dokumen
                    </a>
                  </td>
                  <td className="px-6 py-3">
                    {FORMAT_DATE_HOUR_IND(r?.created_at)}
                  </td>
                  <td className={`px-6 py-3 ${r?.status === 'tolak' ? `bg-red-500 text-white` : ``}`}>
                    {/* {r.status === 'tolak' ? `Ya` : ``} <br /> */}
                  {r?.tolak_alasan}


                  </td>
                  <td className="px-6 py-3 capitalize">
                    {FILTER_ALUR_REVDOK_USER(r?.status_id)}
                    {/* {r.status} */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default RevdokList;
