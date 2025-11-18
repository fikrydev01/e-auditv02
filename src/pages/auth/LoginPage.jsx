import React, { useState, useEffect } from "react";

import { Mail, Lock, LogIn, Loader2 } from "lucide-react";
import { api } from "../../utils/api";
import LoginGoogle from "./LoginGoogle";
import { motion, AnimatePresence } from "framer-motion";

export default function Login() {
  const [err, setErr] = useState("");
  const [animate, setAnimate] = useState(false);
  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(false); // state modal

  const handleChange = (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAnimate(true);
    setErr("");
    await api
      .post(`/auth/login_manual`, input)
      .then((res) => {
        console.log("res", res.data);
        let stt = res.data.status;
        if (stt == 404) {
          setErr(res.data.message);
          setAnimate(false);
          return;
        }
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("data", res.data.data_enc || null);
        localStorage.setItem("theme", "light");

        window.location.href = "/u/d";
        setAnimate(false);
      })
      .catch((err) => {
        setAnimate(false);
        console.log("eerr", err.response.data.detail);
        // setErr(err?.response?.data?.detail)
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-pink-200 dark:from-gray-900 dark:to-gray-800 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-pink-200/30 dark:border-gray-700/30"
      >
        <div className="flex flex-col items-center mb-6">
          <img
            src="/assets/images/uinjkt_spi_blu_logo.png"
            alt="Logo"
            className=" h-16 mb-2 drop-shadow-lg"
          />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
            Lapor SPI UINJKT
          </h2>
        </div>

        {err && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/80 text-white text-center shadow border border-red-600 animate-shake">
            {err}
          </div>
        )}

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={(e) => handleChange(e)}
              required
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 
                bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 
                focus:ring-2 focus:ring-pink-400 focus:outline-none"
            />
          </div>
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              onChange={(e) => handleChange(e)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 
                bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 
                focus:ring-2 focus:ring-pink-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={animate}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl 
              bg-pink-500 hover:bg-pink-600 text-white font-medium 
              transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {animate ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <LogIn size={18} />
            )}
            {animate ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
          <span className="text-sm text-gray-500 dark:text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
        </div>

        {/* Google Login */}
        {/* <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 py-2 px-4 rounded-xl 
            bg-white border border-gray-300 dark:border-gray-600 
            text-gray-700 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button> */}
        <LoginGoogle />
        {/* UIN Login */}
        <button
          // onClick={handleGoogleLogin}
                    onClick={() => setShowModal(true)}

          className="w-full flex items-center justify-between gap-3 py-2 px-4 rounded-3xl mt-2 
            bg-white border border-gray-300 dark:border-gray-600 
            text-gray-700 font-medium hover:bg-gray-50 hover:text-white text-sm dark:hover:bg-gray-700 transition"
        >
          <img
            src="/assets/images/logo-uinjkt.png"
            alt="UINJKT"
            className="w-6 h-6 "
          />
          <p className="flex-1 text-center text-sm">
          Menggunakan UINJKT SSO

          </p>
          
        </button>

        {/* Extra Links */}
        <div className="flex items-center justify-between mt-8">
          <a href="/" className="text-pink-500 hover:underline">
            Beranda
          </a>
          <div className="text-center text-sm text-gray-500 dark:text-gray-100">
            <a href="/auth/register" className="text-pink-500 hover:underline">
            Belum memiliki akun{" "}
            </a>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-center text-xs text-slate-400">Aplikasi ini dikembangkan oleh Satuan Pengawas Internal (SPI) <br /> Universitas Islam Negeri (UIN) Syarif Hidayatullah Jakarta <br /> Bekerjasama  PT. SNS</p>
        </div>
      </motion.div>

       <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-sm text-center"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Modul Belum Aktif
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
                Modul ini belum aktif dan menunggu sinkronisasi e-semesta (Pustipanda). Jika Email anda telah terdaftar pada aplikasi ini, silahkan menggunakan fitur Login dengan Google.
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-medium transition"
              >
                Tutup
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
