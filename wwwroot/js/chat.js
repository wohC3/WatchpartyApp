const chatBox = document.querySelector("#chatMessages");
const input = document.querySelector("#chatInput");
const button = window.button;
function renderMessage(msg) {
  const div = document.createElement("div");
  if (msg.user === "System") {
    div.className = "chat-message systemMessage"
  }
  else if (msg.user === window.username) {
    div.className = "chat-message mainUser-message"
  }
  else {
    div.className = "chat-message otherMessage"
  }
  div.textContent = `${msg.user}: ${msg.text}`;
  chatBox.appendChild(div);

  chatBox.scrollTop = chatBox.scrollHeight;
}


connection.on("ReceiveMessage", function(user, message) {
  renderMessage({
    user: user,
    text: message
  })
})


connection.on("UserJoined", function(message) {
  renderMessage({
    user: "System",
    text: message
  })
})
connection.on("UserLeft", function(message) {
  renderMessage({
    user: "System",
    text: message
  })
})

function SendMessage() {
  const message = input.value.trim();
  if (!message) {
    return;
  }
  connection.invoke("SendMessage", window.username, message, window.roomId)
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

  connection.invoke("RemoveFromGroup", window.username, window.roomId)
    .catch(err => console.error(err.toString()));
})


