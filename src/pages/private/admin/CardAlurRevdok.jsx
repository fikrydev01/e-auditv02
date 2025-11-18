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
import { ALUR_REVDOK } from "../../../constant/data";

// mapping role ke warna & ikon
const roleConfig = {
  User: { color: "from-pink-200 to-pink-100", icon: User },
  Admin: { color: "from-blue-200 to-blue-100", icon: Users },
  "Ketua SPI": { color: "from-purple-200 to-purple-100", icon: CheckCircle },
  Sekretaris: { color: "from-yellow-200 to-yellow-100", icon: FileCheck },
  "Anggota SPI": { color: "from-green-200 to-green-100", icon: FileText },
  Default: { color: "from-gray-200 to-gray-100", icon: FilePublish },
};

const CardAlurRevdok = () => {
  return (
    <div className="flex flex-col overflow-x-auto gap-4 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-xl font-bold text-center uppercase mb-3">
        Alur Review Dokumen
      </h2>

      <div className="flex items-center mx-auto gap-4 flex-nowrap">
        {ALUR_REVDOK.map((step, idx) => {
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

              {idx < ALUR_REVDOK.length - 1 && (
                <ArrowRight className="w-6 h-6 text-gray-400 mt-4 flex-shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default CardAlurRevdok;
