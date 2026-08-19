const nav = document.getElementById("nav");
const ham = document.getElementById("ham");
const mob = document.getElementById("mob");
const loader = document.getElementById("loader");

const hideLoader = () => {
  setTimeout(() => loader?.classList.add("loaded"), 220);
  setTimeout(() => loader?.remove(), 1200);
};
hideLoader();
document.addEventListener("DOMContentLoaded", hideLoader);
window.addEventListener("load", hideLoader);

const setNavState = () => {
  nav?.classList.toggle("scrolled", window.scrollY > 18);
};
setNavState();
window.addEventListener("scroll", setNavState, { passive: true });

ham?.addEventListener("click", () => {
  const isOpen = mob?.classList.toggle("open");
  ham.classList.toggle("active", Boolean(isOpen));
  ham.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

mob?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mob.classList.remove("open");
    ham?.classList.remove("active");
    ham?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll(".rev").forEach((el) => revealObserver.observe(el));

const revealVisibleNow = () => {
  document.querySelectorAll(".rev:not(.show)").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("show");
    }
  });
};
window.addEventListener("load", revealVisibleNow);
setTimeout(revealVisibleNow, 650);

const words = [
  "muebles a medida",
  "cocinas funcionales",
  "acabados interiores",
  "closets personalizados",
  "baños contemporáneos"
];
const twText = document.getElementById("twText");
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!twText) return;
  const current = words[wordIndex];
  twText.textContent = current.slice(0, charIndex);

  if (!deleting && charIndex < current.length) {
    charIndex += 1;
    setTimeout(typeLoop, 70);
    return;
  }

  if (!deleting && charIndex === current.length) {
    deleting = true;
    setTimeout(typeLoop, 1150);
    return;
  }

  if (deleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(typeLoop, 35);
    return;
  }

  deleting = false;
  wordIndex = (wordIndex + 1) % words.length;
  setTimeout(typeLoop, 220);
}
typeLoop();

function initParticles(canvasId, count = 56) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  let width = 0;
  let height = 0;
  let particles = [];

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = Math.max(1, Math.floor(width * window.devicePixelRatio));
    canvas.height = Math.max(1, Math.floor(height * window.devicePixelRatio));
    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28
    }));
  };

  const tick = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(229, 201, 135, 0.72)";
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(tick);
  };

  resize();
  window.addEventListener("resize", resize);
  tick();
}

initParticles("pcanvas", 58);
initParticles("pcanvasWhy", 34);
initParticles("pcanvasGaleria", 46);

document.getElementById("cForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const nombre = form.nombre.value.trim();
  const telefono = form.telefono.value.trim();
  const tipo = form.tipo.value.trim();
  const mensaje = form.mensaje.value.trim();

  if (!nombre || !telefono || !tipo) {
    form.reportValidity();
    return;
  }

  const body = [
    "Hola, quiero cotizar un proyecto con ALYCRI MONTERRY.",
    `Nombre: ${nombre}`,
    `Telefono: ${telefono}`,
    `Tipo de proyecto: ${tipo}`,
    mensaje ? `Detalles: ${mensaje}` : ""
  ].filter(Boolean).join("\n");

  window.open(`https://wa.me/528132443823?text=${encodeURIComponent(body)}`, "_blank", "noopener,noreferrer");
});
