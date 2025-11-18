import React from "react";
import { ActionButton } from "../../../components/ButtonComp";
import {
  ArrowLeftCircleIcon,
  FileText,
  User,
  Clipboard,
  Calendar,
  Link as LinkIcon,
  FileCheck,
} from "lucide-react";
import RevdokLog from "./RevdokLog";
import RevdokSuratResponse from "./RevdokSuratResponse";
import { FILTER_ALUR_REVDOK_USER } from "../../../constant/data";
import NoDataFound from "../../../components/NoDataFound";
import Breadcrumbs from "../../../components/Breadcrumbs";

const RevdokDetail = ({ kembali, dtp }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "proses":
        return "bg-yellow-400 text-yellow-900";
      case "selesai":
        return "bg-green-400 text-green-900";
      case "pending":
        return "bg-gray-400 text-gray-900";
      case "tolak":
        return "bg-red-400 text-white";
      default:
        return "bg-blue-400 text-blue-900";
    }
  };

  const infoItem = (icon, label, value, isLink = false) => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 dark:text-gray-200">
        {icon}
        <span className="font-medium w-32">{label}:</span>
      </div>
      {isLink ? (
        <a
          href={value}
          target="_blank"
          className="text-blue-500 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          {value?.includes("http") ? "Lihat" : value}
        </a>
      ) : value ? (
        <span className="text-gray-800 dark:text-gray-200">{value}</span>
      ) : (
        <span className="text-gray-400 dark:text-gray-500">-</span>
      )}
    </div>
  );

  return (
    <section className="section-container">
      {/* Kembali Button */}

      <Breadcrumbs title="Reviu Dokumen" />
      <div className="">
        <ActionButton
          onClick={kembali}
          icon={ArrowLeftCircleIcon}
          color="red"
          label="Kembali"
          className="hover:scale-105 transition-transform"
        />
      </div>



      <div className="">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Detail Card */}
          <div className="w-full md:w-10/12 flex flex-col gap-6">
            <div className="w-full flex flex-col section-body">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Detail Dokumen Permohonan
              </h2>
              {infoItem(
                <FileText className="w-5 h-5 text-gray-600 dark:text-gray-300" />,
                "Nomor Surat",
                dtp?.nosur
              )}
              {infoItem(
                <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />,
                "Pemilik",
                dtp?.pemilik
              )}
              {infoItem(
                <Clipboard className="w-5 h-5 text-gray-600 dark:text-gray-300" />,
                "Tugas",
                dtp?.tugas
              )}
              <div className="flex items-center gap-3">
                <FileCheck className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                <span className="font-medium text-dark">Status Proses:</span>
                <span
                  className={`inline-block px-4 py-1 rounded-full font-semibold text-sm ${getStatusClass(
                    dtp?.status
                  )}`}
                >
                  {FILTER_ALUR_REVDOK_USER(dtp?.status_id)}
                </span>
                   <span
                  className={`inline-block px-4 py-1 rounded-full font-semibold text-sm ${getStatusClass(
                    dtp?.status
                  )}`}
                >
                  {dtp?.status?.toUpperCase()}
                </span>
              </div>
              {infoItem(
                <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-300" />,
                "Dibuat Pada",
                dtp?.created_at
                  ? new Date(dtp?.created_at).toLocaleString()
                  : "-"
              )}
              {infoItem(
                <LinkIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />,
                "Dokumen URL",
                dtp?.dokumen_url,
                true
              )}
              {infoItem(
                <LinkIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />,
                "Surat URL",
                dtp?.surat_url,
                true
              )}
            </div>

            {dtp?.status_id === 8 ? (
              <RevdokSuratResponse dtp={dtp} />
            ) : (
              <NoDataFound desc="Surat Response" />
            )}
          </div>

          {/* Log Dokumen */}
          <div className="w-full md:w-2/12">
            <RevdokLog data={dtp} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevdokDetail;
