"use strict"
var connection = new signalR.HubConnectionBuilder().withUrl("/Chat").build();
window.button = document.querySelector("#sendButton");
window.button.disabled = true;

const params = new URLSearchParams(window.location.search);
window.roomId = params.get("roomId");
window.username = params.get("name");



connection.start().then(function() {
  window.button.disabled = false;

  connection.invoke("AddToGroup", window.username, window.roomId)
    .catch(err => console.error(err.toString()));
}).catch(function(err) {
  return console.error(err.toString());
});




