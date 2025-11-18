import React, { useEffect, useState } from 'react'
import { fetchData } from '../utils/api'
import { FILTER_ALURKONSLAP_SPI } from '../constant/data';

const KonslapLog = ({ data }) => {
  const [datas, setDatas] = useState([]);
  const [animate, setAnimate] = useState(false);
  const [err, setErr] = useState("");
  const [rld, setRld] = useState(false);

  const getDatas = () => {
    fetchData(`/adm/konslap_log?id=${data?.id}`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log("Success!", res);
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

  return (
    <div className="section-body flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
        Logs Aktivitas
      </h2>

      {err && (
        <div className="p-3 text-sm rounded-lg bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300">
          {err}
        </div>
      )}

      <ul className="flex flex-col gap-3 max-h-[40vh] overflow-y-auto pr-1">
        {datas && datas.map((r, i) => (
          <li
            key={i}
            className="rounded-xl border shadow-sm p-4 
              bg-gradient-to-r from-pink-50 to-blue-50 
              dark:from-slate-800 dark:to-slate-900 dark:border-slate-700 
              transition-colors"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {FILTER_ALURKONSLAP_SPI(r?.status_id)}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {new Date(r.created_at).toLocaleString("id-ID")}
              </span>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">
              <span className="font-semibold">{r?.user?.name}</span>
              <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">
                (status_id: {r.status_id})
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default KonslapLog
