function initFleet() {
  
  /* NOTE: This script is set up so that it only works with a single one of these components in the site.
  Could make it iterative like Tabs component, but probably no real need to. */
  
  // Ignore this whole script if...
  if (document.querySelector(".filter-button-group")) {
  
    let filterButtonGroup = document.querySelector(".filter-button-group");
    let filterButtons = document.querySelectorAll(".filter-button-group .button");
    let filterableItems = document.querySelectorAll(".filter-items-wrapper .filter-item");
    let coverMask = document.querySelector(".cover-mask");
    let lastFilterValue = sessionStorage.getItem("fleet-filter-selected");
    
    
    filterButtonGroup.addEventListener("click", function(event) {
      
      // Only work with buttons
      if (event.target.tagName !== "BUTTON") {
        return;
      }
      
      let filterValue = event.target.getAttribute("data-filter");
      
      addSelectedClassToFilterButton(event.target); 
      
      hideAllFilterableItems();
      
      showSelectedFilterableItems(filterValue);
      
      sessionStorage.setItem("fleet-filter-selected",filterValue);
      
    });
    
    
    
    function addSelectedClassToFilterButton(target) {
      
      filterButtons.forEach(function(item) {
        
        item.classList.remove("selected");
        
      });
      
      target.classList.add("selected");
      
      return;
      
    };
    
    
    
    function hideAllFilterableItems() {
      
      coverMask.classList.add("opaque");
      
      filterableItems.forEach(function(item) {
        
        item.style.display = "none";
        
      });
      
      return;
      
    };
    
    
    
    function showSelectedFilterableItems(filterValue) {
      
      if (filterValue === "*") {
        
        filterableItems.forEach(function(item) {
          
          item.style.display = "block";
        
        });
        
      } else {
        
        let selectedItems = document.querySelectorAll(".filter-items-wrapper .filter-item[data-filter='" + filterValue + "']");
        
        selectedItems.forEach(function(selectedItem) {
          
          selectedItem.style.display = "block";
                
        });
      
      }
      
      setTimeout(() =>  coverMask.classList.remove("opaque"), 400);
      
      // Reset the trigger points for anything below the tabs container otherwise they may not fade in at correct position.
      ScrollTrigger.refresh();
      
      return;
      
    };
    
    
    // Below fires on initial load of page, either freshly loaded or Fetch API loaded.
    
    // Check what button was selected if had previous visit (if there was). Otherwise set the selected button to 'all'.
    if (lastFilterValue) {
      
      let lastSelectedButton = document.querySelector(".filter-button-group .button[data-filter='" + lastFilterValue + "']");
      
      /*Note that if there was an update to the site via the admin AND still using same session values then a stored value
      may not actually exist as a current button. If that's the case just ignore and set to default. */
      if (lastSelectedButton) {
        
        lastSelectedButton.click();
        
      } else {
        
        document.querySelector(".filter-button-group .button[data-filter='*']").classList.add("selected");
      }
      
    } else {
      
      document.querySelector(".filter-button-group .button[data-filter='*']").classList.add("selected");
      
    }
    
    
  }
  
  
      
};



export{initFleet};