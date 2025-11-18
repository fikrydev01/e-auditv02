import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../utils/api";


const BarangHabisPakai = ({ audit }) => {
  const [animate, setAnimate] = useState(false);
  const [datas, setDatas] = useState([]);

  console.log("audit", audit)
  const getDatas = () => {
    fetchData(
      `/spi/audit_bhp?audit_id=${audit.id}&kode_unit=${audit?.kode_unit}`,
      {
        setLoading: setAnimate,
        onSuccess: (res) => {
          setDatas(res.data || "");
        },
        onError: (err) => {
          setErr(err?.detail || "Something went wrong!");
        },
      }
    );
  };
  useEffect(() => {
    getDatas();
  }, [audit]);

  const selisih = (a, b) => {
    if(a && b){
      return b-a
    }
  }


  return (
    <div className="section-body">
      <h1 className="text-xl font-semibold uppercase">Data Barang Habis Pakai {audit?.kode_unit}, Periode Audit {audit?.periode_audit}</h1>
      

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
                <td className="border px-2 py-1">{selisih(r?.kuantitas_opname, r?.kuantitas_opname)}</td>
                <td className="border px-2 py-1">{r?.keterangan}</td>

              
              </tr>
            ))}
        </tbody>
      </table>


    </div>
  );
};

export default BarangHabisPakai;
