import React, { useState, useEffect } from "react";
import { ActionButton } from "../../../../../components/ButtonComp";
import { ArrowLeftIcon, Eye, ThumbsUp } from "lucide-react";
import CardAuditDetail from "../../../admin/CardAuditDetail";
import { fetchData, updateData } from "../../../../../utils/api";
import SuratTugas from "../SuratTugas";
import Laporan from "../Laporan";
import KKStock from "./KKStock";
import KKCash from "./KKCash";
import SPIChatAudit from "../../../SPIChatAudit";
import BelanjaModal from "./BelanjaModal";
import Invoice from "./Invoice";

const AuditPdtt = ({ dtp, kembali }) => {

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
  
  useEffect(() => {
    if (dtp?.audit_id) getDatas();
  }, [dtp]);
  const user_level = dtp?.level

  
  const ketuaSelesai = () => {
    updateData(`/spi/audit_status_store?audit_id=${dtp.audit_id}&status_id=4`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log(res)
        getDatas()
      },
      onError: (err) =>
        setError(err?.detail || "Terjadi kesalahan saat fetch data!"),
    });
  };

  const [mod, setMod] = useState('surtug')
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text_h1">Audit AO</h2>

      <CardAuditDetail audit={data} />
      
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">

          <ActionButton
            onClick={() => kembali()}
            icon={ArrowLeftIcon}
            label="Kembali List"
            color="red"
          />
          <ActionButton
            onClick={() => setMod('surtug')}
            icon={Eye}
            label="Surat Tugas"
            color={`${mod == 'surtug' ? `green` : `blue`}`}
          />
          <ActionButton
            onClick={() => setMod('kkcash')}
            icon={Eye}
            label="Kertas Kerja Cash"
            color={`${mod == 'kkcash' ? `green` : `blue`}`}

          />
          <ActionButton
            onClick={() => setMod('kkstock')}
            icon={Eye}
            label="Kertas Kerja Stock"
            color={`${mod == 'kkstock' ? `green` : `blue`}`}
          />
          <ActionButton
            onClick={() => setMod('invoice')}
            icon={Eye}
            label="Inovoice"
            color={`${mod == 'invoice' ? `green` : `blue`}`}
          />
          <ActionButton
            onClick={() => setMod('belanjamodal')}
            icon={Eye}
            label="Belanja Modal & Analisa"
            color={`${mod == 'belanjamodal' ? `green` : `blue`}`}
          />
          <ActionButton
            onClick={() => setMod('laporan')}
            icon={Eye}
            label="Laporan Audit & Catatan"
            color={`${mod == 'laporan' ? `green` : `blue`}`}
          />
        </div>
        {user_level === 'ketua' &&
        
        <>
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
        </>
        }
      </div>
      {mod === 'surtug' &&
      <SuratTugas data={dtp} />
      }
      {mod === 'laporan' &&
      <Laporan data={data} />
      }
      {mod === 'kkcash' &&
      <KKCash data={data} />
      }
      {mod === 'kkstock' &&
      <KKStock data={data} />
      }
      {mod === 'invoice' &&
      <Invoice data={data} />
      }
      {mod === 'belanjamodal' && 
      <BelanjaModal data={data} />  
      }

      <SPIChatAudit data={data}/>
    </div>
  );
};

export default AuditPdtt;
