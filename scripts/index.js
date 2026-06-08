/* ══════════════════════════════
   PONTOS FLUTUANTES NO HERO (canvas)
══════════════════════════════ */
function initDots() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COUNT = 90;
  const dots = Array.from({ length: COUNT }, () => ({
    x:    Math.random() * canvas.width,
    y:    Math.random() * canvas.height,
    r:    0.6 + Math.random() * 1.6,
    vx:   (Math.random() - 0.5) * 0.25,
    vy:   (Math.random() - 0.5) * 0.25,
    base: 0.15 + Math.random() * 0.55,
    phase: Math.random() * Math.PI * 2,
    speed: 0.003 + Math.random() * 0.006,
  }));

  let frame = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;

    dots.forEach(d => {
      /* pulso de opacidade suave */
      const alpha = d.base * (0.6 + 0.4 * Math.sin(d.phase + frame * d.speed));

      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fill();

      /* movimento */
      d.x += d.vx;
      d.y += d.vy;

      /* wrap nas bordas */
      if (d.x < -5)               d.x = canvas.width  + 5;
      if (d.x > canvas.width  + 5) d.x = -5;
      if (d.y < -5)               d.y = canvas.height + 5;
      if (d.y > canvas.height + 5) d.y = -5;
    });

    /* linhas de conexão entre pontos próximos */
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const MAX = 80;

        if (dist < MAX) {
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = `rgba(160,140,255,${0.12 * (1 - dist / MAX)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
}

/* ══════════════════════════════
   DADOS
══════════════════════════════ */
const reviews = [
  {
    title: "Haikyuu",
    badge: "manga",
    stars: 5,
    excerpt: "Você termina com uma vontade absurda de se tornar um jogador de vôlei, além de se sentir inspirado pelos personagens e suas jornadas.",
    user: "@han_yass20",
    time: "há 10 minutos",
    likes: 14,
    comments: 3,
    img: "./images/haikyuu.jpg"
  },
  {
    title: "Princess Mononoke",
    badge: "anime",
    stars: 5,
    excerpt: "A luta entre a civilização e a natureza nunca foi retratada com tanta beleza e nuance. Um épico que envelhece como um bom vinho.",
    user: "@ryo_san",
    time: "há 22 minutos",
    likes: 9,
    comments: 2,
    img: "./images/princesa.jpg"
  },
  {
    title: "Demon Slayer",
    badge: "anime",
    stars: 4,
    excerpt: "Impecável a forma como o anime é feito, ótima animação e uma ótima história, com personagens cativantes e um ritmo que mantém o espectador preso do início ao fim.",
    user: "@ana_k",
    time: "há 45 minutos",
    likes: 21,
    comments: 7,
    img: "./images/demon_slayer.jpg"
  },
  {
    title: "Your Name",
    badge: "anime",
    stars: 5,
    excerpt: "Uma história de amor e destino que transcende o tempo e o espaço. A animação é deslumbrante, e a trilha sonora de Radwimps é simplesmente perfeita.",
    user: "@shin_ji99",
    time: "há 1 hora",
    likes: 34,
    comments: 12,
    img: "./images/you_name.jpg"
  },
  {
    title: "Ao Haru Ride",
    badge: "manga",
    stars: 4,
    excerpt: "Uma doce e melancólica história de amor adolescente que captura perfeitamente as emoções confusas da juventude.",
    user: "@deku_fan",
    time: "há 2 horas",
    likes: 18,
    comments: 5,
    img: "./images/haru_ride.jpg"
  },
  {
    title: "Attack on Titan",
    badge: "anime",
    stars: 5,
    excerpt: "Uma narrativa que começa como ação pura e se transforma em algo muito mais complexo e filosófico. Um dos maiores finais da história do anime.",
    user: "@eren_yager",
    time: "há 3 horas",
    likes: 52,
    comments: 18,
    img: "./images/aot.jpg"
  },
  {
    title: "Cartas para Julieta",
    badge: "filme",
    stars: 5,
    excerpt: "Uma narrativa romântica e emocionante que captura a essência do amor e da paixão. Um filme muito bom de assistir e tem uma história muito bonita.",
    user: "@julieta_fan",
    time: "há 4 horas",
    likes: 52,
    comments: 18,
    img: "./images/julieta.jpg"
  },
];

/* ══════════════════════════════
   RENDERIZAÇÃO DOS CARDS
══════════════════════════════ */
function renderStars(count) {
  return Array.from({ length: 5 }, (_, i) =>
    `<span class="star${i >= count ? ' half' : ''}">★</span>`
  ).join('');
}

function renderCards(data) {
  const grid = document.getElementById('feed-grid');
  if (!grid) return;

  grid.innerHTML = data.map(r => `
    <article class="card" data-cat="${r.badge}">
      <div class="card-thumb">
        <img src="${r.img}" alt="${r.title}" loading="lazy">
        <span class="card-badge ${r.badge}">${r.badge}</span>
      </div>
      <div class="card-body">
        <div class="stars">${renderStars(r.stars)}</div>
        <h3 class="card-title">${r.title}</h3>
        <p class="card-excerpt">${r.excerpt}</p>
        <div class="card-footer">
          <span class="card-user"><strong>${r.user}</strong> · ${r.time}</span>
          <div class="card-stats">
            <span class="stat like">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              ${r.likes}
            </span>
            <span class="stat comment">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              ${r.comments}
            </span>
          </div>
        </div>
      </div>
    </article>
  `).join('');
}

/* ══════════════════════════════
   FILTROS
══════════════════════════════ */
function initFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      const filtered = filter === 'all' ? reviews : reviews.filter(r => r.badge === filter);
      renderCards(filtered);
    });
  });
}

/* ══════════════════════════════
   INIT
══════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initDots();
  renderCards(reviews);
  initFilters();
});