import React from 'react'
import { FORMAT_DATE_IND, FORMAT_RUPIAH } from '../../constant/data'
import { FILTER_UINJKTUNIT } from '../../utils/spi'

const AuditBarjasInvoiceHeader = ({invoice}) => {
    console.log("dininsi", invoice)
  return (
    <div className='flex flex-col'>
        <h1 className='text_h1 text-center'>KERTAS KERJA AUDIT BARANG DAN JASA (ANALISA HARGA)</h1>
        <div className='mt-4'>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3">
        <div className="flex">
          <span className="font-medium w-48 text-gray-700">Hari/Tanggal Audit</span>
          <span>: {FORMAT_DATE_IND(invoice?.created_at)}</span>
        </div>

        <div className="flex">
          <span className="font-medium w-16 text-gray-700">Nama PPK</span>
          <span>: {invoice?.nama_ppk}</span>
        </div>

<div className="flex sm:col-span-2">
  <span className="font-medium w-48 text-gray-700">Judul Pengadaan</span>
  <span className="break-words whitespace-normal flex-1 max-w-xl">
    : {invoice.judul_pengadaan}
  </span>
</div>

        <div className="flex">
          <span className="font-medium w-48 text-gray-700">Jenis Pengadaan</span>
          <span>: {invoice?.jenis_pengadaan}</span>
        </div>

        <div className="flex">
          <span className="font-medium w-16 text-gray-700">Nama Pejabat Pengadaan</span>
          <span>: {invoice?.nama_pp || "-"}</span>
        </div>

        <div className="flex sm:col-span-2">
          <span className="font-medium w-48 text-gray-700">Nama Penyedia</span>
          <span>: {invoice?.nama_penyedia}</span>
        </div>

        <div className="flex">
          <span className="font-medium w-48 text-gray-700">Nilai Kontrak</span>
          <span>: {FORMAT_RUPIAH(invoice?.nilai_kontrak || 0)}</span>
        </div>

        <div className="flex sm:col-span-2">
          <span className="font-medium w-48 text-gray-700">Unit Pelaksana</span>
          <span>: {FILTER_UINJKTUNIT(invoice?.kode_unit)}</span>
        </div>
      </div>    
        </div>    
    </div>
  )
}

export default AuditBarjasInvoiceHeader