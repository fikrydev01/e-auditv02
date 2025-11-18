import React from "react";
import { UINJKTUNIT } from "../utils/spi";

const UnitListAudit = ({ data, title }) => {

      const filterKas = (kode_unit) => {

        if(!data)return 
        const n = data?.find(it => it?.kode_unit == kode_unit)
        if(n){
            let nama = n.user_input_name
          return (
    
            <td className={`text-xs ${n ? `text-red-500` : `text-emerald-500`}`}>{nama ? nama : `Ok`} </td>
          )
        }else{
          return(
            <td>X</td>
    
          )
        }
      }
  return (
    <div className="section-body">
      <h3 className="text_h3">List UNIT {title}</h3>
      <table className="text-sm">
        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
          {UINJKTUNIT.map((r, i) => (
            <tr key={i}>
              <td className="uppercase">{r.kode}</td>
              {filterKas(r.kode)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UnitListAudit;
