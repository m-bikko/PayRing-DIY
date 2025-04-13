
    // Wait for the DOM to fully load
    document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');

    mobileMenuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');

    // Create mobile menu styles dynamically
    if (!document.getElementById('mobile-styles')) {
    const mobileStyles = document.createElement('style');
    mobileStyles.id = 'mobile-styles';
    mobileStyles.textContent = `
        .nav-links.active {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background: white;
          box-shadow: 0 10px 15px rgba(0,0,0,0.1);
          padding: 2rem;
          z-index: 1000;
          animation: slideDown 0.3s ease;
        }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `;
    document.head.appendChild(mobileStyles);
}
});

    // Scroll Header Effect
    window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
    header.classList.add('scrolled');

    // Add scrolled styles dynamically
    if (!document.getElementById('scroll-styles')) {
    const scrollStyles = document.createElement('style');
    scrollStyles.id = 'scroll-styles';
    scrollStyles.textContent = `
          header.scrolled {
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            padding: 0.5rem 0;
            transition: all 0.3s ease;
          }
          
          header.scrolled nav {
            padding: 0.8rem 0;
          }
        `;
    document.head.appendChild(scrollStyles);
}
} else {
    header.classList.remove('scrolled');
}
});

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
    // Close all other open FAQ items
    faqItems.forEach(otherItem => {
    if (otherItem !== item && otherItem.classList.contains('active')) {
    otherItem.classList.remove('active');
}
});

    // Toggle current item
    item.classList.toggle('active');
});
});

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);

    if (targetElement) {
    // Close mobile menu if open
    if (navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
}

    window.scrollTo({
    top: targetElement.offsetTop - 100,
    behavior: 'smooth'
});
}
});
});

    // Testimonials Carousel
    const testimonialsCarousel = document.querySelector('.testimonials-carousel');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let isDown = false;
    let startX;
    let scrollLeft;

    // Auto-scroll testimonials
    let autoScrollInterval;

    function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
    testimonialsCarousel.scrollLeft += 2;

    // Reset scroll position when reaching the end
    if (testimonialsCarousel.scrollLeft >= (testimonialsCarousel.scrollWidth - testimonialsCarousel.clientWidth)) {
    testimonialsCarousel.scrollLeft = 0;
}
}, 30);
}

    function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

    // Start auto-scroll on page load
    startAutoScroll();

    // Mouse events for manual control
    testimonialsCarousel.addEventListener('mousedown', (e) => {
    isDown = true;
    testimonialsCarousel.classList.add('active');
    startX = e.pageX - testimonialsCarousel.offsetLeft;
    scrollLeft = testimonialsCarousel.scrollLeft;
    stopAutoScroll();
});

    testimonialsCarousel.addEventListener('mouseleave', () => {
    isDown = false;
    testimonialsCarousel.classList.remove('active');
    startAutoScroll();
});

    testimonialsCarousel.addEventListener('mouseup', () => {
    isDown = false;
    testimonialsCarousel.classList.remove('active');
    startAutoScroll();
});

    testimonialsCarousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - testimonialsCarousel.offsetLeft;
    const walk = (x - startX) * 2;
    testimonialsCarousel.scrollLeft = scrollLeft - walk;
});

    // Touch events for mobile
    testimonialsCarousel.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - testimonialsCarousel.offsetLeft;
    scrollLeft = testimonialsCarousel.scrollLeft;
    stopAutoScroll();
});

    testimonialsCarousel.addEventListener('touchend', () => {
    isDown = false;
    startAutoScroll();
});

    testimonialsCarousel.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - testimonialsCarousel.offsetLeft;
    const walk = (x - startX) * 2;
    testimonialsCarousel.scrollLeft = scrollLeft - walk;
});

    // Animate elements on scroll
    const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .step, .kit-item, .testimonial-card, .section-title');

    elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;

    if (elementPosition < screenPosition) {
    element.classList.add('animate');

    // Add animation styles dynamically
    if (!document.getElementById('animation-styles')) {
    const animationStyles = document.createElement('style');
    animationStyles.id = 'animation-styles';
    animationStyles.textContent = `
            .feature-card, .step, .kit-item, .testimonial-card, .section-title {
              opacity: 0;
              transform: translateY(30px);
              transition: all 0.6s ease;
            }
            
            .feature-card.animate, .step.animate, .kit-item.animate, .testimonial-card.animate, .section-title.animate {
              opacity: 1;
              transform: translateY(0);
            }
            
            .feature-card:nth-child(2) {
              transition-delay: 0.1s;
            }
            
            .feature-card:nth-child(3) {
              transition-delay: 0.2s;
            }
            
            .feature-card:nth-child(4) {
              transition-delay: 0.1s;
            }
            
            .feature-card:nth-child(5) {
              transition-delay: 0.2s;
            }
            
            .feature-card:nth-child(6) {
              transition-delay: 0.3s;
            }
          `;
    document.head.appendChild(animationStyles);
}
}
});
};

    // Run animate on scroll on page load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Enhanced NFC Wave Animation

    // Parallax Effect for Hero Section
    const heroImage = document.querySelector('.hero-image-container');
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;

    if (scrolled < 600) {
    heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
}
});

    // Enhance CTA Buttons with Hover Animation
    const ctaButtons = document.querySelectorAll('.cta-button, .secondary-button, .cta-primary, .cta-secondary');

    ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
    this.classList.add('pulse');

    // Add pulse animation styles dynamically
    if (!document.getElementById('pulse-styles')) {
    const pulseStyles = document.createElement('style');
    pulseStyles.id = 'pulse-styles';
    pulseStyles.textContent = `
          @keyframes buttonPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          
          .pulse {
            animation: buttonPulse 0.6s ease-in-out;
          }
        `;
    document.head.appendChild(pulseStyles);
}
});

    button.addEventListener('animationend', function() {
    this.classList.remove('pulse');
});
});

    // Add interactive element to feature icons
    const featureIcons = document.querySelectorAll('.feature-icon, .kit-item-icon');
    const iconPaths = [
    'M3 12c4-6 10-6 14 0M6 12c3-4 7-4 10 0M9 12c2-2 4-2 6 0',
    'M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm7 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-4 4h4m6-4h4m-4 4h4',
    'M12 2c-4 0-7 3-7 7 0 6 4 9 7 11 3-2 7-5 7-11 0-4-3-7-7-7zm0 6a3 3 0 1 1 0 6 3 3 0 0 1 0-6z',
    'M12 2s6 7 6 12a6 6 0 1 1-12 0c0-5 6-12 6-12z',
    'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    'M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.6-1.3 4.9-3.2 6.2a2 2 0 0 0-.8 1.8v1h-6v-1a2 2 0 0 0-.8-1.8C6.3 13.9 5 11.6 5 9a7 7 0 0 1 7-7z'
    ];

