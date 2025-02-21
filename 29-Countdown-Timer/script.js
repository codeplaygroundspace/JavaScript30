let countdown = null;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");
const alarmButtons = document.querySelectorAll("[data-sounds]");

let alarmAudio = new Audio();
let selectedAlarmSound = "alarm-beep.wav";

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      playAlarm();
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;
  timerDisplay.textContent = display;
  document.title = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  const adjustedHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  const emoji = hour < 12 ? "☀️" : "💫";
  const displayEndTime = `Be back at ${adjustedHour}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${emoji}`;
  endTime.textContent = displayEndTime;
}

function startTimer() {
  const seconds = Number(this.dataset.time);
  timer(seconds);
}
buttons.forEach((button) => button.addEventListener("click", startTimer));

document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  if (!mins) return;
  this.reset();
  timer(mins * 60);
});

// Audio
function updateSelectedAlarmSounds(e) {
  selectedAlarmSound = e.target.dataset.sounds;
  playAlarm();
}

function playAlarm() {
  /// Stop current audio if it's playing
  alarmAudio.pause();
  alarmAudio.currentTime = 0;
  // Set new sound and play
  alarmAudio.src = selectedAlarmSound;
  alarmAudio.play();
}

alarmButtons.forEach((alarmButton) =>
  alarmButton.addEventListener("click", updateSelectedAlarmSounds)
);
