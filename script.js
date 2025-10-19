// Cake & Candle + Confetti
const cake = document.getElementById('cake');
const candle = document.getElementById('candle');
const surprise = document.getElementById('surprise');
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettiParticles = [];

function createConfetti() {
    for (let i = 0; i < 150; i++) {
        confettiParticles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * 10 + 5,
            color: `hsl(${Math.random()*360}, 100%, 50%)`,
            tilt: Math.random() * 10 - 10,
            tiltAngleIncrement: Math.random() * 0.07 + 0.05
        });
    }
}
createConfetti();

function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiParticles.forEach(p => {
        ctx.beginPath();
        ctx.lineWidth = p.r / 2;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
        ctx.stroke();

        p.tilt += p.tiltAngleIncrement;
        p.y += (Math.cos(p.d) + 3 + p.r / 2) * 0.5;
        if (p.y > canvas.height) {
            p.y = -10;
            p.x = Math.random() * canvas.width;
        }
    });
    requestAnimationFrame(drawConfetti);
}
canvas.style.display = 'none';

cake.addEventListener('click', () => {
    candle.style.display = 'none';
    surprise.classList.remove('hidden');
    canvas.style.display = 'block';
    drawConfetti();
});

// Wishes Section
const wishInput = document.getElementById('wishInput');
const addWishBtn = document.getElementById('addWishBtn');
const wishList = document.getElementById('wishList');

addWishBtn.addEventListener('click', () => {
    const wish = wishInput.value.trim();
    if(wish){
        const li = document.createElement('li');
        li.textContent = wish;
        wishList.appendChild(li);
        wishInput.value = '';
    }
});

// Photo Gallery
const photoInput = document.getElementById('photoInput');
const photoGallery = document.getElementById('photoGallery');

photoInput.addEventListener('change', (e) => {
    const files = e.target.files;
    for (let i=0; i<files.length; i++){
        const reader = new FileReader();
        reader.onload = function(event){
            const img = document.createElement('img');
            img.src = event.target.result;
            photoGallery.appendChild(img);
        }
        reader.readAsDataURL(files[i]);
    }
});

// Download page
const downloadBtn = document.getElementById('downloadBtn');
downloadBtn.addEventListener('click', () => {
    const htmlContent = document.documentElement.outerHTML;
    const blob = new Blob([htmlContent], {type: "text/html"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'happy_birthday.html';
    a.click();
    URL.revokeObjectURL(url);
});
