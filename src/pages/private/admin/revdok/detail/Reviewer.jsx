import { useEffect, useState } from 'react'
import { fetchData, postData } from '../../../../../utils/api';
// import { fetchData, postData } from '../../../../utils/api';




const Reviewer = ({ data }) => {
  const [rld, setRld] = useState(false)
  const [err, setErr] = useState("")
  const [animate, setAnimate] = useState(false)
  const [datas, setDatas] = useState([])
  const [checked, setChecked] = useState([])

  const getDatas = () => {
    fetchData(`/spi/anggota_spi`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        setDatas(res?.data || []);
      },
      onError: (err) => {
        setErr(err?.detail || "Something went wrong!");
      },
    });
  };

  const getRev = () => {
    fetchData(`/adm/revdok_reviewer?id=${data?.id}`, {
      setLoading: setAnimate,
      onSuccess: (res) => {

        // console.log("red", res)
        setChecked(res?.data || []);
      },
      onError: (err) => {
        console.log("err", err)
      },
    });
  };

  useEffect(() => {
    getDatas();
    getRev();
  }, [data, rld]);

//   console.log("is", checked)
  const handleToggle = (id) => {
    setChecked((prev) => {
      const exists = prev.some((item) => item.user_id === id);
      if (exists) {
        return prev.filter((item) => item.user_id !== id);
      } else {
        return [...prev, { user_id: id }];
      }
    });
  };

  console.log("rewview",)
  
  const isChecked = (id) => checked.some((item) => item.user_id === id);

  const handleSubmit = (e) => {
    e.preventDefault();
    let input = {
      id: data?.id,
      reviewer: checked,
    };

    postData('/adm/revdok_reviewer_store', input, {
      setLoading: setAnimate,
      requireConfirm: false,
      onSuccess: (res) => {
        console.log("Success!", res);
      },
      onError: (err) => {
        setErr(err?.response?.data?.detail || "Something went wrong!");
      }
    });
  };

  return (
    <div className="flex flex-col p-6 rounded-2xl shadow-md bg-pink-50 dark:bg-gray-800 transition">
      <div className="bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 dark:from-pink-700 dark:via-purple-700 dark:to-blue-700 rounded-3xl px-5 py-3 shadow">
        <h1 className="text-base font-bold text-gray-800 dark:text-gray-100 tracking-wide">
          Reviewer / PIC
        </h1>
      </div>

      <div className="mt-4 space-y-3 p-4 rounded-xl bg-white dark:bg-gray-700 shadow-inner">
        {datas.map((item) => (
          <label
            key={item.id}
            className="flex items-center space-x-3 text-sm bg-blue-50 dark:bg-gray-600 px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <input
              type="checkbox"
              value={item.user_id}
              checked={isChecked(item.user_id)}
              onChange={() => handleToggle(item.user_id)}
              className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-400 dark:focus:ring-pink-600"
            />
            <span className="text-gray-700 dark:text-gray-200">{item.name}</span>
          </label>
        ))}

        {/* {animate ? (
          <div className="text-center text-xs text-gray-500 dark:text-gray-400 animate-pulse">
            Loading...
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow hover:opacity-90 transition"
          >
            Simpan Reviewer
          </button>
        )} */}
      </div>

      {err && (
        <p className="mt-3 text-xs text-red-500 dark:text-red-400 italic">{err}</p>
      )}
    </div>
  );
};

export default Reviewer;
