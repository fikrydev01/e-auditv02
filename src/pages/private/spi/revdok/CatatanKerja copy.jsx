import { useState, useEffect } from "react";
import { fetchData, postData, updateData, userDetail } from "../../../../utils/api";

const CatatanKerja = ({ data }) => {
  const [notes, setNotes] = useState([]);
  const [animate, setAnimate] = useState(false);
  const [input, setInput] = useState({
    revdok_id: data?.id || "",
    narasi: "",
    jabatan: "ketua",
    respon_spi: "",
  });

  const user = userDetail;
  const jabatan = user?.jabatan;
  // const user = userDetail(); // pastikan fungsi ini mengembalikan { id, name, role }
  const isKetuaOrSekretaris = ["ketua", "sekretaris"].includes(
    user?.role?.toLowerCase()
  );
  // const isKetuaOrSekretaris = false;
// 
  // State untuk menyimpan respon yang sedang diedit
  const [editingResponses, setEditingResponses] = useState({});

  // 🔁 Ambil data catatan
  const loadNotes = async () => {
    await fetchData(`/spi/catatan_kerja?revdok_id=${data?.id}`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        setNotes(res?.data || []);
        setAnimate(false);
      },
      onError: (err) => console.error(err),
    });
  };

  useEffect(() => {
    loadNotes();
  }, [data]);

  // 📝 Input handler
  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      revdok_id: data?.id,
    }));
  };

  // 💾 Submit catatan baru (oleh ketua/sekretaris)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.narasi.trim()) return;

    await postData("/spi/catatan_kerja_store", input, {
      setLoading: setAnimate,
      onSuccess: () => {
        setInput({ revdok_id: data?.id, narasi: "", respon_spi: "" });
        loadNotes();
      },
      onError: (err) => console.error(err),
    });
  };

  // ✅ Toggle status done
  const toggleDone = async (note) => {
    await updateData(`/spi/catatan_kerja_done?note_id=${note.id}&done=${!note.done}`, {
      onSuccess: () => loadNotes(),
      onError: (err) => console.error(err),
    });
  };

  // 💬 Handler untuk mengubah respon di state lokal
  const handleResponseChange = (noteId, value) => {
    setEditingResponses(prev => ({
      ...prev,
      [noteId]: value
    }));
  };

  // 💬 Kirim respon anggota terhadap catatan (INSERT atau UPDATE)
  const submitRespon = async (noteId, respon_spi) => {
    if (!respon_spi.trim()) return;
    
    await postData(`/spi/catatan_kerja_respon_store`, {
      id: noteId,
      respon_spi,
      respon_spi_name: user.name,
    }, {
      onSuccess: () => {
        loadNotes();
        // Hapus dari state editing setelah berhasil submit
        setEditingResponses(prev => {
          const newState = { ...prev };
          delete newState[noteId];
          return newState;
        });
      },
      onError: (err) => console.error(err),
    });
  };

  // ✏️ Mulai edit respon
  const startEditResponse = (note) => {
    setEditingResponses(prev => ({
      ...prev,
      [note.id]: note.respon_spi || ""
    }));
  };

  // ❌ Batalkan edit
  const cancelEditResponse = (noteId) => {
    setEditingResponses(prev => {
      const newState = { ...prev };
      delete newState[noteId];
      return newState;
    });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-md border border-slate-200 dark:border-slate-700">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">
        Catatan Kerja SPI
      </h2>

      {/* Daftar Catatan */}
      <div className="space-y-3">
        {animate ? (
          <p className="text-slate-500 text-sm">Memuat catatan...</p>
        ) : notes.length > 0 ? (
          notes.map((note, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border transition-all ${
                note.jabatan?.toLowerCase() === "ketua"
                  ? "bg-blue-50 dark:bg-blue-900/20 border-blue-300"
                  : note.jabatan?.toLowerCase() === "sekretaris"
                  ? "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-300"
                  : "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  {note.is_me && isKetuaOrSekretaris && (
                    <input
                      type="checkbox"
                      checked={note.done}
                      onChange={() => toggleDone(note)}
                      className="h-4 w-4 accent-green-600 cursor-pointer"
                    />
                  )}
                  <p
                    className={`text-sm ${
                      note.done
                        ? "line-through text-slate-400"
                        : "text-slate-800 dark:text-slate-100"
                    }`}
                  >
                    {note.narasi}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                    note.jabatan?.toLowerCase() === "ketua"
                      ? "bg-blue-200 text-blue-800"
                      : note.jabatan?.toLowerCase() === "sekretaris"
                      ? "bg-indigo-200 text-indigo-800"
                      : "bg-emerald-200 text-emerald-800"
                  }`}
                >
                  {note.jabatan}
                </span>
              </div>

              <p className="text-xs text-slate-500 mt-1">
                — {note.from_name} ({new Date(note.created_at).toLocaleString("id-ID")})
              </p>

              {/* Tampilkan respon yang sudah ada */}
              {note.respon_spi && !editingResponses[note.id] && (
                <div className="mt-2 border-t border-slate-200 dark:border-slate-600 pt-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                        💬 SPI: {note.respon_spi_name}
                      </p>
                      <p className="text-xs text-slate-700 dark:text-slate-200 mt-1">
                        {note.respon_spi}
                      </p>
                    </div>
                    {/* Tombol edit untuk anggota */}
                    {jabatan.toLowerCase() === "anggota" && note.jabatan?.toLowerCase() !== "anggota" && (
                      <button
                        onClick={() => startEditResponse(note)}
                        className="ml-2 px-2 py-1 text-xs bg-yellow-500 hover:bg-yellow-600 text-white rounded transition-all"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Form respon - muncul untuk:
                  1. Anggota yang belum memberikan respon
                  2. Anggota yang sedang mengedit respon */}
              {jabatan.toLowerCase() === "anggota" && 
                note.jabatan?.toLowerCase() !== "anggota" && 
                (!note.respon_spi || editingResponses[note.id]) && (
                <div className="mt-2">
                  <textarea
                    className="w-full p-2 text-sm border border-slate-300 rounded-lg dark:bg-slate-700 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500"
                    placeholder="Tulis respon SPI..."
                    rows="2"
                    value={editingResponses[note.id] !== undefined ? editingResponses[note.id] : ""}
                    onChange={(e) => handleResponseChange(note.id, e.target.value)}
                  ></textarea>
                  <div className="flex justify-end gap-2 mt-2">
                    {/* Tombol batal hanya muncul saat edit */}
                    {editingResponses[note.id] !== undefined && (
                      <button
                        type="button"
                        onClick={() => cancelEditResponse(note.id)}
                        className="px-3 py-1 text-xs bg-gray-500 hover:bg-gray-600 text-white rounded transition-all"
                      >
                        Batal
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => submitRespon(note.id, editingResponses[note.id] || "")}
                      disabled={!editingResponses[note.id]?.trim()}
                      className="px-3 py-1 text-xs bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white rounded transition-all"
                    >
                      {editingResponses[note.id] !== undefined ? "Update" : "Kirim"} Respon
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-slate-500 text-sm">Belum ada catatan.</p>
        )}
      </div>

      {/* Form tambah catatan - hanya ketua & sekretaris */}
      {isKetuaOrSekretaris && (
        <form onSubmit={handleSubmit} className="mt-5">
          <textarea
            name="narasi"
            value={input.narasi}
            onChange={handleChange}
            placeholder="Tulis catatan baru..."
            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100"
            rows="3"
          ></textarea>
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-all"
            >
              Simpan Catatan
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CatatanKerja;