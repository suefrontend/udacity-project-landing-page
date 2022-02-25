/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

window.addEventListener('DOMContentLoaded', () => {
	/**
	 * Comments should be present at the beginning of each procedure and class.
	 * Great to have comments before crucial code sections within the procedure.
	 */
	/**
	 * Define Global Variables
	 *
	 */

	const header = document.querySelector('.page__header');
	const ul = document.getElementById('navbar__list');
	const sections = Array.from(document.querySelectorAll('[data-nav]'));
	const containers = document.querySelectorAll("[id*='section'");
	const footer = document.querySelector('.page__footer');
	const scrollToTopBtn = document.querySelector('.back-to-top-btn');
	const collapsibleBtn = document.querySelectorAll('.collapsible-btn');
	const collapsibleText = Array.from(
		document.querySelectorAll('.collapsible__content')
	);
	const chevron = Array.from(document.querySelectorAll('.fa'));

	/**
	 * End Global Variables
	 * Start Helper Functions
	 *
	 */

	const viewportTop = sections.map((section) => {
		const viewportOffset = section.getBoundingClientRect();
		return viewportOffset.top + window.scrollY;
	});
	const getNavHeight = () =>
		document.querySelector('.navbar__menu').clientHeight;
	/**
	 * End Helper Functions
	 * Begin Main Functions
	 *
	 */

	// Build menu
	const createList = (elem) => {
		const li = document.createElement('li');

		const link = document.createElement('a');
		link.href = elem.id;
		link.classList.add('menu__link');
		link.setAttribute('href', `#${elem.id}`);
		link.innerHTML = elem.attributes[1].textContent;

		li.appendChild(link);

		ul.appendChild(li);
	};

	sections.forEach((section) => {
		createList(section);
	});

	// Add class 'active' to section when near top of viewport
	// Set sections as active
	let options = {
		threshold: 1,
	};

	const addActiveClass = (containers) => {
		containers.forEach((container) => {
			container.target.style.paddingTop = getNavHeight;

			if (container.isIntersecting) {
				container.target.classList.add('your-active-class');
			}
			if (!container.isIntersecting) {
				container.target.classList.remove('your-active-class');
			}
		});
	};
	const sectionObserver = new IntersectionObserver(addActiveClass);
	containers.forEach((container) => {
		sectionObserver.observe(container);
	});
	/**
	 * End Main Functions
	 * Begin Events
	 *
	 */

	// Scroll to anchor ID using scrollTO event
	// Scroll to section on link click
	const menuLink = Array.from(document.querySelectorAll('.menu__link'));
	menuLink.forEach((el, index) => {
		el.addEventListener('click', (e) => {
			e.preventDefault();
			window.scrollTo({
				top: viewportTop[index],
				behavior: 'smooth',
			});
		});
	});

	// Hide fixed navigation bar while NOT scrolling
	window.addEventListener('scroll', (e) => {
		let lastScroll = 0;
		const currentScroll = window.pageYOffset;

		if (currentScroll <= 0) {
			header.classList.remove('hidden');
			header.classList.add('show');
		}

		if (currentScroll > lastScroll) {
			header.classList.remove('hidden');
			header.classList.add('show');
			setTimeout(function () {
				header.classList.remove('show');
			}, 3000);
			header.classList.add('hidden');
		}
	});

	// Go to top button
	const goToTop = (footers) => {
		footers.forEach((footer) => {
			if (footer.isIntersecting) {
				// Show go to top button
				scrollToTopBtn.classList.remove('hidden');
				scrollToTopBtn.classList.add('show');
			} else {
				// Hide go to top button
				scrollToTopBtn.classList.add('hidden');
				scrollToTopBtn.classList.remove('show');
			}
		});
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};
	scrollToTopBtn.addEventListener('click', scrollToTop);

	let observerGototop = new IntersectionObserver(goToTop);
	observerGototop.observe(footer);

	// Make contents collapsible
	collapsibleBtn.forEach((el, index) => {
		el.addEventListener('click', function (e) {
			collapsibleText[index].classList.toggle('show');

			if (e.target.classList.contains('fa-chevron-down')) {
				e.target.classList.remove('fa-chevron-down');
				e.target.classList.add('fa-chevron-up');
			} else {
				e.target.classList.remove('fa-chevron-up');
				e.target.classList.add('fa-chevron-down');
			}
		});
	});
});
