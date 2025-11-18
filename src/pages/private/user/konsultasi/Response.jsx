import React from 'react'
import KopSurat from '../../../../components/KopSurat'
import { FORMAT_DATE_IND } from '../../../../constant/data'
import QrcodeComp from '../../../../components/QrcodeComp'
import { APP_MAIN_URL } from '../../../../utils/api'

const Response = ({datas}) => {
    // /val/surat/konsultasi
    const path = APP_MAIN_URL + `/val/surat/konsultasi?uuid=${datas?.uuid}`
  return (
    <div className='section-body text-dark'>
        <h3 className='text_h3'>Respon SPI</h3>
        <KopSurat />

      <div dangerouslySetInnerHTML={{ __html: datas?.spi_response?.jawaban }} />

      
     
     <div className="flex justify-end mt-12">
  <div className="text-center">
    <p className="mb-1">Jakarta, {FORMAT_DATE_IND(datas?.spi_response?.created_at) || ""}</p>
    <p className="mb-1 font-semibold">Anggota SPI</p>

    {/* QRCode di tengah area tanda tangan */}
    <div className="flex flex-col items-center justify-center mt-4 mb-4">
  
      <QrcodeComp path={path} />
    </div>

    {/* Nama & NIP */}
    <p className="font-bold underline mt-2">{datas?.spi_response?.name}</p>
  </div>
</div>
    </div>
  )
}

export default Response