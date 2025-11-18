import React, { useState } from 'react'
import Laporan from './bhp/Laporan'
import DataBhp from './bhp/DataBhp'
import BeritaAcara from './bhp/BeritaAcara'

const BarangHabisPakai = ({audit}) => {
  const [mod, setMod] = useState('laporan')
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-end gap-4'>
        <button className='bg-purple-500 text-xs text-white px-3 py-1 rounded-md' onClick={()=>setMod('laporan')}>01. Form Laporan</button>
        <button className='bg-purple-500 text-xs text-white px-3 py-1 rounded-md' onClick={()=>setMod('data')}>02. Data Barang</button>
        <button className='bg-purple-500 text-xs text-white px-3 py-1 rounded-md' onClick={()=>setMod('ba')}>03. Berita Acata</button>
      </div>
        {mod === 'laporan' && 
        <Laporan audit={audit} />
      }
      {mod === 'data' && 
        <DataBhp audit={audit} />
      }
      {mod === 'ba' && 
        <BeritaAcara audit={audit} />
      }
    </div>
  )
}

export default BarangHabisPakai