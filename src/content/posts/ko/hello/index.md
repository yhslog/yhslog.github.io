---
title: 블로그를 시작합니다
description: yhslog를 시작하며, 이곳에 무엇을 적을지 정리했습니다.
pubDate: 2026-11-27
tags: [essay]
coverText: Hello, yhslog
---

## 왜 블로그인가

개발을 하면서 배운 것, 공부한 것, 그리고 이런저런 생각을 한곳에 모아 두고 싶었습니다.
흩어진 메모로 남기기보다, 다시 찾아볼 수 있고 다른 사람과도 나눌 수 있는 형태로요.

## 무엇을 적을까

- **dev**: 개발하며 만든 것과 깨달은 것
- **til**: 새로 배운 기술과 언어 공부 기록
- **essay**: 일과 삶, 그리고 그다음에 대한 생각

글이 길어지면 시리즈로 나누어 이어서 쓰려고 합니다.

## 어떻게 만들었나

이 블로그는 [Astro](https://astro.build)로 만들고 GitHub Pages에 올렸습니다.
설정은 대략 이런 모습입니다.

```js
export default defineConfig({
  site: 'https://yhslog.github.io',
  i18n: {
    locales: ['ko', 'en'],
    defaultLocale: 'ko',
  },
});
```

만든 과정은 따로 시리즈로 정리해 보겠습니다.

## 앞으로

꾸준히, 너무 무겁지 않게 써 보려 합니다.
