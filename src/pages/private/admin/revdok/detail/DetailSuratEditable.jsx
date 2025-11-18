import React, { useState } from "react";
import { FileText, User, Calendar, CheckCircle } from "lucide-react";

const DetailSuratEditable = ({ revdok, onSave }) => {
  const [editData, setEditData] = useState(revdok);
  const [editingField, setEditingField] = useState(null);

  useState(() => {
    setEditData(revdok)
  },[revdok])

  const handleChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (field) => {
    setEditingField(null);
    if (onSave) onSave(editData);
  };

  const renderEditableField = (field, label, icon, color, type = "text") => (
    <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border">
      {icon && React.cloneElement(icon, { className: `w-5 h-5 ${color}` })}
      <div className="flex-1">
        <p className="text-sm text-gray-500">{label}</p>
        {editingField === field ? (
          <div className="flex items-center gap-2 mt-1">
            <input
              type={type}
              className="border rounded px-2 py-1 w-full text-sm"
              value={editData[field] || ""}
              onChange={(e) => handleChange(field, e.target.value)}
            />
            <button
              onClick={() => handleSave(field)}
              className="px-2 py-1 text-xs bg-green-500 text-white rounded"
            >
              Simpan
            </button>
            <button
              onClick={() => setEditingField(null)}
              className="px-2 py-1 text-xs bg-gray-300 text-gray-800 rounded"
            >
              Batal
            </button>
          </div>
        ) : (
          <p
            className="font-semibold text-gray-800 cursor-pointer hover:underline"
            onClick={() => setEditingField(field)}
          >
            {editData[field] || "-"}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Kiri */}
      <div className="flex flex-col gap-4">
        {renderEditableField("nosur", "Nomor Surat", <FileText />, "text-pink-500")}
        {renderEditableField("pemilik", "Pemilik", <User />, "text-blue-500")}
        {renderEditableField("created_at", "Dibuat", <Calendar />, "text-green-500", "date")}
        {editData?.batas_waktu &&
          renderEditableField("batas_waktu", "Batas Waktu", <Calendar />, "text-red-500", "date")}
      </div>

      {/* Kanan */}
      <div className="flex flex-col gap-4">
        {renderEditableField("kategori", "Kategori")}
        {renderEditableField("tugas", "Tugas")}
        <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border">
          <CheckCircle className="w-5 h-5 text-purple-500" />
          <div className="flex-1">
            <p className="text-sm text-gray-500">Status</p>
            {editingField === "status" ? (
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  className="border rounded px-2 py-1 w-full text-sm"
                  value={editData.status || ""}
                  onChange={(e) => handleChange("status", e.target.value)}
                />
                <button
                  onClick={() => handleSave("status")}
                  className="px-2 py-1 text-xs bg-green-500 text-white rounded"
                >
                  Simpan
                </button>
                <button
                  onClick={() => setEditingField(null)}
                  className="px-2 py-1 text-xs bg-gray-300 text-gray-800 rounded"
                >
                  Batal
                </button>
              </div>
            ) : (
              <p
                className="font-semibold capitalize text-gray-800 cursor-pointer hover:underline"
                onClick={() => setEditingField("status")}
              >
                {editData?.status} (ID: {editData?.status_id})
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSuratEditable;
