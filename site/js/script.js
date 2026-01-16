/*
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
FILE: script.js

DESCRIPTION: Handles all the JS for the site that is outside of the <main> div that is replaced when
using Fetch API to load new content. This includes the navbar, page loader, and handling fonts loading.
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/



/* Avoid the jump that happens with the navigation is loaded before the fonts are loaded.
If browser not supporting this, just default to showing the navbar without any pause (or at least no
extra pause until this javascript runs). */
;
(function() {
  if ("fonts" in document) {
    document.fonts.ready.then(() => {
      document.documentElement.className += " fonts-loaded";
    });
  } else {
    document.documentElement.className += " fonts-loaded";
  }
})();


// Handle making the navbar sticky when scrolling down the page.
window.addEventListener("scroll", (event) => {
  
  // The setTimeout() method is used to throttle the event handler because scroll events can fire at a high rate. 
  setTimeout(() => {
    
    let y = window.scrollY;
    const navbarWrapper = document.getElementById("main-navigation-wrapper");
    const navbarBurger = navbarWrapper.querySelector(".navbar-burger");
    const pageLoader = document.querySelector("#page-loader");
    
    if (y > 100) {
      navbarWrapper.classList.add("sticky-top");
      pageLoader.classList.add("sticky-top");
    } else {
      navbarWrapper.classList.remove("sticky-top");
      pageLoader.classList.remove("sticky-top");
    }
    
    if (y > 50) {
      navbarBurger.classList.add("sticky-top");
    } else {
      navbarBurger.classList.remove("sticky-top");
    }
  
  }, 200);
  
});



/* The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed,
without waiting for stylesheets, images, and subframes to finish loading. */
document.addEventListener('DOMContentLoaded', () => {
  

   function handleToggleDropdowns() {

    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {

      toggle.addEventListener('click', () => {

        const dropdown = toggle.nextElementSibling;
        dropdown.classList.toggle('show-dropdown');

      });

    });

  }
  
  
  function handleToggleNavbars() {

    document.querySelectorAll('.navbar-burger').forEach(navbarBurger => {

      navbarBurger.addEventListener('click', () => {

        const dataTarget = navbarBurger.dataset.target;
        const target = document.getElementById(dataTarget);

        navbarBurger.classList.toggle('is-active');
        target.classList.toggle('is-active');
          
        // toggle the semi-opaque mask over the page body.
        const mask = document.getElementById('opaque-mask');
        mask.classList.toggle('show');
          
        /* Set it up so that if user clicks on the masked area that will close the menu.
        User can either click the navbar burger OR the masked area to close the menu. */
        mask.addEventListener('click', () => {
          mask.classList.remove('show');
          navbarBurger.classList.remove('is-active');
          target.classList.remove('is-active');
        });

      });

    });

  }


  /* 'Window.' added so other modules can close the mobile navigation menu if required.
  (e.g. Fetch module after loading new content). */
  window.closeMobileNavigation = function() {

    document.querySelectorAll('.navbar-burger').forEach(navbarBurger => {

      navbarBurger.classList.remove('is-active');
      document.getElementById(navbarBurger.dataset.target).classList.remove('is-active');

    });

    document.getElementById('opaque-mask').classList.remove('show');
    
  };



  handleToggleNavbars();

  handleToggleDropdowns();



  // Close the menu if it happens to be open if window is resized, otherwise it doesn't fully close when required next time.
  window.addEventListener("resize", (event) => {
    closeMobileNavigation();
  });



  /* Create a refresh on screen orientation change. Place it here so it only gets added once. If put into GSAP module
  it will be added (and will fire) multiple times, increasing with each orientation change. */
  screen.orientation.addEventListener("change", function(e) {
    ScrollTrigger.refresh();
  });



  // Remove the main page load indicator (sits on top of navbar) after all images loaded.
  window.addEventListener('load', () => {
    document.getElementById("page-loader").classList.add("hide-loader");
  });



});