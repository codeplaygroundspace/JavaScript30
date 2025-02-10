const arrow = document.querySelector(".arrow");
const speed = document.querySelector(".speed-value");

navigator.geolocation.watchPosition(
  (data) => {
    console.log(data);

    //Convert m/s → km/h (Multiply by 3.6):
    speed.textContent =
      data.coords.speed !== null ? (data.coords.speed * 3.6).toFixed(1) : "0";

    const heading = data.coords.heading !== null ? data.coords.heading : 0;

    arrow.style.transform = `rotate(${heading}deg)`;
  },
  (err) => {
    console.error(err);
    alert("Location access is required for speed tracking.");
  }
);
