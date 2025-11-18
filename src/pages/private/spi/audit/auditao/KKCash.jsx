import React, { useState, useEffect } from "react";
import CashData from "./CashData";
import { UINJKTUNIT } from "../../../../../utils/spi";
import CashAdd from "./CashAdd";
import { fetchData } from "../../../../../utils/api";
import UnitListAudit from "../../../../../components/UnitListAudit";

const KKCash = ({ data }) => {
  const [dcash, setDcash] = useState([]);
  const [animate, setAnimate] = useState(false);
  const [utp, setUtp] = useState("");
  const filterUnit = UINJKTUNIT.find((r) => r.kode == utp);
  const [allkas, setAllkas] = useState([])
  const getDatas = () => {
    fetchData(
      `/spi/audit_kas?audit_id=${data?.id}&kode_unit=${utp}&periode_audit=${data?.periode_audit}`,
      {
        setLoading: setAnimate,
        onSuccess: (res) => {
          setDcash(res.data || "");
          console.log("res disnisn", res);
        },
        onError: (err) =>
          setError(err?.detail || "Terjadi kesalahan saat fetch data!"),
      }
    );
  };
  const getAllKasInput = () => {
    fetchData(
      `/spi/audit_kas_all?audit_id=${data?.id}&kode_unit=${utp}&periode_audit=${data?.periode_audit}`,
      {
        setLoading: setAnimate,
        onSuccess: (res) => {
          setAllkas(res.data || "");
          console.log("all kas", res);
        },
        onError: (err) =>
          setError(err?.detail || "Terjadi kesalahan saat fetch data!"),
      }
    );
  };

  console.log("all", allkas)

  
  useEffect(() => {
    if (data?.id) getDatas();
    if (data?.id) getAllKasInput();
  }, [data, utp]);

  const reload = () => {
    getDatas()
    getAllKasInput()
  };


  return (
    <div className="flex flex-col">
      <div>
        <select className="h-10" onChange={(e) => setUtp(e.target.value)}>
          <option value="">Pilih Unit</option>
          {UINJKTUNIT.map((r, i) => (
            <option key={i} value={r.kode}>
              {r.unit}
            </option>
          ))}
        </select>
      </div>
        {utp ? 
      <div className="flex flex-col gap-4 mt-4">
        <div>
          <h1 className="text_h1">Kertas Kerja Cash, Unit : {filterUnit?.unit}</h1>
        </div>
        {/* Cash opname */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-10/12">
            {/* <CashData dcash={dcash} data={data} utp={utp} reload={reload} /> */}
            <CashAdd data={data} utp={utp} reload={reload} dcash={dcash} />
          </div>
          <div className="w-full lg:w-2/12">
            <UnitListAudit data={allkas} title="Audit Cash Opname" />
          </div>


 
        </div>
        {/* Cash opname */}
      </div>
        
        : 
      <div className="bg-red-100 p-8 rounded-xl mt-4">
        <p className="text-center">Anda belum memilih Unit, .....</p>
      </div>
        
        }
    </div>
  );
};

export default KKCash;
