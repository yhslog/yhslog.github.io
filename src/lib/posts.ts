import { getCollection, type CollectionEntry } from 'astro:content';
import { LANGS, type Lang } from '@/site.config';

export type Post = CollectionEntry<'posts'>;

export function postLang(post: Post): Lang {
  return post.id.split('/')[0] as Lang;
}

export function postSlug(post: Post): string {
  return post.id.split('/').slice(1).join('/');
}

export function postUrl(post: Post): string {
  return `/${postLang(post)}/posts/${postSlug(post)}/`;
}

export function isLang(value: string | undefined): value is Lang {
  return LANGS.includes(value as Lang);
}

/** 모든 언어의 글. 초안(draft)은 개발 서버에서만 보인다. */
export async function getAllPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** 한 언어의 글, 최신순 */
export async function getPosts(lang: Lang): Promise<Post[]> {
  return (await getAllPosts()).filter((p) => postLang(p) === lang);
}

/** 같은 slug 를 가진 다른 언어의 글 */
export async function getTranslations(post: Post): Promise<Partial<Record<Lang, string>>> {
  const slug = postSlug(post);
  const all = await getAllPosts();
  const result: Partial<Record<Lang, string>> = {};
  for (const p of all) {
    if (postSlug(p) === slug) result[postLang(p)] = postUrl(p);
  }
  return result;
}

/** 분 단위 읽기 시간. 한국어는 글자 수, 영어는 단어 수 기준 */
export function readingMinutes(body: string | undefined, lang: Lang): number {
  if (!body) return 1;
  const text = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_`\[\]()!-]/g, ' ');
  const minutes =
    lang === 'ko' ? text.replace(/\s+/g, '').length / 500 : text.split(/\s+/).filter(Boolean).length / 220;
  return Math.max(1, Math.round(minutes));
}

export function getTags(posts: Post[]): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of posts) for (const t of p.data.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export type SeriesInfo = { id: string; title: string; posts: Post[] };

export function getSeriesList(posts: Post[]): SeriesInfo[] {
  const map = new Map<string, SeriesInfo>();
  for (const p of posts) {
    const s = p.data.series;
    if (!s) continue;
    const entry = map.get(s.id) ?? { id: s.id, title: s.title, posts: [] };
    entry.posts.push(p);
    map.set(s.id, entry);
  }
  for (const s of map.values()) {
    s.posts.sort((a, b) => a.data.series!.order - b.data.series!.order);
    s.title = s.posts[0].data.series!.title;
  }
  // 최근에 글이 추가된 시리즈가 위로
  return [...map.values()].sort(
    (a, b) =>
      Math.max(...b.posts.map((p) => p.data.pubDate.valueOf())) -
      Math.max(...a.posts.map((p) => p.data.pubDate.valueOf())),
  );
}
