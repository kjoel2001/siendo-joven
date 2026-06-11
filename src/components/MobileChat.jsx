import { useState } from "react";

export default function MobileChat({
  chatOpen,
  setChatOpen,
}) {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      user: "River",
      text: "🔥 buen episodio",
    },
    {
      user: "Taro",
      text: "me ayudó mucho",
    },
    {
      user: "Yoske",
      text: "increíble contenido",
    },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages([
      ...messages,
      {
        user: "Tú",
        text: message,
      },
    ]);

    setMessage("");
  };

  if (!chatOpen) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 h-[70vh] bg-slate-900 rounded-t-3xl z-50 border-t border-slate-700 flex flex-col shadow-2xl">

      <div className="w-12 h-1 bg-slate-600 rounded-full mx-auto mt-3 mb-2"></div>

      <div className="flex justify-between items-center px-4 pb-3 border-b border-slate-700">

        <div>
          <h2 className="font-bold text-lg text-white">
            Comentarios
          </h2>

          <p className="text-xs text-slate-400">
            Chat en vivo
          </p>
        </div>

        <button
          onClick={() => setChatOpen(false)}
          className="text-white text-xl"
        >
          ✕
        </button>

      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {messages.map((msg, index) => (
          <div
            key={index}
            className="bg-slate-800 rounded-lg p-3"
          >
            <p className="font-semibold text-purple-400">
              {msg.user}
            </p>

            <p className="text-white">
              {msg.text}
            </p>
          </div>
        ))}

      </div>

      <div className="p-4 border-t border-slate-700 flex gap-2">

        <input
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={(e) =>
            e.key === "Enter" && sendMessage()
          }
          placeholder="Agregar comentario..."
          className="flex-1 p-3 rounded-full bg-slate-800 text-white placeholder-slate-400 outline-none"
        />

        <button
          onClick={sendMessage}
          className="px-4 py-2 rounded-full bg-purple-600 text-white"
        >
          ➤
        </button>

      </div>

    </div>
  );
}