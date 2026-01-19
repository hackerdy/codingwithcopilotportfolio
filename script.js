/* ============================================
   PORTFOLIO INTERACTIVITY SCRIPT
   ============================================ */

// Debug mode - set to true to log messages
const DEBUG = true;

// Logging utility
function log(message, data = null) {
    if (DEBUG) {
        if (data) {
            console.log(`[Portfolio] ${message}`, data);
        } else {
            console.log(`[Portfolio] ${message}`);
        }
    }
}

// ============================================
// STEP 3: BASIC INTERACTIVITY
// ============================================

/* ============================================
   HAMBURGER MENU TOGGLE FUNCTION
   ============================================ */

function toggleMenu() {
    try {
        const hamburger = document.getElementById('hamburger-menu');
        const navMenu = document.getElementById('nav-menu');

        if (!hamburger || !navMenu) {
            log('ERROR: Hamburger menu or nav menu not found in DOM');
            return;
        }

        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Update aria-expanded for accessibility
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);

        log('Menu toggled. Active:', hamburger.classList.contains('active'));
    } catch (error) {
        log('ERROR in toggleMenu()', error);
    }
}

/* ============================================
   SMOOTH SCROLLING FOR NAVIGATION LINKS
   ============================================ */

function initSmoothScrolling() {
    try {
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        const hamburger = document.getElementById('hamburger-menu');
        const navMenu = document.getElementById('nav-menu');

        if (navLinks.length === 0) {
            log('WARNING: No navigation links found');
            return;
        }

        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');

                // Validate target
                if (!targetId || targetId === '#') {
                    log('WARNING: Invalid target ID', targetId);
                    return;
                }

                const targetElement = document.querySelector(targetId);

                if (!targetElement) {
                    log('WARNING: Target element not found', targetId);
                    return;
                }

                // Smooth scroll
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Close mobile menu if open
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                }

                log('Scrolled to:', targetId);
            });
        });

        log('Smooth scrolling initialized for', navLinks.length, 'links');
    } catch (error) {
        log('ERROR in initSmoothScrolling()', error);
    }
}

// ============================================
// STEP 4: PROJECT FILTERING AND LIGHTBOX
// ============================================

/* ============================================
   PROJECT FILTER FUNCTION
   ============================================ */

function initProjectFiltering() {
    try {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        if (filterButtons.length === 0 || projectCards.length === 0) {
            log('WARNING: Filter buttons or project cards not found');
            return;
        }

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filter projects
                filterProjects(filterValue);
                log('Filter applied:', filterValue);
            });
        });

        log('Project filtering initialized');
    } catch (error) {
        log('ERROR in initProjectFiltering()', error);
    }
}

function filterProjects(category) {
    try {
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');

            if (category === 'all' || cardCategory === category) {
                card.style.display = 'flex';
                card.style.opacity = '1';
                card.style.animation = 'fadeIn 0.3s ease';
                log('Showing project:', cardCategory);
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
        });
    } catch (error) {
        log('ERROR in filterProjects()', error);
    }
}

/* ============================================
   LIGHTBOX MODAL FUNCTION
   ============================================ */

function initLightbox() {
    try {
        const lightboxImages = document.querySelectorAll('.lightbox-trigger');
        const lightboxModal = document.getElementById('lightbox-modal');
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxClose = document.querySelector('.lightbox-close');

        if (!lightboxModal || !lightboxImage || !lightboxClose) {
            log('WARNING: Lightbox elements not found');
            return;
        }

        // Open lightbox when image is clicked
        lightboxImages.forEach(img => {
            img.addEventListener('click', function(e) {
                e.preventDefault();
                openLightbox(this.src, this.alt);
            });

            // Keyboard accessibility - spacebar
            img.addEventListener('keydown', function(e) {
                if (e.code === 'Space' || e.code === 'Enter') {
                    e.preventDefault();
                    openLightbox(this.src, this.alt);
                }
            });
        });

        // Close lightbox
        lightboxClose.addEventListener('click', closeLightbox);

        // Close when clicking outside image
        lightboxModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeLightbox();
            }
        });

        // Close with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });

        log('Lightbox initialized for', lightboxImages.length, 'images');
    } catch (error) {
        log('ERROR in initLightbox()', error);
    }
}

function openLightbox(src, alt) {
    try {
        const lightboxModal = document.getElementById('lightbox-modal');
        const lightboxImage = document.getElementById('lightbox-image');

        if (!lightboxModal || !lightboxImage) {
            log('ERROR: Lightbox elements not found');
            return;
        }

        lightboxImage.src = src;
        lightboxImage.alt = alt;
        lightboxModal.classList.add('active');

        log('Lightbox opened:', alt);
    } catch (error) {
        log('ERROR in openLightbox()', error);
    }
}

