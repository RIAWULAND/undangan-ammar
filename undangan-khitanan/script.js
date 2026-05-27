// ═══════════════════════════════════════
// UNDANGAN KHITANAN – script.js (FINAL GRID)
// ═══════════════════════════════════════

let galleryInitialized = false;

// ──────────────────────────────────────
// DOM READY (NAMA + THEME)
// ──────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);
  const nama = params.get("to");

  const target = document.getElementById("kepada-name");

  if (target) {
    target.innerText = nama ? decodeURIComponent(nama) : "Tamu Undangan";
  }

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.setAttribute("data-theme", "dark");

    const icon = document.getElementById("dark-icon");
    if (icon) icon.innerHTML = "☀️";
  }

});

// ──────────────────────────────────────
// LOADING SCREEN
// ──────────────────────────────────────
window.addEventListener("load", () => {

  setTimeout(() => {

    const loading = document.getElementById("loading-screen");
    if (loading) loading.classList.add("hidden");

    document.body.classList.remove("loading-active");

    createPetals();
    generateGallery();
    initReveal();
    startCountdown();
    loadUcapan();

  }, 2200);

});

// ──────────────────────────────────────
// BUKA UNDANGAN
// ──────────────────────────────────────
function bukaUndangan() {

  const mainContent = document.getElementById("main-content");
  const music = document.getElementById("bg-music");

  if (!mainContent) return;

  mainContent.classList.add("visible");

  document.querySelector(".float-nav")?.classList.add("visible");
  document.querySelector(".music-btn")?.classList.add("visible");
  document.querySelector(".dark-btn")?.classList.add("visible");

  document.getElementById("pembuka")?.scrollIntoView({
    behavior: "smooth"
  });

  music?.play().catch(() => {});

}

// ──────────────────────────────────────
// PETALS
// ──────────────────────────────────────
function createPetals() {

  const container = document.getElementById("petals");
  if (!container) return;

  const petals = ["❀", "✿", "❁", "✾"];

  setInterval(() => {

    const petal = document.createElement("div");
    petal.classList.add("petal");

    petal.innerHTML = petals[Math.floor(Math.random() * petals.length)];

    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = (6 + Math.random() * 6) + "s";
    petal.style.fontSize = (14 + Math.random() * 14) + "px";
    petal.style.opacity = Math.random();

    container.appendChild(petal);

    setTimeout(() => petal.remove(), 12000);

  }, 600);

}

// ──────────────────────────────────────
// REVEAL SECTION
// ──────────────────────────────────────
function initReveal() {

  const sections = document.querySelectorAll(".reveal-section");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(sec => observer.observe(sec));

}

// ──────────────────────────────────────
// COUNTDOWN
// ──────────────────────────────────────
function startCountdown() {

  const targetDate = new Date("2026-06-13T08:00:00").getTime();

  setInterval(() => {

    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) return;

    const hari = Math.floor(distance / (1000 * 60 * 60 * 24));
    const jam = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const menit = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const detik = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("cd-hari").innerText = String(hari).padStart(2, "0");
    document.getElementById("cd-jam").innerText = String(jam).padStart(2, "0");
    document.getElementById("cd-menit").innerText = String(menit).padStart(2, "0");
    document.getElementById("cd-detik").innerText = String(detik).padStart(2, "0");

  }, 1000);

}

// ──────────────────────────────────────
// DARK MODE
// ──────────────────────────────────────
function toggleDark() {

  const body = document.body;
  const icon = document.getElementById("dark-icon");

  const current = body.getAttribute("data-theme");

  if (current === "light") {
    body.setAttribute("data-theme", "dark");
    icon.innerHTML = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    body.setAttribute("data-theme", "light");
    icon.innerHTML = "🌙";
    localStorage.setItem("theme", "light");
  }

}

// ──────────────────────────────────────
// MUSIC
// ──────────────────────────────────────
let isPlaying = true;

function toggleMusic() {

  const music = document.getElementById("bg-music");
  const icon = document.getElementById("music-icon");

  if (!music) return;

  if (isPlaying) {
    music.pause();
    icon.innerHTML = "🔇";
  } else {
    music.play();
    icon.innerHTML = "🎵";
  }

  isPlaying = !isPlaying;

}

// ──────────────────────────────────────
// GALLERY (AUTO GRID VERSION)
// ──────────────────────────────────────

const galleryImages = [
  "assets/images/3.jpeg",
  "assets/images/4.jpeg",
  "assets/images/5.jpeg"
];

function generateGallery() {

  if (galleryInitialized) return;
  galleryInitialized = true;

  const track = document.getElementById("gallery-track");
  if (!track) return;

  track.innerHTML = "";

  galleryImages.forEach((img, index) => {

    const item = document.createElement("div");
    item.classList.add("gallery-item");

    item.innerHTML = `
      <img src="${img}" alt="Gallery ${index + 1}">
    `;

    track.appendChild(item);
  });

}

// ──────────────────────────────────────
// RSVP
// ──────────────────────────────────────
function kirimRSVP() {

  const nama = document.getElementById("rsvp-nama")?.value;
  const ucapan = document.getElementById("rsvp-ucapan")?.value;
  const hadir = document.querySelector('input[name="hadir"]:checked')?.value;

  if (!nama || !ucapan) {
    alert("Mohon isi nama dan ucapan 😊");
    return;
  }

  const data = {
    nama,
    ucapan,
    hadir,
    waktu: new Date().toLocaleString("id-ID")
  };

  let list = JSON.parse(localStorage.getItem("ucapanList")) || [];

  list.unshift(data);

  localStorage.setItem("ucapanList", JSON.stringify(list));

  renderUcapan();

  document.getElementById("rsvp-nama").value = "";
  document.getElementById("rsvp-ucapan").value = "";

  alert("Ucapan berhasil dikirim 💌");

}

function loadUcapan() {
  renderUcapan();
}

function renderUcapan() {

  const container = document.getElementById("ucapan-list");
  if (!container) return;

  const list = JSON.parse(localStorage.getItem("ucapanList")) || [];

  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = `<div class="ucapan-card"><p class="ucapan-text">Belum ada ucapan 💙</p></div>`;
    return;
  }

  list.forEach(item => {

    const initials = item.nama
      .split(" ")
      .map(n => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

    const badgeClass = item.hadir === "Hadir"
      ? "badge-hadir"
      : "badge-tidak";

    const card = document.createElement("div");
    card.classList.add("ucapan-card");

    card.innerHTML = `
      <div class="ucapan-header">
        <div class="ucapan-avatar">${initials}</div>
        <div class="ucapan-meta">
          <div class="ucapan-name">${item.nama}</div>
          <div class="ucapan-time">${item.waktu}</div>
        </div>
        <div class="ucapan-badge ${badgeClass}">
          ${item.hadir}
        </div>
      </div>

      <div class="ucapan-text">
        ${item.ucapan}
      </div>
    `;

    container.appendChild(card);

  });

}

// ──────────────────────────────────────
// NAV ACTIVE
// ──────────────────────────────────────
const navItems = document.querySelectorAll(".nav-item");

window.addEventListener("scroll", () => {

  let current = "";

  document.querySelectorAll("section").forEach(sec => {

    const top = sec.offsetTop - 120;

    if (scrollY >= top) {
      current = sec.id;
    }

  });

  navItems.forEach(item => {

    item.classList.remove("active");

    if (item.getAttribute("href") === "#" + current) {
      item.classList.add("active");
    }

  });

});