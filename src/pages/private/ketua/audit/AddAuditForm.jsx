import React, { useState } from "react";
import { CURRENT_YEAR, UINJKTUNIT } from "../../../../utils/spi";
import { postData } from "../../../../utils/api";
import { ButtonKembali } from "../../../../components/ButtonComp";

const AddAuditForm = ({ kembali, type_audit }) => {
  const [animate, setAnimate] = useState(false)
  const [formData, setFormData] = useState({
    insid: "",
    periode_audit: "",
    kode_unit: "",
    tipe_audit: type_audit,
    catatan: "",
    status_id: "",
    tgl_audit: "",
    tgl_audit_akhir :"",
  });
// console.log("first", CURRENT_YEAR)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (onSubmit) onSubmit(formData);
  //   console.log("Form submitted:", formData);
  // };
    const handleSubmit = async (e) => {
      e.preventDefault();
      // setErr("");
  
      await postData("/adm/audit_store", formData, {
        setLoading: setAnimate,
        onSuccess: (res) => {
          console.log("Success!", res);
        },
        onError: (err) => {
          console.log("err", err)
          // setErr(err?.response?.data?.detail || "Terjadi kesalahan saat menyimpan data!");
        },
      });
    };

  return (
    <div className="section-body flex justify-center items-center ">
      <div className="w-full  rounded-2xl">
        <ButtonKembali onClick={kembali} />
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 mt-4">
          Tambah Audit
          <span className="uppercase"> {type_audit}</span>
        </h2>
        {type_audit === "pdtt" &&
        
        <div className="bg-blue-100 p-4 rounded-xl mb-4">
          <h3>Note</h3>
          <ul>

            <li>1. Jika tipe audit PDTT, maka wajib memilih UNIT yang akan di audit</li>
            <li>2. Jika tipe audit PDTT, maka tahun pada periode audit akan menjadi primary</li>
          </ul>
        </div>
        }

        <form onSubmit={handleSubmit} className="space-y-5">
 
    {/* Tipe Audit */}
          {/* <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">
              Tipe Audit *
            </label>
            <select
              name="tipe_audit"
              required
              value={formData.tipe_audit}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Pilih Tipe Audit</option>
              <option value="ao">AO (Audit Operasional)</option>
              <option value="barjas">Barjas (Barang & Jasa)</option>
              <option value="pdtt">PDTT (Pemeriksaan Dengan Tujuan Tertentu)</option>
            </select>
          </div> */}
          {/* Periode Audit */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">
              Periode Audit (Current Year) *
            </label>
            <select
              type="text"
              required
              name="periode_audit"
              value={formData.periode_audit}
              onChange={handleChange}
              placeholder="Contoh: 2025-TW1"
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Pilih Periode</option>
              <option value={`${CURRENT_YEAR}-tw1`}>{CURRENT_YEAR} - TW-1</option>
              <option value={`${CURRENT_YEAR}-tw2`}>{CURRENT_YEAR} - TW-2</option>
              <option value={`${CURRENT_YEAR}-tw3`}>{CURRENT_YEAR} - TW-3</option>
              <option value={`${CURRENT_YEAR}-tw4`}>{CURRENT_YEAR} - TW-4</option>
              </select>
          </div>

          {/* Kode Unit */}
          {type_audit =="pdtt" && 
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">
              Kode Unit (KHUSUS PDTT)
            </label>
            <select
              type="text"
              name="kode_unit"
              value={formData.kode_unit}
              onChange={handleChange}
              placeholder="Contoh: UIN-JKT-01"
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Pilih UNIT</option>
              {UINJKTUNIT.map((r, i) =>  (
                <option key={i} value={r.kode}>{r.unit}</option>

              ))}

              </select>
          </div>
          }

      

          {/* Catatan */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">
              Catatan *
            </label>
            <textarea
              name="catatan"
              required
              value={formData.catatan}
              onChange={handleChange}
              placeholder="Tuliskan catatan audit..."
              rows={3}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
          </div>

          {/* Tanggal Audit */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">
              Mulai Tanggal Audit *
            </label>
            <input
              type="date"
              required
              name="tgl_audit"
              value={formData.tgl_audit}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">
              Akhir Tanggal Audit *
            </label>
            <input
              type="date"
              required
              name="tgl_audit_akhir"
              value={formData.tgl_audit_akhir}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition duration-200 shadow-md hover:shadow-lg"
            >
              Simpan Audit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAuditForm;
