import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../../../utils/api";
import { UINJKTUNIT } from "../../../../../../utils/spi";
import KopSurat from "../../../../../../components/KopSurat";

const KkStock = ({ data }) => {
  const [animate, setAnimate] = useState(false);
  const [datas, setDatas] = useState([]);
  const [utp, setUtp] = useState("");
  // const filterUnit = UINJKTUNIT.find((r) => r.kode == utp);
  const filterUnit = "sadf";


  
  const getDatas = () => {
    fetchData(`/spi/audit_bhp?audit_id=${data?.id}&kode_unit=${utp}`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        setDatas(res.data || "");
        // console.log("res", res)
      },
      onError: (err) => {
        setErr(err?.detail || "Something went wrong!");
      },
    });
  };
  useEffect(() => {
    getDatas();
  }, [utp]);

  const selisih = (a, b) => {
    if (a && b) {
      return b - a;
    }
  };

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
              LAMPIRAN BERITA ACARA <br /> STOCK OPNAME {utp}
            </h1>
          </div>

          <table className="table-auto w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 py-1 border">No</th>
                <th className="px-2 py-1 border">Kode Inti</th>
                <th className="px-2 py-1 border">Kode Barang</th>
                <th className="px-2 py-1 border">Uraian</th>
                <th className="px-2 py-1 border">Satuan</th>
                <th className="px-2 py-1 border">Kuantitas Laporan</th>
                <th className="px-2 py-1 border">Kuantitas Opname</th>
                <th className="px-2 py-1 border">Selisih</th>
                <th className="px-2 py-1 border">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {datas &&
                datas.map((r, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border px-2 py-1">{idx + 1}</td>
                    <td className="border px-2 py-1">{r?.kode_inti}</td>
                    <td className="border px-2 py-1">{r?.kode_barang}</td>
                    <td className="border px-2 py-1">{r?.nama_barang}</td>
                    <td className="border px-2 py-1">{r?.satuan}</td>
                    <td className="border px-2 py-1">{r?.kuantitas_laporan}</td>
                    <td className="border px-2 py-1">{r?.kuantitas_opname}</td>
                    <td className="border px-2 py-1">
                      {selisih(r?.kuantitas_opname, r?.kuantitas_opname)}
                    </td>
                    <td className="border px-2 py-1">{r?.keterangan}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-red-100 p-8 rounded-xl mt-2">
          <p className="text-center">Anda belum memilih Unit, .....</p>
        </div>
      )}
    </div>
  );
};

export default KkStock;
