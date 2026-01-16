import {gsapFunctionsNoScrollTrigger} from './../gsap/gsap-functions.js';


function initSlider() {

  
    
  function showSliderSlides(n,slider) {
    
    // 'slider' is the specific slider component to work within
    let leftOffset = (n * 100);
    
    let sliderInner = slider.querySelector(".slider-inner")
    
    sliderInner.style.left = "-" + leftOffset + "%";
    


    slider.querySelectorAll('.slider-slide').forEach((slider,index) => {
      
      if (index == n) {
        slider.classList.add("slider-fade-in");

        // Only trigger GSAP animations the FIRST time this slide is shown
        if (!slider.classList.contains("has-been-animated-in")) {

          // Trigger any GSAP animations for this slide now it is visible.
          slider.querySelectorAll('.gsap-element-wrapper-no-scrolltrigger').forEach((slider,index) => {
            gsapFunctionsNoScrollTrigger(slider);
          })

          slider.classList.add("has-been-animated-in");
        }
        
      } else {
        slider.classList.remove("slider-fade-in");
      }
      
    })
    


    // Update the dot indicator showing selected slide
    slider.querySelectorAll('.slider-nav-dot').forEach((dot,index) => {
      
      if (index == n) {
        dot.classList.add("slider-active");
      } else {
        dot.classList.remove("slider-active");
      }
      
    })
    
  }
  
  
  
  // Iterate over each individual slider component that has been added.
  document.querySelectorAll('.slider-outer').forEach(slider => {
    
    // --- HANDLE SWIPE RIGHT AND LEFT TO CHANGE IMAGES ---
    // From: https://codepen.io/vanecendales/pen/ZEYOgWw
    
    let startX;
    let startY;
    let endX;
    let endY;
    let xDist;
    let yDist;
    let threshold = 100; // This sets the minimum swipe distance, to avoid noise and to filter actual swipes from just moving fingers.



    function handleTouch(start,end) {
      
      // Calculate the distance on x-axis and o y-axis. Check whether had the great moving ratio.
      xDist = endX - startX;
      yDist = endY - startY;
      
      console.log(xDist);
      console.log(yDist);

      // Check for swipe left...
      // To turn the threshold value into a negative: Math.abs(number goes here)*-1. That’ll get the absolute (positive) value and then reverse.
      if (xDist < (threshold * -1)) {
        // Simulate 'previous' button click
        slider.querySelector('.slider-next').click();
      }
      
      // Check for swipe right...
      if (xDist > threshold) {
        // Simulate 'next' button click
        slider.querySelector('.slider-prev').click();
      }
      
    }
    


    slider.addEventListener('touchstart', function(event){
        
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
        
    })
      


    slider.addEventListener('touchend', function(event){
          
      endX = event.changedTouches[0].clientX;
      endY = event.changedTouches[0].clientY;
          
      handleTouch(startX, endX);
      
    })

   
    
    
    let totalSliderSlides = slider.dataset.totalSlides;
    let autoInterval = slider.dataset.autoInterval;
    let interval;
    
    /* Unless the data value for auto-interval is > 0 then set as a delay.
    Note that whenever a previous,next or navigation button are clicked (human interation),
    then turn off the auto-change of slide. */
    if (autoInterval > 0) {

      /* Use intersection observer to only start the auto-advance of the slides in this slider
      when the slider is actually visible in the viewport. */
      function handleIntersection(entries, observer) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {

            // Now set the interval since the slider is visible in the viewport
            interval = setInterval(function(){
              changeSlide(slider,"next");
            }, autoInterval);

          }
        });
      }

      // Set up the observer
      const observer = new IntersectionObserver(handleIntersection, {
        root: null, // Defaults to the browser viewport
        rootMargin: '0px', // An offset around the boundaries of the root element (the viewport by default)
        threshold: 0.2 // Fires the callback when 20% of the target is visible
      });

      // Start observing the slider element
      observer.observe(slider);

    }
    


    // Show the FIRST slide
    showSliderSlides(0, slider);
    
    

    // Jump to selected slide from dot indicator click
    slider.querySelectorAll('.slider-nav-dot').forEach(clicker => {
    
      clicker.addEventListener('click', event => {
          
          showSliderSlides(event.target.dataset.dotIndex, slider);
          
          if (typeof interval != "undefined") {
            clearInterval(interval);
          }
          
      })
        
    });
    

    
    // Jump to PREVIOUS slide
    slider.querySelector('.slider-prev').addEventListener('click', event => {
          
      changeSlide(slider,"previous");
      
      if (typeof interval != "undefined") {
          clearInterval(interval);
      }
      
    });
    
    

    // Jump to NEXT slide
    slider.querySelector('.slider-next').addEventListener('click', event => {
          
      changeSlide(slider,"next");
      
      if (typeof interval != "undefined") {
          clearInterval(interval);
      }
      
    });
    

    
    function changeSlide(slider,direction) {
      
      let currentSliderSlideIndex;
      let newSliderSlideIndex;
  
      slider.querySelectorAll('.slider-nav-dot').forEach((dot,index) => {
    
        if (dot.classList.contains("slider-active")) {
          currentSliderSlideIndex = index;
        }
        
      })
      
      if (direction == "next") {
        
        if (currentSliderSlideIndex < (totalSliderSlides - 1)) {
          newSliderSlideIndex = currentSliderSlideIndex + 1;
        } else {
          newSliderSlideIndex = 0;
        }
      }
      
      if (direction == "previous") {
        if (currentSliderSlideIndex > 0) {
          newSliderSlideIndex = currentSliderSlideIndex - 1;
        } else {
          newSliderSlideIndex = totalSliderSlides - 1;
        }
      }
  
      showSliderSlides(newSliderSlideIndex, slider);
          
    }
      
      
      
  });
    
    
};


export{initSlider};