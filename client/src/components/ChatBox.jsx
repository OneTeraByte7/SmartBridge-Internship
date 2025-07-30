// src/components/ChatBox.jsx
import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000"); // change if deployed

const ChatBox = ({ currentUserId, assignedUserId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Load chat history
  useEffect(() => {
    if (currentUserId && assignedUserId) {
      axios
        .get(`/api/chat/history/${currentUserId}/${assignedUserId}`)
        .then((res) => setMessages(res.data))
        .catch((err) => console.error("Chat history error:", err));
    }
  }, [currentUserId, assignedUserId]);

  // Connect to socket and listen
  useEffect(() => {
    socket.emit("join", { userId: currentUserId });

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.disconnect();
    };
  }, [currentUserId]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const msg = {
      sender: currentUserId,
      receiver: assignedUserId,
      content: input.trim(),
    };

    socket.emit("sendMessage", msg);

    try {
      await axios.post("/api/chat/send", msg); // Save to DB
    } catch (err) {
      console.error("Error saving message:", err);
    }

    setMessages((prev) => [...prev, msg]);
    setInput("");
  };

  return (
    <div className="chat-box" style={{ border: "1px solid #ccc", padding: "1rem", width: "100%", maxWidth: "600px" }}>
      <div style={{ maxHeight: "300px", overflowY: "auto", marginBottom: "1rem" }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.sender === currentUserId ? "right" : "left", marginBottom: "0.5rem" }}>
            <span
              style={{
                display: "inline-block",
                padding: "0.5rem 1rem",
                borderRadius: "1rem",
                backgroundColor: msg.sender === currentUserId ? "#DCF8C6" : "#EEE",
              }}
            >
              {msg.content}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: "0.5rem" }}
        />
        <button onClick={sendMessage} style={{ padding: "0.5rem 1rem" }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
