import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { Smile, FileText, MessageCircle } from "lucide-react";

const SliderComp = () => {
  const slides = [
    {
      title: "Selamat Datang",
      desc: "Pantau dan kelola semua aktivitas Anda dengan mudah dengan pengalaman berbeda.",
      bg: "bg-gradient-to-r from-pink-100 to-rose-50 dark:from-pink-900 dark:to-rose-800",
      icon: <Smile className="w-10 h-10 text-pink-500 dark:text-pink-300 mb-4" />,
    },
    {
      title: "Laporan Cepat",
      desc: "Laporkan permasalahan hanya dengan beberapa klik dan kami akan menjawab.",
      bg: "bg-gradient-to-r from-green-100 to-emerald-50 dark:from-green-900 dark:to-emerald-800",
      icon: <FileText className="w-10 h-10 text-green-500 dark:text-green-300 mb-4" />,
    },
    {
      title: "Konsultasi Mudah",
      desc: "Ajukan konsultasi dan diskusi dengan nyaman dengan Privasi terjaga.",
      bg: "bg-gradient-to-r from-blue-100 to-indigo-50 dark:from-blue-900 dark:to-indigo-800",
      icon: <MessageCircle className="w-10 h-10 text-blue-500 dark:text-blue-300 mb-4" />,
    },
  ];

  return (
    <div className="w-full h-full relative">
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 4000 }}
        loop={true}
        spaceBetween={30}
        className="rounded-3xl shadow-lg overflow-hidden"
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} custom-bullet"></span>`;
          },
        }}
      >
        {slides.map((s, idx) => (
          <SwiperSlide key={idx}>
            <div
              className={`flex flex-col items-center h-full justify-center p-12 text-center ${s.bg} transition-all duration-500`}
            >
              {s.icon}
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3 tracking-tight">
                {s.title}
              </h2>
              <p className="text-base text-gray-700 dark:text-gray-300 max-w-md leading-relaxed">
                {s.desc} ????
              </p> 
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom style for bullets */}
<style>{`
  .swiper-pagination {
    bottom: 10px !important;
  }
  .swiper-pagination-bullet {
    background: #9ca3af !important; /* gray-400 */
    opacity: 1 !important;
    transition: all 0.3s ease;
    border-radius: 9999px;
    width: 8px;
    height: 8px;
    margin: 0 4px !important;
  }
  /* Active bullet default light mode */
  .swiper-pagination-bullet-active {
    background: #2563eb !important; /* blue-600 */
    width: 24px;
    height: 8px;
  }
  /* Active bullet dark mode */
  .dark .swiper-pagination-bullet-active {
    background: #ffffff !important;
  }
`}</style>

    </div>
  );
};

export default SliderComp;
