
import { fetchData } from '../../../../../utils/api'
import { useEffect, useState } from 'react'
const Barang = ({audit}) => {
    const tahun = 2024
    const [lokasi, setLokasi] = useState([])
    const [animate, setAnimate] = useState(false);
    const [err, setErr] = useState(null);

        const getDatas = () => {
            fetchData(`/spi/audit_silola_group_lokasi`, {
              setLoading: setAnimate,
              onSuccess: (res) => {
                console.log("Success!", res);
                setLokasi(res?.data || []);
              },
              onError: (err) => {
                setErr(err?.detail || "Something went wrong!");
              },
            });
          };
          useEffect(() => {
            getDatas();
          }, []);
    


        const [barang, setBarang] = useState([])
        const [lok, setLok] = useState('')
        const pilih = (kd_lokasi)=> {
            setLok(kd_lokasi)
            console.log("first", kd_lokasi)
        }
        const getBarang = () => {
            setAnimate(true)
            fetchData(`/spi/audit_silola_barang?tahun=${tahun}&kd_lokasi=${lok}`, {
              setLoading: setAnimate,
              onSuccess: (res) => {
                console.log("Success!", res);
                setBarang(res?.data || []);
              },
              onError: (err) => {
                setErr(err?.detail || "Something went wrong!");
              },
            });
          }
        useEffect(() => {
            if(lok) {

            getBarang()
            }
          }, [lok]);


          // Group by kd_brg
const grouped = barang && barang.reduce((acc, item) => {
  if (!acc[item.kd_brg]) {
    acc[item.kd_brg] = {
      kd_brg: item.kd_brg,
      keterangan: item.keterangan, // ✅ simpan uraian
      merk_type: item.merk_type, // ✅ simpan uraian
      items: [],
      total: 0,
    };
  }
  acc[item.kd_brg].items.push(item);
  acc[item.kd_brg].total += 1;
  return acc;
}, {});

// Convert object → array
const groupedArray = Object.values(grouped);

console.log("groupedArray", groupedArray);
  return (
    <div className='flex flex-col'>
        <div>
            <h2>Pilih Lokasi</h2>
            <select className='border border-gray-300 rounded px-2 py-1'
            onChange={(e) => pilih(e.target.value)}
            >
                <option value="">-- Pilih Lokasi --</option>
                {lokasi.map((lok, idx) => (
                    <option key={idx} value={lok?.fakultas_unit}>{lok?.fakultas_unit} {lok?.kd_lokasi}</option>
                ))}
                
            </select>
        </div>
        {animate && <div>Loading...</div>}

        
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-100 uppercase bg-gradient-to-r from-blue-500 to-blue-600">
              <tr>
                <th className="px-6 py-3">Kode Barang</th>
                <th className="px-6 py-3">Uraian</th>
                <th className="px-6 py-3">ID Ruangan</th>
                <th className="px-6 py-3">Ruangan</th>
                <th className="px-6 py-3">Periode Audit</th>
                <th className="px-6 py-3">Catatan</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
  
            <tbody>
              {groupedArray && groupedArray.map((r, i) => (
                <tr
                  key={i}
                  className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors"
                >
                  <td className="px-6 py-4">{r?.kd_brg}</td>
                  <td className="px-6 py-4">{r?.keterangan}</td>
                  <td className="px-6 py-4">{r?.total}</td>
                  <td className="px-6 py-4">{r?.kategori_ruangan}</td>
                  <td className="px-6 py-4">{r?.periode_audit}</td>
                  <td className="px-6 py-4">{r?.catatan}</td>
                  <td className="px-6 py-4">
                    {/* {r?.audit?.status_id} */}
                    {/* {FILTER_AUDIT(r?.audit?.status_id)?.spi_status || '-'} */}

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
    </div>
  )
}

export default Barang