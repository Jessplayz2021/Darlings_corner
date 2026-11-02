'use strict';

// All dates are calculated using the visitor's local time zone.
// The countdown automatically rolls over to the next year after each date.
const EVENTS = {
  birthday: { month: 2, day: 10 },
  anniversary: { month: 2, day: 22 }
};

const pad = value => String(value).padStart(2, '0');

function updateCountdowns() {
  const now = new Date();
  let celebrating = false;

  for (const [name, event] of Object.entries(EVENTS)) {
    const card = document.querySelector(`[data-event="${name}"]`);
    if (!card) continue;

    const isToday = now.getMonth() + 1 === event.month && now.getDate() === event.day;
    card.classList.toggle('celebrating', isToday);
    card.querySelector('.celebration-message').hidden = !isToday;
    celebrating ||= isToday;

    if (isToday) continue;

    let target = new Date(now.getFullYear(), event.month - 1, event.day, 0, 0, 0);
    if (target <= now) target = new Date(now.getFullYear() + 1, event.month - 1, event.day, 0, 0, 0);
    const secondsRemaining = Math.max(0, Math.floor((target - now) / 1000));
    const values = {
      days: Math.floor(secondsRemaining / 86400),
      hours: Math.floor(secondsRemaining / 3600) % 24,
      minutes: Math.floor(secondsRemaining / 60) % 60,
      seconds: secondsRemaining % 60
    };
    for (const [unit, value] of Object.entries(values)) {
      card.querySelector(`[data-unit="${unit}"]`).textContent = unit === 'days' ? value : pad(value);
    }
  }

  if (celebrating && !document.body.dataset.celebrationStarted) {
    document.body.dataset.celebrationStarted = 'true';
    launchConfetti();
  } else if (!celebrating) {
    delete document.body.dataset.celebrationStarted;
  }
}

function launchConfetti() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const layer = document.getElementById('confetti');
  const shapes = ['✦', '♡', '✧', '♥', '★'];
  for (let i = 0; i < 90; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.textContent = shapes[i % shapes.length];
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDelay = `${Math.random() * 5}s`;
    piece.style.animationDuration = `${5 + Math.random() * 6}s`;
    piece.style.fontSize = `${13 + Math.random() * 18}px`;
    piece.style.color = ['#c9a5ff', '#eee2ff', '#9970e0', '#dfc4ff'][i % 4];
    layer.appendChild(piece);
    piece.addEventListener('animationend', () => piece.remove(), { once: true });
  }
}

function makeStars() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const sky = document.getElementById('stars');
  for (let i = 0; i < 65; i++) {
    const star = document.createElement('span');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty('--delay', `${Math.random() * 5}s`);
    star.style.setProperty('--duration', `${3 + Math.random() * 5}s`);
    sky.appendChild(star);
  }
}

makeStars();
updateCountdowns();
setInterval(updateCountdowns, 1000);
