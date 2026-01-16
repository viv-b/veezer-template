/*
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
FILE: init-events.js

DESCRIPTION: Used in the Events summary page to handle the toggling between
upcoming and previous events.
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/



function initEvents() {
  
  
  // Ignore this whole script if this page is not the main Events summary page.
  if (document.getElementById("events-summary-upcoming")) {


  
    let showUpcomingEventsToggle = document.getElementById("show-upcoming-events");
    let showPreviousEventsToggle = document.getElementById("show-previous-events");
  


    showUpcomingEventsToggle.addEventListener("click", event => {
      
      showPreviousEventsToggle.classList.remove("selected");
      showUpcomingEventsToggle.classList.add("selected");

      document.getElementById("events-summary-previous").classList.add("hide");
      document.getElementById("events-summary-upcoming").classList.remove("hide");
      
      /* You can pass true to ScrollTrigger.refresh(true) to have it do a "safe" refresh,
      meaning that if the page is in the middle of scrolling, it'll wait until it's done before doing the refresh.
      That way, it won't kill an in-progress momentum scroll.  */
      ScrollTrigger.refresh(true);
    
    });
    
    
    
    showPreviousEventsToggle.addEventListener("click", event => {
  
      showUpcomingEventsToggle.classList.remove("selected");
      showPreviousEventsToggle.classList.add("selected");

      document.getElementById("events-summary-upcoming").classList.add("hide");
      document.getElementById("events-summary-previous").classList.remove("hide");

      /* You can pass true to ScrollTrigger.refresh(true) to have it do a "safe" refresh,
      meaning that if the page is in the middle of scrolling, it'll wait until it's done before doing the refresh.
      That way, it won't kill an in-progress momentum scroll.  */
      ScrollTrigger.refresh(true);
     
    });

  
  }
   
};



export{initEvents};