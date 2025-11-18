import { useState, useEffect } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { fetchData } from "../../../utils/api";
import { FILTER_ALUR_KONSULTASI_USER, FILTER_ALURKONSLAP_USER, FORMAT_DATE_IND, SHORT_TEXT } from "../../../constant/data";
import { ActionButton } from "../../../components/ButtonComp";
import { Eye } from "lucide-react";
import Detail from "./konsultasi/Detail"
import DetailKonsultasi from "./konsultasi/DetailKonsultasi";

const KonsultasiList = () => {
  const [err, setErr] = useState("");
  const [animate, setAnimate] = useState(false);
  const [rld, setRld] = useState(false);
  const [datas, setDatas] = useState([]);
  const reload = () => setRld(!rld)
  let jenis = "konsultasi";

  const getDatas = () => {
    fetchData(`/usr/konslap_list`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log("Success! asdfasdfas", res);
        setDatas(res.data || []);
      },
      onError: (err) => {
        setErr(err?.detail || "Something went wrong!");
      },
    });
  };
  useEffect(() => {
    getDatas();
  }, [rld]);

  const [dtp, setDtp] = useState('')
  const kembali = () => {
    setDtp('')
    reload()
  }

  const pilih = (id) => {
    let n = datas.find(it => it.id === id)
    if (n) setDtp(n)
    
  }
  return (
    <section className="section-container flex flex-col gap-6">
      {dtp ? <DetailKonsultasi dtp={dtp} kembali={kembali} /> : 
    
      <div className="flex flex-col gap-6">
      <Breadcrumbs title="Data Konsultasi User" />
      <div className="section-body">
        <h2 className="text_h2">Data Konsultasi Saya</h2>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-200">
                  <table className="w-full text-sm text-left text-gray-600">
                    <thead className="text-xs text-gray-100 uppercase bg-gradient-to-r from-blue-500 to-blue-600">
                      <tr>
                        <th className="px-6 py-3">Aksi</th>
                        <th className="px-6 py-3">Nama Pelapor</th>
                        <th className="px-6 py-3">Judul</th>
                        <th className="px-6 py-3">Uraian</th>
                        <th className="px-6 py-3">Tgl Konsultasi</th>
                        <th className="px-6 py-3">Status ID</th>
                      </tr>
                    </thead>
      
                    <tbody>
                      {datas &&
                        datas
                        .filter(it => it.jenis == jenis)
                        .map((r, i) => (
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

                            <td className="px-6 py-4 font-semibold text-gray-800">
                              {r.nama_pelapor}
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
                              {/* {r.status_id} */}
                              {FILTER_ALUR_KONSULTASI_USER(r.status_id)}

                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
      </div>

      </div>
    }
    </section>
  );
};

export default KonsultasiList;
