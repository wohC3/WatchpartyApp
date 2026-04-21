const chatBox = document.querySelector("#chatMessages");
const input = document.querySelector("#chatInput");
const button = window.button;
function renderMessage(msg) {
  const div = document.createElement("div");
  const isSelf = msg.connectionId === myConnectionId;
  if (msg.user === "System") {
    div.className = "chat-message systemMessage"
  }
  else if (isSelf) {
    div.className = "chat-message mainUser-message"
  }
  else {
    div.className = "chat-message otherMessage"
  }
  div.textContent = `${msg.user}: ${msg.message}`;
  chatBox.appendChild(div);

  chatBox.scrollTop = chatBox.scrollHeight;
}

let myConnectionId = null;
connection.on("Connected", function(id) {
  myConnectionId = id;
});

connection.on("ReceiveMessage", function(msg) {
  renderMessage(msg)
})


connection.on("UserJoined", function(msg) {
  renderMessage(msg)
})
connection.on("UserLeft", function(msg) {
  renderMessage(msg)
})

function SendMessage() {
  const message = input.value.trim();
  if (!message) {
    return;
  }
  connection.invoke("SendMessage", message, window.roomId)
    .catch(err => console.error(err.toString()));
}

input.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
    SendMessage();

    input.value = "";
  }
})


button.addEventListener('click', SendMessage);



window.addEventListener("beforeunload", () => {

  connection.invoke("RemoveFromGroup", window.roomId)
    .catch(err => console.error(err.toString()));
})


