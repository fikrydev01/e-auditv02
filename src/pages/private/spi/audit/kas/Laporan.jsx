import { useState, useEffect } from "react";
import { ButtonSubmit } from "../../../../../components/ButtonComp";
import { fetchData, postData } from "../../../../../utils/api";
// import { ButtonSubmit } from "../../../../../../components/ButtonComp";
// import { fetchData, postData } from "../../../../../../utils/api";


const Laporan = ({ audit }) => {
  const [animate, setAnimate] = useState(false);
  const [err, setErr] = useState("");
  const [input, setInput] = useState({
    audit_id: audit?.id || "",
    periode_audit: audit?.periode_audit || "",
    jenis: audit?.tipe_audit,
    tanggal: "",
    operator_nama: "",
    operator_nip: "",
    kabag_nama: "",
    kabag_nip: "",
  });

  const getDatas = () => {
    fetchData(`/spi/audit_laporan?audit_id=${audit.id}`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log("Success audti!", res);
        setInput(res.data || "");
      },
      onError: (err) => {
        setErr(err?.detail || "Something went wrong!");
      },
    });
  };
  useEffect(() => {
    getDatas();
  }, [audit]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await postData("/spi/audit_laporan_store", input, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log("Success!", res);
      },
      onError: (err) => {
        setErr(err?.response?.data?.detail || "Something went wrong!");
      },
    });
  };

  return (
    <div className="flex flex-col section-body">
      <h2 className="text_h2">Form Laporan Auditee / UNIT</h2>

      {err && (
        <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/40 rounded-xl p-2 mb-2">
          {err}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Tanggal */}
        <div className="form-group">
          <label className="form-label" htmlFor="tanggal">
            Tanggal *
          </label>
          <input
            id="tanggal"
            type="date"
            name="tanggal"
            value={input.tanggal}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
          {/* Operator */}
          <div className="form-group">
            <label className="form-label" htmlFor="operator_nama">
              Operator Nama *
            </label>
            <input
              id="operator_nama"
              type="text"
              name="operator_nama"
              value={input.operator_nama}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="operator_nip">
              Operator NIP *
            </label>
            <input
              id="operator_nip"
              type="text"
              name="operator_nip"
              value={input.operator_nip}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
          {/* Kabag */}
          <div className="form-group">
            <label className="form-label" htmlFor="kabag_nama">
              Kabag Nama *
            </label>
            <input
              id="kabag_nama"
              type="text"
              name="kabag_nama"
              value={input.kabag_nama}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="kabag_nip">
              Kabag NIP *
            </label>
            <input
              id="kabag_nip"
              type="text"
              name="kabag_nip"
              value={input.kabag_nip}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="form-group">
          <ButtonSubmit title="Simpan" animate={animate} />
        </div>
      </form>
    </div>
  );
};

export default Laporan;
