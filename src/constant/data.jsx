import { Binoculars, BookOpen, Eye, FerrisWheel, Flag, House, Pyramid, School, UmbrellaOff, Users, UserSearch, View, Volume2, Wallet2, Archive, User, FileText, CheckCircle } from "lucide-react";
import { UINJKTUNIT } from "../utils/spi";
// import { toast } from 'react-toastify';

export const TOAST_SUCCESS = () => toast.success('Success, input / update data !', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    // transition: Bounce,
    });

export const MAX_SIZE_FILE_UPLOAD = `1.8 MB`;
export const SIZE_FILE_VALIDATION = (val) => {
  const max = 1898745;
  if (val < max) {
    return true;
  } else {
    return false;
  }
};

export const FORMAT_DATE_IND = (timestamp) => {
    if(timestamp){
      return new Intl.DateTimeFormat('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          // hour: '2-digit',
          // minute: '2-digit',
          // second: '2-digit',
          timeZone: 'Asia/Jakarta'
      }).format(new Date(timestamp));
  
    }else{
      return "-"
    }
  };
  export const FORMAT_DATE_HOUR_IND = (dateString) => {
    if (!dateString) return '';
  
    const dateObj = new Date(dateString);
  
    if (isNaN(dateObj.getTime())) return ''; // handle invalid date
  
    const options = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
  
    return dateObj.toLocaleString('id-ID', options).replace('.', ':');
  };
export const SHORT_TEXT = (text, limit = 150) => {
    if (!text) return '';
    
    return text.length > limit
      ? text.substring(0, limit).trim() + '.....'
      : text;
  };

export const GET_FILE_EXT = (name) => {
  let extension = name.split(".").pop();
  return extension;
};

export const FORMAT_RUPIAH = (number) => {
  if (number == null || isNaN(number)) return "Rp 0";
  return " " + new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0, // opsional, biar gak ada ,00
  }).format(number);
}
export const FILTER_KELAMIN = (jk) => {
  if(jk === 'l'){
    return "Laki-Laki"
  }
  if(jk === 'p'){
    return "Perempuan"
  }
  return ''
}



// export const ALUR_REVDOK_bak = [
//   { "id": 1, "isSpi" : 0, "label": "ajuan", "rolespi": "", "desc": "Ajuan", "role": "User" },
//   { "id": 2, "isSpi" : 1, "label": "diterima", "rolespi": "admin, ketua, sekretaris", "desc": "Diterima", "role": "admin, ketua, sekretaris SPI" },
//   { "id": 3, "isSpi" : 1, "label": "distribusi", "rolespi": "sekretaris", "desc": "Distribusi ke Divisi", "role": "Sekretaris SPI" },
//   { "id": 4, "isSpi" : 1, "label": "disetujui1", "rolespi": "ketua", "desc": "Proses Review", "role": "Ketua SPI" },
//   { "id": 5, "isSpi" : 1, "label": "selesai", "rolespi": "anggota", "desc": "Ditindaklanjuti / Selesai Review", "role": "Tim SPI" },
//   { "id": 6, "isSpi" : 1, "label": "approve", "rolespi": "ketua", "desc": "Disetujui Ketua SPI", "role": "Ketua SPI" }
// ]

export const ALURKONSLAP = [
  {
    id: 1,
    role: "User",
    user_status: "Ajuan Baru",
    tugas: "Mengajukan Ajuan Baru",
    spi_status: "Ajuan Baru",
    tahap: "Input Laporan",
    deksripsi: "User atau pihak terkait menginput laporan awal ke sistem.",
    color: "bg-gradient-to-r from-pink-200 to-pink-300"
  },
  {
    id: 2,
    role: "Admin",
    user_status: "Tervalidasi",
    tugas: "Melakukan validasi input user",
    spi_status: "Tervalidasi",
    tahap: "Admin Validasi & Diteruskan ke Ketua SPI",
    deksripsi: "Admin memeriksa dan memvalidasi laporan, lalu meneruskan ke Ketua SPI untuk pemilihan PIC.",
    color: "bg-gradient-to-r from-blue-200 to-blue-300"
  },
  {
    id: 3,
    role: "Ketua SPI",
    user_status: "Proses",
    tugas: "Menyetujui Pelaporan User",
    spi_status: "Tervalidasi Ketua SPI",
    tahap: "Laporan Disetujui Ketua SPI & Penentuan PIC",
    deksripsi: "Ketua SPI menyetujui laporan yang valid dan menunjuk personal/tim SPI sebagai PIC penugasan.",
    color: "bg-gradient-to-r from-green-200 to-green-300"
  },
  {
    id: 4,
    role: "Admin",
    user_status: "Proses",
    tugas: "Membuat Draf Surat Tugas",
    spi_status: "Memiliki Draft Surat Tugas",
    tahap: "Admin Buat Surat Tugas",
    deksripsi: "Admin menyiapkan draft surat tugas berdasarkan laporan yang sudah ditindaklanjuti.",
    color: "bg-gradient-to-r from-yellow-200 to-yellow-300"
  },
  {
    id: 5,
    role: "Sekretaris",
    user_status: "Proses",
    tugas: "Memvalidasi surat tugas yang dibuat oleh Admin",
    spi_status: "Surtug Tervalidasi Sekretaris",
    tahap: "Draft Surat Tugas Diberikan ke Sekretaris",
    deksripsi: "Draft surat tugas diperiksa oleh sekretaris untuk validasi dan persetujuan awal.",
    color: "bg-gradient-to-r from-purple-200 to-purple-300"
  },
  {
    id: 6,
    role: "Ketua SPI",
    user_status: "Memiliki Surat Tugas",
    tugas: "Menyetujui Surat Tugas yang telah divalidasi oleh Sekretaris",
    spi_status: "Surtug Disetujui Ketua",
    tahap: "Diteruskan ke Kepala SPI",
    deksripsi: "Surat tugas yang telah diperiksa sekretaris diserahkan ke Ketua SPI untuk persetujuan final.",
    color: "bg-gradient-to-r from-pink-200 to-pink-300"
  },
  {
    id: 7,
    role: "Admin",
    user_status: "Memiliki Surat Tugas",
    tugas: "Input Nomor Surat",
    spi_status: "Memiliki Nomor Surat",
    tahap: "Penomoran oleh Admin, dan Arsip",
    deksripsi: "Admin memberikan nomor resmi pada surat tugas yang telah disetujui.",
    color: "bg-gradient-to-r from-blue-200 to-blue-300"
  },
  {
    id: 8,
    role: "Anggota SPI",
    user_status: "Draft I",
    tugas: "Membuat Response",
    spi_status: "Selesai Draft",
    tahap: "Penyusunan Draft Laporan Awal",
    deksripsi: "Tim SPI menyusun draft awal laporan hasil pelaksanaan tugas.",
    color: "bg-gradient-to-r from-green-200 to-green-300"
  },
  {
    id: 9,
    role: "Sekretaris",
    user_status: "Draft II",
    tugas: "Menyetujui Respon TIM / PIC",
    spi_status: "Validasi Draft Response",
    tahap: "Validasi Draft Laporan",
    deksripsi: "Sekretaris memeriksa draft laporan, memberi catatan, dan meminta perbaikan bila perlu.",
    color: "bg-gradient-to-r from-yellow-200 to-yellow-300"
  },
  {
    id: 10,
    role: "Ketua SPI",
    user_status: "Tervalidasi Ketua SPI",
    tugas: "Menyetujui Respon TIM / PIC",
    spi_status: "Validasi Response",
    tahap: "Validasi Final oleh Ketua SPI",
    deksripsi: "Ketua SPI melakukan validasi akhir terhadap laporan hasil pekerjaan tim SPI.",
    color: "bg-gradient-to-r from-purple-200 to-purple-300"
  },
  {
    id: 11,
    role: "Admin",
    user_status: "Arsip",
    tugas: "Memasukkan dalam Arsip",
    spi_status: "Selesai",
    tahap: "Arsip Laporan Akhir",
    deksripsi: "Laporan final yang sudah divalidasi disimpan dan diarsipkan sebagai dokumentasi resmi.",
    color: "bg-gradient-to-r from-pink-200 to-pink-300"
  }
]

