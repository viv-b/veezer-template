---
_schema: default
title: Image Handling
tags: documentation
permalink: /documentation/image-handling/
url: /documentation/image-handling/
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
Currently, the templates on the production site use image transformations from one of two service:

* <a href="https://imagekit.io/" target="_blank" rel="noopener">Imagekit</a>
* <a href="https://images.weserv.nl/" target="_blank" rel="noopener">Wsrv.nl</a>

I've used <a href="https://www.imgix.com/" target="_blank" rel="noopener">Imgix</a> before as well. It's straight-forward enough to just adjust the parameters in the template to use the Imgix service instead.

*Because this is an Eleventy site, the Eleventy Image plugin could be used. I've just kept with the CDN transformation service option that I was familiar with from using Jekyll. You might want to aslo look at Digital Asset Management (DAM) Integration.*

### Broken Images

When I started using  the image transformation services above with CloudCannon there was an occasional rendering issue with the transformed images. Often images would not display in the CloudCannon Visual Editor. I was getting frequent 404 errors in what seemed a random fashion - some images were fine, others broken.

It seemed that within the CloudCannon admin environment, the URL for the transformed images was called up for display in the Visual Editor before the actual image was uploaded to the CloudCannon servers. And this broken URL would be cached for a while, so the problem carried through to the live site.

### Development vs Production

A solution was to avoid doing any image transformations in the template of the development site where visual editing of content was happening. Instead, within the liquid template is an environment variable check (obtained from `_data/processEnv.js`:

```
(%- if processEnv.environment == 'production' %)
  ...use image transformations from cloud service
(% else %)
  ...use object-fit, object-position, aspect-ratio, etc. CSS on original images
(%- endif %)
```

In a site created from a development branch (`ELEVENTY_ENV=development`), the original uploaded images within CloudCannon are displayed in the tempalte, giving them the same aspect ratio and positioning as the final production site (`ELEVENTY_ENV=production`) but with CSS (`aspect-ratio`, `object-fit`, etc. *Optimising images in the development branch is not required.*

When changes are published to production, the final live site has the optimisations applied (via Imagekit or wsrv.nl) with no broken image links - the issue with the Visual Editor doesn't happen on the non-editable production branch site.

### srcset attribute

The production environment part of the image templates uses `srcset` to help with optimisation.

### To Do: &lt;picture&gt;

This isn't in the templates currently, but on another project I've added the option of different images for different sized screens (art direction). For example hero images that might need completely different crops or aspect ratios to make sense on different devices.