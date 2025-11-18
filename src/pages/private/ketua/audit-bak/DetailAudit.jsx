import { useEffect, useState } from "react";

import { fetchData, userDetail } from "../../../../utils/api";
import SuratTugas from "./SuratTugas";
import SPIChatAudit from "../../SPIChatAudit";
import { ButtonMod } from "../../../../components/ButtonComp";
import Disposisi from "./detail/Disposisi";
import KasOpname from "./KasOpname";
import BeritaAcara from "./BeritaAcara";
import BarangHabisPakai from "./BarangHabisPakai";
import Auditor from "../../admin/audit/detail/Auditor";
const DetailAudit = ({ dtp }) => {
  const [data, setData] = useState("");
  const [animate, setAnimate] = useState(false);
  const [rld, setRld] = useState(false);
  const reload = () => setRld(!rld);

  const user = userDetail;

  const tipeaudit = dtp?.tipe_audit;

  const getData = () => {
    fetchData(`/adm/audit_detail?audit_id=${dtp?.id}`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        setData(res?.data || "");
      },
      onError: (err) => {
        console.log("err", err);
      },
    });
  };

  useEffect(() => {
    getData();
  }, [dtp, rld]);

  const [mod, setMod] = useState("surtug");
  const changeMod = (md) => {
    setMod(md);
  };

  const [smod, setSmod] = useState('disposisi')

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-2 md:gap-4">
        <div className="w-full md:w-9/12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-end gap-2">
              <ButtonMod
                title="Surat Tugas"
                mod={mod}
                selected="surtug"
                onClick={() => changeMod("surtug")}
              />
              <ButtonMod
                title="Berita Acara"
                mod={mod}
                selected="ba"
                onClick={() => changeMod("ba")}
              />
              <ButtonMod
                title="Data Opname"
                mod={mod}
                selected="data"
                onClick={() => changeMod("data")}
              />
            </div>

            {mod === "surtug" && <SuratTugas dtp={dtp} />}
            {mod === "ba" && <BeritaAcara data={dtp} />}

            {mod === "data" &&
              (tipeaudit == "stock" ? (
                <BarangHabisPakai audit={dtp} />
              ) : (
                <KasOpname data={dtp} />
              ))}
          </div>
        </div>
        <div className="w-full md:w-3/12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <button className={`${smod == 'disposisi' ? `bg-red-500` : `bg-purple-500`} text-xs text-white px-3 py-2 rounded-md`} onClick={()=>setSmod('disposisi')}>Disposisi</button>
              <button className={`${smod == 'auditor' ? `bg-red-500` : `bg-purple-500`} text-xs text-white px-3 py-2 rounded-md`} onClick={()=>setSmod('auditor')}>Auditor</button>
            </div>
            {smod == 'disposisi' && 
            <Disposisi data={data} reload={reload} user={user} />
            }
            {smod == 'auditor' && 
      <Auditor dtp={dtp} />
            }
            <SPIChatAudit data={data} />
          </div>
        </div>
      </div>

      {/* {mod === 'chat' && 
        <SuratTugas dtp={dtp} />
        } */}

      {/* <Disposisi data={data} reload={reload} /> */}
    </div>
  );
};

export default DetailAudit;
