import { useState } from "react";
import { ALUR_REVDOK, FILTER_ALUR_REVDOK_SPI, FILTER_ALUR_REVDOK_SPI_DESC } from "../../../../../constant/data";
import { updateData } from "../../../../../utils/api";

const Disposisi = ({ data, reload }) => {
  const [animate, setAnimate] = useState(false);
  const changeStatus = (id) => {
    if (animate) return; // cegah spam klik
    updateData(`/adm/revdok_status_store?revdok_id=${data?.id}&status_id=${id}`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log("Success disposisi!", res);
        reload();
      },
      onError: (err) => {
        console.log("err", err);
      },
    });
  };

  return (
    <div className="section-body">
      <h2 className="text_h2">Modul Disposisi</h2>
      <div className="dark:text-white flex flex-col mb-4">
        <span className="text-xs font-semibold">Status: ID {data?.status_id}</span>
        {FILTER_ALUR_REVDOK_SPI(data?.status_id)},{" "}
        <span className="text-xs font-semibold">Desk:</span>
        <span className="text-xs">{FILTER_ALUR_REVDOK_SPI_DESC(data?.status_id)}</span>
      </div>

      <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ALUR_REVDOK.map((step) => {
          const isActive = data?.status_id === step.id; // status sekarang
          const isNext = data?.status_id === step.id - 1; // status berikutnya
          const isDisabled = !isActive && !isNext; // sisanya disable

          return (
            <button
              key={step.id}
              onClick={() => !isDisabled && changeStatus(step.id)}
              disabled={isDisabled}
              className={`
                flex flex-col items-center justify-center p-4 rounded-xl shadow-md transition
                ${isActive ? "bg-red-300" : isNext ? 'bg-slate-100' : "bg-gray-200 opacity-50 cursor-not-allowed"}
              `}
            >
              <div className="mb-2 flex items-center">
                {step?.id}. {step.icon}
              </div>
              <span className="text-xs font-medium">{step.spi_status}</span>
              {/* <span className="text-xs">Role : {step.role}</span> */}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Disposisi;
