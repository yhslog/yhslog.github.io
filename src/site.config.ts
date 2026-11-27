/**
 * 사이트 전역 설정.
 * giscus / Cloudflare 값이 비어 있으면 해당 기능은 꺼진 채로 빌드된다.
 */
export const SITE = {
  title: 'yhslog',
  author: 'yhslog',
  /** 첫 화면 상단에 고정으로 보여 줄 태그 */
  pinnedTags: ['dev', 'til', 'essay'],
  social: {
    github: 'https://github.com/yhslog',
    /** 예: 'https://www.linkedin.com/in/your-id' — 비워 두면 링크를 숨긴다 */
    linkedin: '',
  },
  /**
   * giscus 설정: https://giscus.app 에서 저장소를 입력하면 아래 값들을 발급해 준다.
   * repoId 와 categoryId 가 모두 있어야 댓글이 켜진다.
   */
  giscus: {
    repo: 'yhslog/yhslog.github.io',
    repoId: 'R_kgDOHIighw',
    category: 'Announcements',
    categoryId: 'DIC_kwDOHIigh84DMG0D',
  },
  /** Cloudflare Web Analytics 토큰. 비워 두면 통계 스크립트를 넣지 않는다. */
  cloudflareAnalyticsToken: 'a00d48dcef224985b01d23328bcb7ae4',
} as const;

export const LANGS = ['ko', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'ko';
