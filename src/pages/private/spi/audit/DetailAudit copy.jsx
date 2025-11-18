import React from "react";
import { ButtonKembali } from "../../../../components/ButtonComp";
import SuratTugas from "./SuratTugas";
import StockKertasKerja from "./StockKertasKerja";
import BarangHabisPakai from "./stock/BarangHabisPakai";
import KasOpname from "./kas/KasOpname";
import Selesai from "./Selesai";
import SPIChatAudit from "../../SPIChatAudit";

const DetailAudit = ({ dtp, kembali }) => {
  const audit = dtp?.audit || {};
  // const tipe_audit = audit?.tipe_audit;
  // stock /cash
  const tipe_audit = 'cash';

  console.log("dtp", dtp)

  return (
    <div className="flex flex-col gap-6">
      {/* Tombol kembali */}
      <div>
        <ButtonKembali onClick={kembali} />
      </div>

      {/* DETAIL AUDIT */}
      <div className="bg-white shadow rounded-2xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 uppercase">
          Detail Audit {dtp?.level} TIM
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8 text-sm">
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">ID:</span> {audit?.id}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">UID:</span> {audit?.uuid}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Tipe:</span>{" "}
            {audit?.tipe_audit}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Unit:</span>{" "}
            {audit?.kode_unit}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Periode:</span>{" "}
            {audit?.periode_audit}
          </p>
          <p className="text-gray-600 md:col-span-2">
            <span className="font-medium text-gray-800">Catatan:</span>{" "}
            {audit?.catatan}
          </p>
          <Selesai audit={audit} />
        </div>

        {/* Auditor */}
        {audit?.listauditor?.length > 0 && (
          <div className="mt-6">
            <h3 className="text-md font-semibold text-gray-800 mb-2">
              Tim Auditor
            </h3>
            <ul className="space-y-1">
              {[...audit.listauditor]
                .sort((a, b) => {
                  if (a.level === "ketua") return -1;
                  if (b.level === "ketua") return 1;
                  return 0;
                })
                .map((auditor, index) => (
                  <li
                    key={index}
                    className="text-gray-700 flex items-center gap-2"
                  >
                    <span className="font-medium">
                      {auditor?.userdetail?.name}
                    </span>
                    <span className="text-xs text-white bg-orange-500 rounded px-2 py-0.5 uppercase">
                      {auditor?.level}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-2 md:gap-4 ">
        <div className="w-full md:w-9/12">
        {tipe_audit === 'stock' && 
      <BarangHabisPakai audit={audit} />
        
        }
        {tipe_audit === 'cash' && 

<KasOpname audit={audit} />
        
        }
        
        </div>
        <div className="w-full md:w-3/12">
         <SPIChatAudit data={audit} />
        </div>
      </div>
    </div>
  );
};

export default DetailAudit;
