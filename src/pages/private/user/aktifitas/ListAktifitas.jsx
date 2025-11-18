import {useEffect, useState} from 'react'
import { fetchData } from '../../../../utils/api'

const ListAktifitas = () => {
  const [datas, setDatas] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [animate, setAnimate] = useState(false)
  const [rld, setRld] = useState(false)
  const [err, setErr] = useState("")


  const getDatas = () => {
    fetchData(`/usr/konslap_list`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log("Success!", res);
        setDatas(res?.data || []);
      },
      onError: (err) => {
        setErr(err?.detail || "Something went wrong!");
      },
    });
  };
  useEffect(() => {
    getDatas();
  }, []);

  console.log("datas", datas)

  return (
    <div className='section-body'>ListAktifitas</div>
  )
}

export default ListAktifitas