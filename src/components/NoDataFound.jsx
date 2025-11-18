import React from 'react'
import { FileSearch } from 'lucide-react'
import { ButtonKembaliDashboard } from './ButtonComp'

const NoDataFound = ({desc}) => {
    return (
        <section className="section-container">
            <div className="w-full bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 flex flex-col items-center gap-6 text-center transition-all duration-300">
                
                {/* Ilustrasi */}
                <img 
                    alt="no data found" 
                    src="/assets/images/no-data.png" 
                    className="w-48 h-48 object-contain animate-fade-in"
                    onError={(e) => { e.target.style.display = 'none' }} // fallback jika gambar tidak ada
                />

                {/* Icon */}
                <FileSearch className="w-16 h-16 text-gray-400 dark:text-gray-500" />

                {/* Judul */}
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
                    Tidak Ada Data {desc} Ditemukan
                </h2>

                {/* Deskripsi */}
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                    Data {desc} belum tersedia.
                </p>
            </div>
        </section>
    )
}

export default NoDataFound
