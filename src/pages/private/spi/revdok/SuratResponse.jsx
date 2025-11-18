import { useEffect, useState } from "react";
import { useAnggotaSpi } from "../../../../hooks/useAnggotaSpi";
import HugeRte from "../../../../components/HugeRte";
import {
  REVDOK_LHR,
  REVDOK_SURAT_NOMINAL,
  REVDOK_SURAT_NONNOMINAL,
} from "../../../../constant/data";
import { ButtonSubmit } from "../../../../components/ButtonComp";
import { fetchData, postData } from "../../../../utils/api";

const SuratResponse = ({ revdok }) => {
  const { userSpi } = useAnggotaSpi();
  const [animate, setAnimate] = useState(false);
  const [content, setContent] = useState("");

  const [input, setInput] = useState({
    revdok_id: revdok?.id,
    jenis: "revdok",
    tgl_surat: "",
    nosur: "",
    perihal: "",
    lampiran: "",
    body: "",
    // gunakan nama (bukan id)
    pembuat_ttd_name: "",
    pembuat_ttd_nip: "",
    sekretaris_ttd_name: "",
    sekretaris_ttd_nip: "",
    ketua_ttd_name: "",
    ketua_ttd_nip: "",
  });

  /** 🔹 Ambil data surat dari server */
  const getSurat = () => {
    fetchData(`/spi/revdok_surres?revdok_id=${revdok?.id}`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        const data = res?.data || {};
        setInput((prev) => ({
          ...prev,
          revdok_id: revdok?.id,
          jenis: "revdok",
          tgl_surat: data.tgl_surat || "",
          nosur: data.nosur || "",
          perihal: data.perihal || "",
          lampiran: data.lampiran || "",
          body: data.body || "",
          // pembuat_ttd_name: data.pembuat_ttd_name || "",
          // pembuat_ttd_nip: data.pembuat_ttd_nip || "",
          // sekretaris_ttd_name: data.sekretaris_ttd_name || "",
          // sekretaris_ttd_nip: data.sekretaris_ttd_nip || "",
          // ketua_ttd_name: data.ketua_ttd_name || "",
          // ketua_ttd_nip: data.ketua_ttd_nip || "",
        }));
        setContent(data.body || "");
      },
    });
  };

  useEffect(() => {
    getSurat();
  }, [revdok]);

  useEffect(() => {
    setInput((prev) => ({ ...prev, body: content }));
  }, [content]);

  /** 🔹 Input field umum */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /** 🔹 Handler untuk TTD (berdasarkan nama, bukan ID) */
  const handleSelectTtd = (e, role) => {
    const selectedName = e.target.value;
    const selectedUser = userSpi.find((it) => it.name === selectedName);

    setInput((prev) => ({
      ...prev,
      [`${role}_ttd_name`]: selectedName,
      [`${role}_ttd_nip`]:
        selectedUser?.nip ||
        selectedUser?.NIP ||
        selectedUser?.nip_user ||
        selectedUser?.nip_pegawai ||
        "",
    }));
  };

  /** 🔹 Simpan ke server */
  const handleSubmit = async (e) => {
    e.preventDefault();
    await postData("/spi/revdok_surres_store", input, {
      setLoading: setAnimate,
        onSuccess: (res) => {
        console.log("asfdasdf da!", res);
        // setRevdok(res?.data || []);
      },
      onError: (err) => {
        console.log("err", err);
        // setErr(err?.detail || "Something went wrong!");
      },
    });
  };

  /** 🔹 Daftar peran */
  const roles = [
    { key: "pembuat", label: "Pembuat" },
    { key: "sekretaris", label: "Sekretaris" },
    { key: "ketua", label: "Ketua" },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-700 dark:text-slate-100">
          Konsep Surat Jawaban
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Kategori: {revdok?.kategori}
        </p>
        <hr className="mt-3 border-slate-200 dark:border-slate-700" />
      </div>

      {/* Input Surat */}
      {[
        { label: "Tanggal Surat *", type: "date", name: "tgl_surat", required: true },
        { label: "Nomor Surat", type: "text", name: "nosur", placeholder: "Nomor surat..." },
        { label: "Lampiran *", type: "text", name: "lampiran", required: true, placeholder: "Lampiran..." },
        { label: "Perihal *", type: "text", name: "perihal", required: true, placeholder: "Perihal surat..." },
      ].map((field, i) => (
        <div key={i}>
          <label className="text-sm text-dark font-medium">{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={input[field.name] || ""}
            required={field.required}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 
                       dark:border-slate-600 bg-white dark:bg-slate-700 
                       text-slate-700 dark:text-slate-100 placeholder-slate-400 
                       focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      ))}

      {/* 🔹 TTD Section */}
      {/* <div className="grid md:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div key={role.key} className="space-y-3">
            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">
              {role.label}
            </h3>
            <div>
              <label className="text-sm text-dark font-medium">
                Nama TTD {role.label} *
              </label>
              <select
                name={`${role.key}_ttd_name`}
                required
                value={input[`${role.key}_ttd_name`] || ""}
                onChange={(e) => handleSelectTtd(e, role.key)}
                className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 
                           dark:border-slate-600 bg-white dark:bg-slate-700 
                           text-slate-700 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">-- Pilih Nama --</option>
                {userSpi.map((it) => (
                  <option key={it.id} value={it.name}>
                    {it.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-dark font-medium">NIP {role.label}</label>
              <input
                type="text"
                name={`${role.key}_ttd_nip`}
                disabled
                required
                value={input[`${role.key}_ttd_nip`] || ""}
                className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 
                           dark:border-slate-600 bg-slate-100 dark:bg-slate-700 
                           text-slate-700 dark:text-slate-300"
                placeholder="NIP otomatis muncul"
              />
            </div>
          </div>
        ))}
      </div> */}

      {/* Body Surat */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm text-dark font-medium">Body Surat</label>
          <button
            type="button"
            onClick={() => setContent(REVDOK_LHR)}
            className="px-3 py-1 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 
                       dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Copy Template LHR
          </button>
        </div>

        <div
          className="mb-3 p-3 rounded-lg bg-yellow-100 dark:bg-yellow-800 
                     text-yellow-800 dark:text-yellow-100 text-sm"
        >
          <strong>Note:</strong>  <br />
          1. Jika Anda pertama kali menyimpan, status permohonan review
          dokumen akan berubah menjadi <em>draft</em>. <br />
          2. TTD dan Nama Pembuat, Sekretaris, Ketua SPI akan diinput by sistem. Harap memperhatikan Nama Anggota SPI pada ADMIN USER
        </div>

        <HugeRte content={content} setContent={setContent} />
      </div>

      <ButtonSubmit animate={animate} />
    </form>
  );
};

export default SuratResponse;
