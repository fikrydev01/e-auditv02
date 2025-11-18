import React from 'react'
import { ArrowLeftCircleIcon } from 'lucide-react'
import { ButtonKembaliDashboard } from './ButtonComp'

const BelumAktif = ({ kembali }) => {
    return (
        <section className='section-container'>
            <div className='w-full  bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 flex flex-col items-center gap-6 text-center transition-all duration-300'>
                
                {/* Icon utama */}

                {/* Ilustrasi */}
                <img 
                    alt='under progress' 
                    src='/assets/images/under-building.png' 
                    className='w-48 h-48 object-contain animate-pulse'
                />

                <ArrowLeftCircleIcon className='w-16 h-16 text-gray-400 dark:text-gray-500 animate-ping' />
                {/* Judul */}
                <h2 className='text-2xl font-extrabold text-gray-900 dark:text-gray-100'>
                    Modul Ini Belum Diaktifkan
                </h2>

                {/* Deskripsi */}
                <p className='text-gray-600 dark:text-gray-300 text-sm sm:text-base'>
                    Harap kembali dilain waktu.
                </p>

                {/* Tombol Kembali */}
                <div className='mt-2'>
                    <ButtonKembaliDashboard onClick={kembali} />
                </div>
            </div>
        </section>
    )
}

export default BelumAktif
