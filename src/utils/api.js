// api.js
import axios from "axios";

import { showError, showSuccess } from "../components/ToastCustom";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import React from 'react';
import ReactDOM from 'react-dom/client';
import { AlertTriangle } from "lucide-react";
import { showConfirm } from "../components/ConfirmModal";

export const APP_MAIN_URL = window.location.origin
// export const API_URL = "http://localhost:5001";
export const API_URL = import.meta.env.VITE_PYAPI_URL;
const APIKEY = import.meta.env.VITE_APIKEY;
export const BASE_URL = import.meta.env.VITE_PYAPI;
// export const BASE_URL = import.meta.env.VITE_LOCALAPI;
// export const BASE_URL = '/api'

export const app_version = '3.4.2'

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "api-key": APIKEY,
    "Content-Type": "application/json",
  },
});
export const apiValidasi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "api-key": APIKEY,
    "Content-Type": "application/json",
  },
});
const apiCred = axios.create({
  baseURL: BASE_URL,
  headers: {
    "api-key": APIKEY,
    "Content-Type": "application/json",
  },
});


export const userDetail = JSON.parse(localStorage.getItem("data"));
// console.log('user', user)
apiCred.defaults.withCredentials = false;
apiCred.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    
    const user = JSON.parse(localStorage.getItem("data"));
    const userid = user?.id;
    const insid = user?.insid || ''
    const divid = user?.div_id || ''
    const role = user?.role || ''
    const name = user?.name || ''
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (insid) {
      config.headers['X-insid'] = insid;
    }
    if (userid) {
      config.headers['X-userid'] = userid;
    }
    if (divid) {
      config.headers['X-divid'] = divid;
    }
    if (role) {
      config.headers['X-role'] = role;
    }
   
    if (name) {
      config.headers['X-name'] = name;
    }
   
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
// Wrapper functions
export const fetchData = async (path, { setLoading, onSuccess, onError } = {}) => {
  try {
    if (setLoading) setLoading(true);
    const res = await apiCred.get(path);

    if (onSuccess) {
      onSuccess(res);
    }
    return res;
  } catch (err) {
    console.error("Fetch error:", err);
    if (onError) {
      onError(err.response?.data || err.message);
    }
    throw err;
  } finally {
    if (setLoading) setLoading(false);
  }
};

export const postData = async (path, data, { setLoading, onSuccess, onError } = {}) => {
  try {
    if (setLoading) setLoading(true);
    const headers = {};
    if (data instanceof FormData) {
      // jangan set Content-Type biar axios otomatis
      delete apiCred.defaults.headers["Content-Type"];
    }
    const res = await apiCred.post(path, data, { headers });

    if (res?.status === 200 || res?.status === 201) {
      showSuccess(res?.data?.message || "Berhasil menyimpan data!");
    }

    if (onSuccess) {
      onSuccess(res);
    }

    return res;
  } catch (err) {
    console.error("Post error:", err);
    showError(err.response?.data?.message || "Gagal menyimpan data!");

    if (onError) {
      onError(err.response?.data || err.message);
    }
    throw err;
  } finally {
    if (setLoading) setLoading(false);
  }
};


export const updateData = async (
  path,
  // data = {},
  {
    setLoading,
    onSuccess,
    onError,
    requireConfirm = true,
    confirmMessage = "Apakah anda yakin untuk update data ini?",
  } = {}
) => {
  try {
    // konfirmasi dulu kalau requireConfirm true
    if (requireConfirm) {
      const confirmed = await showConfirm(confirmMessage);
      if (!confirmed) return null;
    }

    setLoading?.(true);

    const res = await apiCred.put(path);

    if (res?.status === 200 || res?.status === 201) {
      // tampilkan pesan sukses
      showSuccess(res?.data?.message || "Berhasil mengupdate data!");
      // panggil callback success
      onSuccess?.(res);
    } else {
      // kalau status bukan 200/201 anggap gagal
      showError(res?.data?.message || "Gagal mengupdate data!");
      onError?.(res.data);
    }

    return res;
  } catch (err) {
    console.error("Update error:", err);
    showError(err.response?.data?.message || "Gagal mengupdate data!");
    onError?.(err.response?.data || err.message);
    throw err;
  } finally {
    setLoading?.(false);
  }
};
export const deleteData = async (
  path,
  // data = {},
  {
    setLoading,
    onSuccess,
    onError,
    requireConfirm = true,
    confirmMessage = "Apakah anda yakin untuk Hapus data ini?",
  } = {}
) => {
  try {
    // konfirmasi dulu kalau requireConfirm true
    if (requireConfirm) {
      const confirmed = await showConfirm(confirmMessage);
      if (!confirmed) return null;
    }

    setLoading?.(true);

    const res = await apiCred.delete(path);

    if (res?.status === 200 || res?.status === 201) {
      // tampilkan pesan sukses
      showSuccess(res?.data?.message || "Berhasil mengupdate data!");
      // panggil callback success
      onSuccess?.(res);
    } else {
      // kalau status bukan 200/201 anggap gagal
      showError(res?.data?.message || "Gagal mengupdate data!");
      onError?.(res.data);
    }

    return res;
  } catch (err) {
    console.error("Update error:", err);
    showError(err.response?.data?.message || "Gagal mengupdate data!");
    onError?.(err.response?.data || err.message);
    throw err;
  } finally {
    setLoading?.(false);
  }
};



