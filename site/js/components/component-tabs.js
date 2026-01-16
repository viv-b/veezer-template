function initTabs() {
  
  
  // Ignore this whole script if no tab components...
  if (document.querySelector(".tab-button-group")) {
  
    
     // Iterate over each individual TAB component that has been added.
    document.querySelectorAll('.tabs-component').forEach(tabComponent => {
        
        let uuid = tabComponent.getAttribute("data-uuid");
        let lastTabValue = sessionStorage.getItem("tab-selected-" + uuid);
        let tabButtonGroup = tabComponent.querySelector(".tab-button-group");
        let tabItems = tabComponent.querySelectorAll(".tab-items-wrapper .tab-item");
        let tabCoverMask = tabComponent.querySelector(".tab-cover-mask");
        let tabButtons = tabComponent.querySelectorAll(".tab-button-group .button");
        let firstTabButton = tabComponent.querySelector(".tab-button-group .button");
        
        
  
        tabButtonGroup.addEventListener("click", function(event) {
          
          // Only work with buttons
          if (event.target.tagName !== "BUTTON") {
            return;
          }
          
          let filterValue = event.target.getAttribute("data-filter");
          
          addSelectedClassToTabButton(event.target); 
          
          hideAllTabs();
          
          showSelectedTab(filterValue);
          
          sessionStorage.setItem("tab-selected-" + uuid,filterValue);
        
        });
        
        
        
        function addSelectedClassToTabButton(target) {
        
          tabButtons.forEach(function(item) {
            
            item.classList.remove("selected");
            
          });
          
          target.classList.add("selected");
          
          return;
          
        };
        
        
        
        function hideAllTabs() {

          tabCoverMask.classList.add("opaque");
          
          tabItems.forEach(function(item) {
            
            item.style.height = "0";
            item.style.overflow = "hidden";
            
          });
          
          return;
            
        };
          
          
          
        function showSelectedTab(filterValue) {
    
  
          let selectedItems = tabComponent.querySelectorAll(".tab-items-wrapper .tab-item[data-filter='" + filterValue + "']");
            
          selectedItems.forEach(function(item) {
              
              item.style.height = "auto";
              item.style.overflow = "visible";
                    
          });
          
          setTimeout(() =>  tabCoverMask.classList.remove("opaque"), 250);
          
          // Reset the trigger points for anything below the tabs container otherwise they may not fade in at correct position.
          ScrollTrigger.refresh();
          
          return;
          
        };
        
        
        
        // Below fires on initial load of page, either freshly loaded or Ajax loaded.
    
        // Check what button was selected if had previous visit (if there was).
        if (lastTabValue) {
          
          let lastSelectedTabButton = tabComponent.querySelector(".tab-button-group .button[data-filter='" + lastTabValue + "']");
          
          /* Note that if there was an update to the site via the admin AND still using same session values then a stored value
          may not actually exist as a current button. If that's the case just ignore. */
          if (lastSelectedTabButton) {
            
            lastSelectedTabButton.click();
              
          } else {
            
            // Display the first tab
            firstTabButton.click();
            
          }
          
        } else {
          
          // Display the first tab
          firstTabButton.click();
          
        }
    
    
        
    });
    
    
    
  }
    
    
  
};



export{initTabs};