document.addEventListener('DOMContentLoaded', () => {
    // Header shadow on scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    // Scroll reveal logic
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation classes and observe
    const animatedElements = document.querySelectorAll('.feature-container, .step-card, .pricing-card, .testimonial-card, .faq-item');
    animatedElements.forEach((el) => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });

    // Pricing Toggle Logic
    const toggleBtns = document.querySelectorAll('.billing-toggle span');
    const amounts = document.querySelectorAll('.plan-price .amount');
    const periods = document.querySelectorAll('.plan-price .period');
    
    // Monthly: Basic $0, Pro $4.99, Team $4.99
    // Yearly: Basic $0, Pro $49.99, Team $49.99
    const monthlyPrices = ['0', '4.99', '4.99'];
    const yearlyPrices = ['0', '49.99', '49.99'];
    
    const monthlyPeriods = ['/month', '/month', '/user/mo'];
    const yearlyPeriods = ['/year', '/year', '/user/yr'];
    
    toggleBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const isYearly = index === 1;
            const targetPrices = isYearly ? yearlyPrices : monthlyPrices;
            const targetPeriods = isYearly ? yearlyPeriods : monthlyPeriods;
            
            amounts.forEach((amount, i) => {
                amount.textContent = targetPrices[i];
                if(periods[i]) periods[i].textContent = targetPeriods[i];
            });
        });
    });

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-question');
        btn.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
});

