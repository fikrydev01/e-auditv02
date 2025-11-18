import React, { useState, useEffect } from 'react'
import { Calendar, Twitter } from 'lucide-react'
import { fetchData } from '../../../utils/api'
import { FILTER_ALUR_REVDOK_USER, FORMAT_DATE_HOUR_IND } from '../../../constant/data'
import { motion } from 'framer-motion'

const RevdokLog = ({ data }) => {
    const [logs, setLogs] = useState([])
    const [err, setErr] = useState('')

    const getDatas = () => {
        fetchData(`/usr/revdok_detail_log?id=${data?.id}`, {
            setLoading: () => {},
            onSuccess: (res) => setLogs(res?.data || []),
            onError: (err) => setErr(err?.detail || "Something went wrong!"),
        });
    };

    useEffect(() => {
        getDatas();
    }, [data]);

    // Parent UL variants
    const listVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15 // delay tiap <li>
            }
        }
    }

    // LI variants
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        hover: { scale: 1.03 }
    }

    return (
        <motion.div 
            className='flex flex-col bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md gap-3'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className='flex items-center gap-2 dark:text-white'>
                <Twitter />
            <h4 className='text-xl font-semibold text-gray-700 dark:text-gray-200'>Log Reviu Dokumen</h4>
            </div>
            {err && <p className='text-xs text-red-500'>{err}</p>}

        <motion.ul 
    className='flex flex-col gap-3'
    variants={listVariants}
    initial="hidden"
    animate="visible"
>
    {logs && logs
        .slice() // buat salinan agar tidak merubah state asli
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map((r, i) => (
            <motion.li 
                key={i}
                className='flex flex-col p-3 rounded-lg bg-gray-50 dark:bg-gray-700 shadow-sm'
                variants={itemVariants}
                whileHover="hover"
            >
                <div className='flex justify-between items-center'>
                    <span className='font-medium text-gray-800 dark:text-gray-100'>
                        {i + 1}.

                        {FILTER_ALUR_REVDOK_USER(r.status_id)}
                    </span>
                    {/* <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(r.status_id)}`}>
                        {r.status_id.toUpperCase()} */}
             
                </div>
                <div className='flex items-center gap-1 mt-1 text-gray-500 dark:text-gray-300 text-xs'>
                    <Calendar size={14} />
                    {FORMAT_DATE_HOUR_IND(r.created_at)}
                </div>
                <hr className='border-gray-200 dark:border-gray-600 mt-2' />
            </motion.li>
        ))
    }
</motion.ul>

        </motion.div>
    )
}

export default RevdokLog
