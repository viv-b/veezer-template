function initFaq() {

    /* Uses CSS Grid to be able to simulate transition from height: 0 to height: auto (which isn't possible)
    Example: https://codepen.io/kevinpowell/pen/NWOgVga
    Discussion: https://keithjgrant.com/posts/2023/04/transitioning-to-height-auto/ */
    
    
    // Iterate over each individual accordion component that has been added.
    document.querySelectorAll('.faq-wrapper').forEach(faq => {
    
        faq.addEventListener("click", (e) => {
          
          const activePanel = e.target.closest(".faq-panel");
          if (!activePanel) return;
          toggleFaq(activePanel);

        });
    
    });


    function toggleAnimation(panelToActivate,reversed) {
      
      if (reversed === false) {
        
        // Opening the panel
        gsap.fromTo(panelToActivate.querySelector(".faq-content"), {
          height: 0
        }, {
          duration: 0.5,
          height: "auto",
          ease: "power1.inOut",
          reversed: false,
          onComplete: () => {
            ScrollTrigger.refresh(true); // With the safe parameter true to allow for any rendering delays.
          }
        });

      } else {
        // Closing the panel
        const currentHeight = gsap.getProperty(panelToActivate.querySelector(".faq-content"), 'height');
        
        gsap.fromTo(panelToActivate.querySelector(".faq-content"), {
          height: currentHeight
        }, {
          duration: 0.5,
          height: 0,
          ease: "power1.inOut",
          reversed: false,
          onComplete: () => {
            ScrollTrigger.refresh(true); // With the safe parameter true to allow for any rendering delays.
          }
        });

      }

    };
    

    function toggleFaq(panelToActivate) {
      
        const activeButton = panelToActivate.querySelector(".faq-trigger");
        const activePanelIsOpened = activeButton.getAttribute("aria-expanded");
    
        if (activePanelIsOpened === "true") {
          
          panelToActivate
            .querySelector(".faq-trigger")
            .setAttribute("aria-expanded", false);
    
          panelToActivate
            .querySelector(".faq-content")
            .setAttribute("aria-hidden", true);

          toggleAnimation(panelToActivate, true);
            
        } else {
          
          panelToActivate.querySelector(".faq-trigger").setAttribute("aria-expanded", true);
    
          panelToActivate
            .querySelector(".faq-content")
            .setAttribute("aria-hidden", false);

          toggleAnimation(panelToActivate, false);
        }
        
    };
    
};


export{initFaq};