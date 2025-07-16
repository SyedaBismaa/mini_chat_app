const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile(path.resolve("./public/index.html"));
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("user-message", ({ user, text }) => {
    io.emit("message", { user, text, id: socket.id, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
  });
});

server.listen(3000, () => {
  console.log("Server started at port 3000");
});
