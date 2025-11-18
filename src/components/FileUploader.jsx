// components/FileUploader.js
import { FilePlus2Icon, Trash2Icon, TrashIcon } from 'lucide-react'
import { useState } from 'react'

const FileUploader = ({ maxFiles = 5, maxSizeMB = 2, onFilesChange }) => {
  const [files, setFiles] = useState([])
  const [error, setError] = useState(null)

  const handleDrop = (e) => {
    e.preventDefault()
    setError(null)

    let droppedFiles = Array.from(e.dataTransfer.files)

    if (droppedFiles.length + files.length > maxFiles) {
      setError(`Maksimal ${maxFiles} file yang dapat diunggah.`)
      return
    }

    const validFiles = []
    for (let file of droppedFiles) {
      const sizeMB = file.size / (1024 * 1024)
      if (sizeMB > maxSizeMB) {
        setError(`File "${file.name}" melebihi batas ${maxSizeMB}MB.`)
        return
      } else {
        validFiles.push(file)
      }
    }

    const updatedFiles = [...files, ...validFiles]
    setFiles(updatedFiles)
    onFilesChange(updatedFiles)
  }

  const handleRemove = (index) => {
    const updated = [...files]
    updated.splice(index, 1)
    setFiles(updated)
    onFilesChange(updated)
  }

  const handleDragOver = (e) => e.preventDefault()

  return (
    <div className="flex flex-col gap-2">
      <label className="uppercase font-semibold text-dark">Upload Bukti / Dokumen</label>
      <div
        className="border-dashed border-2 border-gray-300 p-6 text-center rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className='flex flex-col items-center justify-center gap-2'>
        <FilePlus2Icon size={40} className='text-purple-500'/>
        <p className="text-gray-600 text-sm">Drag & drop file di sini, atau klik untuk memilih <br />
        Jumlah Maksimal file {maxFiles}
        <br />
        Ukuran Maksimal per file {maxSizeMB} MB
        </p>

        </div>
        <input
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            handleDrop({ preventDefault: () => {}, dataTransfer: { files: e.target.files } })
          }}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {files.length > 0 && (
        <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
          {files.map((file, idx) => (
            <li key={idx} className="flex gap-4 items-center">
              <span>{file.name}</span>
              <button
                type="button"
                className="text-red-500 ml-2 text-xs font-semibold"
                onClick={() => handleRemove(idx)}
              >
                <TrashIcon size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default FileUploader
