let joinBtn = document.querySelector("#joinButton");

joinBtn.addEventListener('click', (e) => {
  const username = document.querySelector("#name").value.trim();
  const roomId = document.querySelector("#roomId").value.trim();

  localStorage.setItem("name", username)
  localStorage.setItem("roomId", roomId)

  window.location.href = `/room.html?room=${encodeURIComponent(roomId)}&name=${encodeURIComponent(username)}`
})
