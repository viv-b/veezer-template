---
_schema: default
title: Installation
tags: documentation
permalink: /documentation/installation/
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
## **Development (local)**

1. Run `npm i` to install the modules.
2. Run `npm run start` to build and watch the site.

This will create a `_site` folder, containing the output files. Any changes made to source files updates these output files. By default the site's output files are hosted at `http://localhost:8080`

## **Building (CloudCannon)**

1. Run `npm i` to install the modules.
2. Run `npm run build` to build the site.

This will create a `_site` folder, containing the output files.

In order to use image optimisation, use run `npm run build-production`<br>This sets `ELEVENTY_ENV=production` which is checked for in the liquid templates.

> *This template is designed to be edited in CloudCannon as a 'development' site. In the development site, image optimisation is not applied so you don't get the broken CDN image problems. This development site can then publish to a 'production' branch site (where the variable  `ELEVENTY_ENV=production` is set) and image transformations are applied.*
>
> *For more detail on this, please see the documentation on* <a href="/documentation/image-handling/" target="_blank" rel="noopener"><em>image handling</em></a>*.*

**Build configuration in CloudCannon for DEVELOPMENT:**

<img src="/uploads/content/build-config-development.jpg" loading="lazy" height="685" width="775" />

**Build configuration in CloudCannon for PRODUCTION:**

<img src="/uploads/content/build-config-production.jpg" loading="lazy" height="685" width="775" />

## Running in Windows

On a Windows machine, you can get the following error when trying to build the site:

*'ELEVENTY\_ENV' is not recognized as an internal or external command, operable program or batch file.'* (...or whatever environment variable is being set). However, you can install a package called 'cross-env' that takes care of this: `cross-env` is an npm package that allows you to set environment variables in your project's scripts (like in `package.json`) in a way that works consistently across different operating systems (Windows, macOS, Linux).

Then in the `package.json` file just prepend the environment variable with 'cross-env'.

```
...
"eleventy:build": "cross-env ELEVENTY_ENV=production eleventy",
"eleventy:watch": "cross-env ELEVENTY_ENV=development eleventy --serve",
...
```

This is already sorted within this template.