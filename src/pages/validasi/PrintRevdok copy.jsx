import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { APP_MAIN_URL, fetchData } from "../../utils/api";
import { FORMAT_DATE_IND } from "../../constant/data";
import QrcodeComp from "../../components/QrcodeComp";
import { PrinterCheckIcon } from "lucide-react";

// Komponen KopSurat yang digabungkan
const KopSurat = () => {
  return (
    <div className="flex items-center border-b-[2.5px] border-black pb-[0.3cm] mb-[0.7cm]">
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
        <h1 className="text-[13pt] font-bold uppercase">
          Kementerian Agama Republik Indonesia
        </h1>
        <h2 className="text-[11.5pt] font-bold uppercase">
          Universitas Islam Negeri
        </h2>
        <h2 className="text-[11.5pt] font-bold uppercase">
          Syarif Hidayatullah Jakarta
        </h2>
        <p className="text-[9.5pt] mt-1">
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

const PrintRevdok = () => {
  const [datas, setDatas] = useState([]);
  const [searchParams] = useSearchParams();
  const uuid = searchParams.get("uuid");
  const [animate, setAnimate] = useState(false);

  let path = APP_MAIN_URL + `/val/surat/revdok?uuid=${uuid || ""}`;

  const getDatas = async () => {
    setAnimate(true);
    await fetchData(`/val/surat_revdok?uuid=${uuid}`)
      .then((res) => {
        console.log("resasdfasd", res.data);
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

  const handlePrint = () => {
    const oldTitle = document.title;
    document.title = `SPI_surat_reviu_dokumen_${uuid}_${datas?.created_at}`;
    window.print();
    document.title = oldTitle;
  };

  return (
    <div className="w-full min-h-screen bg-white">
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
      <div className="print-container w-full max-w-3xl mx-auto bg-white text-gray-900 text-[14pt] leading-relaxed">
        {/* Kop Surat */}
        <KopSurat />

        {/* Info Surat */}
        <div className="mt-4 text-[10pt]">
          <div className="flex items-center justify-between">
            <p>Nomor: {datas?.nosur}</p>
            <p>Jakarta: {FORMAT_DATE_IND(datas?.tgl_surat)}</p>
          </div>
          <p>Lampiran: {datas?.lampiran}</p>
          <p>Perihal: {datas?.perihal}</p>
        </div>

        {/* Isi Surat */}
        <div className="text-justify text-[11pt] mt-6">
          <div dangerouslySetInnerHTML={{ __html: datas?.body }} />
        </div>

        {/* Tanda Tangan */}

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
                    <QrcodeComp path={path} size={80} />
                  </div>
                  <p className="font-semibold underline">
                    {datas?.pembuat_ttd_name}
                  </p>
                </td>
                <td className="w-1/2 text-center">
                  <p className="font-semibold">Sekretaris</p>
                  <div className="flex flex-col items-center justify-center mt-4 mb-4">
                    <QrcodeComp path={path} size={80} />
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
  );
};

export default PrintRevdok;
