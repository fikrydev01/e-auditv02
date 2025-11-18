import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";

export default function FilterTable({ data = [], rowsPerPage = 10 }) {
  const safeData = Array.isArray(data) ? data : [];

  const [filter, setFilter] = useState({
    merk_type: "All",
    id_kondisi: "All",
    fakultas_unit: "All",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const getUniqueOptions = (key) => {
    const unique = [...new Set(safeData.map((item) => item[key] || "Tidak Diketahui"))];
    return ["All", ...unique];
  };

  const filteredData = useMemo(() => {
    return safeData.filter((row) => {
      return (
        (filter.merk_type === "All" || row.merk_type === filter.merk_type) &&
        (filter.id_kondisi === "All" || row.id_kondisi === filter.id_kondisi) &&
        (filter.fakultas_unit === "All" || row.fakultas_unit === filter.fakultas_unit)
      );
    });
  }, [safeData, filter]);

  const jumlahSudahDilabel = filteredData.filter(
    (item) => item.label_tercetak === "Sudah Dilabel"
  ).length;

  const jumlahBelumDilabel = filteredData.filter(
    (item) =>
      !item.label_tercetak ||
      item.label_tercetak === "Belum Dilabel" ||
      item.label_tercetak === "-" ||
      item.label_tercetak === ""
  ).length;

  const columns = useMemo(() => {
    const keys = Object.keys(safeData[0] || {});
    return keys.map((key) => ({
      name: key.replace(/_/g, " ").toUpperCase(),
      selector: (row) => row[key] ?? "-",
      sortable: true,
      wrap: true,
      minWidth: "150px", // Menambahkan lebar minimum
      grow: 1, // Kolom akan mengembang untuk mengisi ruang
    }));
  }, [safeData]);

  return (
    <div className="section-container max-w-[95vw] space-y-4 flex-1">
      <div className="section-body">
        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["merk_type", "id_kondisi", "fakultas_unit"].map((fKey) => (
            <div key={fKey} className="flex flex-col">
              <label className="mb-1 text-sm dark:text-white font-semibold uppercase">
                {fKey.replace(/_/g, " ")}
              </label>
              <select
                name={fKey}
                value={filter[fKey]}
                onChange={handleFilterChange}
                className="p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
              >
                {getUniqueOptions(fKey).map((val, idx) => (
                  <option key={idx} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Ringkasan Label */}
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="px-3 py-1 rounded-full bg-green-100 text-green-800 font-semibold dark:bg-green-800 dark:text-green-100">
            Sudah Dilabeli: {jumlahSudahDilabel}
          </div>
          <div className="px-3 py-1 rounded-full bg-red-100 text-red-800 font-semibold dark:bg-red-800 dark:text-red-100">
            Belum Dilabeli: {jumlahBelumDilabel}
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="border rounded-xl shadow-lg overflow-hidden bg-white dark:bg-gray-900 dark:border-gray-700">
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          paginationPerPage={rowsPerPage}
          paginationRowsPerPageOptions={[10, 20, 50]}
          highlightOnHover
          striped
          responsive
          fixedHeader
          fixedHeaderScrollHeight="400px"
          noDataComponent={
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              Tidak ada data yang tersedia
            </div>
          }
          customStyles={{
            table: {
              style: {
                minWidth: "100%", // Memastikan tabel mengambil lebar penuh
                tableLayout: "fixed", // Menggunakan fixed layout
              },
            },
            tableWrapper: {
              style: {
                overflowX: "auto", // Scroll horizontal hanya ketika diperlukan
                maxWidth: "100%",
              },
            },
            headRow: {
              style: {
                backgroundColor: "#f8fafc",
                borderBottomWidth: "1px",
                minWidth: "100%",
              },
            },
            headCells: {
              style: {
                fontWeight: "bold",
                fontSize: "13px",
                whiteSpace: "normal",
                wordBreak: "break-word",
                padding: "12px 8px",
                minWidth: "150px",
                backgroundColor: "#f8fafc",
                dark: {
                  backgroundColor: "#1f2937",
                }
              },
            },
            cells: {
              style: {
                fontSize: "13px",
                whiteSpace: "normal",
                wordBreak: "break-word",
                padding: "12px 8px",
                minWidth: "150px",
              },
            },
            rows: {
              style: {
                fontSize: "13px",
                whiteSpace: "normal",
                wordBreak: "break-word",
                minWidth: "100%",
              },
            },
          }}
        />
      </div>
    </div>
  );
}