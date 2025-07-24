const gravityFactors = {
  Terre: 1,
  Lune: 0.165,
  Mars: 0.38,
  Jupiter: 2.53,
  Soleil: 27.94
};

let currentFactor = gravityFactors["Terre"];
const select = document.getElementById("planetSelect");
select.addEventListener("change", (e) => {
  currentFactor = gravityFactors[e.target.value];
});

const cursor = document.getElementById("customCursor");

// Position cible (à atteindre)
let targetX = window.innerWidth / 2;
let targetY = window.innerHeight / 2;

// Position actuelle du curseur
let currentX = targetX;
let currentY = targetY;

// Détection automatique : touch (mobile) ou mouse (desktop)
document.addEventListener("mousemove", (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
});

document.addEventListener("touchmove", (e) => {
  if (e.touches.length > 0) {
    targetX = e.touches[0].clientX;
    targetY = e.touches[0].clientY;
  }
}, { passive: true });

function animateCursor() {
  const speed = 0.1 / currentFactor;
  currentX += (targetX - currentX) * speed;
  currentY += (targetY - currentY) * speed;

  cursor.style.left = currentX + "px";
  cursor.style.top = currentY + "px";

  requestAnimationFrame(animateCursor);
}

animateCursor();
