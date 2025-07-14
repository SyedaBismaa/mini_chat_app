const http = require("http")
const express = require("express")
const path = require("path")
const { Server } = require("socket.io")

const app = express();
const server = http.createServer(app);
const io = new Server(server)

app.use(express.static(path.resolve("./public")));

app.get("/",(req,res)=>{
  return res.sendFile("/public/index.html")
})

io.on('connection', (socket) => {

    socket.on("user-message",(message)=>{
        io.emit("message",message)
    })
});
 
server.listen(3000,()=>{
    console.log("sever started at port 3000")
})