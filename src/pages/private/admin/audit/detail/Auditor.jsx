import { use, useEffect, useState } from 'react'
import { fetchData, postData, updateData, userDetail } from '../../../../../utils/api';
import { ButtonSubmit } from '../../../../../components/ButtonComp';

const Auditor = ({ dtp }) => {
  const [rld, setRld] = useState(false)
  const [err, setErr] = useState("")
  const [animate, setAnimate] = useState(false)
  const [datas, setDatas] = useState([])
  const [checked, setChecked] = useState([])
  const user = userDetail

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
    fetchData(`/adm/audit_auditor?id=${dtp?.id}`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        setChecked(res?.data || []);
      },
      onError: (err) => {
        setErr(err?.detail || "Something went wrong!");
      },
    });
  };

  useEffect(() => {
    getDatas();
    getRev();
  }, [dtp, rld]);

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

  const isChecked = (id) => checked.some((item) => item.user_id === id);

  const levelChecked = (user_id) => {
    const user = checked.find((item) => item.user_id === user_id);
    return user ? user.level : "";
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let input = {
      id: dtp?.id,
      reviewer: checked,
    };

    postData('/adm/audit_auditor_store', input, {
      setLoading: setAnimate,
      requireConfirm: false,
      onSuccess: (res) => {
        console.log("Success!", res);
        getRev()
      },
      onError: (err) => {
        setErr(err?.response?.data?.detail || "Something went wrong!");
      }
    });
  };

  const changeLavel = ( user_id, level) => {
        updateData(`/adm/audit_auditor_level_store?audit_id=${dtp?.id}&auditor_id=${user_id}&level=${level}`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        getRev()
      },
      onError: (err) => {
        setErr(err?.detail || "Something went wrong!");
      },
    });
  }

  return (
    <form onSubmit={(e)=>handleSubmit(e)} className="flex flex-col p-6 rounded-2xl shadow-md bg-pink-50 dark:bg-gray-800 transition">
      <div className="bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 dark:from-pink-700 dark:via-purple-700 dark:to-blue-700 rounded-3xl px-5 py-3 shadow">
        <h1 className="text-base font-bold text-gray-800 dark:text-gray-100 tracking-wide">
          Auditor Audit
        </h1>
      </div>

      <div className="mt-4 space-y-3 p-4 rounded-xl bg-white dark:bg-gray-700 shadow-inner">
        {datas.map((item) => (
          <label
            key={item.id}
            className="flex w-full items-center space-x-3 text-sm bg-blue-50 dark:bg-gray-600 px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <div className='flex items-center justify-between gap-4'>
                <div className='flex items-center gap-3'>
            <input
              type="checkbox"
              value={item.user_id}
              checked={isChecked(item.user_id)}
              onChange={() => handleToggle(item.user_id)}
              className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-400 dark:focus:ring-pink-600"
            />
            <span className="text-gray-700 dark:text-gray-200">{item.name}</span>

                </div>
                <div>
            {isChecked(item.user_id) && <div className='gap-2 flex'>
                 {/* {levelChecked(item.user_id)} */}
                <span onClick={()=>changeLavel(item.user_id, 'ketua')} className={`${levelChecked(item.user_id) === "ketua" ? "bg-emerald-500" : "bg-red-300"} px-2 py-1 rounded-md text-xs text-white`}>Ketua</span>    
                <span onClick={()=>changeLavel(item.user_id, 'anggota')} className={`${levelChecked(item.user_id) === "anggota" ? "bg-emerald-500" : "bg-red-300"} px-2 py-1 rounded-md text-xs text-white`}>Anggota</span>    
            </div>}

                </div>

            </div>
          </label>
        ))}

     
      </div>

      {err && (
        <p className="mt-3 text-xs text-red-500 dark:text-red-400 italic">{err}</p>
      )}
      <div className='flex items-center justify-end mt-4'>
        {user?.role === 'sekretaris' ? <ButtonSubmit /> :  null
      
        }

      </div>
    </form>
  );
};

export default Auditor;
