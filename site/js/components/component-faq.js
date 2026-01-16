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

          /* Refresh ScrollTrigger to ensure any height changes are accounted for in scroll positions,
          particularly for sections below the FAQ section. */
          // setTimeout(() => {
          //   ScrollTrigger.refresh(true); // With the safe parameter true to allow for any rendering delays.
          //   alert("yep");
          // }, 1500);

          activePanel.querySelector(".faq-content").addEventListener("transitionend", () => {
            alert("ended");
            ScrollTrigger.refresh(true); // With the safe parameter true to allow for any rendering delays.
          });
          
        });
    
    });
    
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
            
        } else {
          
          panelToActivate.querySelector(".faq-trigger").setAttribute("aria-expanded", true);
    
          panelToActivate
            .querySelector(".faq-content")
            .setAttribute("aria-hidden", false);
        }
        
    };
    
};


export{initFaq};