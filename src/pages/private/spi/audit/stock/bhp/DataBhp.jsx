import React, { useEffect, useState } from "react";
import UploadBhp from "./UploadBhp";
import { fetchData } from "../../../../../../utils/api";
import TableBhp from "./TableBhp";

const DataBhp = ({ audit }) => {
  const [animate, setAnimate] = useState(false);
  const [datas, setDatas] = useState([]);
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

  const [mod, setMod] = useState("data");

  return (
    <div className=" flex flex-col">
      <div className="flex items-center justify-end gap-4 mb-3">
        <button
          onClick={() => setMod("data")}
          className="text-sm text-white bg-red-400 px-2 py-1 rounded-md"
        >
          Data BHP
        </button>
        <button
          onClick={() => setMod("upload")}
          className="text-sm text-white bg-red-400 px-2 py-1 rounded-md"
        >
          Upload
        </button>
      </div>
      {mod === "data" && (
        <div className="section-body">
          <TableBhp datas={datas} />
        </div>
      )}

      {mod === "upload" && <UploadBhp audit={audit} />}
    </div>
  );
};

export default DataBhp;
