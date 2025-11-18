

export const QR_URL_CONVERTER = () => {

}

export const CURRENT_YEAR = new Date().getFullYear();

  export const FORMAT_RP = (num) => {
    if (!num) return "";
    return new Intl.NumberFormat('id-ID').format(num);
  };
export const SPI_DIVISI = [
  {
    id: 1,
    label: "Divisi 1"
  },
  {
    id: 2,
    label: "Divisi 2"
  },
  {
    id: 3,
    label: "Divisi 3"
  },
  {
    id: 4,
    label: "Divisi 4"
  },
  {
    id: 5,
    label: "Divisi 5"
  },
  {
    id: 6,
    label: "Divisi 6"
  },
]


export const UINJKTUNIT = [
  { "kode": "uin", "unit": "UIN Jakarta" },
  { "kode": "br-aakk", "unit": "Biro - AAKK" },
  { "kode": "br-auk", "unit": "Biro - AUK" },
  { "kode": "br-pk", "unit": "Biro - PK" },
  { "kode": "ukpbj", "unit": "Unit Kerja Pengadaan Barang dan Jasa (UKPBJ)" },
  { "kode": "senat", "unit": "Senat" },
  { "kode": "ftk", "unit": "Fakultas Ilmu Tarbiyah dan Keguruan" },
  { "kode": "fsh", "unit": "Fakultas Syariah dan Hukum" },
  { "kode": "fisip", "unit": "Fakultas Ilmu Sosial dan Ilmu Politik" },
  { "kode": "fst", "unit": "Fakultas Sains dan Teknologi" },
  { "kode": "fikes", "unit": "Fakultas Ilmu Kesehatan" },
  { "kode": "feb", "unit": "Fakultas Ekonomi dan Bisnis" },
  { "kode": "fpsi", "unit": "Fakultas Psikologi" },
  { "kode": "fah", "unit": "Fakultas Adab dan Humaniora" },
  { "kode": "fu", "unit": "Fakultas Ushuluddin" },
  { "kode": "fdi", "unit": "Fakultas Dirasat Islamiyah" },
  { "kode": "fdik", "unit": "Fakultas Dakwah dan Ilmu Komunikasi" },
  { "kode": "sps", "unit": "Sekolah Pasca Sarjana" },
  { "kode": "lp2m", "unit": "Lembaga - Penelitian dan Pengabdian Masyarakat (LP2M)" },
  { "kode": "lpm", "unit": "Lembaga - Penjaminan Mutu (LPM)" },
  { "kode": "spi", "unit": "Satuan Pengawasan Internal (SPI)" },
  { "kode": "upt-bisnis", "unit": "UPT - Pusat Pengembangan Bisnis" },
  { "kode": "upt-perpus", "unit": "UPT - Perpustakaan" },
  { "kode": "upt-pustipanda", "unit": "UPT - Pustipanda" },
  { "kode": "upt-bahasa", "unit": "UPT - Pusat Pengembangan Bahasa" },
  { "kode": "upt-mahad", "unit": "UPT - Pusat Mahad Al-Jami'ah" },
  { "kode": "syahida", "unit": "Syahida Inn dan NICT" },
  { "kode": "kopertais", "unit": "Kopertais" },
  { "kode": "rs-syarif", "unit": "Rumah Sakit Syarif Hidayatullah" },
  { "kode": "rs-haji", "unit": "Rumah Sakit Haji" }
]

export const FILTER_UINJKTUNIT = (kode_unit) => {
  const n = UINJKTUNIT.find(it => it.kode == kode_unit)
  if(n){
    return n?.unit
  }else{
    return "Error Unit"
  }
}

export const KATEGORIPELAPORAN = [
  'penyalahgunaan wewenang',
  'korupsi',
  'pungli',
  'gratifikasi',
  'kepegawaian',
  'barang milik negara',
];


export const filterPelaporKategori = (kode) => {
  let n = pelaporKategori && pelaporKategori.find(it => it.kode.toLowerCase().includes(kode))
  if (n) {
    return n?.deskripsi
  } else {
    return ""
  }
}


