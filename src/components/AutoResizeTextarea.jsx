import { motion } from "framer-motion";
import React, { useRef, useLayoutEffect, useState } from "react";

const AutoResizeTextarea = ({ value, onChange, placeholder }) => {
  const textareaRef = useRef(null);
  const [height, setHeight] = useState("auto");

  useLayoutEffect(() => {
    if (textareaRef.current) {
      // Reset height supaya bisa mengecil juga
      textareaRef.current.style.height = "auto";
      setHeight(`${textareaRef.current.scrollHeight}px`);
    }
  }, [value]);

  return (
    <motion.textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ height }}
      animate={{ height }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="flex-1 px-4 py-2 rounded-xl border border-indigo-100 bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none overflow-hidden"
    />
  );
};

export default AutoResizeTextarea;
