// Smooth scroll for internal links
document.addEventListener('DOMContentLoaded', function(){
	// Smooth scroll
	document.querySelectorAll('a[href^="#"]').forEach(a=>{
		a.addEventListener('click', function(e){
			const target = document.querySelector(this.getAttribute('href'));
			if(target){
				e.preventDefault();
				target.scrollIntoView({behavior:'smooth',block:'start'});
			}
		});
	});

	// Mobile nav toggle
	const navToggle = document.querySelector('.nav-toggle');
	const navLinks = document.querySelector('.nav-links');
	if(navToggle){
		navToggle.addEventListener('click', ()=> navLinks.classList.toggle('open'));
	}

	// Intersection Observer for fade-in and progress
	const observer = new IntersectionObserver((entries, obs) => {
		entries.forEach(entry=>{
			if(entry.isIntersecting){
				entry.target.classList.add('in-view');
				// animate progress bars if any inside
				entry.target.querySelectorAll('.progress-bar').forEach(bar=>{
					const val = bar.getAttribute('data-progress') || 0;
					bar.style.width = val + '%';
				});
				obs.unobserve(entry.target);
			}
		});
	},{threshold:0.15});

	document.querySelectorAll('[data-anim]').forEach(el => observer.observe(el));

	// Also observe skill cards individually
	document.querySelectorAll('.skill-card').forEach(card => observer.observe(card));

	// Typing effect for role variations
	const typingEl = document.getElementById('typing');
	const phrases = ['AI Builder', 'Frontend Engineer', 'Solusi Untuk UMKM'];
	let tIndex = 0, charIndex = 0, deleting = false;

	function typeTick(){
		const current = phrases[tIndex];
		if(!deleting){
			charIndex++;
			typingEl.textContent = current.slice(0, charIndex);
			if(charIndex === current.length){
				deleting = true;
				setTimeout(typeTick, 1000);
			} else setTimeout(typeTick, 70);
		} else {
			charIndex--;
			typingEl.textContent = current.slice(0, charIndex);
			if(charIndex === 0){
				deleting = false;
				tIndex = (tIndex + 1) % phrases.length;
				setTimeout(typeTick, 300);
			} else setTimeout(typeTick, 40);
		}
	}
	if(typingEl) typeTick();

	// Navbar blur effect on scroll
	const navbar = document.getElementById('navbar');
	window.addEventListener('scroll', ()=> {
		if(window.scrollY > 20) navbar.classList.add('scrolled'); else navbar.classList.remove('scrolled');
	});

	// Optional: form submit (demo)
	const form = document.querySelector('.contact-form');
	if(form){
		form.addEventListener('submit', (e)=>{
			e.preventDefault();
			// Minimal client-side feedback
			alert('Terima kasih! Pesan Anda telah terkirim (demo).');
			form.reset();
		});
	}
});
