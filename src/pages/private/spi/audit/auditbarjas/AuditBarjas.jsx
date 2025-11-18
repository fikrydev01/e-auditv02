import React, { useState, useEffect } from "react";
import { ActionButton } from "../../../../../components/ButtonComp";
import { ArrowLeftIcon, Eye, ThumbsUp } from "lucide-react";
import CardAuditDetail from "../../../admin/CardAuditDetail";
import { fetchData, updateData } from "../../../../../utils/api";
import Invoice from "./Invoice";
import BelanjaModal from "./BelanjaModal";
import AnalisaHargaPasar from "./AnalisaHargaPasar";
import Laporan from "../Laporan";
import SuratTugas from "../SuratTugas";

const AuditBarjas = ({ dtp, kembali }) => {
  const audit = dtp?.audit;
  const [animate, setAnimate] = useState(false);
  const [data, setData] = useState(dtp?.audit);
  const getDatas = () => {
    fetchData(`/spi/audit_detail?audit_id=${dtp.audit_id}`, {
      setLoading: setAnimate,
      onSuccess: (res) => setData(res.data || []),
      onError: (err) =>
        setError(err?.detail || "Terjadi kesalahan saat fetch data!"),
    });
  };

    const user_level = dtp?.level



  useEffect(() => {
    if (dtp?.audit_id) getDatas();
  }, [dtp]);

  const ketuaSelesai = () => {
    updateData(`/spi/audit_status_store?audit_id=${dtp.audit_id}&status_id=4`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log(res);
        getDatas();
      },
      onError: (err) =>
        setError(err?.detail || "Terjadi kesalahan saat fetch data!"),
    });
  };

  const [mod, setMod] = useState("surtug");
  return (
    <div className="flex flex-col gap-4">
      {/* AuditBarjas {dtp?.audit_id} */}
      <h2 className="text_h1">Audit Barang dan Jasa</h2>
      <CardAuditDetail audit={data} />
      <div className="flex items-center justify-between gap-4 w-full">
          <div className="flex items-center gap-4">
            <ActionButton
              onClick={() => kembali()}
              icon={ArrowLeftIcon}
              label="Kembali List"
              color="red"
            />
            <ActionButton
              onClick={() => setMod("surtug")}
              icon={Eye}
              label="Surat Tugas"
              color={`${mod == "surtug" ? `red` : `green`}`}
            />
            <ActionButton
              onClick={() => setMod("invoice")}
              icon={Eye}
              label="Invoice Belanja Modal"
              color={`${mod == "invoice" ? `red` : `green`}`}
            />
            <ActionButton
              onClick={() => setMod("belanja")}
              icon={Eye}
              label="Belanja Modal & Analisa"
              color={`${mod == "belanja" ? `red` : `green`}`}
            />
            <ActionButton
              onClick={() => setMod("laporan")}
              icon={Eye}
              label="Laporan Audit"
              color={`${mod == "laporan" ? `red` : `green`}`}
            />
            {/* <ActionButton
              onClick={() => setMod("hargapasar")}
              icon={Eye}
              label="Analisa Harga Pasar"
              color={`${mod == "hargapasar" ? `red` : `green`}`}
            /> */}
          </div>
          {user_level === 'ketua' && 
          
              <div>
                {data?.status_id <=3 ?  
                    <ActionButton
                      onClick={() => ketuaSelesai()}
                      icon={ThumbsUp}
                      label="Ketua Selesai Laporan"
                      color="red"
                    />
                    :
                    <ActionButton
                      // onClick={() => ketuaSelesai()}
                      icon={ThumbsUp}
                      label=" Laporan Terkirim"
                      color="green"
                    />
                  }

              </div>
          }
      </div>

      {mod === 'surtug' && <SuratTugas data={dtp} />}
      {mod === 'laporan' && <Laporan data={data} />}
      {mod === 'invoice' && <Invoice data={data} />}
      {mod === 'belanja' && <BelanjaModal data={data} />}
      {/* {mod === 'hargapasar' && <AnalisaHargaPasar data={data} />} */}

      
      
    </div>
  );
};

export default AuditBarjas;