export const pelaporKategori = [
  {
    "kode": "puin",
    "deskripsi": "Personal UIN Jakarta"
  },
  {
    "kode": "pext",
    "deskripsi": "Personal selain UIN Jakarta"
  },
  {
    "kode": "external",
    "deskripsi": "Eksternal (di luar UIN Jakarta)"
  }
]

export const auditJenis = [
  {
    id: 1,
    kode: "kepatuhan",
    keterangan: "Audit Kepatuhan",
  },
  {
    id: 2,
    kode: "gajian",
    keterangan: "Audit Gajian",
  },
  {
    id: 3,
    kode: "barang",
    keterangan: "Audit Barang",
  },
  {
    id: 4,
    kode: "all",
    keterangan: "Audit Siapa aja",
  },
];

export const kategoriPembayaran = [
  // jenis 1 = Konsultasi jenis 2= laporan
  {
    id: 1,
    jenis_id: 1,
    keterangan: "Pembayaran Remun",
  },
  {
    id: 2,
    jenis_id: 2,
    keterangan: "Pembayaran Gaji",
  },
  {
    id: 3,
    jenis_id: 3,
    keterangan: "Pembayaran Hutang",
  },
  {
    id: 4,
    jenis_id: 4,
    keterangan: "Pembayaran Rumah Berjangka",
  },
];

export const TEMPLATE_SURTUG = `<table style="width: 100%; border-collapse: collapse; font-size: 14px;" border="1">
  <tbody>
    <tr>
      <td style="vertical-align: top; font-weight: bold; padding: 6px;">Menimbang</td>
      <td style="padding: 6px;">
        bahwa untuk pemenuhan terhadap prinsip efektif, efisien dan ekonomis serta kepatuhan pelaksanaan anggaran.
        Satuan Pengawasan Internal (SPI) sebagai unsur pengawas akan melakukan <em>Cash Opname</em> Bulan Maret Tahun Anggaran 2025,
        untuk itu perlu diterbitkan surat tugas.
      </td>
    </tr>
    <tr>
      <td style="vertical-align: top; font-weight: bold; padding: 6px;">Dasar</td>
      <td style="padding: 6px;">
        Peraturan Menteri Agama Nomor 25 Tahun 2017 tentang Satuan Pengawasan Internal pada Perguruan Tinggi Keagamaan Negeri.
      </td>
    </tr>
    <tr>
      <td style="vertical-align: top; font-weight: bold; padding: 6px;">Kepada</td>
      <td style="padding: 6px;">
        <strong>Pengendali Mutu</strong>: Dr. Yulianti, M.Si., CGAE., CFA., CPAM<br />
        <strong>Pengendali Teknis</strong>: Ahmad Afandi, SE., ME., CRMP., PIA., CFA., CPIA<br />
        <strong>Ketua Tim</strong>: Zena, SE, M.Ak., CAP., CPIA., CFA<br />
        <strong>Anggota Tim</strong>:<br />
        - Yudi Setiadi, SE., ME., CRMP., CFA., CPIA<br />
        - Dian Naddyrah, SE., M.Ak., CPIA., CFA<br />
        - ⁠Adam Nurdiansyah., S.Akun<br />
        - ⁠Caesar Permata Sari., S.AB<br />
        - ⁠Nur Najmi Muthia., S.E<br />
        - ⁠Niko Partogi Bonatuna Sihalolo., S.E<br />
        - ⁠M. Rahmat Yani., S.H<br />
        - ⁠Arief Bhayu Wicaksono., S.Kom<br />
        - Eka Fitri Yanti., SE., CPIA., CFA<br />
      </td>
    </tr>
    <tr>
      <td style="vertical-align: top; font-weight: bold; padding: 6px;">Untuk</td>
      <td style="padding: 6px;">
        Melaksanakan Penugasan Pendampingan Pemeriksaan BPK-RI untuk melakukan <em>Cash Opname</em> Bulan Maret Tahun Anggaran 2025 pada tanggal 19–20 Maret 2025.
      </td>
    </tr>
    <tr>
      <td style="vertical-align: top; font-weight: bold; padding: 6px;">Sumber Biaya</td>
      <td style="padding: 6px;">
        DIPA BLU UIN Syarif Hidayatullah Jakarta.
      </td>
    </tr>
  </tbody>
</table>`;

