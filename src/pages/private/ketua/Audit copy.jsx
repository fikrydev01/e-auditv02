import React, { useState, useEffect } from 'react'
import Breadcrumbs from '../../../components/Breadcrumbs'

import { fetchData } from '../../../utils/api'
import { ActionButton } from '../../../components/ButtonComp'
import { Eye } from 'lucide-react'
import DetailAudit from './audit/DetailAudit'
import CardAlurAudit from '../admin/CardAlurAudit'
import { FILTER_AUDIT } from '../../../constant/data'


const Audit = () => {
  const [dtp, setDtp] = useState('')
  const [err, setErr] = useState("");
    const [animate, setAnimate] = useState(false);
    const [rld, setRld] = useState(false);
    const [datas, setDatas] = useState([]);


    const getDatas = () => {
      fetchData(`/adm/audit`, {
        setLoading: setAnimate,
        onSuccess: (res) => {
          setDatas(res.data || []);
        },
        onError: (err) => {
          setErr(err?.detail || "Something went wrong!");
        },
      });
    };
    useEffect(() => {
      getDatas();
    }, [rld]);


    const pilih = (id) => {
      let n = datas && datas.find(it => it.id == id)
      setDtp(n)
    }
  return (
        <section className='section-container'>
      <Breadcrumbs title="Audit" />


      {/* <AuditAdd dtp={dtp} /> */}

      {dtp ? <DetailAudit dtp={dtp} /> : 

      <div className='flex flex-col gap-4'>
<CardAlurAudit />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-100 uppercase bg-gradient-to-r from-blue-500 to-blue-600">
            <tr>
              <th className="px-6 py-3">Aksi</th>
              <th className="px-6 py-3">Jenis</th>
              <th className="px-6 py-3">Unit</th>
              <th className="px-6 py-3">Periode Audit</th>
              <th className="px-6 py-3">Catatan</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {datas && datas.map((r, i) => (
              <tr
                key={i}
                className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  <div className="flex gap-2">
                    <ActionButton
                      onClick={() => pilih(r.id)}
                      icon={Eye}
                      label="Detail"
                      color="blue"
                    />
                  </div>
                </td>
                <td className="px-6 py-4">{r.tipe_audit}</td>
                <td className="px-6 py-4">{r.kode_unit}</td>
                <td className="px-6 py-4">{r.periode_audit}</td>
                <td className="px-6 py-4">{r.catatan}</td>
                <td className="px-6 py-4">
                  {r.status_id}.
                    {FILTER_AUDIT(r?.status_id)?.spi_status || '-'}


                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      </div>
      
      }  


      </section>
  )
}

export default Audit