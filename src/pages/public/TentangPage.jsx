import { motion } from "framer-motion";
import { Scale, Target, ShieldCheck, BookOpen } from "lucide-react";
import WebHeader from "../../components/web/WebHeader";

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white text-gray-800">
        <WebHeader />
      {/* Hero Section */}
      <section className="relative bg-indigo-600 text-white py-24 h-screen flex items-center">
        <div className="max-w-6xl mx-auto text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold mb-6"
          >
            Tentang LaporSPI
          </motion.h1>
          <p className="text-lg md:text-xl text-indigo-100 leading-relaxed">
            LaporSPI adalah sistem pelaporan yang memberikan ruang aman, mudah, 
            dan terstruktur bagi siapa saja untuk menyampaikan dugaan pelanggaran 
            secara etis, rahasia, dan bertanggung jawab.
          </p>
        </div>
      </section>

      {/* Visi & Tujuan */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Visi & Tujuan</h2>
        <div className="grid md:grid-cols-2 gap-10 text-gray-700 leading-relaxed">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p>
              LaporSPI hadir untuk mendukung terciptanya lingkungan organisasi yang 
              bersih, transparan, dan akuntabel. Melalui sistem ini, pelapor dapat 
              menyampaikan laporan dengan tenang karena identitas mereka dijaga kerahasiaannya.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p>
              Tujuan utama kami adalah memastikan laporan yang masuk ditindaklanjuti 
              secara adil dan profesional, sehingga mampu membangun budaya integritas 
              yang kuat di dalam institusi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Nilai Utama */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-14">Nilai Utama</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
     {
    title: "Integritas",
    desc: "Mengutamakan kejujuran, tanggung jawab, dan konsistensi dalam setiap langkah.",
    icon: Scale,
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "Transparansi",
    desc: "Setiap laporan diverifikasi dan diproses dengan prosedur yang jelas.",
    icon: Target,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "Perlindungan",
    desc: "Identitas pelapor dilindungi secara penuh untuk menciptakan rasa aman.",
    icon: ShieldCheck,
    color: "bg-green-100 text-green-600",
  },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition"
              >
                <div className={`w-14 h-14 flex items-center justify-center rounded-xl mb-6 ${item.color}`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-semibold mb-3">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Landasan Hukum */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Landasan Hukum</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white p-8 rounded-2xl shadow-md border border-gray-100"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-yellow-100 text-yellow-600">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold">Dasar Regulasi</h3>
          </div>
          <ul className="list-disc pl-6 space-y-3 text-gray-700 leading-relaxed">
            <li>Undang-Undang Nomor 31 Tahun 1999 jo. UU Nomor 20 Tahun 2001 tentang Pemberantasan Tindak Pidana Korupsi.</li>
            <li>Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik.</li>
            <li>Peraturan Pemerintah Nomor 60 Tahun 2008 tentang Sistem Pengendalian Intern Pemerintah (SPIP).</li>
            <li>Ketentuan internal institusi terkait mekanisme pengendalian dan penanganan pelaporan.</li>
          </ul>
        </motion.div>
      </section>
    </div>
  );
}
