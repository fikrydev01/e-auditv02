import { useEffect, useState } from "react";
import { APP_MAIN_URL, fetchData, updateData } from "../../../../utils/api";
import KopSurat from "../../../../components/KopSurat";
import QrcodeComp from "../../../../components/QrcodeComp";
import { FORMAT_DATE_IND } from "../../../../constant/data";
import { ButtonSubmit } from "../../../../components/ButtonComp";
import { Printer, TriangleAlert } from "lucide-react";

const SuratResponse = ({ data }) => {
  const [datas, setDatas] = useState(null);
  const [nosur, setNosur] = useState("");


  console.log("Data", data)

  const [animate, setAnimate] = useState(false);

  let path = APP_MAIN_URL + `/validasi/surat_revdok?uuid=${datas?.uuid || ""}`;

  useEffect(() => {
    fetchData(`/adm/revdok/surat_response?revdok_id=${data?.id}`, {
      onSuccess: (res) => {
        setDatas(res.data);
        setNosur(res?.data?.nosur || "No - Data");
      },
      onError: (err) => {
        console.error(err);
      },
    });
  }, [data]);

  const handleChange = (e) => {
    setNosur(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Kirim ke parent atau API
    updateData(
      `/adm/revdok/surat_response_update_nosur?revdok_id=${data?.id}&nosur=${nosur}`,
      {
        onSuccess: (res) => {
          // console.log("Res", res);
        },
        onError: (err) => {
          console.error(err);
        },
      }
    );
  };
  // const main_url = APP_MAIN_URL

  return (
    <section className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text_h3">Detail Surat Response</h3>
        {data?.status_id >= 7 ? 
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => Alert("dafads")}
          href={`${APP_MAIN_URL}/val/surat/revdok?uuid=${data?.uuid}`}
          className="bg-emerald-600 px-3 py-2 w-fit rounded-md text-xs flex items-center gap-2 text-white z-[9999] relative pointer-events-auto"
          style={{ position: "", zIndex: 9999 }}
        >
          Print <Printer className="text-white w-3 h-3" />
        </a>
        
        : <span className="bg-red-500 text-sm px-3 py-1 rounded-md text-white flex items-center gap-2">
          <TriangleAlert />
          Print Blocked</span>}
      </div>

      <div className="w-full mx-auto bg-white shadow-lg p-10 rounded-lg leading-relaxed text-gray-800">
        {/* Header */}
        <KopSurat />

        {/* Info Surat */}
        <div className="mb-6 text-sm">
          {/* <p><span className="font-semibold">Nomor</span>: {datas?.nosur || "......"}</p> */}
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex items-center gap-2"
          >
            <span className="font-semibold">Nomor</span>:
            <input
              className="bg-slate-100 px-3 py-1 rounded"
              name="nosur"
              value={nosur}
              onChange={handleChange}
            />
            <ButtonSubmit animate={animate} />
          </form>
          <p>
            <span className="font-semibold">Lampiran</span>:{" "}
            {datas?.lampiran || "-"}
          </p>
          <p>
            <span className="font-semibold">Perihal</span>: {datas?.perihal}
          </p>
        </div>

        {/* Isi Surat */}
        <div
          className="text-sm mb-6"
          dangerouslySetInnerHTML={{ __html: datas?.body }}
        />

        {/* Tembusan (opsional) */}
        {datas?.tembusan && (
          <div className="text-sm mb-6">
            <p className="font-semibold">Tembusan:</p>
            <p>{datas?.tembusan}</p>
          </div>
        )}

        {/* Tanda Tangan */}

      {data?.status_id >=7 ? 
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
      
      : 
   <div className="flex justify-center mt-12">
        <p className="text-sm font-semibold text-red-600">TTD Menunggu validasi Ketua SPI</p>
    </div>
      }
     
      </div>
    </section>
  );
};

export default SuratResponse;
