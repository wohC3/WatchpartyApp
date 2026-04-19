let player;

window.onYouTubeIframeAPIReady = function() {
  const el = document.querySelector("#player")
  player = new YT.Player(el, {
    videoId: "wu2djWZzmz0",
    playerVars: {
      controls: 1,
      rel: 0
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
      onError: (e) => console.log("YT ERROR", e)
    }
  });
}

function onPlayerReady() {
  console.log("Player ready");
}
let isSyncing = false;

connection.on("VideoPlay", (time) => {
  if (!player) return;

  isSyncing = true;
  player.seekTo(time, true);
  player.playVideo();

  setTimeout(() => isSyncing = false, 300);
})

connection.on("VideoPause", (time) => {
  if (!player) return;

  isSyncing = true;
  player.seekTo(time, true);
  player.pauseVideo();

  setTimeout(() => isSyncing = false, 300);
})

connection.on("VideoSeek", (time) => {
  if (!player) return;

  isSyncing = true;
  player.seekTo(time, true);

  setTimeout(() => isSyncing = false, 300);
})




function onPlayerStateChange(event) {
  const state = event.data;
  if (isSyncing) return;
  const time = player.getCurrentTime();
  switch (state) {
    case YT.PlayerState.PLAYING:
      connection.invoke("VideoPlay", time, roomId)
      break;
    case YT.PlayerState.PAUSED:
      connection.invoke("VideoPause", time, roomId)
      break;
  }
}


