import React, { useState, useEffect } from 'react'
import HugeRte from '../../../../components/HugeRte'
import { ButtonSubmit } from '../../../../components/ButtonComp'
import { postData } from '../../../../utils/api'


const Review = ({data, reload}) => {
    const [animate, setAnimate] = useState(false)
    const [content, setContent] = useState(null)

    const [input, setInput] = useState({
        konslap_id : data?.id,
    })

    useEffect(() => {
        setContent(data?.res?.jawaban)
    },[data])
    useEffect(() => {
        setInput({
            konslap_id : data?.id,
            jawaban : content
        })
    },[content])
  const handleSubmit = async (e) => {
    e.preventDefault();

        await postData('/spi/konslap/response_store', input, {
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
    <div className=' flex flex-col gap-2 w-full'>
        <h2 className='text_h2'>Input Review</h2>
        {/* <h3>Reviewer : {data?.res?.}</h3> */}
        <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-3'>
        <HugeRte content={content} setContent={setContent}/>
        <ButtonSubmit animate={animate} />

        </form>
    </div>
  )
}

export default Review