// Ensure the number of icons matches the number of paths
    featureIcons.forEach((icon, index) => {
    // Create SVG icons dynamically
    const iconSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    iconSVG.setAttribute('width', '24');
    iconSVG.setAttribute('height', '24');
    iconSVG.setAttribute('viewBox', '0 0 24 24');
    iconSVG.setAttribute('fill', 'none');
    iconSVG.setAttribute('stroke', 'white');
    iconSVG.setAttribute('stroke-width', '2');
    iconSVG.setAttribute('stroke-linecap', 'round');
    iconSVG.setAttribute('stroke-linejoin', 'round');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    // Assign paths **sequentially** instead of randomly
    path.setAttribute('d', iconPaths[index % iconPaths.length]);

    iconSVG.appendChild(path);
    icon.appendChild(iconSVG);

    // Add hover effect
    icon.addEventListener('mouseenter', function () {
    this.classList.add('icon-pulse');

    // Add icon pulse animation styles dynamically
    if (!document.getElementById('icon-pulse-styles')) {
    const iconPulseStyles = document.createElement('style');
    iconPulseStyles.id = 'icon-pulse-styles';
    iconPulseStyles.textContent = `
                @keyframes iconPulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }

                .icon-pulse {
                    animation: iconPulse 0.6s ease-in-out infinite;
                }
            `;
    document.head.appendChild(iconPulseStyles);
}
});

    icon.addEventListener('mouseleave', function () {
    this.classList.remove('icon-pulse');
});
});

    // Add hover effect for social links
    const socialLinks = document.querySelectorAll('.social-link');

    // Social media icons
    const socialIcons = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>'
    ];

    socialLinks.forEach((link, index) => {
    link.innerHTML = socialIcons[index];

    link.addEventListener('mouseenter', function() {
    this.style.transform = 'rotate(360deg) scale(1.2)';
    this.style.transition = 'all 0.5s ease';
});

    link.addEventListener('mouseleave', function() {
    this.style.transform = 'rotate(0) scale(1)';
});
});

    // Add sticky navigation on scroll
    const navigation = document.querySelector('nav');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 200) {
    // Scrolling down
    navigation.classList.add('nav-hidden');

    // Add navigation styles dynamically
    if (!document.getElementById('nav-styles')) {
    const navStyles = document.createElement('style');
    navStyles.id = 'nav-styles';
    navStyles.textContent = `
          .nav-hidden {
            transform: translateY(-100%);
            transition: transform 0.3s ease-in-out;
          }
        `;
    document.head.appendChild(navStyles);
}
} else {
    // Scrolling up
    navigation.classList.remove('nav-hidden');
}

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);

    // Initialize count-up animation for user count
    const createCountUp = (el, target) => {
    const countUpElement = document.createElement('span');
    countUpElement.classList.add('count-up');
    countUpElement.textContent = '0';
    el.appendChild(countUpElement);

    const countStyles = document.createElement('style');
    countStyles.textContent = `
      .count-up {
        font-weight: bold;
        color: var(--primary);
      }
    `;
    document.head.appendChild(countStyles);

    let current = 0;
    const increment = Math.ceil(target / 100);
    const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
    clearInterval(timer);
    current = target;
}
    countUpElement.textContent = current.toLocaleString();
}, 20);
};

    // Create count-up elements
    const ctaSection = document.querySelector('.cta-section p');
    if (ctaSection) {
    ctaSection.innerHTML = 'Join over <span id="user-count"></span> happy customers who have simplified their payments with PayRing DIY. Create something unique that makes your life easier.';
    createCountUp(document.getElementById('user-count'), 25000);
}
});