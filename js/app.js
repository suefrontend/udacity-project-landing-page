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
const ul = document.getElementById('navbar__list');
const headings = document.querySelectorAll('h2');
const headingsList = Array.from(headings);

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
window.addEventListener('DOMContentLoaded', (event) => {
  headingsList.forEach(el => {
    createList(el);
  })
});


// build the nav


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
function createList(elem) {
  const li = document.createElement('li');

  const link = document.createElement('a');
  link.href = elem.id;
  link.classList.add('menu__link');
  link.setAttribute('href', '#');
  link.innerHTML = elem.textContent;

  li.appendChild(link);

  ul.appendChild(li);
}

// Scroll to section on link click

// Set sections as active

