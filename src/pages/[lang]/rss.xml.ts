import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, postUrl } from '@/lib/posts';
import { LANGS, SITE, type Lang } from '@/site.config';

export function getStaticPaths() {
  return LANGS.map((lang) => ({ params: { lang } }));
}

export async function GET(context: APIContext) {
  const lang = context.params.lang as Lang;
  const posts = await getPosts(lang);
  return rss({
    title: SITE.title,
    description:
      lang === 'ko'
        ? '개발 이야기와 학습 기록, 그리고 이런저런 생각'
        : 'Notes on development, learning, and other thoughts',
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: postUrl(p),
      categories: p.data.tags,
    })),
    customData: `<language>${lang === 'ko' ? 'ko-kr' : 'en-us'}</language>`,
  });
}
