import { useState } from "react";
import {
  ALUR_KONSULTASI,
  ALURKONSLAP,
  FILTER_ALURKONSLAP_SPI,
  FILTER_ALUR_KONSULTASI_SPI,
  FILTER_ALUR_KONSULTASI_SPI_DESK,
  FILTER_ALURKONSLAP_SPI_DESK,
} from "../../../../constant/data";
import { updateData } from "../../../../utils/api";

const DisposisiKonsultasi = ({ data, reload, role }) => {
  const [animate, setAnimate] = useState(false);
  const changeStatus = (id) => {
    // Handle status change logic here
    updateData(`/adm/konslap_update_status?id=${data?.id}&status_id=${id}`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        // console.log("Success disposisi!", res);
        reload();
      },
      onError: (err) => {
        console.log("err", err);
        // setErr(err?.detail || "Something went wrong!");
      },
    });
  };
  const ALURBYROLE = ALUR_KONSULTASI.filter((it) =>
    it.role.toLocaleLowerCase().includes(role)
  );
  return (
    <div className="section-body">
      <h2 className="text_h2">Modul Disposisi Konsultasi</h2>
      <div className="dark:text-white flex flex-col">
        <span className="text-xs font-semibold">
          Status: ID {data?.status_id}
        </span>
        {FILTER_ALUR_KONSULTASI_SPI(data?.status_id)},{" "}
        <span className="text-xs font-semibold">Desk:</span>
        {FILTER_ALUR_KONSULTASI_SPI_DESK(data?.status_id)}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
   {ALURBYROLE &&
  ALURBYROLE.map((step) => {
    const isActive = data?.status_id === step.id - 1;

    return (
      <button
        key={step.id}
        onClick={() => isActive && changeStatus(step.id)}
        disabled={!isActive}
        className={`
          relative flex flex-col items-center justify-center p-4 rounded-xl shadow-md transition 
          ${isActive ? "bg-emerald-300" : "bg-gray-200 cursor-not-allowed"}
        `}
      >
        {/* Dot merah animasi pulse */}
        {isActive && (
          <span className="absolute top-2 right-2 w-3 h-3 bg-red-600 rounded-full animate-pulse"></span>
        )}

        <div className="mb-2 flex items-center">
          {step?.id}. {step.icon}
        </div>
        <span className="text-xs font-medium">{step.spi_status}</span>
        <span className="text-xs">Role : {step.role}</span>
      </button>
    );
  })}

      </div>
    </div>
  );
};

export default DisposisiKonsultasi;