export const ALUR_KONSULTASI = [
  {
    id: 1,
    role: "User",
    user_status: "Ajuan Baru",
    tugas: "Mengajukan Ajuan Baru",
    spi_status: "Ajuan Baru",
    tahap: "Input Laporan",
    deksripsi: "User atau pihak terkait menginput laporan awal ke sistem.",
    color: "bg-gradient-to-r from-pink-200 to-pink-300"
  },
  {
    id: 2,
    role: "Admin",
    user_status: "Tervalidasi",
    tugas: "Melakukan validasi input user",
    spi_status: "Tervalidasi",
    tahap: "Admin Validasi & Diteruskan ke Ketua SPI",
    deksripsi: "Admin memeriksa dan memvalidasi laporan, lalu meneruskan ke Ketua SPI untuk pemilihan PIC.",
    color: "bg-gradient-to-r from-blue-200 to-blue-300"
  },

  {
    id: 3,
    role: "Sekretaris",
    user_status: "Proses",
    tugas: "Memvalidasi surat tugas yang dibuat oleh Admin",
    spi_status: "Tervalidasi Sekretaris",
    tahap: "Draft Surat Tugas Diberikan ke Sekretaris",
    deksripsi: "Draft surat tugas diperiksa oleh sekretaris untuk validasi dan persetujuan awal.",
    color: "bg-gradient-to-r from-purple-200 to-purple-300"
  },

  {
    id: 4,
    role: "Anggota SPI",
    user_status: "Respon SPI, Selesai",
    tugas: "Membuat Response",
    spi_status: "Penyusunan Respon Konsultasi, Selesai",
    tahap: "Penyusunan Respon Dumas",
    deksripsi: "Tim SPI Telah membuat Respon Konsultasi.",
    color: "bg-gradient-to-r from-green-200 to-green-300"
  }
]
export const ALUR_DUMAS = [
  {
    id: 1,
    role: "User",
    user_status: "Ajuan Baru",
    tugas: "Mengajukan Ajuan Baru",
    spi_status: "Ajuan Baru",
    tahap: "Input Laporan",
    deksripsi: "User atau pihak terkait menginput laporan awal ke sistem.",
    color: "bg-gradient-to-r from-pink-200 to-pink-300"
  },
  {
    id: 2,
    role: "Admin",
    user_status: "Tervalidasi",
    tugas: "Melakukan validasi input user",
    spi_status: "Tervalidasi",
    tahap: "Admin Validasi & Diteruskan ke Ketua SPI",
    deksripsi: "Admin memeriksa dan memvalidasi laporan, lalu meneruskan ke Ketua SPI untuk pemilihan PIC.",
    color: "bg-gradient-to-r from-blue-200 to-blue-300"
  },
  {
    id: 3,
    role: "Ketua SPI",
    user_status: "Proses",
    tugas: "Menyetujui Pelaporan User",
    spi_status: "Tervalidasi Ketua SPI",
    tahap: "Laporan Disetujui Ketua SPI & Penentuan PIC",
    deksripsi: "Ketua SPI menyetujui laporan yang valid dan menunjuk personal/tim SPI sebagai PIC penugasan.",
    color: "bg-gradient-to-r from-green-200 to-green-300"
  },

  {
    id: 4,
    role: "Sekretaris",
    user_status: "Proses",
    tugas: "Memvalidasi surat tugas yang dibuat oleh Admin",
    spi_status: "Sekretaris SPI menyetujui dan menunjuk Tim SPI",
    tahap: "Sekretaris SPI menunjuk Tim SPI yang akan melakukan penugasan (PIC)",
    deksripsi: "Draft surat tugas diperiksa oleh sekretaris untuk validasi dan persetujuan awal.",
    color: "bg-gradient-to-r from-purple-200 to-purple-300"
  },
    {
    id: 5,
    role: "Admin",
    user_status: "Proses Surat Tugas",
    tugas: "Membuat Draf Surat Tugas",
    spi_status: "Memiliki Draft Surat Tugas",
    tahap: "Admin Buat Surat Tugas",
    deksripsi: "Admin menyiapkan draft surat tugas berdasarkan laporan yang sudah ditindaklanjuti.",
    color: "bg-gradient-to-r from-yellow-200 to-yellow-300"
  },
  {
    id: 6,
    role: "Anggota SPI",
    user_status: "Proses Respon",
    tugas: "Membuat Response",
    spi_status: "Selesai Draft Respon DUMAS",
    tahap: "Penyusunan Draft Laporan Awal",
    deksripsi: "Tim SPI menyusun draft awal laporan hasil pelaksanaan tugas.",
    color: "bg-gradient-to-r from-green-200 to-green-300"
  },
  {
    id: 7,
    role: "Sekretaris",
    user_status: "Tervalidasi Sekretaris SPI",
    tugas: "Menyetujui Respon TIM / PIC",
    spi_status: "Validasi Draft Response",
    tahap: "Validasi Draft Laporan",
    deksripsi: "Sekretaris memeriksa draft laporan, memberi catatan, dan meminta perbaikan bila perlu.",
    color: "bg-gradient-to-r from-yellow-200 to-yellow-300"
  },
  {
    id: 8,
    role: "Ketua SPI",
    user_status: "Tervalidasi Ketua SPI",
    tugas: "Menyetujui Respon TIM / PIC",
    spi_status: "Validasi Response",
    tahap: "Validasi Final oleh Ketua SPI",
    deksripsi: "Ketua SPI melakukan validasi akhir terhadap laporan hasil pekerjaan tim SPI.",
    color: "bg-gradient-to-r from-purple-200 to-purple-300"
  },
  {
    id: 9,
    role: "Admin",
    user_status: "Selesai",
    tugas: "Memasukkan dalam Arsip",
    spi_status: "Selesai",
    tahap: "Arsip Laporan Akhir",
    deksripsi: "Laporan final yang sudah divalidasi disimpan dan diarsipkan sebagai dokumentasi resmi.",
    color: "bg-gradient-to-r from-pink-200 to-pink-300"
  }
]


export const ALUR_AUDIT = [
  {
    "id": 1,
    "role": "ketua",
    "tugas": "melakukan pembuatan audit, jenis audit, periode audit",
    "spi_status": "ajuan baru ketua",
    "tahap": "",
    "deksripsi": "",
    "user_status": ""
  },
  {
    "id": 2,
    "role": "sekretaris",
    "tugas": "menunjuk PIC Audit yang terdiri dari Ketua dan Anggota Auditor",
    "spi_status": "tervalidasi sekretaris, dan memiliki PIC",
    "tahap": "",
    "deksripsi": "",
    "user_status": ""
  },
  {
    "id": 3,
    "role": "admin",
    "tugas": "membuat surat tugas atas kegiatan Audit",
    "spi_status": "terbit surat tugas",
    "tahap": "",
    "deksripsi": "",
    "user_status": ""
  },
  {
    "id": 4,
    "role": "spi",
    "tugas": "menyetujui hasil laporan akhir kegiatan Audit",
    "spi_status": "selesai draf laporan audit",
    "tahap": "",
    "deksripsi": "",
    "user_status": ""
  },
  {
    "id": 5,
    "role": "sekretaris",
    "tugas": "melakukan review tahap I, menyatakan menyetujui laporan akhir",
    "spi_status": "sekretaris  menyetujui laporan audit",
    "tahap": "",
    "deksripsi": "",
    "user_status": ""
  },
  {
    "id": 6,
    "role": "ketua",
    "tugas": "melakukan review tahap II, menyatakan menyetujui laporan akhir. Selesai",
    "spi_status": "ketua menyetujui laporan audit, selesai",
    "tahap": "",
    "deksripsi": "",
    "user_status": ""
  }
]

export const ALUR_AUDIT_bak = [
  {
    "id": 1,
    "role": "admin",
    "user_status": "",
    "tugas": "melakukan input audit, dan juga pembuatan draf surat tugas",
    "spi_status": "ajuan baru",
    "tahap": "",
    "deksripsi": ""
  },
  {
    "id": 2,
    "role": "sekretaris",
    "user_status": "",
    "tugas": "melakuan validasi surat tugas dan menentukan PIC",
    "spi_status": "tervalidasi sekretaris, dan memiliki PIC",
    "tahap": "",
    "deksripsi": ""
  },
  {
    "id": 3,
    "role": "ketua",
    "user_status": "",
    "tugas": "menyetujui surat tugas, PIC dengan memberikan ttd",
    "spi_status": "tervalidasi ketua, surat tugas ditandatangani",
    "tahap": "",
    "deksripsi": ""
  },
  {
    "id": 4,
    "role": "Anggota SPI",
    "user_status": "",
    "tugas": "membuat draf laporan / Berita Acara",
    "spi_status": "proses penyusunan draft laporan",
    "tahap": "",
    "deksripsi": ""
  },
  {
    "id": 5,
    "role": "Ketua Koordinator",
    "user_status": "draf kertas kerja disetujui ketua koordinator",
    "tugas": "menyetujui laporan / berita acara",
    "spi_status": "Ketua Koordinator menyetujui laporan / berita acara",
    "tahap": "",
    "deksripsi": ""
  },
  {
    "id": 6,
    "role": "sekretaris",
    "user_status": "",
    "tugas": "menyetujui berita acara audit",
    "spi_status": "kertas kerja disetujui sekretaris",
    "tahap": "",
    "deksripsi": ""
  },
  {
    "id": 7,
    "role": "ketua",
    "user_status": "",
    "tugas": "menyetujui berita acara audit",
    "spi_status": "ketas kerja disetujui ketua",
    "tahap": "",
    "deksripsi": ""
  },
  {
    "id": 8,
    "role": "admin",
    "user_status": "",
    "tugas": "Menyatakan Finis / selesai dengan menjadikan Arsip",
    "spi_status": "Selesai dan diarsipkan",
    "tahap": "",
    "deksripsi": ""
  }
]


export const FILTER_UNIT = (unit) => {
  const n = UINJKTUNIT && UINJKTUNIT.find((it) => it.kode == unit)
  if(n){
    return n?.unit + ` (${unit})`

  }else{
    return 'errrr'
  }
}

