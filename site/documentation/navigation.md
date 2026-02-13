---
_schema: default
title: Navigation
tags: documentation
permalink: /documentation/navigation/
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
### One way to add navigation elements:

A primary or sub-navigation menu can be created automatically. For example iterating over the documents (pages) contained within a collection. The ordering of the navigation items can then be based on the value ofa field within each page (e.g a 'sort' number field). This sort ordering can be used in a navigation menu or in a 'summary' page that has a grouping of short summaries and links to all pages in that collection.

### How it's done in Veezer:

To achieve the most flexibility, the various menus are not created automatically - each page has to be added to the menu(s). These menus are data files so the ordering can easily be dragged and dropped and if there are changes to permalinks for any pages they can easily be changed to suit.

**Main navigation:** `_data/nav.json`

**Documentation navigation:** `_data/nav-docs.json`

In both navigation menus above, there can be sub-navigation elements. Also, the sub-navigation elements can be shown as a dropdown in the main menu if the 'Enable Dropdown' switch is on.

<img loading="lazy" height="1007" width="1200" src="/uploads/content/sub-navigation-menu-options.jpg" />

The 'Sub Navigation Group Title' field is used in templates to identify a goup of sub-navigation items. This field should have a value that reflects the name of the group that the sub-navigation items belong to *(leave blank if there are no sub-navigation items)*. If it refers to a collection then the collection name would be fine. For example if the parent page is named 'Fleet' then all of the sub-navigatin the field.

There are two Bookshop components that allow you to quickly add sub-navigation items to the page body:

1. A simple **sub-navigation component** that just displays the titles and links to the relevant pages
2. A **sub-navigation summary component** that displays the titles and links in the sub-navigation but also a summary image and short description.

*Image below shows a Fleet page that uses the sub-navigation component just above the footer with links to other Fleet pages in this section.*

<img src="/uploads/content/sub-navigation-example.jpg" loading="lazy" height="511" width="1200" />

*Image below shows the Fleet summary page using the sub-navigation summary component to outline the sub-pages.*

<img src="/uploads/content/sub-navigation-summary-example.jpg" loading="lazy" height="1400" width="1001" />

Adding a value to the 'Sub Navigation Group Title' field in `_data/nav.json` provides a way to select which set of sub-navigation values to populate the **sub-navigation component** or **sub-navigation summary component** wherever it's used.