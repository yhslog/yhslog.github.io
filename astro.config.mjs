// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// 커스텀 도메인(예: yhslog.com)으로 옮기면 site 값만 바꾸고 public/CNAME 파일을 추가하면 된다.
export default defineConfig({
  site: 'https://yhslog.github.io',
  trailingSlash: 'always',
  i18n: {
    locales: ['ko', 'en'],
    defaultLocale: 'ko',
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  markdown: {
    shikiConfig: {
      // 코드 블록은 라이트/다크 모드와 관계없이 어두운 테마를 사용 (디자인 시안 기준)
      theme: 'github-dark',
      wrap: false,
    },
  },
  integrations: [
    mdx(),
    sitemap({
      // 루트(/)는 언어별 첫 화면으로 보내기만 하는 페이지라 제외
      filter: (page) => new URL(page).pathname !== '/',
      i18n: {
        defaultLocale: 'ko',
        locales: { ko: 'ko-KR', en: 'en-US' },
      },
    }),
  ],
});
