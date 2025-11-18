import {useState, useEffect} from 'react'
import { fetchData } from '../../../../utils/api';
import CardAuditDetail from '../CardAuditDetail';
import AuditAo from './detail/AuditAo';
import AuditBarjas from './detail/AuditBarjas';
import AuditPdtt from './detail/AuditPdtt';

const DetailAudit = ({dtp, kembali}) => {
      const [data, setData] = useState(dtp)
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

      const tipe_audit = dtp?.tipe_audit
      const handleUpdate = async (formData) => {

      }

  return (
    <div className='flex flex-col gap-4'>

      <CardAuditDetail audit={data} />
      {tipe_audit === 'ao' && 
      <AuditAo data={data} reload={reload} kembali={kembali} />
    }
    {tipe_audit === 'barjas' && 
    <AuditBarjas data={data} reload={reload} kembali={kembali}/>
}
    {tipe_audit === 'pdtt' && 
    <AuditPdtt data={data} reload={reload} kembali={kembali}/>
}

      </div>
  )
}

export default DetailAudit