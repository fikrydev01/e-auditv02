import { useState, useEffect } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import AddAuditForm from "./audit/AddAuditForm";
import { fetchData, postData, userDetail } from "../../../utils/api";
import { ActionButton } from "../../../components/ButtonComp";
import {
  Check,
  Eye,
  PencilIcon,
  PlusCircle,
  Trash2Icon,
  X,
} from "lucide-react";
import { FILTER_AUDIT, FORMAT_DATE_IND } from "../../../constant/data";
import CardAlurAudit from "../admin/CardAlurAudit";
import Detail from "./audit/Detail";
import { CURRENT_YEAR } from "../../../utils/spi";

const AuditBarjas = () => {
  const [dtp, setDtp] = useState("");
  const [animate, setAnimate] = useState(false);
  const [datas, setDatas] = useState([]);
  const [editingId, setEditingId] = useState(null); // id row yg sedang diedit
  const [editValues, setEditValues] = useState({}); // menyimpan nilai sementara saat edit
  const [mod, setMod] = useState("list");
  const type = "barjas";

  const getDatas = () => {
    fetchData(`/adm/audit`, {
      setLoading: setAnimate,
      onSuccess: (res) => setDatas(res.data || []),
      onError: (err) => console.log("Err", err),
    });
  };

  useEffect(() => {
    getDatas();
  }, []);

  const pilih = (id) => {
    const n = datas.find((it) => it.id == id);
    setDtp(n);
    setMod("detail");
  };

  const kembali = () => {
    setMod("list");
    getDatas();
  };

  const addAudit = () => setMod("add");

  const hapus = async (id) => {
    deleteData(`/adm/audit_destroy?id=${id}`, {
      setLoading: setAnimate,
      onSuccess: () => getDatas(),
      onError: (err) => console.log(err),
    });
  };

  // Saat cell diedit, simpan nilai sementara
  const handleEditChange = (e, field) => {
    setEditValues({ ...editValues, [field]: e.target.value });
  };

  // Simpan hasil edit ke server (contoh menggunakan fetchData / api)
  const saveEdit = async (id) => {
    const updated = datas.find((d) => d.id === id);
    const payload = { ...updated, ...editValues };

    console.log("payload", payload);
    // return
    // contoh API call update

    await postData("/adm/audit_store", payload, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        getDatas();
      },
      onError: (err) => {
        console.log("err", err);
        // setErr(err?.response?.data?.detail || "Terjadi kesalahan saat menyimpan data!");
      },
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({});
  };

      const role = userDetail?.role;
  
  return (
    <section className="section-container">
      <Breadcrumbs title="Audit Barjas" />
      {mod == "add" && <AddAuditForm kembali={kembali} type_audit={type} />}
      {mod == "list" && (
        <div className="flex flex-col gap-4">
          <CardAlurAudit />
          {role === "ketua" && mod == "list" && (
                  <div className="flex items-center justify-end">
                  <ActionButton
                    onClick={() => addAudit()}
                    icon={PlusCircle}
                    label="Tambah Audit PDTT"
                    color="green"
                  />
                </div>
              )}
          <div className="section-body flex flex-col">
            <h2 className="text_h2">LIST AUDIT Barang & Jasa SPI</h2>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-200">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs text-gray-100 uppercase bg-gradient-to-r from-blue-500 to-blue-600">
                  <tr>
                    <th className="px-6 py-3">Aksi</th>
                    <th className="px-6 py-3">Jenis</th>
                    <th className="px-6 py-3">Tgl Mulai Audit</th>
                    <th className="px-6 py-3">Tgl Akhir Audit</th>
                    <th className="px-6 py-3">Periode Audit</th>
                    <th className="px-6 py-3">Catatan</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {datas
                    .filter((r) => r.tipe_audit.includes(type))
                    .map((r, i) => {
                      const isEditing = editingId === r.id;
                      return (
                        <tr
                          key={i}
                          className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors"
                        >
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex gap-2">
                            {!isEditing && (
                              <>
                                <ActionButton
                                  onClick={() => pilih(r.id)}
                                  icon={Eye}
                                  label=""
                                  color="blue"
                                />
                                <ActionButton
                                  onClick={() => {
                                    setEditingId(r.id);
                                    setEditValues({
                                      tgl_audit: r.tgl_audit,
                                      tgl_audit_akhir: r.tgl_audit_akhir,
                                      periode_audit: r.periode_audit,
                                      catatan: r.catatan,
                                    });
                                  }}
                                  icon={PencilIcon}
                                  label=""
                                  color="green"
                                />
                                <ActionButton
                                  onClick={() => hapus(r.id)}
                                  icon={Trash2Icon}
                                  label=""
                                  color="red"
                                />
                              </>
                            )}
                            {isEditing && (
                              <>
                                <ActionButton
                                  onClick={() => saveEdit(r.id)}
                                  icon={Check}
                                  label=""
                                  color="green"
                                />
                                <ActionButton
                                  onClick={cancelEdit}
                                  icon={X}
                                  label=""
                                  color="red"
                                />
                              </>
                            )}
                          </td>
                          <td className="px-6 py-4 uppercase">
                            {r.tipe_audit}
                          </td>
                          {/* <td className="px-6 py-4">
                            {FORMAT_DATE_IND(r.tgl_audit)}
                          </td>
                          <td className="px-6 py-4">
                            {FORMAT_DATE_IND(r.tgl_audit_akhir)}
                          </td> */}
                          <td className="px-6 py-4">
                            {isEditing ? (
                              <input
                                type="date"
                                value={editValues?.tgl_audit}
                                onChange={(e) =>
                                  handleEditChange(e, "tgl_audit")
                                }
                                className="w-full px-2 py-1 border rounded-lg text-sm"
                              />
                            ) : (
                              FORMAT_DATE_IND(r.tgl_audit)
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {isEditing ? (
                              <input
                                type="date"
                                value={editValues?.tgl_audit_akhir}
                                onChange={(e) =>
                                  handleEditChange(e, "tgl_audit_akhir")
                                }
                                className="w-full px-2 py-1 border rounded-lg text-sm"
                              />
                            ) : (
                              FORMAT_DATE_IND(r.tgl_audit_akhir)
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {isEditing ? (
                              <select
                                value={editValues?.periode_audit || ""}
                                onChange={(e) =>
                                  handleEditChange(e, "periode_audit")
                                }
                                className="w-full px-2 py-1 border rounded-lg text-sm"
                              >
                                {/* Placeholder */}
                                <option value="" disabled>
                                  -- Pilih Periode Audit --
                                </option>

                                {/* Pilihan TW */}
                                <option value={`${CURRENT_YEAR}-tw1`}>
                                  {CURRENT_YEAR} - TW-1
                                </option>
                                <option value={`${CURRENT_YEAR}-tw2`}>
                                  {CURRENT_YEAR} - TW-2
                                </option>
                                <option value={`${CURRENT_YEAR}-tw3`}>
                                  {CURRENT_YEAR} - TW-3
                                </option>
                                <option value={`${CURRENT_YEAR}-tw4`}>
                                  {CURRENT_YEAR} - TW-4
                                </option>
                              </select>
                            ) : (
                              r.periode_audit
                            )}
                          </td>

                          {/* Editable Catatan */}
                          <td className="px-6 py-4">
                            {isEditing ? (
                              <input
                                type="text"
                                value={editValues.catatan}
                                onChange={(e) => handleEditChange(e, "catatan")}
                                className="w-full px-2 py-1 border rounded-lg text-sm"
                              />
                            ) : (
                              r.catatan
                            )}
                          </td>

                          {/* Editable Status */}
                          <td className="px-6 py-4 uppercase">
                            {FILTER_AUDIT(r.status_id)?.spi_status || "-"}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {mod == "detail" && <Detail dtp={dtp} kembali={kembali} />}
    </section>
  );
};

export default AuditBarjas;
