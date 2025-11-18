import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

export default function AsetTable({ data, rowsPerPage = 10 }) {
  // Detect dark mode
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const darkMode = document.documentElement.classList.contains('dark');
    setIsDark(darkMode);
  }, []);

  // Buat columns otomatis dari data
  const columns = data[0]
    ? Object.keys(data[0]).map((key) => ({
        name: key.replace(/_/g, ' ').toUpperCase(),
        selector: (row) => row[key],
        sortable: true,
        wrap: true,
      }))
    : [];

  // Custom styles untuk light/dark mode
  const customStyles = {
    headCells: {
      style: {
        fontWeight: 'bold',
        fontSize: '13px',
        backgroundColor: isDark ? '#1f2937' : '#f8fafc',
        color: isDark ? '#f9fafb' : '#1f2937',
      },
    },
    rows: {
      style: {
        fontSize: '13px',
        color: isDark ? '#f9fafb' : '#1f2937',
        backgroundColor: isDark ? '#111827' : '#ffffff',
      },
    },
    pagination: {
      style: {
        backgroundColor: isDark ? '#1f2937' : '#f8fafc',
        color: isDark ? '#f9fafb' : '#1f2937',
      },
      pageButtonsStyle: {
        borderRadius: '50%',
        height: '30px',
        width: '30px',
        padding: '0',
        margin: 'px 2px',
        cursor: 'pointer',
        backgroundColor: isDark ? '#374151' : '#e5e7eb',
        color: isDark ? '#f9fafb' : '#1f2937',
        '&:disabled': {
          color: '#9ca3af',
        },
        '&:hover:not(:disabled)': {
          backgroundColor: isDark ? '#4b5563' : '#d1d5db',
        },
      },
    },
  };

  return (
    <div className="rounded-xl shadow-xl border border-gray-200">
      <DataTable
        columns={columns}
        data={data}
        pagination
        paginationPerPage={rowsPerPage}
        highlightOnHover
        striped
        responsive
        dense
        persistTableHead
        customStyles={customStyles}
      />
    </div>
  );
}
