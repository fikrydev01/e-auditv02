import React, { useRef, useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { useReactToPrint } from "react-to-print";
import { APP_MAIN_URL, fetchData } from "../../utils/api";
import { FORMAT_DATE_IND } from "../../constant/data";
import QrcodeComp from "../../components/QrcodeComp";
import { Printer } from "lucide-react";

const SuratPrintPage = () => {
  const printRef = useRef();
  
  const [datas, setDatas] = useState([]);
  const [searchParams] = useSearchParams();
  const uuid = searchParams.get("uuid");
  const [animate, setAnimate] = useState(false);
  
  let path = APP_MAIN_URL + `/val/surat/revdok?uuid=${uuid || ""}`;
  
  const handlePrint = useReactToPrint({
    documentTitle: `SPI_surat_reviu_dokumen_${uuid}_${datas?.created_at}`,
    removeAfterPrint: true,
    contentRef: printRef,
  });
  const getDatas = async () => {
    setAnimate(true);
    await fetchData(`/val/surat_revdok?uuid=${uuid}`)
      .then((res) => {
        setDatas(res?.data);
        setAnimate(false);
      })
      .catch((err) => {
        setAnimate(false);
        console.log("eerr", err.response.data.detail);
      });
  };

  useEffect(() => {
    getDatas();
  }, [uuid]);



  const KopSurat = () => {
    return (
      <div className="flex items-center border-b-[2.5px] border-black pb-[0.3cm] mb-[0.7cm] mr-[1.4cm] ml=[1.4cm]">
        {/* Logo */}
        <div className="flex-shrink-0 mr-[0.8cm]">
          <img
            src="/assets/images/logo-uinjkt.png"
            alt="Logo UIN"
            className="w-[2.8cm] h-[2.8cm] object-contain"
          />
        </div>

        {/* Teks */}
        <div className="w-full text-center leading-tight">
          <h1 className="text-[11pt] font-bold uppercase">
            Kementerian Agama Republik Indonesia
          </h1>
          <h2 className="text-[9.5pt] font-bold uppercase">
            Universitas Islam Negeri
          </h2>
          <h2 className="text-[9.5pt] font-bold uppercase">
            Syarif Hidayatullah Jakarta
          </h2>
          <p className="text-[7.5pt] mt-1">
            Jalan Ir. H. Juanda Nomor 95 Ciputat 15412 Indonesia
          </p>
          <p className="text-[9.5pt]">
            Telepon (62-21) 7401925; Website:{" "}
            <span className="italic">www.uinjkt.ac.id</span>; E-mail:{" "}
            <span className="italic">tu.umum@apps.uinjkt.ac.id</span>
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between mb-6 no-print">
        <h1 className="text-2xl font-bold">Preview Surat</h1>
        <button
          onClick={() => handlePrint()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center w-fit gap-2"
        >
          <Printer size={16} />
          Print Surat
        </button>
      </div>

      {/* Area yang akan diprint */}
      <div
        ref={printRef}
        // className="bg-white shadow-lg rounded-xl p-10 mx-auto w-[210mm] min-h-[297mm] print:shadow-none print:rounded-none print:p-0"
        className="print-container w-full max-w-3xl mx-auto bg-white  text-[14pt] leading-relaxed p-[1cm] print:p-0"
      >
        <div>
  <KopSurat />
          <div className="mt-4 text-[11pt] mb-8 ml-[1.6cm] mr-[1.6cm]">
            <div className="flex items-center justify-between">
              <p>Nomor: {datas?.nosur}</p>
              <p>Jakarta: {FORMAT_DATE_IND(datas?.tgl_surat)}</p>
            </div>
            <p>Lampiran: {datas?.lampiran}</p>
            <p>Perihal: {datas?.perihal}</p>
          </div>

          <div
            className="hugerte-content prose max-w-none mr-[1.6cm] ml-[1.6cm]"
            dangerouslySetInnerHTML={{ __html: datas?.body }}
          />

               {/* <div className="flex flex-col">
          <div className="flex justify-end mr-[2cm]">
            <div className="text-center">
              <p className="text-[10pt]">
                Jakarta, {FORMAT_DATE_IND(datas?.tgl_surat) || ""}
              </p>
               <p className="font-semibold">
                    Kepala Satuan Pengawasan Internal
                  </p>
                  <div className="flex flex-col items-center justify-center mt-4 mb-4">
                    <QrcodeComp path={path} size={80} />
                  </div>
                  <p className="font-semibold underline">
                    {datas?.ketua_ttd_name}
                  </p>
                  <p>NIP. {datas?.ketua_ttd_nip}</p>
            </div>
          </div>
        </div> */}

             <div className="flex flex-col">
          <div className="flex justify-end mt-12 mr-[2cm]">
            <div className="text-center">
              <p className="text-[10pt]">
                Jakarta, {FORMAT_DATE_IND(datas?.tgl_surat) || ""}
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
                    {datas?.pembuat_ttd_name}
                  </p>
                </td>
                <td className="w-1/2 text-center">
                  <p className="font-semibold">Sekretaris</p>
                  <div className="flex flex-col items-center justify-center mt-4 mb-4">
                    {/* <QrcodeComp path={path} size={80} /> */}
                  </div>
                  <p className="font-semibold underline">
                    {datas?.sekretaris_ttd_name}
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
                    {datas?.ketua_ttd_name}
                  </p>
                  <p>NIP. {datas?.ketua_ttd_nip}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </div>
  );
};

export default SuratPrintPage;