export const FILTER_AUDIT = (status_id) => {
  let n= ALUR_AUDIT.find(item => item.id === status_id);
  if(n){
    return n
  }else{
    return 'ERROR'
  }
}
export const FILTER_ALURKONSLAP_USER = (status_id) => {
  let n= ALURKONSLAP.find(item => item.id === status_id);
  if(n){
    return n?.user_status
  }else{
    return 'ERROR'
  }
}
export const FILTER_ALURKONSLAP_SPI = (status_id) => {
  let n= ALURKONSLAP.find(item => item.id === status_id);
  if(n){
    return n?.spi_status
  }else{
    return 'ERROR'
  }
}
export const FILTER_ALURKONSLAP_SPI_DESK = (status_id) => {
  let n= ALURKONSLAP.find(item => item.id === status_id);
  if(n){
    return n?.deksripsi
  }else{
    return 'ERROR'
  }
}
export const FILTER_ALUR_KONSULTASI_USER = (status_id) => {
  let n= ALUR_KONSULTASI.find(item => item.id === status_id);
  if(n){
    return n?.user_status
  }else{
    return 'ERROR'
  }
}
export const FILTER_ALUR_KONSULTASI_SPI = (status_id) => {
  let n= ALUR_KONSULTASI.find(item => item.id === status_id);
  if(n){
    return n?.spi_status
  }else{
    return 'ERROR'
  }
}
export const FILTER_ALUR_KONSULTASI_SPI_DESK = (status_id) => {
  let n= ALUR_KONSULTASI.find(item => item.id === status_id);
  if(n){
    return n?.deksripsi
  }else{
    return 'ERROR'
  }
}
export const FILTER_ALUR_DUMAS_USER = (status_id) => {
  let n= ALUR_DUMAS.find(item => item.id === status_id);
  if(n){
    return n?.user_status
  }else{
    return 'ERROR'
  }
}
export const FILTER_ALUR_DUMAS_SPI = (status_id) => {
  let n= ALUR_DUMAS.find(item => item.id === status_id);
  if(n){
    return n?.spi_status
  }else{
    return 'ERROR'
  }
}
export const FILTER_ALUR_DUMAS_SPI_DESK = (status_id) => {
  let n= ALUR_DUMAS.find(item => item.id === status_id);
  if(n){
    return n?.deksripsi
  }else{
    return 'ERROR'
  }
}
export const FILTER_ALUR_REVDOK = (id) => {
  let n = ALUR_REVDOK.find(it => it.id ==id)
  if(n){
    return n.desc_user
  }else{
    return "Error"
  }
}
export const FILTER_ALUR_REVDOK_USER = (id) => {
  let n = ALUR_REVDOK.find(it => it.id ==id)
  if(n){
    return n.user_status
  }else{
    return "Error"
  }
}
export const FILTER_ALUR_REVDOK_SPI = (id) => {
  let n = ALUR_REVDOK.find(it => it.id ==id)
  if(n){
    return n.spi_status
  }else{
    return "Error"
  }
}
export const FILTER_ALUR_REVDOK_SPI_DESC = (id) => {
  let n = ALUR_REVDOK.find(it => it.id ==id)
  if(n){
    return n.deksripsi
  }else{
    return "Error"
  }
}


export const FILTER_ALUR_AUDIT_SPI = (id) => {
  let n = ALUR_AUDIT.find(it => it.id ==id)
  if(n){
    return n.spi_status
  }else{
    return "Error"
  }
}

export const ALUR_REVDOK = [
  {
    "id": 1,
    "role": "User",
    "user_status": "Ajuan Baru",
    "tugas": "Mengajukan Ajuan Baru",
    "spi_status": "Ajuan Baru",
    "tahap": "Input Laporan",
    "deksripsi": "User atau pihak terkait menginput laporan awal ke sistem.",
    "color": "bg-gradient-to-r from-pink-200 to-pink-300"
  },
  {
    "id": 2,
    "role": "Admin",
    "user_status": "Tervalidasi",
    "tugas": "Melakukan validasi input user",
    "spi_status": "Tervalidasi",
    "tahap": "Admin Validasi & Diteruskan ke Ketua SPI",
    "deksripsi": "Admin memeriksa dan memvalidasi laporan, lalu meneruskan ke Ketua SPI untuk pemilihan PIC.",
    "color": "bg-gradient-to-r from-blue-200 to-blue-300"
  },
  {
    "id": 3,
    "role": "Ketua SPI",
    "user_status": "Proses I",
    "tugas": "Menyetujui Review Dokumen User",
    "spi_status": "Tervalidasi Ketua SPI",
    "tahap": "Laporan Disetujui Ketua SPI & Penentuan PIC",
    "deksripsi": "Ketua SPI menyetujui laporan yang valid dan menunjuk personal/tim SPI sebagai PIC penugasan.",
    "color": "bg-gradient-to-r from-green-200 to-green-300"
  },
  {
    "id": 4,
    "role": "Sekretaris",
    "user_status": "Proses II",
    "tugas": "Menentukan Koordinator / Personal",
    "spi_status": "Memiki PIC",
    "tahap": "Draft Surat Tugas Diberikan ke Sekretaris",
    "deksripsi": "Draft surat tugas diperiksa oleh sekretaris untuk validasi dan persetujuan awal.",
    "color": "bg-gradient-to-r from-purple-200 to-purple-300"
  },
  {
    "id": 5,
    "role": "Anggota SPI",
    "user_status": "Draft I",
    "tugas": "Membuat Response",
    "spi_status": "Selesai Draft",
    "tahap": "Penyusunan Draft Laporan Awal",
    "deksripsi": "Tim SPI menyusun draft awal laporan hasil pelaksanaan tugas.",
    "color": "bg-gradient-to-r from-yellow-200 to-yellow-300"
  },
  {
    "id": 6,
    "role": "Sekretaris",
    "user_status": "Draft II",
    "tugas": "Menyetujui Respon TIM / PIC",
    "spi_status": "Validasi Draft Response",
    "tahap": "Validasi Draft",
    "deksripsi": "Sekretaris memeriksa draft laporan, memberi catatan, dan meminta perbaikan bila perlu.",
    "color": "bg-gradient-to-r from-pink-200 to-pink-300"
  },
  {
    "id": 7,
    "role": "Ketua SPI",
    "user_status": "Tervalidasi Ketua SPI",
    "tugas": "Menyetujui Respon TIM / PIC",
    "spi_status": "Validasi Response",
    "tahap": "Validasi Final oleh Ketua SPI",
    "deksripsi": "Ketua SPI melakukan validasi akhir terhadap laporan hasil pekerjaan tim SPI.",
    "color": "bg-gradient-to-r from-blue-200 to-blue-300"
  },
  {
    "id": 8,
    "role": "Admin",
    "user_status": "Arsip",
    "tugas": "Memberikan Nomor",
    "spi_status": "Selesai",
    "tahap": "Arsip Laporan Akhir",
    "deksripsi": "Laporan final yang sudah divalidasi disimpan dan diarsipkan sebagai dokumentasi resmi.",
    "color": "bg-gradient-to-r from-green-200 to-green-300"
  }
]


