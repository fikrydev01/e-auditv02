import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Save } from "lucide-react";
import { postData, userDetail } from "../../utils/api";
import Breadcrumbs from "../../components/Breadcrumbs";


export default function UserProfile() {
const user = userDetail
const [animate, setAnimate] = useState(false)
const [input, setInput] = useState({
    name : user?.name,
    email : user?.email,
    password : "",
    confirmPassword : ""
})

useState(() => {
    setInput(user)
},[user])


  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
        setAnimate(true)
        await postData('/usr/profil_update', input, {
            setLoading: setAnimate,
            onSuccess: (res) => {
            setAnimate(false)
            console.log("Success!", res);
        },
        onError: (err) => {
            setAnimate(false)
        //   setErr(err?.response?.data?.detail || "Something went wrong!");
        }
      });
    }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="section-container"
    >   
      <Breadcrumbs title="User Profil"/>
    <div className="section-body">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Profil Akun
          </h2>
          <p className="text-sm text-gray-500">
            Kelola informasi akun dan keamanan Anda
          </p>
        </div>
        
      </div>

        {/* Status Message */}
        {status.message && (
          <div
            className={`text-sm mt-2 px-3 py-2 rounded-xl ${
              status.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status.message}
          </div>
        )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nama */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama Lengkap
          </label>
          <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
            <User className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              name="name"
              value={input?.name}
              onChange={handleChange}
              className="w-full bg-transparent focus:outline-none text-gray-800"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
            <Mail className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              value={input?.email}
              onChange={handleChange}
              className="w-full bg-transparent focus:outline-none text-gray-800"
            />
          </div>
        </div>

        <hr className="my-6" />

        {/* Password Baru */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password Baru
          </label>
          <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
            <Lock className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="password"
              name="password"
              value={input?.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-transparent focus:outline-none text-gray-800"
            />
          </div>
        </div>

        {/* Konfirmasi Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Konfirmasi Password
          </label>
          <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
            <Lock className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="password"
              name="confirmPassword"
              value={input?.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-transparent focus:outline-none text-gray-800"
            />
          </div>
        </div>


        {/* Tombol Simpan */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl transition"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan</span>
          </button>
        </div>
      </form>

    </div>
    </motion.div>
  );
}
