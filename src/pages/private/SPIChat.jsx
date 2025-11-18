import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { fetchData, postData } from "../../utils/api";
import AutoResizeTextarea from "../../components/AutoResizeTextarea";
import { FORMAT_DATE_HOUR_IND } from "../../constant/data";

// Dummy data sementara (hapus kalau API aktif)
const chatData = [
  { from_id: 1, to_id: 2, narasi: "Halo, ada yang bisa dibantu?", isMe: true, time: "09:00" },
  { from_id: 2, to_id: 1, narasi: "Saya ingin konsultasi SPI. ajiangak kajgsdaiej agdjaeij agameaigjag agiegiagianga", isMe: false, time: "09:01" },
  { from_id: 1, to_id: 2, narasi: "Silakan, apa yang ingin ditanyakan?", isMe: true, time: "09:02" },
];

const SPIChat = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [messages, setMessages] = useState(chatData);
  const [rld, setRld] = useState(false);
  const [input, setInput] = useState({ konslap_id: data?.id, narasi: "" });

  const chatEndRef = useRef(null);

  useEffect(() => {
    setInput((prev) => ({ ...prev, konslap_id: data?.id }));
  }, [data]);

  const getDatas = () => {
    fetchData(`/spi/konslap_chat?konslap_id=${data?.id}`, {
      setLoading: setAnimate,
      onSuccess: (res) => setMessages(res?.data || []),
      onError: (err) => console.error(err?.detail || "Something went wrong!"),
    });
  };

  useEffect(() => {
    if (open) getDatas();
  }, [data, rld, open]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.narasi.trim()) return;

    await postData("/spi/konslap_chat_store", input, {
      setLoading: setAnimate,
      onSuccess: () => {
        setRld(!rld);
        setInput({ konslap_id: data?.id, narasi: "" });
      },
      onError: (err) => console.log("err", err),
    });
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!open ? (
          <button
            onClick={() => setOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition flex items-center justify-center"
          >
            <MessageCircle size={26} />
          </button>
        ) : (
          <div
            className={`w-[380px] h-[75vh] flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-indigo-100 dark:border-gray-700 overflow-hidden
              transition-all duration-300 ease-in-out transform ${
                open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-indigo-100 dark:border-gray-700 flex items-center justify-between bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <div>
                <div className="font-semibold">INTERNAL SPI CHAT</div>
                <div className="text-xs opacity-80">Online</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3 scrollbar-thin scrollbar-thumb-indigo-200">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`relative max-w-[70%] px-4 py-2 rounded-2xl shadow text-sm break-words
                      ${msg.isMe
                        ? "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 text-white"
                        : "bg-gray-100 dark:bg-gray-800 border border-indigo-100 text-gray-800 dark:text-gray-200"}
                    `}
                  >
                    <span>{msg.narasi}</span>
                    <div className="flex flex-col mt-2">
                      {!msg.isMe && (
                        <span className="text-right text-xs text-gray-500 dark:text-gray-400">
                          {msg?.from_name || "User"}
                        </span>
                      )}
                      <div
                        className={`text-xs text-right mt-1 ${
                          msg.isMe ? "text-white/80" : "text-gray-500"
                        }`}
                      >
                        {FORMAT_DATE_HOUR_IND(msg?.created_at) || msg?.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="px-3 py-2 bg-gray-50 dark:bg-gray-800 border-t border-indigo-100 dark:border-gray-700 flex items-center gap-2"
            >
              <AutoResizeTextarea
                value={input?.narasi}
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, narasi: e.target.value }))
                }
                placeholder="Ketik pesan..."
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-indigo-500 text-white shadow hover:bg-indigo-600 transition flex items-center justify-center"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default SPIChat;
