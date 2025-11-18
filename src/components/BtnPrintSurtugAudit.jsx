import { PrinterIcon } from 'lucide-react'
import React from 'react'

const BtnPrintSurtugAudit = ({audit, stte, surtug}) => {
  const url = `${window.location.origin}/val/surat/surtug?uuid=${surtug.uuid}&stte=${stte}`
    // let path = APP_MAIN_URL + `/val/surat/surtug?uuid=${uuid || ""}`;
  return (
    <div>
      <a href={url} target="_blank" rel="noopener noreferrer" className="bg-red-400 text-xs text-white px-3 py-1 rounded-md flex items-center gap-2 w-fit hover:bg-red-600 transition-colors">
        <PrinterIcon />

      Print {stte ? `QR` : `Tanpa QR`}
      </a>
      </div>
  )
}

export default BtnPrintSurtugAudit