export const AUDIT_AO_TEMPLATE = `
<div class="WordSection1">
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal" align="center"><span lang="id">NO. R-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; /SPI/PS.XX.X/XX/XXX</span></p>
<p class="MsoNormal" align="center"><span lang="id">LAPORAN HASIL AUDIT</span></p>
<p class="MsoNormal" align="center"><span lang="id">ATAS &hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;.. </span></p>
<p class="MsoNormal" align="center"><span lang="id">TAHUN ANGGARAN XXXX</span></p>
<p class="MsoNormal" align="center"><span lang="id">SATUAN PENGAWASAN INTERNAL</span></p>
<p class="MsoNormal" align="center"><span lang="id">&nbsp;</span></p>
<p class="MsoNormal" align="center"><strong><span lang="id">BADAN LAYANAN UMUM (BLU)</span></strong></p>
<p class="MsoNormal" align="center"><strong><span lang="id">UNIVERSITAS ISLAM NEGERI (UIN) SYARIF HIDAYATULLAH JAKARTA</span></strong></p>
<p class="MsoNormal"><span lang="id">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></p>
</div>
<p><span lang="id">&nbsp;</span></p>
<p class="MsoNormal" align="center"><strong><span lang="id">DAFTAR ISI</span></strong></p>
<p class="MsoNormal" align="center"><strong><span lang="id">&nbsp;</span></strong></p>
<p class="MsoNormal"><span lang="id">&nbsp;</span></p>
<p class="MsoNormal" align="left"><strong><span lang="id">DAFTAR ISI&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></strong></p>
<p class="MsoNormal" align="left"><strong><span lang="id">DAFTAR TABEL</span></strong></p>
<p class="MsoNormal" align="left"><strong><span lang="id">DAFTAR LAMPIRAN&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></strong></p>
<p class="MsoNormal" align="left"><strong><span lang="id">IKHTISAR EKSEKUTIF&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></strong></p>
<p class="MsoNormal" align="left"><strong><span lang="id">BAB I PENDAHULUAN</span></strong><span lang="id">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></p>
<p class="MsoNormal" align="left"><span lang="id">A. Dasar Hukum&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></p>
<p class="MsoNormal" align="left"><span lang="id">B.&nbsp; Latar Belakang&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></p>
<p class="MsoNormal" align="left"><span lang="id">C. Tujuan Audit</span></p>
<p class="MsoNormal" align="left"><span lang="id">D. Sasaran Audit</span></p>
<p class="MsoNormal" align="left"><span lang="id">E. Metodologi Audit</span></p>
<p class="MsoNormal" align="left"><span lang="id">F. Jangka Waktu Audit</span></p>
<p class="MsoNormal" align="left"><span lang="id">G. Objek Audit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></p>
<p class="MsoNormal" align="left"><strong><span lang="id">BAB II HASIL AUDIT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></strong></p>
<p class="MsoNormal" align="left"><span lang="id">A. Gambaran Umum&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></p>
<p class="MsoNormal" align="left"><span lang="id">B.Uraian Temuan</span></p>
<p class="MsoNormal" align="left"><strong><span lang="id">BAB III SIMPULAN</span></strong></p>
<p class="MsoNormal" align="left"><span lang="id">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></p>
<p class="MsoNormal" align="center"><strong><span lang="id">&nbsp;</span></strong><strong><span lang="id">&nbsp;</span></strong></p>
<p class="MsoNormal" align="center"><strong><span lang="id">&nbsp;</span></strong></p>
<p class="MsoNormal" align="center"><strong><span lang="id">&nbsp;</span></strong></p>
<p class="MsoNormal" style="text-align: center;" align="center"><strong><span lang="id">&nbsp;</span></strong><strong><span lang="id">DAFTAR TABEL</span></strong></p>
<p class="MsoNormal" align="center"><strong><span lang="id">&nbsp;</span></strong></p>
<p class="MsoNormal"><span lang="id">&nbsp;</span></p>
<p class="MsoNormal" align="left"><span lang="id">Tabel</span></p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal" align="center"><span lang="id">&nbsp;</span></p>
<p class="MsoNormal" align="center"><strong><span lang="id">DAFTAR LAMPIRAN</span></strong></p>
<p class="MsoNormal" align="center"><strong><span lang="id">&nbsp;</span></strong></p>
<p class="MsoNormal" align="center"><strong><span lang="id">&nbsp;</span></strong></p>
<p class="MsoNormal" align="center"><strong><span lang="id">&nbsp;</span></strong></p>
<p class="MsoNormal"><span lang="id">Lampiran</span></p>
<p class="MsoNormal" align="center"><strong><span lang="id">&nbsp;</span></strong></p>
<p class="MsoNormal" align="center"><strong><span lang="id">&nbsp;</span></strong></p>
<h1 align="center"><span lang="id">IKHTISAR E</span><span lang="id">KSEKUTIF</span></h1>
<h1 align="center"><span lang="id">&nbsp;HASIL PEMERIKSAAN </span></h1>
<h1 align="center"><span lang="id">FAKULTAS / UNIT &hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;.</span></h1>
<p class="MsoNormal"><span lang="id">&nbsp;</span></p>
<p class="MsoNormal"><span lang="id">Kepada Yth.</span></p>
<p class="MsoNormal"><strong><span lang="id">Rektor</span></strong></p>
<p class="MsoNormal"><strong><span lang="id">UIN Syarif Hidayatullah Jakarta</span></strong></p>
<p class="MsoNormal"><span lang="id">&nbsp;</span></p>
<p class="MsoNormal"><span lang="id">Assalamu&rsquo;alaikum wr. wb.</span></p>
<p class="MsoNormal"><span lang="id">Berdasarkan Surat Tugas Rektor Nomor &hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;.. tanggal &hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip; tentang Audit Pemeriksaan atas &hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;..., bersama ini kami sampaikan beberapa temuan hasil pemeriksaan yang perlu menjadi perhatian, sebagai berikut:</span></p>
<p class="MsoNormal"><!-- [if !supportLists]--><span lang="id">1.&nbsp;&nbsp;&nbsp;&nbsp; </span><!--[endif]--><span lang="id">Terdapat &hellip;&hellip;&hellip;</span></p>
<p class="MsoNormal"><!-- [if !supportLists]--><span lang="id">2.&nbsp;&nbsp;&nbsp;&nbsp; </span><!--[endif]--><span lang="id">Terdapat &hellip;&hellip;...</span></p>
<p class="MsoNormal"><!-- [if !supportLists]--><span lang="id">3.&nbsp;&nbsp;&nbsp;&nbsp; </span><!--[endif]--><span lang="id">&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;..</span></p>
<p class="MsoNormal"><span lang="id">Demikian ikhtisar e</span><span lang="id">ksekutif ini kami sampaikan untuk menjadi perhatian dan tindak lanjut oleh pihak terkait..</span></p>
<p class="MsoNormal"><span lang="id">&nbsp;</span></p>
<p class="MsoNormal"><span lang="id">Wassalammu&rsquo;alaikum wr. wb.</span></p>
<p class="MsoNormal"><span lang="id">&nbsp;</span></p>
<p class="MsoNormal"><strong><span lang="id">Kepala SPI,</span></strong></p>
<p class="MsoNormal"><strong><span lang="id">UIN Syarif Hidayatullah Jakarta</span></strong></p>
<p class="MsoNormal"><span lang="id">&nbsp;</span></p>
<p class="MsoNormal"><span lang="id">&nbsp;</span></p>
<p class="MsoNormal"><strong><span lang="id">Nama</span></strong></p>
<p class="MsoNormal"><strong><span lang="id">NIP.</span></strong></p>
<p class="MsoNormal"><span lang="id">&nbsp;</span></p>
<p class="MsoNormal"><span lang="id">&nbsp;</span></p>
<p class="MsoNormal" align="center"><strong><span lang="id">BAB I</span></strong></p>
<p class="MsoNormal" align="center"><strong><span lang="id">&nbsp;PENDAHULUAN</span></strong></p>
<p class="MsoNormal"><span lang="id">&nbsp;</span></p>
<h3><!-- [if !supportLists]--><span lang="id">A.&nbsp;&nbsp; </span><!--[endif]--><span lang="id">DASAR HUKUM</span></h3>
<p class="MsoNormal"><a name="_heading=h.c1ce8sne93qw"></a><span lang="id">Bagian ini memuat daftar regulasi/peraturan yang menjadi landasan hukum pelaksanaan audit oleh SPI. Ditulis dalam bentuk poin.</span></p>
<p class="MsoNormal"><a name="_heading=h.xog2ua2xdkeu"></a><strong><span lang="id">Rumusan standar:</span></strong></p>
<p class="MsoNormal"><a name="_heading=h.32n35jdsyqo"></a><span lang="id">Peraturan yang melandasi pelaksanaan audit atas &hellip;&hellip;&hellip;&hellip; antara lain:</span></p>
<p class="MsoNormal"><a name="_heading=h.uzvwd3r7iyhe"></a><!-- [if !supportLists]--><span lang="id">1.&nbsp;&nbsp;&nbsp;&nbsp; </span><!--[endif]--><span lang="id">Undang-Undang Nomor &hellip;&hellip;&hellip;&hellip; tentang &hellip;&hellip;&hellip;&hellip;</span></p>
<p class="MsoNormal"><a name="_heading=h.ivnrbxnvzy3v"></a><!-- [if !supportLists]--><span lang="id">2.&nbsp;&nbsp;&nbsp;&nbsp; </span><!--[endif]--><span lang="id">Peraturan Pemerintah Nomor &hellip;&hellip;&hellip;&hellip; tentang &hellip;&hellip;&hellip;&hellip;</span></p>
<p class="MsoNormal"><a name="_heading=h.ma35thft6986"></a><!-- [if !supportLists]--><span lang="id">3.&nbsp;&nbsp;&nbsp;&nbsp; </span><!--[endif]--><span lang="id">Peraturan Presiden Nomor &hellip;&hellip;&hellip;&hellip; tentang &hellip;&hellip;&hellip;&hellip;</span></p>
<p class="MsoNormal"><a name="_heading=h.arpt2wknslm0"></a><!-- [if !supportLists]--><span lang="id">4.&nbsp;&nbsp;&nbsp;&nbsp; </span><!--[endif]--><span lang="id">Peraturan Menteri Agama Republik Indonesia Nomor &hellip;&hellip;&hellip;&hellip; tentang &hellip;&hellip;&hellip;&hellip;</span></p>
<p class="MsoNormal"><a name="_heading=h.jbbgxsuyye1"></a><!-- [if !supportLists]--><span lang="id">5.&nbsp;&nbsp;&nbsp;&nbsp; </span><!--[endif]--><span lang="id">Statuta UIN Syarif Hidayatullah Jakarta &hellip;&hellip;&hellip;&hellip;</span></p>
<p class="MsoNormal"><a name="_heading=h.e2sj93y90ddb"></a><!-- [if !supportLists]--><span lang="id">6.&nbsp;&nbsp;&nbsp;&nbsp; </span><!--[endif]--><span lang="id">Surat Keputusan Rektor UIN Syarif Hidayatullah Jakarta Nomor &hellip;&hellip;&hellip;&hellip; tentang Program Kerja SPI Tahun &hellip;&hellip;&hellip;&hellip;</span></p>
<h3><!-- [if !supportLists]--><span lang="id">B.&nbsp;&nbsp;&nbsp; </span><!--[endif]--><span lang="id">LATAR BELAKANG</span></h3>
<p class="MsoNormal"><span lang="id">Latar belakang berisi alasan dilaksanakannya audit internal oleh SPI. Pada bagian ini dijelaskan peran SPI sebagai aparat pengawasan internal di UIN Syarif Hidayatullah Jakarta, serta konteks audit yang dilakukan.<br><strong>Rumusan standar:</strong></span></p>
<p class="MsoNormal"><span lang="id">Audit internal dilakukan sebagai bagian dari pengawasan rutin SPI untuk memastikan pengelolaan unit &hellip; berjalan sesuai dengan ketentuan peraturan perundang-undangan, kebijakan universitas, dan prinsip tata kelola yang baik. Audit ini juga dilaksanakan untuk memberikan keyakinan memadai terhadap efektivitas pengendalian intern, kepatuhan terhadap peraturan, keandalan laporan, serta efisiensi dan efektivitas pengelolaan sumber daya.</span></p>
<h3><!-- [if !supportLists]--><span lang="id">C.&nbsp;&nbsp; </span><!--[endif]--><span lang="id">TUJUAN AUDIT</span></h3>
<p class="MsoNormal"><span lang="id">Menjelaskan apa yang hendak dicapai dari audit.</span></p>
<p class="MsoNormal"><strong><span lang="id">Rumusan standar:</span></strong></p>
<p class="MsoNormal"><span lang="id">Tujuan pemeriksaan ini adalah untuk menilai:</span></p>
<ol start="1" type="1">
<li class="MsoNormal"><span lang="id">Kepatuhan unit yang diperiksa terhadap peraturan perundang-undangan dan kebijakan universitas.</span></li>
<li class="MsoNormal"><span lang="id">Efektivitas dan efisiensi pelaksanaan kegiatan/anggaran.</span></li>
<li class="MsoNormal"><span lang="id">Keandalan data, laporan, serta pertanggungjawaban yang disusun.</span></li>
<li class="MsoNormal"><span lang="id">Efektivitas sistem pengendalian intern.</span></li>
</ol>
<p class="MsoNormal"><!-- [if !supportLists]--><strong><span lang="id">D.&nbsp;&nbsp; </span></strong><!--[endif]--><strong><span lang="id">SASARAN AUDIT</span></strong></p>
<p class="MsoNormal"><span lang="id">Menjelaskan aspek yang menjadi fokus audit.</span></p>
<p class="MsoNormal"><strong><span lang="id">Rumusan standar:</span></strong></p>
<p class="MsoNormal"><span lang="id">Sasaran audit meliputi aspek kepatuhan, pengendalian intern, efektivitas program/kegiatan, serta keandalan laporan pertanggungjawaban.</span></p>
<p class="MsoNormal"><!-- [if !supportLists]--><strong><span lang="id">E.&nbsp;&nbsp;&nbsp; </span></strong><!--[endif]--><strong><span lang="id">METODOLOGI AUDIT</span></strong></p>
<p class="MsoNormal"><span lang="id">Berisi metode atau cara audit dilaksanakan.</span></p>
<p class="MsoNormal"><strong><span lang="id">Rumusan standar:</span></strong></p>
<p class="MsoNormal"><span lang="id">Metodologi audit yang digunakan meliputi:</span></p>
<ol start="1" type="1">
<li class="MsoNormal"><span lang="id">Telaah dokumen (administrasi dan keuangan).</span></li>
<li class="MsoNormal"><span lang="id">Wawancara dengan pihak terkait.</span></li>
<li class="MsoNormal"><span lang="id">Observasi langsung ke lapangan.</span></li>
<li class="MsoNormal"><span lang="id">Uji petik bukti transaksi dan laporan.</span></li>
<li class="MsoNormal"><span lang="id">Analisis peraturan dan kebijakan terkait.</span></li>
</ol>
<p class="MsoNormal"><!-- [if !supportLists]--><strong><span lang="id">F.&nbsp;&nbsp;&nbsp; </span></strong><!--[endif]--><strong><span lang="id">JANGKA </span><span lang="id">WAKTU AUDIT</span></strong></p>
<p class="MsoNormal"><span lang="id">Menjelaskan waktu pelaksanaan audit serta susunan tim audit yang bertanggung jawab atas kegiatan tersebut. .</span></p>
<p class="MsoNormal"><strong><span lang="id">Rumusan standar:</span></strong></p>
<p class="MsoNormal"><span lang="id">Audit dilaksanakan selama &hellip; hari kerja, mulai tanggal &hellip; sampai dengan &hellip; tahun &hellip;, sesuai dengan Surat Tugas Rektor Nomor &hellip;&hellip;&hellip;&hellip; tanggal &hellip;&hellip;&hellip;&hellip;</span></p>
<p class="MsoNormal"><!-- [if !supportLists]--><strong><span lang="id">G.&nbsp;&nbsp; </span></strong><!--[endif]--><strong><span lang="id">OBJEK PEMERIKSAAN</span></strong></p>
<p class="MsoNormal"><span lang="id">Menjelaskan objek audit.</span></p>
<p class="MsoNormal"><strong><span lang="id">Rumusan standar:</span></strong></p>
<p class="MsoNormal"><span lang="id">Objek pemeriksaan meliputi kegiatan/anggaran/fungsi yang menjadi tanggung jawab Unit/Fakultas &hellip;&hellip;&hellip;&hellip;</span></p>
<p class="MsoNormal"><strong><span lang="id">&nbsp;</span></strong></p>
<h2 align="center"><span lang="id">BAB II&nbsp;</span></h2>
<h2 align="center"><span lang="id">HASIL PDTT</span></h2>
<h3><span lang="id">A. GAMBARAN UMUM</span></h3>
<p class="MsoNormal"><span lang="id">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Bagian ini berfungsi sebagai &ldquo;potret singkat&rdquo; unit atau kegiatan yang diaudit.</span><span lang="id"> Isinya bukan temuan, tapi informasi latar yang penting agar pembaca paham konteks pemeriksaan.</span></p>
<p class="MsoNormal"><strong><span lang="id">Rumusan standar yang perlu dicakup:</span></strong></p>
<ol start="1" type="1">
<li class="MsoNormal"><span lang="id">Identitas unit/fakultas/objek yang diaudit (nama, fungsi, posisi dalam struktur organisasi).</span></li>
<li class="MsoNormal"><span lang="id">Uraian singkat kegiatan/anggaran yang dikelola.</span></li>
<li class="MsoNormal"><span lang="id">Sumber dana (misalnya: BLU, DIPA, hibah, atau kerjasama).</span></li>
<li class="MsoNormal"><span lang="id">Besaran anggaran atau volume kegiatan (bisa disebutkan nominal total, tanpa masuk ke detail temuan).</span></li>
<li class="MsoNormal"><span lang="id">Tujuan kegiatan unit tersebut dalam mendukung visi-misi UIN.</span></li>
</ol>
<p class="MsoNormal"><strong><span lang="id">Contoh rumusan standar (template):</span></strong></p>
<p class="MsoNormal"><span lang="id">Fakultas/Unit &hellip;&hellip;&hellip;&hellip; merupakan salah satu unit kerja di lingkungan UIN Syarif Hidayatullah Jakarta yang memiliki tugas pokok &hellip;&hellip;&hellip;&hellip; dan fungsi &hellip;&hellip;&hellip;&hellip; Dalam Tahun Anggaran &hellip;&hellip;&hellip;&hellip;, unit ini mengelola anggaran sebesar Rp &hellip;&hellip;&hellip;&hellip; yang bersumber dari &hellip;&hellip;&hellip;&hellip; Kegiatan yang dilaksanakan meliputi &hellip;&hellip;&hellip;&hellip; yang bertujuan untuk &hellip;&hellip;&hellip;&hellip;</span></p>
<p class="MsoNormal"><span lang="id">&nbsp;</span></p>
<h3><span lang="id">B. URAIAN TEMUAN</span></h3>
<p class="MsoNormal"><span lang="id">Bagian ini berisi inti laporan audit, yaitu fakta-fakta yang ditemukan selama pemeriksaan. agar seragam, uraian temuan harus mengikuti format standar 5 unsur temuan audit:</span></p>
<p class="MsoNormal"><span lang="id">Kondisi </span></p>
<p class="MsoNormal"><span lang="id">&rarr; Fakta yang ditemukan berdasarkan bukti audit (ditulis objektif, apa adanya).</span></p>
<p class="MsoNormal"><span lang="id">Kriteria</span></p>
<p class="MsoNormal"><span lang="id">&rarr; Aturan/peraturan/kebijakan/SOP yang menjadi tolok ukur.</span></p>
<p class="MsoNormal"><span lang="id">Sebab</span></p>
<p class="MsoNormal"><span lang="id">&rarr; Penyebab mengapa kondisi berbeda dengan kriteria (contoh: lemahnya pengendalian intern, kelalaian SDM, sistem belum optimal).</span></p>
<p class="MsoNormal"><span lang="id">&nbsp;</span></p>
<p class="MsoNormal"><span lang="id">&nbsp;</span><span lang="id">Akibat</span></p>
<p class="MsoNormal"><span lang="id">&rarr; Dampak yang timbul, baik finansial (selisih anggaran, potensi kerugian negara) maupun non-finansial (menurunnya kepatuhan, risiko pelayanan tidak efektif).</span></p>
<p class="MsoNormal"><span lang="id">Rekomendasi</span></p>
<p class="MsoNormal"><span lang="id">&rarr; Usulan langkah perbaikan yang bersifat spesifik, realistis, dan bisa ditindaklanjuti oleh unit terkait.</span></p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">&nbsp;</p>
<h2 align="center"><span lang="id">BAB III</span></h2>
<p class="MsoNormal" align="center"><strong><span lang="id">SIMPULAN</span></strong></p>
<p class="MsoNormal"><strong><span lang="id">Ringkasan umum</span></strong></p>
<p class="MsoNormal"><span lang="id">Berdasarkan hasil audit internal yang telah dilaksanakan pada Unit/Fakultas &hellip;&hellip;&hellip;&hellip; untuk periode &hellip;&hellip;&hellip;&hellip;, dapat disimpulkan bahwa secara umum pengelolaan &hellip;&hellip;&hellip;&hellip; telah berjalan (sesuai/tidak sepenuhnya sesuai) dengan ketentuan peraturan perundang-undangan dan kebijakan universitas.</span></p>
<p class="MsoNormal"><strong><span lang="id">Apresiasi</span></strong></p>
<p class="MsoNormal"><span lang="id">SPI memberikan apresiasi kepada Unit/Fakultas &hellip;&hellip;&hellip;&hellip; atas upaya yang telah dilakukan dalam mengelola kegiatan/anggaran, khususnya pada aspek &hellip;&hellip;&hellip;&hellip; yang sudah berjalan dengan baik. Komitmen unit dalam mendukung transparansi dan akuntabilitas perlu terus dipertahankan serta ditingkatkan.</span></p>
<p class="MsoNormal"><strong><span lang="id">Pernyataan Tindak Lanjut</span></strong></p>
<p class="MsoNormal"><span lang="id">Dengan memperhatikan temuan tersebut, diperlukan komitmen dari Unit/Fakultas &hellip;&hellip;&hellip;&hellip; untuk menindaklanjuti rekomendasi yang diberikan SPI, guna meningkatkan akuntabilitas, transparansi, dan efektivitas tata kelola di lingkungan UIN Syarif Hidayatullah Jakarta.</span></p>
<p class="MsoNormal"><strong><span lang="id">Penutup</span></strong></p>
<p class="MsoNormal"><span lang="id">Demikian laporan hasil audit internal ini disusun sebagai bahan pertimbangan dan tindak lanjut oleh pihak terkait.</span></p>
<p class="MsoNormal"><span lang="id">&nbsp;</span></p>
`



