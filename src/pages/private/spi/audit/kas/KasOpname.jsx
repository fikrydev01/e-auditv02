import React, { useState } from "react";
import AddForm from "./AddForm";
import UploadKas from "./UploadKas";
import DataKas from "./DataKas";
import Laporan from "./Laporan";
import BeritaAcara from "./BeritaAcara";
import { ButtonMod } from "../../../../../components/ButtonComp";

const KasOpname = ({ audit }) => {
  const [mod, setMod] = useState("laporan");

  const changeMod = (md) => {
    setMod(md);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-end gap-2">
        <ButtonMod
          title="1. Form Laporan"
          mod={mod}
          selected={"laporan"}
          onClick={() => changeMod("laporan")}
        />
        <ButtonMod
          title="2. Data Kas Opname"
          mod={mod}
          selected={"data"}
          onClick={() => changeMod("data")}
        />
        <ButtonMod
          title="2. Upload Data Kas"
          mod={mod}
          selected={"upload"}
          onClick={() => changeMod("upload")}
        />
        <ButtonMod
          title="4. Berita Acara"
          mod={mod}
          selected={"ba"}
          onClick={() => changeMod("ba")}
        />
      </div>
      {mod == "laporan" && <Laporan audit={audit} />}
      {mod == "data" && <DataKas audit={audit} />}
      {mod == "upload" && <UploadKas audit={audit} />}
      {mod == "ba" && <BeritaAcara audit={audit} />}
    </div>
  );
};

export default KasOpname;
