import React from 'react'
import AuditAO from './detail/AuditAO'
import AuditBarjas from './detail/AuditBarjas'
import AuditPdtt from './detail/AuditPdtt'

const Detail = ({dtp, kembali}) => {
  const tipe_audit = dtp?.tipe_audit
  // console.log("dtp", dtp)
  
  return (
    <>
    {tipe_audit === 'ao' && <AuditAO dtp={dtp} kembali={kembali}/>}
    {tipe_audit === 'barjas' && <AuditBarjas dtp={dtp} kembali={kembali} />}
    {tipe_audit === 'pdtt' && <AuditPdtt dtp={dtp} kembali={kembali}/>}
    </>
  )
}

export default Detail