import React from "react";
import { ActionButton, ButtonKembali } from "../../../../components/ButtonComp";
import { Eye } from "lucide-react";
import AuditAo from "./auditao/AuditAo";
import AuditBarjas from "./auditbarjas/AuditBarjas";
import AuditPdtt from "./auditpdtt/AuditPdtt";


const DetailAudit = ({ dtp, kembali }) => {
  const tipe_audit = dtp?.audit?.tipe_audit
  console.log("Data dinins". tipe_audit)
  return (

    <>
      {tipe_audit === 'ao' && <AuditAo dtp={dtp} kembali={kembali}/>}
      {tipe_audit === 'barjas' && <AuditBarjas dtp={dtp} kembali={kembali}/>}
      {tipe_audit === 'pdtt' && <AuditPdtt dtp={dtp} kembali={kembali}/>}
    </>
    
  );
};

export default DetailAudit;
