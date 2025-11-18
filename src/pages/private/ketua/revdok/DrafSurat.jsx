import React from "react";
import KopSurat from "../../../../components/KopSurat";
import { FORMAT_DATE_IND } from "../../../../constant/data";
import QrcodeComp from "../../../../components/QrcodeComp";
import { APP_MAIN_URL } from "../../../../utils/api";

const DrafSurat = ({ data, revdok }) => {
  let path = APP_MAIN_URL + `/val/surat/revdok?uuid=${data?.uuid || ""}`;
  console.log("revdok", revdok);
  return (
    <div>
      <div className="w-full mx-auto bg-white shadow-lg p-12 border border-gray-300">
        {/* Kop Surat */}
        <KopSurat />
        <div className="mb-6 text-sm">
          {/* <p><span className="font-semibold">Nomor</span>: {datas?.nosur || "......"}</p> */}

          <p>
            <span className="font-semibold">Nomor </span>: {data?.nosur || "-"}
          </p>
          <p>
            <span className="font-semibold">Lampiran. </span>:{" "}
            {data?.lampiran || "-"}
          </p>
          <p>
            <span className="font-semibold">Perihal </span>: {data?.perihal}
          </p>
        </div>

        {/* Isi Surat */}
        <div className="text-justify text-[15px] leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: data?.body }} />
        </div>
        {revdok?.status_id >= 7 ? (
          
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
        ) : (
          <p className="text-center text-sm font-semibold text-red-500">
            Menunggu Validasi / TTD KETUA
          </p>
        )}
      </div>
    </div>
  );
};

export default DrafSurat;
