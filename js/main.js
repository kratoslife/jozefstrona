document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('priceCalculator');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const type = document.getElementById('type').value;
      const size = parseFloat(document.getElementById('size').value);
      let pricePerUnit = 0;

      switch(type) {
        case 'kuchnia':
          pricePerUnit = 1800;
          break;
        case 'szafa':
          pricePerUnit = 1500;
          break;
        case 'lazienka':
          pricePerUnit = 1200;
          break;
        case 'komoda':
          pricePerUnit = 800;
          break;
        default:
          pricePerUnit = 0;
      }

      const totalPrice = size * pricePerUnit;
      document.getElementById('price').innerText = totalPrice.toLocaleString('pl-PL');
      document.getElementById('result').style.display = 'block';
    });
  }

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

  // Hero losowe tło
  const hero = document.getElementById('hero');
  if (hero) {
    const images = ['sample1.jpg', 'sample2.jpg', 'sample3.jpg', 'sample4.jpg'];
    const randomImg = images[Math.floor(Math.random() * images.length)];
    hero.style.backgroundImage = `url('images/${randomImg}')`;
  }
});
// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      // Change icon based on state
      this.textContent = mainNav.classList.contains('active') ? '✕' : '☰';
    });
    // Add this to your mobile menu toggle event
  if (mainNav.classList.contains('active')) {
    document.body.classList.add('menu-open');
  } else {
    document.body.classList.remove('menu-open');
  }
    // Close menu when clicking on a link (for single-page navigation)
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          mainNav.classList.remove('active');
          mobileMenuToggle.textContent = '☰';
        }
      });
    });
  }
});


