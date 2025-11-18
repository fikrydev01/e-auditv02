import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Berita from "../../components/web/Berita";
import ChatBotHome from "../../components/web/ChatBotHome";
import Features from "../../components/web/Features";
import WebHeader from "../../components/web/WebHeader";



export default function HomePage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "Apa itu LAPOR SPI?",
      a: "LAPOR SPI adalah kanal pelaporan internal untuk menjaga integritas, transparansi, dan tata kelola yang baik di lingkungan kampus."
    },
    {
      q: "Apakah identitas pelapor dirahasiakan?",
      a: "Ya. Identitas pelapor dijaga kerahasiaannya sesuai prinsip whistleblowing. Informasi pribadi tidak akan dibagikan tanpa persetujuan."
    },
    {
      q: "Apa saja yang bisa dilaporkan?",
      a: "Indikasi kecurangan (fraud), gratifikasi, benturan kepentingan, penyalahgunaan wewenang, pelanggaran etika, dan penyimpangan prosedur."
    },
    {
      q: "Bagaimana alur tindak lanjut laporan?",
      a: "Laporan diterima, diverifikasi, diproses sesuai prioritas, dan ditindaklanjuti oleh unit terkait. Hasilnya diinformasikan melalui kanal yang disepakati."
    },
    {
      q: "Apakah perlu bukti pendukung?",
      a: "Sebaiknya lampirkan data/bukti pendukung (dokumen, foto, detail kronologi) untuk mempercepat validasi dan tindak lanjut."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-pink-50 to-emerald-50 text-gray-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-gray-200 transition-colors duration-500">
      {/* Header */}
      <WebHeader />

      {/* Hero */}
      <section
        id="tentang"
        className="relative h-screen grid place-items-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1600&auto=format&fit=crop"
            alt="Kolaborasi dan integritas"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/70 to-indigo-600/60 dark:from-black/80 dark:to-gray-900/70" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
            Wadah Pelaporan untuk Integritas Kampus
          </h2>
          <p className="text-lg md:text-xl text-indigo-100 mt-6 mb-10">
            Saluran pengaduan yang aman dan mudah diakses untuk mendorong budaya
            transparansi, anti-korupsi, dan tata kelola yang bersih.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="#lapor"
              className="px-7 py-3 rounded-2xl bg-white text-indigo-700 font-semibold shadow-lg hover:bg-indigo-50 dark:bg-gray-800 dark:text-indigo-300 dark:hover:bg-gray-700 transition"
            >
              Laporkan Sekarang
            </a>
            <a
              href="#features"
              className="px-7 py-3 rounded-2xl bg-indigo-500 text-white font-semibold shadow-lg hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 transition"
            >
              Pelajari Fitur
            </a>
          </div>
        </motion.div>
      </section>

      {/* CTA Inline */}
      <section id="lapor" className="max-w-screen-2xl mx-auto px-6 mt-20">
        <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <img
              src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop"
              alt="Keamanan data"
              className="w-full md:w-80 h-40 md:h-28 object-cover rounded-xl"
            />
            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Lindungi Integritas, Mulai dari Laporan Anda
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Sampaikan laporan secara jelas, sertakan kronologi dan bukti
                pendukung. Kerahasiaan Anda prioritas kami.
              </p>
            </div>
            <a
              href="/auth/login"
              className="whitespace-nowrap px-5 py-3 rounded-2xl bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 transition"
            >
              Buka Form
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <Features />
      <ChatBotHome />

      {/* Edukasi / News */}
      <section id="news" className="max-w-screen-2xl mx-auto px-6 py-24">
        <h3 className="text-3xl font-bold text-center mb-14 dark:text-gray-100">
          Edukasi & Informasi
        </h3>
        <Berita />
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-screen-2xl mx-auto px-6 py-24">
        <h3 className="text-3xl font-bold text-center mb-12 dark:text-gray-100">
          Pertanyaan Umum
        </h3>
        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <div
              key={idx}
              className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow"
            >
              <button
                className="w-full text-left px-6 py-4 font-medium flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <span className="pr-6">{item.q}</span>
                <span className="text-xl text-gray-400">
                  {openFaq === idx ? "−" : "+"}
                </span>
              </button>
              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-6 pb-5 text-gray-600 dark:text-gray-300"
                  >
                    {item.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 py-10">
        <div className="max-w-screen-2xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
          <p>
            © {new Date().getFullYear()} E-AUDIT. PT. SNS dan SPI UIN Jakarta,
            Semua hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-6">
            <a href="#kebijakan" className="hover:text-indigo-600 dark:hover:text-indigo-400">
              Kebijakan & Privasi
            </a>
            <a href="#kontak" className="hover:text-indigo-600 dark:hover:text-indigo-400">
              Kontak
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
