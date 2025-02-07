document.body.addEventListener("mousemove", (evt) => {
  // Add requestAnimationFrame for better performance
  requestAnimationFrame(() => {
    const mouseX = evt.clientX;
    const mouseY = evt.clientY;

    gsap.to(".cursor", {
      x: mouseX,
      y: mouseY,
      duration: 0.1,
    });

    gsap.to(".shape", {
      x: mouseX,
      y: mouseY,
      stagger: -0.1,
      duration: 0.4,
    });
  });
});
