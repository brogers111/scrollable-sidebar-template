const bar = document.querySelector(".scroll-bar");
const dots = document.querySelectorAll(".dot");

function updateScrollEffects() {
  const scrollY = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const barGradientDepth = (scrollY / docHeight) * 100 - 10;
  const startOfGradient = barGradientDepth + 20;
  const fadeRange = 10;

  bar.style.background = `
    linear-gradient(to bottom, 
        rgb(27, 29, 40) 0%,
        rgb(27, 29, 40) calc(${barGradientDepth + 10}%),
        rgb(255, 255, 255) calc(${barGradientDepth + 20}%),
        rgb(255, 255, 255) 100%)
  `;

  function getTransitionColor(dotToTop) {
    let progress = Math.min(
      1,
      Math.max(0, (startOfGradient - dotToTop) / fadeRange)
    );
    const baseColor = [27, 29, 40];
    const whiteColor = [255, 255, 255];

    return `rgb(${whiteColor
      .map((color, i) => Math.round(color - (color - baseColor[i]) * progress))
      .join(", ")})`;
  }

  dots.forEach((dot) => {
    const dotToTop = dot.getBoundingClientRect().top / 10;
    dot.style.background = getTransitionColor(dotToTop);
  });
}

window.addEventListener("scroll", () =>
  requestAnimationFrame(updateScrollEffects)
);
