import { useState } from "react";
import {
  ALUR_DUMAS,
  FILTER_ALUR_DUMAS_SPI,
  FILTER_ALUR_DUMAS_SPI_DESK,
} from "../../../../constant/data";
import { updateData, userDetail } from "../../../../utils/api";
import TolakDumas from "./TolakDumas"; // Sesuaikan path

const DisposisiDumas = ({ data, reload, role }) => {
  const [animate, setAnimate] = useState(false);
  const [showTolakModal, setShowTolakModal] = useState(false);
  const user = userDetail

  const changeStatus = (id) => {
    updateData(`/adm/konslap_update_status?id=${data?.id}&status_id=${id}`, {
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

  const handleTolakDumas = (catatan) => {   
    // Contoh implementasi API call untuk penolakan
    updateData(`/adm/konslap_tolak?konslap_id=${data?.id}&catatan=${catatan}`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log("Dumas berhasil ditolak!", res);
        setShowTolakModal(false);
        reload();
      },
      onError: (err) => {
        console.log("err", err);
      },
    });
  };

  const ALURBYROLE = ALUR_DUMAS.filter((it) =>
    it.role.toLocaleLowerCase().includes(role)
  );


  return (
    <div className="section-body">
      <div className="flex items-center justify-between">
      <h2 className="text_h2">Modul Disposisi Dumas</h2>
      {user?.jabatan === 'ketua' && 
        <button
          onClick={() => setShowTolakModal(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
        >
          Tolak Dumas
        </button>
      
      }
  

      </div>
      
      {/* Tombol Tolak Dumas */}

      <div className="dark:text-white flex flex-col">
        <span className="text-xs font-semibold">
          Status: ID {data?.status_id}
        </span>
        {FILTER_ALUR_DUMAS_SPI(data?.status_id)},
      </div>
      {data?.status === 'tolak' && 
      <div className="dark:text-white bg-red-500  flex text-white flex-col rounded-md p-8">
        <span className="text-sm font-semibold">
          Status: Tertolak oleh ketua SPI
        </span>
        <span className="text-sm font-semibold">
          Alasan: {data?.tolak_alasan}
        </span>
      </div>
      
      }

      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
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

      {/* Modal Tolak Dumas */}
      <TolakDumas
        isOpen={showTolakModal}
        onClose={() => setShowTolakModal(false)}
        onSubmit={handleTolakDumas}
        data={data}
      />
    </div>
  );
};

export default DisposisiDumas;