export const REVDOK_SURAT_NOMINAL = `
<p><span style="font-size: 10pt; font-family: arial, helvetica, sans-serif;"> </span></p>
<p><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">Kepada Yth,<br data-start="68" data-end="71"><strong data-start="71" data-end="112">Wakil Rektor Bidang Administrasi Umum</strong><br data-start="112" data-end="115">Jl. Ir. H. Juanda Nomor 95</span></p>
<p><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;"><span style="text-decoration: none; caret-color: rgb(0, 0, 0);">Kami telah melaksanakan penelaahan dan analisa atas dokumen dan/atau proses/kegiatan/prosedur/sistem. Objek penelaahan dan analisa dengan deskripsi sbb:</span><br></span></p>
<table style="width: 809px; height: 76px;">
<tbody>
<tr>
<td><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;"><span style="text-decoration: none; caret-color: rgb(0, 0, 0);">Deskripsi Konsultansi</span><br></span></td>
<td><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">:</span></td>
<td><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;"><span style="text-decoration: none; caret-color: rgb(0, 0, 0);">Reviu draft surat pemberitahuan reviu anggaran 2026 dan efisiensi anggaran</span><br></span></td>
</tr>
<tr>
<td><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;"><span style="text-decoration: none; caret-color: rgb(0, 0, 0);">Unit&nbsp;&nbsp;</span><br></span></td>
<td><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">:</span></td>
<td><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;"><span style="text-decoration: none; caret-color: rgb(0, 0, 0);">Biro Perencanaan dan Keuangan</span><br></span></td>
</tr>
<tr>
<td><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;"><span style="text-decoration: none; caret-color: rgb(0, 0, 0);">Nominal</span><br></span></td>
<td><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">:</span></td>
<td><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">&nbsp;-</span></td>
</tr>
</tbody>
</table>
<h3 style="text-decoration: none; caret-color: rgb(0, 0, 0);" data-start="471" data-end="491"><strong><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">HASIL PENELAAHAN</span></strong></h3>
<table style="width: 809px; height: 75px;">
<tbody>
<tr style="height: 37.5px;">
<td><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;"><strong><span style="text-decoration: none; caret-color: rgb(0, 0, 0);">1. Aspek yang ditelaah</span></strong><br></span></td>
<td><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">:</span></td>
<td><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">Aspek keuangan dan kesesuaian dengan Peraturan yang berlaku</span></td>
</tr>
<tr style="height: 37.5px;">
<td><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;"><strong><span style="text-decoration: none; caret-color: rgb(0, 0, 0);">2. Lingkup penelaahan</span></strong><br></span></td>
<td><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">:</span></td>
<td><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;"><span style="text-decoration: none; caret-color: rgb(0, 0, 0);">Reviu draft surat pemberitahuan reviu anggaran 2026 dan efisiensi anggaran</span><br></span></td>
</tr>
</tbody>
</table>
<p><span style="text-decoration: none; caret-color: rgb(0, 0, 0); font-size: 10pt; font-family: arial, helvetica, sans-serif;"> </span></p>
<h3 style="text-decoration: none; caret-color: rgb(0, 0, 0);" data-start="689" data-end="703"><strong><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">3. Kondisi</span></strong></h3>
<p><span style="font-size: 10pt; font-family: arial, helvetica, sans-serif;">Berdasarkan hasil analisis dokumen "Reviu draft surat pemberitahuan reviu anggaran 2026 dan efisiensi anggaran", terdapat beberapa hal yang kami telaah antara lain:</span></p>
<p><span style="font-size: 10pt; font-family: arial, helvetica, sans-serif;"> </span></p>
<p><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">A. Terdapat memo dari Wakil Rektor Bidang Administrasi Umum permohonan reviu draft surat pemberitahuan/instruksi perihal peningkatan efisiensi (draft surat pemberitahuan penyusunan anggaran 2026) per tanggal 18 Juni 2026</span></p>
<p><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">B. Terdapat lampiran draft surat pemberitahuan/instruksi perihal peningkatan efisiensi (draft surat pemberitahuan penyusunan anggaran 2026) yang dibuat oleh Biro Perencanaan dan Keuangan.</span></p>
<h3 style="text-decoration: none; caret-color: rgb(0, 0, 0);" data-start="1286" data-end="1299"><strong><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">4. Temuan</span></strong></h3>
<div class="_tableContainer_sk2ct_1" style="text-decoration: none; caret-color: rgb(0, 0, 0);">
<div class="_tableWrapper_sk2ct_13 group flex w-fit flex-col-reverse" tabindex="-1">
<table class="w-fit min-w-(--thread-content-width)" style="border-collapse: collapse; border-width: 1px;" border="1" data-start="1301" data-end="2130">
<thead data-start="1301" data-end="1384">
<tr data-start="1301" data-end="1384">
<th style="border-width: 1px;" data-start="1301" data-end="1306" data-col-size="sm"><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">No</span></th>
<th style="border-width: 1px;" data-start="1306" data-end="1339" data-col-size="lg"><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">Redaksi di Surat Pemberitahuan</span></th>
<th style="text-align: center; border-width: 1px;" data-start="1339" data-end="1361" data-col-size="sm"><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">Nomor Urut di draft</span></th>
<th style="text-align: center; border-width: 1px;" data-start="1361" data-end="1384" data-col-size="xl"><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">Temuan/ Rekomendasi</span></th>
</tr>
</thead>
<tbody data-start="1471" data-end="2130">
<tr style="text-align: center;" data-start="1471" data-end="1881">
<td style="border-width: 1px;" data-start="1471" data-end="1475" data-col-size="sm"><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">1</span></td>
<td style="text-align: left; border-width: 1px;" data-start="1475" data-end="1593" data-col-size="lg"><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">Penggunaan pagu diprioritaskan untuk membiayai kebutuhan rutin dan prioritas; diutamakan dialokasikan pada dana BLU</span></td>
<td style="border-width: 1px;" data-start="1593" data-end="1597" data-col-size="sm"><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">2</span></td>
<td style="text-align: left; border-width: 1px;" data-start="1597" data-end="1881" data-col-size="xl"><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">Dibuat pemisahan redaksi antara lain: 1. Setiap perencanaan anggaran harus selaras dengan program prioritas Rektor serta mendukung capaian Indikator Kinerja Utama (IKU) fakultas/unit 2. Anggaran BLU diprioritaskan untuk mendanai kegiatan-kegiatan strategis/prioritas fakultas/unit</span></td>
</tr>
<tr data-start="1882" data-end="2130">
<td style="text-align: center; border-width: 1px;" data-start="1882" data-end="1886" data-col-size="sm"><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">2</span></td>
<td style="text-align: left; border-width: 1px;" data-start="1886" data-end="2039" data-col-size="lg"><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">Penyusunan Rencana Kebutuhan BMN (RK BMN) untuk sewa kendaraan, belanja kendaraan dan belanja gedung disusun pada tahun 2024 dan ditetapkan tahun 2026</span></td>
<td style="text-align: center; border-width: 1px;" data-start="2039" data-end="2043" data-col-size="sm"><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">4</span></td>
<td style="text-align: left; border-width: 1px;" data-start="2043" data-end="2130" data-col-size="xl"><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">Belum menambahkan penyusunan RK BMN tahun 2026 yang akan ditetapkan pada tahun 2026</span></td>
</tr>
</tbody>
</table>
</div>
<div class="_tableWrapper_sk2ct_13 group flex w-fit flex-col-reverse" tabindex="-1">&nbsp;</div>
<div class="_tableWrapper_sk2ct_13 group flex w-fit flex-col-reverse" tabindex="-1"><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;"><strong data-start="59" data-end="77">5. REKOMENDASI</strong><br data-start="77" data-end="80">Satuan Pengawasan Internal (SPI) UIN Jakarta telah melakukan monev atas "Reviu draft surat pemberitahuan reviu anggaran 2026 dan efisiensi anggaran", antara lain:</span>
<ol style="text-decoration: none; caret-color: rgb(0, 0, 0);" data-start="245" data-end="495">
<li style="font-size: 10pt; font-family: arial, helvetica, sans-serif;" data-start="245" data-end="389"><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">Bagian perencanaan melakukan analisis kembali atas pembuatan draft surat pemberitahuan instruksi rektor tentang kebijakan penganggaran 202</span></li>
<li style="font-size: 10pt; font-family: arial, helvetica, sans-serif;" data-start="245" data-end="389"><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">Bagian perencanaan melakukan perbaikan dan tindak lanjut atas temuan/ rekomendasi berdasarkan poin 4</span></li>
</ol>
</div>
</div>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
`

