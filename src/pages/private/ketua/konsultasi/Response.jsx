import React from 'react'
import KopSurat from '../../../../components/KopSurat'
import { FORMAT_DATE_IND } from '../../../../constant/data'
import QrcodeComp from '../../../../components/QrcodeComp'
import { APP_MAIN_URL } from '../../../../utils/api'

const Response = ({data}) => {
  let path = APP_MAIN_URL + `/val/surat/konsultasi?uuid=${data?.uuid || ""}`;

  return (
    <div className='section-body flex flex-col'>
      <KopSurat />

      <div dangerouslySetInnerHTML={{ __html: data?.res?.jawaban }} />

      
     
     <div className="flex justify-end mt-12">
  <div className="text-center">
    <p className="mb-1">Jakarta, {FORMAT_DATE_IND(data?.res?.created_at) || ""}</p>
    <p className="mb-1 font-semibold">Anggota SPI</p>

    {/* QRCode di tengah area tanda tangan */}
    <div className="flex flex-col items-center justify-center mt-4 mb-4">
  
      <QrcodeComp path={path} />
    </div>

    {/* Nama & NIP */}
    <p className="font-bold underline mt-2">{data?.res?.name}</p>
  </div>
</div>
     </div>
  )
}

export default Response