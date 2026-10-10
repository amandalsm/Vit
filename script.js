const screens = [...document.querySelectorAll('.screen')];
function goTo(id) {
  screens.forEach(screen => screen.classList.toggle('active', screen.id === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
document.getElementById('openQuestion').addEventListener('click', () => goTo('question'));
document.querySelectorAll('[data-go]').forEach(btn => btn.addEventListener('click', () => goTo(btn.dataset.go)));

const sky = document.getElementById('sky');
const ctx = sky.getContext('2d');
let stars = [];
function resizeSky() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  sky.width = innerWidth * dpr; sky.height = innerHeight * dpr;
  sky.style.width = innerWidth + 'px'; sky.style.height = innerHeight + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  stars = Array.from({length: Math.min(240, Math.floor(innerWidth * innerHeight / 5200))}, () => ({
    x: Math.random() * innerWidth, y: Math.random() * innerHeight,
    r: Math.random() * 1.5 + .2, a: Math.random() * 6.28, speed: .3 + Math.random() * 1.3
  }));
}
function drawSky() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  const now = performance.now() / 1000;
  for (const s of stars) {
    const alpha = .25 + (Math.sin(now * s.speed + s.a) + 1) * .32;
    ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,225,250,${alpha})`; ctx.fill();
    if (s.r > 1.25) {
      ctx.fillRect(s.x - 3, s.y, 6, .5); ctx.fillRect(s.x, s.y - 3, .5, 6);
    }
  }
  requestAnimationFrame(drawSky);
}
resizeSky(); drawSky(); addEventListener('resize', resizeSky);

const noBtn = document.getElementById('noBtn');
const tinyNote = document.getElementById('tinyNote');
let dodgeCount = 0;
function dodgeNo() {
  dodgeCount++;
  const pad = 14, maxX = Math.max(pad, innerWidth - noBtn.offsetWidth - pad);
  const maxY = Math.max(pad, innerHeight - noBtn.offsetHeight - pad);
  noBtn.style.position = 'fixed';
  noBtn.style.left = (pad + Math.random() * (maxX - pad)) + 'px';
  noBtn.style.top = (pad + Math.random() * (maxY - pad)) + 'px';
  noBtn.style.zIndex = '8';
  const notes = ['Opa, escapou! 🙈', 'Acho que esse botão não quer colaborar…', 'Tenta de novo, estrelinha ✨', 'O universo está dando uma dica 💗'];
  tinyNote.textContent = notes[Math.min(dodgeCount - 1, notes.length - 1)];
}
noBtn.addEventListener('pointerenter', dodgeNo);
noBtn.addEventListener('touchstart', e => { e.preventDefault(); dodgeNo(); }, {passive:false});
noBtn.addEventListener('click', e => { e.preventDefault(); dodgeNo(); });

const effects = document.getElementById('effects');
function makeFloaty(symbol) {
  const item = document.createElement('span');
  item.className = 'floaty'; item.textContent = symbol;
  item.style.left = Math.random() * 100 + 'vw';
  item.style.fontSize = (14 + Math.random() * 26) + 'px';
  item.style.animationDuration = (4 + Math.random() * 5) + 's';
  effects.appendChild(item);
  setTimeout(() => item.remove(), 9500);
}
let celebrationTimer;
function celebrateBurst() {
  for (let i = 0; i < 36; i++) setTimeout(() => makeFloaty(['♡','♥','✦','💗','✨'][Math.floor(Math.random()*5)]), i * 55);
}
document.getElementById('yesBtn').addEventListener('click', () => {
  noBtn.style.position = ''; noBtn.style.left = ''; noBtn.style.top = ''; noBtn.style.zIndex = '';
  goTo('celebration'); celebrateBurst();
  clearInterval(celebrationTimer);
  celebrationTimer = setInterval(() => makeFloaty(['♡','♥','✦','💗'][Math.floor(Math.random()*4)]), 350);
});
document.getElementById('openLetter').addEventListener('click', () => goTo('letter'));
document.getElementById('restart').addEventListener('click', () => {
  clearInterval(celebrationTimer); goTo('intro');
});
document.getElementById('sendKiss').addEventListener('click', () => {
  document.getElementById('kissMessage').textContent = 'Beijinho enviado com sucesso! 💋✨';
  for (let i = 0; i < 18; i++) setTimeout(() => makeFloaty(['💋','♡','✨'][Math.floor(Math.random()*3)]), i * 70);
});
document.getElementById('sparkleToggle').addEventListener('click', () => {
  document.body.classList.toggle('sparkle-mode');
  const active = document.body.classList.contains('sparkle-mode');
  document.getElementById('sparkleLabel').textContent = active ? 'Brilho máximo!' : 'Brilhinhos';
  for (let i = 0; i < 12; i++) setTimeout(() => makeFloaty('✦'), i * 80);
});