function closeLightbox() {
    try {
        const lightboxModal = document.getElementById('lightbox-modal');

        if (!lightboxModal) {
            log('ERROR: Lightbox modal not found');
            return;
        }

        lightboxModal.classList.remove('active');
        log('Lightbox closed');
    } catch (error) {
        log('ERROR in closeLightbox()', error);
    }
}

// ============================================
// STEP 5: FORM VALIDATION
// ============================================

/* ============================================
   FORM VALIDATION FUNCTION
   ============================================ */

function initFormValidation() {
    try {
        const contactForm = document.querySelector('#contact form');

        if (!contactForm) {
            log('WARNING: Contact form not found');
            return;
        }

        // Wrap form fields in form groups for validation feedback
        wrapFormElements(contactForm);

        // Add real-time validation listeners
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });

        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitForm(this);
        });

        log('Form validation initialized');
    } catch (error) {
        log('ERROR in initFormValidation()', error);
    }
}

function wrapFormElements(form) {
    try {
        const labels = form.querySelectorAll('label');

        labels.forEach(label => {
            const inputId = label.getAttribute('for');
            const input = document.getElementById(inputId);

            if (input) {
                const formGroup = document.createElement('div');
                formGroup.className = 'form-group';

                label.parentNode.insertBefore(formGroup, label);
                formGroup.appendChild(label);
                formGroup.appendChild(input);

                // Add error and success message containers
                const errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.id = `${inputId}-error`;
                formGroup.appendChild(errorMsg);

                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.id = `${inputId}-success`;
                formGroup.appendChild(successMsg);
            }
        });

        log('Form elements wrapped in form groups');
    } catch (error) {
        log('ERROR in wrapFormElements()', error);
    }
}

function validateField(field) {
    try {
        const value = field.value.trim();
        const fieldType = field.type;
        const fieldId = field.id;
        const errorMsg = document.getElementById(`${fieldId}-error`);
        const successMsg = document.getElementById(`${fieldId}-success`);

        let isValid = true;
        let errorText = '';

        // Remove previous states
        field.classList.remove('error', 'success');
        if (errorMsg) errorMsg.classList.remove('show');
        if (successMsg) successMsg.classList.remove('show');

        // Validate based on field type
        if (value === '') {
            isValid = false;
            errorText = `${field.name || 'This field'} is required.`;
        } else if (fieldType === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorText = 'Please enter a valid email address.';
            }
        } else if (fieldId === 'message' && value.length < 10) {
            isValid = false;
            errorText = 'Message must be at least 10 characters long.';
        }

        // Update UI
        if (isValid) {
            field.classList.add('success');
            if (successMsg) {
                successMsg.textContent = '✓ Valid';
                successMsg.classList.add('show');
            }
        } else {
            field.classList.add('error');
            if (errorMsg) {
                errorMsg.textContent = errorText;
                errorMsg.classList.add('show');
            }
        }

        log(`Field validation: ${fieldId} - ${isValid ? 'VALID' : 'INVALID'}`);
        return isValid;
    } catch (error) {
        log('ERROR in validateField()', error);
        return false;
    }
}

function submitForm(form) {
    try {
        const inputs = form.querySelectorAll('input, textarea');
        let allValid = true;

        // Validate all fields
        inputs.forEach(input => {
            if (!validateField(input)) {
                allValid = false;
            }
        });

        if (allValid) {
            log('Form is valid. Submitting...');
            // In a real application, you would send the form data to a server here
            // Example: form.submit();

            // Show success message to user
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();

            // Clear all validation states
            inputs.forEach(input => {
                input.classList.remove('error', 'success');
                const errorMsg = document.getElementById(`${input.id}-error`);
                const successMsg = document.getElementById(`${input.id}-success`);
                if (errorMsg) errorMsg.classList.remove('show');
                if (successMsg) successMsg.classList.remove('show');
            });
        } else {
            log('Form has validation errors. Please correct them.');
            alert('Please correct the errors in the form.');
        }
    } catch (error) {
        log('ERROR in submitForm()', error);
    }
}

// ============================================
// INITIALIZATION
// ============================================

// Hamburger menu toggle
document.addEventListener('DOMContentLoaded', function() {
    try {
        log('Initializing portfolio interactivity...');

        // Initialize hamburger menu
        const hamburger = document.getElementById('hamburger-menu');
        if (hamburger) {
            hamburger.addEventListener('click', toggleMenu);
            log('Hamburger menu event listener added');
        }

        // Initialize smooth scrolling
        initSmoothScrolling();

        // Initialize project filtering
        initProjectFiltering();

        // Initialize lightbox
        initLightbox();

        // Initialize form validation
        initFormValidation();

        log('All interactivity features initialized successfully');
    } catch (error) {
        log('CRITICAL ERROR during initialization', error);
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    try {
        const hamburger = document.getElementById('hamburger-menu');
        const navMenu = document.getElementById('nav-menu');

        if (!hamburger || !navMenu) return;

        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        }
    } catch (error) {
        log('ERROR in click handler', error);
    }
});
