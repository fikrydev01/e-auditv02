import React, { useState } from 'react'
import { updateData } from '../../../../utils/api';
import { ActionButton } from '../../../../components/ButtonComp';
import { Send } from 'lucide-react';

const KonsultasiSelesai = ({reload, data, status_id}) => {
  const [animate, setAnimate] =useState(false)
    const handleSubmit = async (e) => {
      e.preventDefault();
  
          await updateData(`/spi/konsultasi/selesai?id=${data?.id}&status_id=${status_id}`, {
        setLoading: setAnimate,
        onSuccess: (res) => {
          console.log("Success!", res);
          reload()
        },
        onError: (err) => {
          setErr(err?.response?.data?.detail || "Something went wrong!");
        }
      });
    }
  return (
    <ActionButton onClick={(e)=>handleSubmit(e)} icon={Send} label="Selesai" color='red' />
  )
}

export default KonsultasiSelesai