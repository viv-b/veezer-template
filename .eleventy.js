const pluginBookshop = require("@bookshop/eleventy-bookshop");
const { DateTime } = require("luxon");
const sizeOf = require("image-size");
const MarkdownIt = require("markdown-it"),
  md = new MarkdownIt({
    html: true,
  });
const purgeCssPlugin = require("eleventy-plugin-purgecss");

module.exports = function (eleventyConfig) {
  
  /* Based on: https://simpixelated.com/hiding-drafts-and-future-posts-in-eleventy-js/
  By default the blog section will only display the posts with timestamps in the past. The sitemap.xml file also seems to only show the older posts.
  HOWEVER, the permalinks for future dates posts still exist, so they actually get created and are visible on the built site.
  To avoid, do a check that the date field holds a past date, not a future one. Note that this will likely act on ALL pages with a field named 'date'.
  The Events collection should be unaffected as it uses 'event_date' type naming. */

  // When `permalink` is false, the file is not written to disk.
  eleventyConfig.addGlobalData("eleventyComputed.permalink", function () {
    return data => {
      
      const datePage =  DateTime.fromJSDate(data.date).setZone('Pacific/Auckland').toUnixInteger();
      const dateNow =  DateTime.now().setZone('Pacific/Auckland').toUnixInteger();
      
      if (datePage > dateNow) {
        return false;
      } else {
        return data.permalink;
      }
    }
  })
  
  eleventyConfig.addFilter("length", (input) => {
    return input.length;
  });
  
  // Date formatting with Luxon here: https://github.com/moment/luxon/blob/master/docs/formatting.md
  eleventyConfig.addFilter("datePost", (dateObj) => {
    return DateTime.fromJSDate(dateObj).setZone('Pacific/Auckland').toLocaleString(DateTime.DATE_MED);
  });
  eleventyConfig.addFilter("dateEventDayName", (dateObj) => {
    return DateTime.fromJSDate(dateObj).setZone('Pacific/Auckland').toFormat('ccc');
  });
  eleventyConfig.addFilter("dateEventDayNumber", (dateObj) => {
    return DateTime.fromJSDate(dateObj).setZone('Pacific/Auckland').toFormat('d');
  });
  eleventyConfig.addFilter("dateEventMonth", (dateObj) => {
    return DateTime.fromJSDate(dateObj).setZone('Pacific/Auckland').toFormat('LLL');
  });
  eleventyConfig.addFilter("dateEventYearFourDigits", (dateObj) => {
    return DateTime.fromJSDate(dateObj).setZone('Pacific/Auckland').toFormat('yyyy');
  });
  eleventyConfig.addFilter("dateEventFull", (dateObj) => {
    return DateTime.fromJSDate(dateObj).setZone('Pacific/Auckland').toFormat('cccc, d LLLL yyyy');
  });
  
  /* NOTE: For some reason dates set in Frontmatter are returned in a different format to the dates when set
  say in the site.json file. That's why need to use the .fromISO function rather than the .fromJSDate
  function in those situations:
  e.g. ISO 8601 formatted datetime: "datetime": "2020-07-15T12:00:00Z"
  or alternative in event dates:  "2025-04-10T00:00:00+12:00"
  
  For example if setting a festival date start in the site.json file would need something like this
    eleventyConfig.addFilter("dateFestivalDay", (dateObj) => {
      return DateTime.fromISO(dateObj).setZone('Pacific/Auckland').toFormat('d');
    });
  */

  eleventyConfig.addFilter("dateNz", (dateObj) => {
    return DateTime.fromJSDate(dateObj).setZone('Pacific/Auckland').toLocaleString(DateTime.DATE_MED);
    // Also works: return DateTime.fromJSDate(dateObj).plus({ hours: 13 }).toLocaleString(DateTime.DATE_MED);
  });
  eleventyConfig.addFilter("dateNzFull", (dateObj) => {
    return DateTime.fromJSDate(dateObj).setZone('Pacific/Auckland').toLocaleString(DateTime.DATE_FULL);
    // Also works: return DateTime.fromJSDate(dateObj).plus({ hours: 13 }).toLocaleString(DateTime.DATE_FULL);
  });
  eleventyConfig.addFilter("dateNzYear", (dateObj) => {
    return DateTime.fromJSDate(dateObj).setZone('Pacific/Auckland').toFormat('yyyy');
    // Also works: return DateTime.fromJSDate(dateObj).plus({ hours: 13 }).toFormat('yyyy');
  });
  eleventyConfig.addFilter("dateNzMonth", (dateObj) => {
     return DateTime.fromJSDate(dateObj).setZone('Pacific/Auckland').toFormat('MMMM')
    // Also works: return DateTime.fromJSDate(dateObj).plus({ hours: 13 }).toFormat('MMMM');
  });
  eleventyConfig.addFilter("dateUnixInteger", (dateObj) => {
    return DateTime.fromJSDate(dateObj).setZone('Pacific/Auckland').toUnixInteger();
  });
  eleventyConfig.addFilter("dateUnixIntegerNow", (dateObj) => {
    return DateTime.now().setZone('Pacific/Auckland').toUnixInteger();
  });
  
  // Image dimension filters used to assist with responsive image markup.
  eleventyConfig.addFilter("image-width", function(value) { 
    const dimensions = sizeOf(value);
    return Number(dimensions.width);
  });
  
  eleventyConfig.addFilter("image-height", function(value) { 
    const dimensions = sizeOf(value);
    return Number(dimensions.height);
  });

  // Ensure a rebuild is triggered when a bookshop component template file is changed.
  eleventyConfig.addWatchTarget("component-library/");

  /* Tell Eleventy's Browsersync instance to watch the output CSS files generated by Sass.
  This ensures that when Sass compiles new CSS, your browser automatically refreshes.
  Now, when you run npm start in your terminal, both Sass watching and Eleventy serving will begin.
  Any changes to your .scss files will trigger Sass compilation, and the updated .css files
  will cause Browsersync to refresh your browser, showing the latest styles. */
  eleventyConfig.setBrowserSyncConfig({
    files: './site/css/main.css' // Path to compiled CSS.
  });
  
  eleventyConfig.addFilter("markdownify", (markdown) => md.render(markdown));
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.htmlTemplateEngine = "liquid";
  eleventyConfig.addPlugin(
    pluginBookshop({
      bookshopLocations: ["component-library"],
      pathPrefix: "",
    })
  );

  if (process.env.ELEVENTY_ENV === "production") {
    eleventyConfig.addPlugin(purgeCssPlugin, {
      // Optional: Specify the location of your PurgeCSS config
      config: "./purgecss.config.js",
      // Optional: Set quiet: true to suppress terminal output
      quiet: false,
    });
  }

  eleventyConfig.ignores.add("site/schemas");
  eleventyConfig.addPassthroughCopy("site/css");
  eleventyConfig.addPassthroughCopy("site/fonts");
  eleventyConfig.addPassthroughCopy("site/uploads");
  eleventyConfig.addPassthroughCopy("site/js");
  eleventyConfig.addPassthroughCopy("site/vendor");
  eleventyConfig.addPassthroughCopy("site/favicon");
  return {
    dir: {
      input: "site",
      pages: "pages",
      output: "_site"
    },
  };
};
