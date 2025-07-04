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

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

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

// Download functionality
function downloadApp(platform, event) {
    if (!event) {
        console.error('Event parameter is required');
        return;
    }
    
    const button = event.currentTarget;
    const originalContent = button.innerHTML;
    
    // Show loading state
    button.innerHTML = `
        <div class="download-icon"><div class="loading"></div></div>
        <h3>Downloading...</h3>
        <p>Please wait</p>
    `;
    
    // Simulate download process
    setTimeout(() => {
        alert(`Thank you for downloading Device Health Optimizer for ${platform.charAt(0).toUpperCase() + platform.slice(1)}!\n\nYour download will begin shortly. Please check your downloads folder.\n\nFor installation instructions, please visit our documentation.`);
        
        // Reset button content
        button.innerHTML = originalContent;
        
        // In a real application, you would trigger the actual download here
        // window.location.href = `/downloads/device-health-optimizer-${platform}.exe`;
    }, 2000);
}

// Add some interactive elements
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Dynamic stats counter animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const numericMatch = finalValue.match(/^(\d+)/);
        
        if (numericMatch) {
            const numValue = parseInt(numericMatch[1]);
            const suffix = finalValue.replace(/^\d+/, '');
            let current = 0;
            const increment = numValue / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= numValue) {
                    stat.textContent = finalValue;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + suffix;
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
}, observerOptions);

// Observe stats elements for animation
document.querySelectorAll('.stat-number').forEach(el => {
    statsObserver.observe(el);
});

// Alternative: If you want to observe a parent container instead
// const statsSection = document.querySelector('.stats-section');
// if (statsSection) {
//     statsObserver.observe(statsSection);
// }

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript initialized successfully');
    
    // You can add any initialization code here
    // For example, setting up event listeners for download buttons:
    document.querySelectorAll('[data-download]').forEach(button => {
        button.addEventListener('click', function(e) {
            const platform = this.getAttribute('data-download');
            downloadApp(platform, e);
        });
    });
});

// Error handling for better debugging
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Optional: Add loading animation CSS dynamically
const loadingCSS = `
.loading {
    width: 20px;
    height: 20px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;

// Inject CSS if not already present
if (!document.querySelector('#loading-styles')) {
    const style = document.createElement('style');
    style.id = 'loading-styles';
    style.textContent = loadingCSS;
    document.head.appendChild(style);
}
document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Here you would typically send the form data to your server
            alert(`Thank you ${name}! Your message has been sent. We'll get back to you soon at ${email}.`);
            
            // Reset form
            this.reset();
        });