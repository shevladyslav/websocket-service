import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:8080", {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current.on("connect", () => {
      console.log("Connected to WebSocket");
    });

    socketRef.current.on("random_number", (data) => {
      console.log("Received random number:", data);
      setRandomNumber(data.random_number);
    });

    return () => {
      socketRef.current.off("random_number");
      socketRef.current.disconnect();
    };
  }, []);

  const handleButtonClick = () => {
    socketRef.current.emit("generate_random", { message: "Generate a random number!" });
  };

  return (
    <div>
      <h1>WebSocket with Random Number Generator</h1>
      <button onClick={handleButtonClick}>Generate Random Number</button>
      {randomNumber !== null && <p>Random Number: {randomNumber}</p>}
    </div>
  );
}

export default App;