export const REVDOK_LHR = `
<p style="line-height: 1;"><span style="font-size: 10pt; font-family: arial, helvetica, sans-serif;"> </span></p>
<h3 class="MsoNormal" align="center"><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;"><span style="font-size: 14pt;"><strong>LEMBAR HASIL REVIU DAN KONSULTANSI</strong></span><br><span style="font-size: 14pt;"><strong>SATUAN PENGAWASAN INTERNAL (SPI)</strong></span><br><span style="font-size: 14pt;"><strong>TAHUN ANGGARAN 2025</strong></span><br data-start="68" data-end="71"></span></h3>
<p>&nbsp;</p>
<p style="line-height: 1;"><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">Kepada Yth.<br>&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;<br>UIN Syarif Hidayatullah Jakarta<br>di -<br>&nbsp; &nbsp; &nbsp; Tempat<br></span></p>
<p style="line-height: 1;">&nbsp;</p>
<p style="line-height: 1;"><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">Kami telah melaksanakan penelaahan dan analisa atas dokumen dan/atau proses/kegiatan/prosedur/sistem. Objek penelaahan dan analisa dengan deskripsi sbb:</span></p>
<table style="width: 809px; height: 76px;">
<tbody>
<tr>
<td><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;"><span style="text-decoration: none; caret-color: rgb(0, 0, 0);">Deskripsi Konsultansi</span><br></span></td>
<td><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">:</span></td>
<td><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;"><span style="text-decoration: none; caret-color: rgb(0, 0, 0);">Reviu draft surat pemberitahuan reviu anggaran 2026 dan efisiensi anggaran</span><br></span></td>
</tr>
<tr>
<td><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;"><span style="text-decoration: none; caret-color: rgb(0, 0, 0);">Unit&nbsp;&nbsp;</span><br></span></td>
<td><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">:</span></td>
<td><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;"><span style="text-decoration: none; caret-color: rgb(0, 0, 0);">Biro Perencanaan dan Keuangan</span><br></span></td>
</tr>
<tr>
<td><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;"><span style="text-decoration: none; caret-color: rgb(0, 0, 0);">Nominal</span><br></span></td>
<td><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">:</span></td>
<td><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">&nbsp;-</span></td>
</tr>
</tbody>
</table>
<h3 style="text-decoration: none; caret-color: rgb(0, 0, 0); line-height: 1;" data-start="471" data-end="491"><strong><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">HASIL PENELAAHAN</span></strong></h3>
<table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 99.920635%;"></colgroup>
<tbody>
<tr>
<td><strong>1. ASPEK YANG DITELAAH</strong></td>
</tr>
<tr>
<td>Aspek &hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;.. (aspek atau bidang yang menjadi objek reviu. Contoh format penulisan: &ldquo;Aspek pengelolaan kas dan rekonsiliasi bank&rdquo; / &ldquo;Aspek kepatuhan terhadap prosedur pengadaan barang/jasa )</td>
</tr>
<tr>
<td><strong>2. LINGKUP PENELAHAAN</strong></td>
</tr>
<tr>
<td>Permohonan reviu&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;. (Uraikan ruang lingkup reviu, meliputi periode, jenis kegiatan, atau permohonan reviu dari unit terkait. Contoh format penulisan: &ldquo;Permohonan reviu atas laporan pertanggungjawaban kegiatan bulan Januari&ndash;Maret 2025)</td>
</tr>
<tr>
<td><strong>3. TEMUAN</strong></td>
</tr>
<tr>
<td>Pedoman penulisan temuan wajib mencakup unsur berikut:<br>Kondisi &rarr; apa yang ditemukan (fakta).&nbsp;Berdasarkan hasil analisis dokumen "&hellip;.....", terdapat beberapa hal yang kami telaah antara lain :&nbsp;<br>(Jelaskan fakta hasil analisis dokumen/proses yang diperoleh selama reviu dan diuraikan dalam poin-poin (A, B, C, dst)).<br>Kriteria &rarr; aturan/SOP yang seharusnya.<br>Format penulisan: poin A, B, C sesuai jumlah temuan.<br>Bila ada nominal, tuliskan dalam format: Rp xxx.xxx.xxx,00.</td>
</tr>
<tr>
<td><strong>4. REKOMENDASI</strong></td>
</tr>
<tr>
<td><strong>Pedoman penulisan rekomendasi harus bersifat:<br>Spesifik &rarr; menyebutkan tindakan nyata yang harus dilakukan.<br>Terukur &rarr; jelas indikator keberhasilannya.<br></strong></td>
</tr>
</tbody>
</table>
<p style="line-height: 1;">&nbsp;</p>
<p style="line-height: 1;">&nbsp;</p>
<p style="line-height: 1;">&nbsp;</p>
`

