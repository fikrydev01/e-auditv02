import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageCircle, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { postData } from "../../utils/api";
import AiLoading from "../AiLoading";

export default function ChatBotHome() {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Halo, saya Trained MODEL SPI UIN Jakarta dengan data latih PMK-83-2022, Peraturan 04-2023. Saya senang menjawab pertanyaan anda.",
    },
  ]);
  const [input, setInput] = useState("");
  const [animate, setAnimate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showquick, setShowquick] = useState(true);
  const messagesEndRef = useRef(null);

  // Auto scroll ke bawah setiap ada pesan baru (hanya saat popup terbuka)
  useEffect(() => {
    if (!isOpen) return;
    try {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      // guard terhadap error pada ref
      console.error("Scroll error:", err);
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    if (!input.trim()) return;
    setAnimate(true);

    const userInput = { from: "user", text: input };
    setMessages((prev) => [...prev, userInput]);

    try {
      // Jika postData mengembalikan Promise (sebagian util accept callbacks),
      // kita tetap memanggil await seperti sebelumnya.
      await postData(
        "/ai/ask",
        { pertanyaan: input },
        {
          onSuccess: (res) => {
            // pastikan setAnimate(false) selalu dipanggil
            setTimeout(() => {
              const botReply = {
                from: "bot",
                text: res?.data?.jawaban ?? "Maaf, tidak ada jawaban.",
              };
              setShowquick(false);
              setMessages((prev) => [...prev, botReply]);
              setAnimate(false);
            }, 2000);
            setInput("");
          },
          onError: (err) => {
            console.error("API Error (callback):", err);
            setAnimate(false);
          },
        }
      );
    } catch (err) {
      // Jika postData melempar error atau tidak menggunakan onError
      console.error("postData error:", err);
      setAnimate(false);
    }
  };

  const quickQuestions = [
    "Apa itu audit internal?",
    "Bagaimana cara menilai risiko?",
    "Apa peran SPI di UIN Jakarta?",
    "Sebutkan tahapan audit!",
  ];

  return (
    <>
      {/* Floating Chat Icon */}
      <motion.button
        onClick={() => setIsOpen((s) => !s)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        className="fixed bottom-6 right-6 z-50 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg flex items-center gap-2"
        aria-label="Toggle SPI Chat"
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-6 h-6" />}
        <span className="hidden sm:inline text-xs">SPI ChatBot</span>
      </motion.button>

      {/* Popup Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-popup"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.26 }}
            className="fixed bottom-20 right-6 z-50 w-96 max-h-[36rem] flex flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden text-gray-100"
          >
            {/* Header */}
            <div className="bg-indigo-600 text-white px-5 py-3 flex items-center justify-between">
              <h4 className="text-sm font-semibold tracking-wide">Asisten Virtual E-Audit</h4>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs">Online</span>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-gray-900/80 backdrop-blur-sm scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.12, delay: i * 0.02 }}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 text-sm rounded-2xl leading-relaxed ${
                      msg.from === "user"
                        ? "bg-indigo-600 text-white rounded-br-none shadow-md"
                        : "bg-gray-800 text-gray-100 rounded-bl-none shadow"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {animate && <AiLoading />}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {showquick && (
              <div className="bg-gray-800 px-4 py-2 border-t border-gray-700 flex flex-wrap gap-2">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInput(q)}
                    className="text-xs px-3 py-1.5 bg-gray-700 hover:bg-indigo-600 hover:text-white text-gray-300 rounded-full transition"
                    type="button"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="border-t border-gray-700 bg-gray-900 p-3 flex items-center gap-2">
              <textarea
                rows="1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ketik pesan Anda di sini..."
                className="flex-1 resize-none rounded-xl border border-gray-700 bg-gray-800 text-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition"
                aria-label="Kirim pesan"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
