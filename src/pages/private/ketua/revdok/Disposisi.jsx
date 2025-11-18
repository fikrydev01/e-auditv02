import { useState } from "react";
import {
  ALUR_REVDOK,
  ALURKONSLAP,
  FILTER_ALUR_REVDOK_SPI,
  FILTER_ALUR_REVDOK_SPI_DESC,
} from "../../../../constant/data";
import { updateData, userDetail } from "../../../../utils/api";
import TolakRevdok from "./TolakRevdok";

const Disposisi = ({ data, reload }) => {
  const [animate, setAnimate] = useState(false);
  const [showTolakModal, setShowTolakModal] = useState(false);

  const user = userDetail;
  const role = user?.role?.toLowerCase();

  const changeStatus = (id) => {
    if (animate) return; // cegah spam klik
    updateData(`/adm/revdok_status_store?revdok_id=${data?.id}&status_id=${id}`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log("Success disposisi!", res);
        reload();
      },
      onError: (err) => console.log("err", err),
    });
  };

  const handleTolakReviu = (catatan) => {
    updateData(`/adm/revdok_tolak?revdok_id=${data?.id}&catatan=${catatan}`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log("Permohonan berhasil ditolak!", res);
        setShowTolakModal(false);
        reload();
      },
      onError: (err) => console.log("err", err),
    });
  };

  // Filter step hanya untuk role user
  const ALURBYROLE = ALURKONSLAP.filter((it) =>
    it.role.toLocaleLowerCase().includes(role)
  );

  return (
    <div className="section-body">
      <div className="flex items-center justify-between">
        <h2 className="text_h2">Modul Disposisi Review Dokumen</h2>

        {user?.jabatan === "ketua" && (
          <button
            onClick={() => setShowTolakModal(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
          >
            Tolak Permohonan
          </button>
        )}
      </div>

      {data?.status === "tolak" && (
        <div className="bg-red-500 text-white flex flex-col rounded-md p-8 mt-4">
          <span className="text-sm font-semibold">
            Status: Tertolak oleh ketua SPI
          </span>
          <span className="text-sm font-semibold">
            Alasan: {data?.tolak_alasan}
          </span>
        </div>
      )}

      <div className="dark:text-white flex flex-col mb-4 mt-4">
        <span className="text-xs font-semibold">
          Status: ID {data?.status_id}
        </span>
        {FILTER_ALUR_REVDOK_SPI(data?.status_id)},{" "}
        <span className="text-xs font-semibold">Desk:</span>
        <span className="text-xs">
          {FILTER_ALUR_REVDOK_SPI_DESC(data?.status_id)}
        </span>
      </div>

      {/* Grid tombol hanya untuk role user */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
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

      <TolakRevdok
        isOpen={showTolakModal}
        onClose={() => setShowTolakModal(false)}
        onSubmit={handleTolakReviu}
        data={data}
      />
    </div>
  );
};

export default Disposisi;
