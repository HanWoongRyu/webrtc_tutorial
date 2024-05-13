const messageList = document.querySelector("ul");
const nicknameForm = document.querySelector("#nickname");
const messageForm = document.querySelector("#message");

const socket = new WebSocket(`ws://${window.location.host}`)//연결된 

socket.addEventListener("open", () => {
  console.log("Connected to Server !")
})

socket.addEventListener("message", (message)=>{
  const li = document.createElement("li")
  console.log(message)
  li.innerText = message.data;
  messageList.append(li)
})


socket.addEventListener("close", ()=>{
  console.log("disconnected from server")
})

function makeMessages(type, payload) {
  const message = {type, payload}
  return JSON.stringify(message)

}

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessages("new_message", input.value.toString()) );
  input.value = "";

}

function handleNicknameSubmit(event) {
  event.preventDefault();
  const input = nicknameForm.querySelector("input");
  socket.send(makeMessages("nickname", input.value.toString()) )
}

messageForm.addEventListener("submit", handleSubmit)
nicknameForm.addEventListener("submit", handleNicknameSubmit)
