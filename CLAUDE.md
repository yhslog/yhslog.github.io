# CLAUDE.md

yhslog 블로그(https://yhslog.com). Astro 7 정적 사이트, GitHub Actions로 GitHub Pages에 배포.

## 명령

- `pnpm dev` — 개발 서버 (초안 `draft: true` 도 보임)
- `pnpm build` — `astro check` + 빌드. 커밋 전 오류 0 / 경고 0 확인
- `pnpm preview` — 빌드 결과 미리보기

pnpm 만 사용한다 (npm/yarn 금지). TypeScript 는 6 버전 유지 (`astro check` 가 7 미지원).

## 브랜치 · PR 규칙

- 작업마다 새 브랜치를 만든다 (예: `claude/og-image`). 병합이 끝난 브랜치에는 더 이상 커밋하지 않는다.
- 어떤 브랜치에서 작업하는 중에 그 작업과 관계없는 요청을 받으면, 손대기 전에
  **작업 중인 브랜치에 커밋할지, 새 브랜치를 만들지** 사용자에게 먼저 묻는다. 애매하면 묻는다.
- 기능·설정 변경은 PR 로 올리고 **squash merge** 한다. 글(content)만 추가할 때는 `main` 직접 커밋도 허용.
- 강제 푸시·히스토리 재작성은 하지 않는다.

## 구조

- `src/content/posts/<lang>/<slug>/index.md(x)` — 글. 이미지는 같은 폴더. ko/en 에 같은 slug 가 있으면 번역으로 연결
- `src/content.config.ts` — 글 스키마 (태그·시리즈 id 는 영문 소문자+하이픈)
- `src/site.config.ts` — 사이트 설정 (giscus, Cloudflare 토큰, 검색엔진 인증값, 고정 태그). 모두 공개 값
- `src/i18n/ui.ts` — UI 문구 (ko/en). 화면 문구를 추가하면 두 언어 모두 넣는다
- `src/lib/posts.ts` — 글 조회·정렬·태그·시리즈 헬퍼 / `src/lib/post-client.ts` — 글 화면 클라이언트 동작
- `src/styles/global.css` — 디자인 토큰(`:root`, `[data-theme='dark']`)과 본문(.prose) 스타일

## 결정된 사항 (바꾸기 전에 사용자와 상의)

- 디자인: 시안 "C · Bold". 강조색 `#FF6B3D`, 제목 Space Grotesk, 본문 Pretendard. 라이트/다크(기기 설정 기본, 선택 기억)
- 다국어: `/ko/`, `/en/` 접두사. 글은 언어별로 따로 쓰고 번역은 있을 때만 연결
- 분류: 카테고리 없이 태그만. 첫 화면 고정 태그 `dev`, `til`, `essay`
- 글 하단 순서: 태그 → 시리즈 → 다음 글(왼쪽, 더 최근)/이전 글(오른쪽, 더 오래됨) → 댓글
- 모바일 목차: 하단 캡슐(현재 섹션 + 진행률) + 원형 맨 위로 버튼. 아래로 스크롤하면 숨김, 위로 올리면 표시
- 댓글 giscus(pathname 매핑, Announcements), 통계 Cloudflare Web Analytics (GA 사용 안 함)
- 비밀 키(쓰기 권한 있는 토큰)는 저장소에 절대 넣지 않는다
