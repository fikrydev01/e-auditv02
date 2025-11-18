import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { APP_MAIN_URL, fetchData } from "../../utils/api";
import { FORMAT_DATE_IND } from "../../constant/data";
import KopSurat from "../../components/KopSurat";
import QrcodeComp from "../../components/QrcodeComp";
import { PrinterCheckIcon } from "lucide-react";

const PrintSurtug = () => {
  const [datas, setDatas] = useState([]);
  const [searchParams] = useSearchParams();
  const uuid = searchParams.get("uuid");
  // SIstem tte jika true tampilan qrcode
  const stte = searchParams.get("stte");

  console.log("uuid", uuid);

  let path = APP_MAIN_URL + `/val/surat/surtug?uuid=${uuid || ""}`;

  const getDatas = () => {
    fetchData(`/val/surtug?uuid=${uuid}`, {
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

  // 🔑 Cetak dengan nama file custom
  const handlePrint = () => {
    const oldTitle = document.title;
    document.title = `SPI_surat_tugas_${uuid}_${datas?.created_at}`;
    window.print();
    document.title = oldTitle;
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Tombol Print di atas halaman */}
      <div className="flex justify-center mb-4 no-print pt-12">
        <button
          onClick={handlePrint}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition no-print flex items-center text-xs"
        >
          <PrinterCheckIcon /> &nbsp; Cetak Surat Tugas
        </button>
      </div>

      {/* Kontainer Surat */}
      <div className=" bg-white mx-auto p-8 max-w-3xl">
        {/* Kop Surat */}
        <div className="">
          <KopSurat />
        </div>

        {/* Judul */}
        <div className="text-center flex flex-col mt-4 mb-1">
          <h2 className="text-[14pt] font-bold underline uppercase">
            Surat Tugas
          </h2>
          <p className="mt-1 text-[11pt]">Nomor: {datas?.nosur}</p>
        </div>

        {/* Isi Surat */}
        {/* <div className="text-justify text-[11pt] leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: datas?.body }} />
        </div> */}

        <div className="w-full overflow-x-auto">
          <div
            className="
      text-[6pt] text-justify text-gray-800
      leading-relaxed
      whitespace-pre-wrap break-words
    "
            dangerouslySetInnerHTML={{
              __html: datas?.body?.replace(/width:\s*\d+px;/g, "") || "",
            }}
          />
        </div>

        {/* Tanda Tangan */}
        <div className="flex justify-end mt-12">
          <div className="text-center">
            <p className="text-[10pt]">
              Jakarta, {FORMAT_DATE_IND(datas?.created_at) || ""}
            </p>
            <p className="mb-1 text-[10pt] font-semibold">
              Kepala Satuan Pengawasan Internal
            </p>

            {/* QRCode */}
              {stte == 'true' ?
            <div className="flex flex-col items-center justify-center mt-4 mb-4">
              <QrcodeComp path={path} size={80} />
            </div>
              :
              <span className="mt-10 mb-10 ml-4 flex items-start justify-start">^</span>
              }

            <p className="font-bold underline mt-2 text-[10pt]">
              {datas?.ketua_ttd_name}
            </p>
            <p className="text-[10pt]">NIP. {datas?.ketua_ttd_nip}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintSurtug;
