import { ArrowLeftIcon, PlusCircle } from 'lucide-react'
import React, { useState } from 'react'
import { ActionButton } from '../../../../../components/ButtonComp'
import Disposisi from './Disposisi'
import Auditor from './Auditor'
import SuratTugas from './SuratTugas'
import Laporan from './Laporan'

import BelanjaModal from './barjas/BelanjaModal'
import Invoice from './barjas/Invoice'

const AuditBarjas = ({data, kembali, reload}) => {
    const [mod, setMod] = useState('disposisi')


  return (
    <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-2'>
                  <ActionButton
            onClick={() => kembali()}
            icon={ArrowLeftIcon}
            label="Kembali List"
            color="red"
          />
                  <ActionButton
            onClick={() => setMod('disposisi')}
            icon={PlusCircle}
            label="Disposisi"
            color={`${mod=== 'disposisi' ? `red` : `green`}`}
          />
                  <ActionButton
            onClick={() => setMod('surtug')}
            icon={PlusCircle}
            label="Surat Tugas & Auditor"
            color={`${mod=== 'surtug' ? `red` : `green`}`}
          />
                  <ActionButton
            onClick={() => setMod('laporan')}
            icon={PlusCircle}
            label="Full Laporan"
            color={`${mod=== 'laporan' ? `red` : `green`}`}
          />
                  <ActionButton
            onClick={() => setMod('invoice')}
            icon={PlusCircle}
            label="Invoice"
            color={`${mod=== 'invoice' ? `red` : `green`}`}
          />
                  <ActionButton
            onClick={() => setMod('belanjamodal')}
            icon={PlusCircle}
            label="Belanja Modal"
            color={`${mod=== 'belanjamodal' ? `red` : `green`}`}
          />
                  {/* <ActionButton
            onClick={() => setMod('kkcash')}
            icon={PlusCircle}
            label="K.K Cash"
            color="green"
          /> */}
        </div>


                  
        {mod == 'invoice' &&  <Invoice data={data} />}
        {mod == 'belanjamodal' &&  <BelanjaModal data={data} />}
        {mod == 'laporan' &&  <Laporan data={data} />}

        {mod == 'disposisi' &&  <Disposisi data={data} reload={reload}/>}
        {mod == 'surtug' &&  

        <div className='flex flex-col md:flex-row gap-4 items-start'>
            <div className='w-full md:w-9/12'>
        <SuratTugas dtp={data} />
            </div>
            <div className='w-full md:w-3/12'>
        <Auditor dtp={data} />
            </div>
        </div>
        }

       
    </div>
  )
}

export default AuditBarjas