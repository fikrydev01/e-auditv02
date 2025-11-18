import { DownloadCloud, PrinterIcon } from 'lucide-react'
import React from 'react'

const BtnPrintSurtugAuditTteKemenag = ({surtug}) => {
  const url = surtug?.tte_kemenag
    // let path = APP_MAIN_URL + `/val/surat/surtug?uuid=${uuid || ""}`;
  return (
    <div>
      {url ? 
      <a href={url} target="_blank" rel="noopener noreferrer" className="bg-orange-400 text-xs text-white px-3 py-1 rounded-md flex items-center gap-2 w-fit hover:bg-orange-600 transition-colors">
        <DownloadCloud />

      Download TTE Kemeang
      </a>
      : 
      <button className="bg-orange-400 text-xs text-white px-3 py-1 rounded-md flex items-center gap-2 w-fit hover:bg-orange-600 transition-colors">
        <DownloadCloud />
        No TTE Kemeang
      </button>
      }
      </div>
  )
}

export default BtnPrintSurtugAuditTteKemenag