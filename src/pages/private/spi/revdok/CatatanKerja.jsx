import React, { useState, useEffect } from 'react';
import { ButtonSubmit } from '../../../../components/ButtonComp';
import { fetchData, postData, userDetail } from '../../../../utils/api';
import { Pencil } from 'lucide-react';

const CatatanKerja = ({revdok}) => {
  const [user] = useState({
    role: userDetail?.jabatan // bisa diganti 'sekretaris' untuk testing
  });

  const [animate, setAnimate] = useState(false)
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [narasi, setNarasi] = useState('')

  const loadNotes = async () => {
    await fetchData(`/spi/catatan_kerja?revdok_id=${revdok?.id}`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        setData(res?.data || []);
        setAnimate(false);
      },
      onError: (err) => console.error(err),
    });
  };

  useEffect(() => {
    console.log("datas", revdok?.id)
    loadNotes();
  }, [revdok]);

  // Filter data berdasarkan jabatan
  const dataKetua = data.filter(item => item.jabatan === 'ketua');
  const dataSekretaris = data.filter(item => item.jabatan === 'sekretaris');

  // Permission check functions
  const canEdit = (itemJabatan) => {
    return user.role === itemJabatan;
  };

  const canCheck = (itemJabatan) => {
    return user.role === itemJabatan;
  };

  // Handle edit untuk row tertentu
  const handleEdit = (id, currentCatatan, itemJabatan) => {
    if (!canEdit(itemJabatan)) {
      alert(`Anda tidak memiliki akses untuk mengedit data ${itemJabatan}`);
      return;
    }
    setEditingId(id);
    setEditText(currentCatatan);
  };

  // Handle save untuk row tertentu
  const handleSave = async (id, itemJabatan) => {
    if (!canEdit(itemJabatan)) {
      alert(`Anda tidak memiliki akses untuk menyimpan data ${itemJabatan}`);
      return;
    }

    try {
      // Kirim data ke API untuk update
      await postData("/spi/catatan_kerja_update", {
        id: id,
        narasi: editText,
        // jabatan: itemJabatan
      }, {
        setLoading: setAnimate,
        onSuccess: () => {
          // Update state lokal setelah sukses
          setData(prevData =>
            prevData.map(item =>
              item.id === id ? { ...item, narasi: editText } : item
            )
          );
          setEditingId(null);
          setEditText('');
          setAnimate(false);
        },
        onError: (err) => {
          console.error(err);
          alert('Gagal menyimpan perubahan');
        },
      });
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  // Handle cancel edit
  const handleCancel = () => {
    setEditingId(null);
    setEditText('');
  };

  // Handle checkbox change
  const handleCheckboxChange = async (id, field, itemJabatan) => {
    if (!canCheck(itemJabatan)) {
      alert(`Anda tidak memiliki akses untuk mengubah data ${itemJabatan}`);
      return;
    }

    try {
      const currentItem = data.find(item => item.id === id);
      const newValue = !currentItem[field];

      // Kirim update checkbox ke API
      await postData("/spi/catatan_kerja_update", {
        id: id,
        [field]: newValue,
        // jabatan: itemJabatan
      }, {
        setLoading: setAnimate,
        onSuccess: (res) => {
          // Update state lokal setelah sukses
          console.log("Res", res)
          
          setData(prevData =>
            prevData.map(item =>
              item.id === id ? { ...item, [field]: newValue } : item
            )
          );
          setAnimate(false);
        },
        onError: (err) => {
          console.error(err);
          alert('Gagal mengupdate status');
        },
      });
    } catch (error) {
      console.error('Error updating checkbox:', error);
    }
  };

  const handlenarasiStore = async (e) => {
    e.preventDefault();
    const input = {
      narasi,
      revdok_id: revdok?.id,
      jabatan: userDetail?.jabatan
    }

    await postData("/spi/catatan_kerja_store", input, {
      setLoading: setAnimate,
      onSuccess: () => {
        setNarasi(""); // Reset form
        loadNotes(); // Reload data
      },
      onError: (err) => console.error(err),
    });
  };

  // Komponen untuk menampilkan baris tabel dengan tombol edit/save per row
  const TableRow = ({ item, index, isKetua }) => {
    const userCanEdit = canEdit(item.jabatan);
    const userCanCheck = canCheck(item.jabatan);
    const isEditing = editingId === item.id;

    return (
      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {index + 1}
        </td>
        <td className="px-6 py-4 text-sm text-gray-900">
          {isEditing ? (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className={userCanEdit ? '' : 'text-gray-500'}>
                {item.narasi}
              </span>
            </div>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={item.tindak_lanjut || false}
              onChange={() => handleCheckboxChange(item.id, 'tindak_lanjut', item.jabatan)}
              disabled={!userCanCheck}
              className={`h-5 w-5 ${
                isKetua 
                  ? 'text-blue-600 focus:ring-blue-500' 
                  : 'text-green-600 focus:ring-green-500'
              } border-gray-300 rounded cursor-pointer ${
                !userCanCheck ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            />
            <span className={`ml-2 text-sm ${userCanCheck ? 'text-gray-600' : 'text-gray-400'}`}>
              {item.tindak_lanjut ? 'Sudah' : 'Belum'}
            </span>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={item.selesai || false}
              onChange={() => handleCheckboxChange(item.id, 'selesai', item.jabatan)}
              disabled={!userCanCheck}
              className={`h-5 w-5 ${
                isKetua 
                  ? 'text-blue-600 focus:ring-blue-500' 
                  : 'text-green-600 focus:ring-green-500'
              } border-gray-300 rounded ${
                !userCanCheck ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            />
            <span className={`ml-2 text-sm ${userCanCheck ? 'text-gray-600' : 'text-gray-400'}`}>
              {item.selesai ? 'Ya' : 'Tidak'}
            </span>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {userCanEdit && (
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <button
                    onClick={() => handleSave(item.id, item.jabatan)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs flex items-center"
                    disabled={animate}
                  >
                    {animate ? '...' : '✓ Save'}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs flex items-center"
                    disabled={animate}
                  >
                    ✕ Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleEdit(item.id, item.narasi, item.jabatan)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs flex items-center"
                >
                  <Pencil size={14} />
                </button>
              )}
            </div>
          )}
        </td>
      </tr>
    );
  };

  // Komponen info role user
  const UserRoleBadge = () => (
    <div className="mb-4 p-3 bg-gray-100 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm text-gray-600">Login sebagai: </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            user.role === 'ketua' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {user.role === 'ketua' ? 'Ketua SPI' : user.role === 'sekretaris' ? 'Sekretaris SPI' : 'Anggota SPI'}
          </span>
        </div>
        <div className="text-sm text-gray-500">
          {user.role === 'ketua' 
            ? 'Hanya dapat mengedit data Ketua SPI' 
            : 'Hanya dapat mengedit data Sekretaris SPI'
          }
        </div>
      </div>
    </div>
  );

  return (
    <div className="">
      <h3 className='text-2xl font-bold mb-2'>Lembar Catatan Kerja</h3>
      
      {/* Info Role User */}
      <UserRoleBadge />

      {/* Form Tambah Catatan Baru */}
      <form onSubmit={handlenarasiStore} className="mb-6">
        <textarea 
          value={narasi}
          onChange={(e) => setNarasi(e.target.value)}
          placeholder="Tambah catatan kerja baru..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          rows="3"
        />
        <ButtonSubmit 
          disabled={!narasi.trim()} 
          text="Tambah Catatan" 
        />
      </form>
      
      {/* Tabel Ketua SPI */}
      <div className="bg-white rounded-lg shadow-md mb-8 group">
        <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-lg font-semibold">Ketua SPI</h2>
          {user.role !== 'ketua' && (
            <span className="text-blue-200 text-sm">(Read Only)</span>
          )}
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  NO
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Catatan
                </th>
                <th className="px-6 py-3 w-8 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Tindak Lanjut
                </th>
                <th className="px-6 py-3 w-8 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Selesai
                </th>
                <th className="px-6 py-3 w-8 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dataKetua.map((item, index) => (
                <TableRow key={item.id} item={item} index={index} isKetua={true} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabel Sekretaris SPI */}
      <div className="bg-white rounded-lg shadow-md group">
        <div className="bg-green-600 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-lg font-semibold">Sekretaris SPI</h2>
          {user.role !== 'sekretaris' && (
            <span className="text-green-200 text-sm">(Read Only)</span>
          )}
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  NO
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Catatan
                </th>
                <th className="px-6 py-3 text-left text-xs w-8 font-medium text-gray-500 uppercase tracking-wider border-b">
                  Tindak Lanjut
                </th>
                <th className="px-6 py-3 text-left text-xs w-8 font-medium text-gray-500 uppercase tracking-wider border-b">
                  Selesai
                </th>
                <th className="px-6 py-3 text-left text-xs w-8 font-medium text-gray-500 uppercase tracking-wider border-b">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dataSekretaris.map((item, index) => (
                <TableRow key={item.id} item={item} index={index} isKetua={false} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CatatanKerja;