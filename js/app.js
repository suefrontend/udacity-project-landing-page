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
const section = Array.from(document.querySelectorAll('[data-nav]'));

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
const viewportTop = section.map(el => {
  const viewportOffset = el.getBoundingClientRect();
  return viewportOffset.top + window.scrollY;
})
// build the nav


// Add class 'active' to section when near top of viewport
document.addEventListener('scroll', function(e) {

  section.forEach((el) => {
    const viewportOffset = el.getBoundingClientRect();
    
    if(viewportOffset.top < window.innerHeight) {
      el.classList.add('your-active-class');
    }
    if(viewportOffset.bottom < 0) {
      el.classList.remove('your-active-class');
    }
  })

})


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
  link.setAttribute('href', `#${elem.id}`);
  link.innerHTML = elem.attributes[1].textContent;

  li.appendChild(link);

  ul.appendChild(li);
}


// Hide fixed navigation bar while NOT scrolling



// Scroll to section on link click

window.addEventListener('DOMContentLoaded', () => {

  section.forEach(el => {
    createList(el);
  })

  const menuLink = Array.from(document.querySelectorAll('.menu__link'));
  menuLink.forEach((el, index) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: viewportTop[index],
        behavior: 'smooth',
      })
    })
  });
})

// Set sections as active

let lastScroll = 0;
window.addEventListener('scroll', (e) => {  
 
  const currentScroll = window.pageYOffset;

  if(currentScroll === 0 ) {
    ul.classList.add('show');
  }

  if(currentScroll > lastScroll) {    
    ul.classList.remove('show');
    ul.classList.add('hidden');

    setTimeout(function() {
      ul.classList.remove('hidden');
    }, 3000);

  }

})

function detectScroll() {
  let isScrolling = false;

  if(window.pageYOffset <= 0) {
    isScrolling = false;
  }
}


// TODO:
// 1. Fix 'your-active-class'
// 2. Go to top button
// 3. Make contents collapsible
