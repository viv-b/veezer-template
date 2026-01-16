/*
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
FILE: fetch.js

DESCRIPTION: All of the code to handle fetching new page content via Fetch API calls,
updating the browser history, meta tags, navigation menu active states and
initializing modules on the newly loaded content.
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/



import {
  initModules
} from './init-modules.js';



/* The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed,
without waiting for stylesheets, images, and subframes to finish loading. */
document.addEventListener('DOMContentLoaded', () => {

  
  
  // Update the meta tags in the document head based on the newly loaded content.
  function updateMetaTags(doc) {

    document.querySelector("title").innerText = doc.querySelector("title").innerText;

    document.querySelector('meta[name="description"]').setAttribute("content", doc.querySelector('meta[name="description"]').getAttribute("content"));

    document.querySelector('link[rel="canonical"]').setAttribute("href", doc.querySelector('link[rel="canonical"]').getAttribute("href"));

    // TODO - Could possibly update other meta tags here too. Not needed for SEO as crawlers should only index content based on full page refreshes.

  };



  // Update the navigation menu link item classes to highlight the active page.
  function updateMenu(url) {

    var menuLinks = document.querySelectorAll(".navbar-start a");

    // Split up the path to see if it relates to a sub-page.
    var pathArray;
    var topLevelPath;

    if (url !== "/") {
      pathArray = url.split("/");
      topLevelPath = "/" + pathArray[1] + "/";
    } else {
      topLevelPath = "/";
    }

    console.log("Top level path: " + topLevelPath);

    // Iterate over all links.
    menuLinks.forEach(function(link) {

      var linkHref = link.getAttribute("href")

      link.classList.remove("is-active");

      // Check if the new page is a top-level page.
      if (linkHref == url) {

        link.classList.add("is-active");

      // Otherwise check if the page is a sub-page with the top section matching a top-level link.
      } else if (pathArray) {

        if (pathArray.length > 3 && linkHref == topLevelPath) {

          link.classList.add("is-active");

        }

      }

    });

  };



  /* Load new content via Fetch API, updates the browser history, meta tags, navigation menu active states,
  and initialize modules on the newly loaded content.
  Info on Fetch Here: https://gomakethings.com/getting-html-with-fetch-in-vanilla-js/ */
  function loadNewContent(url, isNewNonHistoryEntry) {

    document.getElementById("page-loader").classList.remove("hide-loader");

    console.log("URL: " + url);

    fetch(url).then(function(response) {

      // The API call was successful!
      return response.text();

    }).then(function(html) {

      // Convert the HTML string into a document object.
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, "text/html");

      var docContainer = doc.querySelector("main");
      var newContent = docContainer.innerHTML;

      var domContainer = document.querySelector("main");
      domContainer.innerHTML = newContent;

      // Clear any modal items that were in the modal-holder div (as these are page specific).
      document.getElementById("modal-holder").innerHTML = "";

      updateMenu(url);

      updateMetaTags(doc);

      /* Only scroll to top of page if not a popstate (history) call. Otherwise want to keep the scroll position
      where it was left in the new (revisited) page.
      
      Note that using the Window.scrollTo() method here does not always work correctly with ScrollSmoother enabled,
      so use the method provided by ScrollSmoother instead.

      There can only be one instance of ScrollSmoother at any given time. This was created in the inital page
      load within the 'init-gsap.js' file using 'ScrollSmoother.create()'. So code below uses this existing instance. */

      if (ScrollSmoother.get()) {

        let smoother = ScrollSmoother.get();
        
        /* Did have the scroll to top wrapped in an if statement below (dont's scroll to top if going back to a history entry)
        but decided to simplify it by just always scrolling to top on new page load. */
        smoother.scrollTo(0, false); // Use 'false' to jump straight to position as 'true' will animate the scroll.

      } else {
        // Fallback with mobile where ScrollSmoother not initialised at all, just using ScrollTrigger.
        window.scrollTo(0, 0);
      }
      
      if (url != window.location && isNewNonHistoryEntry) {
        // Add the new page to the 'window.history'. If the new page was triggered by a 'popstate' event (isNewNonHistoryEntry == false) don't add it.
        window.history.pushState({
          path: url
        }, "", url);
      
      }

      /* Allow small delay for scroll position to get back to the top of the screen.
      This avoids the issue of scroll positions being incorrect if for example you go from part
      way down one page and then go to a new page, some of the items will be pre-animated in
      without needing scroll trigger. */
      setTimeout(() => {
        initModules();
      }, 500);

      currentUrl = url;

      /* Can't use the window onload event here as this only fires on the first pageload so just simulate
      with a bit of time showing the loader. */
      setTimeout(() => {
        document.getElementById("page-loader").classList.add("hide-loader");
      }, "2000");

      // Remove the focus from all link elements so CSS doesn't have artifacts after page laod.
      document.querySelectorAll('a').forEach(link => {
        link.blur();
      });

      /* In case there was a connection issue and the notice was displayed, and an internal link (using the Fetch API)
      was clicked, need to hide the notice. If already hidden when no connection issue no problem. */
      document.getElementById("connection-issue-notice").style.display = "none";

    }).catch(function(err) {

      console.warn("Something went wrong.", err);

      document.getElementById("connection-issue-notice").style.display = "block";

    });

  };



  /* Capture the click event for the navigation div (<nav>) and also any internal links in the main content div (<main>).
  Turn off the default link behaviour and do a Fetch API call to get the new content rather than doing a full page reload.
  Also capture clicks on logo holder and footer sections. The click event listener uses 'event delegation' on a permanent
  parent item which is applied to any new fetched content within it.

  Event delegation allows us to attach a single event listener, to a parent element, that will fire for all
  descendants matching a selector, whether those descendants exist now or are added in the future.
  This is particularly useful for handling events on dynamically loaded content, as it avoids the need
  to reattach event listeners every time new elements are added to the DOM. */
  document.querySelectorAll("main,nav,.logo-holder,.footer,#documentation-link").forEach(item => {

    item.addEventListener("click", event => {

      console.log("tagName: " + event.target.tagName);
      console.log("className: " + event.target.className);
      console.log("href: " + event.target.getAttribute("href"));
      console.log("target attribute: " + event.target.getAttribute("target"));

      let clickedElement;

      /* Check if the clicked element is an image wrapped in a link. If so then need to get the attributes of the PARENT
      link element to process things. Only want to consider links or images wrapped in links to process OR if in the main
      navigation bar, the link is actually a span inside the a tag. */
      if (event.target.tagName === "IMG" || event.target.tagName === "SPAN") {

        if (event.target.parentElement.tagName === "A") {

          clickedElement = event.target.parentElement;

        }

      } else if (event.target.tagName === "A") {

        clickedElement = event.target;

      }

      // TODO: Could refactor the nested if statements below for clarity, but reasonably straightforward as is.
      if (clickedElement) {

        // New tab...
        if (clickedElement.getAttribute('target') !== "_blank") {

          // Internal link...
          if (clickedElement.getAttribute("href").toLowerCase().indexOf("https://") === -1 && clickedElement.getAttribute("href").toLowerCase().indexOf("http://") === -1) {

            // Anchor link...
            if (clickedElement.getAttribute("href").toLowerCase().indexOf("#") === -1) {

              // Telephone link...
              if (clickedElement.getAttribute("href").toLowerCase().indexOf("tel:") === -1) {

                // Gallery image link (as don't want to fully reload page when clicked on image link)...
                let galleryLink = false;

                // Make sure there is a class attribute otherwise checking 'indexOf' on a null object will cause an error.
                if (clickedElement.getAttribute("class")) {

                  if (clickedElement.getAttribute("class").indexOf("gallery-thumbnail-link") === -1) {
                    galleryLink = false;
                  } else {
                    galleryLink = true;
                  }
                }

                if (galleryLink === false) {

                  event.preventDefault();

                  closeMobileNavigation();

                  // Detect which page has been selected.
                  let newUrl = clickedElement.getAttribute("href");

                  // Get the current URL/pathname to check if a documentation page (as it has a different layout).
                  adjustLayoutForDocumentationPages(newUrl.includes("/documentation/"));

                  loadNewContent(newUrl, true);

                }

              }

            }

          }

        }

      }

    });

  });



  /* The popstate event of the Window interface is fired when the active history entry changes while the user navigates the session history.
  It changes the current history entry to that of the last page the user visited OR, if 'history.pushState()' has been used to add a history
  entry to the history stack, that history entry is used instead. */
  window.addEventListener("popstate", (event) => {

    if (event.state !== null) {

      let newUrl = event.state.path;

      // Check if a documentation page (different layout).
      adjustLayoutForDocumentationPages(newUrl.includes("/documentation/"));

      if (currentUrl != newUrl) loadNewContent(newUrl, false);

    } else {

      // Check if a documentation page (different layout).
      adjustLayoutForDocumentationPages(originalPageLoadUrl.includes("/documentation/"));

      /* Go back to very first page (originally loaded page). It will NOT be in the history stack.
      However this first page was recorded on initial page load in the 'originalPageLoadUrl' variable. */
      loadNewContent(originalPageLoadUrl, false);

    }

  });



  function adjustLayoutForDocumentationPages(addClass) {

    if (addClass) {
      document.body.classList.add('documentation-wrapper');
    } else {
      document.body.classList.remove('documentation-wrapper');
    }
    
  }



  /*
  +++++++++++++++++
  INITIAL PAGE LOAD
  +++++++++++++++++
  */
 


  let currentUrl = "";

  /* 'thisUrl' below is the URL on inital pageload (so before any Fetch API-based loading of secondary pages occurs).
  It WONT be in the browser history stack. 'originalPageLoadUrl' is used to hold this initial URL and used in the 'popstate' event. */
  let thisUrl = window.location.pathname;
  let originalPageLoadUrl = thisUrl.substring(0, thisUrl.lastIndexOf('/') + 1);
  console.log("URL: " + thisUrl);

  // Check if this is a documentation page and set a class to alter the layout accordingly.
  adjustLayoutForDocumentationPages(thisUrl.includes("/documentation/"));
  
  // GSAP: Not essential to register GSAP but helps in some circumstances: https://greensock.com/docs/v3/GSAP/gsap.registerPlugin()
  gsap.registerPlugin(ScrollTrigger,ScrollSmoother);

  initModules();

  

});