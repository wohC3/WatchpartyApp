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


function onPlayerStateChange(event) {
  const state = event.data;
  switch (state) {
    case YT.PlayerState.PLAYING:
      console.log("Video played");
      break;
    case YT.PlayerState.PAUSED:
      console.log("Video paused");
      break;
    case YT.PlayerState.ENDED:
      console.log("Video ended");
      break;
  }
}


