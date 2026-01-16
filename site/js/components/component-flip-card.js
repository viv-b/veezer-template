// Uses 'initGsapBatchStagger' to animate in the cards in order.


function initFlipCard() {

    // Iterate over each individual flip-card component that has been added.
    document.querySelectorAll('.flip-cards').forEach(item => {
    
      item.querySelectorAll('.flip-card').forEach(card => {
          
        card.addEventListener('click', event => {
            
            // Reset all z-indexes for all cards.
            item.querySelectorAll('.flip-card').forEach(element => {
              element.style.zIndex = "0";
            });
            
            // Set the higher z-index for this card so that when it spins, it spins on TOP.
            card.style.zIndex = "1000";
            
            let cardBody = card.querySelector('.flip-card-body');
                     
            if (cardBody.classList.contains('flip-card-rotate')) {
                     
              cardBody.classList.remove('flip-card-rotate');
                     
            } else {
                      
              cardBody.classList.add('flip-card-rotate');
                       
           }
            
        });
              
      });
      
    });

};


export{initFlipCard};