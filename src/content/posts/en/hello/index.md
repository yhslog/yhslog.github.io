---
title: Starting a blog
description: Kicking off yhslog, and what I plan to write about here.
pubDate: 2026-11-27
tags: [essay]
coverText: Hello, yhslog
---

## Why a blog

I wanted one place to keep what I learn while developing, what I study, and whatever else is on my mind —
somewhere I can come back to and share with others, instead of scattered notes.

## What I'll write about

- **dev**: things I build and learn while developing
- **til**: notes on new tech and language learning
- **essay**: thoughts on work, life, and what comes next

When a post gets long, I'll split it into a series.

## How it's built

This blog is built with [Astro](https://astro.build) and hosted on GitHub Pages.
The config looks roughly like this:

```js
export default defineConfig({
  site: 'https://yhslog.github.io',
  i18n: {
    locales: ['ko', 'en'],
    defaultLocale: 'ko',
  },
});
```

I'll write up the process as a separate series.

## What's next

I'll try to keep writing regularly, without making it too heavy.
