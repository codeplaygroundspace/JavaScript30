const speedControl = document.querySelector(".speed"); // Container for speed adjustment
const speedIndicator = document.querySelector(".speed-bar"); // Current playback speed
const videoPlayer = document.querySelector(".flex"); // The video element itself

function handleMove(e) {
  console.log(e);
  const MIN_SPEED = 0.4;
  const MAX_SPEED = 4;

  const y = e.pageY - this.offsetTop;
  const percent = y / this.offsetHeight;

  const height = `${Math.round(percent * 100)}%`;
  speedIndicator.style.height = height;

  const playbackRate = percent * (MAX_SPEED - MIN_SPEED) + MIN_SPEED;
  speedIndicator.textContent = playbackRate.toFixed(2) + "x";

  videoPlayer.playbackRate = playbackRate;
}

speedControl.addEventListener("mousemove", handleMove);
