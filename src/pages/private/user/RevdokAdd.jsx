import React, { useState } from "react";
import { postData } from "../../../utils/api";
import { ButtonKembaliDashboard, ButtonSubmit } from "../../../components/ButtonComp";
import { UINJKTUNIT } from "../../../utils/spi";

const RevdokAdd = () => {
  const [input, setInput] = useState({});
  const [animate, setAnimate] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData("/usr/revdok_store", input, {
      setLoading: setAnimate,
      requireConfirm: false,
      onSuccess: (res) => {
        console.log("Success!", res);
      },
      onError: (err) => {
        console.log("err", err);
      },
    });
  };

  return (
    <div className="section-body">
    <div className="flex flex-col gap-4">
    <ButtonKembaliDashboard />
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Form Permohonan Reviu Dokumen
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Nomor Surat */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 dark:text-gray-300 font-medium">
            Nomor Surat Permohonan UNIT*
          </label>
          <input
            name="nosur"
            value={input?.nosur || ""}
            onChange={handleChange}
            required
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Kategori */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 dark:text-gray-300 font-medium">
            Kategori *
          </label>
          <select
            name="kategori"
            value={input?.kategori || ""}
            onChange={handleChange}
            required
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Pilih</option>
            <option value="lhr">Laporan Hasil Reviu LHR</option>
            <option value="pl">Penugasan Lainnya</option>
          </select>
        </div>

        {/* Surat URL */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 dark:text-gray-300 font-medium">
            Surat URL *
          </label>
          <input
            name="surat_url"
            value={input?.surat_url || ""}
            onChange={handleChange}
            required
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <small className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Link URL Surat Permohonan yang sudah diupload di Google Drive / ONE Drive, dan pastikan bisa diakses publik
          </small>
        </div>

        {/* Dokumen URL */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 dark:text-gray-300 font-medium">
            Dokumen URL *
          </label>
          <input
            name="dokumen_url"
            value={input?.dokumen_url || ""}
            onChange={handleChange}
            required
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <small className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Link URL Dokumen Permohonan yang sudah diupload di Google Drive / ONE Drive, dan pastikan bisa diakses publik
          </small>
        </div>

        {/* Pemilik */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 dark:text-gray-300 font-medium">
            Pemilik *
          </label>

           <select
                        id="pemilik"
                        name="pemilik"
                        onChange={handleChange}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-sm uppercase dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 outline-none"
                      >
                        <option value="">Pilih Unit</option>
                        {UINJKTUNIT.map((item, i) => (
                          <option key={i} value={item.kode}>
                            {item.unit}
                          </option>
                        ))}
                      </select>
          {/* <input
            name="pemilik"
            value={input?.pemilik || ""}
            onChange={handleChange}
            required
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          /> */}
        </div>

        {/* Catatan Tugas */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 dark:text-gray-300 font-medium">
            Catatan Tambahan Sebagai Detail Tugas *
          </label>
          <textarea
            rows={5}
            name="tugas"
            value={input?.tugas || ""}
            onChange={handleChange}
            required
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <ButtonSubmit animate={animate} />
      </form>
    </div>

    </div>
  );
};

export default RevdokAdd;
