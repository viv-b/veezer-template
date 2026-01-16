/*
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
FILE: init-modals.js

DESCRIPTION: Used to initialize the modal functionality.
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/



function initModals() {


    
    function openModal(target) {

      target.classList.add("is-active");
      
    };
   
   
    function closeModal() {

      document.querySelectorAll(".modal").forEach(modal => {
        
        modal.classList.remove("is-active");
        
      });
      
    };


    // Clone and move modals to the modal-holder div to avoid issues with fixed positioning inside GSAP Smooth Scroller.
    document.querySelectorAll('.modal-component').forEach(modalItem => {
        
        const clonedModal = modalItem.querySelector(".modal.to-be-cloned").cloneNode(true);

        clonedModal.classList.remove("to-be-cloned");

        clonedModal.id = clonedModal.dataset.modalId;

        document.getElementById("modal-holder").appendChild(clonedModal);
        
    });
    

    // Add event listeners to open the modal.
    document.querySelectorAll('.js-modal-trigger').forEach(trigger => {
        
        const target = document.getElementById(trigger.dataset.target);
    
        trigger.addEventListener('click', () => {
          
          openModal(target);
          
        });
        
    });
    
    
    // Add event listeners to close the modal whenever user clicks outside modal.
    document.querySelectorAll(".modal-background, .modal-close,.modal-card-head .delete, .modal-card-foot .button").forEach((elem) => {
      
      const modal = elem.closest(".modal");
      
      elem.addEventListener("click", () => {
        
        modal.classList.remove("is-active");
        
      });
      
    });
   
   
    // Adding keyboard event listeners to close the modal.
    document.addEventListener("keydown", (event) => {
              
      if (event.key === 'Escape') {
        closeModal();
      }
      
    });

    
};


export{initModals};