---
_schema: default
title: Image Credits
tags: documentation
permalink: /documentation/image-credits/
layout: layouts/documentation.liquid
date: 2026-01-15T11:06:32+13:00
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
This template uses the great site Unsplash.com to provide the imagery. They are real images made by real people.

All images displayed will be as an `<img>` element (rather than a backgound image) so should be easy enough to right click and view. However, they will not be the original size as downloaded from Unsplash.

The image file names have been kept as-is from Unsplash so to find the artist of images you like and want to find out more about, check out the file name then search them up. e.g. ***josh-hild**\-6kvgxihrita-unsplash.jpg*