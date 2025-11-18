// components/Chatbot.jsx
import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Minus, Moon, Sun } from 'lucide-react'

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Halo! Saya asisten virtual. Ada yang bisa saya bantu?',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const messagesEndRef = useRef(null)

  // Scroll otomatis ke bawah setiap ada pesan baru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages((prev) => [...prev, botResponse])
      setIsLoading(false)
    }, 800)
  }

  const getBotResponse = (message) => {
    const lower = message.toLowerCase()
    if (lower.includes('halo') || lower.includes('hai')) {
      return 'Halo juga! Senang bertemu dengan Anda 😊'
    } else if (lower.includes('terima kasih')) {
      return 'Sama-sama! Senang bisa membantu Anda 🙏'
    } else if (lower.includes('nama')) {
      return 'Saya adalah Chatbot AI, asisten virtual Anda 🤖'
    } else if (lower.includes('bantuan')) {
      return 'Saya bisa membantu menjawab pertanyaan atau memberikan informasi umum!'
    } else {
      return 'Saya memahami pertanyaan Anda. Untuk informasi lebih lanjut, silakan hubungi tim support kami.'
    }
  }

  const formatTime = (date) =>
    date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })

  const quickQuestions = [
    'Apa kamu bisa membantu saya?',
    'Siapa namamu?',
    'Terima kasih',
    'Apa kabar?'
  ]

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Tombol buka chatbot */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <Bot size={24} />
        </button>
      )}

      {/* Jendela chat */}
      {isOpen && (
        <div
          className={`w-80 h-96 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 overflow-hidden ${
            darkMode ? 'dark' : ''
          }`}
        >
          {/* Header */}
          <div className="p-4 flex justify-between items-center bg-blue-600 text-white dark:bg-gray-700">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-semibold">Chat Assistant</span>
            </div>
            <div className="flex items-center gap-2">
              {/* Toggle Dark Mode */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-1 rounded-full bg-blue-500 dark:bg-gray-600"
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {/* Tutup */}
              <button
                onClick={() => setIsOpen(false)}
                className="hover:opacity-75 transition"
              >
                <Minus size={20} />
              </button>
            </div>
          </div>

          {/* Pesan */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex items-start gap-2 max-w-[80%] ${
                    msg.sender === 'user'
                      ? 'flex-row-reverse'
                      : 'flex-row'
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      msg.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-white'
                    }`}
                  >
                    {msg.sender === 'user' ? (
                      <User size={16} />
                    ) : (
                      <Bot size={16} />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`rounded-2xl p-3 ${
                      msg.sender === 'user'
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none dark:bg-gray-700 dark:text-white dark:border-gray-600'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.sender === 'user'
                          ? 'text-blue-100'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Loading */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-300 dark:bg-gray-600">
                    <Bot size={16} className="text-gray-700 dark:text-white" />
                  </div>
                  <div className="rounded-2xl p-3 bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: '0.1s' }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Questions */}
            {messages.length <= 2 && (
              <div className="space-y-2 mt-4">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Pertanyaan cepat:
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => setInputMessage(q)}
                      className="text-xs px-3 py-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-800 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ketik pesan..."
                className="flex-1 px-3 py-2 rounded-full text-sm border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className={`p-2 rounded-full transition-colors ${
                  inputMessage.trim() && !isLoading
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-500 dark:bg-gray-600 dark:text-gray-400'
                }`}
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Chatbot
