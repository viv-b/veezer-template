/*
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
FILE: init-gsap.js

DESCRIPTION: Iterate over all individual sections of class '.use-gsap' and once images
in those sections have loaded, intialise the GSAP functions for elements within that
particular section.
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/



import {
  gsapFunctions
} from './gsap-functions.js';



function initGsap() {



  /* Only enable scroll smoother (and parallax) when NOT in CloudCannon editor as otherwise layout gets screwed up
  when trying to edit content. */
  if (!window.inEditorMode) {

    if (ScrollSmoother.get()) {
      ScrollSmoother.get().kill();
    }

    ScrollTrigger.matchMedia({

      "(min-width: 1024px)": function() {

        console.log("Wide screen detected so probably not mobile - activate parallax!");
        
        ScrollSmoother.create({
          wrapper: '#gsap-smooth-wrapper', // ID of wrapper element
          content: '#gsap-smooth-content', // ID of content element
          smooth: 1, // Adjust smooth scroll speed as needed
          speed: 0.5,
          effects: true // Enable data-speed/data-lag needed for parallax effects
        });
      },

      "(max-width: 1023px)": function() {

        if (ScrollTrigger.isTouch) {

          console.log("Touch screen detected, small width - deactivate parallax!");

          /* Avoid adding ScrollSmoother on touch devices with small screens to improve performance and usability.
          Create a global ScrollTrigger instance to ensure ScrollTrigger is still active for other animations. */
          ScrollTrigger.create({});
        
        } else {

          console.log("Non-touch screen detected, small width - activate parallax!");

          ScrollSmoother.create({
            wrapper: '#gsap-smooth-wrapper', // ID of wrapper element
            content: '#gsap-smooth-content', // ID of content element
            smooth: 1, // Adjust smooth scroll speed as needed
            speed: 0.5,
            effects: true // Enable data-speed/data-lag needed for parallax effects
          });

        }

      }
    });

    /* Note: You do not have to use ScrollTrigger.create() when using ScrollSmoother in GSAP. ScrollSmoother
    uses ScrollTrigger internally and is designed to integrate seamlessly, so any animations or effects you
    create using the standard ScrollTrigger in GSAP will automatically work with ScrollSmoother.
    You just need to ensure that the ScrollSmoother instance is created before your individual ScrollTrigger
    instances are set up. This way, ScrollSmoother can properly manage the scroll position and ensure that
    all ScrollTrigger animations are synchronized with the smooth scrolling effect. */

  }

  /* The Screen Orientation API provides a reliable and standardized way to detect orientation changes
  across many devices and browsers. Newer approach than relying on window resize events alone, which can be
  triggered by other actions like window resizing on desktops. */
  screen.orientation.addEventListener("change", () => {

    /* A scrollTrigger refresh here doesn't seem to be enough to fix issues with orientation change for example when
    going from portrait to landscape on mobile. If part-way down a page and change orientation, some of the GSAP animations
    just after the last item animated in do not trigger as expected. So, do a full page reload.

    A JavaScript window.location.reload() will reset all ScrollTrigger instances because reloading the page causes
    the entire JavaScript environment and the DOM to re-initialize. When a page is reloaded, all existing ScrollTriggers
    are essentially destroyed and recreated from scratch when the script runs again. The browser's default behavior,
    however, may attempt to restore the user's previous scroll position after the reload, which can sometimes lead to
    unexpected initial states for ScrollTrigger animations. */
    let smoother = ScrollSmoother.get();
    smoother.scrollTo(0, false); // Use 'false' to jump straight to position as 'true' will animate the scroll.

    setTimeout(() => {
      window.location.reload();
    }, 250);
  
  });

  /* GSAP ScrollTrigger automatically recalculates positions and refreshes on window resize to adjust for layout changes,
  but sometimes this needs a manual ScrollTrigger.refresh() */
  window.addEventListener("resize", () => {

    ScrollTrigger.refresh(true); // With the safe parameter true to allow for any rendering delays.

  });

  /* If don't have this refresh below, there is a strange issue of when leaving a long page part way down (eg. blog page)
  and then going to say the home page, some of the GSAP sections do not fade in as expected. Doing a refresh here
  helps with the partial page load to keeps things working.
  
  The ScrollTrigger.refresh() method forces all ScrollTriggers, including the one powering ScrollSmoother, to
  recalculate their start and end positions based on the new DOM layout and page height. */

  ScrollTrigger.refresh(true); // With the safe parameter true to allow for any rendering delays.

  /* Seem to need to set the ScrollTrigger.refresh parameter 'true' to make sure when revisiting a page with
  ScrollSmoother parallax that the parallax positions are correct. Without this they can be out.
  If true, it will wait for at least one requestAnimationFrame tick, and up to roughly 200ms before
  initiating the refresh. This is useful because sometimes the browser doesn't actually render the DOM-related
  changes immediately, causing measurements to be inaccurate. For example, if you add a "click"
  event listener to an element that expands other content on the page and you call ScrollTrigger.refresh() in
  that callback, the changes may not have been fully rendered by that point, so it's the perfect place to enable safe.
  Detail here: https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.refresh()/ */

  gsap.defaults({
    ease: "power2.in",
    duration: 1
  });
  

  /* Before printing the page, we need to reset the scroll position to the top of the page. If don't do this
  then the printed content can start part way down the page depending on where the user has scrolled to. */
  window.addEventListener("beforeprint", (event) => {

    if (ScrollSmoother.get()) {

      let smoother = ScrollSmoother.get();
      smoother.scrollTo(0, false); // Use 'false' to jump straight to position as 'true' will animate the scroll.

      setTimeout(() => {
        return ScrollTrigger.refresh(true); // With the safe parameter true to allow for any rendering delays.
      }, 250);

    }
    
  });




  // Select all the parent container elements that are of the class '.use-gsap'. These wil be mostly component 'section' elements.
  document.querySelectorAll('.use-gsap .gsap-element-wrapper').forEach(section => {

    
    let loadedImageCount = 0;
    const totalImages = section.querySelectorAll('img').length;

    if (totalImages === 0) {

      // No images in this div so just call GSAP functions straight away.
      gsapFunctions(section);

    } else {

      section.querySelectorAll('img').forEach(image => {

        /* The load event for an image fires when the image and its dependent resources have fully loaded.
        If you attach the load event listener after the image has already finished loading
        (which can happen very quickly for cached images or local files), the event will not be triggered. */
        if (!image.complete) {
        
          image.addEventListener('load', () => {

              loadedImageCount++;
              if (loadedImageCount === totalImages) {
                  
                  gsapFunctions(section);

              }
          });

          image.addEventListener('error', () => {

              loadedImageCount++;
              console.warn(`Image failed to load: ${image.src}`);
              if (loadedImageCount === totalImages) {
                  console.log("All images in the div have attempted to load (some may have failed).");
                  
                  gsapFunctions(section);
                  
              }
          });
          
        } else {

          gsapFunctions(section);

        }

      });

    }

  });



};



export {
  initGsap
};