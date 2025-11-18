import { useState, useEffect } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { fetchData } from "../../../utils/api";
import { FILTER_ALURKONSLAP_SPI, FORMAT_DATE_IND, SHORT_TEXT } from "../../../constant/data";
import { filterPelaporKategori } from "../../../utils/spi";
import { ActionButton } from "../../../components/ButtonComp";
import { Eye } from "lucide-react";
import DetailKonsultasi from "./konsultasi/DetailKonsultasi";

const Konsultasi = () => {
  const [err, setErr] = useState("");
  const [animate, setAnimate] = useState(false);
  const [rld, setRld] = useState(false);
  const [datas, setDatas] = useState([]);
  const [dateFilter, setDateFilter] = useState(""); // ⬅️ state filter tanggal
  let jenis = "konsultasi";

  const getDatas = () => {
    fetchData(`/adm/konslap`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log("Success!", res);
        // setDatas(res?.data || []);
              setDatas(Array.isArray(res?.data) ? res.data : []);

      },
      onError: (err) => {
        setErr(err?.detail || "Something went wrong!");
      },
    });
  };

  useEffect(() => {
    getDatas();
  }, [rld]);

  const [dtp, setDtp] = useState("");
  const kembali = () => {
    setDtp("");
    setRld(!rld);
  };

  const pilih = (id) => {
    let n = datas && datas.find((it) => it.id == id);
    setDtp(n);
  };

  // Filter jenis + filter tanggal
  const filterData =
    datas &&
    datas?.filter((it) => {
      if (it.jenis !== jenis) return false;
      if (!dateFilter) return true;
      const createdDate = new Date(it.created_at).toISOString().split("T")[0];
      return createdDate === dateFilter;
    });

  return (
    <section className="section-container">
      <Breadcrumbs title="Konsultasi" />

      {dtp ? (
        <DetailKonsultasi dtp={dtp} type="konsutlasi" title="konsutlasi" kembali={kembali} />
      ) : (
        <div className="section-body">
          {/* Filter tanggal */}
          <div className="mb-4 flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Filter Tanggal:
            </label>
            <input
              type="date"
              className="border rounded-lg px-3 py-2 text-sm focus:ring focus:ring-blue-200 focus:border-blue-400"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
            {dateFilter && (
              <button
                onClick={() => setDateFilter("")}
                className="text-xs px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Reset
              </button>
            )}
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-200">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-100 uppercase bg-gradient-to-r from-blue-500 to-blue-600">
                <tr>
                  <th className="px-6 py-3">Aksi</th>
                  <th className="px-6 py-3">Nama Pelapor</th>
                  <th className="px-6 py-3">No WA</th>
                  <th className="px-6 py-3">Judul</th>
                  <th className="px-6 py-3">Uraian</th>
                  <th className="px-6 py-3">Kategori Pelaporan</th>
                  <th className="px-6 py-3">Unit Pelapor</th>
                  <th className="px-6 py-3">Tgl Konsultasi</th>
                  <th className="px-6 py-3">Status ID</th>
                </tr>
              </thead>

              <tbody>
                {filterData &&
                  filterData.map((r, i) => (
                    <tr
                      key={i}
                      className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        <div className="flex gap-2">
                          <ActionButton
                            onClick={() => pilih(r.id)}
                            icon={Eye}
                            label="Detail"
                            color="blue"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">{r.nama_pelapor}</td>
                      <td className="px-6 py-4">
                        {r?.userdetail?.no_hp || "-"}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-800">
                        {r.judul}
                      </td>
                      <td
                        className="px-6 py-4 max-w-xs truncate"
                        title={r.deskripsi}
                      >
                        {SHORT_TEXT(r.deskripsi)}
                      </td>
                      <td className="px-6 py-4 capitalize">
                        {filterPelaporKategori(r?.pelapor_kategori)}
                      </td>
                      <td className="px-6 py-4">{r.unit_pelapor}</td>
                      <td className="px-6 py-4">
                        {FORMAT_DATE_IND(r.created_at)}
                      </td>
                      {/* <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-lg font-semibold ${
                            r.status === "selesai"
                              ? "bg-green-100 text-green-700"
                              : r.status === "proses"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {r.status}
                        </span>
                      </td> */}
                      <td>
                        {/* {FILTER_ALUR_REVDOK(r.status_id)} */}
                        {FILTER_ALURKONSLAP_SPI(r.status_id)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default Konsultasi;
