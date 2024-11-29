import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8080");

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    socket.on("chat_message", (data) => {
      console.log("Received message:", data);
      setResponse(data.message);
    });

    socket.on("connect", () => {
      console.log("Connected to the server");
    });

    return () => {
      socket.off("chat_message");
      socket.off("connect");
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      socket.emit("chat_message", { message: message });
      setMessage("");
    }
  };

  return (
    <div>
      <h1>WebSocket Client</h1>
      <p>Server Response: {response}</p>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
}

export default App;
