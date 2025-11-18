import { useEffect, useState } from "react";
import HugeRte from "../../../../../components/HugeRte";
import { ButtonSubmit } from "../../../../../components/ButtonComp";
import { fetchData, postData } from "../../../../../utils/api";
import { BA_AUDIT_KAS } from "../../../../../constant/data";
// import HugeRte from "../../../../../../components/HugeRte";
// import { BA_AUDIT_KAS } from "../../../../../../constant/data";
// import { ButtonSubmit } from "../../../../../../components/ButtonComp";
// import { fetchData, postData } from "../../../../../../utils/api";


const BeritaAcara = ({audit}) => {
  const [animate, setAnimate] = useState(false);
  const [content, setContent] = useState(null);
  const template = () => setContent(BA_AUDIT_KAS);

  const [rld, setRld] = useState(false)

    const getDatas = () => {
      fetchData(`/spi/audit_ba?audit_id=${audit.id}&kode_unit=${audit?.kode_unit}`, {
        setLoading: setAnimate,
        onSuccess: (res) => {
          console.log("Success content!", res);
          setContent(res.data?.content || null);
        },
        onError: (err) => {
          setErr(err?.detail || "Something went wrong!");
        },
      });
    };
    useEffect(() => {
      getDatas();
    }, [audit, rld]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const input = {
        audit : audit,
        content : content
      }
  
      await postData("/spi/audit_ba_store", input, {
        setLoading: setAnimate,
        onSuccess: (res) => {
          console.log("Success!", res);
          setRld(!rld)
        },
        onError: (err) => {
          setErr(err?.response?.data?.detail || "Something went wrong!");
        },
      });
    };


  return (
    <form onSubmit={(e)=>handleSubmit(e)}
    className="flex flex-col gap-3"
    >
        <div className="flex items-center justify-end mb-4">
      <button
      className="bg-red-400 text-xs text-white px-3 py-1 rounded-md"
      onClick={template}>
        Copy BA KAS
      </button>

        </div>

      <HugeRte content={content} setContent={setContent} />
      <ButtonSubmit />
    </form>
  );
};

export default BeritaAcara;
