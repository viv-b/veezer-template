---
_schema: default
title: GSAP Animations - Optimisation
tags: documentation
permalink: /documentation/javascript/gsap-animations-optimisation/
url: /documentation/javascript/gsap-animations-optimisation/
layout: layouts/documentation.liquid
date: 2026-01-20T00:00:00+13:00
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
&nbsp;

---

*I wanted to know whether having an initial opacity: 0 before fade-in animations was a potential problem for SEO or for page loading speed metrics. The ideal solution appears to be to alter the technique used depending on whether content is above the fold (top portion of a webpage visible without scrolling) or below it.*

*For simplicity, the template currently uses the autoAlpha approach to fade-in all content.*

---

## AI generated overview summary:

### Opacity 0 vs 0.01 (SEO & Accessibility)

**Pros:** Using `opacity: 0` does not harm SEO—Google still sees the content in the DOM, and screen readers can access it. Animating from 0 to 1 is standard practice and doesn’t negatively affect rankings.<br>**Cons:** Switching to `0.01` offers no SEO benefit and can introduce edge-case rendering or interaction quirks without meaningful gains.

### GSAP `autoAlpha` (Opacity + Visibility)

**Pros:** `autoAlpha` is a best practice for non-critical elements. It combines opacity animation with `visibility: hidden`, improving rendering efficiency and preventing invisible-but-clickable elements. It also helps avoid flashes of unstyled content (FOUC).<br>**Cons:** If misused on primary content, it can delay when that content becomes visible, which impacts performance metrics like LCP.

### Largest Contentful Paint (LCP) Impact

**Pros:** Keeping non-essential elements hidden (via `opacity: 0` or `autoAlpha: 0`) ensures LCP measures only genuinely visible content, which is desirable.<br>**Cons:** If your main hero image or headline starts hidden, LCP is delayed until JavaScript runs—hurting Core Web Vitals and perceived load speed.