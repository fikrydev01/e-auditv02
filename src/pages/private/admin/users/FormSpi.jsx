import React, { useState } from "react";
import Select from "react-select";
import { ButtonSubmit } from "../../../../components/ButtonComp";
import { postData } from "../../../../utils/api";

const FormSpi = ({ allusers, reload, dtp }) => {
  const [animate, setAnimate] = useState(false);
  const [input, setInput] = useState({
    id: dtp?.id,
    name: dtp?.name || "",
    user_id: dtp?.user_id || "",
    jabatan: dtp?.jabatan || "",
    div_id: dtp?.div_id || "",
    nip: dtp?.nip || "",
    kepangkatan: dtp?.kepangkatan || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔍 Handle khusus untuk react-select (user_id)
  const handleUserSelect = (selectedOption) => {
    setInput((prev) => ({
      ...prev,
      user_id: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData("/adm/users_spi_store", input, {
      setLoading: setAnimate,
      requireConfirm: false,
      onSuccess: (res) => {
        console.log("disnis!", res);
        reload();
      },
      onError: (err) => {
        console.log("err", err);
      },
    });
  };

  // Opsi untuk react-select
  const userOptions =
    allusers?.map((u) => ({
      value: u.id,
      label: u.email,
    })) || [];

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white dark:bg-gray-900 p-6"
    >
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Name *
        </label>
        <input
          className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-slate-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm px-3 py-2"
          name="name"
          value={input?.name}
          onChange={handleChange}
        />
      </div>

      {/* Jabatan */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Jabatan *
        </label>
        <select
          className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-slate-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm px-3 py-2"
          value={input?.jabatan}
          name="jabatan"
          onChange={handleChange}
        >
          <option value="">Pilih Jabatan</option>
          <option value="ketua">Ketua</option>
          <option value="sekretaris">Sekretaris</option>
          <option value="anggota">Anggota</option>
        </select>
      </div>

      {/* NIP */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          NIP / NRP *
        </label>
        <input
          type="number"
          className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-slate-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm px-3 py-2"
          name="nip"
          value={input?.nip}
          onChange={handleChange}
        />
      </div>

      {/* Kepangkatan */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Kepangkatan *
        </label>
        <input
          type="text"
          className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-slate-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm px-3 py-2"
          name="kepangkatan"
          value={input?.kepangkatan}
          onChange={handleChange}
        />
      </div>

      {/* Divisi */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Divisi
        </label>
        <select
          className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-slate-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm px-3 py-2"
          value={input?.div_id}
          name="div_id"
          onChange={handleChange}
        >
          <option value="">Pilih Divisi</option>
          {[1, 2, 3, 4, 5, 6].map((d) => (
            <option key={d} value={d}>
              Divisi {d}
            </option>
          ))}
        </select>
      </div>

      {/* 🔍 User Email (Searchable) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          User Email
        </label>
        <Select
          options={userOptions}
          isClearable
          placeholder="Cari atau pilih user email..."
          value={userOptions.find(
            (opt) => opt.value === parseInt(input.user_id)
          )}
          onChange={handleUserSelect}
          className="text-sm"
          styles={{
            control: (base) => ({
              ...base,
              borderColor: "#d1d5db",
              borderRadius: "0.5rem",
              padding: "2px",
              backgroundColor: "white",
            }),
            menu: (base) => ({
              ...base,
              zIndex: 9999,
            }),
          }}
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <ButtonSubmit animate={animate} />
      </div>
    </form>
  );
};

export default FormSpi;
