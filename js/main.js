document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu functionality
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


  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const navOverlay = document.querySelector('.nav-overlay');

  function toggleMobileMenu() {
    mainNav.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    
    // Change icon
    mobileMenuToggle.textContent = mainNav.classList.contains('active') ? '✕' : '☰';
  }

  if (mobileMenuToggle && mainNav && navOverlay) {
    mobileMenuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMobileMenu();
    });
    
    navOverlay.addEventListener('click', toggleMobileMenu);
    
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          toggleMobileMenu();
        }
      });
    });
  }

  // Lightbox functionality
  document.querySelectorAll('.mini-gallery-grid img, .gallery img').forEach(img => {
    img.addEventListener('click', function() {
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox-overlay active';
      lightbox.innerHTML = `
        <div class="lightbox-content">
          <img src="${this.src}" alt="${this.alt}">
        </div>
      `;
      
      lightbox.addEventListener('click', function() {
        this.remove();
        document.body.classList.remove('menu-open');
      });
      
      document.body.appendChild(lightbox);
    });
  });

  // Random hero background
  const hero = document.getElementById('hero');
  if (hero) {
    const images = ['sample1.jpg', 'sample2.jpg', 'sample3.jpg', 'sample4.jpg'];
    const randomImg = images[Math.floor(Math.random() * images.length)];
    hero.style.backgroundImage = `url('images/${randomImg}')`;
  }

  // Price calculator
  const priceForm = document.getElementById('priceCalculator');
  if (priceForm) {
    priceForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Calculator logic here
    });
  }
});