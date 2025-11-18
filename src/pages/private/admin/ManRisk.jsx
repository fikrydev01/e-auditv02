import React from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";

const ManRisk = () => {
  const row_data = [
    {
      id: 1,
      kode: "R.A1-001",
      uraian: "Kurang/tidak optimalnya pelaksanaan penerimaan anggaran",
      l: "5,0",
      i: "4,5",
      lor: "22,5",
      label: "Extreme-3",
    },
    {
      id: 2,
      kode: "R.A1-002",
      uraian: "Kurang/tidak optimalnya pelaksanaan program kegiatan Anggaran",
      l: "2,0",
      i: "4,5",
      lor: "9,0",
      label: "High-2",
    },
    {
      id: 3,
      kode: "R.A1-003",
      uraian: "Kurang/tidak optimalnya pelaksanaan pelaporan Keuangan",
      l: "1,0",
      i: "3,5",
      lor: "3,5",
      label: "Medium-2",
    },
    {
      id: 4,
      kode: "R.B1-004",
      uraian:
        "Kurang/tidak optimalnya perencanaan program kegiatan anggaran operasional dan pengembangan",
      l: "3,0",
      i: "5,0",
      lor: "15,0",
      label: "Extreme-1",
    },
    {
      id: 5,
      kode: "R.C1-005",
      uraian:
        "Kurang/tidak optimalnya aktifitas penyelesaian piutang mahasiswa",
      l: "5,0",
      i: "5,0",
      lor: "25,0",
      label: "Extreme-3",
    },
    {
      id: 6,
      kode: "R.A1-006",
      uraian: "Kurang/tidak optimalnya pelaksanaan penerimaan dana kerjasama",
      l: "3,0",
      i: "4,5",
      lor: "13,5",
      label: "Extreme-1",
    },
    {
      id: 7,
      kode: "R.B2-007",
      uraian:
        "Kurang/tidak optimalnya pelaksanaan Assesment/penilaian Beban Kerja Pegawai",
      l: "3,0",
      i: "5,0",
      lor: "15,0",
      label: "Extreme-1",
    },
    {
      id: 8,
      kode: "R.C2-008",
      uraian:
        "Kurang/tidak optimalnya perencanaan kerja pewagai melalui dokumen jobdesk kerja pagawai",
      l: "4,0",
      i: "4,5",
      lor: "18,0",
      label: "Extreme-2",
    },
    {
      id: 9,
      kode: "R.C2-009",
      uraian:
        "Kurang/tidak optimalnya pelaksanaan pelatihan dan pengembangan kompetensi pegawai.",
      l: "2,0",
      i: "4,5",
      lor: "9,0",
      label: "High-2",
    },
    {
      id: 10,
      kode: "R.B2-010",
      uraian: "Kurang/tidak optimalnya pelaksanaan penempatan kerja pegawai",
      l: "3,0",
      i: "5,0",
      lor: "15,0",
      label: "Extreme-1",
    },
    {
      id: 11,
      kode: "R.B2-011",
      uraian: "Kurang/tidak optimalnya pelaksanaan program rekruitmen pegawai",
      l: "2,0",
      i: "5,0",
      lor: "10,0",
      label: "High-2",
    },
    {
      id: 12,
      kode: "R.C3-012",
      uraian:
        "Kurang/tidak optimalnya Pelaksanaan pemenuhan Fasilitas dan dokumentasi Barang dalam Ruangan",
      l: "2,0",
      i: "4,5",
      lor: "9,0",
      label: "High-2",
    },
    {
      id: 13,
      kode: "R.B4-013",
      uraian:
        "Kurang/tidak optimalnya penyediaan media pembelajaran berbasis elektronik",
      l: "4,0",
      i: "5,0",
      lor: "20,0",
      label: "Extreme-2",
    },
    {
      id: 14,
      kode: "R.B4-014",
      uraian:
        "Kurang/tidak optimalnya penyediaan media layanan administrasi berbasis elektronik",
      l: "4,0",
      i: "5,0",
      lor: "20,0",
      label: "Extreme-2",
    },
    {
      id: 15,
      kode: "R.C4-015",
      uraian:
        "Kurang/tidak optimalnya penyediaan lokasi/ruang publik yang memiliki jaringan Internet",
      l: "1,0",
      i: "4,0",
      lor: "4,0",
      label: "Medium-2",
    },
    {
      id: 16,
      kode: "R.C5-016",
      uraian:
        "Kurang/tidak optimalnya perencanaan Dosen dalam Pembelajaran semester",
      l: "2,0",
      i: "2,0",
      lor: "4,0",
      label: "Medium-1",
    },
    {
      id: 17,
      kode: "R.A5-017",
      uraian:
        "Kurang/tidak optimalnya pendampingan Mahasiswa agar Mahasiswa lulus tepat waktu",
      l: "3,0",
      i: "4,0",
      lor: "12,0",
      label: "High-2",
    },
    {
      id: 18,
      kode: "R.C5-018",
      uraian:
        "Kurang/tidak optimalnya Pendampingan Mahasiswa agar tetap melanjutkan studi",
      l: "1,0",
      i: "2,0",
      lor: "2,0",
      label: "Low-2",
    },
    {
      id: 19,
      kode: "R.B2-019",
      uraian:
        "Kurang/tidak optimalnya pemenuhan kebutuhan dosen dalam menunjang layanan pendidikan",
      l: "2,0",
      i: "5,0",
      lor: "10,0",
      label: "High-2",
    },
    {
      id: 20,
      kode: "R.A5-020",
      uraian:
        "Kurang/tidak optimalnya program peningkatan kualitas/mutu layanan akademik prodi",
      l: "2,0",
      i: "3,5",
      lor: "7,0",
      label: "High-1",
    },
    {
      id: 21,
      kode: "R.A5-021",
      uraian:
        "Kurang/tidak optimalnya pelaksanaan penelitian dosen yang berkualitas",
      l: "2,0",
      i: "3,5",
      lor: "7,0",
      label: "High-1",
    },
    {
      id: 22,
      kode: "R.B5-022",
      uraian: "Kurang/tidak optimalnya pelaksanaan publikasi oleh dosen",
      l: "5,0",
      i: "5,0",
      lor: "25,0",
      label: "Extreme-3",
    },
    {
      id: 23,
      kode: "R.B5-023",
      uraian:
        "Kurang/tidak optimalnya pelaksanaan inovasi oleh dosen dan pegawai",
      l: "5,0",
      i: "5,0",
      lor: "25,0",
      label: "Extreme-3",
    },
    {
      id: 24,
      kode: "R.B5-024",
      uraian:
        "Kurang/tidak optimalnya pelaksanaan penerbitan buku karya ilmiah oleh dosen dan pegawai",
      l: "3,0",
      i: "5,0",
      lor: "15,0",
      label: "Extreme-1",
    },
    {
      id: 25,
      kode: "R.A5-025",
      uraian:
        "Kurang/tidak optimalnya pelaksanaan peningkatan kompetensi lulusan",
      l: "4,0",
      i: "4,0",
      lor: "16,0",
      label: "Extreme-1",
    },
    {
      id: 26,
      kode: "R.A5-026",
      uraian:
        "Kurang/tidak optimalnya pelaksanaan peningkatan daya saing prodi",
      l: "3,0",
      i: "4,0",
      lor: "12,0",
      label: "High-2",
    },
    {
      id: 27,
      kode: "R.A2-027",
      uraian:
        "Kurang/tidak optimalnya pelaksanaan peningkatan standar mutu dosen",
      l: "2,0",
      i: "4,0",
      lor: "8,0",
      label: "High-1",
    },
  ];
  const dataParsed = row_data.map((r) => ({
    ...r,
    l: parseFloat(r.l.replace(",", ".")),
    i: parseFloat(r.i.replace(",", ".")),
    lor: parseFloat(r.lor.replace(",", ".")),
  }));

  const L_values = [1, 2, 3, 4, 5];
  const I_values = [1, 2, 3, 4, 5];

  const matrix = L_values.map((l) =>
    I_values.map((i) => dataParsed.filter((r) => r.l === l && r.i === i))
  );

  const labelColors = {
    Low: "bg-green-200 dark:bg-green-800",
    Medium: "bg-yellow-200 dark:bg-yellow-700",
    High: "bg-orange-200 dark:bg-orange-700",
    Extreme: "bg-red-200 dark:bg-red-800",
  };

  const getCellColor = (items) => {
    if (!items || items.length === 0) return "bg-gray-100 dark:bg-gray-700";
    const priority = ["Extreme", "High", "Medium", "Low"];
    const label = items
      .map((it) => it.label.split("-")[0])
      .sort((a, b) => priority.indexOf(a) - priority.indexOf(b))[0];
    return labelColors[label] || "bg-gray-100 dark:bg-gray-700";
  };

  const totalRisks = dataParsed.length;
  const avgLOR = (
    dataParsed.reduce((acc, r) => acc + r.lor, 0) / totalRisks
  ).toFixed(1);

  const countByLabel = dataParsed.reduce((acc, r) => {
    const lbl = r.label.split("-")[0];
    acc[lbl] = (acc[lbl] || 0) + 1;
    return acc;
  }, {});

  const mostFrequentLabel = Object.entries(countByLabel).sort(
    (a, b) => b[1] - a[1]
  )[0][0];

  return (
    <section className="section-container">
      <Breadcrumbs title="Manajemen Resiko" />

      <div className="flex flex-col gap-4">
        <div className="section-body dark:text-slate-100">
          <h2 className="text_h1">Metrik Risiko</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-lg bg-blue-100 dark:bg-blue-900 shadow flex flex-col items-center transition-colors">
              <span className="text-gray-600 dark:text-gray-300 text-sm">
                Total Risiko
              </span>
              <span className="text-xl font-bold">{totalRisks}</span>
            </div>
            <div className="p-4 rounded-lg bg-orange-100 dark:bg-orange-900 shadow flex flex-col items-center transition-colors">
              <span className="text-gray-600 dark:text-gray-300 text-sm">
                Kategori Risiko Terbanyak
              </span>
              <span className="text-xl font-bold">{mostFrequentLabel}</span>
            </div>
            <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900 shadow flex flex-col items-center transition-colors">
              <span className="text-gray-600 dark:text-gray-300 text-sm">
                Rata-rata LOR
              </span>
              <span className="text-xl font-bold">{avgLOR}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="section-body dark:text-slate-100">
        <h2 className="text-xl font-bold mb-2">Risk Matrix (L x I)</h2>
        <div className="overflow-x-auto mb-8">
          <table className="border-collapse border border-gray-300 dark:border-gray-600 w-full">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                <th className="border border-gray-300 dark:border-gray-600 p-2">
                  L\I
                </th>
                {I_values.map((i) => (
                  <th
                    key={i}
                    className="border border-gray-300 dark:border-gray-600 p-2"
                  >
                    {i}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {L_values.map((l, li) => (
                <tr key={l}>
                  <td className="border border-gray-300 dark:border-gray-600 p-2 font-semibold">
                    {l}
                  </td>
                  {I_values.map((i, ii) => {
                    const cellData = matrix[li][ii];
                    return (
                      <td
                        key={i}
                        className={`${getCellColor(
                          cellData
                        )} border border-gray-300 dark:border-gray-600 p-2 text-center transition-colors`}
                        title={cellData
                          .map((c) => `${c.kode}: ${c.label}`)
                          .join("\n")}
                      >
                        {cellData.length > 0 ? cellData.length : "-"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="section-body dark:text-slate-100">
        <h2 className="text-xl font-bold mb-2">Daftar Risiko</h2>
        <div className="overflow-x-auto">
          <table className="border-collapse border border-gray-300 dark:border-gray-600 w-full">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                <th className="border p-2">Kode</th>
                <th className="border p-2">Uraian</th>
                <th className="border p-2">L</th>
                <th className="border p-2">I</th>
                <th className="border p-2">LOR</th>
                <th className="border p-2">Label</th>
              </tr>
            </thead>
            <tbody>
              {dataParsed.map((r) => (
                <tr
                  key={r.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="border p-2">{r.kode}</td>
                  <td className="border p-2">{r.uraian}</td>
                  <td className="border p-2 text-center">{r.l}</td>
                  <td className="border p-2 text-center">{r.i}</td>
                  <td className="border p-2 text-center">{r.lor}</td>
                  <td className="border p-2 text-center">{r.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ManRisk;
