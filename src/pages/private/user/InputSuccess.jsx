import React from 'react'
import { ArrowBigLeftDashIcon, CheckCircleIcon } from 'lucide-react'

const InputSuccess = () => {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center animate-fade-in-up">
        <div className="flex justify-center mb-4">
        <div className="bg-green-100 p-4 rounded-full animate-success-bounce">
  <CheckCircleIcon size={48} className="text-green-500" />
</div>
        </div>
        <h2 className="text-2xl font-bold text-green-700 mb-2">Data Berhasil Terkirim!</h2>
        <p className="text-gray-600 text-sm mb-6">
          Berkas Konsultasi, Laporan atau Review Dokumen anda telah berhasil terkirim, tim kami akan segera memproses dokumen anda.
        </p>
        <div className='flex items-center justify-center'>

        <a
          href="/u/d"
          className="w-fit bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition flex items-center"
        >
            <ArrowBigLeftDashIcon size={22} />
          Ke Aktifitas
        </a>
        </div>
      </div>
    </div>
  )
}

export default InputSuccess
