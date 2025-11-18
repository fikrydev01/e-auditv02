import React, { useState, useEffect } from "react";
import { UINJKTUNIT } from "../../../../../utils/spi";

import { fetchData } from "../../../../../utils/api";
import StockData from "./StockData";
import StockUpload from "./StockUpload";
import { Eye, EyeClosedIcon, EyeIcon } from "lucide-react";
import UnitListAudit from "../../../../../components/UnitListAudit";
import PerhatianCard from "../../../../../components/PerhatianCard";

const KKStock = ({ data }) => {
  const [dstock, setDstock] = useState([]);
  const [animate, setAnimate] = useState(false);
  const [utp, setUtp] = useState("");
  const filterUnit = UINJKTUNIT.find((r) => r.kode == utp);

  const [showupload, setShowupload] = useState(false)
  const audit = data?.audit

  const [allbhp, setAllbhp] = useState([])
  const getDatas = () => {
    fetchData(
      `/spi/audit_bhp?audit_id=${audit?.id}&kode_unit=${utp}`,
      {
        setLoading: setAnimate,
        onSuccess: (res) => {
          setDstock(res?.data || []);
          console.log("res audit bhp", res);
        },
        onError: (err) =>
          setError(err?.detail || "Terjadi kesalahan saat fetch data!"),
      }
    );
  };
  const getAllbhp = () => {
    fetchData(
      `/spi/audit_bhp_all?audit_id=${audit?.id}&periode_audit=${data?.periode_audit}`,
      {
        setLoading: setAnimate,
        onSuccess: (res) => {
          // setDstock(res.data || []);
          setAllbhp(res?.data || [])
          console.log("res alll bhp", res);
        },
        onError: (err) =>
          console.log("Err", err)
      }
    );
  };

  useEffect(() => {
    if (audit?.id) getDatas();
    if (audit?.id) getAllbhp();
  }, [data, utp, showupload]);

  useEffect(() => {
    if (audit?.id) getDatas();
    if (audit?.id) getAllbhp();
  }, [showupload]);

  const reload = () => {
    getDatas();
    getAllbhp();
  };

  return (
    <div className="flex flex-col">
      <PerhatianCard>
<div className="space-y-2 text-sm text-gray-700 mb-4">
    <div className="flex items-center gap-2">
      <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">1</span>
      <span>Buat data pada Excel, Upload file Excel pada form {" "}
         <a
    href="/assets/template/barang_habis_pakai.xlsx" // Ganti dengan path yang sesuai
    download="Template_Stock_Opname.xlsx" 
    className="text-red-500" >
    Download Template Excel
  </a>
      </span>
    </div>

    <div className="flex items-center gap-2">
      <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">2</span>
      <span>Tambahkan data seperti, kuantitas opname, catatan auditor, nama tim audit, nama unit /fakultas setelah upload</span>
    </div>
  </div>

  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
    <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
      Pilih Unit:
    </label>
    <select 
      className="h-10 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white min-w-[200px]"
      onChange={(e) => setUtp(e.target.value)}
      value={utp}
    >
      <option value="" className="text-gray-400">Pilih Unit</option>
      {UINJKTUNIT.map((r, i) => (
        <option key={i} value={r.kode} className="text-gray-700">
          {r.unit}
        </option>
      ))}
    </select>
  </div>
      </PerhatianCard>




      
      {utp ? 
      <div className="flex flex-col gap-4 mt-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
        <h1 className="text_h1">Kertas Kerja Stock, Unit : {filterUnit?.unit}</h1>
          <button 
          onClick={()=>setShowupload(!showupload)}
          className={`${showupload ? `bg-red-500` : `bg-emerald-500`} text-white text-xs px-4 py-2 rounded-md flex items-center gap-2`}>
            {showupload ? 
            <EyeClosedIcon size={16} />
            : 
          <EyeIcon size={16} />
          }
            {showupload ? `Hide` : `Show`} Upload Form</button>
        </div>
        {showupload 
        ? 
          <StockUpload data={data?.audit} utp={utp}  />
        :
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-10/12">
          <StockData dstock={dstock} data={data?.audit} utp={utp} reload={reload} />

          </div>
          <div className="w-full lg:w-2/12">
          <UnitListAudit data={allbhp} title={"Stock Opname"} />
          </div>
        </div>
         }
      </div>
      {/* Stock opname */}
      </div>
      :
         <div className="bg-red-100 p-8 rounded-xl mt-4">
        <p className="text-center">Anda belum memilih Unit, .....</p>
      </div>
      }

    </div>
  );
};

export default KKStock;
