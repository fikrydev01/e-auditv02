import {useState, useEffect} from 'react'
import { motion } from 'framer-motion';
import { api } from '../../utils/api';

const Berita = () => {
      const [animate, setAnimate] = useState(false);
  const [datas, setDatas] = useState([]);
  const getDatas = async () => {
    await api
      .get(`/web/berita`)
      .then((res) => {
        console.log("res", res.data);
        setDatas(res?.data || []);
      })
      .catch((err) => {
        console.log("eerr", err.response.data.detail);
        // setErr(err?.response?.data?.detail)
      });
  };
  useEffect(() => {
    getDatas();
  }, []);
  return (
         <div className="grid md:grid-cols-3 gap-8">
          {datas && datas.map((it, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.12 }}
              className="rounded-2xl bg-white border border-gray-100 shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img src={it.gambar} alt={it.judul} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h4 className="text-lg font-semibold mb-2 text-gray-900">{it.judul}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{it.desc}</p>
                <a target='_blank' href={it.link} className="inline-block mt-4 text-indigo-600 font-medium hover:underline">
                  Baca selengkapnya →
                </a>
              </div>
            </motion.article>
          ))}
        </div>
  )
}

export default Berita