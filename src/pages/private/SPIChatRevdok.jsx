import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, RefreshCcwDot, Send } from "lucide-react";
import { fetchData, postData } from "../../utils/api";
import AutoResizeTextarea from "../../components/AutoResizeTextarea";
import { FORMAT_DATE_HOUR_IND } from "../../constant/data";

const SPIChatRevdok = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [messages, setMessages] = useState([]);
  const [rld, setRld] = useState(false);
  const [input, setInput] = useState({ revdok_id: data?.id, narasi: "" });
  const [isReloading, setIsReloading] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);

  const chatBodyRef = useRef(null);
  const chatEndRef = useRef(null);
  const holdTimer = useRef(null);

  useEffect(() => {
    setInput((prev) => ({ ...prev, revdok_id: data?.id }));
  }, [data]);

  const getDatas = () => {
    const el = chatBodyRef.current;
    let prevScrollHeight = el ? el.scrollHeight : 0;
    let prevScrollTop = el ? el.scrollTop : 0;

    fetchData(`/spi/revdok_chat?revdok_id=${data?.id}`, {
      setLoading: setAnimate,
      onSuccess: (res) => {
        setMessages(res?.data || []);
        requestAnimationFrame(() => {
          if (el) {
            el.scrollTop = prevScrollTop + (el.scrollHeight - prevScrollHeight);
          }
        });
      },
      onError: (err) => console.error(err?.detail || "Something went wrong!"),
    });
  };

  useEffect(() => {
    if (open) getDatas();
  }, [data, rld, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.narasi.trim()) return;

    await postData("/spi/revdok_chat_store", input, {
      setLoading: setAnimate,
      onSuccess: () => {
        setRld(!rld);
        setInput({ revdok_id: data?.id, narasi: "" });
      },
      onError: (err) => console.log("err", err),
    });
  };

  const handleScroll = () => {
    const el = chatBodyRef.current;
    if (!el) return;

    const isAtBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 5;

    if (isAtBottom && !isReloading && !isCooldown && !holdTimer.current) {
      holdTimer.current = setTimeout(() => {
        setIsReloading(true);
        setRld((prev) => !prev);

        setTimeout(() => {
          setIsReloading(false);
          setIsCooldown(true);
          setTimeout(() => setIsCooldown(false), 2000);
        }, 800);

        holdTimer.current = null;
      }, 1500);
    } else if (!isAtBottom) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };

  return (
    <>
      {/* 🔘 Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!open ? (
          <button
            onClick={() => setOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition flex items-center justify-center"
          >
            <MessageCircle size={24} />
          </button>
        ) : (
          <div className="w-[380px] h-[75vh] flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
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

            {/* Body */}
            <div
              ref={chatBodyRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto px-4 py-5 space-y-3 scrollbar-thin scrollbar-thumb-indigo-200"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex transition-opacity duration-300 ${
                    msg.isMe ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`relative max-w-[75%] px-4 py-2 rounded-2xl shadow text-sm break-words animate-[fadeIn_0.3s_ease] ${
                      msg.isMe
                        ? "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    <span>{msg.narasi}</span>
                    <div className="flex flex-col mt-2 text-xs">
                      {!msg.isMe && (
                        <span className="text-right text-gray-500 dark:text-gray-400">
                          {msg?.from_name}
                        </span>
                      )}
                      <span
                        className={`text-right mt-1 ${
                          msg?.isMe ? "text-white/80" : "text-gray-400"
                        }`}
                      >
                        {FORMAT_DATE_HOUR_IND(msg?.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {isReloading && (
                <div className="flex justify-center py-3 pb-12">
                  <RefreshCcwDot className="animate-spin text-indigo-500 w-7 h-7" />
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="px-3 py-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2"
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

export default SPIChatRevdok;
