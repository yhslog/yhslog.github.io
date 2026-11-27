# yhslog

개발 이야기와 학습 기록, 그리고 이런저런 생각을 적는 블로그 — https://yhslog.com

[Astro](https://astro.build) 기반 정적 사이트이며 GitHub Actions로 GitHub Pages에 배포한다.

## 개발

```sh
pnpm install
pnpm dev       # http://localhost:4321
pnpm build     # 타입 검사(astro check) + 빌드 → dist/
pnpm preview   # 빌드 결과 미리보기
```

Node 22 이상, pnpm 10.

## 글 쓰기

글 하나 = 폴더 하나. 이미지는 같은 폴더에 둔다.

```
src/content/posts/
  ko/
    my-post/
      index.md        # 또는 index.mdx
      diagram.png     # 본문에서 ![설명](./diagram.png)
  en/
    my-post/          # ko 와 같은 폴더 이름이면 서로의 번역으로 연결됨
      index.md
```

주소는 `/<lang>/posts/<폴더 이름>/` 이 된다.

### frontmatter

```yaml
---
title: Astro로 블로그 만들기 ① 왜 Astro인가
description: 목록·검색·SNS 미리보기에 쓰이는 한두 문장 요약
pubDate: 2026-11-27
updatedDate: 2026-12-01        # 선택
tags: [dev, astro]             # 영문 소문자 + 하이픈만
series:                        # 선택: 시리즈 글일 때
  id: astro-blog               # 영문 소문자 + 하이픈
  title: Astro로 블로그 만들기
  order: 1
cover: ./cover.png             # 선택: 대표 이미지 (없으면 자동 커버)
coverAlt: 대표 이미지 설명       # 선택
coverText: 왜 Astro인가          # 선택: 자동 커버에 크게 들어갈 짧은 문구 (없으면 제목)
draft: true                    # 선택: true 면 배포에서 제외 (pnpm dev 에서는 보임)
---
```

- 본문의 `##`, `###` 제목이 목차(데스크톱 오른쪽 / 모바일 하단 캡슐)에 나온다.
- 첫 화면 상단 고정 태그는 `src/site.config.ts` 의 `pinnedTags` 에서 바꾼다.

### Notion에서 옮길 때

Notion 페이지 → `⋯` → Export → **Markdown & CSV** 로 내보낸 뒤,
`.md` 내용을 `index.md` 에 붙이고 이미지 파일을 같은 폴더로 옮겨 경로를 `./파일이름` 으로 고친다.

## 설정 (`src/site.config.ts`)

| 항목 | 설명 | 비어 있으면 |
|---|---|---|
| `social.linkedin` | LinkedIn 주소 | 링크 숨김 |
| `giscus.repoId`, `giscus.categoryId` | [giscus.app](https://giscus.app) 에서 발급 | 댓글 꺼짐 |
| `cloudflareAnalyticsToken` | Cloudflare Web Analytics 토큰 | 통계 꺼짐 |

강조색 등 디자인 토큰은 `src/styles/global.css` 맨 위 `:root` 에 있다.

## 배포

`main` 에 push 하면 `.github/workflows/deploy.yml` 이 빌드·배포한다.
처음 한 번은 저장소 **Settings → Pages → Source** 를 **GitHub Actions** 로 바꿔야 한다.

### 댓글(giscus) 켜기

1. 저장소 **Settings → General → Features → Discussions** 켜기
2. [giscus 앱](https://github.com/apps/giscus) 을 이 저장소에 설치
3. [giscus.app](https://giscus.app) 에서 저장소 `yhslog/yhslog.github.io`, 카테고리(Announcements 권장) 선택
4. 생성된 `data-repo-id`, `data-category-id` 값을 `src/site.config.ts` 에 입력

### 도메인

`yhslog.com` 을 쓴다. 도메인은 저장소 **Settings → Pages → Custom domain** 에서 설정한다
(GitHub Actions 로 배포하므로 `CNAME` 파일은 필요 없다).
도메인을 바꿀 때는 `astro.config.mjs` 의 `SITE_URL` 도 함께 바꾼다.

### 검색엔진 등록

Google Search Console / 네이버 서치어드바이저에서 받은 HTML 태그 인증 값(`content="..."` 안의 값)을
`src/site.config.ts` 의 `verification` 에 넣으면 모든 페이지 `<head>` 에 들어간다.
사이트맵 주소는 `https://yhslog.com/sitemap-index.xml` 이다.
