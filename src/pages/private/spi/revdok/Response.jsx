import React from 'react'
import SPIChatRevdok from '../../SPIChatRevdok'
import SuratResponse from './SuratResponse'
import CatatanKerja from './CatatanKerja'
import ChatBot from '../../../../components/ChatBot'
import ChatSpiComp from '../../../../components/ChatSpiComp'

const Response = ({revdok}) => {
  return (
    <div >
        <div className='flex flex-col md:flex-row gap-4 md:flex-8'>
            <div className='w-full flex flex-col gap-4'>
              <div className='section-body'>
              <SuratResponse revdok={revdok} />

              </div>
              <div className='section-body'>
            <CatatanKerja revdok={revdok} />
                </div>
            {/* <ChatSpiComp /> */}
            
            <SPIChatRevdok data={revdok} />
            </div>
       
            {/* <div className='w-full lg:w-2/12'>
            <div className='flex flex-col gap-4'>

            </div>
            </div> */}
        </div>
    </div>
  )
}

export default Response