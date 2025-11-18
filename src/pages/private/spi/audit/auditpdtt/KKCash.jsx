import React, { useState, useEffect } from "react";
import CashData from "./CashData";
import { UINJKTUNIT } from "../../../../../utils/spi";
import CashAdd from "./CashAdd";
import { fetchData } from "../../../../../utils/api";

const KKCash = ({ data }) => {
  const [dcash, setDcash] = useState([]);
  const [animate, setAnimate] = useState(false);
  const [utp, setUtp] = useState("");

  useEffect(() => {
    setUtp(data?.kode_unit);
  }, [data]);

  const filterUnit = UINJKTUNIT.find((r) => r.kode == utp);

  const getDatas = () => {
    fetchData(
      `/spi/audit_kas?audit_id=${data?.id}&kode_unit=${utp}&periode_audit=${data?.periode_audit}`,
      {
        setLoading: setAnimate,
        onSuccess: (res) => {
          setDcash(res.data || []);
          console.log("res", res);
        },
        onError: (err) =>
          setError(err?.detail || "Terjadi kesalahan saat fetch data!"),
      }
    );
  };

  useEffect(() => {
    if (data?.id) getDatas();
  }, [data, utp]);

  const reload = () => {
    getDatas();
  };


  return (
    <div className="flex flex-col">
        {utp ? 
      <div className="flex flex-col gap-4 mt-4">
        <div>
          <h1 className="text_h1">Kertas Kerja Cash, Unit : {filterUnit?.unit}</h1>
        </div>
        {/* Cash opname */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-9/12">
            <CashData dcash={dcash} data={data} utp={utp} reload={reload} />
          </div>
          <div className="w-full lg:w-3/12">
            <CashAdd data={data} utp={utp} reload={reload} />
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
