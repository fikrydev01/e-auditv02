import { ArchiveIcon, ArrowLeftIcon, Eye, PlusCircle } from 'lucide-react'
import React, { useState } from 'react'
import { ActionButton } from '../../../../../components/ButtonComp'
import Disposisi from './Disposisi'
import Auditor from './Auditor'
import SuratTugas from './SuratTugas'
import Laporan from './Laporan'
import KkStock from './auditao/KkStock'
import KkCash from './auditao/KkCash'



const AuditAo = ({data, kembali, reload}) => {
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
            icon={ArchiveIcon}
            label="Disposisi"
            color={mod === 'disposisi' ? "blue" : "green"}
          />
                  <ActionButton
            onClick={() => setMod('surtug')}
            icon={ArchiveIcon}
            label="Surat Tugas"
            color={mod === 'surtug' ? "blue" : "green"}
          />
                  <ActionButton
            onClick={() => setMod('laporan')}
            icon={ArchiveIcon}
            label="Full Laporan"
            color={mod === 'laporan' ? "blue" : "green"}
          />
                  <ActionButton
            onClick={() => setMod('kkstock')}
            icon={ArchiveIcon}
            label="K.K Stock"
            color={mod === 'kkstock' ? "blue" : "green"}
          />
                  <ActionButton
            onClick={() => setMod('kkcash')}
            icon={ArchiveIcon}
            label="K.K Cash"
            color={mod === 'kkcash' ? "blue" : "green"}
          />
        </div>
        {mod === 'disposisi' && <Disposisi data={data} reload={reload}/>}
        {mod === 'surtug' && 
        
        <div className='flex flex-col md:flex-row gap-4 items-start'>
            <div className='w-full md:w-9/12'>
        <SuratTugas dtp={data} />
            </div>
            <div className='w-full md:w-3/12'>
        <Auditor dtp={data} />
            </div>
        </div>
        
        }
        {mod === 'laporan' && <Laporan data={data} />}
        {mod === 'kkstock' && <KkStock data={data} />}
        {mod === 'kkcash' && <KkCash data={data} />}
    </div>
  )
}

export default AuditAo