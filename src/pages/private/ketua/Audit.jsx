import { useState, useEffect } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import AddAuditForm from "./audit/AddAuditForm";
import { fetchData } from "../../../utils/api";
import { ActionButton } from "../../../components/ButtonComp";
import { Eye, PlusCircle } from "lucide-react";
import { FILTER_AUDIT } from "../../../constant/data";
import CardAlurAudit from "../admin/CardAlurAudit";
import Detail from "./audit/Detail";

const Audit = () => {
  const [dtp, setDtp] = useState("");
  const [animate, setAnimate] = useState(false);
  const [rld, setRld] = useState(false);
  const [datas, setDatas] = useState([]);

  const getDatas = () => {
    fetchData(`/adm/audit`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        setDatas(res.data || []);
      },
      onError: (err) => {
        console.log("Err", err);
      },
    });
  };
  useEffect(() => {
    getDatas();
  }, []);

  const pilih = (id) => {
    let n = datas && datas.find((it) => it.id == id);
    setDtp(n);
    setMod('detail')
  };
  const kembali = () => {
    setMod("list");
    getDatas();
  };

  const addAudit = () => {
    setMod("add");
  };
  const [mod, setMod] = useState("list");
  return (
    <section className="section-container">
      <Breadcrumbs title="Audit" />
      {mod == "list" && (
        <div className="flex items-center justify-end">
          <ActionButton
            onClick={() => addAudit()}
            icon={PlusCircle}
            label="Tambah Audit"
            color="green"
          />
        </div>
      )}
      {mod == "add" && <AddAuditForm kembali={kembali} />}
      {mod == "list" && (
        <div className="flex flex-col gap-4">
          <CardAlurAudit />
          <div className="section-body flex flex-col">
            <h2 className="text_h2">LIST AUDIT SPI</h2>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-200">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs text-gray-100 uppercase bg-gradient-to-r from-blue-500 to-blue-600">
                  <tr>
                    <th className="px-6 py-3">Aksi</th>
                    <th className="px-6 py-3">Jenis</th>
                    <th className="px-6 py-3">TGL.Audit</th>
                    <th className="px-6 py-3">Unit</th>
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
                              label="Detail"
                              color="blue"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 uppercase">{r.tipe_audit}</td>
                        <td className="px-6 py-4">{r.tgl_audit}</td>
                        <td className="px-6 py-4">{r.kode_unit}</td>
                        <td className="px-6 py-4">{r.periode_audit}</td>
                        <td className="px-6 py-4">{r.catatan}</td>
                        <td className="px-6 py-4 uppercase">
                          {/* {r.status_id}. */}
                          {FILTER_AUDIT(r?.status_id)?.spi_status || "-"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {mod == 'detail' && 
      <Detail dtp={dtp} kembali={kembali} />
      }
    </section>
  );
};

export default Audit;
