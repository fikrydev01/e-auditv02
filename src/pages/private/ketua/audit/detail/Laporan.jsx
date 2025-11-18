import {useState, useEffect, useCallback} from 'react'
import { fetchData } from '../../../../../utils/api'
import CatatanKerja from '../CatatanKerja'

const Laporan = ({data}) => {
  const [content, setContent] = useState('')
  const [animate, setAnimate] = useState(false)
    const getData = () => {
      if (!data?.id) return;
      fetchData(`/spi/audit_laporan?audit_id=${data.id}`, {
        setLoading: setAnimate,
        onSuccess: (res) => {
          const laporan = res?.data || {};
          setContent(laporan.body || "");
          console.log("Res lap", res)
          // setInput((prev) => ({ ...prev, body: laporan.body || "" }));
        },
        onError: (err) => {
          console.error("Gagal memuat laporan:", err);
        },
      });
    }
    useEffect(() => {
      getData()
    },[data])
  return (
    <div className='flex flex-col lg:flex-row gap-4'>
      <div className='w-full lg:w-9/12'>
        <div className='flex flex-col section-body'>
          <h1 className='text_h1'>Full Laporan Ketua Auditor</h1>

          <div className="w-full overflow-x-auto max-h-[50vh]">
      <div
        className="
          text-[15px] text-justify text-gray-800 
          leading-relaxed
          whitespace-pre-wrap break-words

          /* spacing paragraf dan list */
          [&>p]:m-0 [&>p]:mb-2
          [&>ul]:pl-6 [&>ol]:pl-6
          [&>li]:mb-1

          /* === TABLE ELEGAN === */
          [&_table]:w-full 
          [&_table]:max-w-full 
          [&_table]:border-collapse 
          [&_table]:my-3 
          [&_table]:rounded-md 
          [&_table]:overflow-hidden 
          [&_table]:shadow-sm 
          [&_table]:block 
          [&_table]:overflow-x-auto

          /* hanya border luar */
          // [&_table]:border 
          // [&_table]:border-gray-400

          /* header */
          [&_thead_tr]:bg-gray-100 
          dark:[&_thead_tr]:bg-gray-800
          [&_thead_th]:border-b 
          [&_thead_th]:border-gray-400 
          [&_thead_th]:font-semibold
          [&_thead_th]:text-left
          [&_thead_th]:p-2
          [&_thead_th]:text-sm

          /* isi tabel */
          [&_tbody_td]:p-2 
          [&_tbody_td]:align-top 
          [&_tbody_td]:text-justify 
          [&_tbody_td]:text-[14px]

          /* garis antar baris lembut */
          [&_tbody_tr]:border-b 
          [&_tbody_tr]:border-gray-300 
          last:[&_tbody_tr]:border-0
        "
        dangerouslySetInnerHTML={{
          __html: content?.replace(/width:\s*\d+px;/g, '') || '',
        }}
      />
    </div>
        </div>
      </div>
      <div className='w-full lg:w-3/12'>
      <div className='section-body'>

        <CatatanKerja audit={data} />
      </div>
      </div>

    </div>
  )
}

export default Laporan