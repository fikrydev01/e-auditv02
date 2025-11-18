// components/DokumenPendukung.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DokumenPendukung = ({ dokumen = [], onDelete, onUpload, apiUrl }) => {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (file) {
      onUpload(file);
      setFile(null);
      setShowModal(false);
    }
  };

  return (
    <div className="section-body">
      <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
        Dokumen Pendukung
      </h3>

      {Array.isArray(dokumen) && dokumen.length > 0 ? (
        <ul className="space-y-2">
          {dokumen.map((doc, index) => (
            <li
              key={doc.id || index}
              className="flex items-center justify-between p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 shadow-sm"
            >
              <span className="text-sm text-gray-700 dark:text-gray-200 truncate max-w-[200px]">
                {doc.path?.split("/").pop() || `Dokumen ${index + 1}`}
              </span>
              <div className="flex gap-2">
                <a
                  href={`${apiUrl}/${doc?.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-xs rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800"
                >
                  Download
                </a>
                <button
                  onClick={() => onDelete(doc)}
                  className="px-3 py-1 text-xs rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800"
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Tidak ada dokumen pendukung yang diunggah.
        </p>
      )}

      {/* Tombol tambah dokumen */}
      <div className="mt-4">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 text-sm rounded-lg bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800"
        >
          + Tambah Dokumen
        </button>
      </div>

      {/* Modal Upload */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
                Upload Dokumen
              </h4>

              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full mb-4 text-sm text-gray-700 dark:text-gray-200 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-blue-100 dark:file:bg-blue-900 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-200 dark:hover:file:bg-blue-800"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Batal
                </button>
                <button
                  onClick={handleUpload}
                  disabled={!file}
                  className="px-4 py-2 text-sm rounded-lg bg-green-500 text-white hover:bg-green-600 disabled:opacity-50"
                >
                  Simpan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DokumenPendukung;
