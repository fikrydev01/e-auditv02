import { useState, useEffect } from "react";
import { UINJKTUNIT } from "../../../../../utils/spi";
import { fetchData, postData } from "../../../../../utils/api";
import { PencilIcon, Save, Trash2Icon } from "lucide-react";
import { FORMAT_RUPIAH } from "../../../../../constant/data";

const Invoice = ({ data }) => {
  const [dcash, setDcash] = useState([]);
  const [animate, setAnimate] = useState(false);
  const [utp, setUtp] = useState("");
  const filterUnit = UINJKTUNIT.find((r) => r.kode == utp);

  const [invoices, setInvoices] = useState([]);

  // console.log("invoce", invoices);
    useEffect(() => {
      setUtp(data?.kode_unit);
    }, [data]);


  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    id: "",
    periode_audit: data?.periode_audit,
    audit_id: data?.id,
    judul_pengadaan: "",
    nama_penyedia: "",
    jenis_pengadaan: "",
    nilai_kontrak: "",
    kode_unit: utp,
    nama_ppk: "",
    nama_pp: "",
  });

  useEffect(() => {
    setForm((prev) => ({ ...prev, kode_unit: utp }));
  }, [utp]);
  const getDatas = () => {
    fetchData(
      `/spi/audit_barjas_invoice?audit_id=${data.id}&kode_unit=${utp}&periode_audit=${data?.periode_audit}`,
      {
        setLoading: setAnimate,
        onSuccess: (res) => setInvoices(res.data || []),
        onError: (err) => console.log("err", err),
        // setError(err?.detail || "Terjadi kesalahan saat fetch data!"),
      }
    );
  };

  // Load data
  useEffect(() => {
    getDatas();
  }, [utp]);

  // Handle input perubahan form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form tambah data
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     await api.post("/api/invoices", form);
  //     setForm({
  //       periode_audit: "",
  //       judul_pengadaan: "",
  //       jenis_pengadaan: "",
  //       nilai_kontrak: "",
  //       kode_unit: "",
  //       nama_ppk: "",
  //       nama_pp: "",
  //     });
  //     loadData();
  //   };
  const handleSubmit = async (e) => {
    e.preventDefault();

    await postData("/spi/audit_barjas_invoice_store", form, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log("Successasda!", res);
        //   reload()
        //   setRld(!rld)
        getDatas();
      },
      onError: (err) => {
        setErr(err?.response?.data?.detail || "Something went wrong!");
      },
    });
  };

  // Hapus data
  const handleDelete = async (id) => {
    if (confirm("Hapus data ini?")) {
      await api.delete(`/api/invoices/${id}`);
      loadData();
    }
  };

  // Simpan perubahan baris (edit inline)
  const handleSave = async (id) => {
    const invoice = invoices.find((inv) => inv.id === id);
    await postData("/spi/audit_barjas_invoice_store", invoice, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        console.log("Successasda uodate!", res);
        //   reload()
        //   setRld(!rld)
        getDatas();
      },
      onError: (err) => {
        console.log("err", err);
        //   setErr(err?.response?.data?.detail || "Something went wrong!");
      },
    });
  };

  // Ubah isi tabel saat edit
  const handleEditChange = (id, field, value) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, [field]: value } : inv))
    );
  };

  return (
    <div className="flex flex-col">
      {utp ? (
        <div className="flex flex-col gap-4 mt-4">
          <div>
            <h1 className="text_h1">
              Kertas Kerja Inovice, Unit : {filterUnit?.unit}
            </h1>
          </div>
        </div>
      ) : (
        <div className="bg-red-100 p-8 rounded-xl mt-4">
          <p className="text-center">Anda belum memilih Unit, .....</p>
        </div>
      )}

      {utp && (
        <div className="flex flex-col gap-4 mt-4">
          {/* FORM INPUT */}

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-9/12">
              <div className="section-body">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                <h1 className="text_h1 font-bold text-gray-800">
                  Tabel Invoice
                </h1>
                    <button
                      className="bg-red-500 px-3 py-2 rounded text-xs text-white"
                      onClick={() => setEditingId("")}
                    >
                      Reset
                    </button>
                  </div>

                  <div className="overflow-x-auto bg-white rounded-xl shadow border">
                    <table className="min-w-full text-sm text-gray-700">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-2 border">No</th>
                          {/* <th className="p-2 border">Periode Audit</th> */}
                          <th className="p-2 border">Judul Pengadaan</th>
                          <th className="p-2 border">Jenis Pengadaan</th>
                          <th className="p-2 border">Nilai Kontrak</th>
                          {/* <th className="p-2 border">Kode Unit</th> */}
                          <th className="p-2 border">Nama PPK</th>
                          <th className="p-2 border">Nama PP</th>
                          {/* <th className="p-2 border">Content</th>
              <th className="p-2 border">Tanggal</th> */}
                          <th className="p-2 border text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoices.map((row, i) => (
                          <tr key={row.id} className="border hover:bg-gray-50">
                            <td className="p-2 border text-center">{i + 1}</td>

                            {[
                              //   "periode_audit",
                              "judul_pengadaan",
                              "jenis_pengadaan",
                              "nilai_kontrak",
                              //   "kode_unit",
                              "nama_ppk",
                              "nama_pp",
                              //   "content",
                            ].map((field) => (
                              <td key={field} className="p-2 border">
                                {editingId === row.id ? (
                                  <>
                                    {field === "nilai_kontrak" &&
                                      FORMAT_RUPIAH(row[field])}
                                    <input
                                      type="text"
                                      value={row[field] || ""}
                                      onChange={(e) =>
                                        handleEditChange(
                                          row.id,
                                          field,
                                          e.target.value
                                        )
                                      }
                                      className="border rounded p-1 w-full text-sm"
                                    />
                                  </>
                                ) : (
                                  <span>
                                    {field == "nilai_kontrak"
                                      ? FORMAT_RUPIAH(row[field])
                                      : row[field]}
                                  </span>
                                )}
                              </td>
                            ))}

                            {/* <td className="p-2 border text-xs text-gray-500">
                  {new Date(row.created_at).toLocaleString("id-ID")}
                </td> */}

                            <td className="p-2 border text-center">
                              {editingId === row.id ? (
                                <button
                                  onClick={() => handleSave(row.id)}
                                  className="bg-green-600 text-white px-3 py-2 rounded mr-1"
                                >
                                  <Save size={14} />
                                </button>
                              ) : (
                                <>
                                <button
                                  onClick={() => setEditingId(row.id)}
                                  className="bg-yellow-500 text-white px-3 py-2 rounded mr-1"
                                >
                                  <PencilIcon size={14} />
                                </button>
                              <button
                                onClick={() => handleDelete(row.id)}
                                className="bg-red-600 text-white px-3 py-2 rounded"
                              >
                                <Trash2Icon size={14} />
                              </button>
                                </>
                              )}
                            </td>
                          </tr>
                        ))}

                        {invoices.length === 0 && (
                          <tr>
                            <td
                              colSpan="11"
                              className="text-center py-4 text-gray-500 italic"
                            >
                              Tidak ada data invoice.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-3/12">
              <div className="section-body ">
                <h3 className="text_h3">Form Tambah Invoice</h3>
                <form
                  onSubmit={handleSubmit}
                  className="grid md:grid-cols-1 gap-3 mb-8 "
                >
                  {Object.keys(form)
                    .filter(
                      (key) =>
                        ![
                          "id",
                          "audit_id",
                          "periode_audit",
                          "kode_unit",
                        ].includes(key)
                    )
                    .map((key) => (
                      <div key={key} className="flex flex-col">
                        <label className="text-xs font-semibold text-gray-600 mb-1 uppercase">
                          {key.replace("_", " ")}
                          {key == "nilai_kontrak" && (
                            <span>{FORMAT_RUPIAH(form[key])}</span>
                          )}
                        </label>
                        {key === "content" ? (
                          <textarea
                            name={key}
                            value={form[key]}
                            onChange={handleChange}
                            className="border rounded-md p-2 text-sm"
                          />
                        ) : (
                          <input
                            type={key === "nilai_kontrak" ? "number" : "text"}
                            name={key}
                            value={form[key]}
                            onChange={handleChange}
                            className="border rounded-md p-2 text-sm"
                          />
                        )}
                      </div>
                    ))}

                  <button
                    type="submit"
                    className="col-span-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition text-xs"
                  >
                    Simpan Invoice
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* TABEL DATA */}
        </div>
      )}
    </div>
  );
};

export default Invoice;
