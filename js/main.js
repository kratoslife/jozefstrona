document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu functionality
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const navOverlay = document.querySelector('.nav-overlay');
  const body = document.body;

  // Toggle mobile menu
  function toggleMobileMenu() {
    mainNav.classList.toggle('active');
    navOverlay.classList.toggle('active');
    body.classList.toggle('menu-open');
    
    // Change icon between hamburger and X
    mobileMenuToggle.textContent = mainNav.classList.contains('active') ? '✕' : '☰';
  }

  // Initialize mobile menu if elements exist
  if (mobileMenuToggle && mainNav && navOverlay) {
    // Toggle menu when button clicked
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    
    // Close menu when overlay clicked
    navOverlay.addEventListener('click', toggleMobileMenu);
    
    // Close menu when a nav link is clicked (for mobile)
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          toggleMobileMenu();
        }
      });
    });
  }

  // Lightbox functionality
  const galleryImages = document.querySelectorAll('.gallery img, .mini-gallery-grid img');
  if (galleryImages.length > 0) {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.classList.add('lightbox-overlay');
    
    const lightboxImg = document.createElement('img');
    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);

    galleryImages.forEach(image => {
      image.addEventListener('click', function(e) {
        e.preventDefault();
        lightbox.classList.add('active');
        lightboxImg.src = this.src;
        lightboxImg.alt = this.alt;
      });
    });

    lightbox.addEventListener('click', function() {
      this.classList.remove('active');
    });
  }

  // Random hero background (only on index page)
  const hero = document.getElementById('hero');
  if (hero) {
    const images = ['sample1.jpg', 'sample2.jpg', 'sample3.jpg', 'sample4.jpg'];
    const randomImg = images[Math.floor(Math.random() * images.length)];
    hero.style.backgroundImage = `linear-gradient(rgba(80, 55, 30, 0.7), rgba(80, 55, 30, 0.7)), url('images/${randomImg}')`;
  }

  // Price calculator (only on calculator page)
  const priceForm = document.getElementById('priceCalculator');
  if (priceForm) {
    priceForm.addEventListener('submit', function(e) {
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
      document.getElementById('price').textContent = totalPrice.toLocaleString('pl-PL');
      document.getElementById('result').style.display = 'block';
    });
  }

  // Prevent form resubmission on page refresh
  if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
  }
});