// import { apiCred, showSuccess, showError } from './api'; // sesuaikan path
// import { AnimatePresence, motion } from 'framer-motion';

export const deleteData_bak = async (
  path,
  // data = {},
  { setLoading, onSuccess, onError, requireConfirm = true, confirmMessage = "Apakah anda yakin untuk menghapus data ini?" } = {}
) => {
  try {
    if (requireConfirm) {
      const confirmed = await new Promise((resolve) => {
        const modalRoot = document.createElement("div");
        document.body.appendChild(modalRoot);

        const ConfirmModal = () => {
          const [open, setOpen] = useState(true);

          const handleYes = () => {
            setOpen(false);
            resolve(true);
            setTimeout(() => ReactDOM.unmountComponentAtNode(modalRoot), 300);
          };

          const handleNo = () => {
            setOpen(false);
            resolve(false);
            setTimeout(() => ReactDOM.unmountComponentAtNode(modalRoot), 300);
          };

          return React.createElement(
            AnimatePresence,
            null,
            open &&
              React.createElement(
                motion.div,
                {
                  className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                },
                React.createElement(
                  motion.div,
                  {
                    className: "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl max-w-xl text-center",
                    initial: { scale: 0.8, opacity: 0 },
                    animate: { scale: 1, opacity: 1 },
                    exit: { scale: 0.8, opacity: 0 },
                  },
                  // Icon with animation
                  React.createElement(
                    motion.div,
                    {
                      className: "flex justify-center mb-4",
                      animate: { y: [0, -10, 0] },
                      transition: { repeat: Infinity, duration: 0.8 },
                    },
                    React.createElement(AlertTriangle, { size: 60, className: "text-red-500" })
                  ),
                  // Message
                  React.createElement("p", { className: "text-gray-800 dark:text-gray-100 mb-4 font-semibold" }, confirmMessage),
                  // Buttons
                  React.createElement(
                    "div",
                    { className: "flex justify-center gap-4" },
                    React.createElement(
                      "button",
                      { className: "px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600", onClick: handleYes },
                      "Ya, Lanjutkan"
                    ),
                    React.createElement(
                      "button",
                      { className: "px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 dark:text-white hover:bg-gray-400", onClick: handleNo },
                      "Tidak, Batalkan"
                    )
                  )
                )
              )
          );
        };

        ReactDOM.createRoot(modalRoot).render(React.createElement(ConfirmModal));
      });

      if (!confirmed) return null; // batal
    }

    if (setLoading) setLoading(true);
    const res = await apiCred.delete(path, { data });

    if (res?.status === 200 || res?.status === 201) {
      showSuccess(res?.data?.message || "Berhasil menghapus data!");
    }

    if (onSuccess) onSuccess(res);
    return res;
  } catch (err) {
    console.error("Delete error:", err);
    showError(err.response?.data?.message || "Gagal menghapus data!");
    if (onError) onError(err.response?.data || err.message);
    throw err;
  } finally {
    if (setLoading) setLoading(false);
  }
};



export const logout = async () => {
  localStorage.clear();
  window.location.href = '/auth/login';
}


export const fetchAnggotaSpi = async ({ setLoading, setData, setError }) => {
  return fetchData(`/spi/anggota_spi`, {
    setLoading,
    onSuccess: (res) => setData(res?.data || []),
    onError: (err) => setError(err?.detail || "Something went wrong!"),
  });
};