export const TEMPLATE_REVDOK_NOMINAL_BAK = `
  <table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 7.857143%;"><col style="width: 2.063492%;"><col style="width: 90%;"></colgroup>
<tbody>
<tr>
<td>Nomor</td>
<td>:</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>Lampiran</td>
<td>:</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>
<p style="text-align: center;"><strong>LAPORAN HASIL REVIU</strong><br data-start="440" data-end="443"><strong>SATUAN PENGAWASAN INTERNAL (SPI)</strong><br data-start="479" data-end="482"><strong>Tahun Anggaran 2025</strong></p>
<p style="text-align: justify;">&nbsp;</p>
<p style="text-align: justify;">Kepada Yth:<br data-start="524" data-end="527"><strong>Wakil Rektor Bidang Administrasi Umum</strong><br data-start="564" data-end="567">Jl. Ir. H. Djuanda No. 95, Ciputat, Kota Tangerang Selatan 15412</p>
<p style="text-align: justify;">&nbsp;</p>
<p style="text-align: justify;">Kami telah melaksanakan penelaahan dan analisa atas dokumen dan/atau proses/kegiatan/prosedur/sistem. Objek penelaahan nda analisa dengan deskripsi sbb:</p>
<table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 18.968254%;"><col style="width: 4.047619%;"><col style="width: 76.904762%;"></colgroup>
<tbody>
<tr>
<td><strong>Deskripsi Konsultansi</strong></td>
<td>:</td>
<td>&nbsp;</td>
</tr>
<tr>
<td><strong>Jumlah Pengajuan</strong></td>
<td>:</td>
<td>&nbsp;</td>
</tr>
<tr>
<td><strong>Unit</strong></td>
<td>:</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>
<p style="text-align: justify;"><strong>HASIL PENELAHAAN</strong></p>
<table style="border-collapse: collapse; width: 100%; height: 143.125px;" border="1"><colgroup><col style="width: 2.301587%;"><col style="width: 16.746032%;"><col style="width: 4.047619%;"><col style="width: 76.825397%;"></colgroup>
<tbody>
<tr style="height: 35.78125px;">
<td><strong>1.</strong></td>
<td><strong>Aspek yang ditelaah:</strong></td>
<td>:</td>
<td>&nbsp;</td>
</tr>
<tr style="height: 35.78125px;">
<td><strong>2.</strong></td>
<td><strong>Lingkup penelaahan</strong></td>
<td>:</td>
<td>&nbsp;</td>
</tr>
<tr style="height: 35.78125px;">
<td><strong>3.</strong></td>
<td><strong>KONDISI</strong></td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td><strong>&nbsp;</strong></td>
<td><strong>&nbsp;</strong></td>
<td>&nbsp;</td>
<td>
<p>Berdasarkan hasil analisis dokumen pengajuan tagihan utang <strong>Rs Haji </strong>atas alat kesehatan Ventilator <strong>PT</strong>. , terdapat beberapa hal yang kami telaah antara lain :</p>
<p data-start="1116" data-end="1226">a. Tahun 2024: PT Gelora Prima Sarana belum menerima info dari RS Haji mengenai proses pembayaran utang oleh UIN.</p>
<p data-start="1229" data-end="1294">b. Dokumen tagihan senilai Rp10.315.800 baru dikirim 9 Januari 2025.</p>
<p data-start="1229" data-end="1294">c. Anggaran pembayaran utang di UIN hanya tersedia sampai Desember 2024.</p>
</td>
</tr>
<tr style="height: 35.78125px;">
<td><strong>4.</strong></td>
<td><strong>REKOMENDASI</strong></td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td><strong>&nbsp;</strong></td>
<td><strong>&nbsp;</strong></td>
<td>&nbsp;</td>
<td>Hal-hal yang dapat kami rekomendasikan, antara lain:<br>1 Nominal tagihan sebesar Rp10.315.800 yang disampaikan oleh PT Gelora Prima Sarana telah sesuai dengan hasil review utang yang dilakukan olch SPI UIN Syarif Hidayatullah Jakarta pada tahun 2024 dan sudah tertuang pada berita Acara wawancara, serta<br>didukung oleh kelengkapan dokumen tagihan.<br>2 Karena anggaran pembayaran utang di UNI Syarif Hidayatulah Jakarta telah ditutup per Desember 2024, pembayaran ventilator senilai Rp10.315.800 kepada TP Gelora Prima Sarana dibayarkan oleh RS Haji Jakarta.</td>
</tr>
</tbody>
</table>
<p style="text-align: justify;">Jakarta, 21 April 2025</p>
<table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 25%;"><col style="width: 25%;"><col style="width: 50%;"></colgroup>
<tbody>
<tr>
<td>Disahkah Oleh:</td>
<td>Direviu Oleh:</td>
<td>Dilaksanakan Oleh:</td>
</tr>
<tr>
<td>ttd insert</td>
<td>ttd insert</td>
<td>ttd insert</td>
</tr>
<tr>
<td>Nama</td>
<td>Nama</td>
<td>Nama</td>
</tr>
<tr>
<td>NIP</td>
<td>NIP</td>
<td>NIP.</td>
</tr>
</tbody>
</table>
  `