export const REVDOK_SURAT_NONNOMINAL = `<p data-start="59" data-end="192"><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">Kepada Yth.</span><br data-start="70" data-end="73"><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;"><strong>Kepala Biro Administrasi Umum dan Kepegawaian</strong></span><br data-start="118" data-end="121"><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;"><strong>c.q Ketua Tim Kerja SDM</strong></span><br data-start="144" data-end="147"><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">UIN Syarif Hidayatullah Jakarta</span><br data-start="178" data-end="181"><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">di Tempat</span></p>
<p data-start="194" data-end="223"><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;"><strong data-start="194" data-end="221">Assalamu&rsquo;alaikum wr. wb</strong></span></p>
<p data-start="225" data-end="598"><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">Sehubungan dengan Surat Nomor B-5130/B.I/KP.01/08/2025 tentang permohonan reviu atas permohonan penetapan SK tentang Pedoman Penilaian Kinerja Pegawai berdasarkan Indikator Kinerja Individu pada Rumah Sakit UIN Syarif Hidayatullah Jakarta, Badan Layanan Umum UIN Syarif Hidayatullah Jakarta, telah kami lakukan reviu atas pengajuan tersebut, dengan hasil sebagai berikut:</span></p>
<ol data-start="600" data-end="1461">
<li style="font-family: arial, helvetica, sans-serif; font-size: 10pt;" data-start="600" data-end="1461">
<p data-start="603" data-end="1461"><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">Pada pedoman penilaian kinerja pegawai RS UIN Syarif Hidayatullah Jakarta, aspek-aspek penilaian kinerja struktural dan staf sudah mencerminkan beberapa perspektif dari teknik penilaian <em data-start="789" data-end="809">Balance Score Card</em>. Namun dalam mekanisme penilaiannya belum mencerminkan keempat perspektif yang ada pada <em data-start="898" data-end="918">Balance Score Card</em>. Pada pedoman hanya mencantumkan tiga perspektif <em data-start="968" data-end="988">Balance Score Card</em>, yaitu perspektif pelanggan, proses bisnis dan pembelajaran. Terdapat satu perspektif teknik <em data-start="1082" data-end="1102">Balance Score Card</em> yang belum dijelaskan secara eksplisit/jelas yaitu mengenai perspektif keuangan. Padahal RS UIN Syarif Hidayatullah Jakarta sebagai salah satu unit usaha bisnis yang dimiliki oleh UIN Jakarta dan berperan sebagai <em data-start="1316" data-end="1333">income generate</em>. Di sisi lain Kontrak Kinerja Direktur RS UIN Syarif Hidayatullah Jakarta juga memiliki target berupa jumlah pendapatan PNBP,</span></p>
</li>
</ol>`


