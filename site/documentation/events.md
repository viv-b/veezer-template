---
_schema: default
title: Events
tags: documentation
permalink: /documentation/events/
layout: layouts/documentation.liquid
date: 2026-01-15T10:52:14+13:00
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
The Events section uses logic in the Liquid templating to distinguish past events from upcoming ones and display them appropriately (archive the past events and show in date order the upcoming events). When viewing a past event there is a easily seen notification that the event has a start date in the past.

To get the event section to work, since the date processing is done within the templating, the site needs to be built regularly. A great way to make sure that this is automated is to schedule a manual build in the *Site Settings / Schedule* part of the CloudCannon admin. Setting say a 12 hourly build should work fine.