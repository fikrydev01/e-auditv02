import {useEffect, useState } from 'react'
import SuratTugas from './detail/SuratTugas'
import Disposisi from './detail/Disposisi'
import { fetchData } from '../../../../utils/api'
import Auditor from './detail/Auditor'
import { ButtonKembali } from '../../../../components/ButtonComp'
import CardAlurAudit from '../CardAlurAudit'

const DetailAudit = ({kembali, dtp}) => {
    const [data, setData] = useState("")
    const [animate, setAnimate] = useState(false);
    const [rld, setRld] = useState(false)
    const reload = () => setRld(!rld)
    const getData = () => {
    fetchData(`/adm/audit_detail?audit_id=${dtp?.id}`, {
      setLoading: setAnimate,
      onSuccess: (res) => {

        setData(res?.data|| "")
      },
      onError: (err) => {
        console.log("err", err);
      },
    });
  };
  
    useEffect(() => {
      getData()
    },[dtp, rld])

    const [mod, setMod] = useState('disposisi')
  return (
    <div className='flex flex-col gap-4'>

      <ButtonKembali onClick={kembali} />
        <CardAlurAudit />
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='w-full md:w-8/12'>
            <div className='flex flex-col'>
        <SuratTugas dtp={dtp} />

              
            </div>
          </div>
          <div className='w-full md:w-4/12'>
            <div className='flex flex-col gap-4'>

                 <div className="flex items-center gap-2">
              <button className={`${mod == 'disposisi' ? `bg-red-500` : `bg-purple-500`} text-xs text-white px-3 py-2 rounded-md`} onClick={()=>setMod('disposisi')}>Disposisi</button>
              <button className={`${mod == 'auditor' ? `bg-red-500` : `bg-purple-500`} text-xs text-white px-3 py-2 rounded-md`} onClick={()=>setMod('auditor')}>Auditor</button>
            </div>
            {mod === 'disposisi' && 
        <Disposisi data={data} reload={reload} />
            }
            {mod === 'auditor' && 
        <Auditor dtp={dtp} />
            }
              </div>
          
          </div>
        </div>

    </div>
  )
}

export default DetailAudit