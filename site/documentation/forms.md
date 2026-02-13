---
_schema: default
title: Forms
tags: documentation
permalink: /documentation/forms/
layout: layouts/documentation.liquid
date: 2026-01-15T10:41:34+13:00
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
There is a Forms Bookshop Component that enables creation of a simple form with the following field types:

* Email
* Text
* TextArea
* Select
* Radio
* Checkbox
* Number
* Date

The form currently will use Google reCAPTCHA if you provide the public key (`recaptcha_key`) in `_data/site.json` but you can just leave the field blank to test the form without using reCAPTCHA (the javascript to run it is not loaded if the field is empty).

### To Do:

Add more Captcha options.

&nbsp;

&nbsp;