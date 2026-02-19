// --- Configuration ---
// Added new images as requested
const memoryImages = [
    'im1.jpeg', 'im2.jpeg', 'im5.jpeg', 'im6.jpeg',
    'om3.jpeg', 'om4.jpeg',
    'im7.jpeg', 'im8.jpeg', 'im9.jpeg'
];

// --- No Button Logic ---
const btnNo = document.getElementById('btn-no');
const btnWrapper = document.querySelector('.no-btn-wrapper');

function moveButton() {
    // Switch to fixed position on first move
    if (!btnNo.classList.contains('moving')) {
        // Calculate current position to avoid resizing jump
        const rect = btnNo.getBoundingClientRect();
        btnNo.classList.add('moving');
        btnNo.style.left = rect.left + 'px';
        btnNo.style.top = rect.top + 'px';

        // Small delay to ensure transition happens
        setTimeout(jumpToRandom, 10);
    } else {
        jumpToRandom();
    }
}

function jumpToRandom() {
    const padding = 20; // Reduced padding for mobile
    const maxX = window.innerWidth - btnNo.offsetWidth - padding;
    const maxY = window.innerHeight - btnNo.offsetHeight - padding;

    // Ensure it doesn't go off screen
    const x = Math.max(padding, Math.min(Math.random() * maxX, maxX));
    const y = Math.max(padding, Math.min(Math.random() * maxY, maxY));

    btnNo.style.left = `${x}px`;
    btnNo.style.top = `${y}px`;
}

// Events - Supports both Mouse and Touch
btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent standard click
    moveButton();
}, { passive: false });

btnNo.addEventListener('mouseover', moveButton);
btnNo.addEventListener('click', (e) => {
    e.preventDefault();
    moveButton();
});


// --- Background & Memories ---
const bgContainer = document.querySelector('.bg-decorations');
const emojis = ['❤️', '✨', '🎂', '🥳', '🌸', '✨'];

function createBgEmoji() {
    if (document.hidden) return;
    const el = document.createElement('div');
    el.classList.add('floating-item');
    el.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * 95 + 'vw';
    el.style.bottom = '-50px';
    el.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
    el.style.opacity = Math.random() * 0.5 + 0.3;

    const duration = Math.random() * 5 + 10;
    el.style.animation = `floatUp ${duration}s linear infinite`;

    bgContainer.appendChild(el);
    setTimeout(() => el.remove(), duration * 1000);
}
setInterval(createBgEmoji, 1500);

function startfloatingMemories() {
    const container = document.getElementById('memories-container');
    container.style.display = 'block';

    function spawnMemory() {
        if (document.hidden) return;

        const wrapper = document.createElement('div');
        wrapper.classList.add('memory-wrapper');

        const img = document.createElement('img');
        const randomImg = memoryImages[Math.floor(Math.random() * memoryImages.length)];
        img.src = randomImg;
        wrapper.appendChild(img);

        // Position: strict left or right side (avoid center 20vw-80vw)
        const side = Math.random() > 0.5 ? 'left' : 'right';
        if (side === 'left') {
            wrapper.style.left = Math.random() * 20 + 'vw';
        } else {
            wrapper.style.left = (Math.random() * 20 + 80) + 'vw';
        }

        const duration = Math.random() * 10 + 15;
        wrapper.style.animationDuration = `${duration}s`;

        // Random Size
        const scale = Math.random() * 0.5 + 1.0;
        wrapper.style.transform = `scale(${scale})`;

        // Touch interaction
        wrapper.addEventListener('touchstart', function (e) {
            if (this.style.animationPlayState === 'paused') {
                this.style.animationPlayState = 'running';
                this.style.zIndex = 'auto';
            } else {
                this.style.animationPlayState = 'paused';
                this.style.zIndex = '100';
            }
        });

        container.appendChild(wrapper);
        setTimeout(() => wrapper.remove(), duration * 1000);
    }

    // Initial Spawn
    for (let i = 0; i < 3; i++) setTimeout(spawnMemory, i * 500);

    // Ongoing - Spawn slower (Reduced density)
    setInterval(spawnMemory, 3000);
}

