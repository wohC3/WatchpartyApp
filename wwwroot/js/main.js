let joinBtn = document.querySelector("#joinButton");

joinBtn.addEventListener('click', () => {
  const username = document.querySelector("#name").value.trim();
  const roomId = document.querySelector("#roomId").value.trim();

  window.location.href = `/room.html?roomId=${encodeURIComponent(roomId)}&name=${encodeURIComponent(username)}`
})
