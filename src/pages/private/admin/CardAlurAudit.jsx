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
import { ALUR_AUDIT } from "../../../constant/data";

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
    <div className="w-full bg-white dark:bg-gray-900 rounded-2xl shadow-md py-8">
      <h2 className="text-center text-xl font-bold text-gray-800 dark:text-gray-100 mb-8">
        Alur Audit SPI (AO / BARJAS / PDTT)
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-4 px-6">
        {ALUR_AUDIT.map((step, idx) => {
          const cfg = roleConfig[step.role] || roleConfig.Default;
          const IconComp = cfg.icon;

          return (
            <React.Fragment key={step.id}>
              <div
                className={`flex flex-col items-center justify-between gap-2 w-40 h-36 bg-gradient-to-br ${cfg.color} rounded-xl p-4 shadow-sm hover:shadow-md transition`}
              >
                <div className="flex flex-col items-center">
                  <IconComp className="w-7 h-7 text-gray-700 mb-1" />
                  <span className="text-xs font-semibold text-gray-800 text-center capitalize">
                    {step.spi_status}
                  </span>
                  <p className="text-xs text-gray-600 mt-1">
                    Role: <span className="font-medium">{step.role}</span>
                  </p>
                </div>

                <span className="text-[10px] text-gray-500">
                  Step {idx + 1}
                </span>
              </div>

              {idx < ALUR_AUDIT.length - 1 && (
                <ArrowRight className="w-6 h-6 text-gray-400 hidden sm:block" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
