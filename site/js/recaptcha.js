/*
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
FILE: recaptcha.js

DESCRIPTION: Used to initialize and handle Google reCAPTCHA v3 on contact forms.
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/


function initRecaptcha() {
	  


  /* Check if recaptchaKey variable is defined. It will only be defined if the 'recaptcha_key'
  field has been set in the _data/site.json file and so will be added to the HTML of the default
  page template. */
  if (recaptchaKey === undefined) {
    return;
  }



  /* This code has been modified so that it locates all forms with a class of '.site-contact-form'.
  It was set up to work with ID's but doing it this way means that there can be multiple forms on the one page. */
  let submitted = false;
  let tokenCreated = false;
  let formElArr = document.querySelectorAll('.site-contact-form');
  
  
  
  // If there are no forms on the page then avoid displaying the Recaptcha Badge.
  if (formElArr.length === 0) {
    
    /* On first page load The recaptcha badge will sometimes be added after THIS code runs, so cannot add any CSS to it.
    So instead wait until the badge definitely appears before hiding it using a mutation observer function.
    See more info here: https://bobbyhadz.com/blog/javascript-wait-for-element-to-exist */
    waitForElementToExist('.grecaptcha-badge').then(element => {

      document.querySelector('.grecaptcha-badge').style.display = "none";
      
    });

    
  } else {
    
    if (document.querySelector('.grecaptcha-badge')) {
      document.querySelector('.grecaptcha-badge').style.display = "block";
    }

    formElArr.forEach((formEl) => {
  
      formEl.addEventListener("submit", function (event) {
        
        if (checkEmailFieldsMatch() === true) {
        
            // Check if the recaptcha exists
            if (!tokenCreated) {
        
              // Prevent submission
              event.preventDefault();
        
              // Prevent more than one submission
              if (!submitted) {
                submitted = true;
                // Check recaptcha ready
                grecaptcha.ready(function() {
                  /* Request recaptcha token. Response is promise with passed token.
                  NOTE: the variable 'recaptchaKey' is set in the 'default' layout template. */
                  grecaptcha.execute(recaptchaKey, {action: 'create_comment'}).then(function (token) {
                    // Add token to form
                    var input = document.createElement("input");
                    input.type = "hidden";
                    input.name = "g-recaptcha-response";
                    input.value = token;
                    formEl.appendChild(input);
        
                    // Resubmit the form
                    tokenCreated = true;
                    formEl.submit();
                  });
                });
              }
            }
            
        } else {
          
          event.preventDefault();
          
        }
        
      });
      
    });
  
  }
  
  
  
  function waitForElementToExist(selector) {
    
    return new Promise(resolve => {
      
      if (document.querySelector(selector)) {
        
        return resolve(document.querySelector(selector));
      }
      
  
      const observer = new MutationObserver(() => {
        
        if (document.querySelector(selector)) {
          resolve(document.querySelector(selector));
          observer.disconnect();
        }
        
      });
  
      observer.observe(document.body, {
        subtree: true,
        childList: true,
      });
      
    });
    
  }
  
  
  
  function checkEmailFieldsMatch() {
    
    /* This function assumes there will be just one or two email fields and that if there ise
    more than one, then they are an 'email' and 'repeat email' field so need to match
    befoer the form can be submitted. */
    
    // Start off assuming the email fields match
    let fieldsMatch = true;
    let previousEmailElValue;
    
    document.querySelectorAll('input[type="email"]').forEach((emailEl,index) => {
      
      if (index > 0) {
        
        if (emailEl.value !== previousEmailElValue) {
          fieldsMatch = false;
        }
        
      }
      
      previousEmailElValue = emailEl.value;
    
    });
    
    if ((fieldsMatch) === false) {
      
      alert("Sorry, the EMAIL fields don't match.\nPlease correct this before submitting the form.");
      
    }

    return fieldsMatch;
    
  }



};



export{initRecaptcha};