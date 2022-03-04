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
const collapsibleBtn = document.querySelectorAll('.collapsible-btn');
const collapsibleText = Array.from(
	document.querySelectorAll('.collapsible__content')
);
const chevron = Array.from(document.querySelectorAll('.fa'));
let activeSection;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

const viewportTop = Array.from(sections).map((section) => {
	const viewportOffset = section.getBoundingClientRect();
	return viewportOffset.top + window.scrollY;
});
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
		console.log('viewportTop[index]', viewportTop[index]);

		e.preventDefault();
		window.scrollTo({
			top: viewportTop[index],
			behavior: 'smooth',
		});
	});
});

// Hide fixed navigation bar while NOT scrolling
window.addEventListener('scroll', (e) => {});

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
		rect.left >= 0 &&
		rect.top >= 0 &&
		rect.right <= window.innerWidth &&
		rect.bottom <= window.innerHeight
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
});
