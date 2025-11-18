import React, { useState } from 'react'
import { ButtonKembali, ButtonSubmit } from '../../../../components/ButtonComp'
import { postData } from '../../../../utils/api'

const AddRevdok = ({kembali}) => {
  const [input, setInput] = useState({})
  const [animate, setAnimate] = useState(false)

  const handleChange = (e) => {
    e.preventDefault()
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    postData('/spi/revdok_store', input, {
      setLoading: setAnimate,
      requireConfirm: false,
      onSuccess: (res) => {
        console.log("Success!", res);
      },
      onError: (err) => {
        console.log("err", err)
      }
    });
  }

  return (
    <div className='flex flex-col gap-4'>
        <div>

      <ButtonKembali onClick={kembali} />
        </div>
    <div className="section-body flex flex-col bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 
                    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-lg transition-all">
      
      <h1 className="text-2xl font-bold mb-6 text-gray-700 dark:text-gray-200">
        FORM SPI MANUAL REVIEW DOKUMEN
      </h1>


      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        
        {/* Nomor Surat */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">Nomor Surat *</label>
          <input
            className="form_input rounded-xl border border-pink-200 dark:border-gray-700 bg-white dark:bg-gray-800
                       px-3 py-2 focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-600 transition-all"
            name="nosur"
            value={input?.nosur || ""}
            required
            onChange={handleChange}
          />
        </div>

        {/* Kategori */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">Kategori *</label>
          <select
            className="form_input rounded-xl border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-800
                       px-3 py-2 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 transition-all"
            name="kategori"
            value={input?.kategori || ""}
            required
            onChange={handleChange}
          >
            <option value="">Pilih</option>
            <option value="lhr">Laporan Hasil Reviu LHR</option>
            <option value="pl">Penugasan Lainnya PL</option>
            {/* <option value="nominal">Nominal</option>
            <option value="non-nominal">Non Nominal</option> */}
          </select>
        </div>

        {/* Surat URL */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">Surat URL *</label>
          <input
            className="form_input rounded-xl border border-purple-200 dark:border-gray-700 bg-white dark:bg-gray-800
                       px-3 py-2 focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-600 transition-all"
            name="surat_url"
            required
            value={input?.surat_url || ""}
            onChange={handleChange}
          />
          <small className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Link URL Surat Permohonan yang sudah diupload di Google Drive
          </small>
        </div>

        {/* Dokumen URL */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">Dokumen URL *</label>
          <input
            className="form_input rounded-xl border border-green-200 dark:border-gray-700 bg-white dark:bg-gray-800
                       px-3 py-2 focus:ring-2 focus:ring-green-300 dark:focus:ring-green-600 transition-all"
            name="dokumen_url"
            required
            value={input?.dokumen_url || ""}
            onChange={handleChange}
          />
          <small className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Link URL Dokumen yang sudah diupload di Google Drive
          </small>
        </div>

        {/* Pemilik */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">Pemilik *</label>
          <input
            className="form_input rounded-xl border border-yellow-200 dark:border-gray-700 bg-white dark:bg-gray-800
                       px-3 py-2 focus:ring-2 focus:ring-yellow-300 dark:focus:ring-yellow-600 transition-all"
            name="pemilik"
            required
            value={input?.pemilik || ""}
            onChange={handleChange}
          />
        </div>

        {/* Catatan Tugas */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">Catatan Tugas *</label>
          <textarea
            rows="5"
            className="form_input rounded-xl border border-indigo-200 dark:border-gray-700 bg-white dark:bg-gray-800
                       px-3 py-2 focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600 transition-all"
            name="tugas"
            required
            value={input?.tugas || ""}
            onChange={handleChange}
          />
        </div>

        {/* Button */}
        <div className="mt-4">
          <ButtonSubmit animate={animate} />
        </div>
      </form>
    </div>

    </div>
  )
}

export default AddRevdok
