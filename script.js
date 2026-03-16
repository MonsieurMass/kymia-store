/* =====================
   KYMIA® — script.js
   ===================== */

/* ---- CURSOR COURONNE ---- */
const cursor = document.getElementById('crown-cursor');
document.addEventListener('mousemove', e => {
  cursor.style.display = 'block';
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});
document.addEventListener('mouseleave', () => cursor.style.display = 'none');

/* ---- LOGO ANIMATION ---- */
setTimeout(() => {
  document.querySelectorAll('#nav-logo span').forEach((l, i) =>
    setTimeout(() => l.classList.add('show'), i * 120)
  );
}, 350);

/* ---- SCROLL REVEAL ---- */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ---- 3D CAP ROTATION ---- */
const stage = document.getElementById('cap-stage');
const cap3d  = document.getElementById('cap-3d');
let isDragging = false, startX = 0, startY = 0, rotY = 0, rotX = 0;

// Auto-rotation au départ
let autoAngle = 0;
let autoTimer = setInterval(() => {
  autoAngle += 0.35;
  cap3d.style.transform = `rotateX(0deg) rotateY(${autoAngle}deg)`;
}, 30);

const stopAuto = () => clearInterval(autoTimer);

// Mouse drag
stage.addEventListener('mousedown', e => { isDragging = true; startX = e.clientX; startY = e.clientY; stopAuto(); });
window.addEventListener('mousemove', e => {
  if (!isDragging) return;
  const dx = e.clientX - startX, dy = e.clientY - startY;
  rotY += dx * 0.7;
  rotX -= dy * 0.3;
  rotX = Math.max(-28, Math.min(28, rotX));
  cap3d.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  startX = e.clientX; startY = e.clientY;
});
window.addEventListener('mouseup', () => isDragging = false);

// Touch drag
stage.addEventListener('touchstart', e => { startX = e.touches[0].clientX; startY = e.touches[0].clientY; isDragging = true; stopAuto(); }, { passive: true });
stage.addEventListener('touchmove', e => {
  if (!isDragging) return;
  const dx = e.touches[0].clientX - startX, dy = e.touches[0].clientY - startY;
  rotY += dx * 0.7;
  rotX -= dy * 0.3;
  rotX = Math.max(-28, Math.min(28, rotX));
  cap3d.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  startX = e.touches[0].clientX; startY = e.touches[0].clientY;
}, { passive: true });
stage.addEventListener('touchend', () => isDragging = false);

/* ---- COLOR PICKER ---- */
// Mapping couleur → éléments avatar (préfixe av0..av4)
const AV_IDS = ['av0', 'av1', 'av2', 'av3', 'av4'];

document.querySelectorAll('.color-dot').forEach(dot => {
  dot.addEventListener('click', () => {
    document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
    dot.classList.add('active');

    const c  = dot.dataset.c;
    const b1 = dot.dataset.b1;
    const b2 = dot.dataset.b2;
    const n  = dot.dataset.n;

    // Casquette héro
    document.getElementById('capBody').setAttribute('fill', c);
    document.getElementById('capBrim1').setAttribute('fill', b1);
    document.getElementById('capBrim2').setAttribute('fill', b2);
    document.getElementById('cap-name').textContent = n + ' — 30,00 €';

    // Casquettes avatars
    AV_IDS.forEach(id => {
      const body  = document.getElementById(id + 'b');
      const brim1 = document.getElementById(id + 'r1');
      const brim2 = document.getElementById(id + 'r2');
      if (body)  body.setAttribute('fill', c);
      if (brim1) brim1.setAttribute('fill', b1);
      if (brim2) brim2.setAttribute('fill', b2);
    });
  });
});

/* ---- AVATAR SELECTION ---- */
const avData = [
  {
    title: 'Locs · Peau ambrée',
    text: 'Les locs encadrent parfaitement la casquette. La SAPHIR bleu nuit contraste fort avec ton teint ambré. Porte-la droite, légèrement en arrière pour laisser ressortir les locs devant — effet royauté garanti.'
  },
  {
    title: 'Mannequin · Silhouette fine',
    text: 'La casquette structure ton visage et crée du volume sur une silhouette fine. La RUBIS rouge apporte une touche de couleur saisissante sur peau claire — rendu éditorial, presque couture.'
  },
  {
    title: 'Afro court · Peau foncée',
    text: 'Le contraste entre la casquette et ta peau est saisissant. Les perles champagne de la SAPHIR ressortent encore plus fort sur peau foncée. Effet couronne maximal, zéro effort.'
  },
  {
    title: 'Classique français',
    text: 'La ÉMERAUDE vert profond avec un style classique crée un contraste inattendu et recherché. L\'alliance du streetwear KYMIA et du raffinement à la française — c\'est exactement ce qu\'on cherchait.'
  },
  {
    title: 'Tresses · Peau foncée',
    text: 'Les tresses tombent avec les boucles d\'oreilles dorées pour un rendu haute couture. La ONYX noire pour une soirée, la RUBIS pour une sortie colorée. Les deux sont gagnantes.'
  }
];

window.selectAv = function(i, el) {
  document.querySelectorAll('.av-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');

  const res = document.getElementById('av-result');
  document.getElementById('av-result-title').textContent = avData[i].title;
  document.getElementById('av-result-text').textContent  = ' ' + avData[i].text;
  res.style.display = 'block';
};

/* ---- COUNTDOWN DROP 002 ---- */
const dropTarget = new Date();
dropTarget.setDate(dropTarget.getDate() + 12);
dropTarget.setHours(dropTarget.getHours() + 8);
dropTarget.setMinutes(dropTarget.getMinutes() + 34);

function updateCountdown() {
  const diff = dropTarget - new Date();
  if (diff < 0) return;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById('cd-d').textContent = String(d).padStart(2, '0');
  document.getElementById('cd-h').textContent = String(h).padStart(2, '0');
  document.getElementById('cd-m').textContent = String(m).padStart(2, '0');
  document.getElementById('cd-s').textContent = String(s).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* ---- NOTIFY (côté front seulement pour l'instant) ---- */
window.subscribe = function() {
  const email = document.getElementById('notify-email').value.trim();
  const confirm = document.getElementById('notify-confirm');
  if (!email || !email.includes('@')) {
    confirm.textContent = 'Entre un email valide.';
    confirm.style.color = '#E24B4A';
    return;
  }
  confirm.textContent = '♛ Tu seras notifié(e) au Drop 002.';
  confirm.style.color = '#C4A44A';
  document.getElementById('notify-email').value = '';
  // TODO : connecter à Mailchimp, Brevo ou ton backend
  console.log('Email à sauvegarder :', email);
};