export const BA_AUDIT_STOCK = `
<h2 style="text-align: center; line-height: 1;"><span style="font-family: arial, helvetica, sans-serif;">BERITA ACARA PEMERIKSAAN FISIK BARANG PERSEDIAAN</span></h2>
<h2 style="text-align: center; line-height: 1;"><span style="font-family: arial, helvetica, sans-serif;"><em>(Stock Opname)</em></span></h2>
<p>&nbsp;</p>
<p><span style="font-family: arial, helvetica, sans-serif;">Pada hari ini <strong>Selasa</strong>, tanggal <strong>10 Juni 2025</strong> Dimulai pukul <strong>11.25</strong> sampai dengan pukul <strong>11.45</strong>, di Ruang <span style="color: rgb(224, 62, 45);"><strong>Gudang Pendidikan FAH</strong></span> Sebagai tempat penyimpanan fisik barang persediaan Fakultas/Unit <strong>FAH</strong>, kami yang bertanda tangan di bawah ini:</span></p>
<p><span style="font-family: arial, helvetica, sans-serif;">1. Nama: Mufti Rahmatika</span><br><span style="font-family: arial, helvetica, sans-serif;">Jabatan: ...........................................................</span></p>
<p><span style="font-family: arial, helvetica, sans-serif;">2. Nama: Adam Nurdiansyah</span><br><span style="font-family: arial, helvetica, sans-serif;">Jabatan: ...........................................................</span></p>
<p><span style="font-family: arial, helvetica, sans-serif;">Telah melaksanakan pemeriksaan fisik barang persediaan Fakultas/Unit <strong>FAH</strong> yang dilaksanakan oleh:</span></p>
<p><span style="font-family: arial, helvetica, sans-serif;">1. Nama: Rahmad Hidayat</span><br><span style="font-family: arial, helvetica, sans-serif;">Jabatan: Pengelola Barang Persediaan</span></p>
<p><span style="font-family: arial, helvetica, sans-serif;">Selaku pemegang dan pengelola barang persediaan, dengan kondisi sebagaimana terlampir:</span></p>
<table style="border-collapse: collapse; width: 100.75188%; height: 377.5625px;" border="0" data-mce-id="__mce"><colgroup><col style="width: 41.0401%;"><col style="width: 27.318296%;"><col style="width: 31.578947%;"></colgroup>
<tbody>
<tr style="height: 32.78125px;">
<td>&nbsp;</td>
<td>&nbsp;</td>
<td><span style="font-family: arial, helvetica, sans-serif;">Tanggal, <strong>10 Juni 2025</strong></span></td>
</tr>
<tr style="height: 159.78125px;">
<td>
<p><span style="font-family: arial, helvetica, sans-serif;">Pengelola/Petugas Persediaan: </span></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><span style="font-family: arial, helvetica, sans-serif;">(..............................)</span></p>
</td>
<td>&nbsp;</td>
<td><span style="font-family: arial, helvetica, sans-serif;">Tim Audit:</span><br><span style="font-family: arial, helvetica, sans-serif;">1. ..................................</span><br><span style="font-family: arial, helvetica, sans-serif;">2. ..................................</span></td>
</tr>
<tr style="height: 185px;">
<td>
<p><span style="font-family: arial, helvetica, sans-serif;">&nbsp;</span></p>
</td>
<td style="text-align: center;">
<p><span style="font-family: arial, helvetica, sans-serif;">Mengetahui,</span><br><br></p>
<p>&nbsp;</p>
<p><br><span style="font-family: arial, helvetica, sans-serif;">(..............................)</span><br><span style="font-family: arial, helvetica, sans-serif;">Ihsan Husnan</span></p>
</td>
<td><span style="font-family: arial, helvetica, sans-serif;">&nbsp;</span></td>
</tr>
</tbody>
</table>
<p><span style="font-family: arial, helvetica, sans-serif;"></span></p>
<p style="text-align: right;">&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p style="margin-top: 40px; text-align: center;">&nbsp;</p>

`


export const BA_AUDIT_KAS = `<h2 style="text-align: center; line-height: 1;"><span style="font-family: arial, helvetica, sans-serif;">BERITA ACARA PEMERIKSAAN KAS OPNAME</span></h2>
<p>&nbsp;</p>
<p><span style="font-family: arial, helvetica, sans-serif;">Pada hari ini <strong>Selasa</strong>, tanggal <strong>10 Juni 2025</strong> Dimulai pukul <strong>11.25</strong> sampai dengan pukul <strong>11.45</strong>, di Ruang <span style="color: rgb(224, 62, 45);"><strong>Gudang Pendidikan FAH</strong></span>, telah dilakukan pemeriksaan phisik atas KAS yang dikelola oleh Bendahara......:</span></p>
<p><span style="font-family: arial, helvetica, sans-serif;">Pemeriksaan dilakukan oleh:</span></p>
<table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 50%;"><col style="width: 50%;"></colgroup>
<tbody>
<tr>
<td><span style="font-family: arial, helvetica, sans-serif;">1. Nama: Mufti Rahmatika</span><br><span style="font-family: arial, helvetica, sans-serif;">Jabatan: ...........................................................</span></td>
<td><span style="font-family: arial, helvetica, sans-serif;">2. Nama: Adam Nurdiansyah</span><br><span style="font-family: arial, helvetica, sans-serif;">Jabatan: ...........................................................</span></td>
</tr>
</tbody>
</table>
<p><span style="font-family: arial, helvetica, sans-serif;">Disaksikan oleh:</span></p>
<table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 50%;"><col style="width: 50%;"></colgroup>
<tbody>
<tr>
<td><span style="font-family: arial, helvetica, sans-serif;">1. Nama: Mufti Rahmatika</span><br><span style="font-family: arial, helvetica, sans-serif;">Jabatan: ...........................................................</span></td>
<td><span style="font-family: arial, helvetica, sans-serif;">2. Nama: Adam Nurdiansyah</span><br><span style="font-family: arial, helvetica, sans-serif;">Jabatan: ...........................................................</span></td>
</tr>
</tbody>
</table>
<p>Hasil pemeriksaan terlampir.<br>Demikian Berita Acara ini dibuat untuk dapat dipergunakan seperlunya.</p>
<p>&nbsp;</p>
<table style="border-collapse: collapse; width: 100.75188%; height: 377.5625px;" border="0" data-mce-id="__mce"><colgroup><col style="width: 41.0401%;"><col style="width: 27.318296%;"><col style="width: 31.578947%;"></colgroup>
<tbody>
<tr style="height: 32.78125px;">
<td>&nbsp;</td>
<td>&nbsp;</td>
<td><span style="font-family: arial, helvetica, sans-serif;">Tanggal, <strong>10 Juni 2025</strong></span></td>
</tr>
<tr style="height: 159.78125px;">
<td>
<p><span style="font-family: arial, helvetica, sans-serif;">Pengelola/Petugas Persediaan: </span></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><span style="font-family: arial, helvetica, sans-serif;">(..............................)</span></p>
</td>
<td>&nbsp;</td>
<td><span style="font-family: arial, helvetica, sans-serif;">Tim Audit:</span><br><span style="font-family: arial, helvetica, sans-serif;">1. ..................................</span><br><span style="font-family: arial, helvetica, sans-serif;">2. ..................................</span></td>
</tr>
<tr style="height: 185px;">
<td>
<p><span style="font-family: arial, helvetica, sans-serif;">&nbsp;</span></p>
</td>
<td style="text-align: center;">
<p><span style="font-family: arial, helvetica, sans-serif;">Mengetahui,</span><br><br></p>
<p>&nbsp;</p>
<p><br><span style="font-family: arial, helvetica, sans-serif;">(..............................)</span><br><span style="font-family: arial, helvetica, sans-serif;">Nama Saya</span></p>
</td>
<td><span style="font-family: arial, helvetica, sans-serif;">&nbsp;</span></td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>
<p style="text-align: right;">&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p style="margin-top: 40px; text-align: center;">&nbsp;</p>
`

// Laporan bisa dari=> 1. User, 2. personal SPI, 3. 4. simdumas