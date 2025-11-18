// components/ListDokumen.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ListDokumen = ({ dokumen = [], onDelete, onUpload, apiUrl }) => {
  const [file, setFile] = useState(null);



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
                  href={`${apiUrl}/api/v1/${doc?.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-xs rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800"
                >
                  Download {doc?.path}
                </a>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Tidak ada dokumen pendukung yang diunggah.
        </p>
      )}
    </div>
  );
};

export default ListDokumen;
