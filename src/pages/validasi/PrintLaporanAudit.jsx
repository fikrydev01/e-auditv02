import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { APP_MAIN_URL, fetchData } from "../../utils/api";
import { FILTER_UNIT, FORMAT_DATE_IND } from "../../constant/data";
import KopSurat from "../../components/KopSurat";
import QrcodeComp from "../../components/QrcodeComp";
import { PrinterCheckIcon } from "lucide-react";
import { FILTER_UINJKTUNIT, UINJKTUNIT } from "../../utils/spi";
import KopSuratSpi from "../../components/KopSuratSpi";

const PrintLaporanAudit = () => {
  const content = `<div class="WordSection1"> <p class="MsoNormal">&nbsp;</p> <p class="MsoNormal" align="center"><span lang="id">NO. R-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; /SPI/PS.XX.X/XX/XXX</span></p> <p class="MsoNormal" align="center"><span lang="id">LAPORAN HASIL AUDIT</span></p> <p class="MsoNormal" align="center"><span lang="id">ATAS &hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;.. </span></p> <p class="MsoNormal" align="center"><span lang="id">TAHUN ANGGARAN XXXX</span></p> <p class="MsoNormal" align="center"><span lang="id">SATUAN PENGAWASAN INTERNAL</span></p> <p class="MsoNormal" align="center"><span lang="id">&nbsp;</span></p> <p class="MsoNormal" align="center"><strong><span lang="id">BADAN LAYANAN UMUM (BLU)</span></strong></p> <p class="MsoNormal" align="center"><strong><span lang="id">UNIVERSITAS ISLAM NEGERI (UIN) SYARIF HIDAYATULLAH JAKARTA</span></strong></p> <p class="MsoNormal"><span lang="id">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></p> </div> <p><span lang="id">&nbsp;</span></p> <p class="MsoNormal" align="center"><strong><span lang="id">DAFTAR ISI</span></strong></p> <p class="MsoNormal" align="center"><strong><span lang="id">&nbsp;</span></strong></p> <p class="MsoNormal"><span lang="id">&nbsp;</span></p> <p class="MsoNormal" align="left"><strong><span lang="id">DAFTAR ISI&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></strong></p> <p class="MsoNormal" align="left"><strong><span lang="id">DAFTAR TABEL</span></strong></p> <p class="MsoNormal" align="left"><strong><span lang="id">DAFTAR LAMPIRAN&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></strong></p> <p class="MsoNormal" align="left"><strong><span lang="id">IKHTISAR EKSEKUTIF&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></strong></p> <p class="MsoNormal" align="left"><strong><span lang="id">BAB I PENDAHULUAN</span></strong><span lang="id">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></p> <p class="MsoNormal" align="left"><span lang="id">A. Dasar Hukum&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></p> <p class="MsoNormal" align="left"><span lang="id">B.&nbsp; Latar Belakang&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></p> <p class="MsoNormal" align="left"><span lang="id">C. Tujuan Audit</span></p> <p class="MsoNormal" align="left"><span lang="id">D. Sasaran Audit</span></p> <p class="MsoNormal" align="left"><span lang="id">E. Metodologi Audit</span></p> <p class="MsoNormal" align="left"><span lang="id">F. Jangka Waktu Audit</span></p> <p class="MsoNormal" align="left"><span lang="id">G. Objek Audit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></p> <p class="MsoNormal" align="left"><strong><span lang="id">BAB II HASIL AUDIT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></strong></p> <p class="MsoNormal" align="left"><span lang="id">A. Gambaran Umum&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></p> <p class="MsoNormal" align="left"><span lang="id">B.Uraian Temuan</span></p> <p class="MsoNormal" align="left"><strong><span lang="id">BAB III SIMPULAN</span></strong></p> <p class="MsoNormal" align="left"><span lang="id">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></p> <p class="MsoNormal" align="center"><strong><span lang="id">&nbsp;</span></strong><strong><span lang="id">&nbsp;</span></strong></p> <p class="MsoNormal" align="center"><strong><span lang="id">&nbsp;</span></strong></p> <p class="MsoNormal" align="center"><strong><span lang="id">&nbsp;</span></strong></p> <p class="MsoNormal" style="text-align: center;" align="center"><strong><span lang="id">&nbsp;</span></strong><strong><span lang="id">DAFTAR TABEL</span></strong></p> <p class="MsoNormal" align="center"><strong><span lang="id">&nbsp;</span></strong></p> <p class="MsoNormal"><span lang="id">&nbsp;</span></p> <p class="MsoNormal" align="left"><span lang="id">Tabel</span></p> <p class="MsoNormal">&nbsp;</p> <p class="MsoNormal" align="center"><span lang="id">&nbsp;</span></p> <p class="MsoNormal" align="center"><strong><span lang="id">DAFTAR LAMPIRAN</span></strong></p> <p class="MsoNormal" align="center"><strong><span lang="id">&nbsp;</span></strong></p> <p class="MsoNormal" align="center"><strong><span lang="id">&nbsp;</span></strong></p> <p class="MsoNormal" align="center"><strong><span lang="id">&nbsp;</span></strong></p> <p class="MsoNormal"><span lang="id">Lampiran</span></p> <p class="MsoNormal" align="center"><strong><span lang="id">&nbsp;</span></strong></p> <p class="MsoNormal" align="center"><strong><span lang="id">&nbsp;</span></strong></p> <h1 align="center"><span lang="id">IKHTISAR E</span><span lang="id">KSEKUTIF</span></h1> <h1 align="center"><span lang="id">&nbsp;HASIL PEMERIKSAAN </span></h1> <h1 align="center"><span lang="id">FAKULTAS / UNIT &hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;.</span></h1> <p class="MsoNormal"><span lang="id">&nbsp;</span></p> <p class="MsoNormal"><span lang="id">Kepada Yth.</span></p> <p class="MsoNormal"><strong><span lang="id">Rektor</span></strong></p> <p class="MsoNormal"><strong><span lang="id">UIN Syarif Hidayatullah Jakarta</span></strong></p> <p class="MsoNormal"><span lang="id">&nbsp;</span></p> <p class="MsoNormal"><span lang="id">Assalamu&rsquo;alaikum wr. wb.</span></p> <p class="MsoNormal"><span lang="id">Berdasarkan Surat Tugas Rektor Nomor &hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;.. tanggal &hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip; tentang Audit Pemeriksaan atas &hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;..., bersama ini kami sampaikan beberapa temuan hasil pemeriksaan yang perlu menjadi perhatian, sebagai berikut:</span></p> <p class="MsoNormal"><!-- [if !supportLists]--><span lang="id">1.&nbsp;&nbsp;&nbsp;&nbsp; </span><!--[endif]--><span lang="id">Terdapat &hellip;&hellip;&hellip;</span></p> <p class="MsoNormal"><!-- [if !supportLists]--><span lang="id">2.&nbsp;&nbsp;&nbsp;&nbsp; </span><!--[endif]--><span lang="id">Terdapat &hellip;&hellip;...</span></p> <p class="MsoNormal"><!-- [if !supportLists]--><span lang="id">3.&nbsp;&nbsp;&nbsp;&nbsp; </span><!--[endif]--><span lang="id">&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;..</span></p> <p class="MsoNormal"><span lang="id">Demikian ikhtisar e</span><span lang="id">ksekutif ini kami sampaikan untuk menjadi perhatian dan tindak lanjut oleh pihak terkait..</span></p> <p class="MsoNormal"><span lang="id">&nbsp;</span></p> <p class="MsoNormal"><span lang="id">Wassalammu&rsquo;alaikum wr. wb.</span></p> <p class="MsoNormal"><span lang="id">&nbsp;</span></p> <p class="MsoNormal"><strong><span lang="id">Kepala SPI,</span></strong></p> <p class="MsoNormal"><strong><span lang="id">UIN Syarif Hidayatullah Jakarta</span></strong></p> <p class="MsoNormal"><span lang="id">&nbsp;</span></p> <p class="MsoNormal"><span lang="id">&nbsp;</span></p> <p class="MsoNormal"><strong><span lang="id">Nama</span></strong></p> <p class="MsoNormal"><strong><span lang="id">NIP.</span></strong></p> <p class="MsoNormal"><span lang="id">&nbsp;</span></p> <p class="MsoNormal"><span lang="id">&nbsp;</span></p> <p class="MsoNormal" align="center"><strong><span lang="id">BAB I</span></strong></p> <p class="MsoNormal" align="center"><strong><span lang="id">&nbsp;PENDAHULUAN</span></strong></p> <p class="MsoNormal"><span lang="id">&nbsp;</span></p> <h3><!-- [if !supportLists]--><span lang="id">A.&nbsp;&nbsp; </span><!--[endif]--><span lang="id">DASAR HUKUM</span></h3> <p class="MsoNormal"><a name="_heading=h.c1ce8sne93qw"></a><span lang="id">Bagian ini memuat daftar regulasi/peraturan yang menjadi landasan hukum pelaksanaan audit oleh SPI. Ditulis dalam bentuk poin.</span></p> <p class="MsoNormal"><a name="_heading=h.xog2ua2xdkeu"></a><strong><span lang="id">Rumusan standar:</span></strong></p> <p class="MsoNormal"><a name="_heading=h.32n35jdsyqo"></a><span lang="id">Peraturan yang melandasi pelaksanaan audit atas &hellip;&hellip;&hellip;&hellip; antara lain:</span></p> <p class="MsoNormal"><a name="_heading=h.uzvwd3r7iyhe"></a><!-- [if !supportLists]--><span lang="id">1.&nbsp;&nbsp;&nbsp;&nbsp; </span><!--[endif]--><span lang="id">Undang-Undang Nomor &hellip;&hellip;&hellip;&hellip; tentang &hellip;&hellip;&hellip;&hellip;</span></p> <p class="MsoNormal"><a name="_heading=h.ivnrbxnvzy3v"></a><!-- [if !supportLists]--><span lang="id">2.&nbsp;&nbsp;&nbsp;&nbsp; </span><!--[endif]--><span lang="id">Peraturan Pemerintah Nomor &hellip;&hellip;&hellip;&hellip; tentang &hellip;&hellip;&hellip;&hellip;</span></p> <p class="MsoNormal"><a name="_heading=h.ma35thft6986"></a><!-- [if !supportLists]--><span lang="id">3.&nbsp;&nbsp;&nbsp;&nbsp; </span><!--[endif]--><span lang="id">Peraturan Presiden Nomor &hellip;&hellip;&hellip;&hellip; tentang &hellip;&hellip;&hellip;&hellip;</span></p> <p class="MsoNormal"><a name="_heading=h.arpt2wknslm0"></a><!-- [if !supportLists]--><span lang="id">4.&nbsp;&nbsp;&nbsp;&nbsp; </span><!--[endif]--><span lang="id">Peraturan Menteri Agama Republik Indonesia Nomor &hellip;&hellip;&hellip;&hellip; tentang &hellip;&hellip;&hellip;&hellip;</span></p> <p class="MsoNormal"><a name="_heading=h.jbbgxsuyye1"></a><!-- [if !supportLists]--><span lang="id">5.&nbsp;&nbsp;&nbsp;&nbsp; </span><!--[endif]--><span lang="id">Statuta UIN Syarif Hidayatullah Jakarta &hellip;&hellip;&hellip;&hellip;</span></p> <p class="MsoNormal"><a name="_heading=h.e2sj93y90ddb"></a><!-- [if !supportLists]--><span lang="id">6.&nbsp;&nbsp;&nbsp;&nbsp; </span><!--[endif]--><span lang="id">Surat Keputusan Rektor UIN Syarif Hidayatullah Jakarta Nomor &hellip;&hellip;&hellip;&hellip; tentang Program Kerja SPI Tahun &hellip;&hellip;&hellip;&hellip;</span></p> <h3><!-- [if !supportLists]--><span lang="id">B.&nbsp;&nbsp;&nbsp; </span><!--[endif]--><span lang="id">LATAR BELAKANG</span></h3> <p class="MsoNormal"><span lang="id">Latar belakang berisi alasan dilaksanakannya audit internal oleh SPI. Pada bagian ini dijelaskan peran SPI sebagai aparat pengawasan internal di UIN Syarif Hidayatullah Jakarta, serta konteks audit yang dilakukan.<br><strong>Rumusan standar:</strong></span></p> <p class="MsoNormal"><span lang="id">Audit internal dilakukan sebagai bagian dari pengawasan rutin SPI untuk memastikan pengelolaan unit &hellip; berjalan sesuai dengan ketentuan peraturan perundang-undangan, kebijakan universitas, dan prinsip tata kelola yang baik. Audit ini juga dilaksanakan untuk memberikan keyakinan memadai terhadap efektivitas pengendalian intern, kepatuhan terhadap peraturan, keandalan laporan, serta efisiensi dan efektivitas pengelolaan sumber daya.</span></p> <h3><!-- [if !supportLists]--><span lang="id">C.&nbsp;&nbsp; </span><!--[endif]--><span lang="id">TUJUAN AUDIT</span></h3> <p class="MsoNormal"><span lang="id">Menjelaskan apa yang hendak dicapai dari audit.</span></p> <p class="MsoNormal"><strong><span lang="id">Rumusan standar:</span></strong></p> <p class="MsoNormal"><span lang="id">Tujuan pemeriksaan ini adalah untuk menilai:</span></p> <ol start="1" type="1"> <li class="MsoNormal"><span lang="id">Kepatuhan unit yang diperiksa terhadap peraturan perundang-undangan dan kebijakan universitas.</span></li> <li class="MsoNormal"><span lang="id">Efektivitas dan efisiensi pelaksanaan kegiatan/anggaran.</span></li> <li class="MsoNormal"><span lang="id">Keandalan data, laporan, serta pertanggungjawaban yang disusun.</span></li> <li class="MsoNormal"><span lang="id">Efektivitas sistem pengendalian intern.</span></li> </ol> <p class="MsoNormal"><!-- [if !supportLists]--><strong><span lang="id">D.&nbsp;&nbsp; </span></strong><!--[endif]--><strong><span lang="id">SASARAN AUDIT</span></strong></p> <p class="MsoNormal"><span lang="id">Menjelaskan aspek yang menjadi fokus audit.</span></p> <p class="MsoNormal"><strong><span lang="id">Rumusan standar:</span></strong></p> <p class="MsoNormal"><span lang="id">Sasaran audit meliputi aspek kepatuhan, pengendalian intern, efektivitas program/kegiatan, serta keandalan laporan pertanggungjawaban.</span></p> <p class="MsoNormal"><!-- [if !supportLists]--><strong><span lang="id">E.&nbsp;&nbsp;&nbsp; </span></strong><!--[endif]--><strong><span lang="id">METODOLOGI AUDIT</span></strong></p> <p class="MsoNormal"><span lang="id">Berisi metode atau cara audit dilaksanakan.</span></p> <p class="MsoNormal"><strong><span lang="id">Rumusan standar:</span></strong></p> <p class="MsoNormal"><span lang="id">Metodologi audit yang digunakan meliputi:</span></p> <ol start="1" type="1"> <li class="MsoNormal"><span lang="id">Telaah dokumen (administrasi dan keuangan).</span></li> <li class="MsoNormal"><span lang="id">Wawancara dengan pihak terkait.</span></li> <li class="MsoNormal"><span lang="id">Observasi langsung ke lapangan.</span></li> <li class="MsoNormal"><span lang="id">Uji petik bukti transaksi dan laporan.</span></li> <li class="MsoNormal"><span lang="id">Analisis peraturan dan kebijakan terkait.</span></li> </ol> <p class="MsoNormal"><!-- [if !supportLists]--><strong><span lang="id">F.&nbsp;&nbsp;&nbsp; </span></strong><!--[endif]--><strong><span lang="id">JANGKA </span><span lang="id">WAKTU AUDIT</span></strong></p> <p class="MsoNormal"><span lang="id">Menjelaskan waktu pelaksanaan audit serta susunan tim audit yang bertanggung jawab atas kegiatan tersebut. .</span></p> <p class="MsoNormal"><strong><span lang="id">Rumusan standar:</span></strong></p> <p class="MsoNormal"><span lang="id">Audit dilaksanakan selama &hellip; hari kerja, mulai tanggal &hellip; sampai dengan &hellip; tahun &hellip;, sesuai dengan Surat Tugas Rektor Nomor &hellip;&hellip;&hellip;&hellip; tanggal &hellip;&hellip;&hellip;&hellip;</span></p> <p class="MsoNormal"><!-- [if !supportLists]--><strong><span lang="id">G.&nbsp;&nbsp; </span></strong><!--[endif]--><strong><span lang="id">OBJEK PEMERIKSAAN</span></strong></p> <p class="MsoNormal"><span lang="id">Menjelaskan objek audit.</span></p> <p class="MsoNormal"><strong><span lang="id">Rumusan standar:</span></strong></p> <p class="MsoNormal"><span lang="id">Objek pemeriksaan meliputi kegiatan/anggaran/fungsi yang menjadi tanggung jawab Unit/Fakultas &hellip;&hellip;&hellip;&hellip;</span></p> <p class="MsoNormal"><strong><span lang="id">&nbsp;</span></strong></p> <h2 align="center"><span lang="id">BAB II&nbsp;</span></h2> <h2 align="center"><span lang="id">HASIL PDTT</span></h2> <h3><span lang="id">A. GAMBARAN UMUM</span></h3> <p class="MsoNormal"><span lang="id">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Bagian ini berfungsi sebagai &ldquo;potret singkat&rdquo; unit atau kegiatan yang diaudit.</span><span lang="id"> Isinya bukan temuan, tapi informasi latar yang penting agar pembaca paham konteks pemeriksaan.</span></p> <p class="MsoNormal"><strong><span lang="id">Rumusan standar yang perlu dicakup:</span></strong></p> <ol start="1" type="1"> <li class="MsoNormal"><span lang="id">Identitas unit/fakultas/objek yang diaudit (nama, fungsi, posisi dalam struktur organisasi).</span></li> <li class="MsoNormal"><span lang="id">Uraian singkat kegiatan/anggaran yang dikelola.</span></li> <li class="MsoNormal"><span lang="id">Sumber dana (misalnya: BLU, DIPA, hibah, atau kerjasama).</span></li> <li class="MsoNormal"><span lang="id">Besaran anggaran atau volume kegiatan (bisa disebutkan nominal total, tanpa masuk ke detail temuan).</span></li> <li class="MsoNormal"><span lang="id">Tujuan kegiatan unit tersebut dalam mendukung visi-misi UIN.</span></li> </ol> <p class="MsoNormal"><strong><span lang="id">Contoh rumusan standar (template):</span></strong></p> <p class="MsoNormal"><span lang="id">Fakultas/Unit &hellip;&hellip;&hellip;&hellip; merupakan salah satu unit kerja di lingkungan UIN Syarif Hidayatullah Jakarta yang memiliki tugas pokok &hellip;&hellip;&hellip;&hellip; dan fungsi &hellip;&hellip;&hellip;&hellip; Dalam Tahun Anggaran &hellip;&hellip;&hellip;&hellip;, unit ini mengelola anggaran sebesar Rp &hellip;&hellip;&hellip;&hellip; yang bersumber dari &hellip;&hellip;&hellip;&hellip; Kegiatan yang dilaksanakan meliputi &hellip;&hellip;&hellip;&hellip; yang bertujuan untuk &hellip;&hellip;&hellip;&hellip;</span></p> <p class="MsoNormal"><span lang="id">&nbsp;</span></p> <h3><span lang="id">B. URAIAN TEMUAN</span></h3> <p class="MsoNormal"><span lang="id">Bagian ini berisi inti laporan audit, yaitu fakta-fakta yang ditemukan selama pemeriksaan. agar seragam, uraian temuan harus mengikuti format standar 5 unsur temuan audit:</span></p> <p class="MsoNormal"><span lang="id">Kondisi </span></p> <p class="MsoNormal"><span lang="id">&rarr; Fakta yang ditemukan berdasarkan bukti audit (ditulis objektif, apa adanya).</span></p> <p class="MsoNormal"><span lang="id">Kriteria</span></p> <p class="MsoNormal"><span lang="id">&rarr; Aturan/peraturan/kebijakan/SOP yang menjadi tolok ukur.</span></p> <p class="MsoNormal"><span lang="id">Sebab</span></p> <p class="MsoNormal"><span lang="id">&rarr; Penyebab mengapa kondisi berbeda dengan kriteria (contoh: lemahnya pengendalian intern, kelalaian SDM, sistem belum optimal).</span></p> <p class="MsoNormal"><span lang="id">&nbsp;</span></p> <p class="MsoNormal"><span lang="id">&nbsp;</span><span lang="id">Akibat</span></p> <p class="MsoNormal"><span lang="id">&rarr; Dampak yang timbul, baik finansial (selisih anggaran, potensi kerugian negara) maupun non-finansial (menurunnya kepatuhan, risiko pelayanan tidak efektif).</span></p> <p class="MsoNormal"><span lang="id">Rekomendasi</span></p> <p class="MsoNormal"><span lang="id">&rarr; Usulan langkah perbaikan yang bersifat spesifik, realistis, dan bisa ditindaklanjuti oleh unit terkait.</span></p> <p class="MsoNormal">&nbsp;</p> <p class="MsoNormal">&nbsp;</p> <h2 align="center"><span lang="id">BAB III</span></h2> <p class="MsoNormal" align="center"><strong><span lang="id">SIMPULAN</span></strong></p> <p class="MsoNormal"><strong><span lang="id">Ringkasan umum</span></strong></p> <p class="MsoNormal"><span lang="id">Berdasarkan hasil audit internal yang telah dilaksanakan pada Unit/Fakultas &hellip;&hellip;&hellip;&hellip; untuk periode &hellip;&hellip;&hellip;&hellip;, dapat disimpulkan bahwa secara umum pengelolaan &hellip;&hellip;&hellip;&hellip; telah berjalan (sesuai/tidak sepenuhnya sesuai) dengan ketentuan peraturan perundang-undangan dan kebijakan universitas.</span></p> <p class="MsoNormal"><strong><span lang="id">Apresiasi</span></strong></p> <p class="MsoNormal"><span lang="id">SPI memberikan apresiasi kepada Unit/Fakultas &hellip;&hellip;&hellip;&hellip; atas upaya yang telah dilakukan dalam mengelola kegiatan/anggaran, khususnya pada aspek &hellip;&hellip;&hellip;&hellip; yang sudah berjalan dengan baik. Komitmen unit dalam mendukung transparansi dan akuntabilitas perlu terus dipertahankan serta ditingkatkan.</span></p> <p class="MsoNormal"><strong><span lang="id">Pernyataan Tindak Lanjut</span></strong></p> <p class="MsoNormal"><span lang="id">Dengan memperhatikan temuan tersebut, diperlukan komitmen dari Unit/Fakultas &hellip;&hellip;&hellip;&hellip; untuk menindaklanjuti rekomendasi yang diberikan SPI, guna meningkatkan akuntabilitas, transparansi, dan efektivitas tata kelola di lingkungan UIN Syarif Hidayatullah Jakarta.</span></p> <p class="MsoNormal"><strong><span lang="id">Penutup</span></strong></p> <p class="MsoNormal"><span lang="id">Demikian laporan hasil audit internal ini disusun sebagai bahan pertimbangan dan tindak lanjut oleh pihak terkait.</span></p> <p class="MsoNormal"><span lang="id">&nbsp;</span></p>`;
  const [datas, setDatas] = useState([]);
  const [searchParams] = useSearchParams();
  const uuid = searchParams.get("uuid");
  const [allcash, setAllcash] = useState([]);

  let path = APP_MAIN_URL + `/val/surat/surtug?uuid=${uuid || ""}`;

  let periode = '2025-tw1'
  const formatPeriodeAudit = (periode) => {
  if (!periode) return '-';
  
  const [tahun, tw] = periode.split('-');
  
  const triwulanMap = {
    'tw1': 'Triwulan I',
    'tw2': 'Triwulan II', 
    'tw3': 'Triwulan III',
    'tw4': 'Triwulan IV'
  };
  
  const triwulan = triwulanMap[tw] || tw;
  
  return `Tahun ${tahun} ${triwulan}`;
};

  const getDatas = () => {
    fetchData(`/val/laporan/auditao?uuid=${uuid}`, {
      onSuccess: (res) => {
        console.log("Res", res);
        setAllcash(res?.data?.allcash || []);
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };


  useEffect(() => {
    getDatas();
  }, [uuid]);

  // CSS untuk page break yang lebih baik
  const printStyles = `
    @media print {
      /* Sembunyikan elemen yang tidak perlu saat print */
      .no-print {
        display: none !important;
      }
      
      /* Reset margin dan padding untuk print */
      body {
        margin: 0 !important;
        padding: 0 !important;
        background: white !important;
        font-family: 'Times New Roman', serif !important;

        line-height: 1.5 !important;
        color: black !important;
      }
      
      /* Container utama */
      .print-container {
        width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      
      /* Styling untuk setiap halaman */
      .print-page {
        min-height: 297mm !important;
        padding: 20mm !important;
        box-sizing: border-box !important;
        page-break-after: always !important;
        break-after: page !important;
      }
      
      /* Halaman terakhir tidak perlu page break setelahnya */
      .print-page:last-child {
        page-break-after: auto !important;
        break-after: auto !important;
      }
      
      /* Mencegah elemen terpotong di antara halaman */
      .avoid-break {
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }
      
      /* Untuk konten HTML yang panjang */
      .html-content {
        page-break-inside: auto !important;
        break-inside: auto !important;
      }
      
      /* Memastikan heading tidak sendirian di bawah halaman */
      h1, h2, h3 {
        page-break-after: avoid !important;
        break-after: avoid !important;
      }
      
      /* Memastikan tabel tidak terpotong */
      table {
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }
    }
    
    /* Styling untuk preview di browser */
    @media screen {
      .print-page {
        background: white;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        margin-bottom: 20px;
        border: 1px solid #e5e5e5;
      }
    }
  `;

  const handlePrint = () => {
    const oldTitle = document.title;
    document.title = `Laporan_Audit_${uuid || "document"}`;
    window.print();
    document.title = oldTitle;
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <style>{printStyles}</style>

      {/* Tombol Print */}
      <div className="flex justify-center mb-6 no-print pt-8">
        <button
          onClick={handlePrint}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition no-print flex items-center gap-2"
        >
          <PrinterCheckIcon size={18} />
          Cetak Laporan Audit
        </button>
      </div>

      {/* Container untuk print */}
      <div className="print-container bg-white mx-auto">
        {/* Halaman 1 - Cover */}
        <div className="print-page avoid-break">
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="mb-8 flex items-center gap-3">{/* Logo bisa ditambahkan di sini */}
              <img src="/assets/images/logo-uinjkt.png" className="w-16" />
              <img src="/assets/images/logo-spi-light.png" className="w-16" />
            </div>
            <h1 className="text-[11pt] font-bold mb-6">LAPORAN HASIL AUDIT AO</h1>
            <p className="text-[10pt] mb-3 uppercase">TAHUN ANGGARAN {formatPeriodeAudit(periode)}</p>
            <p className="text-[10pt] mb-3">SATUAN PENGAWASAN INTERNAL</p>
            <div className="mt-16">
              <p className="font-bold text-[10pt]">BADAN LAYANAN UMUM (BLU)</p>
              <p className="font-bold text-[10pt] max-w-sm">
                UNIVERSITAS ISLAM NEGERI (UIN) SYARIF HIDAYATULLAH JAKARTA
              </p>
            </div>
          </div>
        </div>

        {/* Halaman 2 - Konten HTML */}
        <div className="print-page html-content">
          <div
            className="leading-relaxed whitespace-pre-wrap break-words"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        {/* Halaman untuk setiap unit */}
        {UINJKTUNIT.map((unit, index) => (
          <div key={unit.kode} className="print-page avoid-break">
            <div className="-mt-12">
              {/* <KopSurat /> */}

              <KopSuratSpi />

              <div className="-mt-4">
  
    {allcash.find(it => it.kode_unit === unit.kode) ? (
  allcash
    .filter(it => it.kode_unit === unit.kode)
    .map((item, idx) => (
      <div className="mt-6" key={idx}>
        <h3 className="text-[9pt] text-center font-semibold mb-2 uppercase">
          Data Audit Kas Opnam <br /> {FILTER_UINJKTUNIT(unit.kode)}
        </h3>
        <div className="overflow-x-auto">
          
          {/* Informasi Umum */}
          {/* <div className="text-[9pt] grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold">Kode Unit:</p>
              <p>{item.kode_unit}</p>
            </div>
            <div>
              <p className="font-semibold">Periode Audit:</p>
              <p className="uppercase">{item.periode_audit}</p>
            </div>
            <div>
              <p className="font-semibold">Tanggal Saldo:</p>
              <p>{new Date(item.tgl_saldo).toLocaleDateString('id-ID')}</p>
            </div>
            <div>
              <p className="font-semibold">User Input:</p>
              <p>{item.user_input_name}</p>
            </div>
          </div> */}

          {/* Informasi Bank */}
          <div className="mb-6 text-[9pt]">
            <h4 className=" font-semibold mb-3">I. Informasi Bank</h4>
            <table className="min-w-full text-[7pt] border border-gray-300 mb-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Nama Bank</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Nomor Rekening</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Saldo Bank</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">{item.nama_bank}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.norek}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    Rp {parseInt(item.saldo_bank).toLocaleString('id-ID')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Kalkulasi Uang Kertas */}
          <div className="mb-6">
            <h4 className="text-[9pt] font-semibold mb-3">II. Uang Kertas</h4>
            <table className="text-[7pt] min-w-full border border-gray-300 mb-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Pecahan</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Jumlah Lembar</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Nominal</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Rp 100.000</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{item.uang_kertas_100}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">100.000</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    {(item.uang_kertas_100 * 100000).toLocaleString('id-ID')}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Rp 50.000</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{item.uang_kertas_50}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">50.000</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    {(item.uang_kertas_50 * 50000).toLocaleString('id-ID')}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Rp 20.000</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{item.uang_kertas_20}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">20.000</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    {(item.uang_kertas_20 * 20000).toLocaleString('id-ID')}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Rp 10.000</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{item.uang_kertas_10}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">10.000</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    {(item.uang_kertas_10 * 10000).toLocaleString('id-ID')}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Rp 5.000</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{item.uang_kertas_5}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">5.000</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    {(item.uang_kertas_5 * 5000).toLocaleString('id-ID')}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Rp 2.000</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{item.uang_kertas_2}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">2.000</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    {(item.uang_kertas_2 * 2000).toLocaleString('id-ID')}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Rp 1.000</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{item.uang_kertas_1}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1.000</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    {(item.uang_kertas_1 * 1000).toLocaleString('id-ID')}
                  </td>
                </tr>
                <tr className="bg-gray-50 font-semibold">
                  <td className="border border-gray-300 px-4 py-2 text-right" colSpan="3">
                    Total Uang Kertas:
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    Rp {(
                      (item.uang_kertas_100 * 100000) +
                      (item.uang_kertas_50 * 50000) +
                      (item.uang_kertas_20 * 20000) +
                      (item.uang_kertas_10 * 10000) +
                      (item.uang_kertas_5 * 5000) +
                      (item.uang_kertas_2 * 2000) +
                      (item.uang_kertas_1 * 1000)
                    ).toLocaleString('id-ID')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Kalkulasi Uang Logam */}
          <div className="mb-6">
            <h4 className="text-[9pt] font-semibold mb-3">III. Uang Logam</h4>
            <table className="text-[7pt] min-w-full border border-gray-300 mb-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Pecahan</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Jumlah Koin</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Nominal</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Rp 1.000</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{item.uang_logam_1000}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1.000</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    {(item.uang_logam_1000 * 1000).toLocaleString('id-ID')}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Rp 500</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{item.uang_logam_500}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">500</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    {(item.uang_logam_500 * 500).toLocaleString('id-ID')}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Rp 200</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{item.uang_logam_200}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">200</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    {(item.uang_logam_200 * 200).toLocaleString('id-ID')}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Rp 100</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{item.uang_logam_100}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">100</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    {(item.uang_logam_100 * 100).toLocaleString('id-ID')}
                  </td>
                </tr>
                <tr className="bg-gray-50 font-semibold">
                  <td className="border border-gray-300 px-4 py-2 text-right" colSpan="3">
                    Total Uang Logam:
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    Rp {(
                      (item.uang_logam_1000 * 1000) +
                      (item.uang_logam_500 * 500) +
                      (item.uang_logam_200 * 200) +
                      (item.uang_logam_100 * 100)
                    ).toLocaleString('id-ID')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Penyesuaian dan Total */}
          <div className="mb-6">
            <h4 className="text-[9pt] font-semibold mb-3">IV. Penyesuaian dan Total</h4>
            <table className="text-[7pt] min-w-full border border-gray-300">
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Total Uang Kertas</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    Rp {(
                      (item.uang_kertas_100 * 100000) +
                      (item.uang_kertas_50 * 50000) +
                      (item.uang_kertas_20 * 20000) +
                      (item.uang_kertas_10 * 10000) +
                      (item.uang_kertas_5 * 5000) +
                      (item.uang_kertas_2 * 2000) +
                      (item.uang_kertas_1 * 1000)
                    ).toLocaleString('id-ID')}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Total Uang Logam</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    Rp {(
                      (item.uang_logam_1000 * 1000) +
                      (item.uang_logam_500 * 500) +
                      (item.uang_logam_200 * 200) +
                      (item.uang_logam_100 * 100)
                    ).toLocaleString('id-ID')}
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Total Kas Fisik</td>
                  <td className="border border-gray-300 px-4 py-2 text-right font-semibold">
                    Rp {(
                      (item.uang_kertas_100 * 100000) +
                      (item.uang_kertas_50 * 50000) +
                      (item.uang_kertas_20 * 20000) +
                      (item.uang_kertas_10 * 10000) +
                      (item.uang_kertas_5 * 5000) +
                      (item.uang_kertas_2 * 2000) +
                      (item.uang_kertas_1 * 1000) +
                      (item.uang_logam_1000 * 1000) +
                      (item.uang_logam_500 * 500) +
                      (item.uang_logam_200 * 200) +
                      (item.uang_logam_100 * 100)
                    ).toLocaleString('id-ID')}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Bukti Pembayaran Belum Dibukukan</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    Rp {parseInt(item.bukti_pembayaran_belum_buku).toLocaleString('id-ID')}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Bukti Penerimaan Belum Dibukukan</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    Rp {parseInt(item.bukti_penerimaan_belum_buku).toLocaleString('id-ID')}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Saldo Menurut Buku Kas</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    Rp {parseInt(item.saldo_menurut_kas).toLocaleString('id-ID')}
                  </td>
                </tr>
              </tbody>
            </table>
                {item.catatan_atas_selisih && (
                  <div className="bg-yellow-50">
                    <div className="border border-gray-300 px-4 py-2 font-semibold text-[8pt]">Catatan Atas Selisih</div>
                    <div className="border border-gray-300 px-4 py-2 text-[7pt]">{item.catatan_atas_selisih}</div>
                  </div>
                )}
          </div>

          {/* Penandatangan */}
          <div className="mt-8 text-[9pt] grid grid-cols-2 gap-8">
            <div className="text-center">
              <p className="text-[9pt] font-semibold mb-4">Tim Auditor</p>
              <p className="mb-2 text-[8pt]">{item.nama_audit01}</p>
              <p className="text-[8pt]">{item.nama_audit02}</p>
            </div>
            <div className="text-center">
              <p className="text-[9pt] font-semibold mb-4">Perwakilan Unit / Fakultas</p>
              <p className="mb-2 text-[8pt]">{item.nama_unit1}</p>
              <p className="text-[8pt]">{item.nama_unit2}</p>
            </div>
          </div>
        </div>
      </div>
    ))
) : (
  <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center text-[10pt]">
    <p className="text-gray-500">Tidak ada data kas opname untuk unit {FILTER_UINJKTUNIT(unit.kode)}</p>
  </div>
)}

                {/* Tanda tangan */}
                <div className="mt-16 pt-8 border-t border-gray-300">
                  <div className="flex justify-end">
                    <div className="text-center">
                      <p className="text-[8pt] font-semibold">Mengetahui,</p>
                      <p className="font-semibold mt-12">
                        _________________________
                      </p>
                      <p className="text-[7pt]">Kepala {unit.nama}</p>
                    </div>
      
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Halaman penutup */}
        <div className="print-page avoid-break">
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h2 className="text-2xl font-bold mb-8">LAPORAN SELESAI</h2>
            <p className="text-lg mb-4">
              Dokumen ini telah disusun dan diperiksa oleh:
            </p>
            <p className="font-semibold">SATUAN PENGAWASAN INTERNAL</p>
            <p className="font-semibold">UIN SYARIF HIDAYATULLAH JAKARTA</p>
            <div className="mt-16">
              <p>
                Jakarta,{" "}
                {new Date().toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Info untuk user */}
      <div className="no-print mt-6 p-4 bg-blue-50 rounded-lg max-w-3xl mx-auto">
        <p className="text-sm text-blue-700 text-center">
          <strong>Info:</strong> Dokumen ini siap dicetak. Total halaman:{" "}
          {UINJKTUNIT.length + 3} halaman (Cover, Konten, {UINJKTUNIT.length}{" "}
          halaman unit, Penutup)
        </p>
      </div>
    </div>
  );
};

export default PrintLaporanAudit;
