// ========== CAROUSEL PAUSE ON HOVER ==========
document.querySelectorAll('.carousel-track').forEach(track => {
    track.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
    });
    track.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });
});

// ========== TESTIMONIALS CAROUSEL ==========
let currentTestimonial = 0;
const totalTestimonials = 3;

function moveTestimonial(direction) {
    currentTestimonial += direction;
    if (currentTestimonial < 0) currentTestimonial = totalTestimonials - 1;
    if (currentTestimonial >= totalTestimonials) currentTestimonial = 0;
    updateTestimonialCarousel();
}

function goToTestimonial(index) {
    currentTestimonial = index;
    updateTestimonialCarousel();
}

function updateTestimonialCarousel() {
    const track = document.getElementById('testimonialsTrack');
    if (track) {
        track.style.transform = `translateX(-${currentTestimonial * 100}%)`;
    }

    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentTestimonial);
    });
}

// Auto-advance testimonials every 5 seconds
setInterval(() => {
    moveTestimonial(1);
}, 5000);

// ========== FAQ ACCORDION ==========
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentNode;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(faq => faq.classList.remove('active'));
        if (!isActive) item.classList.add('active');
    });
});

// ========== DISCOUNT POPUP ==========
(function() {
    const popup = document.getElementById('discountPopup');
    const popupClose = document.getElementById('popupClose');
    const timerEl = document.getElementById('popupTimer');
    let countdownInterval = null;

    // Intercept basic plan button
    document.querySelectorAll('.btn-basico').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openPopup();
        });
    });

    function openPopup() {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
        startCountdown(5 * 60); // 5 minutes
    }

    function closePopup() {
        popup.classList.remove('active');
        document.body.style.overflow = '';
        if (countdownInterval) clearInterval(countdownInterval);
    }

    popupClose.addEventListener('click', closePopup);
    popup.addEventListener('click', function(e) {
        if (e.target === popup) closePopup();
    });

    function startCountdown(seconds) {
        if (countdownInterval) clearInterval(countdownInterval);
        let remaining = seconds;
        updateTimerDisplay(remaining);
        countdownInterval = setInterval(() => {
            remaining--;
            if (remaining <= 0) {
                clearInterval(countdownInterval);
                remaining = 0;
            }
            updateTimerDisplay(remaining);
        }, 1000);
    }

    function updateTimerDisplay(totalSeconds) {
        const m = Math.floor(totalSeconds / 60);
        const s = totalSeconds % 60;
        timerEl.textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    }
})();

// ========== SOCIAL PROOF NOTIFICATIONS ==========
(function() {
    const toast = document.getElementById('socialProof');
    const nameEl = document.getElementById('spName');
    const actionEl = document.getElementById('spAction');

    const nomes = [
        'Maria S.', 'João P.', 'Ana C.', 'Carlos M.', 'Fernanda L.',
        'Pedro H.', 'Juliana R.', 'Lucas A.', 'Beatriz F.', 'Rafael T.',
        'Camila O.', 'Bruno G.', 'Larissa N.', 'Thiago B.', 'Amanda V.',
        'Roberto D.', 'Patricia K.', 'Marcos E.', 'Vanessa I.', 'Diego W.',
        'Renata Q.', 'Felipe J.', 'Isabela Z.', 'Gustavo X.', 'Letícia Y.',
        'Sandra M.', 'André L.', 'Cristiane F.', 'Eduardo R.', 'Simone A.',
        'Rodrigo C.', 'Tatiana P.', 'Fábio S.', 'Aline B.', 'Leandro V.',
        'Priscila T.', 'Alexandre N.', 'Daniela G.', 'Henrique O.', 'Carla H.',
        'Márcio J.', 'Luciana D.', 'Gabriel K.', 'Michele W.', 'Vinícius E.',
        'Débora Q.', 'Matheus I.', 'Raquel Z.', 'Leonardo X.', 'Cláudia Y.',
        'Sérgio F.', 'Adriana M.', 'Paulo R.', 'Natália C.', 'Rogério L.',
        'Elaine S.', 'Caio B.', 'Viviane T.', 'Renato A.', 'Márcia P.',
        'Túlio G.', 'Sabrina H.', 'Otávio D.', 'Luana N.', 'Ricardo V.',
        'Jéssica O.', 'Antônio K.', 'Bianca W.', 'Cássio E.', 'Denise Q.',
        'Evandro I.', 'Flávia Z.', 'Gilberto X.', 'Helena Y.', 'Igor F.',
        'Joyce M.', 'Kleber R.', 'Lidiane C.', 'Murilo L.', 'Nathalia S.'
    ];

    const planos = [
        { texto: 'acabou de comprar o <strong>Pacote Básico</strong>', icon: '🛒' },
        { texto: 'acabou de comprar o <strong>Pacote Completo</strong>', icon: '🎉' },
        { texto: 'acabou de comprar o <strong>Pacote Completo</strong>', icon: '🎉' },
        { texto: 'acabou de comprar o <strong>Pacote Completo</strong>', icon: '🎉' }
    ];

    let usedNames = [];

    function getRandomName() {
        if (usedNames.length >= nomes.length) usedNames = [];
        let name;
        do {
            name = nomes[Math.floor(Math.random() * nomes.length)];
        } while (usedNames.includes(name));
        usedNames.push(name);
        return name;
    }

    function showNotification() {
        const nome = getRandomName();
        const plano = planos[Math.floor(Math.random() * planos.length)];

        nameEl.textContent = nome;
        actionEl.innerHTML = plano.texto;
        document.querySelector('.sp-icon').textContent = plano.icon;

        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }

    // Start after 3 seconds, then every 5 seconds
    setTimeout(() => {
        showNotification();
        setInterval(showNotification, 5000);
    }, 3000);
})();