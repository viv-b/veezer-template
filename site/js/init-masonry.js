/*
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
FILE: init-masonry.js

DESCRIPTION: Used in the Blog section (Blog summary page or a Tag page) to handle the
toggling between card and flat display layouts.
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/



function initMasonry() {
  
  
  // Ignore this whole script if this page is not the Blog summary page or a Tag page.
  if (document.getElementById("show-cards")) {

    
  
    let showCardsToggle = document.getElementById("show-cards");
    let hideCardsToggle = document.getElementById("hide-cards");
  
  
  
    showCardsToggle.addEventListener("click", event => {
      
      document.getElementById("blog-display-flat").classList.remove("initial");
      document.getElementById("blog-display-flat").classList.add("hide");
      document.getElementById("blog-display-grid").classList.add("show");
      hideCardsToggle.classList.remove("light");
      showCardsToggle.classList.add("light");

      /* You can pass true to ScrollTrigger.refresh(true) to have it do a "safe" refresh,
      meaning that if the page is in the middle of scrolling, it'll wait until it's done before doing the refresh.
      That way, it won't kill an in-progress momentum scroll.  */
      ScrollTrigger.refresh(true);
      
      localStorage.setItem("display-as-cards","show");
      
    });
    
    
    
    hideCardsToggle.addEventListener("click", event => {
      
      document.getElementById("blog-display-flat").classList.remove("hide","initial");
      document.getElementById("blog-display-grid").classList.remove("show");
      hideCardsToggle.classList.add("light");
      showCardsToggle.classList.remove("light");

      /* You can pass true to ScrollTrigger.refresh(true) to have it do a "safe" refresh,
      meaning that if the page is in the middle of scrolling, it'll wait until it's done before doing the refresh.
      That way, it won't kill an in-progress momentum scroll.  */
      ScrollTrigger.refresh(true);
      
      localStorage.setItem("display-as-cards","hide");
      
    });



    function applyMasonryLayout(container, items, numColumns, gap) {
  
      const columnHeights = Array(numColumns).fill(0);
      const columnWidth = (container.clientWidth - (numColumns - 1) * gap) / numColumns;
  
      items.forEach(item => {
          const minHeightColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
          const top = columnHeights[minHeightColumnIndex];
          const left = minHeightColumnIndex * (columnWidth + gap);
  
          item.style.position = 'absolute';
          item.style.width = `${columnWidth}px`;
          item.style.top = `${top}px`;
          item.style.left = `${left}px`;
  
          columnHeights[minHeightColumnIndex] += item.offsetHeight + gap;
      });
  
      container.style.height = `${Math.max(...columnHeights)}px`;
      
    }


  
    function getNumColumnsToDisplay() {
      
      const screenWidth = window.innerWidth;
      let numColumns;
    
      switch (true) { // Evaluates each case as a boolean condition.
        case (screenWidth < 600):
          numColumns = 1;
          break;
        case (screenWidth >= 600 && screenWidth < 1024):
          numColumns = 2;
          break;
        case (screenWidth >= 1024 && screenWidth < 1300):
          numColumns = 3;
          break;
        case (screenWidth >= 1300):
          numColumns = 4;
          break;
        default:
          numColumns = 2;
      }
    
      return numColumns;
      
    }



    /* On ititial page load, see what format the posts should be displayed in - Cards or simple list.
    Check if local storage available. */
    function storageAvailable(type) {
  	  
  	  try {
  		  let storage = window[type],
  			  x = "__storage_test__";
  		  storage.setItem(x, x);
  		  storage.removeItem(x);
  		  return true;
  	  }
  	  catch(e) {
  		  return false;
  	  }
  	  
    }
  


    const masonryContainer = document.querySelector('.masonry-container');
    const masonryItems = Array.from(document.querySelectorAll('.masonry-item'));
    /* Set number of pixels for padding between columns to match Bulma columns. The Bulma standard
    column gap is 0.75rem (--bulma-column-gap: 0.75rem). 0.75rem = 12 pixels.
    Need to double this to get total gap = 24 pixels. */
    const columnPadding = 24;
  
    applyMasonryLayout(masonryContainer, masonryItems, getNumColumnsToDisplay(), columnPadding);
    
    
    
    if (storageAvailable("localStorage")) {
  	  // Can use localStorage :)
      let displayType = localStorage.getItem("display-as-cards");
      
      /* Both versions (flat and grid) have 'opacity: 0' on initial load so check if SessionStorage present and says 'show'.
      If so, display grid otherwise default to displaying the flat version. */
      if (displayType === "show") {
        document.getElementById("show-cards").click();
      } else {
        document.getElementById("hide-cards").click();
      }
      
    } else {
  	  /* No localStorage available. No sweat, no need to do anything. System just wont remember the setting
      so will default to 'flat' display of posts. */
    }



    // Add a resize listener for responsiveness.
    window.addEventListener('resize', () => {
        applyMasonryLayout(masonryContainer, masonryItems,  getNumColumnsToDisplay(), columnPadding);
    });

    
  
  }
   
};



export{initMasonry};