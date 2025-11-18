import React, { useState, useEffect } from "react";
import { ActionButton } from "../../../../../components/ButtonComp";
import CardAuditDetail from "../../../admin/CardAuditDetail";
import SPIChatAudit from "../../../SPIChatAudit";
import { ArrowLeftIcon, PlusCircle } from "lucide-react";
import Disposisi from "../../../admin/audit/detail/Disposisi";
import { fetchData } from "../../../../../utils/api";
import Surtug from "./Surtug";
import Auditor from "../../../admin/audit/detail/Auditor";
import Laporan from "./Laporan";
import KkCash from "./auditpdtt/KkCash";
import KkStock from "./auditpdtt/KkStock";
import Invoice from "./auditpdtt/Invoice";
import BelanjaModal from "./auditpdtt/BelanjaModal";




const AuditPdtt = ({ dtp, kembali }) => {
  const [mod, setMod] = useState("auditor");
  const [data, setData] = useState("");
  const [animate, setAnimate] = useState(false);

  const getData = () => {
    fetchData(`/adm/audit_detail?audit_id=${dtp?.id}`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        setData(res?.data || "");
      },
      onError: (err) => {
        console.log("err", err);
      },
    });
  };

  useEffect(() => {
    getData();
  }, [dtp]);
  const reload = () => {
    getData();
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text_h3">Detail Audit PDTT</h1>

      <CardAuditDetail audit={data} />

      <div className="flex items-center gap-2">
        <ActionButton
          onClick={() => kembali()}
          icon={ArrowLeftIcon}
          label="Kembali List"
          color="red"
        />
        <ActionButton
          onClick={() => setMod("auditor")}
          icon={PlusCircle}
          label="Penugasan Auditor"
          color={`${mod === "auditor" ? `red` : `green`}`}
        />
        <ActionButton
          onClick={() => setMod("disposisi")}
          icon={PlusCircle}
          label="Disposisi"
          color={`${mod === "disposisi" ? `red` : `green`}`}
        />
        <ActionButton
          onClick={() => setMod("surtug")}
          icon={PlusCircle}
          label="Surat Tugas"
          color={`${mod === "surtug" ? `red` : `green`}`}
        />
        <ActionButton
          onClick={() => setMod("laporan")}
          icon={PlusCircle}
          label="Laporan & Catatan Kerja"
          color={`${mod === "laporan" ? `red` : `green`}`}
        />
        <ActionButton
          onClick={() => setMod("kkcash")}
          icon={PlusCircle}
          label="K.K Cash"
          color={`${mod === "kkcash" ? `red` : `green`}`}
        />
        <ActionButton
          onClick={() => setMod("kkstock")}
          icon={PlusCircle}
          label="K.K Stock"
          color={`${mod === "kkstock" ? `red` : `green`}`}
        />
        <ActionButton
          onClick={() => setMod("invoice")}
          icon={PlusCircle}
          label="Invoice"
          color={`${mod === "invoice" ? `red` : `green`}`}
        />
        <ActionButton
          onClick={() => setMod("belanjamodal")}
          icon={PlusCircle}
          label="Belanja Modal"
          color={`${mod === "belanjamodal" ? `red` : `green`}`}
        />
      </div>
      {mod == "disposisi" && <Disposisi data={data} reload={reload} />}
      {mod == 'surtug' && 
        <Surtug data={dtp} />
    }
        {mod == 'auditor' && 
        <Auditor dtp={dtp} />
    }
        {mod == 'laporan' &&
        <Laporan data={dtp}  />
    } 
    {mod == 'kkcash' &&
        <KkCash data={dtp}  />
    }
    {mod == 'kkstock' && 
        <KkStock data={dtp} />
    }
    {mod == 'invoice' && 
        <Invoice data={dtp} />
    }
    {mod == 'belanjamodal' && 
        <BelanjaModal data={dtp} />
    }

      <SPIChatAudit data={data} />
    </div>
  );
};

export default AuditPdtt;
