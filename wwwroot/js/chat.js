const messages = []

const chatBox = document.querySelector("#chatMessages")
const input = document.querySelector("#chatInput")
const button = document.querySelector("#sendButton")

function renderMessage(msg) {
  const div = document.createElement("div");
  div.className = "chat-message";
  div.textContent = `${msg.user}: ${msg.text}`;
  chatBox.appendChild(div);

  chatBox.scrollTop = chatBox.scrollHeight;
}


function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  const msg = {
    user: "You",
    text: text
  };

  messages.push(msg);
  renderMessage(msg);
  input.value = "";
}

button.addEventListener("click", sendMessage);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
})


