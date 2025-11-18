import { ALUR_AUDIT } from "../../../constant/data";
import React from "react";
import {
  User,
  Users,
  CheckCircle,
  FileText,
  FileCheck,
  FileText as FilePublish,
  ArrowRight,
} from "lucide-react";


export default function CardAlurAudit() {
const roleConfig = {
  User: { color: "from-pink-200 to-pink-100", icon: User },
  Admin: { color: "from-blue-200 to-blue-100", icon: Users },
  "Ketua SPI": { color: "from-purple-200 to-purple-100", icon: CheckCircle },
  Sekretaris: { color: "from-yellow-200 to-yellow-100", icon: FileCheck },
  "Anggota SPI": { color: "from-green-200 to-green-100", icon: FileText },
  Default: { color: "from-gray-200 to-gray-100", icon: FilePublish },
};

  return (
    <div className="w-full bg-white overflow-x-auto py-6 rounded-xl">
      <h2 className="text-center text-xl font-bold mb-6">Alur AUDIT SPI AO/BARJAS/PDTT</h2>
      <div className="flex items-center gap-4 px-8">

                {ALUR_AUDIT.map((step, idx) => {
                  const cfg = roleConfig[step.role] || roleConfig.Default;
                  const IconComp = cfg.icon;
        
                  return (
                    <React.Fragment key={step.id}>
                      <div
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-r ${cfg.color} shadow-md min-w-[120px]`}
                      >
                        <IconComp className="w-6 h-6 text-gray-700" />
                        <span className="text-xs font-semibold text-gray-800 text-center">
                         {step?.id}, {step.spi_status}
                        </span>
                        <p className="text-[10px] text-gray-600 text-center">
                         Role: {step.role}
                        </p>
                      </div>
        
                      {idx < ALUR_AUDIT.length - 1 && (
                        <ArrowRight className="w-6 h-6 text-gray-400 mt-4 flex-shrink-0" />
                      )}
                    </React.Fragment>
                  );
                })}
        {/* {ALURKONSLAP.map((step, index) => (
          <div key={step.id} className="flex items-center">
<div
  className={`flex flex-col items-center justify-center w-32 h-28 rounded-xl shadow-md ${step.color}`}
>
              <div className="flex items-center gap-3">
              <span className="text-xs font-semibold">{index + 1}</span>
              {step.icon}

              </div>
              <span className="mt-2 text-sm font-medium text-center">{step.spi_status}</span>
            </div>
            {index < ALURKONSLAP.length - 1 && (
              <span className="mx-2 text-gray-400">➝</span>
            )}
          </div>
        ))} */}
      </div>
    </div>
  );
}
