import { useEffect, useState } from "react";
import { fetchData, userDetail } from "../../../../utils/api";
import LoadingPage from "../../../../components/LoadingPage";
import AsetTable from "./barjas/AsetTable";
import AsetTableSkeleton from "../../../../components/AsetTableSkeleton";
import FilterTable from "./barjas/FilterTable";
import SyncSilola from "../../../../components/SyncSilola";

const Barjas = () => {
  const [datas, setDatas] = useState([]);
  const [tahun, setTahun] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
let role = userDetail?.role
  const getDatas = () => {
    fetchData(`/spi/silola_fetch?tahun=${tahun}`, {
      setLoading: setLoading,
      onSuccess: (res) => {
        setDatas(res?.data || []);
      },
      onError: (err) => {
        setErr(err?.detail || "Something went wrong!");
      },
    });
  };

  useEffect(() => {
    getDatas();
  }, [tahun]);

  return (
    <section className="flex flex-col min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
        List Monitoring Barang & Jasa
      </h1>

      {/* Filter Tahun */}
      <div className="flex items-center justify-end mb-4">
        <select
          className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 h-10 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={tahun}
          onChange={(e) => setTahun(e.target.value)}
        >
          {Array.from(
            { length: new Date().getFullYear() - 2018 + 1 },
            (_, i) => {
              const year = new Date().getFullYear() - i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            }
          )}
        </select>

          {role === 'admin' && 
        <SyncSilola />
          }
      </div>

      {/* Error */}
      {err && (
        <div className="text-red-500 font-medium mb-4">{err}</div>
      )}

      {/* Loading */}
      {loading ? (
  <AsetTableSkeleton rows={10} columns={datas[0] ? Object.keys(datas[0]).length : 6} />

      ) : (
        //   <AsetTable data={datas} rowsPerPage={10} />
          <FilterTable data={datas} rowsPerPage={10} />
   
      )}
    </section>
  );
};

export default Barjas;
