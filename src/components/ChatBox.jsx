import { useState } from "react";

export default function ChatBox({
  chatOpen,
  setChatOpen,
}) {
  const [message, setMessage] = useState("");

  const [warning, setWarning] = useState("");

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

  const bannedWords = [
    "idiota",
    "tonto",
    "imbecil",
    "mierda",
    "puta",
    "estupido",
    "gilipollas",
    "pendejo",
  ];

  const sendMessage = () => {
    const cleanMessage = message.trim();

    if (!cleanMessage) return;

    if (cleanMessage.length > 150) {
      setWarning(
        "El mensaje no puede superar los 150 caracteres."
      );
      return;
    }

    const containsBadWord =
      bannedWords.some((word) =>
        cleanMessage
          .toLowerCase()
          .includes(word)
      );

    if (containsBadWord) {
      setWarning(
        "Tu mensaje contiene palabras no permitidas."
      );
      return;
    }

    const lastMessage =
      messages[messages.length - 1];

    if (
      lastMessage &&
      lastMessage.user === "Tú" &&
      lastMessage.text === cleanMessage
    ) {
      setWarning(
        "No puedes enviar el mismo mensaje repetidamente."
      );
      return;
    }

    setMessages([
      ...messages,
      {
        user: "Tú",
        text: cleanMessage,
      },
    ]);

    setMessage("");
    setWarning("");
  };

  if (!chatOpen) return null;

  return (
    <div className="hidden lg:flex fixed right-0 top-0 h-screen w-96 bg-slate-900 border-l border-slate-800 z-50 flex-col">

      <div className="p-4 border-b border-slate-700 flex justify-between items-center">

        <h2 className="font-bold text-white">
          Comentarios
        </h2>

        <button
          onClick={() =>
            setChatOpen(false)
          }
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

            <p className="text-white break-words">
              {msg.text}
            </p>
          </div>
        ))}

      </div>

      <div className="p-4 border-t border-slate-700">

        <div className="flex gap-2">

          <input
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);

              if (warning)
                setWarning("");
            }}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              sendMessage()
            }
            maxLength={150}
            className="flex-1 p-3 rounded-lg bg-slate-800 text-white placeholder-slate-400 outline-none"
            placeholder="Escribe un comentario..."
          />

          <button
            onClick={sendMessage}
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white"
          >
            Enviar
          </button>

        </div>

        <div className="flex justify-between mt-2">

          <span className="text-xs text-slate-400">
            {message.length}/150
          </span>

          {warning && (
            <span className="text-xs text-red-400">
              {warning}
            </span>
          )}

        </div>

      </div>

    </div>
  );
}