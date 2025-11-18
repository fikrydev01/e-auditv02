import { useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import List from "./users/List";
import Add from "./users/Add";
import { List as ListIcon, UserPlus } from "lucide-react";
import UserSpi from "./users/UserSpi";

const Users = () => {
  const [mod, setMod] = useState("list");

  return (
    <section className="section-container min-h-screen">
      <Breadcrumbs title="Konfigurasi Users" />

      {/* Button Switch */}
      <div className="flex gap-3 mb-2">
        <button
          onClick={() => setMod("list")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all duration-200 
            ${
              mod === "list"
                ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white"
                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
            }`}
        >
          <ListIcon className="w-4 h-4" />
          List
        </button>

        <button
          onClick={() => setMod("add")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all duration-200 
            ${
              mod === "add"
                ? "bg-gradient-to-r from-green-400 to-green-500 text-white"
                : "bg-green-50 text-green-600 hover:bg-green-100"
            }`}
        >
          <UserPlus className="w-4 h-4" />
          Tambah User
        </button>
        <button
          onClick={() => setMod("spi")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all duration-200 
            ${
              mod === "spi"
                ? "bg-gradient-to-r from-green-400 to-green-500 text-white"
                : "bg-green-50 text-green-600 hover:bg-green-100"
            }`}
        >
          <UserPlus className="w-4 h-4" />
          User SPI
        </button>
      </div>

      {/* Render component */}
      {mod === "list" && <List />}
      {mod === "add" && <Add />}
      {mod === "spi" && <UserSpi />}

    </section>
  );
};

export default Users;
