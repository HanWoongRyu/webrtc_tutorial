//express는 render를 위해 사용
import http from "http"
import express from "express"
import WebSocket from "ws" 
const app = express();

app.set("view engine", "pug")
app.set("views", __dirname + "/views");
app.use("/public",express.static(__dirname + "/public"));
app.get("/",(req,res)=>res.render("home"))
const handleListen = ()=>console.log("listening on http : http://localhost:3000 ")

// app.listen(3000, handleListen); //port 3000

const server = http.createServer(app)
const wss = new WebSocket.Server({server})

const sockets= [];

wss.on("connection", (socket) =>{
  sockets.push(socket)
  socket["nickname"]= "Anonymous" //소켓에다 바로 박는게 좀 신박하다. 이러면 어차피 배열에 저장된 소켓에 이미 레퍼런스가 박힐테니까 처리가 가능할것
  console.log("connected to  Browser")
  socket.on("close", ()=> console.log("Disconnected form Browser!"))
  socket.on("message", (message)=>{
    const parsedMessage = JSON.parse(message)
    switch (parsedMessage.type){
      case "new_message" :
        sockets.forEach(aScoket => aScoket.send(`${socket.nickname} : ${parsedMessage.payload}`))
        break;
      case "nickname" :
        socket["nickname"] = parsedMessage.payload
    }
  });
  socket.send("hello!!!!!")

})

server.listen(3000, handleListen);
