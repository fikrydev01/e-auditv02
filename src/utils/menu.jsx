import {
  Binoculars,
  BookOpen,
  Eye,
  FerrisWheel,
  Flag,
  House,
  Pyramid,
  School,
  UmbrellaOff,
  Users,
  UserSearch,
  View,
  Volume2,
  Wallet2,
} from "lucide-react";
export const menuItem = [
  {
    title: "Dashboard",
    path: "/u/d",
    role: "user, admin, ketua, sekretaris, spi",
    icon: "House",
  },
  {
    title: "Survei",
    path: "/u/survei",
    role: "user",
    icon: "LandPlot",
  },
  {
    title: "Wiki",
    path: "/u/wiki",
    role: "user",
    icon: "Volume2",
  },
  {
    title: "Konsultasi",
    path: "/a/kons",
    role: "admin",
    icon: "BookOpen",
  },
  {
    title: "Laporan",
    path: "/a/lap",
    role: "admin",
    icon: "BookOpen",
  },
  {
    title: "Pengawasan",
    path: "/a/peng",
    role: "admin",
    icon: "Binoculars",
  },
  {
    title: "Review Dokumen",
    path: "/a/revdok",
    role: "admin",
    icon: "Pyramid",
  },
  {
    title: "Audit",
    path: "/a/audit",
    role: "admin",
    icon: "Pyramid",
  },
  {
    title: "Manajemen Resiko",
    path: "/a/mr",
    role: "admin",
    icon: "UmbrellaOff",
  },
  {
    title: "Manajemen Non-Akademik",
    path: "/a/menoak",
    role: "admin",
    icon: "School",
  },
  {
    title: "Monev Keuangan",
    path: "/a/mkeu",
    role: "admin",
    icon: "Wallet2",
  },
  {
    // seperti pelanggaran kode etik.
    title: "Monev SDM",
    path: "/a/msdm",
    role: "admin",
    icon: "UserSearch",
  },

  {
    title: "Konfigurasi Users",
    path: "/a/users",
    role: "admin",
    icon: "Users",
  },
  // KETUA SEKRETARIA
  {
    title: "Konsultasi",
    path: "/k/kons",
    role: "ketua, sekretaris",
    icon: "House",
  },
  {
    title: "Laporan",
    path: "/k/lap",
    role: "ketua, sekretaris",
    icon: "House",
  },
  {
    title: "Review Dokumen",
    path: "/k/revdok",
    role: "ketua, sekretaris",
    icon: "Pyramid",
  },
      {
    title: "Audit",
    path: "/k/audit",
    role: "ketua, sekretaris",
    icon: "Pyramid",
  },
  {
    title: "Manajemen Resiko",
    path: "/k/mr",
    role: "ketua, sekretaris",
    icon: "UmbrellaOff",
  },
  {
    title: "Manajemen Non-Akademik",
    path: "/k/menoak",
    role: "ketua, sekretaris",
    icon: "School",
  },
  {
    title: "Monev Keuangan",
    path: "/k/mkeu",
    role: "ketua, sekretaris",
    icon: "Wallet2",
  },
  {
    // seperti pelanggaran kode etik.
    title: "Monev SDM",
    path: "/k/msdm",
    role: "ketua, sekretaris",
    icon: "UserSearch",
  },
  // END KETUA SEKRETARIA
  {
    // Terbit berita acara atau artikel untuk wikipedia
    title: "Konslap Reviewer",
    path: "/s/konsrev",
    role: "spi",
    icon: "Flag",
  },
  {
    title: "Pengawasan",
    path: "/s/pengawasan",
    role: "spi",
    icon: "Binoculars",
  },
  {
    title: "Review Dokumen",
    path: "/s/revdok",
    role: "spi",
    icon: "Pyramid",
  },
    {
    title: "Audit",
    path: "/s/audit",
    role: "spi",
    icon: "Pyramid",
  },
  {
    title: "Monev Keuangan",
    path: "/s/mkeu",
    role: "spi",
    icon: "Wallet2",
  },
  {
    // seperti pelanggaran kode etik.
    title: "Monev SDM",
    path: "/s/msdm",
    role: "spi",
    icon: "UserSearch",
  },
  {
    // Peta resiko berdasarkan tahun
    title: "Manajemen Resiko",
    path: "/s/mr",
    role: "spi",
    icon: "UmbrellaOff",
  },
  {
    // Peta resiko berdasarkan tahun
    title: "Manajemen Non-Akademik",
    path: "/s/menoak",
    role: "spi",
    icon: "School",
  },
];
