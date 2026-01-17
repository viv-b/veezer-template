---
_schema: default
title: Icon Fonts
tags: documentation
permalink: /documentation/style-and-theme/icon-fonts/
url: /documentation/style-and-theme/icon-fonts/
layout: layouts/documentation.liquid
date: 2026-01-13T00:00:00+13:00
seo:
  meta_title:
  meta_description:
  canonical_url:
  meta_image:
  author_twitter_handle:
  open_graph_type:
  no_index: true
is_section_summary_page: false
navigation_group_docs:
_inputs:
  date:
    comment: Date page last updated.
  is_section_summary_page:
    type: checkbox
    comment: Check if this is a section summary page for documentation.
  navigation_group_docs:
    type: select
    hidden: '!is_section_summary_page'
    comment: >-
      Pulled from on any sub-navigation group titles added in the documentation
      nav file of the data folder ('_data/nav-docs.json') - e.g. 'javascript' if
      this is a summary page for the 'javascript' section).
    options:
      values: data.nav-docs.items[*].sub_navigation_group_title
  tags:
    hidden: true
---
There are a few icon fonts used through the site (e.g. arrows, calendar, clock, location). One of three icon libraries can be chosen for the site-wide icons:

* Font Awesome
* Google Material Symbols
* Phosphor Icons

The selection of which icon library to use and the icons that match each generic 'icon\_name' is via a data file (`_data/icon_sets.json`). Generic names are used and then matched with a similar icon within each of the icon libraries.

The adding of the icons in the template is handled by a shared eleventy component include (`icons.eleventy.liquid`). To access the include the code is in the form of:

```liquid
(%- bookshop_include "icons" icon_name: "Location" %)
```

### Accessing the fonts:

To set up, there will be either a link to an external JS file (Font Awesome) or a link to an external CSS file (Material Symbols, Phosphor Icons). You can paste these link snippets in the `head_code` or `tail_code` fields of the `_data/icon_sets.json` file.

**Font Awesome:**<br>You will need to create an account to use these icons in your own project. *All of the icons I have used are from the free collections so should work without using a paid account.*

**Google Material Symbols**<br>You don't need any sort of account to use these. However, this library does not have the normal brand icons (e.g. social media companies). Instead downloaded SVG icons from Phosphor Icons are used. So you will need to have CSS link snippets for both Google Material Symbols and Phosphor Icons.

**Phosphor Icons**<br>No account required, just add the CSS link snippet to the `head_code` field of `_data/icon_sets.json`

Placement of the icons will differ slightly so depending on which library used you might need to tweak the CSS a little.