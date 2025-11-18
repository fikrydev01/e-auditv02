import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import AuditAdd from "./audit/AuditAdd";
import { deleteData, fetchData } from "../../../utils/api";
import { ActionButton } from "../../../components/ButtonComp";
import { Eye, PencilIcon, Trash2Icon } from "lucide-react";
import DetailAudit from "./audit/DetailAudit";
import { FILTER_ALUR_AUDIT_SPI, FILTER_UNIT, FORMAT_DATE_IND } from "../../../constant/data";
import CardAlurAudit from "./CardAlurAudit";

const Audit = () => {
  const [dtp, setDtp] = useState("");
  const [err, setErr] = useState("");
  const [animate, setAnimate] = useState(false);
  const [rld, setRld] = useState(false);
  const [datas, setDatas] = useState([]);
  const [mod, setMod] = useState('list')

  const getDatas = () => {
    fetchData(`/adm/audit`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log("Success!", res);
        setDatas(res.data || []);
      },
      onError: (err) => {
        setErr(err?.detail || "Something went wrong!");
      },
    });
  };
  useEffect(() => {
    getDatas();
  }, [rld, mod]);

  const pilih = (id) => {
    let n = datas && datas.find((it) => it.id == id);
    setDtp(n);
    setMod('detail')
  };


  const add = () => {
    setMod('add')
    setDtp('')
  }
  const kembali = () => {
    setDtp('')
    setMod('list')
  }

  const edit = (id) => {
    setMod('add')
    pilih(id)
  } 
  const hapus = async (id) => {
   deleteData(`/adm/audit_destroy?id=${id}`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log("Success!", res);
        // setDatas(res.data || []);
            getDatas();

      },
      onError: (err) => {
        setErr(err?.detail || "Something went wrong!");
      },
    });
  } 
  return (
    <section className="section-container">
      <Breadcrumbs title="Audit" />

      {mod == 'list' && 
      
        <div className="flex flex-col gap-4">
          <CardAlurAudit />
          <div className="section-body">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-200">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs text-gray-100 uppercase bg-gradient-to-r from-blue-500 to-blue-600">
                  <tr>
                    <th className="px-6 py-3">Aksi</th>
                    <th className="px-6 py-3">Jenis</th>
                    <th className="px-6 py-3">Unit</th>
                    <th className="px-6 py-3">Tgl. Mulai Audit</th>
                    <th className="px-6 py-3">Tgl. Akhir Audit</th>
                    <th className="px-6 py-3">Periode Audit</th>
                    <th className="px-6 py-3">Catatan</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {datas &&
                    datas.map((r, i) => (
                      <tr
                        key={i}
                        className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          <div className="flex gap-2">
                            <ActionButton
                              onClick={() => pilih(r.id)}
                              icon={Eye}
                              label=""
                              color="blue"
                            />
                            {/* <ActionButton
                              onClick={() => edit(r.id)}
                              icon={PencilIcon}
                              label=""
                              color="green"
                            /> */}
                            <ActionButton
                              onClick={() => hapus(r.id)}
                              icon={Trash2Icon}
                              label=""
                              color="red"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 uppercase">{r.tipe_audit}</td>
                        <td className="px-6 py-4">{r?.kode_unit}</td>
                               <td className="px-6 py-4">{FORMAT_DATE_IND(r.tgl_audit)}</td>
                                                <td className="px-6 py-4">{FORMAT_DATE_IND(r.tgl_audit_akhir)}</td>
                        <td className="px-6 py-4">{r.periode_audit}</td>
                        <td className="px-6 py-4">{r.catatan}</td>
                        <td className="px-6 py-4 capitalize">{FILTER_ALUR_AUDIT_SPI(r.status_id)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      }
      {mod == 'detail' && 
      
        <DetailAudit dtp={dtp} kembali={kembali}/>
      }
    </section>
  );
};

export default Audit;
