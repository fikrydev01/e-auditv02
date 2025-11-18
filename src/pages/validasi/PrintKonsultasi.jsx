import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { APP_MAIN_URL, fetchData } from "../../utils/api";
import { FORMAT_DATE_IND } from "../../constant/data";
import KopSurat from "../../components/KopSurat";
import QrcodeComp from "../../components/QrcodeComp";
import { PrinterCheckIcon } from "lucide-react";

const PrintKonsultasi = () => {
  const [datas, setDatas] = useState([]);
  const [searchParams] = useSearchParams();
  const uuid = searchParams.get("uuid");

  let path = APP_MAIN_URL + `/val/surat/konsultasi?uuid=${uuid || ""}`;

  const getDatas = () => {
    fetchData(`/val/konsultasi?uuid=${uuid}`, {
      onSuccess: (res) => {
        setDatas(res?.data || []);
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };

  useEffect(() => {
    getDatas();
  }, [uuid]);
console.log("print", datas)
  // 🔑 Cetak dengan nama file custom
  const handlePrint = () => {
    const oldTitle = document.title;
    document.title = `SPI_surat_tugas_${uuid}_${datas?.created_at}`;
    window.print();
    document.title = oldTitle;
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 py-4">
      {/* Tombol Print di atas halaman */}
      <div className="flex justify-center mb-4 no-print">
        <button
          onClick={handlePrint}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition no-print flex items-center gap-3"
        >
<PrinterCheckIcon /> Print
        </button>
      </div>

      {/* Kontainer Surat */}
      <div className="print-container w-[21cm] min-h-[29.7cm] bg-white mx-auto p-[2.5cm] text-justify text-[12pt] leading-relaxed print:w-[21cm] print:min-h-[29.7cm] print:p-[2.5cm]">

        {/* Kop Surat */}
        <KopSurat />



        {/* Isi Surat */}
        <div className="text-justify text-[11pt] leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: datas?.jawaban }} />
        </div>

        {/* Tanda Tangan */}
        <div className="flex justify-end mt-12">
          <div className="text-center">
            <p className="text-[10pt]">Jakarta, {FORMAT_DATE_IND(datas?.created_at) || ""}</p>
            <p className="mb-1 text-[10pt] font-semibold">Satuan Pengawasan Internal</p>

            {/* QRCode */}
            <div className="flex flex-col items-center justify-center mt-4 mb-4">
              <QrcodeComp path={path} size={80} />
            </div>

            <p className="font-bold underline mt-2 text-[10pt]">{datas?.name}</p>
            {/* <p className="text-[10pt]">NIP. {datas?.ttd_nip}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintKonsultasi;
