import { useState, useEffect } from "react";
// import KopSurat from '../../../../components/KopSurat'
import KopSurat from "../../../../../../components/KopSurat";

import { fetchData } from "../../../../../../utils/api";
import {
  FORMAT_DATE_IND,
  FORMAT_RUPIAH,
} from "../../../../../../constant/data";
import { UINJKTUNIT } from "../../../../../../utils/spi";

const KkCash = ({ data }) => {
  const [animate, setAnimate] = useState(false);
  const [datas, setDatas] = useState([]);

  const [utp, setUtp] = useState("");
  // const filterUnit = UINJKTUNIT.find((r) => r.kode == utp);
  const filterUnit = "sadf";

  //  kertas = "kertas"
  // logam = "logam"
  // giro = "giro"
  // pembayaran = "pembayaran"
  // penerimaan = "penerimaan"
  // lain = "lain"

  // --- Fetch Data ---
  const getDatas = () => {
    fetchData(
      `/spi/audit_kas?audit_id=${data?.id}&kode_unit=${utp}&periode_audit=${data?.periode_audit}`,
      {
        setLoading: setAnimate,
        onSuccess: (res) => setDatas(res.data || []),
        onError: (err) =>
          setError(err?.detail || "Terjadi kesalahan saat fetch data!"),
      }
    );
  };

  useEffect(() => {
    getDatas();
  }, [utp]);

  const uangkertas = datas?.filter((it) => it.tipe_kas === "kertas") || [];
  const uanglogam = datas?.filter((it) => it.tipe_kas === "logam") || [];
  const cekgiro = datas?.filter((it) => it.tipe_kas === "giro") || [];

  // 🧮 Hitung total nilai masing-masing
  const totalKertas = uangkertas.reduce(
    (sum, item) => sum + Number(item.nilai || 0),
    0
  );
  const totalLogam = uanglogam.reduce(
    (sum, item) => sum + Number(item.nilai || 0),
    0
  );
  const totalGiro = cekgiro.reduce(
    (sum, item) => sum + Number(item.nilai || 0),
    0
  );

  // (opsional) total semua jenis kas
  const totalSemua = totalKertas + totalLogam + totalGiro;

  return (
    <div className="flex flex-col gap-4">
      <select className="h-10" onChange={(e) => setUtp(e.target.value)}>
        <option value="">Pilih Unit</option>
        {UINJKTUNIT.map((r, i) => (
          <option key={i} value={r.kode}>
            {r.unit}
          </option>
        ))}
      </select>
      {utp ? (
        <div className="section-body">
          <KopSurat />
          <div>
            <h1 className="text-xl font-bold uppercase text-center">
              LAMPIRAN BERITA ACARA - KAS OPNAME {utp}
            </h1>
          </div>

          <div className="flex flex-col w-full gap-4">
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold mb-2">I. Uang Kertas</h2>
              <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200">
                  <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-2 border-b text-center">Jumlah</th>
                      <th className="px-4 py-2 border-b text-center">Jenis</th>
                      <th className="px-4 py-2 border-b text-center">
                        Pecahan
                      </th>
                      <th className="px-4 py-2 border-b text-center">Nilai</th>
                      <th className="px-4 py-2 border-b text-center">
                        Catatan Opname
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {uangkertas && uangkertas.length > 0 ? (
                      uangkertas.map((r, i) => (
                        <tr
                          key={i}
                          className={`${
                            i % 2 === 0
                              ? "bg-white dark:bg-gray-900"
                              : "bg-gray-50 dark:bg-gray-800"
                          } hover:bg-gray-100 dark:hover:bg-gray-700 transition`}
                        >
                          <td className="px-4 py-2 border-b text-center">
                            {r.jumlah}
                          </td>
                          <td className="px-4 py-2 border-b text-center">
                            @ Lembar
                          </td>
                          <td className="px-4 py-2 border-b text-center">
                            {FORMAT_RUPIAH(r.pecahan)}
                          </td>
                          <td className="px-4 py-2 border-b text-center">
                            {FORMAT_RUPIAH(r.nilai)}
                          </td>
                          <td className="px-4 py-2 border-b text-center">
                            {r.catatan_opname || "-"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center py-4 text-gray-500 dark:text-gray-400"
                        >
                          Tidak ada data uang kertas.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* end uang kertas */}

            <div className="flex flex-col">
              <h2 className="text-lg font-semibold mb-2">II. Uang Logam</h2>
              <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200">
                  <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-2 border-b text-left">Jumlah</th>
                      <th className="px-4 py-2 border-b text-left">Jenis</th>
                      <th className="px-4 py-2 border-b text-left">Pecahan</th>
                      <th className="px-4 py-2 border-b text-left">Nilai</th>
                      <th className="px-4 py-2 border-b text-left">
                        Catatan Opname
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {uanglogam && uanglogam.length > 0 ? (
                      uanglogam.map((r, i) => (
                        <tr
                          key={i}
                          className={`${
                            i % 2 === 0
                              ? "bg-white dark:bg-gray-900"
                              : "bg-gray-50 dark:bg-gray-800"
                          } hover:bg-gray-100 dark:hover:bg-gray-700 transition`}
                        >
                          <td className="px-4 py-2 border-b text-center">
                            {r.jumlah}
                          </td>
                          <td className="px-4 py-2 border-b text-center">
                            @ Keping
                          </td>
                          <td className="px-4 py-2 border-b text-center">
                            {FORMAT_RUPIAH(r.pecahan)}
                          </td>
                          <td className="px-4 py-2 border-b text-center">
                            {FORMAT_RUPIAH(r.nilai)}
                          </td>
                          <td className="px-4 py-2 border-b text-center">
                            {r.catatan_opname || "-"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center py-4 text-gray-500 dark:text-gray-400"
                        >
                          Tidak ada data uang logam.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* end uang LOgam */}

            <div className="flex flex-col">
              <h2 className="text-lg font-semibold mb-2">
                III. Check / Giro Bilyet
              </h2>
              <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200">
                  <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-2 border-b text-left">Bank</th>
                      <th className="px-4 py-2 border-b text-left">NO</th>
                      <th className="px-4 py-2 border-b text-left">Tanggal</th>
                      <th className="px-4 py-2 border-b text-left">Diterima</th>
                      <th className="px-4 py-2 border-b text-left">Rupiah</th>
                      <th className="px-4 py-2 border-b text-left">
                        Catatan Opname
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cekgiro && cekgiro.length > 0 ? (
                      cekgiro.map((r, i) => (
                        <tr
                          key={i}
                          className={`${
                            i % 2 === 0
                              ? "bg-white dark:bg-gray-900"
                              : "bg-gray-50 dark:bg-gray-800"
                          } hover:bg-gray-100 dark:hover:bg-gray-700 transition`}
                        >
                          <td className="px-4 py-2 border-b text-center">
                            {r.bank}
                          </td>
                          <td className="px-4 py-2 border-b text-center">
                            {r.nomor_bank}
                          </td>
                          <td className="px-4 py-2 border-b text-center">
                            {FORMAT_DATE_IND(r.tanggal_bank)}
                          </td>
                          <td className="px-4 py-2 border-b text-center">
                            {r.diterima_bank}
                          </td>

                          <td className="px-4 py-2 border-b text-center">
                            {" "}
                            {FORMAT_RUPIAH(r?.nilai)}
                          </td>
                          <td className="px-4 py-2 border-b text-center">
                            {r.catatan_opname || "-"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center py-4 text-gray-500 dark:text-gray-400"
                        >
                          Tidak ada data Ceck / Giro Bilyet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* end uang Cek/giri */}

            <div className="flex flex-col">
              <h2 className="text-lg font-semibold mb-2">
                Jumlah uang kas yang ada I + II + III
              </h2>
              <h3 className="text-xl font-semibold">
                {FORMAT_RUPIAH(totalSemua)}
              </h3>
            </div>
            {/* <div className='flex flex-col'>
            <h2 className="text-lg font-semibold mb-2">Detail Berita Acara Audit</h2>


            </div> */}
          </div>
        </div>
      ) : (
        <div className="bg-red-100 p-8 rounded-xl mt-4">
          <p className="text-center">Anda belum memilih Unit, .....</p>
        </div>
      )}
    </div>
  );
};

export default KkCash;
