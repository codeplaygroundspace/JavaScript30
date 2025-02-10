let recognition; // Declare outside

if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
  recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  recognition.interimResults = true;
} else {
  alert(
    "Your browser does not support Speech Recognition. Please use Chrome or Edge."
  );
}

let p = document.createElement("p");
const words = document.querySelector(".words");
words.appendChild(p);

recognition.addEventListener("result", (e) => {
  console.log(e.results);
  const transcript = Array.from(e.results)
    .map((result) => result[0].transcript)
    .join("");

  p.textContent = transcript;
  if (e.results[0].isFinal) {
    p = document.createElement("p");
    words.appendChild(p);
  }
});

recognition.addEventListener("error", (e) => {
  console.error("Speech Recognition Error:", e.error);
  alert("Speech recognition failed. Please check your microphone permissions.");
});

recognition.addEventListener("end", () => {
  setTimeout(() => recognition.start(), 500);
});
recognition.start();
