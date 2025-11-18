import { useEffect, useState } from 'react'
import { fetchData } from '../../../../utils/api';
import { FILTER_AUDIT, FORMAT_DATE_IND } from '../../../../constant/data';
import { ActionButton } from '../../../../components/ButtonComp';
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import DetailAudit from './DetailAudit';


const ListAudit = () => {
    const [datas, setDatas] = useState([]);
    const [animate, setAnimate] = useState(false);
    const [err, setErr] = useState(null);
    const [rld, setRld] = useState(false);
    
    // State untuk pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [totalItems, setTotalItems] = useState(0);

    const getDatas = () => {
        fetchData(`/spi/audit_auditor?page=${currentPage}&limit=${itemsPerPage}&order_by=created_at&order_direction=desc`, {
            setLoading: setAnimate,
            onSuccess: (res) => {
                console.log("Success!", res);
                setDatas(res?.data || []);
                setTotalItems(res?.total || res?.data?.length || 0);
            },
            onError: (err) => {
                setErr(err?.detail || "Something went wrong!");
            },
        });
    };

    useEffect(() => {
        getDatas();
    }, [rld, currentPage]); // Tambahkan currentPage ke dependency

    const [dtp, setDtp] = useState(null);
    
    const pilih = (id) => {
        const dt = datas?.find((o) => o?.audit?.id == id);
        setDtp(dt || null);
        // console.log("dt", dt);
    }

    const kembali = () => {
        setDtp(null);
    }

    // Hitung total pages
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Fungsi untuk ganti halaman
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Generate page numbers untuk pagination
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        
        return pages;
    };

    return (
        <div>

                <div className="space-y-4">
                    {/* Tabel */}
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-200">
                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="text-xs text-gray-100 uppercase bg-gradient-to-r from-blue-500 to-blue-600">
                                <tr>
                                    <th className="px-6 py-3">Aksi</th>
                                    <th className="px-6 py-3">Jenis</th>
                                    <th className="px-6 py-3">Unit</th>
                                    <th className="px-6 py-3">Level Auditor</th>
                                    <th className="px-6 py-3">Periode Audit</th>
                                    <th className="px-6 py-3">Catatan</th>
                                    <th className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
            
                            <tbody>
                                {datas && datas.map((r, i) => (
                                    <tr
                                        key={i}
                                        className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            <div className="flex gap-2">
                                                <ActionButton
                                                    onClick={() => pilih(r?.audit?.id)}
                                                    icon={Eye}
                                                    label="Detail"
                                                    color="blue"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{r?.audit?.tipe_audit}</td>
                                        <td className="px-6 py-4">{r?.audit?.kode_unit}</td>
                                        <td className="px-6 py-4">{r?.level}</td>
                                        <td className="px-6 py-4">{r?.audit?.periode_audit}</td>
                                        <td className="px-6 py-4">{r?.audit?.catatan}</td>
                                        <td className="px-6 py-4 uppercase">
                                            {FILTER_AUDIT(r?.audit?.status_id)?.spi_status || '-'}
                                        </td>
                                    </tr>
                                ))}
                                
                                {datas.length === 0 && !animate && (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                            Tidak ada data audit
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 sm:px-6 rounded-lg">
                            {/* Info halaman */}
                            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Menampilkan <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> -{' '}
                                        <span className="font-medium">
                                            {Math.min(currentPage * itemsPerPage, totalItems)}
                                        </span> dari{' '}
                                        <span className="font-medium">{totalItems}</span> hasil
                                    </p>
                                </div>
                                
                                {/* Navigasi halaman */}
                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                    {/* Tombol Previous */}
                                    <button
                                        onClick={() => goToPage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                                            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                                        }`}
                                    >
                                        <span className="sr-only">Previous</span>
                                        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                                    </button>

                                    {/* Page numbers */}
                                    {getPageNumbers().map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => goToPage(page)}
                                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                                currentPage === page
                                                    ? 'bg-blue-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                                                    : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}

                                    {/* Tombol Next */}
                                    <button
                                        onClick={() => goToPage(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                                            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                                        }`}
                                    >
                                        <span className="sr-only">Next</span>
                                        <ChevronRight className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </nav>
                            </div>

                            {/* Mobile view */}
                            <div className="flex flex-1 justify-between sm:hidden">
                                <button
                                    onClick={() => goToPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${
                                        currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                                    }`}
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => goToPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${
                                        currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Loading state */}
                    {animate && (
                        <div className="text-center py-4">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <p className="mt-2 text-sm text-gray-600">Memuat data...</p>
                        </div>
                    )}

                    {/* Error state */}
                    {err && (
                        <div className="bg-red-50 border border-red-200 rounded-md p-4">
                            <p className="text-red-700 text-sm">{err}</p>
                            <button
                                onClick={getDatas}
                                className="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                            >
                                Coba Lagi
                            </button>
                        </div>
                    )}
                </div>
        </div>
    )
}

export default ListAudit