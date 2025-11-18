import { useEffect, useState } from "react";
import { deleteData, fetchData, updateData } from "../../../../utils/api";
import { ActionButton } from "../../../../components/ButtonComp";
import { Edit2Icon, ReplyIcon, RotateCcwIcon, Trash2 } from "lucide-react";
import Form from "./Form";
import ModalFramerComp from "../../../../components/ModalFramerComp";

const List = () => {
  const [err, setErr] = useState("");
  const [animate, setAnimate] = useState(false);
  const [rld, setRld] = useState(false);
  const [datas, setDatas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState(""); // 🔍 state pencarian email

  const [dtp, setDtp] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 🔢 Maksimal data per halaman

  const reload = () => setRld(!rld);

  const getDatas = () => {
    fetchData(`/adm/users`, {
      setLoading: setAnimate,
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
  }, [rld]);

  const pilih = (id) => {
    const n = datas.find((it) => it.id == id);
    setDtp(n);
    setModalOpen(true);
  };

  const kembali = () => {
    setDtp("");
    setModalOpen(false);
  };

  const hapus = async (id) => {
    await deleteData(`/adm/user_destroy?id=${id}`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log("Success!", res);
        getDatas();
      },
      onError: (err) => {
        setErr(err?.detail || "Something went wrong!");
      },
    });
  };
  const reset = async (id) => {
    await updateData(`/adm/user_reset_password?id=${id}&pws=${import.meta.env.VITE_DEFAULT_PASSWORD}`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log("Success!", res);
        getDatas();
      },
      onError: (err) => {
        setErr(err?.detail || "Something went wrong!");
      },
    });
  };

  // 🔍 Filter data berdasarkan email
  const filteredData = datas.filter((item) =>
    item.email.toLowerCase().includes(search.toLowerCase())
  );

  // 🔢 Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return dtp ? (
    <ModalFramerComp isOpen={modalOpen} onClose={kembali} title="Edit User">
      <Form reload={reload} dtp={dtp} />
    </ModalFramerComp>
  ) : (
    <div className="section-container">
    <div className="section-body">
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
      <h1 className="text_h1 w-full">List Users</h1>
      <div className="w-full">
        <input
          type="text"
          placeholder="Cari berdasarkan email..."
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 text-sm px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // reset ke halaman 1 saat search
          }}
        />
      </div>

      </div>
      <p className="text-sm font-semibold text-dark">Default Password = {import.meta.env.VITE_DEFAULT_PASSWORD}</p>

      {/* 🔍 Search Bar */}

      {/* 🧾 Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
          <thead className="text-xs text-white uppercase bg-gray-600 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 max-w-sm capitalize">
                Aksi
              </th>
              <th scope="col" className="px-6 py-3 capitalize">
                Email
              </th>
              <th scope="col" className="px-6 py-3 capitalize">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((r, i) => (
                <tr
                  key={i}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:bg-gray-900 dark:text-white flex items-center gap-2 max-w-sm"
                  >
                    <ActionButton icon={Edit2Icon} onClick={() => pilih(r.id)} />
                    <ActionButton icon={RotateCcwIcon} color="green" onClick={() => reset(r.id)} />
                    <ActionButton icon={Trash2} color="red" onClick={() => hapus(r.id)} />
                  </th>
                  <td className="px-6 py-4">{r.email}</td>
                  <td className="px-6 py-4">{r?.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-6 text-gray-500 dark:text-gray-400"
                >
                  Tidak ada data yang cocok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔢 Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4 text-dark">
          <button
            className="px-3 py-1 border rounded-lg"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={`px-3 py-1 border rounded-lg ${currentPage === idx + 1 ? "bg-indigo-500 text-white" : ""}`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 border rounded-lg"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
      </div>

    </div>
  );
};

export default List;
