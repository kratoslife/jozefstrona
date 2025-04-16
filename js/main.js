document.addEventListener('DOMContentLoaded', () => {
  // Lightbox
  const images = document.querySelectorAll('.gallery img, .mini-gallery-grid img');
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  document.body.appendChild(lightbox);

  const img = document.createElement('img');
  img.id = 'lightbox-img';
  lightbox.appendChild(img);

  images.forEach(image => {
    image.addEventListener('click', () => {
      lightbox.style.display = 'flex';
      img.src = image.src;
    });
  });

  lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });

  // Losowe tło w hero
  const hero = document.getElementById('hero');
  if (hero) {
    const bgImages = ['sample1.jpg', 'sample2.jpg', 'sample3.jpg', 'sample4.jpg'];
    const chosen = bgImages[Math.floor(Math.random() * bgImages.length)];
    hero.style.backgroundImage = `linear-gradient(rgba(80, 55, 30, 0.7), rgba(80, 55, 30, 0.7)), url('images/${chosen}')`;
  }
  // Mobile menu toggle
  const burger = document.getElementById('burger');
  const nav = document.getElementById('main-nav');

  burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    // Burger animation
    burger.classList.toggle('active');
  });

  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      burger.classList.remove('active');
    });
  });
});
