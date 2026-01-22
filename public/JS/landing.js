document.addEventListener('DOMContentLoaded', () => {
	const menuToggle = document.querySelector('.mobile-menu-icon');
	const sidebar = document.querySelector('.mobile-sidebar');
	const overlay = document.querySelector('.mobile-overlay');
	const closeBtn = document.querySelector('.sidebar-close');

	const closeSidebar = () => {
		sidebar?.classList.remove('active');
		overlay?.classList.remove('active');
	};

	menuToggle?.addEventListener('click', () => {
		sidebar?.classList.add('active');
		overlay?.classList.add('active');
	});

	closeBtn?.addEventListener('click', closeSidebar);
	overlay?.addEventListener('click', closeSidebar);

	// ============ ANIMATION SYSTEM ============

	// Smooth scroll behavior
	document.documentElement.style.scrollBehavior = 'smooth';

	// Intersection Observer for scroll animations
	const observerOptions = {
		threshold: 0.15,
		rootMargin: '0px 0px -50px 0px'
	};

	const animateOnScroll = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('animate-in');
			}
		});
	}, observerOptions);

	// Elements to animate on scroll
	const animatedElements = document.querySelectorAll(`
		.home-boxes,
		.our-solution,
		.our-specialization,
		.facuilties-box,
		.center-box,
		.choose-us-item,
		.heading-And-paragraph,
		.cboxes,
		.contact-form,
		.contact-map,
		.review,
		.footer-logo,
		.footer-links,
		.footer-contact,
		.footer-social,
		.footer-destinations
	`);

	animatedElements.forEach(el => {
		el.classList.add('scroll-animate');
		animateOnScroll.observe(el);
	});

	// Stagger animation for country boxes
	const countryBoxes = document.querySelectorAll('.cboxes');
	countryBoxes.forEach((box, index) => {
		box.style.animationDelay = `${index * 0.1}s`;
	});

	// Stagger animation for faculty boxes
	const facultyBoxes = document.querySelectorAll('.facuilties-box');
	facultyBoxes.forEach((box, index) => {
		box.style.animationDelay = `${index * 0.15}s`;
	});

	// Stagger animation for choose-us items
	const chooseUsItems = document.querySelectorAll('.choose-us-item');
	chooseUsItems.forEach((item, index) => {
		item.style.animationDelay = `${index * 0.1}s`;
	});

	// Navbar animation on scroll
	let lastScroll = 0;
	const navbar = document.querySelector('header .navbar');
	
	window.addEventListener('scroll', () => {
		const currentScroll = window.pageYOffset;
		
		if (currentScroll <= 0) {
			navbar?.classList.remove('scroll-up');
			return;
		}
		
		if (currentScroll > lastScroll && !navbar?.classList.contains('scroll-down')) {
			navbar?.classList.remove('scroll-up');
			navbar?.classList.add('scroll-down');
		} else if (currentScroll < lastScroll && navbar?.classList.contains('scroll-down')) {
			navbar?.classList.remove('scroll-down');
			navbar?.classList.add('scroll-up');
		}
		lastScroll = currentScroll;
	});

	// Button ripple effect
	const buttons = document.querySelectorAll('button, .button a, .submit-btn, .get-started-btn a');
	buttons.forEach(button => {
		button.addEventListener('click', function(e) {
			const ripple = document.createElement('span');
			ripple.classList.add('ripple');
			this.appendChild(ripple);
			
			const rect = this.getBoundingClientRect();
			const size = Math.max(rect.width, rect.height);
			const x = e.clientX - rect.left - size / 2;
			const y = e.clientY - rect.top - size / 2;
			
			ripple.style.width = ripple.style.height = size + 'px';
			ripple.style.left = x + 'px';
			ripple.style.top = y + 'px';
			
			setTimeout(() => ripple.remove(), 600);
		});
	});

	// Parallax effect for hero image (subtle and clamped)
	const heroImage = document.querySelector('.image-box img');
	if (heroImage) {
		const maxShift = 28; // px cap to avoid drifting into next section
		const parallaxSpeed = 0.18;

		const handleParallax = () => {
			const rect = heroImage.getBoundingClientRect();
			const viewportH = window.innerHeight;
			// Only parallax while hero is on screen
			if (rect.bottom < 0 || rect.top > viewportH) {
				heroImage.style.transform = 'translateY(0)';
				return;
			}
			const scrolled = window.pageYOffset;
			const shift = Math.min(maxShift, Math.max(-maxShift, scrolled * parallaxSpeed));
			heroImage.style.transform = `translateY(${shift}px)`;
		};

		window.addEventListener('scroll', handleParallax, { passive: true });
		handleParallax();
	}

	// Counter animation
	const counters = document.querySelectorAll('.choose-us-item h2');
	const animateCounter = (counter) => {
		const target = counter.textContent.trim();
		const numMatch = target.match(/\d+/);
		if (!numMatch) return;
		
		const targetNum = parseInt(numMatch[0]);
		const suffix = target.replace(/\d+/g, '').trim();
		const duration = 2000;
		const increment = targetNum / (duration / 16);
		let current = 0;
		
		const updateCounter = () => {
			current += increment;
			if (current < targetNum) {
				counter.textContent = Math.floor(current) + ' ' + suffix;
				requestAnimationFrame(updateCounter);
			} else {
				counter.textContent = targetNum + ' ' + suffix;
			}
		};
		updateCounter();
	};

	const counterObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
				entry.target.classList.add('counted');
				animateCounter(entry.target);
			}
		});
	}, { threshold: 0.5 });

	counters.forEach(counter => counterObserver.observe(counter));

	// Form input animations
	const formInputs = document.querySelectorAll('input, select, textarea');
	formInputs.forEach(input => {
		input.addEventListener('focus', function() {
			this.parentElement?.classList.add('focused');
		});
		
		input.addEventListener('blur', function() {
			if (!this.value) {
				this.parentElement?.classList.remove('focused');
			}
		});
	});

	// Add floating animation to experience box
	const experienceBox = document.querySelector('.experience-box');
	if (experienceBox) {
		experienceBox.style.animation = 'float 3s ease-in-out infinite';
	}

	// Card tilt effect on mouse move
	const cards = document.querySelectorAll('.cboxes, .facuilties-box, .choose-us-item');
	cards.forEach(card => {
		card.addEventListener('mousemove', (e) => {
			const rect = card.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			
			const centerX = rect.width / 2;
			const centerY = rect.height / 2;
			
			const rotateX = (y - centerY) / 20;
			const rotateY = (centerX - x) / 20;
			
			card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
		});
		
		card.addEventListener('mouseleave', () => {
			card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
		});
	});

	// Initial page load animation
	setTimeout(() => {
		document.body.classList.add('loaded');
	}, 100);
});
