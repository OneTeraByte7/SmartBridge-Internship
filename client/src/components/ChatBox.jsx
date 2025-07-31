// src/components/ChatBox.jsx
import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("https://smartbridge-internship.onrender.com"); // change if needed

const ChatBox = ({ currentUserId, assignedUserId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Load chat history from backend
  useEffect(() => {
    if (currentUserId && assignedUserId) {
      axios
        .get(`/api/chat/history/${currentUserId}/${assignedUserId}`)
        .then((res) => {
          const data = res.data;
          if (Array.isArray(data)) {
            setMessages(data);
          } else if (Array.isArray(data.history)) {
            setMessages(data.history); // in case the array is nested
          } else {
            console.warn("Unexpected chat history format:", data);
            setMessages([]);
          }
        })
        .catch((err) => console.error("Chat history error:", err));
    }
  }, [currentUserId, assignedUserId]);

  // Connect to socket and listen for incoming messages
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

  // Auto-scroll to bottom on new messages
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
      await axios.post("https://smartbridge-internship.onrender.com/api/chat/send", msg); // Save to DB
    } catch (err) {
      console.error("Error saving message:", err);
    }

    setMessages((prev) => [...prev, msg]);
    setInput("");
  };

  return (
    <div
      className="chat-box"
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        width: "100%",
        maxWidth: "600px",
        borderRadius: "8px",
        backgroundColor: "#080808ff",
      }}
    >
      <div
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          marginBottom: "1rem",
          paddingRight: "0.5rem",
        }}
      >
        {Array.isArray(messages) &&
          messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                textAlign: msg.sender === currentUserId ? "right" : "left",
                marginBottom: "0.5rem",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "0.5rem 1rem",
                  borderRadius: "1rem",
                  backgroundColor:
                    msg.sender === currentUserId ? "#DCF8C6" : "#EEE",
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
          style={{
            flex: 1,
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "0.5rem 1rem",
            border: "none",
            backgroundColor: "#4CAF50",
            color: "#fff",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
