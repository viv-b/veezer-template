/*
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
FILE: gsap-functions.js

DESCRIPTION: Initialise GSAP functions for various animation types. The specific animation
to use is set in the HTML using 'data-gsap-animation-name' attribute on the element to be
animated. Additional optional attributes can be used to set delay and duration.
Note that some animations use ScrollTrigger and some do not.

Note that originally used toArray method from GSAP utils, but changed to work with
individual sections passed in from init-gsap.js.
Info on toArray here: https://greensock.com/docs/v3/GSAP/UtilityMethods/toArray/
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/



function gsapFunctions(section, batch) {
  
  
  
  /* 'batch' is passed as 'true' when wanting to use batch functions (e.g. stagger) since they are used slightly differently
  to the basic animations. */
  if (batch) {
    
    // The 'classToBatchStagger' is a css style selector for the classes to be batched and then the animation applied to that batch.
    const elementsToStaggerInSection = section.querySelectorAll(section.dataset.gsapClassToBatchStagger);
    
    switch (section.dataset.gsapStaggerAnimationName) {
          
      case "scale-up-fade-in-fast":
        
        ScrollTrigger.batch(elementsToStaggerInSection, {
          // interval: 0.1, // time window (in seconds) for batching to occur. 
          // batchMax: 3,   // maximum batch size (targets)
          onEnter: batch => gsap.to(batch, {
            autoAlpha: 1,
            stagger: 0.2,
            scale: 1,
            duration: 0.5
          }),
          // also onLeave, onEnterBack, and onLeaveBack
          // also most normal ScrollTrigger values like start, end, etc.
        });
        
        break;
        
      case "scale-up-fade-in-slow":
        
        ScrollTrigger.batch(elementsToStaggerInSection, {
          onEnter: batch => gsap.to(batch, {
            autoAlpha: 1,
            stagger: 0.5,
            scale: 1,
            duration: 0.5
          }),
        });
        
        break;
    }
    
    
  } else {
    
  
    switch (section.dataset.gsapAnimationName) {
    
    case "slide-in-from-left":

      gsap.set(section, {
        x: -20
      })
      
      gsap.to(section, { 
        duration: getDuration(section),
        delay: getDelay(section),
        autoAlpha: 1,
        x: 0,
        scrollTrigger: {
          trigger: section,
          markers: true
        }
      });
        
      break;
    
    case "slide-in-from-right":

      gsap.set(section, {
        x: 20
      })
      
      gsap.to(section, { 
        duration: getDuration(section),
        delay: getDelay(section),
        autoAlpha: 1,
        x: 0,
        scrollTrigger: {
          trigger: section,
          markers: true
        }
      });
        
      break;
      
    case "slide-down-from-top":

      gsap.set(section, {
        y: -20
      })
      
      gsap.to(section, { 
        duration: getDuration(section),
        delay: getDelay(section),
        autoAlpha: 1,
        y: 0,
        scrollTrigger: {
          trigger: section,
          markers: true
        }
      });
        
      break;
  
    case "slide-up-from-bottom":

      gsap.set(section, {
        y: 20
      })
        
      gsap.to(section, {
        duration: getDuration(section),
        delay: getDelay(section),
        autoAlpha: 1,
        y: 0,
        scrollTrigger: {
          trigger: section,
          markers: true
        }
      });
        
      break;
  
    case "scale-up":

      gsap.set(section, {
        scale: 0.6
      })
        
      gsap.to(section, {
        duration: getDuration(section),
        delay: getDelay(section),
        autoAlpha: 1,
        scale: 1,
        scrollTrigger: {
          trigger: section,
          markers: true
        }
      });       
        
      break;
  
    case "simple-fade-in":
      
      gsap.to(section, {
        duration: getDuration(section),
        delay: getDelay(section),
        autoAlpha: 1,
        scrollTrigger: {
          trigger: section,
          markers: true
        }
      });
        
      break;

    case "timeline-team-member":
      
      let mainImage = section.querySelector('.main-image');
      let mainTitle = section.querySelector('.main-title');
      let mainText = section.querySelector('.main-text');
      let horizontalLine = section.querySelector('.horizontal-line');
      let mm = gsap.matchMedia();
        
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom", // default
          end: "bottom top", // default
          scrub: false
          // toggleActions: "play pause pause reverse",
          // markers: true
        }
      });

      gsap.set(mainImage, {
        scale: 0.3
      })

      gsap.set(mainTitle, {
        x: -100
      })

      gsap.set(mainText, {
        scale: 0.2,
        x: 100
      })

      // Line is vertical on smaller screens
      mm.add("(max-width: 1023px)", () => {
        gsap.set(horizontalLine, {
          scale: 0.1,
          rotation: 90
        })
      })

      // Line is horizontal on larger screens
      mm.add("(min-width: 1024px)", () => {
        gsap.set(horizontalLine, {
          scale: 0.1,
        })
      })

      tl.to(section, {
        autoAlpha: 1,
        duration: 0
      })
      tl.to(mainImage, {
        scale: 1,
        duration: 1.1
      })
      .to(mainTitle, {
        x: 0,
        autoAlpha: 1,
        ease: "none",
        duration: 0.5
      }, "-=0.3")
      .to(mainText, {
        x: 0,
        autoAlpha: 1,
        scale: 1,
        ease: "none",
        duration: 0.5
      })
      .to(horizontalLine, {
        autoAlpha: 1,
        delay: 0.1,
        scaleX: 1,
        scaleY: 1,
        ease: "none",
        duration: 1
      }, ">");
        
      break;
      
    }

	
  }
  
		
		
};



