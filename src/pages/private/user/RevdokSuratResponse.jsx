import React, { useState, useEffect } from 'react'




import KopSurat from '../../../components/KopSurat'
import { FORMAT_DATE_IND } from '../../../constant/data'
import QrcodeComp from '../../../components/QrcodeComp'
import { APP_MAIN_URL, fetchData } from '../../../utils/api'

const RevdokSuratResponse = ({dtp}) => {
    const [data, setData] = useState('')
    const [animate, setAnimate] = useState(false)
    const [err, setErr] = useState('')
        const path = APP_MAIN_URL + `/val/surat/revdok?uuid=${data?.uuid || ""}`

        const getDatas = () => {
            fetchData(`/usr/revdok/surat_response?id=${dtp?.id}`, {
              setLoading: setAnimate,
              onSuccess: (res) => {
                console.log("Success! surata", res);
                // setDatas(res?.data || "");
                setData(res?.data || '')
              },
              onError: (err) => {
                setErr(err?.detail || "Something went wrong!");
              },
            });
          };
          useEffect(() => {
            getDatas();
          }, [dtp]);

          console.log("data fet", data)
  return (
    <div>
        
         <div className="w-full mx-auto bg-white shadow-lg p-12 border border-gray-300">
      {/* Kop Surat */}
    <KopSurat />

      <div className="mb-6 text-sm">
          {/* <p><span className="font-semibold">Nomor</span>: {datas?.nosur || "......"}</p> */}

          <p className='flex gap-2'>
            <span className="font-semibold">Nomor{" "}{" "}</span>: {data?.nosur || "-"}
          </p>
          <p>
            <span className="font-semibold">Lampiran </span>:{" "}
            {data?.lampiran || "-"}
          </p>
          <p>
            <span className="font-semibold">Perihal </span>: {data?.perihal}
          </p>
        </div>

      {/* Isi Surat */}
      {/* <div className="text-justify text-[15px] leading-relaxed">
                              <div dangerouslySetInnerHTML={{ __html: data?.body }} />

      </div> */}
      <div className='flex flex-col ml-[1.5cm]'>

{/* <div
  className="
    text-[15px] text-justify 
    max-w-full overflow-x-auto break-words
    whitespace-pre-wrap
  "
>
  <div
    className="
      text-gray-800 dark:text-gray-100 
      [&>p]:m-0 [&>p]:p-0 
      [&>div]:m-0 [&>div]:p-0 
      [&>span]:m-0 [&>span]:p-0 
      [&>br]:leading-none 
      [&>table]:w-full [&>table]:border-collapse 
      [&>th]:border [&>td]:border [&>td]:p-1 
      [&>th]:bg-gray-100 dark:[&_th]:bg-gray-800
    "
    dangerouslySetInnerHTML={{ __html: data?.body }}
  />
</div> */}
<div className="w-full overflow-x-auto ">
  <div
    className="
      text-[11pt] text-justify text-gray-800 dark:text-gray-100 
      border-0 shadow-none outline-none
      whitespace-pre-wrap break-words

      /* spacing antar paragraf & list */
 
      /* === TABLE TANPA GARIS === */
      [&_table]:w-full 
      [&_table]:max-w-full 
      [&_table]:border-collapse 
      [&_table]:block 
      [&_table]:overflow-x-auto
      [&_table]:text-[14px]

 

      /* Tata letak teks tabel */
      [&_thead_th]:text-left 
      [&_thead_th]:font-semibold
      [&_thead_th]:p-2
      [&_tbody_td]:p-2 
      [&_tbody_td]:align-top 
      [&_tbody_td]:text-justify 

    
    "
    dangerouslySetInnerHTML={{
      __html: data?.body?.replace(/width:\s*\d+px;/g, '') || '',
    }}
  />
</div>




{/* <div className="flex justify-end mt-12">
  <div className="text-center">
    <p className="mb-1">Jakarta, {FORMAT_DATE_IND(data?.tgl_surat) || ""}</p>
    <p className="mb-1 font-semibold">Kepala Satuan Pengawasan Internal</p>

    <div className="flex flex-col items-center justify-center mt-4 mb-4">
      <QrcodeComp path={path} />
    </div>
    <p className="font-bold underline mt-2">{data?.ttd_name}</p>
    <p>NIP. {data?.ttd_nip}</p>
  </div>
</div> */}

<div className="flex flex-col">
          <div className="flex justify-end mt-12 mr-[2cm]">
            <div className="text-center">
              <p className="text-[10pt]">
                Jakarta, {FORMAT_DATE_IND(data?.tgl_surat) || ""}
              </p>
            </div>
          </div>
          <table className="w-full text-[10pt] mt-8 border-collapse">
            <tbody>
              {/* Baris atas: Pembuat dan Sekretaris */}
              <tr className="align-top">
                <td className="w-1/2 text-center">
                  <p className="font-semibold">Pembuat</p>
                  <div className="flex flex-col items-center justify-center mt-4 mb-4">
                    {/* <QrcodeComp path={path} size={80} /> */}
                  </div>
                  <p className="font-semibold underline">
                    {data?.pembuat_ttd_name}
                  </p>
                </td>
                <td className="w-1/2 text-center">
                  <p className="font-semibold">Sekretaris</p>
                  <div className="flex flex-col items-center justify-center mt-4 mb-4">
                    {/* <QrcodeComp path={path} size={80} /> */}
                  </div>
                  <p className="font-semibold underline">
                    {data?.sekretaris_ttd_name}
                  </p>
                </td>
              </tr>

              {/* Spasi antar baris tanda tangan */}
              <tr>
                <td colSpan="2" className="h-10"></td>
              </tr>

              {/* Baris bawah: Kepala SPI di tengah */}
              <tr>
                <td colSpan="2" className="text-center">
                  <p className="font-semibold">
                    Kepala Satuan Pengawasan Internal
                  </p>
                  {/* <div className="h-16"></div> */}
                  <div className="flex flex-col items-center justify-center mt-4 mb-4">
                    <QrcodeComp path={path} size={80} />
                  </div>
                  <p className="font-semibold underline">
                    {data?.ketua_ttd_name}
                  </p>
                  <p>NIP. {data?.ketua_ttd_nip}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
    </div>
  )
}

export default RevdokSuratResponse