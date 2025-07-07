// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// General scroll animations with unified observer
const generalObserverOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const generalObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, generalObserverOptions);

// Observe elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => generalObserver.observe(el));

// Feature cards scroll animation with separate observer
const featureObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, featureObserverOptions);

// Observe all feature cards and title
document.querySelectorAll('.feature-card').forEach(card => {
    featureObserver.observe(card);
});

// Check if elements exist before observing
const featuresTitle = document.querySelector('.features-title');
const featuresSection = document.querySelector('.features');

if (featuresTitle) {
    featureObserver.observe(featuresTitle);
}
if (featuresSection) {
    featureObserver.observe(featuresSection);
}

// Header background change on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (header) {
    if (window.scrollY > 100) {
      header.style.background = 'rgba(26, 26, 26, 0.95)';
    } else {
      header.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)';
    }
  }
});

// Add interactive hover for feature cards
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px) scale(1.02)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
  });
});

// Contact form submission confirmation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Optionally, post to Formspree if action/method are set.
        fetch(this.action, {
            method: this.method,
            body: new FormData(this),
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                alert('Thank you! Your message has been sent.');
                this.reset();
            } else {
                alert('Oops! Something went wrong.');
            }
        })
        .catch(() => alert('Oops! There was a problem submitting your form.'));
    });
}

// Dynamic stats counter animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const isNumeric = /^\d+/.test(finalValue);
        
        if (isNumeric) {
            const numValue = parseInt(finalValue);
            let current = 0;
            const increment = numValue / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= numValue) {
                    stat.textContent = finalValue;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + finalValue.replace(/^\d+/, '');
                }
            }, 50);
        }
    });
}

// Trigger stats animation when section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.problem-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}