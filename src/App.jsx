import  { useEffect, useState } from "react";

function App() {
  const [socket, setSocket] = useState(null);
  const [latestMessage, setLatestMessage] = useState("");
  const [message, setMessage] = useState("");

  //Handles the sending
  function sender() {
    socket.send(message);
    console.log("A message is sent");
  }

  //For the mounting
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      console.log("Connected");
      setSocket(socket);
    };
    //This happens when message is received
    socket.onmessage = (message) => {
      console.log("This is the message that we got : ", message.data);
      setLatestMessage(message.data);
    };

    //Cleanup
    return function () {
      // close the connection
      socket.close();
    };
  }, []);

  //Before socket connection
  if (!socket) {
    return <div> Loadingggggg.......</div>;
  }

  //Once we connected
  return (
    <>
      <input
        type="text"
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button onClick={sender}>Send Message</button>
      <br />
      <br />
      <div>{latestMessage}</div>
    </>
  );
}

export default App;
