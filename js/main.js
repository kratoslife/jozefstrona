document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu functionality
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('nav'); // Changed to target regular nav element
  const navOverlay = document.querySelector('.nav-overlay');
  const body = document.body;

  // Toggle mobile menu
  function toggleMobileMenu() {
    mainNav.classList.toggle('active');
    navOverlay.classList.toggle('active');
    body.classList.toggle('menu-open');
    
    // Change icon between hamburger and X
    if (mobileMenuToggle) {
      mobileMenuToggle.textContent = mainNav.classList.contains('active') ? '✕' : '☰';
    }
  }

  // Initialize mobile menu if elements exist
  if (mobileMenuToggle && mainNav && navOverlay) {
    // Toggle menu when button clicked
    mobileMenuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMobileMenu();
    });
    
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

  // Single Lightbox implementation
  function initLightbox() {
    const galleryImages = document.querySelectorAll('.gallery img, .mini-gallery-grid img');
    
    galleryImages.forEach(image => {
      image.addEventListener('click', function(e) {
        e.preventDefault();
        
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay active';
        lightbox.innerHTML = `
          <div class="lightbox-content">
            <img src="${this.src}" alt="${this.alt}">
          </div>
        `;
        
        lightbox.addEventListener('click', function() {
          this.remove();
        });
        
        document.body.appendChild(lightbox);
      });
    });
  }

  // Initialize lightbox if gallery images exist
  if (document.querySelector('.gallery img, .mini-gallery-grid img')) {
    initLightbox();
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