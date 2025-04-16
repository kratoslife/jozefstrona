document.addEventListener('DOMContentLoaded', function() {
  // =============================================
  // Mobile Menu Functionality
  // =============================================
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const navOverlay = document.querySelector('.nav-overlay');

  function toggleMobileMenu() {
    mainNav.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    
    // Change menu icon
    if (mainNav.classList.contains('active')) {
      mobileMenuToggle.innerHTML = '&times;';
      mobileMenuToggle.setAttribute('aria-expanded', 'true');
    } else {
      mobileMenuToggle.innerHTML = '&#9776;';
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }
  }

  if (mobileMenuToggle && mainNav && navOverlay) {
    mobileMenuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMobileMenu();
    });
    
    // Close menu when clicking overlay
    navOverlay.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking on nav links (mobile only)
    document.querySelectorAll('.main-nav a').forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          toggleMobileMenu();
        }
      });
    });
  }

  // Close menu when pressing Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mainNav.classList.contains('active')) {
      toggleMobileMenu();
    }
  });

  // =============================================
  // Lightbox Functionality
  // =============================================
  function initLightbox() {
    document.querySelectorAll('.mini-gallery-grid img, .gallery img').forEach(img => {
      img.addEventListener('click', function() {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay active';
        
        lightbox.innerHTML = `
          <div class="lightbox-content">
            <img src="${this.src}" alt="${this.alt || 'Powiększone zdjęcie'}">
          </div>
        `;
        
        // Close when clicking anywhere
        lightbox.addEventListener('click', function() {
          this.remove();
          document.body.classList.remove('menu-open');
        });
        
        document.body.appendChild(lightbox);
        document.body.classList.add('menu-open');
      });
    });
  }
  initLightbox();

// Price Calculator Functionality
const priceForm = document.getElementById('priceCalculator');
if (priceForm) {
  priceForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const type = document.getElementById('type').value;
    const material = document.getElementById('material').value;
    const size = parseFloat(document.getElementById('size').value) || 0;
    let pricePerUnit = 0;

    // Base prices
    switch(type) {
      case 'kuchnia': pricePerUnit = 1800; break;
      case 'szafa': pricePerUnit = 1500; break;
      case 'lazienka': pricePerUnit = 1200; break;
      case 'komoda': pricePerUnit = 800; break;
      default: pricePerUnit = 0;
    }

    // Material multipliers
    switch(material) {
      case 'dab': pricePerUnit *= 1.3; break;
      case 'sosna': pricePerUnit *= 0.9; break;
      case 'buk': pricePerUnit *= 1.1; break;
      case 'modrzew': pricePerUnit *= 1.2; break;
    }

    const totalPrice = size * pricePerUnit;
    const resultElement = document.getElementById('result');
    
    if (totalPrice > 0) {
      document.getElementById('price').textContent = totalPrice.toLocaleString('pl-PL');
      resultElement.style.display = 'block';
    } else {
      resultElement.style.display = 'none';
      alert('Proszę wybrać rodzaj mebla i podać rozmiar');
    }
  });
}

  // =============================================
  // Form Validation
  // =============================================
  const contactForm = document.querySelector('.contact form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      let isValid = true;
      const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.style.borderColor = 'red';
          isValid = false;
        } else {
          input.style.borderColor = '#ccc';
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        alert('Proszę wypełnić wszystkie wymagane pola oznaczone gwiazdką.');
      }
    });
  }

  // =============================================
  // Scroll Animations
  // =============================================
  function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in:not(.animated)');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100) {
        element.classList.add('animated');
      }
    });
  }

  // Initial check
  animateOnScroll();
  
  // Check on scroll
  window.addEventListener('scroll', animateOnScroll);

  // =============================================
  // Random Hero Background (if exists)
  // =============================================
  const hero = document.getElementById('hero'); // Make sure your hero section has id="hero"
  if (hero) {
    const images = ['tlo-drewno.jpg', 'tlo-drewno2.jpg', 'tlo-drewno3.jpg']; // Ensure these images exist
    const randomImg = images[Math.floor(Math.random() * images.length)];
    hero.style.backgroundImage = `linear-gradient(rgba(80, 55, 30, 0.7), rgba(80, 55, 30, 0.7)), url('images/${randomImg}')`;
  }

  // =============================================
  // Current Year in Footer
  // =============================================
  const yearElement = document.querySelector('.main-footer p');
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
  }
});