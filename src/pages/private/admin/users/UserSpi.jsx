import { useState, useEffect } from "react";
// import { fetchData } from "../../../../constants/utils";

// import { ButtonAdd, ButtonDetail, ButtonKembali } from "../../../../constants/libs";
// import Detail from "./Detail";
import ModalFramerComp from "../../../../components/ModalFramerComp";
import FormSpi from "./FormSpi";
import { deleteData, fetchData } from "../../../../utils/api";
import { ActionButton } from "../../../../components/ButtonComp";
import { Edit2Icon, PlusSquareIcon, Trash2 } from "lucide-react";

const UserSpi = () => {
  const [err, setErr] = useState("");
  const [animate, setAnimate] = useState(false);
  const [rld, setRld] = useState(false);
  const [datas, setDatas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [allusers, setAllusers] = useState([]);

  const reload = () => setRld(!rld);
  const getAllUser = () => {
    fetchData(`/adm/users`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log("Success!", res);
        setAllusers(res?.data || []);
      },
      onError: (err) => {
        setErr(err?.detail || "Something went wrong!");
      },
    });
  };

  const getDatas = () => {
    fetchData(`/adm/users_spi`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log("Success!", res);
        setDatas(res?.data || []);
      },
      onError: (err) => {
        setErr(err?.detail || "Something went wrong!");
      },
    });
  };
  useEffect(() => {
    getDatas();
    getAllUser();
  }, [rld]);
  const [dtp, setDtp] = useState("");
  const pilih = (id) => {
    let n = datas.find((it) => it.id == id);
    setDtp(n);
    setModalOpen(true);
  };
  const kembali = () => {
    setDtp("");
    setModalOpen(false);
  };

  const tambah = (e) => {
    e.preventDefault();
    setDtp("");
    setModalOpen(true);
  };

  const hapus = async (id) => {
    await deleteData(`/adm/user_spi_destroy?id=${id}`, {
      setLoading: setAnimate,
        onSuccess: (res) => {
          console.log("Success!", res);
              getDatas();
          // setDatas(res?.data || []);
        },
        onError: (err) => {
          setErr(err?.detail || "Something went wrong!");
        },

    })
  }
  return (
    <div className="section-container">
      {modalOpen ? (
        <div className="flex flex-col gap-2">
          <ModalFramerComp
            isOpen={modalOpen}
            onClose={() => kembali()}
            title="Edit User SPI"
          >
            <FormSpi reload={reload} dtp={dtp} allusers={allusers} />
          </ModalFramerComp>
        </div>
      ) : (
        <div className="section-body">
        <div className="flex flex-col gap-4">
          <h1 className="text_h1">List Users SPI</h1>
          <div className="flex items-center justify-end">
            {/* <ButtonAdd onClick={tambah} title="Tambah Anggota SPI"/> */}
            <ActionButton
              title="Tambah Anggota SPI"
              icon={PlusSquareIcon}
              label={"Tambah"}
              onClick={tambah}
            />
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs uppercase bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                <tr>
                  <th scope="col" className="px-6 py-3 capitalize">
                    Aksi
                  </th>
                  <th scope="col" className="px-6 py-3 capitalize">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 capitalize">
                    NIP / NRP
                  </th>
                  <th scope="col" className="px-6 py-3 capitalize">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 capitalize">
                    Jabatan
                  </th>
                  <th scope="col" className="px-6 py-3 capitalize">
                    Divisi
                  </th>
                </tr>
              </thead>
              <tbody>
                {datas &&
                  datas.map((r, i) => (
                    <tr
                      key={i}
                      className="border-b odd:bg-white even:bg-gray-50 hover:bg-gray-100 
                       dark:odd:bg-gray-800 dark:even:bg-gray-900 dark:hover:bg-gray-700
                       border-gray-200 dark:border-gray-600"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center gap-2">
                          <ActionButton
                            icon={Edit2Icon}
                            onClick={() => pilih(r.id)}
                          />
                          <ActionButton
                            icon={Trash2}
                            color="red"
                            onClick={() => hapus(r.id)}
                          />
                          {/* bisa tambah Hapus dll */}
                        </div>
                      </td>
                      <td className="px-6 py-4">{r.name}</td>
                      <td className="px-6 py-4">{r.nip}</td>
                      <td className="px-6 py-4">{r.email}</td>
                      <td className="px-6 py-4 uppercase">{r?.jabatan}</td>
                      <td className="px-6 py-4 uppercase">{r?.div_id}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        </div>
      )}
    </div>
  );
};

export default UserSpi;