const currentYear = new Date().getFullYear();
const tanggalIndonesia = new Date().toLocaleDateString('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export const TEMPLATE_REVDOK_NONNOMINAL = `
<p style="text-align: justify;"><strong>Kepada Yth.</strong></p>
<p style="text-align: justify;"><strong>Wakil Rektor II Bidang Administasi Umum</strong></p>
<p style="text-align: justify;"><strong>di Tempat</strong></p>
<p style="text-align: justify; line-height: 1;"><br><strong>Assalamu'alaikum Wr.Wb</strong></p>
<p style="text-align: justify; line-height: 1;">&nbsp;</p>
<p style="text-align: justify; line-height: 1;"><br>Sehubungan dengan pengusulan KS Pedoman Pengelolaan Kepegawaian Rumah&nbsp;Sakit Haji Jakarta UNI Syarif Hidayatulah Jakarta. Setelah menelaah dokumen yang&nbsp;dilampirkan dan juga melihat pada beberapa peraturan yang terkait, terdapat beberapa&nbsp;catatan dalam penyusunan proses tersebut. Adapun catatan tersebut adalah sebagai berikut:</p>
<ol>
<li style="text-align: justify; line-height: 1;">Dalam batang tubuh mengenai dengan peraturan yang dirujuk tidak perlu mencantumkan KMA 1 Tahun 2019 tentang Pemberian Tunjangan Kinerja Pegawai pada Kementerian Agama dikarenakan UIN Syarif Hidayatullah Jakarta tidak menggunakan skema Tunjangan Kinerja.</li>
</ol>
`

export const TEMPLATE_REVDOK_NOMINAL = `
<p style="text-align: center;"><strong>LAPORAN HASIL REVIU</strong><br data-start="440" data-end="443"><strong>SATUAN PENGAWASAN INTERNAL (SPI)</strong><br data-start="479" data-end="482"><strong>Tahun Anggaran ${currentYear}</strong></p>
<p style="text-align: justify;">&nbsp;</p>
<p style="text-align: justify;">Kepada Yth:<br data-start="524" data-end="527"><strong>Wakil Rektor Bidang Administrasi Umum</strong><br data-start="564" data-end="567">Jl. Ir. H. Djuanda No. 95, Ciputat, Kota Tangerang Selatan 15412</p>
<p style="text-align: justify;">&nbsp;</p>
<p style="text-align: justify;">Kami telah melaksanakan penelaahan dan analisa atas dokumen dan/atau proses/kegiatan/prosedur/sistem. Objek penelaahan nda analisa dengan deskripsi sbb:</p>
<table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 18.968254%;"><col style="width: 4.047619%;"><col style="width: 76.904762%;"></colgroup>
<tbody>
<tr>
<td><strong>Deskripsi Konsultansi</strong></td>
<td>:</td>
<td>&nbsp;</td>
</tr>
<tr>
<td><strong>Jumlah Pengajuan</strong></td>
<td>:</td>
<td>&nbsp;</td>
</tr>
<tr>
<td><strong>Unit</strong></td>
<td>:</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>
<p style="text-align: justify;"><strong>HASIL PENELAHAAN</strong></p>
<table style="border-collapse: collapse; width: 100%; height: 143.125px;" border="1"><colgroup><col style="width: 2.301587%;"><col style="width: 16.746032%;"><col style="width: 4.047619%;"><col style="width: 76.825397%;"></colgroup>
<tbody>
<tr style="height: 35.78125px;">
<td><strong>1.</strong></td>
<td><strong>Aspek yang ditelaah:</strong></td>
<td>:</td>
<td>&nbsp;</td>
</tr>
<tr style="height: 35.78125px;">
<td><strong>2.</strong></td>
<td><strong>Lingkup penelaahan</strong></td>
<td>:</td>
<td>&nbsp;</td>
</tr>
<tr style="height: 35.78125px;">
<td><strong>3.</strong></td>
<td><strong>KONDISI</strong></td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td><strong>&nbsp;</strong></td>
<td><strong>&nbsp;</strong></td>
<td>&nbsp;</td>
<td>
<p>Berdasarkan hasil analisis dokumen pengajuan tagihan utang <strong>Rs Haji </strong>atas alat kesehatan Ventilator <strong>PT</strong>. , terdapat beberapa hal yang kami telaah antara lain :</p>
<p data-start="1116" data-end="1226">a. Tahun 2024: PT Gelora Prima Sarana belum menerima info dari RS Haji mengenai proses pembayaran utang oleh UIN.</p>
<p data-start="1229" data-end="1294">b. Dokumen tagihan senilai Rp10.315.800 baru dikirim 9 Januari 2025.</p>
<p data-start="1229" data-end="1294">c. Anggaran pembayaran utang di UIN hanya tersedia sampai Desember 2024.</p>
</td>
</tr>
<tr style="height: 35.78125px;">
<td><strong>4.</strong></td>
<td><strong>REKOMENDASI</strong></td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td><strong>&nbsp;</strong></td>
<td><strong>&nbsp;</strong></td>
<td>&nbsp;</td>
<td>Hal-hal yang dapat kami rekomendasikan, antara lain:<br>1 Nominal tagihan sebesar Rp10.315.800 yang disampaikan oleh PT Gelora Prima Sarana telah sesuai dengan hasil review utang yang dilakukan olch SPI UIN Syarif Hidayatullah Jakarta pada tahun 2024 dan sudah tertuang pada berita Acara wawancara, serta<br>didukung oleh kelengkapan dokumen tagihan.<br>2 Karena anggaran pembayaran utang di UNI Syarif Hidayatulah Jakarta telah ditutup per Desember 2024, pembayaran ventilator senilai Rp10.315.800 kepada TP Gelora Prima Sarana dibayarkan oleh RS Haji Jakarta.</td>
</tr>
</tbody>
</table>
<p style="text-align: justify;">Jakarta, ${tanggalIndonesia}</p>
<table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 25%;"><col style="width: 25%;"><col style="width: 50%;"></colgroup>
<tbody>
<tr>
<td>Disahkah Oleh:</td>
<td>Direviu Oleh:</td>
<td>Dilaksanakan Oleh:</td>
</tr>
<tr>
<td>ttd insert</td>
<td>ttd insert</td>
<td>ttd insert</td>
</tr>
<tr>
<td>Nama</td>
<td>Nama</td>
<td>Nama</td>
</tr>
<tr>
<td>NIP</td>
<td>NIP</td>
<td>NIP.</td>
</tr>
</tbody>
</table>
  `