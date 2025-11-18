import React, { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import { postData } from "../utils/api";
import AiLoading from "./AiLoading";

const ChatBot = () => {
  const [messages, setMessages] = useState([
        { sender: "bot", text: "Halo, saya Trained MODEL SPI UIN Jakarta dengan data latih PMK-83-2022, Peraturan 04-2023. Saya senang menjawab pertanyaan anda" },

  ]);
  const [input, setInput] = useState("");
  const [animate, setAnimate] = useState(false)

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    // Simulasi respon bot
    setTimeout(() => {
      const botReply = {
        sender: "bot",
        text: `Kamu berkata: "${input}". Menarik!`,
      };
      setMessages((prev) => [...prev, botReply]);
    }, 800);

    setInput("");
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
setAnimate(true)
const userInput = {
  sender: "user",
  text: input,
};
setMessages((prev) => [...prev, userInput])

await postData('/ai/ask', { pertanyaan: input }, {
  // setLoading: setAnimate,
  onSuccess: (res) => {
    console.log("Success!", res);
    // Lakukan sesuatu dengan respons, misal: tambahkan ke list chat
    setTimeout(() => {
      const botReply = {
        sender: "bot",
        text: res?.data?.jawaban,
      };
      setMessages((prev) => [...prev, botReply]);
      setAnimate(false)
    }, 4000);
    setInput('')
  },
  onError: (err) => {
    const errorMessage = err?.response?.data?.detail || "Something went wrong!";
    console.error("API Error:", errorMessage);
    // setErr(errorMessage);
    setAnimate(false)
    }
  });
    }

  return (
    <div className="flex flex-col w-full rounded-xl h-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-xl overflow-x-auto max-h-[50vh]">
      {/* Header */}
      <header className="flex items-center gap-2 px-6 py-4 border-b border-gray-300 dark:border-gray-700">
        <Bot className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <h1 className="text-xl font-semibold">Chat Assistant</h1>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`w-full p-3 rounded-2xl text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none"
              }`}
            >
              {msg.sender === "user" ? (
                <div className="flex items-center gap-2">
                  <span>{msg.text}</span>
                  <User className="w-4 h-4 opacity-80" />
                </div>
              ) : (
                <div className="flex items-start justify-start gap-2">
                  <div className="m-2">
                  <Bot className="w-4 h-4 opacity-80" />

                  </div>
                  <span>{msg.text}</span>
                </div>
              )}
            </div>
          </div>
        ))}
        {animate &&
      <AiLoading />

      }
      </div>

      {/* Input Area */}
      <form
        onSubmit={e=>handleSubmit(e)}
        className="border-t border-gray-300 dark:border-gray-700 p-4 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ketik pesan..."
          className="flex-1 p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatBot;
