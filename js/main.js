document.addEventListener('DOMContentLoaded', function() {
  // Price calculator (only on calculator page)
  const form = document.getElementById('priceCalculator');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const type = document.getElementById('type').value;
      const size = parseFloat(document.getElementById('size').value);
      let pricePerUnit = 0;

      switch(type) {
        case 'kuchnia': pricePerUnit = 1800; break;
        case 'szafa': pricePerUnit = 1500; break;
        case 'lazienka': pricePerUnit = 1200; break;
        case 'komoda': pricePerUnit = 800; break;
        default: pricePerUnit = 0;
      }

      const totalPrice = size * pricePerUnit;
      document.getElementById('price').innerText = totalPrice.toLocaleString('pl-PL');
      document.getElementById('result').style.display = 'block';
    });
  }

  // Lightbox functionality
  const images = document.querySelectorAll('.gallery img, .mini-gallery-grid img');
  if (images.length > 0) {
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
  }

  // Random hero background (only on index page)
  const hero = document.getElementById('hero');
  if (hero) {
    const images = ['sample1.jpg', 'sample2.jpg', 'sample3.jpg', 'sample4.jpg'];
    const randomImg = images[Math.floor(Math.random() * images.length)];
    hero.style.backgroundImage = `url('images/${randomImg}')`;
  }

  // Mobile menu functionality (for all pages)
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', function() {
      // Toggle menu and icon
      mainNav.classList.toggle('active');
      this.textContent = mainNav.classList.contains('active') ? '✕' : '☰';
      
      // Toggle body scroll
      document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking on links (mobile only)
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          mainNav.classList.remove('active');
          mobileMenuToggle.textContent = '☰';
          document.body.classList.remove('menu-open');
        }
      });
    });
  }
});