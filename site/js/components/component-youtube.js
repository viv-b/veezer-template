function initYouTube() {


  /* To keep the video API from being loaded until the video is in the viewport, use IntersectionObserver.
  
  References:
  https://medium.com/@fbrkovic/lazy-loading-youtube-videos-with-vanilla-javascript-a43307136602
  https://uploadcare.com/blog/intersection-observer-guide/
  https://medium.com/coding-beauty/javascript-intersection-observer-cded4e80a377
  
  Note that I have just made it so that once the first video comes into the viewport ALL of the video players are created.
  Could eventually modify it so that creates each one only as they come into the viewport. */
  
    
  if (document.querySelector(".youtube-component")) {
      
    
    /* This code iterates over ALL of the '.youtube-component' items on the page (in case of multiple videos).
    The sequence of the loading:
    
    1. First the background (cover) image is loaded and then faded-in with GSAP.
    2. Then the image is loaded the YouTube player is created.
    3. Once the player is created the video 'play' button is faded in.
    
    When the play button or anywhere around it is clicked, the cover image is faded out and the video starts playing.
    If another video is started any that are already playing are paused and the cover image fades back in.
    When a video is finished the cover image fades back in.
    
    References:
    Multiple YouTube videos on one page: https://gist.github.com/bajpangosh/d322c4d7823d8707e19d20bc71cd5a4f
    Google Reference: https://developers.google.com/youtube/iframe_api_reference
    Lazy Loading YouTube Videos with Vanilla JavaScript: https://medium.com/@fbrkovic/lazy-loading-youtube-videos-with-vanilla-javascript-a43307136602
    
    NOTE: The divs that are to be replaced with the iframes need to all have a unique ID.
    Tried to get code to work without them but it wouldn't work. */
    
    let playersCreated = false;
    
    let observer = new IntersectionObserver(observerCallback);



    function observerCallback(entries, observer) {
      
      entries.forEach(entry => {
        
        if(entry.isIntersecting) {
          
          // Only need to create players once (all of them at once)
          if (playersCreated == false) {
            
              loadYouTubeIframeAPI();
              
              createAndManageVideoPlayers();
              
              playersCreated = true;
          }
            
        }
        
      });
      
    };
    
    

    // Load the YouTube API here ONCE ONLY otherwise gets repeatedly added each time one is on a page with video(s).
    function loadYouTubeIframeAPI() {
      
      if (!(document.getElementById("yt-iframe-script"))) {
        
          let tag = document.createElement("script");
          tag.src = "https://www.youtube.com/iframe_api";
          let firstScriptTag = document.getElementsByTagName("script")[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
          
          tag.id = "yt-iframe-script";
          
      }
          
    };
    
    
    
    document.querySelectorAll(".youtube-component .responsive-video-wrapper").forEach((i) => {
        
      if (i) {
          observer.observe(i);
      }
        
    });
    
    
    
    function createAndManageVideoPlayers() {
      
      
      let YTPlayerObjects = [];
        
      console.log("youTubeAPIReadyFlag: " + window.youTubeAPIReadyFlag);
     
      /* The 'onYouTubeIframeAPIReadyfunction' needs to be used in the Global scope. So instead of using 'function onYouTubeIframeAPIReady() {'
      outside of other code, can use 'window.onYouTubeIframeAPIReady = function() {'.
      
      However, using this 'ready' function, it will only be fired the first time the page loads - it wont fire if coming back to the same or
      another page with videos when using a fetch partial page refresh.
      
      Things do work by just not wrapping the code in this 'ready' function BUT very occasionally it seems that the code attempts to
      create a player before the API code is fully ready - causing a JS error.
      
      To prevent the possibility of this error, I use the 'ready' code as a wrapper but ONLY on the first page load. I've set a 
      local (window) variable that gets set to 'true' after that first load. Then on subsequent loads of pages where videos are present,
      this 'ready' wrapper doesn't get used. */
      
      let coverImages = document.querySelectorAll(".youtube-component img.cover");
       
      if (typeof window.youTubeAPIReadyFlag === "undefined") {
          
          // Wait for You Tube API to be ready.
          window.onYouTubeIframeAPIReady = function() {
            
              console.log("YouTubeAPI ready for use first time...");
              
              coverImages.forEach(function(image) {
              
                  window.youTubeAPIReadyFlag = true;
              
                  createPlayer(image);
                  
              });
              
          };
          
      } else {
        
        console.log("YouTubeAPI already loaded and ready!");
        
        coverImages.forEach(function(image) {
              
            createPlayer(image);
                  
        });
        
      }
          

      
      // Only create the player once the background(cover) images have loaded and faded in...
      function createPlayer(image) {
        
          console.log("New player being created...");
          
          /* Delay creating the player for a bit to allow for the background(cover) image fade-in effect
          otherwise get a crossover of the video cover showing through as the background image fades in. */
    	    setTimeout(() => {

              let videoId = image.closest(".video-overlay").dataset.videoId;
              console.log("Video ID: " + videoId);
              
              let item = document.querySelector('.responsive-video-wrapper .player[data-video-id="' + videoId + '"]');
              
              let player = new YT.Player(item, {
                  height: '390',
                  width: '640',
                  videoId: videoId,
                  playerVars: {
                    'playsinline': 1
                    //'controls': 0
                  },
                  events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                  }
              });

          }, 1000);
    	    
      };
    

      
      // The API will call this function when the video player is ready.
      function onPlayerReady(event) {
          
          // Push current iframe object to array
        	YTPlayerObjects.push(event.target);
        	
          /* Note that the id (event.target.id) seems to be just a number (from 1 upwards) indicating the index
          of the player that has just become ready. i.e. it is NOT the ID value given to the DIV in the HTML.
          Note also that when you come back to the same video page or go to anothetr page with videos, this index
          keeps being incremented. */
          console.log("Event.Target.ID: " + event.target.id);
          
          let playerObject = event.target.getIframe();
          let videoId = playerObject.dataset.videoId;
          
          let playButton = document.querySelector('.youtube-component .play-button-wrapper[data-video-id="' + videoId + '"]');
          let playerOverlay = document.querySelector('.video-overlay[data-video-id="' + videoId + '"]');
          let videoLoadingMessage = document.querySelector('.video-loading-message[data-video-id="' + videoId + '"]');
          
          playButton.classList.add("fade-in");
          videoLoadingMessage.classList.remove("pulsate-text");
          
          playerOverlay.style.cursor = "pointer";
          
          playerOverlay.addEventListener("click", function() {
            
              playButton.classList.add("one-moment");
              
              // Pause any videos that might be currently playing.
              YTPlayerObjects.forEach(function(item) {
          			  item.pauseVideo();
          		});
              
        		  event.target.playVideo();
        	
          });
          
      };
  
  
      
      
      /* The API calls this function when the player's state changes.
      The function indicates that when playing a video (state=1). */
      function onPlayerStateChange(event) {
        
          let playerObject = event.target.getIframe();
          let videoId = playerObject.dataset.videoId;
              
          let playerOverlay = document.querySelector('.video-overlay[data-video-id="' + videoId + '"]');
          let coverImage = document.querySelector('.youtube-component img.cover[data-video-id="' + videoId + '"]');
          let playButton = document.querySelector('.youtube-component .play-button-wrapper[data-video-id="' + videoId + '"]');
          
          if(event.data == YT.PlayerState.ENDED || event.data == YT.PlayerState.PAUSED) {
              
              // Can put delay on this if want to by replacing the 0 with say 2000 for two second delay.
              setTimeout(() => {
                
                  playerOverlay.style.pointerEvents = "auto";
                  
                  coverImage.classList.add("fade-in");
                  
                  playButton.classList.add("fade-in");
                  
                  playButton.classList.remove("one-moment");
                  
              }, 0);
              
          }
          
          if(event.data == YT.PlayerState.PLAYING) {
              
              // Can put delay on this if want to by replacing the 0 with say 2000 for two second delay.
              setTimeout(() => {
                
                  coverImage.classList.remove("fade-in");
                
                  playButton.classList.remove("fade-in");
                  
                  // Need to be able to click through to the video.
                  playerOverlay.style.pointerEvents = "none";
                
              }, 0);
              
          }
        
          // OPTIONS:
          // YT.PlayerState.ENDED
          // YT.PlayerState.PLAYING
          // YT.PlayerState.PAUSED
          // YT.PlayerState.BUFFERING
          // YT.PlayerState.CUED
          // OR integer variables:
          // 1 (unstarted)
          // 0 (ended)
          // 1 (playing)
          // 2 (paused)
          // 3 (buffering)
          // 5 (video cued).
        
      };
      
    }

  }
    
};

export{initYouTube};