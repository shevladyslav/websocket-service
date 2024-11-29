import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8080", {
  transports: ['websocket'],
});

socket.on("connect", () => {
  console.log("Connected to WebSocket");
});

function App() {
  const [randomNumber, setRandomNumber] = useState(null);

  useEffect(() => {
    socket.on("random_number", (data) => {
      console.log('Received random number:', data);  // Log the received data
      setRandomNumber(data.random_number);  // Update the state
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleButtonClick = () => {
    console.log('Button clicked!'); // Add a log to verify the button click is firing
    socket.emit("generate_random", { message: "Generate a random number!" });
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
