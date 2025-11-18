import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { MessageCircle, X, RefreshCcwDot, Send } from "lucide-react";
import { fetchData, postData } from "../../utils/api";
import AutoResizeTextarea from "../../components/AutoResizeTextarea";
import { FORMAT_DATE_HOUR_IND } from "../../constant/data";

const SPIChatAudit = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [messages, setMessages] = useState([]);
  const [rld, setRld] = useState(false);
  const [input, setInput] = useState({ audit_id: data?.id, narasi: "" });

  const chatBodyRef = useRef(null);
  const chatEndRef = useRef(null);
  const holdTimer = useRef(null);

  const [isReloading, setIsReloading] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);

  useEffect(() => {
    setInput((prev) => ({ ...prev, audit_id: data?.id }));
  }, [data]);

  const getDatas = () => {
    const el = chatBodyRef.current;
    let prevScrollHeight = el ? el.scrollHeight : 0;
    let prevScrollTop = el ? el.scrollTop : 0;

    fetchData(`/spi/audit_chat?audit_id=${data?.id}`, {
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

    await postData("/spi/audit_chat_store", input, {
      setLoading: setAnimate,
      onSuccess: () => {
        setRld(!rld);
        setInput({ audit_id: data?.id, narasi: "" });
        requestAnimationFrame(() => {
          chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
        });
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

  // 🔘 Floating Button
  const FloatingButton = (
    <button
      onClick={() => setOpen(true)}
      className="fixed bottom-6 right-6 z-[10000] bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition-all duration-300"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );

  // 💬 Chat Window
  const ChatWindow = (
    <div
      className={`fixed bottom-0 right-6 z-[10000] w-96 max-w-[95vw] h-[60vh] sm:h-[65vh] bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 border border-slate-200 shadow-2xl rounded-t-2xl flex flex-col overflow-hidden transform transition-all duration-300 ${
        open
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-5 scale-95 pointer-events-none"
      }`}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-white/90 backdrop-blur sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <div className="font-semibold text-indigo-600 text-sm">
              INTERNAL SPI CHAT
            </div>
            <div className="text-xs text-gray-500">Online</div>
          </div>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Body */}
      <div
        ref={chatBodyRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-3 scrollbar-thin scrollbar-thumb-indigo-200"
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
                  : "bg-white border border-slate-200 text-gray-700"
              }`}
            >
              <span>{msg.narasi}</span>
              <div className="flex flex-col mt-2 text-xs">
                {!msg.isMe && (
                  <span className="text-right text-gray-500">
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
        className="px-4 py-3 bg-white border-t border-slate-200 flex items-center gap-2 sticky bottom-0"
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
  );

  return (
    <>
      {!open && createPortal(FloatingButton, document.body)}
      {createPortal(ChatWindow, document.body)}
    </>
  );
};

export default SPIChatAudit;
