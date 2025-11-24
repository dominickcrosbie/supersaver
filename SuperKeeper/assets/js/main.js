/* ==========================================
   SUPERKEEPER - MAIN JAVASCRIPT
   ========================================== */

// Initialize Chart.js for statistics
function initializeCharts() {
    const superChartElement = document.getElementById('superChart');
    if (superChartElement) {
        const ctx = superChartElement.getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Claimed', 'Unclaimed'],
                datasets: [{
                    data: [35, 65],
                    backgroundColor: ['#198754', '#dc3545'],
                    borderColor: ['#fff', '#fff'],
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 12,
                                weight: '600'
                            },
                            padding: 15
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                }
            }
        });
    }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Animate elements on scroll
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.card, .stat-box, .highlight-box').forEach(el => {
        observer.observe(el);
    });
}

// Format currency
function formatCurrency(value) {
    return new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
        minimumFractionDigits: 2
    }).format(value);
}

// Initialize everything on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    updateActiveNavLink();
    observeElements();
    
    // Log initialization for debugging
    console.log('SuperKeeper website initialized');
});

// Handle window resize for charts
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Reinitialize charts if needed
        const charts = Chart.helpers.getCharts();
        charts.forEach(chart => {
            chart.resize();
        });
    }, 250);
});