function gsapFunctionsNoScrollTrigger(section) {
  
  /* Handle the GSAP animations for carousel/slider slides when they become visible.
  These are all NON-scrolltrigger based since the trigger is the slide becoming visible.
  Only the first slide is shown on page load, so that one can use scrolltrigger as normal.
  The other slides need to have their animation triggered when they become visible. */
  switch (section.dataset.gsapAnimationName) {
    
    case "slide-in-from-left":

      gsap.set(section, {
        x: -20
      })
      
      gsap.to(section, { 
        duration: getDuration(section),
        delay: getDelay(section),
        autoAlpha: 1,
        x: 0
      });
        
      break;
    
    case "slide-in-from-right":

      gsap.set(section, {
        x: 20
      })
      
      gsap.to(section, { 
        duration: getDuration(section),
        delay: getDelay(section),
        autoAlpha: 1,
        x: 0
      });
        
      break;
      
    case "slide-down-from-top":

      gsap.set(section, {
        y: -20
      })
      
      gsap.to(section, { 
        duration: getDuration(section),
        delay: getDelay(section),
        autoAlpha: 1,
        y: 0
      });
        
      break;
  
    case "slide-up-from-bottom":

      gsap.set(section, {
        y: 20
      })
      
      gsap.to(section, {
        duration: getDuration(section),
        delay: getDelay(section),
        autoAlpha: 1,
        y: 0
      });
        
      break;
  
    case "scale-up":

      gsap.set(section, {
        scale: 0.6
      })
      
      gsap.to(section, {
        duration: getDuration(section),
        delay: getDelay(section),
        autoAlpha: 1,
        scale: 1
      });       
        
      break;
  
    case "simple-fade-in":
      
      gsap.to(section, {
        duration: getDuration(section),
        delay: getDelay(section),
        autoAlpha: 1
      }); 
        
      break;
      
    }



}



// Can set a delay on each element in the HTML by setting 'data-gsap-delay' attribute.
function getDelay(box) {
  
  const dataDelay = box.getAttribute("data-gsap-delay");
  
  if (dataDelay) {
    
  return dataDelay;
  
  } else {
    
    return 0.25; // Default delay if none set in HTML.
      
  }
}



// Can set a duration on each element in the HTML by setting 'data-gsap-duration' attribute.
function getDuration(box) {
  
  const dataDuration = box.getAttribute("data-gsap-duration");
    
  if (dataDuration) {
    
  return dataDuration;
  
  } else {
  
      return 0.25; // Default duration if none set in HTML.
      
  }
}



export {gsapFunctions};

export {gsapFunctionsNoScrollTrigger};