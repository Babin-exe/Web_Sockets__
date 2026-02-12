import { createServer } from "http";
import WebSocket, { WebSocketServer } from "ws";

const PORT = 8080;

//Create a http server
const server = createServer((req, res) => {
  res.writeHead(200);
  res.end("Hello from the http server");
});

// Creating a web socket server and attaching it to a http server

const wss = new WebSocketServer({ server });

wss.on("connection", (socket) => {
  console.log("Socket connected");

  socket.on("message", function message(msg, isBinary) {
    console.log("Received : ", msg.toString());

    wss.clients.forEach(function each(socket) {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(msg, { binary: isBinary });
      }
    });
  });

  socket.send("Hello Client you are connected!");
});

server.listen(PORT, () => {
  console.log(`The server is running at port : ${PORT}`);
});
