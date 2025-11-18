import React from "react";
import { updateData } from "../../../../utils/api";
import { useState } from "react";
import { FILTER_AUDIT } from "../../../../constant/data";

const Selesai = ({ audit }) => {
  const [animate, setAnimate] = useState(false);
  const changeStatus = () => {
    updateData(`/spi/audit_status_store?audit_id=${audit?.id}&status_id=${5}`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log("surtuf!", res);
        // setDatas(res?.data || []);
      },
      onError: (err) => {
        setErr(err?.detail || "Something went wrong!");
      },
    });
  };
  return (
    <div className="bg-red-200 px-4 py-2 rounded-lg flex flex-col">
      <span>
        {/* {FILTER_AUDIT(audit?.status_id)} */}
        Status : {audit?.status_id} <br />
                    {FILTER_AUDIT(audit?.status_id)?.spi_status || '-'}
      </span>
      {audit?.status_id === 5 && 
      <button onClick={() => changeStatus()}>Kirim Berita Acara ke Sekretaris</button>
      }
    </div>
  );
};

export default Selesai;
