/* NOTE: When viewed in the non-production environment, because the images are animated in from a smaller size (scaled up
using GSAP), the layout will shift as the images load in. In production, the images have width and height attributes set
so there is no layout shift. If want to see this effect, put the ScrollTrigger markers on and compare the production
branch with the development one. You will see the markers evenly positioned as you go down the page on production.
Not so much with the development one as you progress down the page. */

function initGsapFeatureSmooth() {

  document.querySelectorAll(".feature-smooth-container").forEach(component => {
    
    // Just grab any .sections that are descendents of this feature-background-color-container div...
    const sectionsToColorArr = gsap.utils.toArray(".section",component);
    
    const switchSectionBackgroundColor = (color) => {
      gsap.to(component, {
        duration: 0.65,
        ease: "power1.inOut",
        backgroundColor: color
      });
    };
    
    sectionsToColorArr.forEach((section, i) => {
      
        const color = section.dataset.bgColor;
        
        // Need to set the intial section background color (first item of section class)
        if (i === 0) {
          switchSectionBackgroundColor(color);
        }
        
        // if this is the first section then there is no 'previous' color. So just set the value of previous color the same as the color of this section.
        const previousColor = sectionsToColorArr[i - 1]
          ? sectionsToColorArr[i - 1].dataset.bgColor
          : color;
       
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => switchSectionBackgroundColor(color),
          onEnterBack: () => i === sectionsToColorArr.length - 1 && switchSectionBackgroundColor(color),
          // When on the last item, don't need to change the color when leaving. If items below it, it will just scroll up out of the way as normal.
          onLeave: () => i === sectionsToColorArr.length - 1 && switchSectionBackgroundColor(color),
          onLeaveBack: () => switchSectionBackgroundColor(previousColor)
          //markers: { indent: 150 * i },
          //id: i + 1
        });
    });
    
  });
  
  
  
};



export {initGsapFeatureSmooth};
