import React from 'react'
import { QRCodeCanvas } from "qrcode.react";

const QrcodeComp = ({path, size}) => {

  
  return (
          <QRCodeCanvas
        value={path}
        size={size ? size : 100}
        level={"H"}
        includeMargin={true}
      />
  )
}

export default QrcodeComp