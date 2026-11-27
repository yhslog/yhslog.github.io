import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * 글 위치: src/content/posts/<lang>/<slug>/index.md(x)
 * - 이미지는 같은 폴더에 두고 ./image.png 처럼 참조한다.
 * - ko 와 en 에 같은 <slug> 폴더가 있으면 서로의 번역으로 연결된다.
 */
const posts = defineCollection({
  loader: glob({
    base: './src/content/posts',
    pattern: '*/*/index.{md,mdx}',
    generateId: ({ entry }) => entry.replace(/\/index\.mdx?$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      /** 영문 소문자 슬러그만 허용 (예: react, til, essay) */
      tags: z.array(z.string().regex(slug, '태그는 영문 소문자와 하이픈만 사용합니다')).default([]),
      series: z
        .object({
          id: z.string().regex(slug, '시리즈 id는 영문 소문자와 하이픈만 사용합니다'),
          title: z.string(),
          order: z.number().int().positive(),
        })
        .optional(),
      /** 대표 이미지. 없으면 태그 색 + coverText(없으면 제목)로 자동 커버를 만든다 */
      cover: image().optional(),
      coverAlt: z.string().optional(),
      coverText: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { posts };
