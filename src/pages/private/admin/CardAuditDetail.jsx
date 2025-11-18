import React, { useState } from "react";
import {
  FileText,
  Calendar,
  Building2,
  ClipboardList,
  Info,
  Tag,
  Archive,
  Edit,
  Save,
  X,
} from "lucide-react";
import { FILTER_ALUR_AUDIT_SPI, FORMAT_DATE_IND } from "../../../constant/data";
import { postData } from "../../../utils/api";
import { CURRENT_YEAR, FILTER_UINJKTUNIT, UINJKTUNIT } from "../../../utils/spi";

export default function AuditDetailEditableCard({ audit, onSave }) {
  const [animate, setAnimate] = useState(false);

  const role = "ketua";
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: audit?.id,
    periode_audit: audit?.periode_audit || "",
    tipe_audit: audit?.tipe_audit || "",
    tgl_audit: audit?.tgl_audit || "",
    tgl_audit_akhir: audit?.tgl_audit_akhir || "",
    kode_unit: audit?.kode_unit || "",
    status_id: audit?.status_id || "",
    catatan: audit?.catatan || "",
  });

  const tipeAuditLabel = {
    ao: "Audit Operasional (AO)",
    barjas: "Audit Barang dan Jasa (Barjas)",
    pdtt: "Pemeriksaan Dengan Tujuan Tertentu (PDTT)",
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (onSave) onSave(formData);
    await postData("/spi/audit_detail_update", formData, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        // getDatas();
      },
      onError: (err) => {
        console.log("err", err);
        // setErr(err?.response?.data?.detail || "Terjadi kesalahan saat menyimpan data!");
      },
    });

    setIsEditing(false);
  };

  const data = [
    {
      label: "Periode Audit",
      value: formData.periode_audit,
      icon: <FileText className="w-4 h-4 text-blue-500" />,
      field: "periode_audit",
    },
    {
      label: "Tipe Audit",
      value: <span className="uppercase">{formData.tipe_audit}</span>,
      icon: <ClipboardList className="w-4 h-4 text-green-500" />,
      field: "tipe_audit",
    },
    {
      label: "Tgl. Mulai - Akhir Audit",
      value: `${FORMAT_DATE_IND(formData.tgl_audit)} s/d ${FORMAT_DATE_IND(
        formData.tgl_audit_akhir
      )}`,
      icon: <Calendar className="w-4 h-4 text-purple-500" />,
      field: ["tgl_audit", "tgl_audit_akhir"],
    },
    {
      label: "Kode Unit",
      value: <span>{FILTER_UINJKTUNIT(formData.kode_unit)}</span>,
      icon: <Building2 className="w-4 h-4 text-indigo-500" />,
      field: "kode_unit",
    },
    {
      label: "Status Audit",
      value: FILTER_ALUR_AUDIT_SPI(formData.status_id),
      icon: <Tag className="w-4 h-4 text-orange-500" />,
      field: "status_id",
    },
    {
      label: "Catatan",
      value: formData.catatan,
      icon: <Info className="w-4 h-4 text-gray-500" />,
      field: "catatan",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-5">
      <div className="flex justify-between items-center mb-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-100">
          <Archive className="w-5 h-5 text-blue-600" />
          Detail Audit
        </h3>
        {role === "ketua" && (
          <div>
            {isEditing ? (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-800"
                >
                  <Save className="w-4 h-4" /> Simpan
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-800"
                >
                  <X className="w-4 h-4" /> Batal
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                <Edit className="w-4 h-4" /> Edit
              </button>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-2">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-start gap-2 text-sm">
            <div className="flex-shrink-0 mt-[2px]">{item.icon}</div>
            <div className="flex flex-col w-full">
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                {item.label}
              </p>
              {isEditing ? (
                Array.isArray(item.field) ? (
                  <div className="flex gap-1">
                    <input
                      type="date"
                      value={formData.tgl_audit}
                      onChange={(e) =>
                        handleChange("tgl_audit", e.target.value)
                      }
                      className="border rounded px-2 py-1 text-sm w-full"
                    />
                    <span className="self-center">s/d</span>
                    <input
                      type="date"
                      value={formData.tgl_audit_akhir}
                      onChange={(e) =>
                        handleChange("tgl_audit_akhir", e.target.value)
                      }
                      className="border rounded px-2 py-1 text-sm w-full"
                    />
                  </div>
                ) : item.field === "tipe_audit" ? (
                  <span className="uppercase">{formData.tipe_audit}</span>
                ) : item.field === "status_id" ? (
                  <span className="uppercase">{FILTER_ALUR_AUDIT_SPI(formData.status_id)}</span>
                ) : item.field === "periode_audit" ? (
                  <select
                    value={formData?.periode_audit || ""}
                    onChange={(e) =>
                      handleChange("periode_audit", e.target.value)
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
                )  : item.field === "kode_unit" ? (
                  <select
                    value={formData?.kode_unit || ""}
                    onChange={(e) =>
                      handleChange("kode_unit", e.target.value)
                    }
                    className="w-full px-2 py-1 border rounded-lg text-sm"
                  >
                    {/* Placeholder */}
                    <option value="" disabled>
                      -- Pilih UNIT --
                    </option>
                    {UINJKTUNIT.map((r,  i) => (

                    <option key={i} value={r.kode}>
                      {r.unit}
                    </option>
                    ))}
                   
                  </select>
                ) : (
                  <input
                    type="text"
                    value={formData[item.field]}
                    onChange={(e) => handleChange(item.field, e.target.value)}
                    className="border rounded px-2 py-1 text-sm w-full"
                  />
                )
              ) : (
                <p
                  className={`text-gray-800 dark:text-gray-100 font-medium leading-tight ${
                    item?.label === "Status Audit" ? "uppercase" : ""
                  }`}
                >
                  {item.value}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
