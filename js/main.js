(() => {
  "use strict";

  // Las fotos se leen desde el repositorio de GitHub (mismas fotos del proyecto original).
  // Para usarlas desde esta carpeta: copia los archivos a assets/fotos/ y cambia estas rutas
  // por rutas relativas, por ejemplo "assets/fotos/IMG_0749_Original.png".
  const PHOTOS = [
    { src: "https://raw.githubusercontent.com/ordonezortizjuanesteban276-netizen/amorcito/main/IMG_0749_Original.png" },
    { src: "https://raw.githubusercontent.com/ordonezortizjuanesteban276-netizen/amorcito/main/IMG_1382_Original.png" },
    { src: "https://raw.githubusercontent.com/ordonezortizjuanesteban276-netizen/amorcito/main/C2EC7219-AD3B-48F4-81AC-5A7FB530821A_Original.jpeg" },
    { src: "https://raw.githubusercontent.com/ordonezortizjuanesteban276-netizen/amorcito/main/IMG_0794_Original.png" },
    { src: "https://raw.githubusercontent.com/ordonezortizjuanesteban276-netizen/amorcito/main/IMG_1366_Original.png" }
  ];

  const screens = [...document.querySelectorAll(".screen")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let currentPhoto = 0;
  let audioReady = false;

  function showScreen(id) {
    const target = screens.find(screen => screen.id === id);
    if (!target) return;
    screens.forEach(screen => {
      const active = screen === target;
      screen.classList.toggle("active", active);
      screen.setAttribute("aria-hidden", String(!active));
    });
    if (id === "final" && !reducedMotion) startHeartRain();
    if (id === "letter") measurePaper();
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    // El botón pulsado desaparece al cambiar de pantalla: el foco pasa al título nuevo.
    const heading = target.querySelector("h1, h2");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    }
  }

  document.querySelectorAll("[data-go]").forEach(button => {
    button.addEventListener("click", () => showScreen(button.dataset.go));
  });

  // ---- Carta: al abrirla se mide el texto para que se vea completo
  const envelope = document.getElementById("envelope");
  const paper = document.getElementById("letterPaper");
  const openButton = document.getElementById("openLetter");

  const paperBody = paper.querySelector(".letter-body");

  // Mide el texto sin tocar ninguna clase ni estilo (así la transición de apertura nunca se salta en Safari).
  function measurePaper() {
    if (paper.getClientRects().length === 0) return; // pantalla oculta: no se puede medir
    const style = getComputedStyle(paper);
    const height = Math.ceil(paperBody.getBoundingClientRect().height + parseFloat(style.paddingTop) + parseFloat(style.paddingBottom));
    if (height > 0) envelope.style.setProperty("--paper-h", `${height}px`);
  }

  function setLetterOpen(open) {
    if (open) measurePaper();
    envelope.classList.toggle("open", open);
    openButton.textContent = open ? "Cerrar la carta ♡" : "Abrir mi carta ♡";
    openButton.setAttribute("aria-expanded", String(open));
  }

  openButton.addEventListener("click", () => setLetterOpen(!envelope.classList.contains("open")));
  // Solo se vuelve a medir si cambia el ancho (la barra de Safari al hacer scroll dispara "resize" sin cambiarlo).
  let lastWidth = window.innerWidth, resizeTimer = null;
  window.addEventListener("resize", () => {
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(measurePaper, 120);
  });
  if (document.fonts) {
    if (document.fonts.ready) document.fonts.ready.then(measurePaper);
    if (document.fonts.addEventListener) document.fonts.addEventListener("loadingdone", measurePaper);
  }

  // ---- Galería
  const photo = document.getElementById("galleryPhoto");
  const count = document.getElementById("photoCount");
  const dots = document.getElementById("photoDots");

  let swapTimer = 0;
  function endSwap() {
    window.clearTimeout(swapTimer);
    // dos fotogramas: así el fundido de 0 a 1 siempre se ve
    requestAnimationFrame(() => requestAnimationFrame(() => photo.classList.remove("is-swapping")));
  }
  photo.addEventListener("load", () => { photo.classList.remove("is-broken"); endSwap(); });
  photo.addEventListener("error", () => { photo.classList.add("is-broken"); endSwap(); });

  function renderPhoto() {
    const item = PHOTOS[currentPhoto];
    if (photo.getAttribute("src") !== item.src) {
      photo.classList.add("is-swapping");
      photo.src = item.src;
      swapTimer = window.setTimeout(endSwap, 1500); // por si la foto tarda: nunca queda invisible
    }
    photo.alt = `Fotografía ${currentPhoto + 1} de nuestros recuerdos`;
    count.textContent = `${String(currentPhoto + 1).padStart(2, "0")} / ${String(PHOTOS.length).padStart(2, "0")}`;
    [...dots.children].forEach((dot, index) => {
      dot.classList.toggle("active", index === currentPhoto);
      dot.setAttribute("aria-current", index === currentPhoto ? "true" : "false");
    });
  }

  PHOTOS.forEach((item, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Ver fotografía ${index + 1}`);
    dot.addEventListener("click", () => { currentPhoto = index; renderPhoto(); });
    dots.appendChild(dot);
  });
  function movePhoto(step) {
    currentPhoto = (currentPhoto + step + PHOTOS.length) % PHOTOS.length;
    renderPhoto();
  }
  document.getElementById("prevPhoto").addEventListener("click", () => movePhoto(-1));
  document.getElementById("nextPhoto").addEventListener("click", () => movePhoto(1));
  renderPhoto();
  if (photo.complete && photo.naturalWidth === 0) photo.classList.add("is-broken"); // falló antes de enlazar el aviso

  // Precarga las demás fotos cuando la página está tranquila, para que al cambiar no haya parpadeos.
  window.addEventListener("load", () => {
    window.setTimeout(() => PHOTOS.forEach(item => {
      const img = new Image();
      img.decoding = "async";
      img.src = item.src;
      if (img.decode) img.decode().catch(() => {}); // decodifica fuera del hilo principal
    }), 1500);
  });

  // ---- Música: opcional. Coloca una canción propia/libre en assets/musica/cancion.mp3.
  const audio = document.getElementById("backgroundMusic");
  const musicButton = document.getElementById("musicToggle");
  const musicLabel = musicButton.querySelector(".music-label");
  const MUSIC_FILE = "assets/musica/cancion.mp3";
  let labelTimer = null;

  function setMusicUI(playing) {
    window.clearTimeout(labelTimer);
    musicButton.setAttribute("aria-pressed", String(playing));
    musicButton.setAttribute("aria-label", playing ? "Pausar música" : "Activar música");
    musicLabel.textContent = playing ? "sonando" : "música";
  }

  function showMissingSong() {
    setMusicUI(false);
    musicLabel.textContent = "añade canción";
    labelTimer = window.setTimeout(() => { musicLabel.textContent = "música"; }, 3000);
  }

  musicButton.addEventListener("click", async () => {
    if (!audioReady) {
      audio.src = MUSIC_FILE;
      audioReady = true;
    }
    if (audio.paused) {
      setMusicUI(true);
      try {
        await audio.play();
      } catch (error) {
        // Si se pulsó pausa mientras empezaba a sonar, no es un fallo de la canción.
        if (error && error.name === "AbortError") return;
        if (error && error.name === "NotAllowedError") { setMusicUI(false); return; }
        showMissingSong();
      }
    } else {
      audio.pause();
      setMusicUI(false);
    }
  });
  audio.addEventListener("error", () => {
    // Sin archivo (o formato no válido): el botón vuelve a su estado normal.
    audioReady = false;
    audio.removeAttribute("src");
    audio.load();
    showMissingSong();
  });

  // ---- Corazones
  function heartBurst(x, y) {
    if (reducedMotion) return;
    for (let i = 0; i < 14; i++) {
      const heart = document.createElement("span");
      heart.className = "burst-heart";
      heart.textContent = ["♡", "♥︎", "✦"][i % 3];
      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;
      const angle = (Math.PI * 2 * i) / 14;
      const distance = 55 + Math.random() * 85;
      heart.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
      heart.style.setProperty("--y", `${Math.sin(angle) * distance}px`);
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1200);
    }
  }
  document.getElementById("heartBurst").addEventListener("click", event => {
    // Con teclado o lector de pantalla el clic llega sin coordenadas: salen desde el centro del corazón.
    let x = event.clientX, y = event.clientY;
    if (!x && !y) {
      const box = event.currentTarget.getBoundingClientRect();
      x = box.left + box.width / 2;
      y = box.top + box.height / 2;
    }
    heartBurst(x, y);
  });

  function spawnPetal() {
    if (document.hidden || reducedMotion) return;
    const petals = document.getElementById("petals");
    if (petals.childElementCount > 12) return;
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.textContent = ["♡", "✿", "·"][Math.floor(Math.random() * 3)];
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.fontSize = `${12 + Math.random() * 13}px`;
    const duration = 9 + Math.random() * 8;
    petal.style.animationDuration = `${duration}s`;
    petals.appendChild(petal);
    setTimeout(() => petal.remove(), duration * 1000);
  }
  if (!reducedMotion) window.setInterval(spawnPetal, 1500);

  // ---- Decoración tierna de fondo: corazones suaves, destellos y burbujitas (solo transform/opacity)
  (function buildDecor() {
    const layer = document.getElementById("bgDecor");
    const rnd = (min, max) => min + Math.random() * (max - min);
    const make = (cls, x, y, vars, text) => {
      const el = document.createElement("span");
      el.className = cls;
      el.style.left = `${x}%`;
      el.style.top = `${y}%`;
      Object.entries(vars).forEach(([key, value]) => el.style.setProperty(key, value));
      if (text) el.textContent = text;
      layer.appendChild(el);
    };
    const motion = () => ({ "--d": `${rnd(9, 17).toFixed(1)}s`, "--dl": `-${rnd(0, 12).toFixed(1)}s`, "--dx": `${rnd(-16, 16).toFixed(0)}px` });
    // corazones grandes y suaves repartidos por la pantalla
    [[3, 7, 66], [76, 11, 50], [86, 38, 84], [-2, 46, 56], [66, 64, 62], [10, 80, 78], [52, 91, 46]].forEach(([x, y, size]) => {
      make("bg-heart", x, y, { "--s": `${size}px`, "--o": rnd(.2, .32).toFixed(2), ...motion() });
    });
    // posiciones repartidas en cuadrícula con un poco de azar (así nunca se amontonan)
    const spread = (cols, rows) => {
      const spots = [];
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        spots.push([(c + rnd(.15, .85)) * (96 / cols) + 2, (r + rnd(.15, .85)) * (96 / rows) + 2]);
      }
      return spots.sort(() => Math.random() - .5);
    };
    // corazoncitos pequeños
    spread(3, 4).slice(0, 10).forEach(([x, y]) => {
      make("bg-heart", x, y, { "--s": `${rnd(14, 24).toFixed(0)}px`, "--o": rnd(.45, .7).toFixed(2), ...motion() });
    });
    // destellos y florecitas que titilan
    const glyphs = ["✦", "✧", "✿", "✦", "✧", "♡"];
    const colors = ["#d98ba4", "#e8a8bb", "#f4c2d0", "#c97a96"];
    spread(4, 5).slice(0, 16).forEach(([x, y], i) => {
      make("bg-spark", x, y, { "--s": `${rnd(9, 18).toFixed(0)}px`, "--c": colors[i % colors.length], "--d": `${rnd(2.6, 5.4).toFixed(1)}s`, "--dl": `-${rnd(0, 5).toFixed(1)}s` }, glyphs[i % glyphs.length]);
    });
    // burbujitas de luz
    spread(2, 4).slice(0, 6).forEach(([x, y]) => {
      make("bg-dot", x, y, { "--s": `${rnd(22, 44).toFixed(0)}px`, "--o": rnd(.35, .6).toFixed(2), ...motion() });
    });
  })();

  let rainTimer = null;
  function startHeartRain() {
    if (rainTimer || reducedMotion) return;
    rainTimer = window.setInterval(() => {
      const rain = document.getElementById("heartRain");
      if (document.hidden || rain.childElementCount > 14) return;
      const heart = document.createElement("span");
      heart.className = "floating-heart";
      heart.textContent = ["♡", "♥︎", "✧"][Math.floor(Math.random() * 3)];
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.fontSize = `${14 + Math.random() * 20}px`;
      const duration = 7 + Math.random() * 5;
      heart.style.animationDuration = `${duration}s`;
      rain.appendChild(heart);
      setTimeout(() => heart.remove(), duration * 1000);
    }, 1000);
  }

  document.getElementById("replay").addEventListener("click", () => {
    if (rainTimer) { clearInterval(rainTimer); rainTimer = null; }
    document.getElementById("heartRain").replaceChildren();
    setLetterOpen(false);
    currentPhoto = 0;
    renderPhoto();
    showScreen("welcome");
  });

  // Si se sale del navegador (otra app, bloquear pantalla, cerrar pestaña) la música se quita y vuelve al inicio.
  function stopMusic() {
    if (audio.paused && audio.currentTime === 0) return;
    audio.pause();
    try { audio.currentTime = 0; } catch { /* aún sin cargar: ya está en el inicio */ }
    setMusicUI(false);
  }
  document.addEventListener("visibilitychange", () => { if (document.hidden) stopMusic(); });
  window.addEventListener("pagehide", stopMusic);
})();
