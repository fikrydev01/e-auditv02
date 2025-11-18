import React, { useState } from "react";


import { ButtonSubmit } from "../../../../components/ButtonComp";
import { postData } from "../../../../utils/api";

const Form = ({ reload, dtp }) => {
  const [animate, setAnimate] = useState(false);
  const [input, setInput] = useState({
    id: dtp?.id,
    email: dtp?.email || '',
    role: dtp.role || '',
  });
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    postData("/adm/add_user", input, {
      setLoading: setAnimate,
      requireConfirm: false,
      onSuccess: (res) => {
        console.log("disnis!", res);
        reload();
      },
      onError: (err) => {
        console.log("err", err);
        // setErr(err?.response?.data?.detail || "Something went wrong!");
      },
    });
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
      <div>
        <label className="block text-sm">Email *</label>
        <input
          className="form_input"
          name="email"
          value={input?.email}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label className="block text-sm">Role</label>
        <select
          className="w-full form_select"
          value={input?.role}
          name="role"
          onChange={(e) => handleChange(e)}
        >
          <option value="">Pilih role</option>
          <option value="admin">Admin</option>
          <option value="spi">Anggota SPI</option>
        </select>
      </div>
      <div className="flex justify-end gap-2">
        <ButtonSubmit animate={animate} />
      </div>
    </form>
  );
};

export default Form;