// --- Inner Card Decorations ---
function startInnerDecorations() {
    const container = document.querySelector('.inside-content');
    const emojis = ['💖', '😊', '✨', '🎂'];

    // Create specific container if not exists to avoid messing with text flow
    let decoContainer = document.getElementById('inner-deco-container');
    if (!decoContainer) {
        decoContainer = document.createElement('div');
        decoContainer.id = 'inner-deco-container';
        decoContainer.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; overflow:hidden; z-index:0;';
        container.insertBefore(decoContainer, container.firstChild);
    }

    function spawnInner() {
        if (!document.querySelector('.card-3d.open')) return;

        const el = document.createElement('div');
        el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 1 + 0.5}rem;
            opacity: 0;
            filter: blur(1px);
            bottom: -20px;
            left: ${Math.random() * 100}%;
            animation: innerFloat 4s linear forwards;
        `;
        decoContainer.appendChild(el);
        setTimeout(() => el.remove(), 4000);
    }

    setInterval(spawnInner, 800);
}


// --- Main Celebration Sequence ---
function startCelebration() {
    // 1. Play Music (Critical)
    const audio = document.getElementById('birthdayAudio');
    audio.currentTime = 0; // Start from beginning
    audio.volume = 1.0;

    // Explicit call (browser allows this because it's inside a click handler)
    audio.play().then(() => {
        console.log("Music playing!");
    }).catch(e => {
        console.error("Music play failed:", e);
        // Fallback: Show a small "Play Music" button if somehow blocked?
        // Usually not needed on click, but good for debugging.
    });

    // 2. Transition Screens
    const initialScreen = document.getElementById('screen-initial');
    initialScreen.style.opacity = '0'; // Fade out

    setTimeout(() => {
        initialScreen.style.display = 'none';

        const celScreen = document.getElementById('screen-celebration');
        celScreen.style.display = 'flex';
        // Trigger reflow
        void celScreen.offsetWidth;
        celScreen.classList.add('active');

        // Confetti Burst
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });

    }, 800);

    // 3. Trigger Sequence
    setTimeout(() => {
        // Show "Click Me" Envelope
        const trigger = document.getElementById('card-trigger');
        trigger.style.display = 'block';
        trigger.style.opacity = '0';

        // Fade in
        requestAnimationFrame(() => {
            trigger.style.transition = 'opacity 1s';
            trigger.style.opacity = '1';
        });

    }, 2500); // 2.5s wait
}

// Function to actually open the card
function openFullCard() {
    const trigger = document.getElementById('card-trigger');
    const audio = document.getElementById('birthdayAudio');

    // Fade out trigger
    trigger.style.opacity = '0';
    setTimeout(() => trigger.style.display = 'none', 500);

    // Fade background content specific for card view
    document.body.classList.add('card-view');

    const cardContainer = document.querySelector('.card-container');
    cardContainer.style.display = 'block';

    // Zoom in effect
    cardContainer.style.transform = 'translate(-50%, -50%) scale(0.1)';

    // Allow display block to apply
    setTimeout(() => {
        cardContainer.style.transition = 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        cardContainer.style.transform = 'translate(-50%, -50%) scale(1)';

        // Open the card after zoom
        setTimeout(() => {
            document.querySelector('.card-3d').classList.add('open');
            startfloatingMemories();
            startInnerDecorations();

            // Pop confetti "inside" or over the card
            const cardRect = cardContainer.getBoundingClientRect();
            // Normalize coordinates to 0-1 for canvas-confetti
            const x = (cardRect.left + cardRect.width / 2) / window.innerWidth;
            const y = (cardRect.top + cardRect.height / 2) / window.innerHeight;

            confetti({
                particleCount: 60,
                spread: 50,
                origin: { x: x, y: y },
                zIndex: 1000,
                disableForReducedMotion: true
            });

        }, 600);

    }, 50);
}

// Card Toggle
document.querySelector('.card-3d').addEventListener('click', function () {
    this.classList.toggle('open');
});
