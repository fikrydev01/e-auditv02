import {useState, useEffect} from 'react'
import { fetchData } from '../../../../utils/api';
import KopSurat from '../../../../components/KopSurat';

const BeritaAcara = ({data}) => {
    const [animate, setAnimate] = useState(false)
    const [content, setContent] = useState('')

    
        const getDatas = () => {
          fetchData(`/spi/audit_ba?audit_id=${data.id}&kode_unit=${data?.kode_unit}`, {
            setLoading: setAnimate,
            onSuccess: (res) => {
            //   console.log("Success content!", res);
              setContent(res.data?.content || null);
            },
            onError: (err) => {
              setErr(err?.detail || "Something went wrong!");
            },
          });
        };
        useEffect(() => {
          getDatas();
        }, [data]);
  return (
    <div className='section-body'>
        <KopSurat />
                  <div dangerouslySetInnerHTML={{ __html: content }} />

    </div>
  )
}

export default BeritaAcara