import React, { useState } from "react";
import { ArrowBigLeftDashIcon } from "lucide-react";
import { api } from "../../utils/api";
import { ButtonSubmit } from "../../components/ButtonComp";
import { motion } from "framer-motion";

const Register = () => {
  const [animate, setAnimate] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    no_hp: "",
    kelamin: "",
  });
  const [error, setError] = useState({});
  const [err, setErr] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErr = {};
    if (!form.name) newErr.name = "Nama wajib diisi";
    if (!form.email) {
      newErr.email = "Email wajib diisi";
    } else if (!form.email.endsWith("@gmail.com")) {
      newErr.email = "Email harus menggunakan domain @gmail.com";
    }
    if (!form.no_hp) {
      newErr.no_hp = "No. HP wajib diisi";
    } else if (!/^\d+$/.test(form.no_hp)) {
      newErr.no_hp = "No. HP hanya boleh angka";
    }

    setError(newErr);
    return Object.keys(newErr).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAnimate(true);
    setErr("");
    if (validate()) {
      await api
        .post(`/auth/register`, form)
        .then((res) => {
          if (res.data.status === 404) {
            setErr(res?.data?.message);
            return;
          } else {
            window.location.href = "/auth/register/success";
          }
        })
        .catch((err) => {
          console.log("eerr", err);
        })
        .finally(() => setAnimate(false));
    } else {
      setAnimate(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-pink-200 dark:from-gray-900 dark:to-gray-800 px-4">
      {/* Card dengan animasi */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="p-8 w-full max-w-lg bg-white/80 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl shadow-lg"
      >
        {/* Intro */}
        <div className="mb-6 text-center">
          <img
            src="/assets/images/uinjkt_spi_blu_logo.png"
            alt="logo spi"
            className="mx-auto w-36 mb-3"
          />
          <h1 className="text-2xl font-bold text-slate-700 dark:text-slate-100">
            Registrasi Pengguna E-AUDIT SPI
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            Silakan isi form berikut. Setelah selesai, Anda akan diarahkan ke
            bagian isian selanjutnya.
          </p>
        </div>

        {/* Error Box */}
        {err && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-red-100 border border-red-300 text-red-700 text-xs p-3 rounded mb-4 dark:bg-red-900/50 dark:text-red-200 dark:border-red-800"
          >
            {err}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nama */}
          <div>
            <label
              htmlFor="name"
              className="block text-base font-medium text-slate-700 dark:text-slate-200"
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-700/70 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-sky-400 focus:outline-none transition"
              placeholder="Nama Anda"
            />
            {error.name && (
              <p className="text-red-400 text-sm mt-1">{error.name}</p>
            )}
          </div>

          {/* Jenis Kelamin */}
          <div>
            <label
              htmlFor="kelamin"
              className="block text-base font-medium text-slate-700 dark:text-slate-200"
            >
              Jenis Kelamin *
            </label>
            <select
              id="kelamin"
              name="kelamin"
              required
              value={form.kelamin}
              onChange={handleChange}
              className="w-full mt-1 p-2 h-10 rounded-lg bg-slate-50 dark:bg-slate-700/70 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-sky-400 focus:outline-none transition"
            >
              <option disabled value="">
                Pilih Jenis Kelamin
              </option>
              <option value="l">Laki-Laki</option>
              <option value="p">Perempuan</option>
            </select>
            {error.kelamin && (
              <p className="text-red-400 text-sm mt-1">{error.kelamin}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-base font-medium text-slate-700 dark:text-slate-200"
            >
              Alamat Gmail *
            </label>
            <p className="text-xs text-sky-600 dark:text-sky-300">
              Wajib menggunakan alamat Gmail, untuk login tanpa password (SSO GOOGLE)
            </p>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              required
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-700/70 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-sky-400 focus:outline-none transition"
              placeholder="example@gmail.com"
            />
            {error.email && (
              <p className="text-red-400 text-sm mt-1">{error.email}</p>
            )}
          </div>

          {/* No HP */}
          <div>
            <label
              htmlFor="no_hp"
              className="block text-base font-medium text-slate-700 dark:text-slate-200"
            >
              No. HP *
            </label>
            <input
              type="text"
              id="no_hp"
              name="no_hp"
              required
              value={form.no_hp}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-700/70 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-sky-400 focus:outline-none transition"
              placeholder="08xxxxxxxxxx"
            />
            {error.no_hp && (
              <p className="text-red-400 text-sm mt-1">{error.no_hp}</p>
            )}
          </div>

          <ButtonSubmit animate={animate} />

          {/* Link ke Login */}
          <div className="text-sm mt-4 text-center">
            <a
              href="/auth/login"
              className="inline-flex items-center bg-slate-200 dark:bg-slate-700 px-4 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:text-sky-700 dark:hover:text-sky-300 transition gap-1"
            >
              <ArrowBigLeftDashIcon size={16} />
              Kembali ke Login
            </a>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
