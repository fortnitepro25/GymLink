import { useState, useEffect, useRef } from "react";
import socket from "../services/socket";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username] = useState("User" + Math.floor(Math.random() * 100));
  const [room, setRoom] = useState("General");
  const endRef = useRef(null);

  useEffect(() => {
    socket.emit("joinRoom", room);

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, [room]);

  const send = () => {
    if (input.trim()) {
      socket.emit("sendMessage", { room, user: username, text: input.trim() });
      setInput("");
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-zinc-900 rounded-xl h-[75vh] flex flex-col">
      <div className="p-4 border-b border-zinc-700 flex justify-between">
        <h2>Chat - {room}</h2>
        <select
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="bg-zinc-800 px-3 py-1 rounded"
        >
          <option>General</option>
          <option>Form Check</option>
          <option>PR Party</option>
          <option>Beginner</option>
        </select>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={m.user === username ? "text-right" : ""}>
            <div
              className={`inline-block p-3 rounded-lg max-w-[70%] ${m.user === "System" ? "bg-zinc-800 mx-auto" : m.user === username ? "bg-orange-600" : "bg-zinc-800"}`}
            >
              <strong>{m.user}</strong>: {m.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="p-4 border-t border-zinc-700 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type message..."
          className="flex-1 bg-zinc-800 px-4 py-3 rounded-lg"
        />
        <button onClick={send} className="bg-orange-600 px-6 py-3 rounded-lg">
          Send
        </button>
      </div>
    </div>
  );
}
