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
const sections = document.querySelectorAll('section');
const footer = document.querySelector('.page__footer');
const scrollToTopBtn = document.querySelector('.back-to-top-btn');

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

// Scroll to anchor ID using scrollTO event
// Scroll to section on link click
const menuLink = Array.from(document.querySelectorAll('.menu__link'));
menuLink.forEach((el, index) => {
	el.addEventListener('click', (e) => {
		e.preventDefault();

		let href = menuLink[index].getAttribute('href');
		let targetElement = document.getElementById(href.replace('#', ''));

		const rect = targetElement.getBoundingClientRect().top;
		const offset = window.pageYOffset;
		const gap = header.clientHeight;
		const target = rect + offset - gap;

		window.scrollTo({
			top: target,
			behavior: 'smooth',
		});
	});
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

// Function to check if element is in viewport
const isInViewport = (element) => {
	const rect = element.getBoundingClientRect();

	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <=
			(window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
};

window.addEventListener('scroll', (e) => {
	const navItem = document.querySelectorAll('.menu__link');

	// Add 'active' class to section which is currently in viewport
	// Hightlight navigation for the active section
	sections.forEach((section, index) => {
		if (isInViewport(section)) {
			section.classList.add('your-active-class');
			navItem[index].classList.add('active');
		} else {
			section.classList.remove('your-active-class');
			navItem[index].classList.remove('active');
		}
	});

	// Hide header when not scroling
	let timeoutId;

	window.addEventListener('scroll', function () {
		header.style.opacity = '1';

		clearTimeout(timeoutId);

		if (window.pageYOffset !== 0) {
			timeoutId = setTimeout(function () {
				header.style.opacity = '0';
			}, 1500);
		}
	});
});
