import { useState } from "react";
import { ALUR_AUDIT, FILTER_AUDIT } from "../../../../../constant/data";
import { updateData } from "../../../../../utils/api";

const Disposisi = ({ data, reload, user }) => {
  const [animate, setAnimate] = useState(false);

  const changeStatus = (id) => {
    updateData(`/adm/audit_update_status?id=${data?.id}&status_id=${id}`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
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
      <div className="dark:text-white flex flex-col">
        <span className="text-xs font-semibold">
          Status: ID {data?.status_id}
        </span>
        <span className="text-xs font-semibold">
          Next Role: {FILTER_AUDIT(data?.status_id +1)?.role}
        </span>
        <span className="text-xs font-semibold">
          Next Tugas: {FILTER_AUDIT(data?.status_id +1)?.tugas}
        </span>
      </div>

      <div className="w-full grid grid-cols-2 md:grid-cols-2 gap-4">
        {ALUR_AUDIT.map((step) => {
          const isActive = data?.status_id === step.id;
          const isAllowed = user?.role === step.role && data?.status_id != step.id; // ✅ hanya role yang sama bisa klik

          return (
            <button
              key={step.id}
              onClick={() => changeStatus(step.id)}
              disabled={!isAllowed} // ✅ disable kalau role tidak cocok
              className={`
                flex flex-col items-center justify-center p-4 rounded-xl shadow-md transition 
                ${
                  isActive
                    ? "bg-red-300 dark:bg-red-500"
                    : isAllowed
                    ? "bg-green-100 dark:bg-green-700 hover:bg-green-200"
                    : "bg-slate-100 dark:bg-slate-700 opacity-50 cursor-not-allowed"
                }
              `}
            >
              <div className="mb-2 flex items-center">
                {step?.id}. {step.icon} 
                {/* = {step?.role === user?.jabatan ? `oke` : `bukan`}
                {step.role} */}
              </div>
              <span className="text-xs font-medium capitalize">{step.spi_status}</span>
              <span className="text-xs">Role : {step.role}</span>
              {/* <span className="text-xs">Tugas : {step.tugas}</span> */}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Disposisi;
