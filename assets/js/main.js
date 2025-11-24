/**
 * SuperKeeper - Main JavaScript File
 * Handles all interactive elements, form validations, and animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const navbar = document.querySelector('.navbar');
    const backToTopBtn = document.getElementById('backToTop');
    const forms = document.querySelectorAll('.needs-validation');
    const navLinks = document.querySelectorAll('.nav-link');
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    const accordionItems = document.querySelectorAll('.accordion-button');
    
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 120
        });
    }

    // Navbar scroll effect
    function handleScroll() {
        // Add/remove scrolled class to navbar
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        // Show/hide back to top button
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
        
        // Update active nav link based on scroll position
        const scrollPosition = window.scrollY + 200;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                if (targetId === '#' || !document.querySelector(targetId)) return;
                
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    window.location.hash = targetId;
                }
            });
        });
    }
    
    // Form validation and submission
    function initForms() {
        // Loop over forms and prevent submission if invalid
        forms.forEach(form => {
            form.addEventListener('submit', function(event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    // Handle form submission
                    handleFormSubmit(form, event);
                }
                
                form.classList.add('was-validated');
            }, false);
            
            // Add real-time validation
            form.querySelectorAll('.form-control').forEach(input => {
                input.addEventListener('input', function() {
                    if (input.checkValidity()) {
                        input.classList.remove('is-invalid');
                        input.classList.add('is-valid');
                    } else {
                        input.classList.remove('is-valid');
                        input.classList.add('is-invalid');
                    }
                });
            });
        });
    }
    
    // Handle form submission with AJAX
    async function handleFormSubmit(form, event) {
        event.preventDefault();
        
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        try {
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Processing...';
            
            // Simulate API call (replace with actual fetch/axios call)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            showAlert('success', 'Thank you! Your message has been sent successfully.');
            form.reset();
            form.classList.remove('was-validated');
            
        } catch (error) {
            // Show error message
            showAlert('danger', 'An error occurred. Please try again later.');
            console.error('Form submission error:', error);
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    }
    
    // Show alert message
    function showAlert(type, message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.role = 'alert';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        // Add to the form or to a global alerts container
        const form = document.querySelector('form');
        if (form) {
            form.prepend(alertDiv);
        } else {
            const container = document.querySelector('.container') || document.querySelector('main');
            if (container) container.prepend(alertDiv);
        }
        
        // Auto-remove alert after 5 seconds
        setTimeout(() => {
            const alert = bootstrap.Alert.getOrCreateInstance(alertDiv);
            if (alert) alert.close();
        }, 5000);
    }
    
    // Initialize tooltips and popovers
    function initTooltipsAndPopovers() {
        // Initialize Bootstrap tooltips
        tooltipTriggerList.map(tooltipTriggerEl => {
            return new bootstrap.Tooltip(tooltipTriggerEl, {
                trigger: 'hover',
                placement: 'top',
                container: 'body'
            });
        });
        
        // Initialize Bootstrap popovers
        popoverTriggerList.map(popoverTriggerEl => {
            return new bootstrap.Popover(popoverTriggerEl, {
                trigger: 'focus',
                container: 'body',
                html: true
            });
        });
    }
    
    // Initialize accordion functionality
    function initAccordion() {
        accordionItems.forEach(item => {
            item.addEventListener('click', function() {
                // Close other accordion items when one is opened
                if (!this.classList.contains('collapsed')) {
                    const parent = this.closest('.accordion');
                    if (parent) {
                        const allItems = parent.querySelectorAll('.accordion-button');
                        allItems.forEach(accordionItem => {
                            if (accordionItem !== this) {
                                accordionItem.classList.add('collapsed');
                                const targetId = accordionItem.getAttribute('data-bs-target');
                                const target = document.querySelector(targetId);
                                if (target) {
                                    target.classList.remove('show');
                                }
                            }
                        });
                    }
                }
            });
        });
    }
    
    // Initialize all components
    function init() {
        handleScroll();
        initSmoothScrolling();
        initForms();
        initTooltipsAndPopovers();
        initAccordion();
        
        // Add event listeners
        window.addEventListener('scroll', handleScroll);
        
        // Back to top button
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        // Add animation classes to elements when they come into view
        const animateOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    animateOnScroll.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            animateOnScroll.observe(el);
        });
    }
    
    // Initialize everything when DOM is loaded
    init();
});
                if (successMessage) {
                    successMessage.style.display = 'block';
                    form.reset();
                    
                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth' });
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 5000);
                }
            }
            
            form.classList.add('was-validated');
        }, false);
    });
});

// Back to top button
const backToTopButton = document.querySelector('.back-to-top');
if (backToTopButton) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
});
