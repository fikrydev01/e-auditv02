import { useState, useEffect } from "react";
import { APP_MAIN_URL, fetchData } from "../../../../utils/api";
import { FORMAT_DATE_IND } from "../../../../constant/data";
import { QRCodeCanvas } from "qrcode.react";
import KopSurat from "../../../../components/KopSurat";
import QrcodeComp from "../../../../components/QrcodeComp";
import BtnPrintSurtugAudit from "../../../../components/BtnPrintSurtugAudit";

const SuratTugas = ({ data }) => {
  const [animate, setAnimate] = useState(false);
  const [datas, setDatas] = useState([]);

  let path = APP_MAIN_URL + `/val/surat/surtug?uuid=${datas?.uuid || ""}`;

  const getDatas = () => {
    fetchData(`/spi/audit_surtug?audit_id=${data?.audit_id}`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        // console.log("surtuf!", res);
        setDatas(res?.data || []);
      },
      onError: (err) => {
        setErr(err?.detail || "Something went wrong!");
      },
    });
  };
  useEffect(() => {
    getDatas();
  }, [data]);

  // console.log("Data Surat Tugas:", datas);
  return (
    <div>
      {/* <button>Print </button> */}
      <div className="section-container">
        <div className="flex items-center justify-end">
              <div className="flex flex-row gap-2">
          <BtnPrintSurtugAudit surtug={datas} stte={true}/>
          <BtnPrintSurtugAudit surtug={datas} stte={false}/>

          </div>
        </div>
        <div className="w-full mx-auto bg-white shadow-lg p-12 border border-gray-300">
          <KopSurat />

          <div className="text-center my-8">
            <h2 className="text-xl font-bold underline uppercase">Surat Tugas</h2>
            <p className="mt-2">Nomor: {datas?.nosur}</p>
          </div>

          {/* Isi Surat */}
          <div className="text-justify text-[15px] leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: datas?.body }} />
          </div>

          {/* Tanda Tangan */}
          <div className="flex justify-end mt-12">
            <div className="text-center">
              <p className="mb-1">
                Jakarta, {FORMAT_DATE_IND(datas?.created_at) || ""}
              </p>
              <p className="mb-1 font-semibold">
                Kepala Satuan Pengawasan Internal
              </p>

              {/* QRCode di tengah area tanda tangan */}
              <div className="flex flex-col items-center justify-center mt-4 mb-4">
                {/* {path} */}
                <QrcodeComp path={path} />
              </div>

              {/* Nama & NIP */}
              <p className="font-bold underline mt-2">{datas?.ketua_ttd_name}</p>
              <p>NIP. {datas?.ketua_ttd_nip}</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default SuratTugas;
