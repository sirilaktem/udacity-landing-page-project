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
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');
const navLink = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * Check if the HTML element is visible in the viewport or not
 *
 * @param {HTMLElement} ele
 * @returns {boolean} If returns true, the HTML element is visible in the viewport
 */
const isInViewPort = (ele) => {
    const rect = ele.getBoundingClientRect();
    return rect.top < window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

/**
 * Toggle active class on hamburger menu and nav list
 */
const mobileMenu = () => {
    hamburger.classList.toggle('active');
    navList.classList.toggle('active');
};

/**
 * Remove active class from hamburger menu and nav list
 */
const closeMenu = () => {
    hamburger.classList.remove('active');
    navList.classList.remove('active');
};

/**
 * Build the top navigation from each section of the landing page
 */
const buildNav = () => {
    sections.forEach((ele) => {
        const navItemTarget = ele.getAttribute('id');
        const navItemText = ele.getAttribute('data-nav');
        const navItem = document.createElement('li');
        navItem.className = 'nav-item';
        navItem.innerHTML = `<a class="nav-link" aria-controls="${navItemTarget}" href="#">${navItemText}</a>`;
        navList.appendChild(navItem);
    });
};

/**
 * Scroll to the related section when clicking the menu
 *
 * @param {HTMLElement} ele
 */
const clickMenuHandler = (ele) => {
    const sectionId = document.getElementById(ele.getAttribute('aria-controls'));
    sectionId.scrollIntoView({ behavior: 'smooth' });
};

/**
 * Add active classes to section and menu when the section is visible in the viewport
 */
const scrollHandler = () => {
    sections.forEach((ele) => {
        const sectionId = ele.id;
        if (isInViewPort(ele)) {
            ele.classList.add('active');
            document.querySelector('[aria-controls="' + sectionId + '"').classList.add('active');
        } else {
            ele.classList.remove('active');
            document.querySelector('[aria-controls="' + sectionId + '"').classList.remove('active');
        }
    });
};

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
buildNav();

// Toggle active class on hamburger menu
hamburger.addEventListener('click', mobileMenu);

// Close mobile menu after clicking on menu links and scroll to the proper section
navList.addEventListener('click', (e) => {
    if (e.target && e.target.matches('.nav-link')) {
        e.preventDefault();
        closeMenu();
        clickMenuHandler(e.target);
    }
});

// Set section and menu as active based on scrolling
window.addEventListener('scroll', scrollHandler);
