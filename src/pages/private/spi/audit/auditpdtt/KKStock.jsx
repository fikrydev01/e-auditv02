import React, { useState, useEffect } from "react";
import { UINJKTUNIT } from "../../../../../utils/spi";

import { fetchData } from "../../../../../utils/api";
import StockData from "./StockData";
import StockUpload from "./StockUpload";
import { Eye, EyeClosedIcon, EyeIcon } from "lucide-react";

const KKStock = ({ data }) => {
  const [dstock, setDstock] = useState([]);
  const [animate, setAnimate] = useState(false);
  const [utp, setUtp] = useState("");
  const filterUnit = UINJKTUNIT.find((r) => r.kode == utp);

    useEffect(() => {
      setUtp(data?.kode_unit);
    }, [data]);

  const [showupload, setShowupload] = useState(false)
  const audit = data?.audit
  const getDatas = () => {
    fetchData(
      `/spi/audit_bhp?audit_id=${audit?.id}&kode_unit=${utp}`,
      {
        setLoading: setAnimate,
        onSuccess: (res) => {
          setDstock(res.data || []);
          console.log("res audit bhp", res);
        },
        onError: (err) =>
          setError(err?.detail || "Terjadi kesalahan saat fetch data!"),
      }
    );
  };

  useEffect(() => {
    if (audit?.id) getDatas();
  }, [data, utp]);

  const reload = () => {
    getDatas();
  };

  return (
    <div className="flex flex-col">




      
      {utp ? 
      <div className="flex flex-col gap-4 mt-4">
        <h1 className="text_h1">Kertas Kerja Stock, Unit : {filterUnit?.unit}</h1>
      {/* Stock opname */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-end">
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
          <StockData dstock={dstock} data={data} utp={utp} reload={reload} />
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
