import { useState } from "react";
import {
  ALURKONSLAP,
  FILTER_ALURKONSLAP_SPI,
  FILTER_ALURKONSLAP_SPI_DESK,
} from "../../../../constant/data";
import { updateData } from "../../../../utils/api";

const Disposisi = ({ data, reload }) => {
  const [animate, setAnimate] = useState(false);

  const changeStatus = (id) => {
    // Handle status change logic here
    updateData(`/adm/konslap_update_status?id=${data?.id}&status_id=${id}`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log("Success disposisi!", res);
        reload();
      },
      onError: (err) => {
        console.log("err", err);
        // setErr(err?.detail || "Something went wrong!");
      },
    });
  };

  return (
    <div className="section-body">
      <h2 className="text_h2">Modul Disposisi</h2>
      <div className="dark:text-white flex flex-col">
        <span className="text-xs font-semibold">Status: ID {data?.status_id}</span>
        {FILTER_ALURKONSLAP_SPI(data?.status_id)},{" "}
        <span className="text-xs font-semibold">Desk:</span>
        {FILTER_ALURKONSLAP_SPI_DESK(data?.status_id)}
      </div>
      <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ALURKONSLAP.map((step) => (
<button
  key={step.id}
  onClick={() => changeStatus(step.id)}
  className={`
    flex flex-col items-center justify-center p-4 rounded-xl shadow-md transition 
    ${data?.status_id === step.id 
      ? "bg-red-300 dark:bg-red-500" 
      : `bg-slate-50`}
  `}
>

            <div className="mb-2 flex items-center">
              {step?.id}. {step.icon}
            </div>
            <span className="text-xs font-medium">{step.spi_status}</span>
            <span className="text-xs">Role : {step.role}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Disposisi;
