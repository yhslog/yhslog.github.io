// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync, existsSync } from 'node:fs';

const SITE_URL = 'https://yhslog.com';

/**
 * 사이트맵 lastmod 용: 글 경로 → 마지막 수정일(updatedDate ?? pubDate).
 * 설정 파일에서는 content collection 을 쓸 수 없어 frontmatter 의 날짜만 간단히 읽는다.
 */
function postDates() {
  const base = new URL('./src/content/posts/', import.meta.url);
  const dates = new Map();
  for (const lang of readdirSync(base)) {
    const langDir = new URL(`${lang}/`, base);
    for (const slug of readdirSync(langDir)) {
      const file = ['index.md', 'index.mdx'].map((f) => new URL(`${slug}/${f}`, langDir)).find((u) => existsSync(u));
      if (!file) continue;
      const fm = readFileSync(file, 'utf8').split(/^---\s*$/m)[1] ?? '';
      if (/^draft:\s*true/m.test(fm)) continue;
      const pick = (/** @type {string} */ key) => fm.match(new RegExp(`^${key}:\\s*['"]?([0-9T:.+-]+)`, 'm'))?.[1];
      const date = pick('updatedDate') ?? pick('pubDate');
      if (date) dates.set(`${SITE_URL}/${lang}/posts/${slug}/`, new Date(date).toISOString());
    }
  }
  return dates;
}
const lastmods = postDates();

// 도메인을 바꾸면 SITE_URL 과 GitHub 저장소 Settings → Pages → Custom domain 을 함께 바꾼다.
export default defineConfig({
  site: SITE_URL,
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
      serialize(item) {
        const lastmod = lastmods.get(item.url);
        return lastmod ? { ...item, lastmod } : item;
      },
      i18n: {
        defaultLocale: 'ko',
        locales: { ko: 'ko-KR', en: 'en-US' },
      },
    }),
  ],
});
