/*
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
FILE: init-gsap-batch-stagger.js

DESCRIPTION: Iterate over all individual sections of class '.gsap-batch-stagger' and
once images in those sections that are in the viewport have loaded, intialise the
GSAP batch stagger animations for those sections.

Very good overview of IntersectionObserver: https://www.youtube.com/watch?v=2IbRtjez6ag
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/



import {gsapFunctions} from './gsap-functions.js';



function initGsapBatchStagger() {
  
  
  
  // Iterate over each component with staggered animations (e.g. gallery).
  document.querySelectorAll('.gsap-batch-stagger').forEach(section => {
  

    
    const allGalleryImages = section.querySelectorAll("img");
    let galleryImagesInViewportArray = [];
    
    /* Use IntersectionObserver to identify which images are initially in the viewport
    (or close to it). Only when those images have loaded do we add the GSAP scrollTrigger
    functions to that section. This avoids issues with native lazy loading of images
    meaning that if we wait for all images in the section to load, the GSAP functions
    may not be added until the user scrolls down the page. */
    const observer = new IntersectionObserver(
      
      // Where entries are an array of IntersectionObserverEntry corresponding to the items we tell the observer to observe.
      images => {
        
        images.forEach(image => {
          
          if (image.isIntersecting) {
            
            // Uncomment below to visually see which images are initially considered in the viewport on page load.
            // image.target.style.border = "solid 2px red";
            galleryImagesInViewportArray.push(image.target);
            
          }
          
           // Remove the observation as only need it the first time.
          observer.unobserve(image.target);
          
        });
        
        /* Once we have identified all of the images in the viewport, add the GSAP function to all of the images.
        We would assume that the other images would have loaded in the background by the time the user scrolls
        down through them, so there will be the expected image fade in (and not jumpy). */
        addGsapOnceViewportImagesLoaded(galleryImagesInViewportArray);
        
      },
      {
        /* Expand the effective viewport vertically, so get at least the next row of image(s) that are below the
        viewport. These images use native lazy loading, so images that are just below the viewport should be
        lazy loaded by the time the GSAP scrollTrigger function is added.
        If you try to wait until ALL the images in the section are loaded (and using native lazy-load in the markup),
        the addition of the scrollTrigger may not happen until you scroll down the page. So end up with the
        first few images still hidden (not good). */
        rootMargin: "0px 0px 800px 0px"
      }
      
    );
    
    
    
    allGalleryImages.forEach(img => {
      observer.observe(img);
    });
    
    
    
    function addGsapOnceViewportImagesLoaded(imgArray) {
      
      // Below is from here: https://stackoverflow.com/questions/11071314/javascript-execute-after-all-images-have-loaded
      Promise.all(Array.from(imgArray).map(img => {
        
        if (img.complete) {
          return Promise.resolve(img.naturalHeight !== 0);
        }
        
        return new Promise(resolve => {
          img.addEventListener('load', () => resolve(true));
          img.addEventListener('error', () => resolve(false));
        });
            
      })).then(results => {
          
        if (results.every(res => res)) {
          
          console.log('All images in IntersectionObserver viewport loaded successfully');
          animateSection();
          
        } else {
          
          console.log('Some images in IntersectionObserver viewport failed to load, all finished loading');
          
        }
        
      });
      
    };
    
    
    
    function animateSection() {
    
      /* Add a little bit of extra time so that there is no 'not-quite' displayed images.
      May not need it, but seems to help on some browsers. */
      setTimeout(function(){

        /* Send through the section containing the items to be animated.
        Set the value to 'true' to indicate that they will be 'batch' animations (e.g. stagger. See gsapFunctions.js) */
        gsapFunctions(section, true);
      
      }, 100);
      
    };
  
  
  
  });
  
  
  
};



export {initGsapBatchStagger};