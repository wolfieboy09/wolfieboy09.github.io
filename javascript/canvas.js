const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  // Set canvas size to cover the entire viewport
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas(); // Initial call to set canvas size

  // Generate random particles
  const particles = [];
  const numParticles = 100;
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * canvas.height, // Start from bottom
      radius: Math.random() * 2 + 1,
      speed: Math.random() * 2 + 1,
      opacity: Math.random(), // Initial opacity
      color: 'white'
    });
  }

  function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
      // Move particle upwards
      particle.y -= particle.speed;

      // Decrease opacity over time
      particle.opacity -= 0.005; // Adjust the fade speed as needed

      // If particle moves out of the canvas or becomes transparent, reset its position and opacity
      if (particle.y < 0 || particle.opacity <= 0) {
        particle.y = canvas.height + Math.random() * canvas.height;
        particle.opacity = 1; // Reset opacity
      }

      // Draw particle with updated opacity
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();

  // Resize canvas when window size changes
  window.addEventListener('resize', resizeCanvas);