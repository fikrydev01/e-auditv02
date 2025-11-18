import { useState } from "react";
import { ButtonSubmit } from "../../../../components/ButtonComp";
import { postData } from "../../../../utils/api";

const Add = () => {
  const role = [
    { role: "admin" },
    { role: "spi" },
    { role: "unit" },
  ];

  const [animate, setAnimate] = useState(false);
  const [input, setInput] = useState({});

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAnimate(true);
    await postData(`/adm/add_user`, input)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => setAnimate(false));
  };

  return (
    <div className=" p-6 bg-white dark:bg-gray-900 shadow-lg rounded-2xl">
      <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-6">
        ➕ Form Add User
      </h1>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
            name="email"
            type="email"
            placeholder="Masukkan email"
            required
            onChange={handleChange}
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Name
          </label>
          <input
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
            name="name"
            type="text"
            placeholder="Masukkan nama"
            required
            onChange={handleChange}
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Role
          </label>
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
            name="role"
            onChange={handleChange}
            required
          >
            <option value="">Pilih role</option>
            {role.map((r, i) => (
              <option key={i} value={r.role}>
                {r.role}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <ButtonSubmit animate={animate} />
      </form>
    </div>
  );
};

export default Add;
