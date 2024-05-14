const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas(); 

const particles = [];
const numParticles = 200;
for (let i = 0; i < numParticles; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: canvas.height + Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    speed: Math.random() * 2 + 1,
    opacity: Math.random(),
    color: 'white'
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
    particle.y -= particle.speed;

    particle.opacity -= 0.005;

    if (particle.y < 0 || particle.opacity <= 0) {
      particle.y = canvas.height + Math.random() * canvas.height;
      particle.opacity = 1; 
    }

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
    ctx.fill();
  });

  requestAnimationFrame(draw);
}

draw();

window.addEventListener('resize', resizeCanvas);